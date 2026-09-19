import React, { useRef, useState } from 'react';
import { ErrorMessage } from '../ui/ErrorMessage';
import { SuccessModal } from '../ui/SuccessModal';
import { submitGuestSuggestion } from '../../utils/airtable';

/** Matches the per-field caps enforced by /api/guest-suggestion. */
const MAX_LENGTHS = {
  firstName: 100,
  lastName: 100,
  email: 254,
  guestName: 200,
  topics: 500,
  value: 5000,
  links: 2000,
  notes: 5000,
} as const;

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
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
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
 * Accessibility attributes shared by every field: programmatic required state,
 * invalid state, and the link to its error message.
 */
const a11yProps = (name: string, errors: { [key: string]: string }, required = false) => ({
  name,
  id: `sg-${name}`,
  required,
  'aria-required': required || undefined,
  'aria-invalid': errors[name] ? (true as const) : undefined,
  'aria-describedby': errors[name] ? `sg-${name}-error` : undefined,
});

/**
 * "Suggest a future guest" form. Submits to /api/guest-suggestion, which
 * writes to a dedicated Airtable table.
 */
export const SuggestGuestForm = () => {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  /** Bot trap: hidden from real users, so any value means an automated submit. */
  const [honeypot, setHoneypot] = useState('');
  const formRef = useRef<HTMLFormElement>(null);
  /** Restores focus to the submit button when the success modal closes. */
  const submitRef = useRef<HTMLButtonElement>(null);

  /** Move focus to the first field that failed, so the user lands on the problem. */
  const focusFirstError = (found: { [key: string]: string }) => {
    const order = ['firstName', 'lastName', 'email', 'guestName', 'topics', 'value'];
    const first = order.find((name) => found[name]);
    if (!first || !formRef.current) return;
    const field = formRef.current.querySelector<HTMLElement>(`[name="${first}"]`);
    field?.focus();
    field?.scrollIntoView({ block: 'center', behavior: 'smooth' });
  };

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
      focusFirstError(found);
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await submitGuestSuggestion({ ...formData, website: honeypot });
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
      <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-6 max-w-3xl">
        <p className="font-corporate text-sm text-text-secondary">
          Fields marked * are required.
        </p>

        {/* Honeypot: hidden from people, visible to bots. */}
        <div aria-hidden="true" className="absolute left-[-9999px] w-px h-px overflow-hidden">
          <label htmlFor="sg-website">Website (leave blank)</label>
          <input
            id="sg-website"
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </div>
        {/* Name */}
        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="sg-firstName" className={labelClasses}>First name *</label>
            <div className="relative">
              <input
                {...a11yProps('firstName', errors, true)}
                maxLength={MAX_LENGTHS.firstName}
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                className={fieldClasses(Boolean(errors.firstName))}
              />
              {errors.firstName && <ErrorMessage id={`sg-firstName-error`} message={errors.firstName} />}
            </div>
          </div>
          <div>
            <label htmlFor="sg-lastName" className={labelClasses}>Last name *</label>
            <div className="relative">
              <input
                {...a11yProps('lastName', errors, true)}
                maxLength={MAX_LENGTHS.lastName}
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                className={fieldClasses(Boolean(errors.lastName))}
              />
              {errors.lastName && <ErrorMessage id={`sg-lastName-error`} message={errors.lastName} />}
            </div>
          </div>
        </div>

        {/* Email */}
        <div>
          <label htmlFor="sg-email" className={labelClasses}>Your email *</label>
          <div className="relative">
            <input
              {...a11yProps('email', errors, true)}
              maxLength={MAX_LENGTHS.email}
              type="email"
              value={formData.email}
              onChange={handleChange}
              className={fieldClasses(Boolean(errors.email))}
            />
            {errors.email && <ErrorMessage id={`sg-email-error`} message={errors.email} />}
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
            className={`${fieldClasses(false)} appearance-none bg-[url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' stroke='%232C2C2C' stroke-width='2' viewBox='0 0 24 24'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")] bg-no-repeat bg-[length:1rem] bg-[right_1rem_center] pr-10`}
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
              {...a11yProps('guestName', errors, true)}
              maxLength={MAX_LENGTHS.guestName}
              type="text"
              value={formData.guestName}
              onChange={handleChange}
              className={fieldClasses(Boolean(errors.guestName))}
            />
            {errors.guestName && <ErrorMessage id={`sg-guestName-error`} message={errors.guestName} />}
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
            className={`${fieldClasses(false)} appearance-none bg-[url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' stroke='%232C2C2C' stroke-width='2' viewBox='0 0 24 24'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")] bg-no-repeat bg-[length:1rem] bg-[right_1rem_center] pr-10`}
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
              {...a11yProps('topics', errors, true)}
              maxLength={MAX_LENGTHS.topics}
              type="text"
              value={formData.topics}
              onChange={handleChange}
              className={fieldClasses(Boolean(errors.topics))}
            />
            {errors.topics && <ErrorMessage id={`sg-topics-error`} message={errors.topics} />}
          </div>
        </div>

        <div>
          <label htmlFor="sg-value" className={labelClasses}>
            What value would they bring to the audience? *
          </label>
          <div className="relative">
            <textarea
              {...a11yProps('value', errors, true)}
              maxLength={MAX_LENGTHS.value}
              value={formData.value}
              onChange={handleChange}
              rows={4}
              className={`${fieldClasses(Boolean(errors.value))} resize-none`}
            />
            {errors.value && <ErrorMessage id={`sg-value-error`} message={errors.value} />}
          </div>
        </div>

        <div>
          <label htmlFor="sg-links" className={labelClasses}>
            Helpful links (articles, videos, books, website)
          </label>
          <textarea
            {...a11yProps('links', errors)}
            maxLength={MAX_LENGTHS.links}
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
            {...a11yProps('notes', errors)}
            maxLength={MAX_LENGTHS.notes}
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
            ref={submitRef}
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
        onClose={() => {
          setShowSuccess(false);
          submitRef.current?.focus();
        }}
        title="Thank You!"
        message="Thanks for your suggestion. Every one is read, though I'm not always able to reply personally."
      />
    </>
  );
};
