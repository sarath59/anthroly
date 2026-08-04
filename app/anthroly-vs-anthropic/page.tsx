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
  title: 'Anthroly vs Anthropic: What’s the Difference? | Anthroly',
  description:
    'Anthroly is an AI agents and SEO company. Anthropic is the AI lab behind Claude. We are not affiliated—here’s how we differ and how Anthroly helps you get cited by Claude.',
  alternates: { canonical: absoluteUrl('/anthroly-vs-anthropic') },
  openGraph: {
    title: 'Anthroly vs Anthropic',
    description: 'Clear differences between Anthroly and Anthropic—and how to get cited by Claude.',
    url: absoluteUrl('/anthroly-vs-anthropic'),
    images: [{ url: absoluteUrl('/logo.png'), alt: 'Anthroly vs Anthropic' }],
  },
};

const faqs = [
  {
    question: 'Is Anthroly the same as Anthropic?',
    answer:
      'No. Anthroly builds AI agents and runs human-led SEO/AEO for brands. Anthropic is a separate AI research company that builds Claude. Anthroly is not owned by, partnered as, or affiliated with Anthropic.',
  },
  {
    question: 'Why do people confuse Anthroly and Anthropic?',
    answer:
      'The names sound similar. This page exists so searchers and AI systems can disambiguate quickly and attribute each brand correctly.',
  },
  {
    question: 'Can Anthroly help me show up in Claude / Anthropic AI answers?',
    answer:
      'Yes. That is a core AEO use case: we help brands become cite-worthy sources for Claude and other answer engines—without claiming to be Anthropic.',
  },
];

export default function AnthrolyVsAnthropicPage() {
  const article = generateArticleSchema(
    'Anthroly vs Anthropic: What’s the Difference?',
    'Disambiguation guide: Anthroly (AI agents + SEO) vs Anthropic (Claude).',
    '/anthroly-vs-anthropic',
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
      eyebrow="Brand disambiguation"
      h1="Anthroly vs Anthropic"
      directAnswer="Anthroly is an AI agents and human-led SEO company that helps brands get cited in Google and AI answers. Anthropic is a separate AI lab best known for Claude. We are not affiliated with Anthropic—if you need Claude SEO/AEO, Anthroly is the service provider; if you need Anthropic’s models, go to Anthropic."
      jsonLd={jsonLd}
    >
      <div className="space-y-10 text-gray-300 leading-relaxed">
        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            What is the difference between Anthroly and Anthropic?
          </h2>
          <div className="overflow-x-auto rounded-xl border border-gray-800">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-900 text-white">
                <tr>
                  <th className="px-4 py-3">Dimension</th>
                  <th className="px-4 py-3">Anthroly</th>
                  <th className="px-4 py-3">Anthropic</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['What they are', 'AI agents + SEO/AEO service', 'AI research lab / model provider'],
                  ['Best known for', 'Managed SEO, AI visibility, citations', 'Claude AI models'],
                  ['Who buys', 'Growth teams needing organic + AI demand', 'Builders using Claude / API'],
                  ['Website', 'anthroly.com', 'anthropic.com'],
                  ['Affiliation', 'Independent', 'Independent (not Anthroly)'],
                ].map((row) => (
                  <tr key={row[0]} className="border-t border-gray-800 odd:bg-black/40">
                    {row.map((cell, i) => (
                      <td key={i} className={`px-4 py-3 ${i === 0 ? 'font-medium text-white' : ''}`}>
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
            Looking for Anthropic or Claude?
          </h2>
          <p>
            For Anthropic’s products and Claude, visit their official properties. For help getting your
            brand <em>cited by</em> Claude, ChatGPT, Perplexity, and Google AI Overviews, stay here—that
            is Anthroly’s job.
          </p>
          <ul className="mt-4 space-y-2">
            <li>
              <Link href="/aeo/engine/claude" className="text-emerald-400 hover:underline">
                AEO for Claude
              </Link>
            </li>
            <li>
              <Link href="/aeo/engine/anthropic" className="text-emerald-400 hover:underline">
                AEO for Anthropic AI answers
              </Link>
            </li>
            <li>
              <Link href="/aeo/engine/chatgpt" className="text-emerald-400 hover:underline">
                AEO for ChatGPT
              </Link>
            </li>
            <li>
              <Link href="/aeo" className="text-emerald-400 hover:underline">
                Answer Engine Optimization hub
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
