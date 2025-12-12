# Step-by-Step Guide: Set Up Resend and Test Emails

Follow these steps in order. I'll guide you through each one!

---

## PART 1: Create Resend Account & Get API Key (5 minutes)

### Step 1: Sign Up for Resend
1. Open browser and go to: **https://resend.com**
2. Click **"Sign Up"** (top right corner)
3. Enter your email address and create a password
4. Check your email and click the verification link
5. Log in to Resend dashboard

### Step 2: Create API Key
1. In Resend dashboard, look at left sidebar
2. Click **"API Keys"**
3. Click **"+ Create API Key"** button
4. Fill in:
   - **Name**: `Jessie Li Website Testing`
   - **Permission**: Select **"Sending access"**
5. Click **"Add"** button
6. 🔑 **COPY THE API KEY** - it looks like: `re_123abc...`
   - ⚠️ **IMPORTANT**: Copy it NOW - you can only see it once!
   - Paste it in a notepad temporarily

**✅ Checkpoint:** You should now have an API key that starts with `re_`

---

## PART 2: Add API Key to Vercel (3 minutes)

### Step 3: Add Environment Variable to Vercel
1. Go to: **https://vercel.com/dashboard**
2. Find your project: `intern_website` or `jessieli`
3. Click on the project
4. Click **"Settings"** tab (top menu)
5. Click **"Environment Variables"** (left sidebar)
6. Click **"Add New"** button
7. Fill in:
   - **Key**: `RESEND_API_KEY`
   - **Value**: Paste your API key (the `re_123abc...` from Step 2)
   - **Environments**: Check ALL boxes (Production, Preview, Development)
8. Click **"Save"**

**✅ Checkpoint:** You should see `RESEND_API_KEY` in the list of environment variables

---

## PART 3: Deploy Changes to Vercel (2 minutes)

### Step 4: Commit and Push Code Changes
Run these commands in your terminal (from the project folder):

```bash
# 1. Check what files changed
git status

# 2. Add all the new changes
git add package.json package-lock.json api/stripe-webhook.js RESEND_SETUP_GUIDE.md STRIPE_SETUP_GUIDE.md RESEND_TESTING_STEPS.md

# 3. Commit with a message
git commit -m "Add Resend email integration for order confirmations"

# 4. Push to GitHub (this triggers Vercel deployment)
git push origin main
```

### Step 5: Wait for Vercel Deployment
1. Go back to Vercel dashboard
2. Click on **"Deployments"** tab
3. Wait for the latest deployment to show **"Ready"** (usually 1-2 minutes)
   - You'll see a green checkmark ✅ when ready

**✅ Checkpoint:** Deployment status shows "Ready"

---

## PART 4: Test the Email System (5 minutes)

### Step 6: Do a Test Purchase

1. Go to your website: **https://jessieli-dusky.vercel.app** (or your custom domain)
2. Navigate to the **Guided Journal** page
3. Click **"Pre-Order Journal"** button
4. Fill in the Stripe checkout form with **TEST DATA**:

   **Card Details:**
   - Card number: `4242 4242 4242 4242`
   - Expiry: `12/34` (any future date)
   - CVC: `123`
   - ZIP: `12345`

   **Contact Info:**
   - Email: **YOUR REAL EMAIL** (so you can receive the test email!)
   - Phone: Any phone number (e.g., `+852 1234 5678`)

   **Shipping Address:**
   - Name: Your name
   - Address: Any test address
   - City: Hong Kong
   - Country: Hong Kong
   - Postal Code: Any code

5. Click **"Pay"**
6. You should be redirected to the success page

### Step 7: Check for Order Confirmation Email
1. Open your email inbox (the email you used in Step 6)
2. Look for an email from: **`Jessie Li <orders@jessieli.co>`** OR **`onboarding@resend.dev`**
   - Subject: **"Order Confirmation - Thank you for your purchase!"**
3. Open the email and verify:
   - ✅ Pink gradient header with "Thank You for Your Order!"
   - ✅ Your name appears correctly
   - ✅ Order reference (Stripe session ID)
   - ✅ Product: Homwards journal
   - ✅ Subtotal, shipping fee, total amount
   - ✅ Your shipping address
   - ✅ Your phone number

