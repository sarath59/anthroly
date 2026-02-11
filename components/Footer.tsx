import React from 'react';
import Link from 'next/link';
import { LogoWithImage } from './LogoWithImage';
import { Separator } from './ui/separator';
import { Twitter, Linkedin, Mail } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-gray-800 text-white">
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
              Autonomous AI agents that bring backlinks for businesses on autopilot.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="mailto:sarath.k@neuralnetwrk.com"
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
                  Features
                </Link>
              </li>
              <li>
                <Link href="/#pricing" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/#proof" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Resources
                </Link>
              </li>
              <li>
                <a href="mailto:sarath.k@neuralnetwrk.com" className="text-gray-400 hover:text-white transition-colors duration-200">
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
                <Link href="/glossary" className="text-gray-400 hover:text-white transition-colors duration-200">
                  SEO Glossary
                </Link>
              </li>
              <li>
                <Link href="/industries" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Industries
                </Link>
              </li>
              <li>
                <Link href="/use-cases" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Use Cases
                </Link>
              </li>
              <li>
                <Link href="/for" className="text-gray-400 hover:text-white transition-colors duration-200">
                  For Teams
                </Link>
              </li>
              <li>
                <Link href="/ai-seo-agency" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Locations
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

        <div className="text-center text-gray-400 text-sm">
          <p>&copy; {currentYear} Anthroly. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
