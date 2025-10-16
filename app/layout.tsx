import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Anthroly - Human-Written Content That Ranks",
  description: "Beat the AI slop with premium, human-written blog posts and social content. Dominate search rankings and AI-powered results.",
  keywords: ["content writing", "SEO", "blog posts", "human-written content", "AI SEO", "content marketing"],
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
          data-website-id="dfid_BHHwZB7yxowtTplDDzaCG"
          data-domain="www.anthroly.com"
          src="https://datafa.st/js/script.js"
          strategy="afterInteractive"
        />
        
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

