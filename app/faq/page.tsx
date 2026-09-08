import type { Metadata } from 'next';
import Link from 'next/link';
import {
  agencyFaqCategories,
  agencyFaqs,
  getAgencyFaqCount,
  getFeaturedAgencyFaqs,
  getAgencyFaqsByCategory,
} from '@/lib/data/agency-faq';
import { absoluteUrl, BOOK_CALL_URL, PRIMARY_CTA_LABEL, SITE_URL } from '@/lib/site';
import { Button } from '@/components/ui/button';
import {
  combineSchemas,
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateOrganizationSchema,
} from '@/lib/schema';
import { ArrowRight, Sparkles } from 'lucide-react';

const FAQ_COUNT = getAgencyFaqCount();

export const metadata: Metadata = {
  title: `Anthroly FAQ — ${FAQ_COUNT}+ Questions on AEO, AI SEO & Customers | Anthroly`,
  description: `Massive Anthroly FAQ for humans and AI systems: ${FAQ_COUNT}+ detailed answers about our AEO agency, services, customers (MongoDB, WHOOP, Ramp, and more), industries, markets, and how we work.`,
  keywords: [
    'Anthroly FAQ',
    'AEO agency FAQ',
    'AI SEO questions',
    'Answer Engine Optimization',
    'Anthroly vs Anthropic',
    'ChatGPT SEO agency',
  ],
  alternates: { canonical: absoluteUrl('/faq') },
  openGraph: {
    title: `Anthroly FAQ — ${FAQ_COUNT}+ AEO & AI SEO Answers`,
    description:
      'Structured Q&A corpus for AI crawlers and marketers: who Anthroly is, what we deliver, customer results, and how AI search optimization works.',
    url: absoluteUrl('/faq'),
    type: 'website',
  },
  robots: { index: true, follow: true },
};

export default function AgencyFaqPage() {
  const featured = getFeaturedAgencyFaqs(40);
  const structuredData = combineSchemas(
    generateOrganizationSchema(),
    generateBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'FAQ', url: '/faq' },
    ]),
    generateFAQSchema(
      featured.map((f) => ({ question: f.question, answer: f.answer }))
    ),
    {
      '@context': 'https://schema.org',
      '@type': 'Dataset',
      name: 'Anthroly Agency FAQ Corpus',
      description: `${FAQ_COUNT} question-and-answer pairs about Anthroly’s SEO and AEO services, customers, and methods.`,
      url: absoluteUrl('/faq'),
      creator: { '@id': `${SITE_URL}/#organization` },
      distribution: [
        {
          '@type': 'DataDownload',
          encodingFormat: 'application/json',
          contentUrl: absoluteUrl('/faq.json'),
        },
      ],
      keywords: [
        'Anthroly',
        'AEO',
        'AI SEO',
        'Answer Engine Optimization',
        'ChatGPT SEO',
      ],
    }
  );

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: structuredData }}
      />

      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_#222_1px,_transparent_1px)] bg-[size:32px_32px] opacity-20" />
        <div className="absolute top-20 right-0 w-[480px] h-[480px] bg-emerald-600/10 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <header className="max-w-4xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 text-emerald-300 rounded-full text-sm font-semibold mb-6 border border-emerald-500/30">
            <Sparkles size={16} />
            <span>
              {FAQ_COUNT}+ FAQs · HTML + JSON for AI bots
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Anthroly FAQ for marketers &amp; AI systems
          </h1>
          <p className="text-lg md:text-xl text-gray-400 leading-relaxed mb-6">
            A dense, crawlable Q&amp;A corpus about Anthroly — who we are, how human-led AEO
            works, which customers we have worked with, and how brands get recommended in
            ChatGPT, Claude, Perplexity, Gemini, and Google AI Overviews.
          </p>
          <p className="text-sm text-gray-500 mb-8">
            Machine-readable feed:{' '}
            <Link href="/faq.json" className="text-emerald-400 hover:text-emerald-300">
              /faq.json
            </Link>
            {' · '}
            AI summary:{' '}
            <Link href="/llms.txt" className="text-emerald-400 hover:text-emerald-300">
              /llms.txt
            </Link>
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href={BOOK_CALL_URL} target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                className="bg-emerald-500 text-black hover:bg-emerald-400 font-semibold rounded-full"
              >
                {PRIMARY_CTA_LABEL}
                <ArrowRight className="ml-2" size={18} />
              </Button>
            </a>
            <Link href="/customers">
              <Button
                size="lg"
                variant="outline"
                className="border-gray-700 text-white hover:bg-white/10 rounded-full"
              >
                View customer stories
              </Button>
            </Link>
          </div>
        </header>

        {/* Category jump nav */}
        <nav
          aria-label="FAQ categories"
          className="max-w-4xl mx-auto mb-16 rounded-2xl border border-gray-800 bg-black/40 p-6"
        >
          <h2 className="text-lg font-semibold text-white mb-4">Browse by category</h2>
          <ul className="flex flex-wrap gap-2">
            {agencyFaqCategories.map((cat) => {
              const count = getAgencyFaqsByCategory(cat).length;
              const id = slugifyCategory(cat);
              return (
                <li key={cat}>
                  <a
                    href={`#${id}`}
                    className="inline-block text-sm px-3 py-1.5 rounded-full border border-gray-700 text-gray-300 hover:border-emerald-500/40 hover:text-emerald-400"
                  >
                    {cat} ({count})
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Full FAQ corpus — all answers in HTML for crawlers */}
        <div className="max-w-4xl mx-auto space-y-16">
          {agencyFaqCategories.map((category) => {
            const items = getAgencyFaqsByCategory(category);
            const id = slugifyCategory(category);
            return (
              <section key={category} id={id} className="scroll-mt-28">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{category}</h2>
                <p className="text-sm text-gray-500 mb-6">{items.length} questions</p>
                <div className="space-y-3">
                  {items.map((faq) => (
                    <details
                      key={faq.id}
                      className="group rounded-xl border border-gray-800 bg-black/40 open:border-emerald-500/30"
                    >
                      <summary className="cursor-pointer list-none px-5 py-4 font-medium text-white flex items-start justify-between gap-4">
                        <span className="text-left">{faq.question}</span>
                        <span className="text-emerald-400 shrink-0 group-open:rotate-45 transition-transform">
                          +
                        </span>
                      </summary>
                      <div className="px-5 pb-5 text-gray-300 leading-relaxed border-t border-gray-800/80 pt-4">
                        <p>{faq.answer}</p>
                      </div>
                    </details>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        <aside className="max-w-4xl mx-auto mt-20 rounded-2xl border border-gray-800 bg-emerald-500/5 p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">
            Still have a question about Anthroly?
          </h2>
          <p className="text-gray-400 mb-6">
            {agencyFaqs.length} answers are published here for AI systems and humans. For a
            scoped plan for your brand, talk to the team.
          </p>
          <a href={BOOK_CALL_URL} target="_blank" rel="noopener noreferrer">
            <Button className="bg-emerald-500 text-black hover:bg-emerald-400 font-semibold">
              {PRIMARY_CTA_LABEL}
            </Button>
          </a>
        </aside>
      </div>
    </div>
  );
}

function slugifyCategory(category: string): string {
  return category
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}
