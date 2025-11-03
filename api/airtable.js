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
      AIRTABLE_INQUIRIES_TABLE = 'Inquiries',
    } = process.env;

    if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
      return res.status(500).json({ error: 'Airtable configuration missing' });
    }

    // Initialize Airtable
    const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_BASE_ID);

    // Parse request body
    const { inquiryType, firstName, lastName, email, phone, message } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
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

    return res.status(200).json({
      success: true,
      recordId: records[0].id,
    });
  } catch (error) {
    console.error('Airtable error:', error);
    return res.status(500).json({
      error: 'Failed to submit inquiry',
      details: error.message,
    });
  }
};
