import React, { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useNewsletter } from '../contexts/NewsletterContext';

export const PaymentSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const { isNewsletterVisible } = useNewsletter();
  const heroAnimation = useScrollAnimation();
  const detailsAnimation = useScrollAnimation();

  useEffect(() => {
    // Optional: Fetch session details from backend if needed
    // For now, we'll show a generic success message
    if (sessionId) {
      // Future enhancement: fetch(`/api/get-session?session_id=${sessionId}`)
      console.log('Payment successful! Session ID:', sessionId);
    }
  }, [sessionId]);

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
        {/* Success Hero Section */}
        <div
          ref={heroAnimation.ref}
          className={`py-20 text-center transition-all duration-700 ${
            heroAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {/* Success Icon */}
          <div className="mb-8 flex justify-center">
            <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center shadow-xl shadow-green-400/40 animate-scale-in">
              <svg
                className="w-12 h-12 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          <div className="bg-green-50 text-green-600 py-2 px-6 rounded-full text-sm font-medium uppercase tracking-wider inline-block mb-6 border border-green-200">
            Payment Successful
          </div>

          <h1 className="font-heading text-5xl md:text-7xl font-medium text-text-primary mb-6 leading-tight">
            Thank You for Your Order!
          </h1>

          <p className="text-lg md:text-xl text-text-secondary mb-8 font-light max-w-2xl mx-auto leading-relaxed">
            Your payment has been processed successfully. We're excited to be part of your authentic leadership journey!
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

        {/* Order Details Section */}
        <div
          ref={detailsAnimation.ref}
          className={`pb-20 transition-all duration-700 delay-300 ${
            detailsAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-primary-200 shadow-lg">
            <h2 className="font-heading text-2xl md:text-3xl font-medium text-text-primary mb-6 text-center">
              What Happens Next?
            </h2>

            <div className="space-y-6">
              {/* Step 1 */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-corporate font-bold">1</span>
                </div>
                <div>
                  <h3 className="font-corporate font-bold text-lg text-text-primary mb-2">
                    Confirmation Email
                  </h3>
                  <p className="text-sm md:text-base text-text-secondary leading-relaxed">
                    You'll receive an email confirmation with your order details within the next few minutes. Please check your spam folder if you don't see it.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-corporate font-bold">2</span>
                </div>
                <div>
                  <h3 className="font-corporate font-bold text-lg text-text-primary mb-2">
                    Order Processing
                  </h3>
                  <p className="text-sm md:text-base text-text-secondary leading-relaxed">
                    Your order is being prepared. For physical products, we'll send tracking information once your item ships. Digital content will be available immediately via email.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-corporate font-bold">3</span>
                </div>
                <div>
                  <h3 className="font-corporate font-bold text-lg text-text-primary mb-2">
                    Begin Your Journey
                  </h3>
                  <p className="text-sm md:text-base text-text-secondary leading-relaxed">
                    Start exploring your new materials and take the first steps toward authentic leadership and personal growth.
                  </p>
                </div>
              </div>
            </div>

            {/* Order Reference */}
            {sessionId && (
              <div className="mt-8 p-4 bg-primary-50 rounded-xl border border-primary-200">
                <p className="text-sm text-text-secondary text-center">
                  Order Reference: <span className="font-corporate font-medium text-text-primary">{sessionId.substring(0, 24)}...</span>
                </p>
              </div>
            )}
          </div>

          {/* Call to Action Buttons */}
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/"
              className="bg-gradient-to-r from-primary-400 to-primary-500 text-white py-4 px-10 rounded-full font-corporate font-medium text-base transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary-400/40 shadow-lg shadow-primary-400/30 uppercase tracking-wider"
            >
              Return Home
            </Link>
            <Link
              to="/connect"
              className="bg-white/80 backdrop-blur-sm text-text-primary py-4 px-10 rounded-full font-corporate font-medium text-base border border-primary-400/30 transition-all duration-300 hover:-translate-y-1 hover:bg-primary-400/10 uppercase tracking-wider"
            >
              Contact Us
            </Link>
          </div>

          {/* Additional Information */}
          <div className="mt-12 text-center">
            <p className="text-sm md:text-base text-text-secondary max-w-2xl mx-auto leading-relaxed">
              Questions about your order? Need support?{' '}
              <Link to="/connect" className="text-primary-500 hover:text-primary-400 font-medium underline">
                Reach out to us
              </Link>
              {' '}and we'll be happy to help!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
