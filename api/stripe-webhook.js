const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Airtable = require('airtable');
const { Resend } = require('resend');

// Country code to country name mapping
const countryNames = {
  'US': 'United States', 'CA': 'Canada', 'GB': 'United Kingdom', 'AU': 'Australia',
  'NZ': 'New Zealand', 'SG': 'Singapore', 'MY': 'Malaysia', 'ID': 'Indonesia',
  'PH': 'Philippines', 'TH': 'Thailand', 'VN': 'Vietnam', 'JP': 'Japan',
  'KR': 'South Korea', 'CN': 'China', 'HK': 'Hong Kong', 'TW': 'Taiwan',
  'IN': 'India', 'DE': 'Germany', 'FR': 'France', 'IT': 'Italy', 'ES': 'Spain',
  'NL': 'Netherlands', 'BE': 'Belgium', 'CH': 'Switzerland', 'AT': 'Austria',
  'SE': 'Sweden', 'NO': 'Norway', 'DK': 'Denmark', 'FI': 'Finland', 'IE': 'Ireland',
  'PT': 'Portugal', 'GR': 'Greece', 'PL': 'Poland', 'CZ': 'Czech Republic',
  'HU': 'Hungary', 'RO': 'Romania', 'BG': 'Bulgaria', 'HR': 'Croatia',
  'AE': 'United Arab Emirates', 'SA': 'Saudi Arabia', 'IL': 'Israel', 'TR': 'Turkey',
  'EG': 'Egypt', 'ZA': 'South Africa', 'NG': 'Nigeria', 'KE': 'Kenya',
  'MX': 'Mexico', 'BR': 'Brazil', 'AR': 'Argentina', 'CL': 'Chile', 'CO': 'Colombia',
  'PE': 'Peru', 'RU': 'Russia', 'UA': 'Ukraine', 'KZ': 'Kazakhstan',
  'PK': 'Pakistan', 'BD': 'Bangladesh', 'LK': 'Sri Lanka', 'NP': 'Nepal',
  'MM': 'Myanmar', 'KH': 'Cambodia', 'LA': 'Laos', 'MO': 'Macau',
};

const getCountryName = (code) => {
  if (!code) return '';
  return countryNames[code.toUpperCase()] || code;
};

