const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { STRIPE_SECRET_KEY } = process.env;

    if (!STRIPE_SECRET_KEY) {
      return res.status(500).json({ error: 'Stripe configuration missing' });
    }

    // Parse request body
    const { priceId, productName, productType } = req.body;

    if (!priceId) {
      return res.status(400).json({ error: 'Price ID is required' });
    }

    // Get the origin from headers
    const origin = req.headers.origin || req.headers.referer || 'https://jessieli-dusky.vercel.app';

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/payment-cancel`,
      metadata: {
        productName: productName || 'Product',
        productType: productType || 'general',
      },
    });

    return res.status(200).json({
      sessionId: session.id,
      url: session.url,
    });
  } catch (error) {
    console.error('Stripe error:', error);
    return res.status(500).json({
      error: 'Failed to create checkout session',
      details: error.message,
    });
  }
};

