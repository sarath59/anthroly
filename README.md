# Anthroly - Human-Written Content That Ranks

A premium Next.js landing page for a content writing service that delivers 100% human-written blog posts and social content.

## 🎨 Features

- **Modern Design**: Clean black and white theme with premium finish
- **ShadCN UI Components**: Beautiful, accessible components
- **3D Animations**: Smooth scroll effects and typing animations
- **Responsive**: Fully responsive design for all devices
- **SEO Optimized**: Built with SEO best practices
- **TypeScript**: Type-safe code throughout
- **Performance**: Optimized for speed and user experience

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/anthroly.git
cd anthroly
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📦 Building for Production

```bash
npm run build
npm run start
```

## 🌐 Deploy to Vercel

The easiest way to deploy this Next.js app is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import your repository in Vercel
3. Vercel will automatically detect Next.js and configure the build
4. Deploy!

Alternatively, use the Vercel CLI:

```bash
npm i -g vercel
vercel
```

## 🎯 Pages

- **Home** (`/`) - Main landing page with all sections
- **Blog** (`/blog`) - Blog listing page (ready for content)

## 🧩 Sections

1. **Hero** - Eye-catching hero with typing animation effect
2. **Problem/Solution** - Explains the AI content problem and Anthroly's solution
3. **Features** - Service offerings with scroll animations
4. **Pricing** - $99/month

## 💳 Adding Stripe Integration

To integrate Stripe for payments:

1. Create a `.env.local` file:
```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_publishable_key
STRIPE_SECRET_KEY=your_secret_key
```

2. Update the pricing buttons in `components/sections/Pricing.tsx` with your Stripe payment links

## 🎨 Customization

### Colors

The project uses a black and white theme. To customize colors, edit `app/globals.css` and `tailwind.config.ts`.

### Logo

The elephant logo is defined in `components/Logo.tsx`. Customize the SVG paths to modify the design.

### Content

All content is in the component files under `components/sections/`. Edit these files to update text, features, and pricing.

## 📁 Project Structure

```
anthroly/
├── app/
│   ├── blog/
│   │   └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── ProblemSolution.tsx
│   │   ├── Features.tsx
│   │   └── Pricing.tsx
│   ├── ui/
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── separator.tsx
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── Logo.tsx
├── lib/
│   └── utils.ts
├── public/
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.js
```

## 🛠️ Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: ShadCN UI
- **Icons**: Lucide React
- **Animations**: Framer Motion

## 📝 License

Copyright © 2024 Anthroly. All rights reserved.

## 🤝 Support

For support, email hello@anthroly.com

---

Built with ❤️ by the Anthroly team
