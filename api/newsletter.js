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
      AIRTABLE_NEWSLETTER_TABLE = 'Newsletter',
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
    const { email, source = 'website-banner' } = body;

    // Validate required fields
    if (!email) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Email is required' }),
      };
    }

    // Check if email already exists
    const existingRecords = await base(AIRTABLE_NEWSLETTER_TABLE)
      .select({
        filterByFormula: `{Email} = '${email}'`,
        maxRecords: 1,
      })
      .firstPage();

    if (existingRecords.length > 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: 'Email already subscribed',
          alreadySubscribed: true
        }),
      };
    }

    // Create record in Airtable
    const records = await base(AIRTABLE_NEWSLETTER_TABLE).create([
      {
        fields: {
          'Email': email,
          'Subscribed Date': new Date().toISOString(),
          'Status': 'Active',
          'Source': source,
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
    console.error('Newsletter subscription error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Failed to subscribe to newsletter',
        details: error.message,
      }),
    };
  }
};
