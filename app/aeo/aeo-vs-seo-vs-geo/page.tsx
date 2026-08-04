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
  title: 'AEO vs SEO vs GEO: What’s the Difference? | Anthroly',
  description:
    'Compare Answer Engine Optimization (AEO), traditional SEO, and Generative Engine Optimization (GEO)—goals, tactics, and when to use each.',
  alternates: { canonical: absoluteUrl('/aeo/aeo-vs-seo-vs-geo') },
  openGraph: {
    title: 'AEO vs SEO vs GEO',
    description: 'Side-by-side comparison of search optimization disciplines.',
    url: absoluteUrl('/aeo/aeo-vs-seo-vs-geo'),
    images: [{ url: absoluteUrl('/logo.png'), alt: 'Anthroly' }],
  },
};

const faqs = [
  {
    question: 'Should I choose AEO or SEO?',
    answer:
      'Do both. SEO builds crawlable, authoritative pages; AEO makes those pages citation-ready for AI answers. GEO focuses specifically on generative engines and LLM retrieval patterns.',
  },
  {
    question: 'Is GEO the same as AEO?',
    answer:
      'They overlap. GEO emphasizes generative engines and LLM citations; AEO is the broader discipline of optimizing for answer surfaces including Google AI Overviews. Many teams use the terms together.',
  },
];

export default function AeoVsSeoVsGeoPage() {
  const article = generateArticleSchema(
    'AEO vs SEO vs GEO: What’s the Difference?',
    'Side-by-side comparison of Answer Engine Optimization, SEO, and Generative Engine Optimization.',
    '/aeo/aeo-vs-seo-vs-geo',
    '2026-08-04'
  ) as Record<string, unknown>;
  article.author = {
    '@type': 'Person',
    name: SITE_AUTHOR.name,
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
      h1="AEO vs SEO vs GEO"
      directAnswer="SEO ranks pages in classic search results; AEO optimizes content so AI answer engines can cite you; GEO focuses on generative engines and LLM retrieval. The most effective strategy combines all three: technical SEO foundations, answer-first AEO structure, and GEO-aware content for ChatGPT-style systems."
      jsonLd={jsonLd}
    >
      <div className="space-y-10 text-gray-300 leading-relaxed">
        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            How do AEO, SEO, and GEO compare?
          </h2>
          <div className="overflow-x-auto rounded-xl border border-gray-800">
            <table className="w-full text-left text-sm">
              <caption className="px-4 py-2 text-left text-gray-400 border-b border-gray-800 bg-gray-900/80">
                Comparison of search optimization disciplines
              </caption>
              <thead className="bg-gray-900 text-white">
                <tr>
                  <th scope="col" className="px-4 py-3">Dimension</th>
                  <th scope="col" className="px-4 py-3">SEO</th>
                  <th scope="col" className="px-4 py-3">AEO</th>
                  <th scope="col" className="px-4 py-3">GEO</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Primary goal', 'Rank & earn clicks', 'Get cited in AI answers', 'Appear in generative engines'],
                  ['Success metric', 'Rankings, organic traffic', 'Citations, AI referrals', 'LLM mentions & share of answers'],
                  ['Content style', 'Comprehensive pages', 'Answer-first + fan-out', 'Retrievable, entity-rich chunks'],
                  ['Technical focus', 'Crawl, index, Core Web Vitals', 'Schema, extractability', 'llms.txt, clean structure for LLMs'],
                  ['Authority signals', 'Links, E-E-A-T', 'Brand mentions + cite-worthy facts', 'Primary-source data & consensus'],
                ].map((row) => (
                  <tr key={row[0]} className="border-t border-gray-800 odd:bg-black/40">
                    {row.map((cell, i) => (
                      <td key={i} className={`px-4 py-3 align-top ${i === 0 ? 'font-medium text-white' : ''}`}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            When should you prioritize each?
          </h2>
          <ul className="space-y-3 list-disc pl-5">
            <li>
              <strong className="text-white">SEO first</strong> if the site has crawl/index errors or thin foundations.
            </li>
            <li>
              <strong className="text-white">AEO next</strong> when rankings exist but AI Overviews omit your brand.
            </li>
            <li>
              <strong className="text-white">GEO emphasis</strong> when buyers research in ChatGPT/Perplexity as much as Google.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Related guides</h2>
          <ul className="space-y-2">
            <li>
              <Link href="/aeo" className="text-emerald-400 hover:underline">AEO hub</Link>
            </li>
            <li>
              <Link href="/glossary/generative-engine-optimization-geo" className="text-emerald-400 hover:underline">
                GEO glossary
              </Link>
            </li>
            <li>
              <Link href="/glossary/ai-seo" className="text-emerald-400 hover:underline">
                AI SEO glossary
              </Link>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">FAQ</h2>
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
