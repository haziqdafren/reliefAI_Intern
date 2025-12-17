// Stripe Checkout Button Component
import React, { useState } from 'react';
import { createCheckoutSession } from '../utils/stripe';

interface StripeCheckoutButtonProps {
  priceId: string;
  productName: string;
  productType: string;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

export const StripeCheckoutButton: React.FC<StripeCheckoutButtonProps> = ({
  priceId,
  productName,
  productType,
  children,
  className = '',
  disabled = false,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    if (!priceId || disabled || isLoading) return;

    setIsLoading(true);
    try {
      const session = await createCheckoutSession({
        priceId,
        productName,
        productType,
      });

      if (session?.url) {
        // Redirect to Stripe Checkout
        window.location.href = session.url;
      } else {
        alert('Failed to initialize checkout. Please try again.');
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('An error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled || isLoading}
      className={className}
    >
      {isLoading ? 'Loading...' : children}
    </button>
  );
};

