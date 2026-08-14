import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollAnimationWrapper } from "@/components/ui/ScrollAnimationWrapper";
import { SITE_URL, absoluteUrl, DATAFAST_WEBSITE_ID } from "@/lib/site";
import { SiteJsonLd } from "@/components/schema/SiteJsonLd";
import { DataFastGoals } from "@/components/analytics/DataFastGoals";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Anthroly - Human Content + AI Backlinks",
  description: "Human-led SEO and content: high-DR backlinks, blogs, and AI-search visibility—delivered by our team from $2,000/mo.",
  keywords: ["AI SEO", "human-led SEO", "high-DR backlinks", "SEO content", "answer engine optimization", "AEO", "LLM SEO", "SaaS SEO"],
  alternates: {
    // Absolute, query-free — tracking params like ?ref=producthunt must not create a second indexable URL
    canonical: absoluteUrl('/'),
  },
  openGraph: {
    title: "Anthroly - Human Content + AI Backlinks",
    description: "Human-led SEO and content: high-DR backlinks, blogs, and AI-search visibility—delivered by our team from $2,000/mo.",
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
    card: 'summary',
    title: "Anthroly - Human Content + AI Backlinks",
    description: "Human-led SEO and content: high-DR backlinks, blogs, and AI-search visibility—delivered by our team from $2,000/mo.",
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
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <SiteJsonLd />
        {/* Queue goals fired before the DataFast script loads */}
        <Script id="datafast-queue" strategy="beforeInteractive">
          {`window.datafast=window.datafast||function(){(window.datafast.q=window.datafast.q||[]).push(arguments);};`}
        </Script>
        <Script
          defer
          data-website-id={DATAFAST_WEBSITE_ID}
          data-domain="anthroly.com"
          src="https://datafa.st/js/script.js"
          strategy="afterInteractive"
        />
        <DataFastGoals />
        
        <ScrollAnimationWrapper>
          <Header />
          <main>{children}</main>
          <Footer />
        </ScrollAnimationWrapper>
      </body>
    </html>
  );
}