**Note:**
- If email comes from `onboarding@resend.dev` = Still working! (Need domain verification for `orders@jessieli.co`)
- If email comes from `orders@jessieli.co` = Perfect! Domain is verified

### Step 8: Check Airtable Record
1. Open your Airtable: **https://airtable.com**
2. Go to your **Payments** table
3. Find the latest record - it should have:
   - ✅ Customer Email
   - ✅ Customer Name
   - ✅ **Phone** (your test phone number)
   - ✅ Subtotal
   - ✅ Shipping Fee
   - ✅ Total Amount
   - ✅ Full shipping address
   - ✅ Order reference

**✅ Checkpoint:** Email received AND Airtable record created with phone number

---

## PART 5: Troubleshooting

### If you DON'T receive the email:

**Check 1: Spam/Junk Folder**
- Check your spam folder for emails from Resend

**Check 2: Vercel Logs**
1. Go to Vercel dashboard → Deployments
2. Click on the latest deployment
3. Click **"Functions"** tab
4. Look for `stripe-webhook` logs
5. Check for errors like "RESEND_API_KEY not configured"

**Check 3: Stripe Webhook**
1. Go to Stripe Dashboard: **https://dashboard.stripe.com**
2. Click **"Developers"** → **"Webhooks"**
3. Click on your webhook
4. Check recent events - should show successful `checkout.session.completed`

**Check 4: Resend Dashboard**
1. Go to Resend dashboard: **https://resend.com/emails**
2. Click **"Emails"** (left sidebar)
3. You should see your test email listed
4. Click on it to see status (Delivered/Failed)

---

## Common Issues & Solutions

### Issue: "From address must be verified"
**Solution:** Need to verify domain (optional for testing)
- Emails will come from `onboarding@resend.dev` in test mode
- Still works perfectly! Just not from your custom domain

### Issue: Email goes to spam
**Solution:**
- This is normal for test mode
- Once you verify domain, deliverability improves dramatically

### Issue: No email sent at all
**Solution:**
1. Check Vercel environment variables - is `RESEND_API_KEY` there?
2. Did you redeploy after adding the env variable?
3. Check Vercel function logs for errors

---

## Optional: Verify Domain (15 minutes)

If you want emails to come from `orders@jessieli.co` instead of `onboarding@resend.dev`:

### Step 9: Add DNS Records
1. In Resend dashboard, click **"Domains"** (left sidebar)
2. Click **"+ Add Domain"**
3. Enter: `jessieli.co`
4. Click **"Add"**
5. You'll see 3 DNS records to add

### Step 10: Add Records to Your Domain Provider
**If using Vercel for domain:**
1. Go to Vercel → Domains → jessieli.co
2. Click DNS settings
3. Add each record from Resend

**If using another provider (GoDaddy, Namecheap):**
1. Log into your domain provider
2. Find DNS management
3. Add each record
4. Save changes

### Step 11: Verify
1. Wait 5-30 minutes for DNS to propagate
2. Go back to Resend → Domains
3. Click **"Verify DNS Records"**
4. Once verified, do another test purchase
5. Email should now come from `orders@jessieli.co`

---

## Summary Checklist

Before testing, make sure:
- ✅ Resend account created
- ✅ API key copied
- ✅ API key added to Vercel environment variables
- ✅ Code pushed to GitHub
- ✅ Vercel deployment completed successfully

During testing:
- ✅ Use test card `4242 4242 4242 4242`
- ✅ Use YOUR REAL EMAIL (to receive test email)
- ✅ Complete checkout successfully
- ✅ Check email inbox (and spam folder)
- ✅ Verify email content is correct
- ✅ Check Airtable for new record with phone number

---

## Need Help?

If you get stuck at any step:
1. Take a screenshot of the error or where you're stuck
2. Tell me which step number you're on
3. I'll help you troubleshoot!

---

**Ready to start?** Begin with **PART 1: Step 1** above! 🚀
