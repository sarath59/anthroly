import React from 'react';
import Link from 'next/link';
import { LogoWithImage } from './LogoWithImage';
import { Separator } from './ui/separator';
import { Twitter, Linkedin, Mail } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="site-footer" className="bg-black border-t border-gray-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
          {/* Brand Column */}
          <div className="md:col-span-2">
            <div className="mb-4">
              <Link href="/" className="inline-block">
                <LogoWithImage variant="white" className="text-white" />
              </Link>
            </div>
            <p className="text-gray-400 max-w-md mb-4">
              Two AI agents we set up and run: 1,000 personalized cold emails a day, plus a 24/7 high-quality backlink agent — so you stay the founder, not the SDR.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://twitter.com/anthroly"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://linkedin.com/company/anthroly"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="mailto:sharatth@anthroly.com"
                className="text-gray-400 hover:text-white transition-colors duration-200"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/#features" className="text-gray-400 hover:text-white transition-colors duration-200">
                  AI Agents
                </Link>
              </li>
              <li>
                <Link href="/#pricing" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/customers" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link href="/guides/ai-citations" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Guides
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-white transition-colors duration-200">
                  FAQ (1000+)
                </Link>
              </li>
              <li>
                <a href="mailto:sharatth@anthroly.com" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-white">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/guides/ai-citations" className="text-gray-400 hover:text-white transition-colors duration-200">
                  AI citation guides
                </Link>
              </li>
              <li>
                <Link href="/aeo" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Answer Engine Optimization
                </Link>
              </li>
              <li>
                <Link href="/author/sarath-kavuru" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Sarath Kavuru
                </Link>
              </li>
              <li>
                <Link href="/aeo/how-to-get-cited-in-ai-overviews" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Get cited in AI Overviews
                </Link>
              </li>
              <li>
                <Link href="/aeo/aeo-vs-seo-vs-geo" className="text-gray-400 hover:text-white transition-colors duration-200">
                  AEO vs SEO vs GEO
                </Link>
              </li>
              <li>
                <Link href="/anthroly-vs-anthropic" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Anthroly vs Anthropic
                </Link>
              </li>
              <li>
                <Link href="/reports/ai-visibility-benchmark" className="text-gray-400 hover:text-white transition-colors duration-200">
                  AI Visibility Benchmark
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Agency FAQ
                </Link>
              </li>
              <li>
                <Link href="/tools" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Free Tools
                </Link>
              </li>
              <li>
                <Link href="/customers" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Customer stories
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-white">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-gray-800" />

        <div className="text-center text-gray-400 text-sm space-y-2">
          <p>&copy; {currentYear} Anthroly. All rights reserved.</p>
          <p className="text-xs text-gray-500 max-w-2xl mx-auto">
            Anthroly is an independent SEO and AEO company. We are not affiliated with Anthropic,
            OpenAI, or other AI model providers.{' '}
            <Link href="/anthroly-vs-anthropic" className="text-gray-400 hover:text-emerald-400 underline-offset-2 hover:underline">
              Anthroly vs Anthropic
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};
