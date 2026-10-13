import type { Metadata } from "next";
import { Instrument_Serif, Inter_Tight, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SITE_URL, SITE_DESCRIPTION, absoluteUrl, DATAFAST_WEBSITE_ID } from "@/lib/site";
import { SiteJsonLd } from "@/components/schema/SiteJsonLd";
import { DataFastGoals } from "@/components/analytics/DataFastGoals";

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-serif",
});

const sans = Inter_Tight({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-mono",
});

const TITLE = "Datary Labs — The data lab for American operating data";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s · Datary Labs",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "sell company data to AI labs",
    "AI training data",
    "data broker",
    "data licensing",
    "RL environments",
    "reinforcement learning training data",
    "agent trajectory data",
    "RLHF data",
    "operational data",
    "evaluation datasets",
  ],
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
    canonical: absoluteUrl("/"),
  },
  openGraph: {
    title: TITLE,
    description: SITE_DESCRIPTION,
    url: absoluteUrl("/"),
    siteName: "Datary Labs",
    type: "website",
    images: [{ url: absoluteUrl("/logo.png"), width: 512, height: 512, alt: "Datary Labs" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: SITE_DESCRIPTION,
    images: [absoluteUrl("/logo.png")],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} ${mono.variable}`}>
      <head>
        <link rel="preconnect" href="https://img.logo.dev" />
      </head>
      <body className="min-h-screen">
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
          data-domain="datarylabs.com"
          src="https://datafa.st/js/script.js"
          strategy="lazyOnload"
        />
        <DataFastGoals />
      </body>
    </html>
  );
}