module.exports = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    return res.status(500).json({ error: 'Webhook secret not configured' });
  }

  let stripeEvent;

  try {
    // Get the raw body for webhook verification
    const buf = await getRawBody(req);

    // Verify webhook signature
    stripeEvent = stripe.webhooks.constructEvent(
      buf,
      sig,
      webhookSecret
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).json({ error: `Webhook Error: ${err.message}` });
  }

  // Handle the event
  if (stripeEvent.type === 'checkout.session.completed') {
    const sessionFromWebhook = stripeEvent.data.object;

    try {
      // Retrieve the full session with shipping details
      // The webhook event doesn't include all details by default
      const session = await stripe.checkout.sessions.retrieve(sessionFromWebhook.id, {
        expand: ['customer', 'line_items', 'total_details.breakdown']
      });

      console.log('Retrieved full session:', session.id);
      console.log('Session total_details:', JSON.stringify(session.total_details, null, 2));

      // Initialize Airtable
      const base = new Airtable({
        apiKey: process.env.AIRTABLE_API_KEY,
      }).base(process.env.AIRTABLE_BASE_ID);

      // Extract shipping details from Stripe session
      // Stripe stores address in customer_details when using shipping_address_collection
      const shipping = session.shipping_details || session.shipping || null;
      const customerDetails = session.customer_details || {};

      console.log('Full session shipping_details:', JSON.stringify(session.shipping_details, null, 2));
      console.log('Full session shipping:', JSON.stringify(session.shipping, null, 2));
      console.log('Customer details:', JSON.stringify(customerDetails, null, 2));

      // Extract name and address - prioritize shipping, fallback to customer_details
      const customerName = shipping?.name || customerDetails?.name || '';
      const shippingAddress = shipping?.address || customerDetails?.address || {};

      console.log('Extracted customer name:', customerName);
      console.log('Extracted shipping address:', JSON.stringify(shippingAddress, null, 2));

      // Extract shipping cost from total_details
      const shippingCost = session.shipping_cost?.amount_total || 0;
      const shippingCostFormatted = shippingCost / 100; // Convert from cents to dollars

      // Calculate subtotal (product price before shipping)
      const subtotal = session.amount_subtotal / 100;
      const totalAmount = session.amount_total / 100;

      console.log('Shipping cost:', shippingCostFormatted);
      console.log('Subtotal:', subtotal);
      console.log('Total amount:', totalAmount);

      // Create payment record in Airtable
      await base(process.env.AIRTABLE_PAYMENTS_TABLE || 'Payments').create([
        {
          fields: {
            'Customer Email': session.customer_details?.email || '',
            'Customer Name': customerName,
            'Phone': session.customer_details?.phone || '',
            'Subtotal': subtotal, // Product price only
            'Shipping Fee': shippingCostFormatted, // Shipping cost
            'Total Amount': totalAmount, // Product + Shipping
            'Currency': session.currency?.toUpperCase() || 'USD',
            'Payment Status': 'Completed',
            'Stripe Session ID': session.id,
            'Product Name': session.metadata?.productName || 'Unknown',
            'Product Type': session.metadata?.productType || 'general',
            'Date': new Date().toISOString(),
            // Shipping Address Fields
            'Address Line 1': shippingAddress.line1 || '',
            'Address Line 2': shippingAddress.line2 || '',
            'City': shippingAddress.city || '',
            'State': shippingAddress.state || '',
            'Postal Code': shippingAddress.postal_code || '',
            'Country': getCountryName(shippingAddress.country) || '',
          },
        },
      ]);

      console.log('Payment recorded in Airtable:', session.id);

      // Send order confirmation email via Resend
      try {
        const resendApiKey = process.env.RESEND_API_KEY;

        if (resendApiKey) {
          const resend = new Resend(resendApiKey);

          // Format the shipping address
          const fullAddress = [
            shippingAddress.line1,
            shippingAddress.line2,
            shippingAddress.city,
            shippingAddress.state,
            shippingAddress.postal_code,
            getCountryName(shippingAddress.country)
          ].filter(Boolean).join(', ');

          // Send email
          const emailResponse = await resend.emails.send({
            from: 'Jessie Li <orders@jessieli.co>',
            to: session.customer_details?.email || '',
            subject: 'Order Confirmation - Thank you for your purchase!',
            html: `
              <!DOCTYPE html>
              <html>
              <head>
                <style>
                  body { font-family: 'Playfair Display', 'Inter', Arial, sans-serif; line-height: 1.6; color: #2C2C2C; }
                  .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                  .header { background: linear-gradient(135deg, #D88A75 0%, #E09B8A 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
                  .content { background: #FAF8F5; padding: 30px; border-radius: 0 0 8px 8px; }
                  .order-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #F0E8E3; }
                  .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #F5F1ED; }
                  .detail-label { font-weight: bold; color: #6B6B6B; }
                  .total { font-size: 18px; font-weight: bold; color: #D88A75; padding-top: 10px; border-top: 2px solid #D88A75; }
                  .footer { text-align: center; padding: 20px; color: #6B6B6B; font-size: 14px; }
                </style>
              </head>
              <body>
                <div class="container">
                  <div class="header">
                    <h1>Thank You for Your Order! 🎉</h1>
                  </div>
                  <div class="content">
                    <p>Hi ${customerName},</p>
                    <p>Your order has been confirmed! We're excited to send your journal to you.</p>

                    <div class="order-details">
                      <h2 style="color: #D88A75; margin-top: 0;">Order Details</h2>

                      <div class="detail-row">
                        <span class="detail-label">Order Reference:</span>
                        <span>${session.id}</span>
                      </div>

                      <div class="detail-row">
                        <span class="detail-label">Product:</span>
                        <span>${session.metadata?.productName || 'Homwards: to my authentic self - Journal'}</span>
                      </div>

                      <div class="detail-row">
                        <span class="detail-label">Subtotal:</span>
                        <span>${subtotal.toFixed(2)} ${session.currency?.toUpperCase()}</span>
                      </div>

                      <div class="detail-row">
                        <span class="detail-label">Shipping Fee:</span>
                        <span>${shippingCostFormatted.toFixed(2)} ${session.currency?.toUpperCase()}</span>
                      </div>

                      <div class="detail-row total">
                        <span>Total Paid:</span>
                        <span>${totalAmount.toFixed(2)} ${session.currency?.toUpperCase()}</span>
                      </div>
                    </div>

                    <div class="order-details">
                      <h2 style="color: #D88A75; margin-top: 0;">Shipping Address</h2>
                      <p><strong>${customerName}</strong></p>
                      <p>${fullAddress}</p>
                      ${session.customer_details?.phone ? `<p>Phone: ${session.customer_details.phone}</p>` : ''}
                    </div>

                    <div style="background: #F0E8E3; padding: 15px; border-left: 4px solid #D88A75; margin: 20px 0; border-radius: 4px;">
                      <p style="margin: 0;"><strong>What's next?</strong></p>
                      <p style="margin: 5px 0 0 0;">We'll process your order and send you a shipping confirmation once your journal is on its way.</p>
                    </div>

                    <p>If you have any questions about your order, please reply to this email with your order reference: <strong>${session.id}</strong></p>

                    <p>With gratitude,<br><strong>Jessie Li</strong></p>
                  </div>

                  <div class="footer">
                    <p>This is an automated confirmation email.</p>
                    <p>© ${new Date().getFullYear()} Jessie Li. All rights reserved.</p>
                  </div>
                </div>
              </body>
              </html>
            `,
          });

          console.log('Order confirmation email sent via Resend:', emailResponse);

          // Send notification email to boss
          const bossEmailResponse = await resend.emails.send({
            from: 'Jessie Li Orders <orders@jessieli.co>',
            to: 'hello@jessieli.co',
            subject: `New Order: ${customerName} - ${session.metadata?.productName || 'Journal'}`,
            html: `
              <!DOCTYPE html>
              <html>
              <head>
                <style>
                  body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                  .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                  .header { background: linear-gradient(135deg, #D88A75 0%, #E09B8A 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
                  .content { background: #FAF8F5; padding: 30px; border-radius: 0 0 8px 8px; }
                  .alert-box { background: #fff3e0; border-left: 4px solid #D88A75; padding: 15px; margin: 20px 0; border-radius: 4px; }
                  .customer-info { background: white; padding: 20px; border-radius: 8px; margin: 15px 0; border: 1px solid #F0E8E3; }
                  .info-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #F5F1ED; }
                  .label { font-weight: bold; color: #6B6B6B; }
                  .value { color: #2C2C2C; }
                  .total { font-size: 18px; font-weight: bold; color: #D88A75; padding-top: 10px; border-top: 2px solid #D88A75; }
                </style>
              </head>
              <body>
                <div class="container">
                  <div class="header">
                    <h1>📦 New Order Received!</h1>
                  </div>
                  <div class="content">
                    <div class="alert-box">
                      <p style="margin: 0;"><strong>Action Required:</strong> Ship this order</p>
                      <p style="margin: 5px 0 0 0;">Order Reference: <strong>${session.id}</strong></p>
                    </div>

                    <div class="customer-info">
                      <h2 style="color: #D88A75; margin-top: 0;">Customer Information</h2>
                      <div class="info-row">
                        <span class="label">Name:</span>
                        <span class="value">${customerName}</span>
                      </div>
                      <div class="info-row">
                        <span class="label">Email:</span>
                        <span class="value">${session.customer_details?.email || 'N/A'}</span>
                      </div>
                      <div class="info-row">
                        <span class="label">Phone:</span>
                        <span class="value">${session.customer_details?.phone || 'N/A'}</span>
                      </div>
                    </div>

                    <div class="customer-info">
                      <h2 style="color: #D88A75; margin-top: 0;">Shipping Address</h2>
                      <p style="margin: 0; line-height: 1.8;">
                        <strong>${customerName}</strong><br>
                        ${shippingAddress.line1 || ''}<br>
                        ${shippingAddress.line2 ? shippingAddress.line2 + '<br>' : ''}
                        ${shippingAddress.city || ''}, ${shippingAddress.state || ''} ${shippingAddress.postal_code || ''}<br>
                        ${getCountryName(shippingAddress.country) || ''}
                      </p>
                    </div>

                    <div class="customer-info">
                      <h2 style="color: #D88A75; margin-top: 0;">Order Details</h2>
                      <div class="info-row">
                        <span class="label">Product:</span>
                        <span class="value">${session.metadata?.productName || 'Homwards Journal'}</span>
                      </div>
                      <div class="info-row">
                        <span class="label">Subtotal:</span>
                        <span class="value">${subtotal.toFixed(2)} ${session.currency?.toUpperCase()}</span>
                      </div>
                      <div class="info-row">
                        <span class="label">Shipping Fee:</span>
                        <span class="value">${shippingCostFormatted.toFixed(2)} ${session.currency?.toUpperCase()}</span>
                      </div>
                      <div class="info-row total">
                        <span>Total Paid:</span>
                        <span>${totalAmount.toFixed(2)} ${session.currency?.toUpperCase()}</span>
                      </div>
                    </div>

                    <div style="background: #F0E8E3; padding: 15px; border-radius: 4px; margin: 20px 0;">
                      <p style="margin: 0;"><strong>Next Steps:</strong></p>
                      <ol style="margin: 10px 0 0 0; padding-left: 20px;">
                        <li>Package the journal</li>
                        <li>Print shipping label with above address</li>
                        <li>Ship and get tracking number</li>
                        <li>Update customer via email (optional)</li>
                      </ol>
                    </div>

                    <p style="color: #6B6B6B; font-size: 14px;">This order has been automatically recorded in Airtable.</p>
                  </div>
                </div>
              </body>
              </html>
            `,
          });

          console.log('Boss notification email sent via Resend:', bossEmailResponse);
        } else {
          console.log('RESEND_API_KEY not configured - skipping email');
        }
      } catch (emailError) {
        console.error('Error sending order confirmation email:', emailError);
        // Don't fail the webhook - payment was already processed
      }

    } catch (error) {
      console.error('Error recording payment to Airtable:', error);
      // Don't fail the webhook - Stripe will retry
    }
  }

  return res.status(200).json({ received: true });
};

// Helper function to get raw body for webhook verification
async function getRawBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', chunk => {
      data += chunk;
    });
    req.on('end', () => {
      resolve(data);
    });
    req.on('error', reject);
  });
}

