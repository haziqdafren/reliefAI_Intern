import React, { useState } from 'react';
import { SuccessModal } from './ui/SuccessModal';
import { ErrorMessage } from './ui/ErrorMessage';
import { useNewsletter } from '../contexts/NewsletterContext';
import { submitNewsletter } from '../utils/airtable';

export const NewsletterBanner = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [emailError, setEmailError] = useState('');
  const { isNewsletterVisible, setNewsletterVisible } = useNewsletter();

  const validateEmail = (email: string) => {
    // More comprehensive email validation
    // Allows for international domains, new TLDs, and various formats
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return emailRegex.test(email);
  };

  const getEmailErrorMessage = (email: string) => {
    if (!email.includes('@')) {
      return 'Please include an "@" in the email address. "' + email + '" is missing an "@"';
    }
    
    const parts = email.split('@');
    if (parts.length > 2) {
      return 'Email address can only contain one "@" symbol';
    }
    
    const domain = parts[1];
    if (!domain || !domain.includes('.')) {
      return 'Please include a domain with an extension (e.g., .com, .org, .co.uk)';
    }
    
    if (domain.startsWith('.') || domain.endsWith('.')) {
      return 'Domain cannot start or end with a period';
    }
    
    return 'Please enter a valid email address. Examples: name@company.com, user@university.edu, contact@startup.io';
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    
    // Clear error when user starts typing
    if (emailError) {
      setEmailError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear previous errors
    setEmailError('');

    if (!email.trim()) {
      setEmailError('Please enter your email address');
      return;
    }

    if (!validateEmail(email)) {
      setEmailError(getEmailErrorMessage(email));
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await submitNewsletter({
        email: email.trim(),
        source: 'website-banner'
      });

      if (result.success) {
        setShowSuccess(true);
        setEmail('');
      } else {
        if (result.alreadySubscribed) {
          setEmailError('This email is already subscribed!');
        } else {
          setEmailError(result.error || 'Failed to subscribe. Please try again.');
        }
      }
    } catch (error) {
      setEmailError('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setNewsletterVisible(false);
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    setNewsletterVisible(false); // Hide banner after modal is closed
  };

  return (
    <>
      {/* Newsletter Banner */}
      {isNewsletterVisible && (
        <div className="bg-text-primary text-white py-2 px-4 z-[60] fixed top-0 left-0 right-0 border-b border-primary-200/20">
          <div className="container mx-auto flex items-center justify-center max-w-6xl">
            {/* Simplified newsletter content */}
            <div className="flex items-center gap-4">
              <span className="font-corporate text-sm">
                Get weekly leadership insights
              </span>

              {/* Minimal signup form */}
              <div className="relative">
                <form onSubmit={handleSubmit} className="flex items-center gap-2">
                  <div className="relative">
                    <input
                      type="text"
                      value={email}
                      onChange={handleEmailChange}
                      placeholder="your@email.com"
                      className={`bg-white/10 text-white px-3 py-1 rounded text-sm font-corporate placeholder:text-white/60 focus:outline-none transition-colors w-40 border ${
                        emailError 
                          ? 'border-red-400 focus:bg-red-500/20' 
                          : 'border-white/20 focus:bg-white/20'
                      }`}
                      disabled={isSubmitting}
                    />
                    {emailError && <ErrorMessage message={emailError} />}
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting || !email.trim()}
                    className="bg-white/20 text-white px-3 py-1 rounded text-sm font-corporate hover:bg-white/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed border border-white/20"
                  >
                    {isSubmitting ? '...' : 'Join'}
                  </button>
                </form>
              </div>
            </div>

            {/* Minimal close button */}
            <button
              onClick={handleClose}
              className="absolute right-4 text-white/60 hover:text-white transition-colors"
              aria-label="Close newsletter banner"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Success Modal - Always rendered outside banner */}
      <SuccessModal 
        isOpen={showSuccess}
        onClose={handleSuccessClose}
        title="Thank You!"
        message="Thanks for subscribing! You'll receive leadership insights soon."
      />
    </>
  );
};