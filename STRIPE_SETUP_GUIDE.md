# Stripe Setup Guide for Jessie Li Website

## Overview
This guide will help you complete the Stripe integration for accepting payments on the website. The application code is already prepared and ready - you just need to provide the Stripe credentials.

## Current Status ✅
- ✅ Stripe integration code is complete
- ✅ API endpoints created (`/api/create-checkout-session` and `/api/stripe-webhook`)
- ✅ Frontend components ready (`StripeCheckoutButton`)
- ✅ Webhook handler for recording payments to Airtable
- ✅ Environment variables configuration ready
- ⏳ **Waiting for: Stripe account credentials from boss**

---

## What Stripe Credentials Are Needed?

You need to obtain **4 pieces of information** from your Stripe Dashboard:

### 1. **Stripe Publishable Key** (starts with `pk_`)
- This is a public key that's safe to expose in the frontend
- Used to initialize Stripe on the website
- Format: `pk_test_...` (test mode) or `pk_live_...` (live mode)

### 2. **Stripe Secret Key** (starts with `sk_`)
- This is a private key that must be kept secret
- Used on the server-side to create checkout sessions
- Format: `sk_test_...` (test mode) or `sk_live_...` (live mode)

### 3. **Stripe Webhook Secret** (starts with `whsec_`)
- Used to verify that webhook events are genuinely from Stripe
- Created when you set up a webhook endpoint
- Format: `whsec_...`

### 4. **Product Price ID** (starts with `price_`)
- The ID of the journal product in Stripe
- Format: `price_...`

---

## Step-by-Step Instructions for Your Boss

### Step 1: Access Stripe Dashboard
1. Go to https://dashboard.stripe.com
2. Log in to your Stripe account
3. Make sure you're in **Test Mode** first (toggle in top right corner)

### Step 2: Get API Keys

#### Get Publishable and Secret Keys:
1. Click on **"Developers"** in the left sidebar
2. Click on **"API keys"**
3. You'll see two keys:
   - **Publishable key**: Copy this (starts with `pk_test_`)
   - **Secret key**: Click "Reveal test key" and copy it (starts with `sk_test_`)

**⚠️ IMPORTANT:** Never share the Secret Key publicly. Only add it to Vercel environment variables.

### Step 3: Create a Product and Price

1. Click on **"Products"** in the left sidebar
2. Click **"+ Add product"**
3. Fill in the details:
   - **Name**: `Homwards: to my authentic self - Journal`
   - **Description**: `Guided journal for self-discovery and authentic leadership`
   - **Pricing**:
     - Select **"One time"**
     - Enter price: `$25.00 USD`
     - Leave "Recurring" unchecked
4. Click **"Save product"**
5. After saving, you'll see the **Price ID** (starts with `price_`) - Copy this!

### Step 4: Set Up Webhook Endpoint

1. Click on **"Developers"** in the left sidebar
2. Click on **"Webhooks"**
3. Click **"+ Add endpoint"**
4. Enter the endpoint URL:
   ```
   https://jessieli-dusky.vercel.app/api/stripe-webhook
   ```
5. Under "Events to send", click **"Select events"**
6. Select the following event:
   - `checkout.session.completed`
7. Click **"Add events"**
8. Click **"Add endpoint"**
9. After creating, click on the webhook you just created
10. Click **"Reveal"** next to "Signing secret" and copy it (starts with `whsec_`)

---

## Step 5: Provide the Credentials

Once you have all 4 credentials, provide them in this format:

```
STRIPE CREDENTIALS:
====================

1. Publishable Key:
pk_test_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

2. Secret Key:
sk_test_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

3. Webhook Secret:
whsec_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

4. Journal Price ID:
price_XXXXXXXXXXXXXXXXXXXXXXXX
```

**⚠️ SECURITY NOTES:**
- Share these credentials securely (don't email them publicly)
- Consider using a password manager or secure note
- These are TEST MODE credentials - we'll add LIVE MODE credentials later when ready to accept real payments

---

## What Happens After You Provide Credentials?

Once we receive the credentials, we will:

1. Add them to Vercel Environment Variables (secure storage)
2. Redeploy the application
3. Test the payment flow:
   - Click "Buy It Now" on the journal
   - Complete a test purchase using Stripe's test card: `4242 4242 4242 4242`
   - Verify payment appears in:
     - Stripe Dashboard
     - Airtable Payments table
4. Confirm everything works perfectly

---

## Testing the Integration

### Test Card Numbers (provided by Stripe):
- **Successful payment**: `4242 4242 4242 4242`
- **Payment requires authentication**: `4000 0025 0000 3155`
- **Declined card**: `4000 0000 0000 9995`

Use any:
- **Expiry date**: Any future date (e.g., 12/34)
- **CVC**: Any 3 digits (e.g., 123)
- **ZIP**: Any 5 digits (e.g., 12345)

---

## Going Live (Future Step)

When ready to accept real payments:

1. Complete Stripe account verification
2. Activate your account
3. Switch to **Live Mode** in Stripe Dashboard
4. Get the LIVE credentials (same 4 items, but with `pk_live_` and `sk_live_` prefixes)
5. Update Vercel environment variables with live credentials
6. Test one more time before announcing to customers

---

## Environment Variables Reference

These will be added to Vercel by the development team:

```bash
# Stripe Configuration (Backend - Secret)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Stripe Configuration (Frontend - Public)
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_...
REACT_APP_STRIPE_JOURNAL_PRICE_ID=price_...
```

---

## Support & Questions

If you have any questions while setting this up:
1. Stripe has excellent documentation: https://stripe.com/docs
2. Contact support@stripe.com for Stripe-specific questions
3. Contact the development team for integration questions

---

## Summary Checklist

- [ ] Log into Stripe Dashboard
- [ ] Switch to Test Mode
- [ ] Get Publishable Key from Developers → API Keys
- [ ] Get Secret Key from Developers → API Keys
- [ ] Create Product "Homwards: to my authentic self - Journal" for $25
- [ ] Copy the Price ID
- [ ] Create Webhook endpoint for `https://jessieli-dusky.vercel.app/api/stripe-webhook`
- [ ] Subscribe to `checkout.session.completed` event
- [ ] Get Webhook Signing Secret
- [ ] Securely share all 4 credentials with development team
- [ ] Test the integration after deployment
- [ ] Ready to accept payments! 🎉
