'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Target, Zap, TrendingUp } from 'lucide-react';

export interface KeyResult {
  value: string;
  description: string;
  highlight?: 'white' | 'emerald' | 'cyan';
}

export interface CaseStudyLayoutProps {
  brand: string;
  brandDisplay: string;
  headline: string;
  summary: string;
  about: string;
  siteUrl?: string;
  keyResults: KeyResult[];
  quote: { body: string; attribution: string };
  opportunity: React.ReactNode;
  solution: React.ReactNode;
  results: React.ReactNode;
  outcome: React.ReactNode;
  chart?: React.ReactNode;
  screenshot?: { src: string; alt: string } | null;
  children?: React.ReactNode;
}

const highlightClass = {
  white: 'text-white',
  emerald: 'text-emerald-400',
  cyan: 'text-cyan-400',
};

export function CaseStudyLayout({
  brand,
  brandDisplay,
  headline,
  summary,
  about,
  siteUrl,
  keyResults,
  quote,
  opportunity,
  solution,
  results,
  outcome,
  chart,
  screenshot,
  children,
}: CaseStudyLayoutProps) {
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
          {/* Breadcrumb */}
          <nav className="mb-8 text-sm">
            <Link href="/customers" className="text-gray-400 hover:text-white transition-colors">
              Customers
            </Link>
            <span className="mx-2 text-gray-600">/</span>
            <span className="text-white">{brandDisplay}</span>
          </nav>

          {/* Hero */}
          <div className="mb-10">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              {headline}
            </h1>
            <p className="text-xl text-gray-400">{summary}</p>
          </div>

          {/* About [Brand] */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-12 pb-8 border-b border-gray-800">
            <div>
              <h2 className="text-lg font-semibold text-white mb-1">About {brandDisplay}</h2>
              <p className="text-gray-400 text-sm max-w-xl">{about}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              {siteUrl && (
                <a href={siteUrl} target="_blank" rel="noopener noreferrer">
                  <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                    Visit site
                  </Button>
                </a>
              )}
              <Link href="/#pricing">
                <Button size="sm" className="bg-emerald-500 text-black hover:bg-emerald-400">
                  Get a demo
                </Button>
              </Link>
            </div>
          </div>

          {/* Key Results */}
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Key Results</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            {keyResults.map((kr, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-black/40 border border-gray-800 text-center"
              >
                <div className={`text-3xl md:text-4xl font-bold mb-1 ${highlightClass[kr.highlight ?? 'white']}`}>
                  {kr.value}
                </div>
                <div className="text-sm text-gray-400">{kr.description}</div>
              </div>
            ))}
          </div>

          {/* Blockquote */}
          <blockquote className="pl-4 border-l-4 border-emerald-500/50 py-4 mb-12">
            <p className="text-gray-300 italic leading-relaxed mb-4">&quot;{quote.body}&quot;</p>
            <footer className="text-sm text-gray-500">{quote.attribution}</footer>
          </blockquote>

          {/* The Opportunity */}
          <section id="opportunity" className="mb-12 scroll-mt-24">
            <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <Target size={20} className="text-emerald-400" />
              The Opportunity
            </h3>
            <div className="text-gray-300 leading-relaxed">{opportunity}</div>
          </section>

          {/* The Solution */}
          <section id="solution" className="mb-12 scroll-mt-24">
            <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <Zap size={20} className="text-cyan-400" />
              The Solution
            </h3>
            <div className="text-gray-300 leading-relaxed">{solution}</div>
          </section>

          {/* The Results */}
          <section id="results" className="mb-12 scroll-mt-24">
            <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <TrendingUp size={20} className="text-emerald-400" />
              The Results
            </h3>
            <div className="text-gray-300 leading-relaxed mb-6">{results}</div>
            {chart && <div className="mt-6">{chart}</div>}
          </section>

          {/* The Outcome */}
          <section id="outcome" className="mb-12 scroll-mt-24">
            <h3 className="text-lg font-bold text-white mb-3">The Outcome</h3>
            <div className="text-gray-300 leading-relaxed">{outcome}</div>
          </section>

          {children}

          {/* Screenshot */}
          {screenshot && (
            <div className="border-t border-gray-800 pt-8 mt-8">
              <div className="relative w-full overflow-hidden rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.5)]">
                <div className="p-[2px] rounded-2xl bg-gradient-to-b from-white/20 via-white/10 to-white/5">
                  <div className="rounded-[14px] overflow-hidden bg-[#1a1f2e]">
                    <Image
                      src={screenshot.src}
                      alt={screenshot.alt}
                      width={1600}
                      height={900}
                      className="w-full h-auto object-contain"
                      priority={false}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
