import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { StripeCheckoutButton } from './StripeCheckoutButton';
import { useCurrency } from '../contexts/CurrencyContext';
import { getPriceDisplay } from '../utils/currency';

export const JournalSection = () => {
  const headerAnimation = useScrollAnimation();
  const contentAnimation = useScrollAnimation();
  const { currency } = useCurrency();
  const JOURNAL_PRICE_USD = 25;

  return (
    <section className="py-24 bg-gradient-to-br from-primary-100 to-primary-200">
      <div className="container mx-auto px-5 max-w-6xl">
        <div
          ref={headerAnimation.ref}
          className={`text-center mb-12 transition-all duration-700 ${
            headerAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <h2 className="font-heading text-6xl md:text-8xl text-text-primary font-medium max-w-2xl mx-auto mb-4">
            Reconnect with your authentic self
          </h2>
          <p className="text-lg md:text-xl text-text-secondary font-corporate max-w-3xl mx-auto">
            Homeward: To My Authentic Self is a guided daily and weekly journal designed to help you build self-awareness, challenge old patterns, and mindfully create new habits that support your goals and purpose.
          </p>
        </div>

        <div
          ref={contentAnimation.ref}
          className={`grid lg:grid-cols-2 gap-12 items-center transition-all duration-700 delay-300 ${
            contentAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Journal Image */}
          <div className="relative">
            <div className="aspect-[3/4] max-w-md mx-auto rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2">
              <img
                src="/journal.png"
                alt="Homwards: to my authentic self - Guided Journal"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Journal Info */}
          <div className="text-center lg:text-left">
            <h3 className="font-heading text-3xl md:text-4xl text-text-primary font-medium mb-4">
              Homwards: to my authentic self
            </h3>
            <p className="text-primary-400 italic font-corporate text-lg mb-6">
              Guided Inward: A Journal For Self-Discovery
            </p>
            <p className="text-base md:text-lg text-text-secondary font-corporate leading-relaxed mb-8">
              Homeward: To My Authentic Self is a guided daily and weekly journal designed to help you build self-awareness, challenge old patterns, and mindfully create new habits that support your goals and purpose. With thoughtful prompts and insightful reflection exercises, this journal empowers you to look deeper, move beyond old patterns, and thrive in your most authentic self.
            </p>
            <StripeCheckoutButton
              priceId={process.env.REACT_APP_STRIPE_JOURNAL_PRICE_ID || ''}
              productName="Homwards: to my authentic self - Journal"
              productType="journal"
              className="inline-block bg-gradient-to-r from-primary-400 to-primary-500 text-white py-4 px-12 rounded-full text-lg md:text-xl font-corporate font-bold transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary-400/50 shadow-xl shadow-primary-400/40 uppercase tracking-wider"
              disabled={!process.env.REACT_APP_STRIPE_JOURNAL_PRICE_ID}
            >
              Buy It Now — {getPriceDisplay(JOURNAL_PRICE_USD, currency)}
            </StripeCheckoutButton>
          </div>
        </div>
      </div>
    </section>
  );
};
