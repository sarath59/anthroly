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
- **Contact** → `mailto:sarath.k@neuralnetwrk.com` (opens email)
- **Privacy Policy** → `/privacy`
- **Terms of Service** → `/terms`

## 🏠 Homepage Sections

### Hero Section
- **Start Your Journey Button** → `/#pricing`
- **View Pricing Button** → `/#pricing`

### Features Section
- **View Pricing CTA** → `/#pricing`

### Pricing Section
- **Get Started Button** → `https://buy.stripe.com/4gM6oHaCL1gLd23b2nb3q0a` (Stripe Checkout)
- **Contact Us** → `mailto:sarath.k@neuralnetwrk.com`

## 🔄 Dynamic Routes

### Available Pages
- `/` - Homepage
- `/blog` - Blog listing
- `/privacy` - Privacy Policy
- `/terms` - Terms of Service

### Section Anchors (Homepage)
- `#services` - Features/Services section
- `#pricing` - Pricing section

## 💳 Payment Links

The site currently uses **Stripe** for payments.

### Location: `components/sections/Pricing.tsx` (lines ~80)

Current link:
```tsx
<a href="https://buy.stripe.com/4gM6oHaCL1gLd23b2nb3q0a">
```

To update the payment link:
1. Create a new payment link in your Stripe dashboard
2. Replace the href in `components/sections/Pricing.tsx`

## 📧 Email Links

All contact links currently open an email client:
- **General Contact**: sarath.k@neuralnetwrk.com
- **Twitter**: Update with your Twitter URL
- **LinkedIn**: Update with your LinkedIn URL

### Update Social Links in Footer

Location: `components/Footer.tsx` (lines ~37-55)

```tsx
// Update these URLs:
<a href="https://twitter.com/YOUR_HANDLE" ...>
<a href="https://linkedin.com/company/YOUR_COMPANY" ...>
```
