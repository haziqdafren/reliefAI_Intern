# Jessie Li Website

Official website for Jessie Li - Author, Coach, and Speaker featuring journal sales, contact forms, and newsletter signup.

**Live Site:** https://jessieli.co

---

## 🚀 Features

### E-Commerce
- ✅ Stripe payment integration for journal purchases
- ✅ Dynamic shipping rates (Hong Kong & International)
- ✅ Automated order confirmation emails
- ✅ Real-time payment tracking in Airtable

### Email Notifications
- ✅ Customer order confirmations via Resend
- ✅ Boss notifications for new orders
- ✅ Shipping tracking notifications
- ✅ Custom email templates matching brand colors

### Shipping Management
- ✅ Dedicated shipping notification page (`/ship-notification`)
- ✅ Auto-generated tracking links for major carriers
- ✅ Shipments tracked in Airtable
- ✅ One-click shipping updates from order emails

### Content Management
- ✅ Newsletter subscription (Airtable integration)
- ✅ Contact form with inquiry types
- ✅ About page with donation information
- ✅ Guided journal product page

### Analytics & Tracking
- ✅ Google Analytics 4 integration
- ✅ Page view tracking
- ✅ Event tracking for purchases

---

## 📋 Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS
- **Payments:** Stripe (Checkout & Webhooks)
- **Email:** Resend.com
- **Database:** Airtable
- **Hosting:** Vercel
- **Analytics:** Google Analytics 4

---

## 🛠️ Setup Instructions

### 1. Clone and Install

```bash
git clone https://github.com/haziqdafren/reliefAI_Intern.git
cd reliefAI_Intern
npm install
```

### 2. Environment Variables

Copy `.env.example` to `.env` and fill in your credentials:

```bash
cp .env.example .env
```

**Required variables:**
- `AIRTABLE_API_KEY` - From Airtable account settings
- `AIRTABLE_BASE_ID` - Your Airtable base ID
- `STRIPE_SECRET_KEY` - Stripe secret key (`sk_test_...` or `sk_live_...`)
- `STRIPE_WEBHOOK_SECRET` - Stripe webhook signing secret
- `REACT_APP_STRIPE_PUBLISHABLE_KEY` - Stripe publishable key
- `REACT_APP_STRIPE_JOURNAL_PRICE_ID` - Stripe price ID for journal
- `RESEND_API_KEY` - Resend API key for emails

**See setup guides:**
- `STRIPE_SETUP_GUIDE.md` - Stripe configuration
- `RESEND_SETUP_GUIDE.md` - Email setup
- `INTEGRATION_SETUP.md` - Airtable setup

### 3. Airtable Tables

Create these tables in Airtable:
- **Newsletter** - Email subscriptions
- **Inquiries** - Contact form submissions
- **Payments** - Order records from Stripe
- **Shipments** - Shipping tracking records

### 4. Stripe Webhook

Create webhook endpoint at `https://yourdomain.com/api/stripe-webhook` listening for:
- `checkout.session.completed`

---

## 🔄 Switching from TEST to LIVE Mode

1. Toggle Stripe dashboard to **Live mode**
2. Create new product and price in Live mode
3. Create new webhook endpoint in Live mode
4. Update all environment variables with `sk_live_...`, `pk_live_...`, etc.
5. Update in Vercel → Settings → Environment Variables
6. Redeploy

**See `STRIPE_SETUP_GUIDE.md` for detailed instructions.**

---

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

---

## 📦 Shipping Workflow

### For Boss (Order Fulfillment)

1. **Receive Order Email** at `hello@jessieli.co` with:
   - Customer details
   - Shipping address
   - Order total
   - **"Send Shipping Notification"** button

2. **Package and Ship** the journal

3. **Click Button** in email or go to `/ship-notification`

4. **Enter Details:**
   - Tracking number
   - Carrier (DHL, FedEx, UPS, etc.)
   - Estimated delivery (optional)

5. **Send** - Customer automatically receives:
   - Tracking number
   - Carrier info
   - Track package button
   - Shipment recorded in Airtable

---

## 🚀 Deployment

**Platform:** Vercel

### Auto-Deployment
- Push to `main` branch triggers automatic deployment
- Vercel builds and deploys within 2-3 minutes

### Manual Deployment
```bash
git add .
git commit -m "Your commit message"
git push origin main
```

### Environment Variables (Vercel)
All environment variables must be set in:
**Vercel Dashboard → Project → Settings → Environment Variables**

Required for production:
- All Stripe LIVE keys
- Airtable credentials
- Resend API key
- Google Analytics ID

---

## 📁 Project Structure

```
/src
  /components     - Reusable UI components
  /pages          - Page components (Home, About, Shop, etc.)
  /contexts       - React contexts (Newsletter, Currency)
  /hooks          - Custom React hooks
  /utils          - Utility functions
/api              - Vercel serverless functions
  /stripe-webhook.js           - Handles Stripe payments
  /send-shipping-notification.js - Sends tracking emails
  /newsletter.js                 - Newsletter signup
  /airtable.js                  - Contact form
/public           - Static assets
```

---

## 📚 Documentation

- `STRIPE_SETUP_GUIDE.md` - Complete Stripe setup (TEST & LIVE)
- `RESEND_SETUP_GUIDE.md` - Email service configuration
- `INTEGRATION_SETUP.md` - Airtable integration guide
- `DESIGN_SYSTEM.md` - Brand colors and design specifications
- `.env.example` - Environment variables template

---

## 🔗 Important Links

- **Live Site:** https://jessieli.co
- **Shipping Admin:** https://jessieli.co/ship-notification
- **Stripe Dashboard:** https://dashboard.stripe.com
- **Resend Dashboard:** https://resend.com/emails
- **Airtable Base:** [Your Airtable workspace]
- **Vercel Dashboard:** https://vercel.com/dashboard

---

## ⚠️ Security Notes

- Never commit `.env` file to repository
- Keep `STRIPE_KEYS_BACKUP.md` in `.gitignore`
- Always use environment variables for sensitive data
- TEST and LIVE keys should never be mixed

---

## 📧 Support

For questions or issues:
- Check documentation files in repository
- Review Vercel deployment logs
- Check Stripe webhook logs
- Verify Airtable API connections

---

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
