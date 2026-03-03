# Jessie Li — Author & Coach Website

**A full-stack e-commerce platform for digital journal sales with automated order fulfillment, payment processing, and customer management.**

**Live Site:** [jessieli.co](https://jessieli.co)

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [System Architecture](#system-architecture)
- [API Endpoints](#api-endpoints)
- [Data Flow](#data-flow)
- [Features](#features)
- [Environment Setup](#environment-setup)
- [Deployment](#deployment)
- [Project Structure](#project-structure)

---

## Overview

A production-ready e-commerce website built for author and coach Jessie Li. The platform handles end-to-end journal sales operations including payment processing, automated email notifications, shipping management, and centralized customer data storage.

### What This Project Does

- Processes secure payments through Stripe with dynamic international shipping
- Automatically sends branded order confirmations and shipping notifications via email
- Manages customer data, orders, and shipments in a centralized database
- Provides an admin interface for easy order fulfillment and tracking
- Tracks user behavior and conversions with Google Analytics

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18, TypeScript, Tailwind CSS |
| **Backend** | Node.js (Vercel Serverless Functions) |
| **Payments** | Stripe Checkout API + Webhooks |
| **Email** | Resend.com API |
| **Database** | Airtable |
| **Hosting** | Vercel |
| **Analytics** | Google Analytics 4 |

---

## System Architecture

### High-Level Flow

```
User Browser
    ↓
React Frontend (jessieli.co)
    ↓
Vercel Serverless API (/api/*)
    ↓
External Services:
    → Stripe (Payment Processing)
    → Airtable (Data Storage)
    → Resend (Email Delivery)
```

### Complete Purchase Flow

```
1. User clicks "Buy Journal"
   ↓
2. Frontend calls /api/create-checkout-session
   ↓
3. Stripe creates checkout session with shipping options
   ↓
4. User redirected to Stripe Checkout page
   ↓
5. User enters payment and shipping details
   ↓
6. Payment completed → Stripe sends webhook to /api/stripe-webhook
   ↓
7. Webhook stores payment data in Airtable
   ↓
8. Webhook sends confirmation emails to customer and admin
   ↓
9. User redirected to /payment-success page
```

### Shipping Notification Flow

```
1. Admin receives order email with "Send Tracking" button
   ↓
2. Admin ships package and obtains tracking number
   ↓
3. Admin clicks button → Opens /ship-notification page
   ↓
4. Admin enters tracking details (number, carrier, delivery date)
   ↓
5. Frontend calls /api/send-shipping-notification
   ↓
6. API creates shipment record in Airtable
   ↓
7. API sends tracking email to customer with tracking link
```

---

## API Endpoints

All API endpoints are serverless functions deployed on Vercel. Each endpoint is located in the `/api/` directory.

### 1. Create Checkout Session

**Endpoint:** `POST /api/create-checkout-session`

**Purpose:** Creates a Stripe payment session for journal purchases

**Request:**
```json
{
  "priceId": "price_xxxxx",
  "productName": "Homwards Journal",
  "productType": "journal"
}
```

**How It Works:**
1. Validates the price ID parameter
2. Determines the website origin from request headers or environment variables
3. Creates a Stripe Checkout session configured with:
   - Card payment method
   - Shipping address collection (250+ countries supported)
   - Two shipping rate options:
     - Hong Kong: $20 HKD (3-7 business days)
     - International: $69 HKD (7-14 business days)
   - Phone number collection for delivery coordination
   - Success/cancel redirect URLs
4. Returns the session ID and checkout URL to the frontend

**Response:**
```json
{
  "sessionId": "cs_xxxxx",
  "url": "https://checkout.stripe.com/c/pay/cs_xxxxx"
}
```

**Error Codes:**
- `405` - Method not allowed (must be POST)
- `400` - Missing required priceId parameter
- `500` - Stripe configuration error or session creation failed

---

### 2. Stripe Webhook Handler

**Endpoint:** `POST /api/stripe-webhook`

**Purpose:** Processes completed payment events from Stripe

**Webhook Event:** `checkout.session.completed`

**How It Works:**

**Step 1: Security Verification**
- Receives the webhook request from Stripe
- Extracts the raw request body (required for signature validation)
- Verifies the webhook signature using `STRIPE_WEBHOOK_SECRET`
- This prevents unauthorized requests and replay attacks

**Step 2: Retrieve Full Session Data**
- Fetches complete session details from Stripe API
- Expands customer details, line items, and payment breakdown
- Stripe webhooks only send basic data, so we fetch the full session to get shipping address

**Step 3: Extract Payment Information**
- Customer details: name, email, phone from `session.customer_details`
- Shipping address: street, city, state, postal code, country from `session.shipping_details.address`
- Payment amounts: subtotal, shipping fee, total from `session.amount_*` fields
- Converts country codes to full names (e.g., "HK" becomes "Hong Kong")

**Step 4: Store in Database**
- Creates a record in the Airtable "Payments" table with all order details:
  - Customer information (name, email, phone)
  - Complete shipping address
  - Pricing breakdown (subtotal, shipping, total)
  - Order metadata (Stripe session ID, product name, timestamp)
  - Payment status marked as "Completed"

**Step 5: Send Confirmation Emails**

**Customer Email:**
- Branded HTML email with order confirmation
- Displays order details with pricing breakdown
- Shows shipping address for verification
- Includes order reference number for support inquiries

**Admin Email (to hello@jessieli.co):**
- New order notification with customer details
- Complete shipping address for label printing
- Order pricing summary
- "Send Shipping Notification" button linking to admin page
- Next steps checklist for order fulfillment

**Response:**
```json
{ "received": true }
```

**Error Handling:**
- Returns 400 if webhook signature is invalid
- Returns 500 if webhook secret is not configured
- Logs errors but doesn't fail the webhook (allows Stripe to retry)

---

### 3. Send Shipping Notification

**Endpoint:** `POST /api/send-shipping-notification`

**Purpose:** Sends tracking information to customers after shipment

**Request:**
```json
{
  "orderReference": "cs_xxxxx",
  "trackingNumber": "1234567890",
  "carrier": "DHL Express",
  "estimatedDelivery": "2025-03-10",
  "trackingUrl": "https://...",
  "notes": "Optional notes"
}
```

**How It Works:**

**Step 1: Validation**
- Checks that required fields are present (orderReference, trackingNumber, carrier)

**Step 2: Order Lookup**
- Searches the Airtable "Payments" table for the Stripe Session ID
- Retrieves customer email, name, and product information
- Returns 404 error if order is not found

**Step 3: Auto-Generate Tracking URLs**
- If no custom tracking URL provided, automatically generates one based on carrier:
  - **DHL Express:** `https://www.dhl.com/en/express/tracking.html?AWB={trackingNumber}`
  - **FedEx:** `https://www.fedex.com/fedextrack/?trknbr={trackingNumber}`
  - **UPS:** `https://www.ups.com/track?tracknum={trackingNumber}`
  - **SF Express:** `https://www.sf-express.com/mobile/en/dynamic_function/waybill/#search/bill-number/{trackingNumber}`
  - **Hong Kong Post:** `https://www.hongkongpost.hk/en/mail_tracking/index.html?id={trackingNumber}`
  - **China Post:** `http://www.ems.com.cn/queryList?mailNoList={trackingNumber}`

**Step 4: Create Shipment Record**
- Creates a record in Airtable "Shipments" table:
  - Links to the original payment record
  - Stores tracking number, carrier, tracking URL
  - Sets shipping status to "Shipped"
  - Records shipped date (current timestamp)
  - Stores estimated delivery date if provided
  - Marks tracking email as sent
  - Saves any admin notes

**Step 5: Email Customer**
- Sends branded tracking email via Resend to customer
- Includes carrier name and tracking number prominently
- Provides "Track Your Package" button with auto-generated link
- Shows estimated delivery date if available
- Displays order reference and product name for context

**Response:**
```json
{
  "success": true,
  "message": "Shipping notification sent successfully",
  "shipmentId": "recXXXXX",
  "emailId": "re_XXXXX",
  "sentTo": "customer@example.com",
  "trackingNumber": "1234567890",
  "carrier": "DHL Express"
}
```

**Error Codes:**
- `405` - Method not allowed
- `400` - Missing required fields
- `404` - Order not found with provided reference
- `500` - Database error or email service failure

---

### 4. Newsletter Subscription

**Endpoint:** `POST /api/newsletter`

**Purpose:** Handles email newsletter signups

**Request:**
```json
{
  "email": "user@example.com",
  "source": "website-banner"
}
```

**How It Works:**
1. Validates email field is present
2. Checks for duplicate emails in the "Newsletter" table
3. If email already exists, returns error with `alreadySubscribed: true`
4. Creates new record with:
   - Email address
   - Subscription date (current timestamp)
   - Status set to "Active"
   - Source tracking (banner, footer, popup, etc.)

**Response:**
```json
{
  "success": true,
  "recordId": "recXXXXX"
}
```

---

### 5. Contact Form

**Endpoint:** `POST /api/airtable`

**Purpose:** Processes contact form inquiries

**Request:**
```json
{
  "inquiryType": "1:1 coaching",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "+852 1234 5678",
  "message": "I'm interested in coaching services..."
}
```

**How It Works:**
1. Validates required fields (firstName, lastName, email, message)
2. Creates a record in Airtable "Inquiries" table with:
   - Inquiry type (coaching, speaking engagement, general)
   - Customer contact information
   - Message content
   - Submission timestamp

**Response:**
```json
{
  "success": true,
  "recordId": "recXXXXX"
}
```

---

## Data Flow

### Airtable Database Schema

The application uses Airtable as a centralized data warehouse with four main tables:

#### 1. Payments Table

Stores all completed orders from Stripe.

**Fields:**
- `Customer Email` - Customer's email address
- `Customer Name` - Full name from shipping details
- `Phone` - Contact phone number
- `Address Line 1` - Street address
- `Address Line 2` - Apartment, suite, etc. (optional)
- `City` - City name
- `State` - State/province/region
- `Postal Code` - ZIP or postal code
- `Country` - Full country name (converted from country code)
- `Subtotal` - Product price before shipping
- `Shipping Fee` - Shipping cost
- `Total Amount` - Final amount charged
- `Currency` - Currency code (HKD, USD, etc.)
- `Payment Status` - Always "Completed" for successful payments
- `Stripe Session ID` - Unique identifier from Stripe (used to link orders)
- `Product Name` - Name of purchased product
- `Product Type` - Category (journal, book, etc.)
- `Date` - Order timestamp

**Relationships:**
- Linked to Shipments table (one-to-many)

---

#### 2. Shipments Table

Tracks shipping status and tracking information for orders.

**Fields:**
- `Order Reference` - Linked record to Payments table
- `Tracking Number` - Carrier tracking number
- `Carrier` - Shipping carrier (DHL, FedEx, UPS, etc.)
- `Tracking URL` - Auto-generated or custom tracking link
- `Shipping Status` - Current status (Shipped, In Transit, Delivered)
- `Shipped Date` - When package was shipped
- `Estimated Delivery` - Expected delivery date
- `Tracking Email Sent` - Checkbox to confirm email was sent
- `Notes` - Admin notes about shipment

**Relationships:**
- Linked from Payments table (many-to-one)

---

#### 3. Newsletter Table

Stores email subscribers for marketing campaigns.

**Fields:**
- `Email` - Subscriber email (unique)
- `Subscribed Date` - Signup timestamp
- `Status` - Subscription status (Active, Unsubscribed)
- `Source` - Where they signed up (banner, footer, popup)

---

#### 4. Inquiries Table

Stores contact form submissions.

**Fields:**
- `Inquiry Type` - Type of inquiry (1:1 coaching, speaking, general)
- `First Name` - Contact first name
- `Last Name` - Contact last name
- `Email` - Contact email
- `Phone` - Contact phone (optional)
- `Message` - Inquiry message content
- `Date` - Submission timestamp

---

### Stripe Integration Details

**Payment Processing:**
- Uses Stripe Checkout for secure payment processing
- Supports card payments with 3D Secure authentication
- Product price configured via environment variable `REACT_APP_STRIPE_JOURNAL_PRICE_ID`
- All prices in HKD (Hong Kong Dollar)

**Shipping Configuration:**
- Collects shipping address during checkout
- Two shipping rate options presented to customer:
  - **Hong Kong Shipping:** $20 HKD (3-7 business days)
  - **International Shipping:** $69 HKD (7-14 business days)
- Supports 250+ countries worldwide
- Phone number collected for shipping coordination

**Webhook Security:**
- Uses webhook signing secrets to verify authenticity
- Prevents unauthorized webhook calls
- Stripe automatically retries failed webhooks
- Raw request body verified against signature header

---

### Email System (Resend)

**Three Email Templates:**

**1. Order Confirmation (to customer)**
- Branded HTML with coral pink gradient header
- Order summary table showing product, subtotal, shipping, total
- Complete shipping address display
- Order reference number for support
- Brand colors: #D88A75 (coral pink), #FAF8F5 (cream background)

**2. Admin Order Notification (to hello@jessieli.co)**
- Alerts admin of new order
- Customer contact information
- Complete shipping address formatted for label printing
- Pricing breakdown
- Call-to-action button to send tracking notification
- Order fulfillment checklist

**3. Shipping Tracking (to customer)**
- Prominent tracking number display
- Carrier information
- Clickable "Track Your Package" button with carrier link
- Estimated delivery date (if provided)
- Order reference for easy lookup

**Email Configuration:**
- Sent from `orders@jessieli.co` (custom domain)
- Requires domain verification in Resend dashboard
- HTML templates with inline CSS for email client compatibility

---

## Features

### E-Commerce Capabilities
- Stripe Checkout integration with PCI compliance
- Dynamic shipping rates based on destination
- Support for 250+ countries
- Secure payment processing with 3D Secure
- Automated payment confirmation

### Order Management
- Centralized order database in Airtable
- Order tracking via Stripe Session ID
- Automatic data capture (customer info, shipping, payment)
- Admin dashboard for order fulfillment

### Email Automation
- Instant order confirmations
- Admin notifications for new orders
- One-click shipping notification system
- Auto-generated tracking links for major carriers
- Professional branded email templates

### Shipping Features
- Dedicated admin page at `/ship-notification`
- Auto-generates tracking URLs for major carriers
- Shipment status tracking
- Email delivery confirmation
- Order reference pre-filling

### Customer Engagement
- Newsletter subscription with duplicate prevention
- Contact form with inquiry categorization
- Responsive mobile-first design
- SEO-optimized pages

### Analytics
- Google Analytics 4 integration
- Page view tracking
- Purchase event tracking
- Custom event tracking (newsletter, contact form)

---

## Environment Setup

### Prerequisites

- Node.js 16 or higher
- npm or yarn package manager
- Stripe account (free tier works for testing)
- Airtable account
- Resend account for email delivery
- Google Analytics 4 property (optional)

### Installation Steps

**1. Clone Repository**
```bash
git clone https://github.com/haziqdafren/reliefAI_Intern.git
cd reliefAI_Intern
npm install
```

**2. Configure Environment Variables**

Copy the example file:
```bash
cp .env.example .env
```

Open `.env` and fill in these credentials:

**Airtable Configuration:**
```env
AIRTABLE_API_KEY=keyXXXXXXXXXXXXXX
AIRTABLE_BASE_ID=appXXXXXXXXXXXXXX
AIRTABLE_NEWSLETTER_TABLE=Newsletter
AIRTABLE_INQUIRIES_TABLE=Inquiries
AIRTABLE_PAYMENTS_TABLE=Payments
AIRTABLE_SHIPMENTS_TABLE=Shipments
```

Get your API key from: [airtable.com/account](https://airtable.com/account)
Get your Base ID from your Airtable base URL (appears as `app...`)

**Stripe Configuration (Test Mode):**
```env
STRIPE_SECRET_KEY=sk_test_XXXXXXXXXXXXXXXX
STRIPE_WEBHOOK_SECRET=whsec_XXXXXXXXXXXXXXXX
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_XXXXXXXXXXXXXXXX
REACT_APP_STRIPE_JOURNAL_PRICE_ID=price_XXXXXXXXXXXXXXXX
```

Get test keys from: [dashboard.stripe.com/test/apikeys](https://dashboard.stripe.com/test/apikeys)

**Resend Configuration:**
```env
RESEND_API_KEY=re_XXXXXXXXXXXXXXXX
```

Get API key from: [resend.com/api-keys](https://resend.com/api-keys)
Note: Requires domain verification to send from `orders@jessieli.co`

**Google Analytics (Optional):**
```env
REACT_APP_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

**3. Set Up Airtable Database**

Create a new Airtable base with these four tables:

**Newsletter Table:**
- Email (Email field type)
- Subscribed Date (Date field type)
- Status (Single select: Active, Unsubscribed)
- Source (Single line text)

**Inquiries Table:**
- Inquiry Type (Single select: 1:1 coaching, speaking, general)
- First Name (Single line text)
- Last Name (Single line text)
- Email (Email field type)
- Phone (Phone number field type)
- Message (Long text field type)
- Date (Date field type)

**Payments Table:**
- Customer Email (Email)
- Customer Name (Single line text)
- Phone (Phone number)
- Address Line 1, Address Line 2, City, State, Postal Code, Country (All single line text)
- Subtotal, Shipping Fee, Total Amount (All currency field type)
- Currency (Single line text)
- Payment Status (Single select: Completed)
- Stripe Session ID (Single line text)
- Product Name, Product Type (Single line text)
- Date (Date)

**Shipments Table:**
- Order Reference (Link to Payments table)
- Tracking Number (Single line text)
- Carrier (Single select: DHL Express, FedEx, UPS, SF Express, Hong Kong Post, China Post, Other)
- Tracking URL (URL field type)
- Shipping Status (Single select: Shipped, In Transit, Delivered)
- Shipped Date, Estimated Delivery (Date)
- Tracking Email Sent (Checkbox)
- Notes (Long text)

**4. Configure Stripe Webhook**

For production:
1. Go to [dashboard.stripe.com/webhooks](https://dashboard.stripe.com/webhooks)
2. Click "Add endpoint"
3. Endpoint URL: `https://jessieli.co/api/stripe-webhook`
4. Select event: `checkout.session.completed`
5. Copy the signing secret to `STRIPE_WEBHOOK_SECRET` in your `.env`

For local testing:
```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login
stripe login

# Forward webhooks to localhost
stripe listen --forward-to http://localhost:3000/api/stripe-webhook

# Use the webhook secret shown in terminal
```

**5. Run Development Server**
```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

**6. Test Payment Flow**

Use Stripe test card:
- Card number: `4242 4242 4242 4242`
- Expiry: Any future date
- CVC: Any 3 digits
- ZIP: Any 5 digits

---

## Deployment

### Deploying to Vercel

**1. Initial Setup**

Create account at [vercel.com](https://vercel.com) and install Vercel CLI:
```bash
npm install -g vercel
```

**2. Connect Repository**

Option A - Via Dashboard:
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your Git repository
4. Vercel auto-detects React configuration

Option B - Via CLI:
```bash
vercel
```

**3. Configure Environment Variables**

In Vercel Dashboard:
1. Go to Project Settings
2. Click "Environment Variables"
3. Add all variables from your `.env` file
4. Make sure to use **Production** values for Stripe (live keys)

For production, use Stripe LIVE mode keys:
```env
STRIPE_SECRET_KEY=sk_live_XXXXXXXXXXXXXXXX
STRIPE_WEBHOOK_SECRET=whsec_XXXXXXXXXXXXXXXX
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_live_XXXXXXXXXXXXXXXX
REACT_APP_STRIPE_JOURNAL_PRICE_ID=price_XXXXXXXXXXXXXXXX
```

**4. Deploy**

Push to your main branch:
```bash
git add .
git commit -m "Deploy to production"
git push origin main
```

Vercel automatically deploys on push. Monitor deployment at vercel.com/dashboard.

**5. Configure Production Webhook**

1. Switch Stripe dashboard to **Live mode** (toggle in top right)
2. Go to Webhooks → Add endpoint
3. URL: `https://your-domain.vercel.app/api/stripe-webhook`
4. Select event: `checkout.session.completed`
5. Copy signing secret
6. Update `STRIPE_WEBHOOK_SECRET` in Vercel environment variables
7. Redeploy project

**6. Custom Domain (Optional)**

1. In Vercel Dashboard → Domains
2. Add your custom domain (e.g., jessieli.co)
3. Configure DNS records as shown
4. SSL certificate automatically provisioned

### Build Configuration

**Build Command:** `npm run build`
**Output Directory:** `build`
**Install Command:** `npm install`
**Node Version:** 16.x

### Environment-Based Configuration

The app automatically detects environment:
- Development: Uses `http://localhost:3000`
- Production: Uses Vercel URL or custom domain

Stripe keys should match environment:
- Development: Use test mode keys (`sk_test_`, `pk_test_`)
- Production: Use live mode keys (`sk_live_`, `pk_live_`)

---

## Project Structure

```
reliefAI_Intern/
│
├── api/                                    # Vercel Serverless Functions
│   ├── airtable.js                         # Contact form handler
│   ├── create-checkout-session.js          # Stripe checkout creation
│   ├── newsletter.js                       # Newsletter subscription
│   ├── send-shipping-notification.js       # Shipping tracking emails
│   └── stripe-webhook.js                   # Payment webhook processor
│
├── public/                                 # Static assets
│   ├── index.html                          # HTML template
│   ├── manifest.json                       # PWA manifest
│   ├── robots.txt                          # SEO crawler rules
│   └── *.{png,jpg,JPG}                     # Images
│
├── src/
│   ├── components/                         # React components
│   │   ├── ui/                             # Reusable UI components
│   │   │   ├── ErrorMessage.tsx
│   │   │   ├── Modal.tsx
│   │   │   └── SuccessModal.tsx
│   │   ├── Header.tsx                      # Navigation bar
│   │   ├── Footer.tsx                      # Site footer
│   │   ├── BookSection.tsx                 # Book showcase
│   │   ├── JournalSection.tsx              # Journal showcase
│   │   ├── StripeCheckoutButton.tsx        # Payment button
│   │   ├── NewsletterBanner.tsx            # Email signup
│   │   └── ...                             # Other sections
│   │
│   ├── contexts/                           # React Context
│   │   ├── CurrencyContext.tsx             # Currency management
│   │   └── NewsletterContext.tsx           # Newsletter modal state
│   │
│   ├── hooks/                              # Custom React hooks
│   │   ├── useCounterAnimation.ts          # Animated counters
│   │   ├── usePageTracking.ts              # GA4 tracking
│   │   └── useScrollAnimation.ts           # Scroll effects
│   │
│   ├── pages/                              # Page components
│   │   ├── HomePage.tsx                    # Landing page
│   │   ├── AboutPage.tsx                   # About section
│   │   ├── GuidedJournalPage.tsx           # Product page
│   │   ├── ShipNotificationPage.tsx        # Admin shipping page
│   │   ├── PaymentSuccessPage.tsx          # Success confirmation
│   │   ├── PaymentCancelPage.tsx           # Payment cancelled
│   │   └── ...                             # Other pages
│   │
│   ├── utils/                              # Utility functions
│   │   ├── airtable.ts                     # Airtable client
│   │   ├── analytics.ts                    # GA4 helpers
│   │   ├── currency.ts                     # Currency formatting
│   │   └── stripe.ts                       # Stripe initialization
│   │
│   ├── App.tsx                             # Main app with routing
│   ├── index.tsx                           # React entry point
│   └── index.css                           # Global styles
│
├── .env.example                            # Environment template
├── .gitignore                              # Git ignore rules
├── package.json                            # Dependencies
├── tailwind.config.js                      # Tailwind config
├── tsconfig.json                           # TypeScript config
├── vercel.json                             # Vercel deployment config
└── README.md                               # This file
```

---

**Developed by Mohamad Haziq Dafren**

**Portfolio Project:** Full-stack e-commerce platform with payment processing, automated email notifications, and data management.

**Live Demo:** [jessieli.co](https://jessieli.co)

**Tech Highlights:** React, TypeScript, Stripe API, Serverless Architecture, Airtable Integration, Transactional Emails, Vercel Deployment
