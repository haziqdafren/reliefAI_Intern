# Airtable + Stripe Integration Setup Guide

## Overview
This project integrates **Airtable** for inquiry management and **Stripe** for payment processing.

## Prerequisites

### 1. Airtable Setup
1. Go to [Airtable.com](https://airtable.com) and create an account
2. Create a new base (or use existing)
3. Create a table called **"Inquiries"** with the following fields:
   - `Inquiry Type` (Single line text)
   - `First Name` (Single line text)
   - `Last Name` (Single line text)
   - `Email` (Email)
   - `Phone` (Phone number) - Optional
   - `Message` (Long text)
   - `Date` (Date & time) - Auto-filled
4. Create a table called **"Payments"** with the following fields:
   - `Customer Email` (Email)
   - `Amount` (Number)
   - `Currency` (Single line text)
   - `Payment Status` (Single line text)
   - `Stripe Session ID` (Single line text)
   - `Product Name` (Single line text)
   - `Product Type` (Single line text)
   - `Date` (Date & time)
5. Get your **API Key**:
   - Go to [Airtable Account](https://airtable.com/account)
   - Scroll to "API" section
   - Click "Generate API key"
6. Get your **Base ID**:
   - Go to your base
   - Click "Help" → "API documentation"
   - Copy the Base ID (starts with `app...`)

### 2. Stripe Setup
1. Go to [Stripe.com](https://stripe.com) and create an account
2. Get your **API Keys**:
   - Go to [Stripe Dashboard](https://dashboard.stripe.com/apikeys)
   - Copy **Publishable key** (starts with `pk_`)
   - Copy **Secret key** (starts with `sk_`)
3. Create **Products & Prices** in Stripe:
   - Go to Products → Add Product
   - For **Journal**: Create product "Homeward Journal" with price $25 USD
   - Copy the **Price ID** (starts with `price_`)
4. Set up **Webhook**:
   - Go to Developers → Webhooks
   - Click "Add endpoint"
   - Endpoint URL: `https://your-domain.com/api/stripe-webhook`
   - Select events: `checkout.session.completed`
   - Copy the **Webhook signing secret** (starts with `whsec_`)

## Environment Variables

Add these to your Vercel project settings (Settings → Environment Variables):

### Required Variables:
```
AIRTABLE_API_KEY=your_airtable_api_key
AIRTABLE_BASE_ID=your_base_id
AIRTABLE_INQUIRIES_TABLE=Inquiries
AIRTABLE_PAYMENTS_TABLE=Payments

STRIPE_SECRET_KEY=sk_test_... (or sk_live_... for production)
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_... (or pk_live_... for production)
STRIPE_WEBHOOK_SECRET=whsec_...

REACT_APP_STRIPE_JOURNAL_PRICE_ID=price_... (Journal price ID)
```

## Local Development

Create a `.env` file in the root directory:

```env
AIRTABLE_API_KEY=your_key_here
AIRTABLE_BASE_ID=your_base_id_here
AIRTABLE_INQUIRIES_TABLE=Inquiries
AIRTABLE_PAYMENTS_TABLE=Payments

STRIPE_SECRET_KEY=sk_test_your_key
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_your_key
STRIPE_WEBHOOK_SECRET=whsec_your_secret

REACT_APP_STRIPE_JOURNAL_PRICE_ID=price_your_price_id
```

**Note:** `.env` files are gitignored for security.

## API Routes (Vercel Serverless Functions)

The following API routes are available:

### `/api/airtable`
- **Method:** POST
- **Purpose:** Submit inquiry form to Airtable
- **Body:** 
```json
{
  "inquiryType": "1:1 coaching",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "message": "Hello..."
}
```

### `/api/create-checkout-session`
- **Method:** POST
- **Purpose:** Create Stripe Checkout session
- **Body:**
```json
{
  "priceId": "price_...",
  "productName": "Product Name",
  "productType": "journal"
}
```

### `/api/stripe-webhook`
- **Method:** POST
- **Purpose:** Handle Stripe webhook events (automatically called by Stripe)
- **Action:** Records completed payments to Airtable

## Testing

### Test Airtable Integration:
1. Fill out the Connect form
2. Submit
3. Check your Airtable "Inquiries" table for the new record

### Test Stripe Integration:
1. Use Stripe test cards: `4242 4242 4242 4242`
2. Any future expiry date
3. Any 3-digit CVC
4. Any ZIP code
5. Complete checkout
6. Check Airtable "Payments" table for the payment record

## Production Checklist

- [ ] Switch Stripe keys from `test` to `live`
- [ ] Update webhook URL to production domain
- [ ] Test complete flow in production
- [ ] Verify Airtable records are created correctly
- [ ] Set up Stripe payment notifications

## Support

For issues:
1. Check Vercel function logs (Deployments → Functions)
2. Check Stripe Dashboard → Events for webhook errors
3. Verify environment variables are set correctly

