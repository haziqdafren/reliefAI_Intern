# Resend Email Setup Guide for Boss

## What is Resend?

Resend will automatically send beautiful order confirmation emails to customers after successful payments.

**FREE Plan:** 100 emails/day, 1 domain (perfect for your needs!)

---

## Step-by-Step Setup (15 minutes)

### Step 1: Create Resend Account
1. Go to **https://resend.com**
2. Click **"Sign Up"** (top right)
3. Sign up with your email (use your business email)
4. Verify your email

---

### Step 2: Get Your API Key
1. After logging in, go to **API Keys** (left sidebar)
2. Click **"Create API Key"**
3. Name it: `Jessie Li Website`
4. Permission: **"Sending access"**
5. Click **"Create"**
6. Copy the API key (starts with `re_...`)
   - ⚠️ **IMPORTANT:** Save this key - you can only see it once!

---

### Step 3: Verify Your Domain (jessieli.co)

This makes emails come from `orders@jessieli.co` instead of a generic address.

1. In Resend dashboard, go to **Domains** (left sidebar)
2. Click **"Add Domain"**
3. Enter: `jessieli.co`
4. Click **"Add"**

#### You'll see DNS records to add:

Resend will show 3 DNS records. You need to add these to your domain settings (where you bought jessieli.co).

**Example DNS records you'll need to add:**

| Type | Name | Value |
|------|------|-------|
| TXT | @ | `resend-domain-verify=...` |
| MX | @ | `feedback-smtp.us-east-1.amazonses.com` |
| TXT | resend._domainkey | `p=MIGfMA0GCSqG...` |

#### How to add DNS records:

**If you use Vercel for domain:**
1. Go to Vercel Dashboard → Domains → jessieli.co
2. Go to DNS Records section
3. Add each record from Resend

**If you use another provider (GoDaddy, Namecheap, etc):**
1. Log into your domain provider
2. Find DNS settings / DNS management
3. Add each record from Resend
4. Save changes

⏰ **DNS verification takes 5-30 minutes** after adding records.

5. Go back to Resend → Click **"Verify DNS Records"**
6. Once verified, you'll see ✅ **"Verified"** status

---

### Step 4: Send Us Your API Key

Once you have the API key from Step 2, send it to us:

```
RESEND_API_KEY: re_XXXXX...
```

We'll add it to Vercel environment variables and you're done!

---

## What Happens After Setup?

✅ Every successful payment automatically triggers:
1. Customer receives beautiful order confirmation email
2. Email comes from `orders@jessieli.co`
3. Includes full order details:
   - Order reference number
   - Product details
   - Subtotal, shipping fee, total amount
   - Full shipping address
   - Phone number
4. Professional pink gradient design matching your brand

---

## Email Preview

Your customers will receive an email like this:

```
Subject: Order Confirmation - Thank you for your purchase!
From: Jessie Li <orders@jessieli.co>

┌─────────────────────────────────────────┐
│   Thank You for Your Order! 🎉          │  (Pink gradient header)
└─────────────────────────────────────────┘

Hi [Customer Name],

Your order has been confirmed! We're excited to send your journal to you.

ORDER DETAILS
─────────────────────────────────
Order Reference: cs_test_xxxxx
Product: Homwards: to my authentic self - Journal
Subtotal: 120.00 HKD
Shipping Fee: 20.00 HKD
─────────────────────────────────
Total Paid: 140.00 HKD

SHIPPING ADDRESS
─────────────────────────────────
[Customer Name]
[Full Address]
Phone: [Phone number]

What's next?
We'll process your order and send you a shipping confirmation
once your journal is on its way.

With gratitude,
Jessie Li
```

---

## Testing

After we add your API key to Vercel:
1. We'll do a test purchase with Stripe test card
2. Check if you receive the order confirmation email
3. Verify all details are correct

---

## FAQ

**Q: What if I don't verify the domain?**
A: Emails will come from `onboarding@resend.dev` instead of `orders@jessieli.co`. Still works, but less professional.

**Q: Can I customize the email design?**
A: Yes! After initial setup, we can adjust the email template, colors, text, etc.

**Q: What if I exceed 100 emails/day?**
A: Very unlikely at first. If it happens, Resend's paid plan is $20/month for 50,000 emails.

**Q: Can customers reply to the email?**
A: Yes! If they reply, it goes to the email you used to sign up with Resend. You can configure a custom reply-to address later.

---

## Need Help?

If you get stuck:
1. Take a screenshot of where you're stuck
2. Send to us with your question
3. We'll guide you through!

---

**Ready to go?** Start with Step 1 above! 🚀
