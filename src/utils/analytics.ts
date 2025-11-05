// Google Analytics 4 Utility Functions

// Declare gtag for TypeScript
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

// Check if GA is loaded
const isGALoaded = (): boolean => {
  return typeof window !== 'undefined' && typeof window.gtag === 'function';
};

/**
 * Track page views
 * Automatically called by React Router
 */
export const trackPageView = (path: string) => {
  if (!isGALoaded()) return;

  window.gtag!('config', process.env.REACT_APP_GA_MEASUREMENT_ID || 'G-EG1FN3E7EZ', {
    page_path: path,
  });
};

/**
 * Track custom events
 * @param eventName - Name of the event
 * @param eventParams - Optional parameters for the event
 */
export const trackEvent = (eventName: string, eventParams?: Record<string, any>) => {
  if (!isGALoaded()) return;

  window.gtag!('event', eventName, eventParams);
};

/**
 * Track newsletter signups
 */
export const trackNewsletterSignup = (source: string = 'website-banner') => {
  trackEvent('newsletter_signup', {
    event_category: 'engagement',
    event_label: source,
    value: 1,
  });
};

/**
 * Track contact form submissions
 */
export const trackContactFormSubmit = (inquiryType: string) => {
  trackEvent('contact_form_submit', {
    event_category: 'engagement',
    event_label: inquiryType,
    value: 1,
  });
};

/**
 * Track payment button clicks
 */
export const trackPaymentClick = (productName: string, productType: string, price?: number) => {
  trackEvent('begin_checkout', {
    event_category: 'ecommerce',
    event_label: productName,
    product_type: productType,
    value: price,
    currency: 'USD',
  });
};

/**
 * Track successful payments
 */
export const trackPurchase = (
  transactionId: string,
  productName: string,
  price: number,
  currency: string = 'USD'
) => {
  trackEvent('purchase', {
    event_category: 'ecommerce',
    transaction_id: transactionId,
    value: price,
    currency: currency,
    items: [
      {
        item_name: productName,
        price: price,
        quantity: 1,
      },
    ],
  });
};

/**
 * Track payment cancellations
 */
export const trackPaymentCancel = (productName?: string) => {
  trackEvent('payment_cancelled', {
    event_category: 'ecommerce',
    event_label: productName || 'unknown',
  });
};

/**
 * Track CTA button clicks
 */
export const trackCTAClick = (ctaName: string, ctaLocation: string) => {
  trackEvent('cta_click', {
    event_category: 'engagement',
    event_label: ctaName,
    cta_location: ctaLocation,
  });
};

/**
 * Track outbound link clicks
 */
export const trackOutboundLink = (url: string, linkText: string) => {
  trackEvent('click', {
    event_category: 'outbound',
    event_label: linkText,
    outbound_url: url,
  });
};

/**
 * Track social media clicks
 */
export const trackSocialClick = (platform: string) => {
  trackEvent('social_click', {
    event_category: 'engagement',
    event_label: platform,
  });
};

/**
 * Track file downloads
 */
export const trackDownload = (fileName: string, fileType: string) => {
  trackEvent('file_download', {
    event_category: 'engagement',
    event_label: fileName,
    file_type: fileType,
  });
};

/**
 * Track user engagement time on specific sections
 */
export const trackEngagement = (section: string, duration: number) => {
  trackEvent('user_engagement', {
    event_category: 'engagement',
    event_label: section,
    engagement_time_msec: duration,
  });
};

// Export all tracking functions
export const analytics = {
  trackPageView,
  trackEvent,
  trackNewsletterSignup,
  trackContactFormSubmit,
  trackPaymentClick,
  trackPurchase,
  trackPaymentCancel,
  trackCTAClick,
  trackOutboundLink,
  trackSocialClick,
  trackDownload,
  trackEngagement,
};

export default analytics;
