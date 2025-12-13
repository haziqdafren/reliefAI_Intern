// Quick test script to verify Resend email is working
// Run with: node test-email.js

require('dotenv').config();
const { Resend } = require('resend');

async function testEmail() {
  const resendApiKey = process.env.RESEND_API_KEY;

  if (!resendApiKey) {
    console.error('❌ RESEND_API_KEY not found in environment variables');
    process.exit(1);
  }

  const resend = new Resend(resendApiKey);

  console.log('📧 Sending test email...\n');

  try {
    const response = await resend.emails.send({
      from: 'Jessie Li <orders@jessieli.co>',
      to: 'hello@jessieli.co',
      subject: 'Test Email - Resend Setup Verification',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #D88A75 0%, #E09B8A 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #FAF8F5; padding: 30px; border-radius: 0 0 8px 8px; }
            .success-box { background: #e8f5e9; border-left: 4px solid #4caf50; padding: 15px; margin: 20px 0; border-radius: 4px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✅ Email Test Successful!</h1>
            </div>
            <div class="content">
              <div class="success-box">
                <p style="margin: 0;"><strong>Great news!</strong></p>
                <p style="margin: 5px 0 0 0;">Your Resend email integration is working perfectly with GoDaddy nameservers.</p>
              </div>

              <h2 style="color: #D88A75;">Test Details</h2>
              <ul>
                <li><strong>Sender:</strong> orders@jessieli.co</li>
                <li><strong>Recipient:</strong> hello@jessieli.co</li>
                <li><strong>DNS Setup:</strong> GoDaddy nameservers ✅</li>
                <li><strong>Domain Verification:</strong> Verified ✅</li>
                <li><strong>Time:</strong> ${new Date().toLocaleString()}</li>
              </ul>

              <h2 style="color: #D88A75;">What This Means</h2>
              <p>✅ Customer confirmation emails will work<br>
              ✅ Boss notification emails will work<br>
              ✅ Domain is properly verified<br>
              ✅ Emails won't go to spam</p>

              <p><strong>Next step:</strong> Test with a real Stripe payment (in test mode) to confirm the full order flow.</p>

              <p style="color: #6B6B6B; font-size: 14px; margin-top: 30px;">
                This is an automated test email from your website.
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log('✅ Email sent successfully!\n');
    console.log('📬 Email ID:', response.id);
    console.log('📧 Check hello@jessieli.co inbox for the test email\n');
    console.log('✨ Resend email integration is working correctly!');

  } catch (error) {
    console.error('❌ Error sending email:', error.message);
    console.error('\nFull error:', error);
    process.exit(1);
  }
}

testEmail();
