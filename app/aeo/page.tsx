import { Metadata } from 'next';
import Link from 'next/link';
import { absoluteUrl } from '@/lib/site';
import { AeoPageShell } from '@/components/aeo/AeoPageShell';
import {
  combineSchemas,
  generateArticleSchema,
  generateFAQSchema,
  generateOrganizationSchema,
} from '@/lib/pseo/schema';
import { generatePersonSchema, SITE_AUTHOR } from '@/lib/author';

export const metadata: Metadata = {
  title: 'Answer Engine Optimization (AEO): How to Win AI Overviews | Anthroly',
  description:
    'Answer Engine Optimization (AEO) is how brands get cited in Google AI Overviews and AI assistants. Learn the checklist, structure, and strategy Anthroly uses.',
  keywords: [
    'answer engine optimization',
    'AEO',
    'AI Overviews',
    'AI SEO',
    'get cited in AI Overviews',
  ],
  alternates: { canonical: absoluteUrl('/aeo') },
  openGraph: {
    title: 'Answer Engine Optimization (AEO) | Anthroly',
    description: 'How to structure content so Google AI Overviews and answer engines cite your brand.',
    url: absoluteUrl('/aeo'),
    type: 'article',
    images: [{ url: absoluteUrl('/logo.png'), alt: 'Anthroly AEO' }],
  },
};

const faqs = [
  {
    question: 'What is Answer Engine Optimization (AEO)?',
    answer:
      'AEO is the practice of structuring content so AI systems—Google AI Overviews, ChatGPT, Perplexity, Claude—can extract, trust, and cite your brand as a direct answer source.',
  },
  {
    question: 'How is AEO different from SEO?',
    answer:
      'SEO optimizes for rankings and clicks in classic search results. AEO optimizes for citation and answer inclusion in AI-generated summaries, often with inverted-pyramid answers, clear entities, and schema.',
  },
  {
    question: 'Does AEO replace SEO?',
    answer:
      'No. Strong technical SEO, topical authority, and links still matter. AEO extends SEO so you also win zero-click and AI-mediated discovery.',
  },
];

export default function AeoHubPage() {
  const article = generateArticleSchema(
    'Answer Engine Optimization (AEO): How to Win AI Overviews',
    'A practical guide to Answer Engine Optimization for Google AI Overviews and AI assistants.',
    '/aeo',
    '2026-08-04',
    '2026-08-04'
  ) as Record<string, unknown>;
  article.author = {
    '@type': 'Person',
    name: SITE_AUTHOR.name,
    jobTitle: SITE_AUTHOR.jobTitle,
    url: SITE_AUTHOR.url,
  };

  const jsonLd = combineSchemas(
    article,
    generateFAQSchema(faqs),
    generateOrganizationSchema(),
    generatePersonSchema()
  );

  return (
    <AeoPageShell
      h1="Answer Engine Optimization (AEO)"
      directAnswer="Answer Engine Optimization (AEO) is the practice of making your content easy for AI systems to extract, trust, and cite as a direct answer—especially in Google AI Overviews and assistants like ChatGPT and Perplexity. The most effective way to win citations is to lead with a clear 40–60 word answer, prove expertise, and structure facts for machines."
      jsonLd={jsonLd}
    >
      <div className="space-y-10 text-gray-300 leading-relaxed">
        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            What is Answer Engine Optimization?
          </h2>
          <p>
            Search is shifting from ten blue links to synthesized answers. AEO focuses on{' '}
            <strong className="text-white">sourceability</strong>: whether an AI can lift a specific
            fact or paragraph from your site and attribute it to your brand. That requires answer-first
            copy, entity clarity, schema, and information gain—not keyword stuffing.
          </p>
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            What signals help you get cited?
          </h2>
          <ul className="space-y-3 list-disc pl-5">
            <li>Direct answers in the first 40–60 words of a section</li>
            <li>Question-style headings that match query fan-out</li>
            <li>Lists, tables, and FAQ schema machines can parse</li>
            <li>Brand entity strength (mentions, sameAs, consistent Organization data)</li>
            <li>Original data, case studies, and first-hand experience (information gain)</li>
            <li>Clean crawl access for Googlebot and AI crawlers (see /llms.txt)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            AEO checklist for your brand
          </h2>
          <ol className="space-y-3 list-decimal pl-5">
            <li>Does the intro directly answer the main query?</li>
            <li>Are there bullets or data tables AI can lift?</li>
            <li>Does the page show expertise (named author, methods, proof)?</li>
            <li>Is schema valid (FAQ, HowTo, Organization, Article)?</li>
            <li>Are related sub-questions covered on one cohesive page or cluster?</li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Explore the AEO cluster
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Link
              href="/aeo/how-to-get-cited-in-ai-overviews"
              className="p-5 rounded-xl border border-gray-800 bg-gray-900/50 hover:border-emerald-500/40 transition-colors"
            >
              <h3 className="font-semibold text-white mb-2">How to get cited in AI Overviews</h3>
              <p className="text-sm text-gray-400">Step-by-step HowTo for citation-ready pages.</p>
            </Link>
            <Link
              href="/aeo/aeo-vs-seo-vs-geo"
              className="p-5 rounded-xl border border-gray-800 bg-gray-900/50 hover:border-emerald-500/40 transition-colors"
            >
              <h3 className="font-semibold text-white mb-2">AEO vs SEO vs GEO</h3>
              <p className="text-sm text-gray-400">Comparison table for overlapping search disciplines.</p>
            </Link>
            <Link
              href="/reports/ai-visibility-benchmark"
              className="p-5 rounded-xl border border-gray-800 bg-gray-900/50 hover:border-emerald-500/40 transition-colors"
            >
              <h3 className="font-semibold text-white mb-2">AI Visibility Benchmark</h3>
              <p className="text-sm text-gray-400">Original benchmark framing from Anthroly customer results.</p>
            </Link>
            <Link
              href="/glossary/answer-engine-optimization"
              className="p-5 rounded-xl border border-gray-800 bg-gray-900/50 hover:border-emerald-500/40 transition-colors"
            >
              <h3 className="font-semibold text-white mb-2">AEO glossary term</h3>
              <p className="text-sm text-gray-400">Definition and examples in the SEO glossary.</p>
            </Link>
          </div>
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Frequently asked questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.question} className="border border-gray-800 rounded-xl p-5">
                <h3 className="font-semibold text-white mb-2">{faq.question}</h3>
                <p>{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AeoPageShell>
  );
}
