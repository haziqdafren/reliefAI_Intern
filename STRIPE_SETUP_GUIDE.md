# Stripe Setup Guide for Boss

## What We Need From You

The website is ready to accept payments. We just need **4 credentials** from your Stripe account.

---

## Simple Steps to Get Your Stripe Credentials

### Step 1: Log into Stripe
1. Go to **https://dashboard.stripe.com** and log in
2. Make sure **"Test Mode"** is ON (toggle in top right corner)

---

### Step 2: Get Your API Keys (2 credentials)
1. Click **"Developers"** (left sidebar)
2. Click **"API keys"**
3. Copy these two keys:
   - ✅ **Publishable key** (starts with `pk_test_...`)
   - ✅ **Secret key** - Click "Reveal" first, then copy (starts with `sk_test_...`)

---

### Step 3: Create the Journal Product (1 credential)
1. Click **"Products"** (left sidebar)
2. Click **"+ Add product"**
3. Enter:
   - Name: **Homwards: to my authentic self - Journal**
   - Price: **$25.00 USD**
   - Select **"One time"** payment
4. Click **"Save product"**
5. Copy the **Price ID** (starts with `price_...`)

---

### Step 4: Set Up Webhook (1 credential)
1. Click **"Developers"** (left sidebar)
2. Click **"Webhooks"**
3. Click **"+ Add endpoint"**
4. Paste this URL:
   ```
   https://www.jessieli.co/api/stripe-webhook
   ```
5. Click **"Select events"** and choose: `checkout.session.completed`
6. Click **"Add endpoint"**
7. Click on the webhook you just created
8. Copy the **Signing secret** (starts with `whsec_...`)

---

## ✅ Send Us These 5 Items

Copy and send us these credentials securely:

```
1. Publishable Key: pk_test_XXXXX...
2. Secret Key: sk_test_XXXXX...
3. Price ID: price_XXXXX...
4. Webhook Secret: whsec_XXXXX...
5. Resend API Key: re_XXXXX... (for sending order emails)
```

**Note:** For step 5 (Resend), please see **RESEND_SETUP_GUIDE.md** for detailed instructions.

**That's it!** We'll add them to the website and let you know when it's ready to test.

---

## What Happens Next?

1. ✅ We add your credentials to the website
2. ✅ We test the payment with a test card
3. ✅ We confirm everything works
4. ✅ You can start accepting payments!

---

## When You're Ready to Accept Real Payments

When you want to start accepting REAL payments:

### 🔴 Switching from TEST to LIVE Mode

1. **Log into Stripe Dashboard**: https://dashboard.stripe.com
2. **Toggle to "Live mode"** (switch in top right corner - it will turn from blue to green)
3. **Repeat ALL the steps above** to get LIVE credentials:
   - ✅ Publishable key (starts with `pk_live_...`)
   - ✅ Secret key (starts with `sk_live_...`)
   - ✅ Price ID for journal (create product in LIVE mode)
   - ✅ Webhook secret (create new webhook endpoint in LIVE mode)
4. **Update Vercel Environment Variables** with the LIVE keys
5. **Redeploy the website**

### ⚠️ IMPORTANT: Live Mode Checklist

Before going live, make sure:
- ✅ Test mode worked perfectly (customer emails, boss notifications, Airtable tracking)
- ✅ Shipping notification system tested and working
- ✅ All email addresses verified (orders@jessieli.co, hello@jessieli.co)
- ✅ Stripe account fully verified and able to accept payments
- ✅ Bank account connected to Stripe for payouts
- ✅ Make a test purchase first with a small amount

### 📋 LIVE Mode Webhook Setup

When creating the webhook in LIVE mode:
```
Endpoint URL: https://jessieli.co/api/stripe-webhook
Events to listen to: checkout.session.completed
```

**Note:** You MUST create a new webhook endpoint in LIVE mode. The TEST mode webhook won't work for real payments.

---

## Current Status

✅ **TEST mode credentials** - No real money charged
🔄 **Ready to switch to LIVE mode** when you're ready

**Reminder:** In TEST mode, use card number `4242 4242 4242 4242` for testing.
