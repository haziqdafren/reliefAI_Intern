import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Modal } from './ui/Modal';
import { ErrorMessage } from './ui/ErrorMessage';
import { SuccessModal } from './ui/SuccessModal';

export const AboutSection = () => {
  const textAnimation = useScrollAnimation();
  const imageAnimation = useScrollAnimation();

  const [isModalOpen, setIsModalOpen] = React.useState(false);
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return emailRegex.test(email);
  };

  const getEmailErrorMessage = (email: string) => {
    if (!email.includes('@')) {
      return 'Please include an "@" in the email address.';
    }
    const parts = email.split('@');
    if (parts.length > 2) {
      return 'Email address can only contain one "@" symbol';
    }
    const domain = parts[1];
    if (!domain || !domain.includes('.')) {
      return 'Please include a domain with an extension (e.g., .com, .org)';
    }
    if (domain.startsWith('.') || domain.endsWith('.')) {
      return 'Domain cannot start or end with a period';
    }
    return 'Please enter a valid email address.';
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = getEmailErrorMessage(formData.email);
    }
    if (!formData.message.trim()) newErrors.message = 'Please add a short message';
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    const foundErrors = validate();
    if (Object.keys(foundErrors).length > 0) {
      setErrors(foundErrors);
      return;
    }

    setIsSubmitting(true);
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      setFormData({ inquiryType: 'Speaking', firstName: '', lastName: '', email: '', phone: '', message: '' });
      setIsModalOpen(false);
    }, 700);
  };

  return (
    <>
    <section className="py-32 bg-gradient-to-br from-white via-primary-50/20 to-white overflow-hidden" id="about">
      <div className="container mx-auto px-5 max-w-6xl">
        {/* Mobile layout: heading → photo → text */}
        <div className="block md:hidden">
          <h2 className="font-heading whitespace-nowrap text-4xl sm:text-5xl font-medium text-text-primary mb-8 leading-tight text-center">
            Meet Jessie Li
          </h2>
          
          <div className="mb-8">
            <div className="relative h-96 md:h-[700px] perspective-1000">
              <div className="w-full h-full rounded-3xl overflow-hidden relative transition-transform duration-700 hover:rotate-y-6 hover:rotate-x-6 shadow-2xl shadow-black/15" style={{ transformStyle: 'preserve-3d' }}>
                <img
                  src="/2.JPG"
                  alt="Jessie Li Professional Headshot - Option 2"
                  className="w-full h-full object-cover object-top scale-105 hover:scale-100 transition-transform duration-700"
                  style={{
                    filter: 'contrast(1.05) brightness(1.02) saturate(1.08)',
                  }}
                />
              </div>
            </div>
          </div>

          <div>
            <div className="text-base text-text-secondary mb-8 font-normal leading-relaxed space-y-4 max-w-2xl mx-auto">
              <p>Hi, I'm Jessie—entrepreneur, philanthropist, leadership coach, and speaker; former banker and author of Dancing with Wolves.</p>
              <p>I empower women across every generation to lead authentically and age gracefully. My work integrates boardroom strategy, cultural storytelling, and wellbeing science to build confident, research‑driven, and resilient leaders.</p>
              <p>After a decade in banking and commodities—and years navigating male‑dominated spaces—I learned that real power isn't about mimicking the mold or fitting in; it's about honoring the full spectrum of who you are.</p>
              <p>Through my BALANCE framework, I help women reclaim their voice, embody their feminine power, and rise in leadership without losing themselves.</p>
              <p>If you're ready to lead from your authentic self and break old leadership molds, you're in the right place.</p>
            </div>
            <div className="flex flex-col gap-4 justify-center items-stretch">
              <a
                href="/about"
                className="bg-gradient-to-r from-primary-400 to-primary-500 text-white py-3 px-8 rounded-full text-xs font-corporate font-medium transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary-400/40 shadow-lg shadow-primary-400/30 w-full text-center"
              >
                Read More about Jessie
              </a>
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="glass backdrop-blur-md text-text-primary py-3 px-8 border border-primary-400 rounded-full text-xs font-corporate font-medium transition-all duration-300 hover:bg-primary-400/10 hover:-translate-y-1 w-full text-center"
              >
                Connect With Me
              </button>
            </div>
          </div>
        </div>

        {/* Desktop layout: text + photo side by side */}
        <div className="hidden md:grid md:grid-cols-12 gap-16 lg:gap-24 items-center">
          <div
            ref={textAnimation.ref}
            className={`md:col-span-7 transition-all duration-700 ${
              textAnimation.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
          >
            <h2 className="font-heading whitespace-nowrap text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-medium text-text-primary mb-6 leading-tight">
              Meet Jessie Li
            </h2>
            <div className="text-base md:text-lg text-text-secondary mb-8 font-normal leading-relaxed space-y-4 max-w-2xl">
              <p>Hi, I'm Jessie—entrepreneur, philanthropist, leadership coach, and speaker; former banker and author of Dancing with Wolves.</p>
              <p>I empower women across every generation to lead authentically and age gracefully. My work integrates boardroom strategy, cultural storytelling, and wellbeing science to build confident, research‑driven, and resilient leaders.</p>
              <p>After a decade in banking and commodities—and years navigating male‑dominated spaces—I learned that real power isn't about mimicking the mold or fitting in; it's about honoring the full spectrum of who you are.</p>
              <p>Through my BALANCE framework, I help women reclaim their voice, embody their feminine power, and rise in leadership without losing themselves.</p>
              <p>If you're ready to lead from your authentic self and break old leadership molds, you're in the right place.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-start items-stretch sm:items-center">
              <a
                href="/about"
                className="bg-gradient-to-r from-primary-400 to-primary-500 text-white py-3 px-8 rounded-full text-xs md:text-sm font-corporate font-medium transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary-400/40 shadow-lg shadow-primary-400/30 w-full sm:w-auto text-center"
              >
                Read More about Jessie
              </a>
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="glass backdrop-blur-md text-text-primary py-3 px-8 border border-primary-400 rounded-full text-xs md:text-sm font-corporate font-medium transition-all duration-300 hover:bg-primary-400/10 hover:-translate-y-1 w-full sm:w-auto text-center"
              >
                Connect With Me
              </button>
            </div>
          </div>

          <div
            ref={imageAnimation.ref}
            className={`md:col-span-5 transition-all duration-700 delay-300 ${
              imageAnimation.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            <div className="relative h-96 md:h-[700px] perspective-1000">
              <div className="w-full h-full rounded-3xl overflow-hidden relative transition-transform duration-700 hover:rotate-y-6 hover:rotate-x-6 shadow-2xl shadow-black/15" style={{ transformStyle: 'preserve-3d' }}>
                <img
                  src="/2.JPG"
                  alt="Jessie Li Professional Headshot - Option 2"
                  className="w-full h-full object-cover object-top scale-105 hover:scale-100 transition-transform duration-700"
                  style={{
                    filter: 'contrast(1.05) brightness(1.02) saturate(1.08)',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Book Me modal - inspired by Codie Sanchez connect form */}
    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} className="max-w-3xl md:max-w-4xl lg:max-w-5xl">
      <div className="p-6 md:p-8 lg:p-10">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="font-heading text-2xl md:text-3xl lg:text-4xl font-medium text-text-primary">Connect With Me to Create Change</h3>
            <p className="text-text-secondary mt-2">Share a few details and I'll respond within 24 hours.</p>
          </div>
          <button
            aria-label="Close"
            onClick={() => setIsModalOpen(false)}
            className="w-9 h-9 rounded-full border border-primary-200/60 text-text-secondary hover:text-text-primary hover:border-primary-300 transition-colors"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          {/* Inquiry Type */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-text-primary font-medium mb-2 text-xs uppercase tracking-wider">Inquiry</label>
              <div className="relative">
                <select
                  name="inquiryType"
                  value={formData.inquiryType}
                  onChange={handleInputChange as any}
                  className="w-full px-4 py-3 border border-primary-200/50 rounded-xl font-corporate bg-white focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 appearance-none"
                >
                  <option>1:1 coaching</option>
                  <option>Speaking</option>
                  <option>Sponsorship</option>
                  <option>Press</option>
                  <option>Support</option>
                </select>
              </div>
            </div>

            {/* Name Fields */}
            <div className="md:col-span-1">
              <label className="block text-text-primary font-medium mb-2 text-xs uppercase tracking-wider">First name</label>
              <div className="relative">
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-xl font-corporate focus:outline-none focus:ring-2 transition-all duration-300 bg-white ${errors.firstName ? 'border-red-400 focus:border-red-400 focus:ring-red-200' : 'border-primary-200/50 focus:border-primary-400 focus:ring-primary-400/20'}`}
                />
                {errors.firstName && <ErrorMessage message={errors.firstName} />}
              </div>
            </div>

            <div className="md:col-span-1">
              <label className="block text-text-primary font-medium mb-2 text-xs uppercase tracking-wider">Last name</label>
              <div className="relative">
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-xl font-corporate focus:outline-none focus:ring-2 transition-all duration-300 bg-white ${errors.lastName ? 'border-red-400 focus:border-red-400 focus:ring-red-200' : 'border-primary-200/50 focus:border-primary-400 focus:ring-primary-400/20'}`}
                />
                {errors.lastName && <ErrorMessage message={errors.lastName} />}
              </div>
            </div>
          </div>

          {/* Contact Fields */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-text-primary font-medium mb-2 text-xs uppercase tracking-wider">Email</label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-xl font-corporate focus:outline-none focus:ring-2 transition-all duration-300 bg-white ${errors.email ? 'border-red-400 focus:border-red-400 focus:ring-red-200' : 'border-primary-200/50 focus:border-primary-400 focus:ring-primary-400/20'}`}
                />
                {errors.email && <ErrorMessage message={errors.email} />}
              </div>
            </div>

            <div>
              <label className="block text-text-primary font-medium mb-2 text-xs uppercase tracking-wider">Phone (optional)</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-primary-200/50 rounded-xl font-corporate focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 transition-all duration-300 bg-white"
              />
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-text-primary font-medium mb-2 text-xs uppercase tracking-wider">Message</label>
            <div className="relative">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={8}
                className={`w-full px-4 py-3 border rounded-xl font-corporate focus:outline-none focus:ring-2 transition-all duration-300 resize-none bg-white ${errors.message ? 'border-red-400 focus:border-red-400 focus:ring-red-200' : 'border-primary-200/50 focus:border-primary-400 focus:ring-primary-400/20'}`}
              />
              {errors.message && <ErrorMessage message={errors.message} />}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-6 py-3 rounded-full border border-primary-200 text-text-secondary hover:bg-primary-50 transition-colors font-corporate"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-gradient-to-r from-primary-400 to-primary-500 text-white py-3 px-8 rounded-full font-corporate font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary-400/40 shadow-lg shadow-primary-400/30 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Sending…' : 'Send Message'}
            </button>
          </div>
        </form>
      </div>
    </Modal>

    {/* Success Modal consistent with Newsletter */}
    <SuccessModal
      isOpen={showSuccess}
      onClose={() => setShowSuccess(false)}
      title="Thank You!"
      message="Thanks for reaching out! I'll get back to you within 24 hours."
    />

    </>
  );
};