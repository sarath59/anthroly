import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SITE_URL, absoluteUrl, DATAFAST_WEBSITE_ID } from "@/lib/site";
import { SiteJsonLd } from "@/components/schema/SiteJsonLd";
import { DataFastGoals } from "@/components/analytics/DataFastGoals";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Anthroly — Founder AI Authority & Pipeline System",
  description: "Become easier to discover, trust, and contact in the AI era. $216 Founder Growth Diagnostic (credited toward a $1,500 30-day sprint). Then $1,000/month. Humans do the work. Machines help us scale.",
  keywords: ["GEO", "AI search visibility", "ChatGPT SEO", "Perplexity citations", "AI lead generation", "founder ghostwriting", "LinkedIn ghostwriting", "AEO", "human-led SEO"],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    // Absolute, query-free — tracking params like ?ref=producthunt must not create a second indexable URL
    canonical: absoluteUrl('/'),
  },
  openGraph: {
    title: "Anthroly — Founder AI Authority & Pipeline System",
    description: "Become easier to discover, trust, and contact in the AI era. $216 diagnostic (credited toward $1,500 sprint). Then $1,000/month.",
    url: absoluteUrl('/'),
    siteName: 'Anthroly',
    type: 'website',
    images: [
      {
        url: absoluteUrl('/logo.png'),
        width: 512,
        height: 512,
        alt: 'Anthroly — human-led SEO, content, and AI-search visibility',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Anthroly — Founder AI Authority & Pipeline System",
    description: "Become easier to discover, trust, and contact in the AI era. $216 diagnostic (credited toward $1,500 sprint). Then $1,000/month.",
    images: [absoluteUrl('/logo.png')],
  },
  icons: {
    icon: [
      { url: '/logo.png', sizes: '32x32', type: 'image/png' },
      { url: '/logo.png', sizes: '16x16', type: 'image/png' },
    ],
    shortcut: '/logo.png',
    apple: '/logo.png',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/logo.png',
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <link rel="preconnect" href="https://datafa.st" />
        <link rel="dns-prefetch" href="https://img.logo.dev" />
      </head>
      <body className="min-h-screen bg-black text-white antialiased">
        <SiteJsonLd />
        <Header />
        <main>{children}</main>
        <Footer />
        <Script id="datafast-queue" strategy="afterInteractive">
          {`window.datafast=window.datafast||function(){(window.datafast.q=window.datafast.q||[]).push(arguments);};`}
        </Script>
        <Script
          defer
          data-website-id={DATAFAST_WEBSITE_ID}
          data-domain="anthroly.com"
          src="https://datafa.st/js/script.js"
          strategy="lazyOnload"
        />
        <DataFastGoals />
      </body>
    </html>
  );
}
