import React from 'react';
import type { Metadata } from 'next';
import { CaseStudyLayout } from '@/components/sections/CaseStudyLayout';
import { GrowthChart } from '@/components/ui/GrowthChart';

export const metadata: Metadata = {
  title: 'How isthisaiorno.com Hit 3,000+ Monthly Visitors from AI Search | Anthroly Case Study',
  description:
    'See how isthisaiorno.com reached 3,200+ monthly visitors and 8x AI visibility growth in 6 weeks with Anthroly.',
};

const chartData = [
  { label: 'Wk 1', value: 180 },
  { label: 'Wk 2', value: 320 },
  { label: 'Wk 3', value: 520 },
  { label: 'Wk 4', value: 780 },
  { label: 'Wk 5', value: 1150 },
  { label: 'Wk 6', value: 1680 },
];

export default function IsThisAIOrNoCaseStudyPage() {
  return (
    <CaseStudyLayout
      brand="isthisaiorno"
      brandDisplay="isthisaiorno.com"
      headline="How isthisaiorno.com Hit 3,000+ Monthly Visitors from AI Search in 6 Weeks"
      summary="Anthroly helped isthisaiorno.com optimize for AI discovery. In six weeks, the site reached 3,200+ monthly visitors from AI search and 8x growth in AI visibility — users now find the site when they ask AI whether content is human or AI-generated."
      about="isthisaiorno.com helps people and brands understand when content is AI-generated. We focused on making the tool and its content easy for AI engines to discover, cite, and recommend when users ask related questions."
      siteUrl="https://isthisaiorno.com"
      keyResults={[
        { value: '3,200+', description: 'monthly visitors from AI search', highlight: 'emerald' },
        { value: '8x', description: 'AI visibility growth', highlight: 'cyan' },
        { value: '6 weeks', description: 'to reach scale', highlight: 'white' },
      ]}
      quote={{
        body: "We didn't want to guess what AI would surface — we wanted to be the answer. Anthroly helped us structure content and data so that when someone asks an AI 'is this AI or no?', our site shows up. The traffic numbers speak for themselves.",
        attribution: 'isthisaiorno.com team',
      }}
      opportunity={
        <>
          <p className="mb-4">
            Questions like “Is this written by AI?” or “How do I tell if content is AI-generated?” are increasingly common in AI chat. The opportunity for isthisaiorno.com was to become the go-to source AI engines recommend for those queries — and capture the referral traffic that follows.
          </p>
          <p>
            The site had a strong concept and early traction. The missing piece was a deliberate AI-optimization strategy: structured data, Q&A pages, and content that AI crawlers could easily discover and cite.
          </p>
        </>
      }
      solution={
        <>
          <div className="space-y-6">
            <div>
              <h4 className="text-base font-semibold text-white mb-2">AI-optimized content and structured data</h4>
              <p className="mb-4">
                We audited existing pages and added Q&A-style content that matches how people ask AI about AI-generated content. We implemented structured data so crawlers could understand the site’s purpose and key entities. Every update was designed to be citation-friendly — clear, factual, and easy for models to quote.
              </p>
            </div>
            <div>
              <h4 className="text-base font-semibold text-white mb-2">Q&A pages and backlink strategy</h4>
              <p>
                We built dedicated Q&A pages around high-intent questions and aligned them with real search and AI behavior. A light backlink strategy helped reinforce authority so AI engines could confidently surface the site. Technical tweaks ensured fast indexing and clear signals for AI crawlers.
              </p>
            </div>
          </div>
        </>
      }
      results={
        <>
          <ul className="space-y-3 mb-6">
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 mt-1">•</span>
              <span><strong className="text-white">3,200+ monthly visitors</strong> from AI search within 6 weeks — users arriving when they ask AI about detecting AI-generated content.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 mt-1">•</span>
              <span><strong className="text-white">8x AI visibility growth</strong> — the site went from minimal AI presence to a trusted source that models recommend regularly.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 mt-1">•</span>
              <span><strong className="text-white">Sustained weekly growth</strong> — traffic from AI referrers climbed from under 200/week to over 1,600/week by the end of the period.</span>
            </li>
          </ul>
          <p className="text-gray-400 text-sm">
            The chart below shows visitor growth from AI search over 6 weeks.
          </p>
        </>
      }
      outcome={
        <p>
          isthisaiorno.com is now a visible answer when users ask AI about AI-generated content. Six weeks of focused AI optimization — structured data, Q&A pages, and citation-ready content — delivered 3,200+ monthly visitors and 8x visibility growth. The site is set up to capture more referral traffic as AI usage grows and more people ask “is this AI or no?”
        </p>
      }
      chart={
        <GrowthChart
          data={chartData}
          title="Visitors from AI search"
          subtitle="Weekly visitors"
          valueLabel="Visitors"
          startLabel="Week 1"
          endLabel="Week 6"
        />
      }
      screenshot={null}
    />
  );
}
