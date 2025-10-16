# Deployment Guide for Anthroly

This guide will help you deploy your Anthroly website to Vercel.

## Prerequisites

- GitHub account
- Vercel account (free tier is sufficient)
- Git installed on your computer

## Step 1: Push to GitHub

1. Initialize git repository (if not already done):
```bash
git init
git add .
git commit -m "Initial commit: Anthroly landing page"
```

2. Create a new repository on GitHub

3. Push your code:
```bash
git remote add origin https://github.com/yourusername/anthroly.git
git branch -M main
git push -u origin main
```

## Step 2: Deploy to Vercel

### Option A: Using Vercel Dashboard (Recommended)

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Vercel will auto-detect Next.js settings
5. Click "Deploy"
6. Wait 2-3 minutes for deployment to complete
7. Your site will be live at `your-project.vercel.app`

### Option B: Using Vercel CLI

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. Follow the prompts to deploy

## Step 3: Custom Domain (Optional)

1. In Vercel dashboard, go to your project
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Follow the DNS configuration instructions

## Step 4: Add Stripe Payment Links

Once you have your Stripe account set up:

1. Create payment links in Stripe Dashboard
2. Update the buttons in `components/sections/Pricing.tsx`:

```tsx
// Replace the Button components with links to your Stripe payment pages
<Button size="lg" asChild>
  <a href="https://buy.stripe.com/your-payment-link">
    Get Started with Growth
  </a>
</Button>
```

## Step 5: Environment Variables (If Needed)

If you add environment variables later:

1. Go to Vercel dashboard → Your Project → Settings → Environment Variables
2. Add your variables (e.g., Stripe keys, API keys)
3. Redeploy the project

## Automatic Deployments

Once connected to GitHub, Vercel will automatically:
- Deploy when you push to main branch
- Create preview deployments for pull requests
- Run builds and show errors if any

## Performance Optimization

Your site is already optimized with:
- Next.js automatic code splitting
- Image optimization
- Static generation where possible
- CSS optimization

## Monitoring

Monitor your site in Vercel dashboard:
- View analytics
- Check deployment logs
- Monitor performance
- Set up custom domains

## Troubleshooting

### Build Fails

1. Check the build logs in Vercel
2. Make sure all dependencies are in `package.json`
3. Verify Node.js version compatibility

### Missing Dependencies

Run locally first to catch errors:
```bash
npm install
npm run build
```

### Type Errors

Fix TypeScript errors before deploying:
```bash
npm run build
```

## Need Help?

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)

---

Your Anthroly website should now be live and ready to attract customers! 🎉

