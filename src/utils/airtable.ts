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

