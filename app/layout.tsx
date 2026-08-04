import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollAnimationWrapper } from "@/components/ui/ScrollAnimationWrapper";
import { SITE_URL, absoluteUrl } from "@/lib/site";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Anthroly - AI Agents for SEO, Sales, Marketing & Support",
  description: "We build intelligent AI agents that analyze, execute, and report end to end—for SEO, sales automation, marketing, and customer support. Human-led SEO included. From $2,000/mo.",
  keywords: ["AI agents", "AI agents for business", "sales automation", "customer support automation", "marketing automation", "AI SEO", "agentic AI", "SaaS growth"],
  alternates: {
    // Absolute, query-free — tracking params like ?ref=producthunt must not create a second indexable URL
    canonical: absoluteUrl('/'),
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
        {/* Datafast Analytics */}
        <Script
          defer
          data-website-id="dfid_64UKkRm4SuynXLuxGKg4u"
          data-domain="anthroly.com"
          src="https://datafa.st/js/script.js"
          strategy="afterInteractive"
        />
        
        <ScrollAnimationWrapper>
          <Header />
          <main>{children}</main>
          <Footer />
        </ScrollAnimationWrapper>
      </body>
    </html>
  );
}
