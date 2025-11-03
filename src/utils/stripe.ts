import { loadStripe } from '@stripe/stripe-js';

const stripePublishableKey = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || '';

export const stripePromise = loadStripe(stripePublishableKey);

interface CheckoutParams {
  priceId: string;
  productName: string;
  productType: string;
}

export const createCheckoutSession = async (params: CheckoutParams): Promise<{ sessionId: string; url: string } | null> => {
  try {
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('Stripe error:', result.error);
      return null;
    }

    return result;
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return null;
  }
};

