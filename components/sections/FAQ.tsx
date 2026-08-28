import React from 'react';
import Link from 'next/link';
import { HelpCircle } from 'lucide-react';
import {
  agencyFaqCategories,
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
 * Homepage FAQ (#faq).
 * Featured answers only — the full 1000+ corpus lives on /faq and /faq.json
 * so the homepage stays under Core Web Vitals budgets.
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
            <span>{count}+ answers on the FAQ hub</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
            Your Questions. Straight Answers.
          </h2>
          <p className="text-xl text-gray-400 mb-4">
            No fluff. What the two agents do, what $216 starts, and how $1,000 / $500 works.
          </p>
          <p className="text-sm text-gray-500">
            Prefer the full archive?{' '}
            <Link href="/faq" className="text-emerald-400 hover:text-emerald-300 font-medium">
              Open the FAQ hub
            </Link>
            {' · '}
            <Link href="/faq.json" className="text-emerald-400 hover:text-emerald-300 font-medium">
              JSON feed for AI bots
            </Link>
          </p>
        </div>

        <div className="max-w-3xl mx-auto mb-16">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-emerald-400 mb-4 text-center">
            Most asked
          </h3>
          <FAQAccordion faqs={featured} />
        </div>

        <nav
          aria-label="FAQ categories"
          className="max-w-4xl mx-auto mb-12 rounded-2xl border border-gray-800 bg-black/40 p-6"
        >
          <h3 className="text-lg font-semibold text-white mb-4">
            Browse all {count} FAQs by category
          </h3>
          <ul className="flex flex-wrap gap-2">
            {agencyFaqCategories.map((cat) => {
              const n = getAgencyFaqsByCategory(cat).length;
              const id = slugifyCategory(cat);
              return (
                <li key={cat}>
                  <Link
                    href={`/faq#faq-${id}`}
                    className="inline-block text-sm px-3 py-1.5 rounded-full border border-gray-700 text-gray-300 hover:border-emerald-500/40 hover:text-emerald-400"
                  >
                    {cat} ({n})
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="max-w-2xl mx-auto text-center">
          <p className="text-gray-400">
            Still have questions?{' '}
            <a
              href="mailto:sharatth@anthroly.com"
              className="text-emerald-400 font-semibold underline hover:no-underline"
            >
              Email us directly
            </a>
            . The complete {count}+ answer corpus is at{' '}
            <Link href="/faq" className="text-emerald-400 font-semibold hover:underline">
              /faq
            </Link>
            .
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
