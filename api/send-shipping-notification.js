const Airtable = require('airtable');
const { Resend } = require('resend');

module.exports = async (req, res) => {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { orderReference, trackingNumber, carrier, estimatedDelivery, trackingUrl, notes } = req.body;

  // Validate required fields
  if (!orderReference || !trackingNumber || !carrier) {
    return res.status(400).json({
      error: 'Missing required fields',
      required: ['orderReference', 'trackingNumber', 'carrier']
    });
  }

  try {
    // Initialize Airtable
    const base = new Airtable({
      apiKey: process.env.AIRTABLE_API_KEY,
    }).base(process.env.AIRTABLE_BASE_ID);

    // Step 1: Find the order in Payments table
    console.log('Looking up order:', orderReference);

    const paymentsRecords = await base(process.env.AIRTABLE_PAYMENTS_TABLE || 'Payments')
      .select({
        filterByFormula: `{Stripe Session ID} = '${orderReference}'`,
        maxRecords: 1
      })
      .firstPage();

    if (!paymentsRecords || paymentsRecords.length === 0) {
      return res.status(404).json({
        error: 'Order not found',
        message: 'No order found with this reference. Please check the Order Reference ID.'
      });
    }

    const paymentRecord = paymentsRecords[0];
    const customerEmail = paymentRecord.fields['Customer Email'];
    const customerName = paymentRecord.fields['Customer Name'];
    const productName = paymentRecord.fields['Product Name'];

    if (!customerEmail) {
      return res.status(400).json({
        error: 'Customer email not found in order record'
      });
    }

    console.log('Found order for customer:', customerEmail);

    // Step 2: Generate tracking URL if not provided
    let finalTrackingUrl = trackingUrl;
    if (!finalTrackingUrl && trackingNumber) {
      // Auto-generate tracking URLs for common carriers
      switch (carrier) {
        case 'DHL Express':
          finalTrackingUrl = `https://www.dhl.com/en/express/tracking.html?AWB=${trackingNumber}`;
          break;
        case 'FedEx':
          finalTrackingUrl = `https://www.fedex.com/fedextrack/?trknbr=${trackingNumber}`;
          break;
        case 'UPS':
          finalTrackingUrl = `https://www.ups.com/track?tracknum=${trackingNumber}`;
          break;
        case 'SF Express':
          finalTrackingUrl = `https://www.sf-express.com/mobile/en/dynamic_function/waybill/#search/bill-number/${trackingNumber}`;
          break;
        case 'Hong Kong Post':
          finalTrackingUrl = `https://www.hongkongpost.hk/en/mail_tracking/index.html?id=${trackingNumber}`;
          break;
        case 'China Post':
          finalTrackingUrl = `http://www.ems.com.cn/queryList?mailNoList=${trackingNumber}`;
          break;
        default:
          finalTrackingUrl = '';
      }
    }

    // Step 3: Create shipment record in Shipments table
    console.log('Creating shipment record...');

    const shipmentRecord = await base(process.env.AIRTABLE_SHIPMENTS_TABLE || 'Shipments').create([
      {
        fields: {
          'Order Reference': [paymentRecord.id], // Link to Payments record
          'Tracking Number': trackingNumber,
          'Carrier': carrier,
          'Shipping Status': 'Shipped',
          'Shipped Date': new Date().toISOString(),
          'Estimated Delivery': estimatedDelivery || null,
          'Tracking URL': finalTrackingUrl || '',
          'Tracking Email Sent': true,
          'Notes': notes || '',
        },
      },
    ]);

    console.log('Shipment record created:', shipmentRecord[0].id);

    // Step 4: Send email to customer via Resend
    const resendApiKey = process.env.RESEND_API_KEY;

    if (!resendApiKey) {
      return res.status(500).json({
        error: 'Email service not configured',
        shipmentId: shipmentRecord[0].id
      });
    }

    const resend = new Resend(resendApiKey);

    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Playfair Display', 'Inter', Arial, sans-serif; line-height: 1.6; color: #2C2C2C; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #D88A75 0%, #E09B8A 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #FAF8F5; padding: 30px; border-radius: 0 0 8px 8px; }
          .tracking-box { background: white; padding: 25px; border-radius: 8px; margin: 20px 0; border: 2px solid #D88A75; text-align: center; }
          .tracking-number { font-size: 24px; font-weight: bold; color: #D88A75; margin: 10px 0; letter-spacing: 1px; }
          .track-button { display: inline-block; background: linear-gradient(135deg, #D88A75 0%, #E09B8A 100%); color: white; padding: 15px 40px; text-decoration: none; border-radius: 25px; font-weight: bold; margin: 15px 0; }
          .info-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #F5F1ED; }
          .label { font-weight: bold; color: #6B6B6B; }
          .value { color: #2C2C2C; }
          .highlight-box { background: #F0E8E3; padding: 15px; border-left: 4px solid #D88A75; margin: 20px 0; border-radius: 4px; }
          .footer { text-align: center; padding: 20px; color: #6B6B6B; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📦 Your Order Has Shipped!</h1>
          </div>
          <div class="content">
            <p>Hi ${customerName || 'there'},</p>
            <p>Great news! Your order has been shipped and is on its way to you.</p>

            <div class="tracking-box">
              <h2 style="color: #D88A75; margin-top: 0;">Tracking Information</h2>
              <div class="info-row">
                <span class="label">Carrier:</span>
                <span class="value">${carrier}</span>
              </div>
              <div class="info-row">
                <span class="label">Tracking Number:</span>
                <span class="value"></span>
              </div>
              <div class="tracking-number">${trackingNumber}</div>
              ${finalTrackingUrl ? `
                <a href="${finalTrackingUrl}" class="track-button" target="_blank">
                  Track Your Package
                </a>
              ` : ''}
              ${estimatedDelivery ? `
                <div style="margin-top: 15px; color: #6B6B6B;">
                  Estimated Delivery: <strong>${new Date(estimatedDelivery).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</strong>
                </div>
              ` : ''}
            </div>

            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #F0E8E3;">
              <h2 style="color: #D88A75; margin-top: 0;">Order Details</h2>
              <div class="info-row">
                <span class="label">Order Reference:</span>
                <span class="value">${orderReference}</span>
              </div>
              <div class="info-row">
                <span class="label">Product:</span>
                <span class="value">${productName || 'Homwards: to my authentic self - Journal'}</span>
              </div>
            </div>

            <div class="highlight-box">
              <p style="margin: 0;"><strong>What's next?</strong></p>
              <p style="margin: 5px 0 0 0;">Keep an eye on your tracking number. You'll receive your package soon!</p>
            </div>

            <p>If you have any questions about your shipment, please reply to this email with your order reference.</p>

            <p>Thank you for your patience, and I hope you love your journal!</p>

            <p>With gratitude,<br><strong>Jessie Li</strong></p>
          </div>

          <div class="footer">
            <p>This is an automated shipping notification.</p>
            <p>© ${new Date().getFullYear()} Jessie Li. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const emailResponse = await resend.emails.send({
      from: 'Jessie Li <orders@jessieli.co>',
      to: customerEmail,
      subject: `📦 Your Order Has Shipped! - Tracking: ${trackingNumber}`,
      html: emailHtml,
    });

    console.log('Shipping notification email sent:', emailResponse);

    // Step 5: Return success response
    return res.status(200).json({
      success: true,
      message: 'Shipping notification sent successfully',
      shipmentId: shipmentRecord[0].id,
      emailId: emailResponse.id,
      sentTo: customerEmail,
      trackingNumber: trackingNumber,
      carrier: carrier,
    });

  } catch (error) {
    console.error('Error sending shipping notification:', error);
    return res.status(500).json({
      error: 'Failed to send shipping notification',
      message: error.message
    });
  }
};
