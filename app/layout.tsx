import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollAnimationWrapper } from "@/components/ui/ScrollAnimationWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Anthroly - Human Content + AI Backlinks",
  description: "AI agents that bring backlinks for businesses on autopilot. Get 24/7 AI agents for backlinks for just $535/mo.",
  keywords: ["SEO", "backlinks", "link building", "AI agents", "AI SEO", "automated outreach", "agency", "SaaS growth"],
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
