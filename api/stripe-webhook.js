const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Airtable = require('airtable');

// Disable body parsing for raw body access (required for webhook signature verification)
module.exports = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    return res.status(500).json({ error: 'Webhook secret not configured' });
  }

  let stripeEvent;

  try {
    // Get raw body for signature verification
    const rawBody = await getRawBody(req);

    // Verify webhook signature
    stripeEvent = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      webhookSecret
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).json({ error: `Webhook Error: ${err.message}` });
  }

  // Handle the event
  if (stripeEvent.type === 'checkout.session.completed') {
    const session = stripeEvent.data.object;

    try {
      // Initialize Airtable
      const base = new Airtable({
        apiKey: process.env.AIRTABLE_API_KEY,
      }).base(process.env.AIRTABLE_BASE_ID);

      // Create payment record in Airtable
      await base(process.env.AIRTABLE_PAYMENTS_TABLE || 'Payments').create([
        {
          fields: {
            'Customer Email': session.customer_details?.email || '',
            'Amount': session.amount_total / 100, // Convert from cents to dollars
            'Currency': session.currency?.toUpperCase() || 'USD',
            'Payment Status': 'Completed',
            'Stripe Session ID': session.id,
            'Product Name': session.metadata?.productName || 'Unknown',
            'Product Type': session.metadata?.productType || 'general',
            'Date': new Date().toISOString(),
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

// Helper function to get raw body
async function getRawBody(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks).toString('utf8');
}

