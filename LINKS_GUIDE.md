# Internal Links Guide

This document outlines all internal links in the Anthroly website and where they point to.

## ✅ All Links Now Work From Any Page

All hash links now use `/#anchor` format so they work from any page (blog, privacy, terms, etc.).

## 🔗 Navigation Links

### Header Navigation
- **Services** → `/#services` (scrolls to Services section on homepage)
- **Pricing** → `/#pricing` (scrolls to Pricing section on homepage)
- **Blog** → `/blog` (Blog listing page)
- **Get Started Button** → `/#pricing` (scrolls to Pricing section)

### Footer Navigation
- **Services** → `/#services`
- **Pricing** → `/#pricing`
- **Blog** → `/blog`
- **Contact** → `mailto:hello@anthroly.com` (opens email)
- **Privacy Policy** → `/privacy`
- **Terms of Service** → `/terms`

## 🏠 Homepage Sections

### Hero Section
- **Start Your Journey Button** → `/#pricing`
- **View Pricing Button** → `/#pricing`

### Features Section
- **View Pricing CTA** → `/#pricing`

### Pricing Section
- **Get Started with Growth Button** → `mailto:hello@anthroly.com?subject=Subscribe to Anthroly - Growth Plan`
- **Get Started with Premium Button** → `mailto:hello@anthroly.com?subject=Subscribe to Anthroly - Premium Plan`
- **Contact Us for Custom Solutions** → `mailto:hello@anthroly.com`

## 🔄 Dynamic Routes

### Available Pages
- `/` - Homepage
- `/blog` - Blog listing
- `/privacy` - Privacy Policy
- `/terms` - Terms of Service

### Section Anchors (Homepage)
- `#services` - Features/Services section
- `#pricing` - Pricing section

## 💳 Adding Stripe Payment Links

When you're ready to integrate Stripe payments, update the pricing buttons:

### Location: `components/sections/Pricing.tsx` (lines ~143-157)

Replace the `mailto:` links with your Stripe payment links:

```tsx
// Current (temporary):
<a href={`mailto:hello@anthroly.com?subject=Subscribe to Anthroly - ${plan.name} Plan`}>

// Replace with Stripe links:
// For Growth plan ($350/month):
<a href="https://buy.stripe.com/YOUR_GROWTH_PLAN_LINK">

// For Premium plan ($499/month):
<a href="https://buy.stripe.com/YOUR_PREMIUM_PLAN_LINK">
```

### How to Get Stripe Payment Links

1. Log in to your Stripe Dashboard
2. Go to **Products** → **Add Product**
3. Create two products:
   - Growth Plan: $350/month (recurring)
   - Premium Plan: $499/month (recurring)
4. Click on each product → **Create payment link**
5. Copy the payment link URL
6. Replace the mailto links in the code

## 📧 Email Links

All contact links currently open an email client:
- **General Contact**: hello@anthroly.com
- **Twitter**: Update with your Twitter URL
- **LinkedIn**: Update with your LinkedIn URL

### Update Social Links in Footer

Location: `components/Footer.tsx` (lines ~37-55)

```tsx
// Update these URLs:
<a href="https://twitter.com/YOUR_HANDLE" ...>
<a href="https://linkedin.com/company/YOUR_COMPANY" ...>
```

## 🎯 Link Testing Checklist

Test all links from different pages:

### From Homepage (`/`)
- ✅ All hash links (#services, #pricing) - scroll to sections
- ✅ Blog link - goes to `/blog`
- ✅ Get Started buttons - scroll to pricing

### From Blog (`/blog`)
- ✅ Services link - goes to `/#services` (home + scroll)
- ✅ Pricing link - goes to `/#pricing` (home + scroll)
- ✅ Logo click - goes to `/`

### From Privacy/Terms Pages
- ✅ All navigation links work
- ✅ Logo returns to homepage
- ✅ Footer links work

### Mobile Menu
- ✅ All links work
- ✅ Menu closes after clicking link

## 🚀 Future Enhancements

Consider adding:
- Contact page at `/contact`
- About page at `/about`
- Case studies/portfolio at `/work`
- FAQ page at `/faq`

---

**Last Updated**: October 16, 2024

