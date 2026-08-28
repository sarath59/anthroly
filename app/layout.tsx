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
  title: "Anthroly — 1,000 Emails/Day + 24/7 Backlink Agents",
  description: "Two AI agents we set up and run: 1,000 emails a day + 24/7 backlinks. Only 10 slots. $216 initial fee. $1,000 one-time when you are happy. Then $500/month with daily updates. Unhappy? We refund the $1,000.",
  keywords: ["AI outreach agent", "cold email", "lead generation", "backlink agent", "link building", "1000 emails a day", "AI SEO", "founder pipeline"],
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
    title: "Anthroly — 1,000 Emails/Day + 24/7 Backlink Agents",
    description: "Two AI agents: 1,000 emails a day + 24/7 backlinks. Only 10 slots. $216 to start setup. $1,000 one-time when you are happy. Then $500/month. Unhappy? We refund the $1,000.",
    url: absoluteUrl('/'),
    siteName: 'Anthroly',
    type: 'website',
    images: [
      {
        url: absoluteUrl('/logo.png'),
        width: 512,
        height: 512,
        alt: 'Anthroly — outreach and backlink AI agents',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Anthroly — 1,000 Emails/Day + 24/7 Backlink Agents",
    description: "Two AI agents: 1,000 emails a day + 24/7 backlinks. Only 10 slots. $216 to start setup. $1,000 one-time when you are happy. Then $500/month. Unhappy? We refund the $1,000.",
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
