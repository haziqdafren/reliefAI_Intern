import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useNewsletter } from '../contexts/NewsletterContext';
import { StripeCheckoutButton } from '../components/StripeCheckoutButton';
import { useCurrency } from '../contexts/CurrencyContext';
import { getPriceDisplay } from '../utils/currency';

export const JournalPage = () => {
  const heroAnimation = useScrollAnimation();
  const featuresAnimation = useScrollAnimation();
  const frameworkAnimation = useScrollAnimation();
  const ctaAnimation = useScrollAnimation();
  const { isNewsletterVisible } = useNewsletter();
  const { currency } = useCurrency();

  // Journal price in USD
  const JOURNAL_PRICE_USD = 25;

  const journalFeatures = [
    "Daily self-reflection prompts aligned with BALANCE framework",
    "Weekly leadership challenges and growth exercises",
    "Monthly progress tracking and goal setting pages",
    "Guided meditation and mindfulness practices",
    "Space for personal insights and breakthrough moments",
    "Action planning templates for authentic leadership development"
  ];

  const balanceFramework = [
    {
      letter: "B",
      title: "Build Self-Awareness",
      description: "Reflection exercises to identify your unique blend of feminine and masculine energies"
    },
    {
      letter: "A",
      title: "Affirm & Celebrate Strengths",
      description: "Prompts to recognize and honor your authentic self beyond stereotypical gender roles"
    },
    {
      letter: "L",
      title: "Lean Into Your Weaker Side",
      description: "Guided practices to cultivate less-developed aspects like vulnerability and creativity"
    },
    {
      letter: "A",
      title: "Align With Purpose",
      description: "Clarity exercises to connect deeply with your personal and professional 'why'"
    },
    {
      letter: "N",
      title: "Notice Old Patterns",
      description: "Observation tools to identify habitual thoughts and behaviors holding you back"
    },
    {
      letter: "C",
      title: "Cultivate New Traits",
      description: "Practice templates to develop traits aligned with authentic leadership"
    },
    {
      letter: "E",
      title: "Embody Authentic Leadership",
      description: "Integration exercises to show up as your whole self in professional settings"
    }
  ];

  return (
    <div className={`min-h-screen bg-gradient-to-br from-white via-primary-50/30 to-primary-100/20 relative overflow-hidden transition-all duration-300 ${
      isNewsletterVisible ? 'pt-32' : 'pt-20'
    }`}>
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 -left-40 w-96 h-96 bg-primary-400/3 rounded-full animate-pulse"></div>
        <div className="absolute bottom-32 -right-48 w-80 h-80 bg-primary-500/4 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-primary-300/2 rounded-full animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        {/* Hero Section */}
        <div
          ref={heroAnimation.ref}
          className={`py-16 text-center transition-all duration-700 ${
            heroAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="bg-primary-400/10 text-primary-400 py-2 px-4 rounded-full text-xs font-medium uppercase tracking-wider inline-block mb-6 border border-primary-400/20">
            Self-Reflection Journal
          </div>

          <h1 className="font-heading text-6xl md:text-8xl font-medium text-text-primary mb-3 leading-tight">
            Homwards: to my authentic self
          </h1>
          <p className="text-primary-400 italic font-corporate text-base md:text-lg mb-3">Guided Inward: A Journal For Self-Discovery</p>

          <p className="font-heading text-2xl md:text-3xl text-primary-500 mb-6 leading-snug">
            Your journey Inward Starts Here
          </p>

          <p className="text-sm md:text-base text-text-secondary mb-12 font-light max-w-3xl mx-auto leading-relaxed">
            Rediscover your authentic self with our guided journal, featuring daily and weekly prompts designed to inspire deeper reflection and personal growth. Challenge yourself to look inward, embrace vulnerability, and reconnect with the truest version of you.
          </p>

          <div className="flex justify-center">
            <StripeCheckoutButton
              priceId={process.env.REACT_APP_STRIPE_JOURNAL_PRICE_ID || ''}
              productName="Homwards: to my authentic self - Journal"
              productType="journal"
              className="bg-gradient-to-r from-primary-400 to-primary-500 text-white py-3 px-8 rounded-full text-xs md:text-sm font-corporate font-medium transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary-400/40 shadow-lg shadow-primary-400/30"
              disabled={!process.env.REACT_APP_STRIPE_JOURNAL_PRICE_ID}
            >
              Buy Now — {getPriceDisplay(JOURNAL_PRICE_USD, currency)}
            </StripeCheckoutButton>
          </div>
        </div>

        {/* Journal Features */}
        <div
          ref={featuresAnimation.ref}
          className={`py-16 transition-all duration-700 delay-200 ${
            featuresAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="text-center mb-12">
            <h2 className="font-heading text-5xl md:text-6xl font-medium text-text-primary mb-6">
              What's Inside the Journal
            </h2>
            <p className="text-sm md:text-base text-text-secondary font-light max-w-2xl mx-auto">
              120 pages of guided reflection, practical exercises, and leadership development tools
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {journalFeatures.map((feature, index) => (
              <div key={index} className="p-6 bg-white rounded-2xl border border-primary-200 hover:-translate-y-1 transition-all duration-300 shadow-sm">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-500 rounded-full flex items-center justify-center mb-4">
                  <span className="text-white text-xl font-corporate font-medium">✓</span>
                </div>
                <p className="text-xs md:text-sm text-text-secondary leading-relaxed font-light">{feature}</p>
              </div>
            ))}
          </div>
        </div>

        {/* BALANCE Framework Integration */}
        <div
          ref={frameworkAnimation.ref}
          className={`py-16 transition-all duration-700 delay-400 ${
            frameworkAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="text-center mb-16">
            <h2 className="font-heading text-5xl md:text-6xl font-medium text-text-primary mb-6">
              Built on the BALANCE Framework™
            </h2>
            <p className="text-base md:text-lg text-text-secondary font-normal max-w-3xl mx-auto">
              Each section of the journal corresponds to one element of the BALANCE framework, providing structured guidance for your leadership development journey.
            </p>
          </div>

          <div className="space-y-6">
            {balanceFramework.map((item, index) => (
              <div key={index} className="flex items-start gap-6 p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-primary-200/50 hover:-translate-y-1 transition-all duration-300">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-primary-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-2xl font-corporate font-medium">{item.letter}</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-heading text-xl md:text-2xl font-medium text-text-primary mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm md:text-base text-text-secondary leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div
          ref={ctaAnimation.ref}
          className={`py-16 text-center transition-all duration-700 delay-600 ${
            ctaAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="bg-gradient-to-r from-primary-100 to-primary-200 rounded-3xl p-12 border border-primary-300">
            <h3 className="font-heading text-3xl md:text-4xl font-medium text-text-primary mb-6">
              Start Your Authentic Leadership Journey Today
            </h3>
            <p className="text-base md:text-lg text-text-secondary mb-8 font-normal max-w-2xl mx-auto">
              Join hundreds of women leaders who are transforming their approach to leadership through intentional self-reflection and authentic growth practices.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <StripeCheckoutButton
                priceId={process.env.REACT_APP_STRIPE_JOURNAL_PRICE_ID || ''}
                productName="Homwards: to my authentic self - Journal"
                productType="journal"
                className="bg-gradient-to-r from-primary-400 to-primary-500 text-white py-3 px-8 rounded-full text-xs md:text-sm font-corporate font-medium transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary-400/40 shadow-lg shadow-primary-400/30"
                disabled={!process.env.REACT_APP_STRIPE_JOURNAL_PRICE_ID}
              >
                Coming Soon
              </StripeCheckoutButton>
              <p className="text-sm text-text-secondary font-medium">
                Available for shipping in 2 months
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};