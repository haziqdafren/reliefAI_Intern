const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Airtable = require('airtable');

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
        expand: ['customer', 'line_items']
      });

      console.log('Retrieved full session:', session.id);

      // Initialize Airtable
      const base = new Airtable({
        apiKey: process.env.AIRTABLE_API_KEY,
      }).base(process.env.AIRTABLE_BASE_ID);

      // Extract shipping details from Stripe session
      // Stripe uses 'shipping_details' for the shipping information
      const shipping = session.shipping_details || session.shipping || null;

      console.log('Full session shipping_details:', JSON.stringify(session.shipping_details, null, 2));
      console.log('Full session shipping:', JSON.stringify(session.shipping, null, 2));
      console.log('Customer details:', JSON.stringify(session.customer_details, null, 2));

      // Extract name and address
      const customerName = shipping?.name || session.customer_details?.name || '';
      const shippingAddress = shipping?.address || {};

      console.log('Extracted customer name:', customerName);
      console.log('Extracted shipping address:', JSON.stringify(shippingAddress, null, 2));

      // Create payment record in Airtable
      await base(process.env.AIRTABLE_PAYMENTS_TABLE || 'Payments').create([
        {
          fields: {
            'Customer Email': session.customer_details?.email || '',
            'Customer Name': customerName,
            'Phone': session.customer_details?.phone || '',
            'Amount': session.amount_total / 100, // Convert from cents to dollars
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
            'Country': shippingAddress.country || '',
          },
        },
      ]);

      console.log('Payment recorded in Airtable:', session.id);
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

