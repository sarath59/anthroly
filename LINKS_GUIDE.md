# Internal Links Guide

This document outlines all internal links in the Anthroly website and where they point to.

## ✅ All Links Now Work From Any Page

All hash links now use `/#anchor` format so they work from any page (blog, privacy, terms, etc.).

## 🔗 Navigation Links

### Header Navigation
- **Services** → `/#services` (scrolls to Services section on homepage)
- **Pricing** → `/#pricing` (scrolls to Pricing section on homepage)
- **Blog** → `/blog` (Blog listing page)
- **Get Started Button** → `https://buy.polar.sh/polar_cl_NBzHmxi4dZuSh5bLGhG0iUoBqLAa8Y3dBUiFv0fZ1AN` (Polar Checkout)

### Footer Navigation
- **Services** → `/#services`
- **Pricing** → `/#pricing`
- **Blog** → `/blog`
- **Contact** → `mailto:sharatth@anthroly.com` (opens email)
- **Privacy Policy** → `/privacy`
- **Terms of Service** → `/terms`

## 🏠 Homepage Sections

### Hero Section
- **Get Started Button** → `https://buy.polar.sh/polar_cl_NBzHmxi4dZuSh5bLGhG0iUoBqLAa8Y3dBUiFv0fZ1AN` (Polar Checkout)

### Features Section
- **View Pricing CTA** → `/#pricing`

### Pricing Section
- **Get Started Button** → `https://buy.polar.sh/polar_cl_NBzHmxi4dZuSh5bLGhG0iUoBqLAa8Y3dBUiFv0fZ1AN` (Polar Checkout)
- **Contact Us** → `mailto:sharatth@anthroly.com`

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

The site currently uses **Polar** for payments.

### Checkout URL
`https://buy.polar.sh/polar_cl_NBzHmxi4dZuSh5bLGhG0iUoBqLAa8Y3dBUiFv0fZ1AN`

### Locations
- `components/sections/Pricing.tsx` - Main pricing CTA
- `components/sections/Hero.tsx` - Hero CTA
- `components/sections/FinalCTA.tsx` - Final CTA
- `components/Header.tsx` - Get Started buttons
- Various page CTAs (glossary, resources, customers, integrations, etc.)

To update the payment link:
1. Create a new checkout link in your Polar dashboard
2. Replace the href in all locations listed above

## 📧 Email Links

All contact links currently open an email client:
- **General Contact**: sharatth@anthroly.com
- **Twitter**: Update with your Twitter URL
- **LinkedIn**: Update with your LinkedIn URL

### Update Social Links in Footer

Location: `components/Footer.tsx` (lines ~37-55)

```tsx
// Update these URLs:
<a href="https://twitter.com/YOUR_HANDLE" ...>
<a href="https://linkedin.com/company/YOUR_COMPANY" ...>
```
