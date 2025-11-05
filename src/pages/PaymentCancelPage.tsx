import React from 'react';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useNewsletter } from '../contexts/NewsletterContext';

export const PaymentCancelPage = () => {
  const { isNewsletterVisible } = useNewsletter();
  const heroAnimation = useScrollAnimation();
  const detailsAnimation = useScrollAnimation();

  return (
    <div className={`min-h-screen bg-gradient-to-br from-white via-primary-50/30 to-primary-100/20 relative overflow-hidden transition-all duration-300 ${
      isNewsletterVisible ? 'pt-32' : 'pt-20'
    }`}>
      {/* Background elements - consistent with other pages */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 -left-40 w-96 h-96 bg-primary-400/3 rounded-full animate-pulse"></div>
        <div className="absolute bottom-32 -right-48 w-80 h-80 bg-primary-500/4 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-primary-300/2 rounded-full animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        {/* Cancel Hero Section */}
        <div
          ref={heroAnimation.ref}
          className={`py-20 text-center transition-all duration-700 ${
            heroAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {/* Info Icon */}
          <div className="mb-8 flex justify-center">
            <div className="w-24 h-24 bg-gradient-to-br from-primary-400 to-primary-500 rounded-full flex items-center justify-center shadow-xl shadow-primary-400/40 animate-scale-in">
              <svg
                className="w-12 h-12 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>

          <div className="bg-primary-400/10 text-primary-400 py-2 px-6 rounded-full text-sm font-medium uppercase tracking-wider inline-block mb-6 border border-primary-400/20">
            Payment Cancelled
          </div>

          <h1 className="font-heading text-5xl md:text-7xl font-medium text-text-primary mb-6 leading-tight">
            No Worries!
          </h1>

          <p className="text-lg md:text-xl text-text-secondary mb-8 font-light max-w-2xl mx-auto leading-relaxed">
            Your payment was cancelled and no charges were made to your card. You can try again whenever you're ready.
          </p>

          {/* Divider */}
          <div className="flex items-center justify-center my-8">
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-primary-400 to-transparent"></div>
            <div className="mx-4">
              <div className="w-3 h-3 bg-primary-400 rounded-full"></div>
            </div>
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-primary-400 to-transparent"></div>
          </div>
        </div>

        {/* Information Section */}
        <div
          ref={detailsAnimation.ref}
          className={`pb-20 transition-all duration-700 delay-300 ${
            detailsAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-primary-200 shadow-lg">
            <h2 className="font-heading text-2xl md:text-3xl font-medium text-text-primary mb-6 text-center">
              What Would You Like to Do?
            </h2>

            <div className="space-y-6">
              {/* Option 1 */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-500 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-corporate font-bold text-lg text-text-primary mb-2">
                    Try Again
                  </h3>
                  <p className="text-sm md:text-base text-text-secondary leading-relaxed mb-3">
                    Ready to complete your purchase? You can return to the product page and try the checkout process again.
                  </p>
                  <Link
                    to="/journal"
                    className="inline-block bg-gradient-to-r from-primary-400 to-primary-500 text-white py-2 px-6 rounded-full font-corporate font-medium text-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary-400/40 shadow-md shadow-primary-400/30 uppercase tracking-wider"
                  >
                    View Journal
                  </Link>
                </div>
              </div>

              {/* Option 2 */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-500 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-corporate font-bold text-lg text-text-primary mb-2">
                    Explore More Products
                  </h3>
                  <p className="text-sm md:text-base text-text-secondary leading-relaxed mb-3">
                    Discover our book and other resources to support your authentic leadership journey.
                  </p>
                  <Link
                    to="/book"
                    className="inline-block bg-white text-text-primary py-2 px-6 rounded-full font-corporate font-medium text-sm border border-primary-400/30 transition-all duration-300 hover:-translate-y-1 hover:bg-primary-400/10 uppercase tracking-wider"
                  >
                    View Book
                  </Link>
                </div>
              </div>

              {/* Option 3 */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-500 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-corporate font-bold text-lg text-text-primary mb-2">
                    Need Help?
                  </h3>
                  <p className="text-sm md:text-base text-text-secondary leading-relaxed mb-3">
                    If you experienced any issues during checkout or have questions, we're here to help.
                  </p>
                  <Link
                    to="/connect"
                    className="inline-block bg-white text-text-primary py-2 px-6 rounded-full font-corporate font-medium text-sm border border-primary-400/30 transition-all duration-300 hover:-translate-y-1 hover:bg-primary-400/10 uppercase tracking-wider"
                  >
                    Contact Support
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Back to Home */}
          <div className="mt-12 text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-text-secondary hover:text-primary-500 transition-colors text-base font-corporate"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Return to Homepage
            </Link>
          </div>

          {/* Reassurance Message */}
          <div className="mt-8">
            <div className="bg-primary-50 border border-primary-200 rounded-2xl p-6 text-center">
              <p className="text-sm md:text-base text-text-secondary leading-relaxed">
                <strong className="text-text-primary font-corporate">No charges were made.</strong> Your card was not charged and your information is secure.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
