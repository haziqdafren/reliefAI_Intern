# Stripe Integration - Deployment Summary

## ✅ Completed Features

### 1. Stripe Checkout with Shipping
- Dynamic shipping rates (no Stripe dashboard setup needed)
- Hong Kong: $20 HKD (3-7 business days)
- International: $69 HKD (7-14 business days)
- Customers select appropriate shipping at checkout

### 2. Airtable Integration
Captures complete order details:
- **Subtotal**: Product price only
- **Shipping Fee**: $20 or $69 based on selection
- **Total Amount**: Product + Shipping
- Customer info: Email, Name, Phone
- Full shipping address with country name conversion

### 3. Payment Success Page
- Shows full order reference (Stripe session ID)
- Prominent display with copy/select functionality
- Instructions to save order reference
- Clear next steps for customers

---

## 🔧 Deployment Checklist

### Switch from TEST to LIVE Mode:

1. **Update Vercel Environment Variables**
   - Go to: Vercel Dashboard → Project → Settings → Environment Variables
   - Update these 4 variables to LIVE credentials:
     - `STRIPE_PUBLISHABLE_KEY` → `pk_live_...`
     - `STRIPE_SECRET_KEY` → `sk_live_...`
     - `NEXT_PUBLIC_STRIPE_PRICE_ID` → LIVE journal price ID
     - `STRIPE_WEBHOOK_SECRET` → `whsec_...` (LIVE)
   - Apply to: **All environments**
   - Redeploy from Deployments tab

2. **Enable Customer Email Receipts in Stripe**
   - Path: Dashboard → Settings → Communication preferences
   - Go to: Transactions and balances → Successful payment
   - Turn **Email ON**

3. **Verify Airtable Columns**
   - Payments table should have:
     - Subtotal (Number)
     - Shipping Fee (Number)
     - Total Amount (Number - renamed from "Amount")

---

## 📝 Important Files

### API Endpoints
- `api/create-checkout-session.js` - Creates checkout with dynamic shipping
- `api/stripe-webhook.js` - Processes payments and saves to Airtable

### Frontend
- `src/pages/PaymentSuccessPage.tsx` - Thank you page with order reference
- `src/components/StripeCheckoutButton.tsx` - Buy button component

---

## 🧪 Testing Instructions

### TEST Mode (Current Setup)
Use test card: `4242 4242 4242 4242` | Expiry: any future date | CVC: any 3 digits

### LIVE Mode
Real payments will be processed - ensure Stripe is configured correctly

---

## 🔐 Credentials Needed

Boss must provide LIVE credentials:
1. Publishable Key (`pk_live_...`)
2. Secret Key (`sk_live_...`)
3. Price ID for journal product
4. Webhook Secret (`whsec_...`)

---

## 📧 Customer Communication

- Stripe receipt emails: Enable in Stripe dashboard (see step 2 above)
- Order reference: Shown on success page (customers should save it)

---

Last Updated: 2025-12-06
