const Airtable = require('airtable');

module.exports = async (req, res) => {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      AIRTABLE_API_KEY,
      AIRTABLE_BASE_ID,
      AIRTABLE_NEWSLETTER_TABLE = 'Newsletter',
    } = process.env;

    if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
      return res.status(500).json({ error: 'Airtable configuration missing' });
    }

    // Initialize Airtable
    const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_BASE_ID);

    // Parse request body
    const { email, source = 'website-banner' } = req.body;

    // Validate required fields
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Check if email already exists
    const existingRecords = await base(AIRTABLE_NEWSLETTER_TABLE)
      .select({
        filterByFormula: `{Email} = '${email}'`,
        maxRecords: 1,
      })
      .firstPage();

    if (existingRecords.length > 0) {
      return res.status(400).json({
        error: 'Email already subscribed',
        alreadySubscribed: true
      });
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

    return res.status(200).json({
      success: true,
      recordId: records[0].id,
    });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return res.status(500).json({
      error: 'Failed to subscribe to newsletter',
      details: error.message,
    });
  }
};
