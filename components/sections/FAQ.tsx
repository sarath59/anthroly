import React from 'react';
import Link from 'next/link';
import { HelpCircle } from 'lucide-react';
import {
  agencyFaqCategories,
  agencyFaqs,
  getAgencyFaqCount,
  getAgencyFaqsByCategory,
  getHomepageFeaturedFaqs,
} from '@/lib/data/agency-faq';
import { FAQAccordion } from './FAQAccordion';
import {
  combineSchemas,
  generateFAQSchema,
} from '@/lib/pseo/schema';

/**
 * Main site FAQ (#faq on homepage).
 * - Featured accordion for buyers
 * - Full 1000+ corpus in HTML for humans + AI crawlers
 */
export const FAQ = () => {
  const count = getAgencyFaqCount();
  const featured = getHomepageFeaturedFaqs(12);
  const structuredData = combineSchemas(
    generateFAQSchema(
      featured.map((f) => ({ question: f.question, answer: f.answer }))
    )
  );

  return (
    <section id="faq" className="py-24 md:py-32 bg-transparent relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: structuredData }}
      />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,_rgba(16,185,129,0.05)_0%,_transparent_50%)]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 text-gray-300 rounded-full text-sm font-semibold mb-6 border border-gray-700">
            <HelpCircle size={16} />
            <span>{count}+ answers · main Anthroly FAQ</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
            Your Questions. Straight Answers.
          </h2>
          <p className="text-xl text-gray-400 mb-4">
            No fluff, no jargon. Just the truth about what we do and how it works — including
            AEO, customers, industries, and AI search.
          </p>
          <p className="text-sm text-gray-500">
            Prefer a dedicated page?{' '}
            <Link href="/faq" className="text-emerald-400 hover:text-emerald-300 font-medium">
              Open the full FAQ hub
            </Link>
            {' · '}
            <Link href="/faq.json" className="text-emerald-400 hover:text-emerald-300 font-medium">
              JSON feed for AI bots
            </Link>
          </p>
        </div>

        {/* Featured conversion FAQs */}
        <div className="max-w-3xl mx-auto mb-20">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-emerald-400 mb-4 text-center">
            Most asked
          </h3>
          <FAQAccordion faqs={featured} />
        </div>

        {/* Category jump links */}
        <nav
          aria-label="All FAQ categories"
          className="max-w-4xl mx-auto mb-12 rounded-2xl border border-gray-800 bg-black/40 p-6"
        >
          <h3 className="text-lg font-semibold text-white mb-4">
            All {count} FAQs by category
          </h3>
          <ul className="flex flex-wrap gap-2">
            {agencyFaqCategories.map((cat) => {
              const n = getAgencyFaqsByCategory(cat).length;
              const id = slugifyCategory(cat);
              return (
                <li key={cat}>
                  <a
                    href={`#faq-${id}`}
                    className="inline-block text-sm px-3 py-1.5 rounded-full border border-gray-700 text-gray-300 hover:border-emerald-500/40 hover:text-emerald-400"
                  >
                    {cat} ({n})
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* FULL CORPUS — every question/answer in HTML for AI + SEO */}
        <div className="max-w-4xl mx-auto space-y-14">
          {agencyFaqCategories.map((category) => {
            const items = getAgencyFaqsByCategory(category);
            const id = slugifyCategory(category);
            return (
              <div key={category} id={`faq-${id}`} className="scroll-mt-28">
                <h3 className="text-2xl font-bold text-white mb-2">{category}</h3>
                <p className="text-sm text-gray-500 mb-5">{items.length} questions</p>
                <div className="space-y-3">
                  {items.map((faq) => (
                    <details
                      key={faq.id}
                      className="group rounded-xl border border-gray-800 bg-gray-900/60 open:border-emerald-500/30"
                    >
                      <summary className="cursor-pointer list-none px-5 py-4 font-medium text-white flex items-start justify-between gap-4">
                        <span className="text-left">{faq.question}</span>
                        <span className="text-emerald-400 shrink-0 group-open:rotate-45 transition-transform">
                          +
                        </span>
                      </summary>
                      <div className="px-5 pb-5 text-gray-400 leading-relaxed border-t border-gray-800/80 pt-4">
                        <p>{faq.answer}</p>
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 max-w-2xl mx-auto text-center">
          <p className="text-gray-400">
            Still have questions?{' '}
            <a
              href="mailto:sharatth@anthroly.com"
              className="text-emerald-400 font-semibold underline hover:no-underline"
            >
              Email us directly
            </a>{' '}
            and we will get back to you within 24 hours. Full archive also at{' '}
            <Link href="/faq" className="text-emerald-400 font-semibold hover:underline">
              /faq
            </Link>
            .
          </p>
          <p className="text-xs text-gray-600 mt-3">
            Showing all {agencyFaqs.length} Anthroly FAQ answers on this page.
          </p>
        </div>
      </div>
    </section>
  );
};

function slugifyCategory(category: string): string {
  return category
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}
