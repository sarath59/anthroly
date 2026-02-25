import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Customers | Anthroly',
  description: 'Meet brands growing with Anthroly — see how llmoutrank, isthisaiorno.com, and Jobstronauts grew AI referral traffic and visibility.',
};

const customers = [
  {
    slug: 'llmoutrank',
    brand: 'llmoutrank',
    headline: 'How llmoutrank grew AI referral traffic to thousands of visits in 2 months',
    keyResult: '2,400+ AI referral visits · 5x citations',
  },
  {
    slug: 'isthisaiorno',
    brand: 'isthisaiorno.com',
    headline: 'How isthisaiorno.com hit 3,000+ monthly visitors from AI search in 6 weeks',
    keyResult: '3,200+ monthly visitors · 8x AI visibility',
  },
  {
    slug: 'jobstronauts',
    brand: 'Jobstronauts',
    headline: 'How Jobstronauts captured 1,500+ AI-driven clicks in their first month',
    keyResult: '1,500+ AI clicks · 4x citation share',
  },
];

export default function CustomersPage() {
  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-24">
      {/* Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_#222_1px,_transparent_1px)] bg-[size:32px_32px] opacity-20" />
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 text-emerald-300 rounded-full text-sm font-semibold mb-6 border border-emerald-500/30">
              <Sparkles size={16} />
              <span>Case Studies</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              Meet our customers
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              See how growing brands use Anthroly to capture AI referral traffic and visibility.
            </p>
          </div>

          {/* Card grid */}
          <div className="grid gap-6 mb-20">
            {customers.map((c) => (
              <Link
                key={c.slug}
                href={`/customers/${c.slug}`}
                className="block p-6 md:p-8 rounded-2xl bg-black/40 border border-gray-800 hover:border-gray-700 transition-colors group"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-semibold text-white mb-1 group-hover:text-emerald-400 transition-colors">
                      {c.brand}
                    </h2>
                    <p className="text-gray-400 mb-2">{c.headline}</p>
                    <p className="text-sm text-emerald-400/90">{c.keyResult}</p>
                  </div>
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-emerald-400 group-hover:gap-3 transition-all shrink-0">
                    Read story
                    <ArrowRight size={16} />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="rounded-2xl bg-black/40 border border-gray-800 p-8 md:p-10 text-center">
            <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Ready to grow your AI visibility?
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Get started with Anthroly
            </h2>
            <p className="text-gray-400 mb-6 max-w-xl mx-auto">
              Join brands already capturing AI referral traffic. We analyze, optimize, and scale your presence in AI answers.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <span className="text-2xl font-bold text-emerald-400">1B+</span>
              <span className="text-gray-500">Citations analyzed</span>
              <span className="text-gray-600">·</span>
              <span className="text-2xl font-bold text-cyan-400">AI-first</span>
              <span className="text-gray-500">strategy</span>
            </div>
            <a href="https://buy.polar.sh/polar_cl_NBzHmxi4dZuSh5bLGhG0iUoBqLAa8Y3dBUiFv0fZ1AN" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-emerald-500 text-black hover:bg-emerald-400 font-semibold">
                Get Started
                <ArrowRight className="ml-2" size={18} />
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
