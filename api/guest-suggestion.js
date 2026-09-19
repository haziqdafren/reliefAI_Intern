const Airtable = require('airtable');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const {
    firstName,
    lastName,
    email,
    listenerRelationship,
    guestName,
    isRepresentative,
    topics,
    value,
    links,
    notes,
  } = req.body || {};

  const missing = [];
  if (!firstName) missing.push('firstName');
  if (!lastName) missing.push('lastName');
  if (!email) missing.push('email');
  if (!guestName) missing.push('guestName');
  if (!topics) missing.push('topics');
  if (!value) missing.push('value');

  if (missing.length > 0) {
    return res.status(400).json({ error: 'Missing required fields', required: missing });
  }

  if (!process.env.AIRTABLE_API_KEY || !process.env.AIRTABLE_BASE_ID) {
    return res.status(500).json({ error: 'Airtable configuration missing' });
  }

  try {
    const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
      process.env.AIRTABLE_BASE_ID
    );
    const table = process.env.AIRTABLE_GUEST_SUGGESTIONS_TABLE || 'Guest Suggestions';

    const record = await base(table).create([
      {
        fields: {
          'First Name': firstName,
          'Last Name': lastName,
          Email: email,
          'Listener Relationship': listenerRelationship || '',
          'Guest Name': guestName,
          'Is Representative': isRepresentative || '',
          Topics: topics,
          Value: value,
          Links: links || '',
          Notes: notes || '',
          Date: new Date().toISOString(),
        },
      },
    ]);

    return res.status(200).json({ success: true, recordId: record[0].getId() });
  } catch (error) {
    console.error('Guest suggestion submission failed:', error);
    return res.status(500).json({
      error: 'Failed to submit suggestion',
      details: error.message,
    });
  }
};
