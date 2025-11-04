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
   https://jessieli-dusky.vercel.app/api/stripe-webhook
   ```
5. Click **"Select events"** and choose: `checkout.session.completed`
6. Click **"Add endpoint"**
7. Click on the webhook you just created
8. Copy the **Signing secret** (starts with `whsec_...`)

---

## ✅ Send Us These 4 Items

Copy and send us these credentials securely:

```
1. Publishable Key: pk_test_XXXXX...
2. Secret Key: sk_test_XXXXX...
3. Price ID: price_XXXXX...
4. Webhook Secret: whsec_XXXXX...
```

**That's it!** We'll add them to the website and let you know when it's ready to test.

---

## What Happens Next?

1. ✅ We add your credentials to the website
2. ✅ We test the payment with a test card
3. ✅ We confirm everything works
4. ✅ You can start accepting payments!

---

## When You're Ready to Accept Real Payments

Later, when you want to go live:
1. Switch to **Live Mode** in Stripe
2. Get the same 4 credentials (they'll start with `pk_live_` and `sk_live_`)
3. Send them to us
4. We'll update the website and you'll be live!

**Note:** These are TEST credentials - no real money will be charged yet.
