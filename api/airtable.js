const Airtable = require('airtable');

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const {
      AIRTABLE_API_KEY,
      AIRTABLE_BASE_ID,
      AIRTABLE_INQUIRIES_TABLE = 'Inquiries',
    } = process.env;

    if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Airtable configuration missing' }),
      };
    }

    // Initialize Airtable
    const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_BASE_ID);

    // Parse request body
    const body = JSON.parse(event.body);
    const { inquiryType, firstName, lastName, email, phone, message } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' }),
      };
    }

    // Create record in Airtable
    const records = await base(AIRTABLE_INQUIRIES_TABLE).create([
      {
        fields: {
          'Inquiry Type': inquiryType || '1:1 coaching',
          'First Name': firstName,
          'Last Name': lastName,
          'Email': email,
          'Phone': phone || '',
          'Message': message,
          'Date': new Date().toISOString(),
        },
      },
    ]);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        success: true,
        recordId: records[0].id,
      }),
    };
  } catch (error) {
    console.error('Airtable error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Failed to submit inquiry',
        details: error.message,
      }),
    };
  }
};

