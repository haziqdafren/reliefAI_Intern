import React, { useState } from 'react';
import { ErrorMessage } from '../ui/ErrorMessage';
import { SuccessModal } from '../ui/SuccessModal';
import { submitGuestSuggestion } from '../../utils/airtable';

const LISTENER_OPTIONS = [
  "I'm a regular listener",
  'I listen occasionally',
  'I am not a listener',
];

const INITIAL_FORM = {
  firstName: '',
  lastName: '',
  email: '',
  listenerRelationship: LISTENER_OPTIONS[0],
  guestName: '',
  isRepresentative: 'No',
  topics: '',
  value: '',
  links: '',
  notes: '',
};

const validateEmail = (email: string) => {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(email);
};

const fieldClasses = (hasError: boolean) =>
  `w-full px-4 py-3 border rounded-xl font-corporate bg-white transition-all duration-300 focus:outline-none focus:ring-2 ${
    hasError
      ? 'border-red-400 focus:border-red-400 focus:ring-red-200'
      : 'border-primary-300 focus:border-primary-400 focus:ring-primary-400/20'
  }`;

const labelClasses =
  'block text-text-primary font-medium mb-2 text-xs uppercase tracking-wider';

/**
 * "Suggest a future guest" form. Submits to /api/guest-suggestion, which
 * writes to a dedicated Airtable table.
 */
export const SuggestGuestForm = () => {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const found: { [key: string]: string } = {};
    if (!formData.firstName.trim()) found.firstName = 'First name is required';
    if (!formData.lastName.trim()) found.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      found.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      found.email = 'Please enter a valid email address.';
    }
    if (!formData.guestName.trim()) found.guestName = 'Please name the person you are suggesting';
    if (!formData.topics.trim()) found.topics = 'Please suggest at least one topic';
    if (!formData.value.trim()) found.value = 'Please describe the value they would bring';
    return found;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const found = validate();
    if (Object.keys(found).length > 0) {
      setErrors(found);
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await submitGuestSuggestion(formData);
      if (result.success) {
        setShowSuccess(true);
        setFormData(INITIAL_FORM);
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
    <>
      <form onSubmit={handleSubmit} noValidate className="space-y-6 max-w-3xl">
        {/* Name */}
        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="sg-firstName" className={labelClasses}>First name *</label>
            <div className="relative">
              <input
                id="sg-firstName"
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={fieldClasses(Boolean(errors.firstName))}
              />
              {errors.firstName && <ErrorMessage message={errors.firstName} />}
            </div>
          </div>
          <div>
            <label htmlFor="sg-lastName" className={labelClasses}>Last name *</label>
            <div className="relative">
              <input
                id="sg-lastName"
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={fieldClasses(Boolean(errors.lastName))}
              />
              {errors.lastName && <ErrorMessage message={errors.lastName} />}
            </div>
          </div>
        </div>

        {/* Email */}
        <div>
          <label htmlFor="sg-email" className={labelClasses}>Your email *</label>
          <div className="relative">
            <input
              id="sg-email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={fieldClasses(Boolean(errors.email))}
            />
            {errors.email && <ErrorMessage message={errors.email} />}
          </div>
        </div>

        {/* Relationship to the show */}
        <div>
          <label htmlFor="sg-listener" className={labelClasses}>
            What is your relationship with the show?
          </label>
          <select
            id="sg-listener"
            name="listenerRelationship"
            value={formData.listenerRelationship}
            onChange={handleChange}
            className={`${fieldClasses(false)} appearance-none`}
          >
            {LISTENER_OPTIONS.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>

        {/* Guest */}
        <div>
          <label htmlFor="sg-guestName" className={labelClasses}>
            Name of the person you suggest *
          </label>
          <div className="relative">
            <input
              id="sg-guestName"
              type="text"
              name="guestName"
              value={formData.guestName}
              onChange={handleChange}
              className={fieldClasses(Boolean(errors.guestName))}
            />
            {errors.guestName && <ErrorMessage message={errors.guestName} />}
          </div>
        </div>

        <div>
          <label htmlFor="sg-representative" className={labelClasses}>
            Are you an official representative of the person you are suggesting?
          </label>
          <select
            id="sg-representative"
            name="isRepresentative"
            value={formData.isRepresentative}
            onChange={handleChange}
            className={`${fieldClasses(false)} appearance-none`}
          >
            <option>No</option>
            <option>Yes</option>
          </select>
        </div>

        <div>
          <label htmlFor="sg-topics" className={labelClasses}>
            What topic(s) should they be considered for? *
          </label>
          <div className="relative">
            <input
              id="sg-topics"
              type="text"
              name="topics"
              value={formData.topics}
              onChange={handleChange}
              className={fieldClasses(Boolean(errors.topics))}
            />
            {errors.topics && <ErrorMessage message={errors.topics} />}
          </div>
        </div>

        <div>
          <label htmlFor="sg-value" className={labelClasses}>
            What value would they bring to the audience? *
          </label>
          <div className="relative">
            <textarea
              id="sg-value"
              name="value"
              value={formData.value}
              onChange={handleChange}
              rows={4}
              className={`${fieldClasses(Boolean(errors.value))} resize-none`}
            />
            {errors.value && <ErrorMessage message={errors.value} />}
          </div>
        </div>

        <div>
          <label htmlFor="sg-links" className={labelClasses}>
            Helpful links (articles, videos, books, website)
          </label>
          <textarea
            id="sg-links"
            name="links"
            value={formData.links}
            onChange={handleChange}
            rows={3}
            className={`${fieldClasses(false)} resize-none`}
          />
        </div>

        <div>
          <label htmlFor="sg-notes" className={labelClasses}>
            Anything else worth knowing?
          </label>
          <textarea
            id="sg-notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={3}
            className={`${fieldClasses(false)} resize-none`}
          />
        </div>

        {errors.submit && (
          <div className="relative pt-2 pb-6">
            <ErrorMessage message={errors.submit} />
          </div>
        )}

        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-gradient-to-r from-primary-400 to-primary-500 text-white py-4 px-12 rounded-full font-corporate font-medium text-sm uppercase tracking-wider transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary-400/40 shadow-lg shadow-primary-400/30 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          >
            {isSubmitting ? 'Sending…' : 'Submit suggestion'}
          </button>
        </div>
      </form>

      <SuccessModal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        title="Thank You!"
        message="Thanks for your suggestion. Every one is read, though I'm not always able to reply personally."
      />
    </>
  );
};
