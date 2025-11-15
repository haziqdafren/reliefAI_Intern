import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useNewsletter } from '../contexts/NewsletterContext';
import { StripeCheckoutButton } from '../components/StripeCheckoutButton';
import { useCurrency } from '../contexts/CurrencyContext';
import { getPriceDisplay } from '../utils/currency';

export const GuidedJournalPage = () => {
  const heroAnimation = useScrollAnimation();
  const aboutAnimation = useScrollAnimation();
  const { isNewsletterVisible } = useNewsletter();
  const { currency } = useCurrency();

  // Journal price in USD
  const JOURNAL_PRICE_USD = 25;

  return (
    <div className={`min-h-screen bg-gradient-to-br from-white via-primary-50/30 to-primary-100/20 relative transition-all duration-300 ${
      isNewsletterVisible ? 'pt-32' : 'pt-20'
    }`}>
      {/* Clean background elements - consistent with other pages */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-40 -left-40 w-96 h-96 bg-primary-400/3 rounded-full animate-pulse"></div>
        <div className="absolute bottom-32 -right-48 w-80 h-80 bg-primary-500/4 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-primary-300/2 rounded-full animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 max-w-6xl relative z-10">
        {/* Hero Section - Fully Responsive */}
        <div
          ref={heroAnimation.ref}
          className={`py-10 sm:py-12 md:py-14 transition-all duration-700 ${
            heroAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-14 items-center max-w-5xl mx-auto">
            {/* Journal Cover Section */}
            <div className="text-center lg:text-left">
              <div className="relative inline-block">
                <img
                  src="/journal.png"
                  alt="Homwards: to my authentic self - Guided Journal"
                  className="w-56 sm:w-64 md:w-72 h-72 sm:h-80 md:h-96 object-cover rounded-xl sm:rounded-2xl shadow-2xl border-4 border-white transition-all duration-500 hover:-translate-y-2"
                />
              </div>
            </div>

            {/* Journal Information */}
            <div className="text-center lg:text-left space-y-4 sm:space-y-5 md:space-y-6">
              <div>
                <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-text-primary mb-2 sm:mb-3 leading-tight tracking-tight">
                  Homwards: to my authentic self
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-primary-500 font-corporate font-light mb-3 sm:mb-4 tracking-wide leading-relaxed italic">
                  Guided Inward: A Journal For Self-Discovery
                </p>
              </div>

              {/* CTA Button */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                <StripeCheckoutButton
                  priceId={process.env.REACT_APP_STRIPE_JOURNAL_PRICE_ID || ''}
                  productName="Homwards: to my authentic self - Journal"
                  productType="journal"
                  className="bg-gradient-to-r from-primary-400 to-primary-500 text-white py-3 px-6 sm:px-8 rounded-full text-sm sm:text-base font-corporate font-medium transition-all duration-300 hover:shadow-xl hover:-translate-y-1 shadow-lg shadow-primary-400/30"
                  disabled={!process.env.REACT_APP_STRIPE_JOURNAL_PRICE_ID}
                >
                  Buy It Now — {getPriceDisplay(JOURNAL_PRICE_USD, currency)}
                </StripeCheckoutButton>
              </div>
            </div>
          </div>
        </div>

        {/* LIFESTYLE SECTION - Fully Responsive with Equal Heights */}
        <div
          ref={aboutAnimation.ref}
          className={`py-10 sm:py-12 md:py-14 pb-16 sm:pb-20 transition-all duration-700 delay-200 ${
            aboutAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="max-w-5xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-8 sm:mb-10">
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-text-primary mb-2 sm:mb-3 leading-tight tracking-tight">
                Embrace Authentic Living
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-text-secondary font-light max-w-2xl mx-auto leading-relaxed px-4 sm:px-0">
                Create a lifestyle that aligns with your values and nurtures your well-being
              </p>
            </div>

            {/* Grid Layout - Responsive Equal Height */}
            <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 items-stretch">
              {/* LEFT: Lifestyle Image - Full Display in Equal Container */}
              <div className="relative flex items-center justify-center bg-gradient-to-br from-primary-50 to-white rounded-xl sm:rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 p-3 sm:p-4 min-h-[300px] sm:min-h-[400px]">
                <img
                  src="/lifestyle.jpg"
                  alt="Authentic Living Lifestyle"
                  className="w-full h-auto object-contain rounded-lg"
                />
              </div>

              {/* RIGHT: Content - Equal Height */}
              <div className="flex">
                <div className="bg-white p-6 sm:p-8 md:p-10 rounded-xl sm:rounded-2xl shadow-2xl border border-primary-200/30 flex flex-col justify-center w-full">
                  <div className="text-sm sm:text-base md:text-lg text-text-primary leading-relaxed space-y-3 sm:space-y-4 font-light">
                    <p className="text-base sm:text-lg md:text-xl leading-relaxed font-normal">
                      <em>Homeward: To My Authentic Self</em> is a guided daily and weekly journal designed to help you build self-awareness, challenge old patterns, and mindfully create new habits that support your goals and purpose.
                    </p>

                    <p>
                      With thoughtful prompts and insightful reflection exercises, this journal empowers you to look deeper, move beyond old patterns, and thrive in your most authentic self.
                    </p>

                    <p>
                      Living authentically means honoring your true self in every aspect of life—from the choices you make to the relationships you nurture. This journal is more than a daily practice; it's a commitment to yourself.
                    </p>

                    <p>
                      Whether you're navigating a career transition, seeking deeper meaning in your daily life, or simply wanting to reconnect with who you truly are, this journal provides the structure and support you need to cultivate lasting change.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
