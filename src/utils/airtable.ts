interface InquiryData {
  inquiryType: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  message: string;
}

interface NewsletterData {
  email: string;
  source?: string;
}

export interface GuestSuggestionData {
  firstName: string;
  lastName: string;
  email: string;
  listenerRelationship: string;
  guestName: string;
  isRepresentative: string;
  topics: string;
  value: string;
  links?: string;
  notes?: string;
  /** Honeypot. Always empty for real people; a value marks the submit as a bot. */
  website?: string;
}

export const submitToAirtable = async (data: InquiryData): Promise<{ success: boolean; error?: string }> => {
  try {
    const response = await fetch('/api/airtable', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.error || 'Failed to submit inquiry',
      };
    }

    return {
      success: true,
    };
  } catch (error) {
    console.error('Error submitting to Airtable:', error);
    return {
      success: false,
      error: 'Network error. Please try again.',
    };
  }
};

export const submitGuestSuggestion = async (data: GuestSuggestionData): Promise<{ success: boolean; error?: string }> => {
  try {
    const response = await fetch('/api/guest-suggestion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      // A platform-level failure (502/504) can return HTML rather than JSON,
      // so parsing is best-effort.
      let message = 'Failed to submit suggestion. Please try again later.';
      try {
        const result = await response.json();
        if (result?.error) message = result.error;
      } catch {
        /* non-JSON error body — keep the generic message */
      }
      return { success: false, error: message };
    }

    return {
      success: true,
    };
  } catch (error) {
    console.error('Error submitting guest suggestion:', error);
    return {
      success: false,
      error: 'Network error. Please try again.',
    };
  }
};

export const submitNewsletter = async (data: NewsletterData): Promise<{ success: boolean; error?: string; alreadySubscribed?: boolean }> => {
  try {
    const response = await fetch('/api/newsletter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.error || 'Failed to subscribe to newsletter',
        alreadySubscribed: result.alreadySubscribed || false,
      };
    }

    return {
      success: true,
    };
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    return {
      success: false,
      error: 'Network error. Please try again.',
    };
  }
};

