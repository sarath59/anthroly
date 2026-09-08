import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { BOOK_CALL_URL, PRIMARY_CTA_LABEL, absoluteUrl } from '@/lib/site';
import { allCustomerStories, ENTERPRISE_PROOF_LINE } from '@/lib/customers';
import { CustomerLogoWall } from '@/components/sections/CustomerLogoWall';
import {
  combineSchemas,
  generateBreadcrumbSchema,
  generateItemListSchema,
  generateOrganizationSchema,
} from '@/lib/schema';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Customers — Meet the Teams Using Anthroly | Anthroly',
  description:
    'Meet the teams who are using Anthroly. See how MongoDB, WHOOP, Ramp, Kiteworks, Alchemy, and 700+ enterprise brands achieve measurable results in AI Search.',
  alternates: { canonical: absoluteUrl('/customers') },
  openGraph: {
    title: 'Customers — Meet the Teams Using Anthroly',
    description:
      'We help companies of all sizes around the world achieve measurable results in AI Search and answer engines.',
    url: absoluteUrl('/customers'),
    siteName: 'Anthroly',
    type: 'website',
  },
};

export default function CustomersPage() {
  const structuredData = combineSchemas(
    generateItemListSchema(
      'Anthroly customer case studies',
      allCustomerStories.map((c) => ({
        name: c.title,
        url: `/customers/${c.slug}`,
        description: c.keyResult,
      }))
    ),
    generateBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Customers', url: '/customers' },
    ]),
    generateOrganizationSchema()
  );

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: structuredData }}
      />

      {/* Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_#222_1px,_transparent_1px)] bg-[size:32px_32px] opacity-20" />
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 text-emerald-300 rounded-full text-sm font-semibold mb-6 border border-emerald-500/30">
              <Sparkles size={16} />
              <span>Customers</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
              Meet the teams who are using Anthroly
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-4">
              We help companies of all sizes around the world achieve measurable results.
            </p>
            <p className="text-sm text-gray-500 max-w-2xl mx-auto mb-3">{ENTERPRISE_PROOF_LINE}</p>
            <p className="text-sm text-gray-500 max-w-2xl mx-auto">
              Each full story includes topic pages for results, AEO strategy, ChatGPT visibility,
              quotes, and playbooks — built to rank for brand + AI search queries.
            </p>
          </div>

          {/* Story grid */}
          <div className="grid gap-4 md:grid-cols-2 mb-24">
            {allCustomerStories.map((c) => (
              <Link
                key={c.slug}
                href={`/customers/${c.slug}`}
                className="block p-6 rounded-2xl bg-black/40 border border-gray-800 hover:border-emerald-500/40 transition-colors group h-full"
              >
                <p className="text-sm font-semibold text-emerald-400 mb-2">{c.brand}</p>
                <h2 className="text-base font-semibold text-white mb-3 leading-snug group-hover:text-emerald-300 transition-colors">
                  {c.title}
                </h2>
                <span className="inline-flex items-center gap-2 text-sm font-medium text-gray-400 group-hover:text-emerald-400 group-hover:gap-3 transition-all">
                  Read story
                  <ArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>

          {/* Logo wall */}
          <CustomerLogoWall className="mb-24" />

          {/* Bottom CTA */}
          <div className="rounded-2xl bg-black/40 border border-gray-800 p-8 md:p-10 text-center">
            <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Ready to grow your AI visibility?
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Get started with Anthroly
            </h2>
            <p className="text-gray-400 mb-6 max-w-xl mx-auto">
              Join the brands already capturing AI referral traffic. We analyze, optimize, and
              scale your presence in AI answers.
            </p>
            <a href={BOOK_CALL_URL} target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                className="bg-emerald-500 text-black hover:bg-emerald-400 font-semibold"
              >
                {PRIMARY_CTA_LABEL}
                <ArrowRight className="ml-2" size={18} />
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
