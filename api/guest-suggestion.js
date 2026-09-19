const Airtable = require('airtable');

// Per-field length caps. Rejected before anything reaches Airtable so a large
// body cannot burn function time or API quota.
const LIMITS = {
  firstName: 100,
  lastName: 100,
  email: 254, // RFC 5321 maximum
  listenerRelationship: 100,
  guestName: 200,
  isRepresentative: 10,
  topics: 500,
  value: 5000,
  links: 2000,
  notes: 5000,
};

const REQUIRED = ['firstName', 'lastName', 'email', 'guestName', 'topics', 'value'];

const EMAIL_PATTERN =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

/** A present, non-blank string within its length cap. */
const isValidString = (value, max) =>
  typeof value === 'string' && value.trim().length > 0 && value.length <= max;

/** Optional fields may be absent or empty, but must still be strings in range. */
const isValidOptional = (value, max) =>
  value === undefined || value === null || value === '' || isValidString(value, max);

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const body = req.body && typeof req.body === 'object' ? req.body : {};

  // Honeypot: a field hidden from real users. Anything filling it is a bot.
  // Answer 200 so the bot cannot tell it was rejected, but write nothing.
  if (typeof body.website === 'string' && body.website.trim() !== '') {
    return res.status(200).json({ success: true });
  }

  const invalid = [];

  REQUIRED.forEach((field) => {
    if (!isValidString(body[field], LIMITS[field])) invalid.push(field);
  });

  ['listenerRelationship', 'isRepresentative', 'links', 'notes'].forEach((field) => {
    if (!isValidOptional(body[field], LIMITS[field])) invalid.push(field);
  });

  if (invalid.length === 0 && !EMAIL_PATTERN.test(body.email.trim())) {
    invalid.push('email');
  }

  if (invalid.length > 0) {
    return res.status(400).json({
      error: 'Some fields are missing or invalid. Please check the form and try again.',
      fields: invalid,
    });
  }

  if (!process.env.AIRTABLE_API_KEY || !process.env.AIRTABLE_BASE_ID) {
    console.error('Guest suggestion: Airtable environment variables are not configured');
    return res.status(503).json({
      error: 'The form is temporarily unavailable. Please try again later.',
    });
  }

  const text = (value) => (typeof value === 'string' ? value.trim() : '');

  try {
    const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
      process.env.AIRTABLE_BASE_ID
    );
    const table = process.env.AIRTABLE_GUEST_SUGGESTIONS_TABLE || 'Guest Suggestions';

    const record = await base(table).create([
      {
        fields: {
          'First Name': text(body.firstName),
          'Last Name': text(body.lastName),
          Email: text(body.email),
          'Listener Relationship': text(body.listenerRelationship),
          'Guest Name': text(body.guestName),
          'Is Representative': text(body.isRepresentative),
          Topics: text(body.topics),
          Value: text(body.value),
          Links: text(body.links),
          Notes: text(body.notes),
          Date: new Date().toISOString(),
        },
      },
    ]);

    return res.status(200).json({ success: true, recordId: record[0].getId() });
  } catch (error) {
    // Log the real cause server-side; never return Airtable internals (table
    // and field names, base structure) to the browser.
    console.error('Guest suggestion submission failed:', error);
    return res.status(502).json({
      error: 'We could not save your suggestion right now. Please try again later.',
    });
  }
};
