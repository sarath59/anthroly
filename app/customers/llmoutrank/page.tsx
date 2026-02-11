import React from 'react';
import type { Metadata } from 'next';
import { CaseStudyLayout } from '@/components/sections/CaseStudyLayout';
import { GrowthChart } from '@/components/ui/GrowthChart';

export const metadata: Metadata = {
  title: 'How llmoutrank Grew AI Referral Traffic | Anthroly Case Study',
  description:
    'See how llmoutrank grew to 2,400+ AI referral visits and 5x AI citations in 2 months with Anthroly.',
};

const chartData = [
  { label: 'Wk 1', value: 52 },
  { label: 'Wk 2', value: 78 },
  { label: 'Wk 3', value: 118 },
  { label: 'Wk 4', value: 185 },
  { label: 'Wk 5', value: 282 },
  { label: 'Wk 6', value: 398 },
  { label: 'Wk 7', value: 512 },
  { label: 'Wk 8', value: 618 },
];

export default function LlmOutrankCaseStudyPage() {
  return (
    <CaseStudyLayout
      brand="llmoutrank"
      brandDisplay="llmoutrank"
      headline="How llmoutrank Grew AI Referral Traffic to Thousands of Visits in 2 Months"
      summary="Anthroly focused exclusively on AI discovery for llmoutrank. In two months, the site earned 2,400+ visits from AI referrers and 5x growth in AI citations — real users are now being driven to the site by AI answers."
      about="A brand we work with to dominate AI-driven search in its space. We didn't work on overall traffic here — only AI referral traffic. The goal was to make the site the kind of place AI engines recommend and cite."
      siteUrl="https://llmoutrank.com"
      keyResults={[
        { value: '2,400+', description: 'AI referral visits', highlight: 'emerald' },
        { value: '5x', description: 'growth in AI citations', highlight: 'cyan' },
        { value: '2 months', description: 'AI referral focus only', highlight: 'white' },
      ]}
      quote={{
        body: "We didn't chase generic SEO for llmoutrank — we built for AI discovery. The goal was simple: when someone asks an AI engine a relevant question, the engine can recommend and link to the site. Thousands of visits and real users from ChatGPT and Perplexity show it's working.",
        attribution: 'Anthroly team — AI visibility & referral traffic',
      }}
      opportunity={
        <>
          <p className="mb-4">
            More people than ever ask AI before they search. We focused on one thing for llmoutrank: making the site the kind of place AI engines actually recommend and cite. The opportunity was clear — own AI referral traffic in their space instead of chasing traditional SEO alone.
          </p>
          <p>
            Brands that show up in AI answers early will capture a growing share of referral traffic. llmoutrank had the content depth; what they needed was a strategy tuned for how AI crawlers discover, interpret, and surface sources.
          </p>
        </>
      }
      solution={
        <>
          <div className="space-y-6">
            <div>
              <h4 className="text-base font-semibold text-white mb-2">AI crawler analysis and citation-ready content</h4>
              <p className="mb-4">
                We ran an AI crawler pass to see how engines view the site and where the gaps were. Then we built content that directly answers the questions people — and AI — are already asking. We added Q&A-style pages that are easy for models to quote and cite. Every piece had human oversight; the goal was quotable, trustworthy answers.
              </p>
            </div>
            <div>
              <h4 className="text-base font-semibold text-white mb-2">Technical optimization and full-query alignment</h4>
              <p>
                We made the site structurally clear: clear headings, clear definitions, clear intent. So AI could confidently treat it as the source and send traffic. Baseline AI visibility first, then a content plan aligned to real search and AI behavior, then technical signals so crawlers could find and index everything fast. Once that foundation was in place, we kept publishing and refining.
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
              <span><strong className="text-white">2,400+ visits</strong> from AI referrers in two months — real users landing on llmoutrank because an AI answer sent them.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 mt-1">•</span>
              <span><strong className="text-white">5x growth</strong> in AI citations — ChatGPT, Perplexity, and others are now pointing users to the site at scale.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 mt-1">•</span>
              <span><strong className="text-white">Consistent weekly growth</strong> — from roughly 50 visits per week at the start to 600+ per week by the end of the two-month period.</span>
            </li>
          </ul>
          <p className="text-gray-400 text-sm">
            The chart below shows AI referral traffic growth over 8 weeks. No vanity metrics — just real referral data.
          </p>
        </>
      }
      outcome={
        <p>
          llmoutrank is now in the loop: the more AI sees the site as a reliable answer, the more it recommends it. Thousands of visits in two months prove the approach. We built for AI discovery first — citation-ready content, technical clarity, and Q&A pages that match how people (and models) ask questions. The result is measurable AI referral traffic and a foundation that compounds as more AI users get sent to the site.
        </p>
      }
      chart={
        <GrowthChart
          data={chartData}
          title="AI referral traffic"
          subtitle="Weekly visits from AI referrers"
          valueLabel="Visits"
          startLabel="Week 1"
          endLabel="Week 8"
        />
      }
      screenshot={{ src: '/testimonial.png', alt: "llmoutrank AI traffic — 2,400+ visits from AI referrers over 2 months" }}
    />
  );
}
