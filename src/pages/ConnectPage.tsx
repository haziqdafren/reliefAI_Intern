import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { ErrorMessage } from '../components/ui/ErrorMessage';
import { SuccessModal } from '../components/ui/SuccessModal';
import { submitToAirtable } from '../utils/airtable';

export const ConnectPage = () => {
  const titleAnimation = useScrollAnimation();
  const formAnimation = useScrollAnimation();
  const [formData, setFormData] = React.useState({
    inquiryType: '1:1 coaching',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });
  const [errors, setErrors] = React.useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [showSuccess, setShowSuccess] = React.useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return emailRegex.test(email);
  };

  const getEmailErrorMessage = (email: string) => {
    if (!email.includes('@')) return 'Please include an "@" in the email address.';
    const parts = email.split('@');
    if (parts.length > 2) return 'Email address can only contain one "@" symbol';
    const domain = parts[1];
    if (!domain || !domain.includes('.')) return 'Please include a domain with an extension (e.g., .com, .org)';
    if (domain.startsWith('.') || domain.endsWith('.')) return 'Domain cannot start or end with a period';
    return 'Please enter a valid email address.';
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!validateEmail(formData.email)) newErrors.email = getEmailErrorMessage(formData.email);
    if (!formData.message.trim()) newErrors.message = 'Please add a short message';
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    const foundErrors = validate();
    if (Object.keys(foundErrors).length > 0) {
      setErrors(foundErrors);
      return;
    }
    setIsSubmitting(true);
    
    try {
      const result = await submitToAirtable({
        inquiryType: formData.inquiryType,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
      });

      if (result.success) {
        setShowSuccess(true);
        setFormData({ inquiryType: '1:1 coaching', firstName: '', lastName: '', email: '', phone: '', message: '' });
      } else {
        setErrors({ submit: result.error || 'Failed to submit. Please try again.' });
      }
    } catch (error) {
      setErrors({ submit: 'An error occurred. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-32 min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 relative overflow-hidden">
      {/* Professional background elements - consistent with other pages */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-40 w-96 h-96 bg-primary-400/3 rounded-full animate-pulse"></div>
        <div className="absolute bottom-32 -right-48 w-80 h-80 bg-primary-500/4 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-primary-300/2 rounded-full animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* Professional header consistent with other pages */}
        <div
          ref={titleAnimation.ref}
          className={`text-center py-20 relative transition-all duration-1000 ${
            titleAnimation.isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="relative inline-block mb-8">
            <div className="bg-primary-400/10 text-primary-400 py-3 px-8 rounded-full text-sm font-medium uppercase tracking-wider border border-primary-400/20">
              Let's Connect
            </div>
          </div>

          <div className="relative max-w-5xl mx-auto">
            <h1 className="font-heading text-6xl md:text-8xl font-medium text-text-primary mb-8 leading-tight">
              Begin Your Path to Authentic Growth
            </h1>

            {/* Professional connector - consistent with other pages */}
            <div className="flex items-center justify-center my-8">
              <div className="w-20 h-px bg-gradient-to-r from-transparent via-primary-400 to-transparent"></div>
              <div className="mx-4">
                <div className="w-3 h-3 bg-primary-400 rounded-full"></div>
              </div>
              <div className="w-20 h-px bg-gradient-to-r from-transparent via-primary-400 to-transparent"></div>
            </div>

            <p className="text-lg md:text-xl text-text-secondary font-light max-w-4xl mx-auto leading-relaxed">
              Whether you're exploring coaching, speaking engagements, or simply want to connect,
              I'd love to hear from you. Every meaningful conversation starts with a single message.
            </p>
          </div>
        </div>

        {/* Contact form section - consistent styling */}
        <div
          ref={formAnimation.ref}
          className={`max-w-4xl mx-auto pb-20 transition-all duration-700 delay-300 ${
            formAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="p-0 md:p-0">
            <form onSubmit={handleSubmit} noValidate className="space-y-8">
              {/* Inquiry + Names */}
              <div className="grid md:grid-cols-2 gap-8">
                <div className="md:col-span-2">
                  <label className="block text-text-primary font-medium mb-3 text-sm uppercase tracking-wider">Inquiry</label>
                  <div className="relative">
                    <select
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-4 border border-primary-200/50 rounded-xl font-corporate bg-white focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 appearance-none"
                    >
                      <option>1:1 coaching</option>
                      <option>Speaking</option>
                      <option>Sponsorship</option>
                      <option>Press</option>
                      <option>Support</option>
                    </select>
                  </div>
                </div>

                <div className="md:col-span-1">
                  <label className="block text-text-primary font-medium mb-3 text-sm uppercase tracking-wider">First name</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-4 border rounded-xl font-corporate focus:outline-none focus:ring-2 transition-all duration-300 bg-white ${errors.firstName ? 'border-red-400 focus:border-red-400 focus:ring-red-200' : 'border-primary-200/50 focus:border-primary-400 focus:ring-primary-400/20'}`}
                    />
                    {errors.firstName && <ErrorMessage message={errors.firstName} />}
                  </div>
                </div>

                <div className="md:col-span-1">
                  <label className="block text-text-primary font-medium mb-3 text-sm uppercase tracking-wider">Last name</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-4 border rounded-xl font-corporate focus:outline-none focus:ring-2 transition-all duration-300 bg-white ${errors.lastName ? 'border-red-400 focus:border-red-400 focus:ring-red-200' : 'border-primary-200/50 focus:border-primary-400 focus:ring-primary-400/20'}`}
                    />
                    {errors.lastName && <ErrorMessage message={errors.lastName} />}
                  </div>
                </div>
              </div>

              {/* Contact */}
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-text-primary font-medium mb-3 text-sm uppercase tracking-wider">Email</label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-4 border rounded-xl font-corporate focus:outline-none focus:ring-2 transition-all duration-300 bg-white ${errors.email ? 'border-red-400 focus:border-red-400 focus:ring-red-200' : 'border-primary-200/50 focus:border-primary-400 focus:ring-primary-400/20'}`}
                    />
                    {errors.email && <ErrorMessage message={errors.email} />}
                  </div>
                </div>

                <div>
                  <label className="block text-text-primary font-medium mb-3 text-sm uppercase tracking-wider">Phone (optional)</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 border border-primary-200/50 rounded-xl font-corporate focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 transition-all duration-300 bg-white"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-text-primary font-medium mb-3 text-sm uppercase tracking-wider">Message</label>
                <div className="relative">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    className={`w-full px-4 py-4 border rounded-xl font-corporate focus:outline-none focus:ring-2 transition-all duration-300 resize-none bg-white ${errors.message ? 'border-red-400 focus:border-red-400 focus:ring-red-200' : 'border-primary-200/50 focus:border-primary-400 focus:ring-primary-400/20'}`}
                  />
                  {errors.message && <ErrorMessage message={errors.message} />}
                </div>
              </div>

              {/* Submit Error */}
              {errors.submit && (
                <div className="text-center">
                  <ErrorMessage message={errors.submit} />
                </div>
              )}

              {/* Actions */}
              <div className="text-center pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-primary-400 to-primary-500 text-white py-4 px-12 rounded-full font-corporate font-medium text-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary-400/40 shadow-lg shadow-primary-400/30 uppercase tracking-wider disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending…' : 'Send Message'}
                </button>
              </div>
            </form>

            {/* Trust indicators removed per request */}
          </div>
          {/* Success Modal */}
          <SuccessModal
            isOpen={showSuccess}
            onClose={() => setShowSuccess(false)}
            title="Thank You!"
            message="Thanks for reaching out! I'll get back to you within 24 hours."
          />
        </div>
      </div>
    </div>
  );
};