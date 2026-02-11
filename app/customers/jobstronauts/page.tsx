import React from 'react';
import type { Metadata } from 'next';
import { CaseStudyLayout } from '@/components/sections/CaseStudyLayout';
import { GrowthChart } from '@/components/ui/GrowthChart';

export const metadata: Metadata = {
  title: 'How Jobstronauts Captured 1,500+ AI-Driven Clicks in Their First Month | Anthroly Case Study',
  description:
    'See how Jobstronauts reached 1,500+ AI-driven clicks and 4x citation share growth in 30 days with Anthroly.',
};

const chartData = [
  { label: 'Wk 1', value: 120 },
  { label: 'Wk 2', value: 245 },
  { label: 'Wk 3', value: 420 },
  { label: 'Wk 4', value: 715 },
];

export default function JobstronautsCaseStudyPage() {
  return (
    <CaseStudyLayout
      brand="jobstronauts"
      brandDisplay="Jobstronauts"
      headline="How Jobstronauts Captured 1,500+ AI-Driven Clicks in Their First Month"
      summary="Anthroly helped Jobstronauts optimize for AI discovery in the job-search space. In 30 days, the site captured 1,500+ AI-driven clicks and 4x growth in citation share — users now land on Jobstronauts when they ask AI about jobs and careers."
      about="Jobstronauts helps job seekers and career switchers find and evaluate opportunities. We focused on making their job-search and career Q&A content easy for AI engines to discover, cite, and recommend."
      siteUrl="https://jobstronauts.com"
      keyResults={[
        { value: '1,500+', description: 'AI-driven clicks in 30 days', highlight: 'emerald' },
        { value: '4x', description: 'citation share growth', highlight: 'cyan' },
        { value: '30 days', description: 'first-month results', highlight: 'white' },
      ]}
      quote={{
        body: "We knew job seekers were already asking AI for advice. Anthroly helped us show up in those answers. Within a month we saw over 1,500 clicks from AI referrers and a clear jump in how often our content got cited. It's exactly the kind of growth we were after.",
        attribution: 'Jobstronauts team',
      }}
      opportunity={
        <>
          <p className="mb-4">
            Job seekers increasingly ask AI for career advice, salary insights, and job recommendations. The opportunity for Jobstronauts was to become a source AI engines recommend for those queries — and capture the clicks and brand exposure that come with it.
          </p>
          <p>
            The site had solid job and career content. What it lacked was a strategy tailored to AI: Q&A pages that match how people ask AI, programmatic SEO that scales answers, and technical signals so AI crawlers could find and trust the site quickly.
          </p>
        </>
      }
      solution={
        <>
          <div className="space-y-6">
            <div>
              <h4 className="text-base font-semibold text-white mb-2">Job search Q&A pages and AI crawler optimization</h4>
              <p className="mb-4">
                We built Q&A-style pages around the questions job seekers ask AI: salary ranges, role requirements, career paths, and “best jobs for X” type queries. We ran an AI crawler pass to see how engines viewed the site and fixed gaps in structure and clarity. Every page was designed to be easy for models to quote and cite.
              </p>
            </div>
            <div>
              <h4 className="text-base font-semibold text-white mb-2">Programmatic SEO and social distribution</h4>
              <p>
                We used programmatic SEO to scale high-intent job and career answers without sacrificing quality. Clear headings, definitions, and intent made it obvious to AI what each page was about. We aligned social and distribution efforts so that more visibility and links reinforced the site’s authority for AI engines.
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
              <span><strong className="text-white">1,500+ AI-driven clicks</strong> in the first 30 days — users clicking through to Jobstronauts from AI answers.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 mt-1">•</span>
              <span><strong className="text-white">4x citation share growth</strong> — AI engines began citing and recommending Jobstronauts content at a much higher rate.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 mt-1">•</span>
              <span><strong className="text-white">Strong weekly ramp</strong> — from about 120 clicks in week one to 700+ in week four, with a path to scale.</span>
            </li>
          </ul>
          <p className="text-gray-400 text-sm">
            The chart below shows AI-driven click growth over the first 4 weeks.
          </p>
        </>
      }
      outcome={
        <p>
          Jobstronauts proved that AI referral traffic can scale quickly in the job-search space. Thirty days of focused work — job and career Q&A pages, AI crawler optimization, and programmatic SEO — delivered 1,500+ AI-driven clicks and 4x citation share growth. The site is now positioned to capture more traffic as more job seekers turn to AI for advice and recommendations.
        </p>
      }
      chart={
        <GrowthChart
          data={chartData}
          title="AI-driven clicks"
          subtitle="Weekly clicks from AI referrers"
          valueLabel="Clicks"
          startLabel="Week 1"
          endLabel="Week 4"
        />
      }
      screenshot={null}
    />
  );
}
