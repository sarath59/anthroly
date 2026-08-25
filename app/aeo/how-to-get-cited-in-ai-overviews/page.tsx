import { Metadata } from 'next';
import Link from 'next/link';
import { absoluteUrl } from '@/lib/site';
import { AeoPageShell } from '@/components/aeo/AeoPageShell';
import {
  combineSchemas,
  generateFAQSchema,
  generateHowToSchema,
  generateOrganizationSchema,
} from '@/lib/pseo/schema';
import { generatePersonSchema, SITE_AUTHOR } from '@/lib/author';

export const metadata: Metadata = {
  title: 'How to Get Cited in Google AI Overviews | AEO Playbook | Anthroly',
  description:
    'Step-by-step Answer Engine Optimization playbook: answer-first content, schema, entity signals, and measurement to earn AI Overview citations.',
  alternates: { canonical: absoluteUrl('/aeo/how-to-get-cited-in-ai-overviews') },
  openGraph: {
    title: 'How to Get Cited in Google AI Overviews',
    description: 'A practical HowTo for AI Overview citations.',
    url: absoluteUrl('/aeo/how-to-get-cited-in-ai-overviews'),
    images: [{ url: absoluteUrl('/logo.png'), alt: 'Anthroly' }],
  },
};

const steps = [
  {
    name: 'Lead with a direct answer',
    text: 'Open every target page with a 40–60 word answer in the form: The most effective way to [X] is [Y] because [Z]. Put it above marketing fluff so models can extract it.',
  },
  {
    name: 'Map query fan-out with question headings',
    text: 'Cover What, How, Compare, and Risks/When in one page using H2s that sound like user questions. AI Overviews often synthesize multi-part intent.',
  },
  {
    name: 'Add machine-readable structure',
    text: 'Use bullets, HTML tables, and FAQ/HowTo schema. Prefer real tables over screenshots of tables so answers can be lifted cleanly.',
  },
  {
    name: 'Strengthen brand entity signals',
    text: 'Consistent Organization schema, sameAs profiles, named authors, and third-party mentions increase the chance AI systems treat you as a trusted source.',
  },
  {
    name: 'Publish information gain',
    text: 'Add original data, methods, or case results competitors cannot copy. Models prefer sources that add new facts, not Page-1 summaries.',
  },
  {
    name: 'Measure citations and iterate',
    text: 'Track AI Overview appearances, assistant mentions, and referral traffic. Refresh answer blocks when queries shift.',
  },
];

const faqs = [
  {
    question: 'How long does it take to get cited in AI Overviews?',
    answer:
      'Timelines vary by competition and crawl frequency. Many brands see citation movement within weeks after shipping answer-first pages and schema, but authority compounds over months.',
  },
  {
    question: 'Do I need backlinks for AEO?',
    answer:
      'Links and brand mentions still help entity trust. AEO is not link-only, but weak authority pages rarely become preferred citation sources.',
  },
];

export default function HowToGetCitedPage() {
  const jsonLd = combineSchemas(
    generateHowToSchema(
      'How to get cited in Google AI Overviews',
      'A practical Answer Engine Optimization process for earning AI Overview citations.',
      steps.map((s) => `${s.name}: ${s.text}`)
    ),
    {
      '@type': 'Article',
      headline: 'How to get cited in Google AI Overviews',
      author: {
        '@type': 'Person',
        name: SITE_AUTHOR.name,
        url: SITE_AUTHOR.url,
      },
      datePublished: '2026-08-04',
      dateModified: '2026-08-04',
      mainEntityOfPage: absoluteUrl('/aeo/how-to-get-cited-in-ai-overviews'),
    },
    generateFAQSchema(faqs),
    generateOrganizationSchema(),
    generatePersonSchema()
  );

  return (
    <AeoPageShell
      eyebrow="AEO HowTo"
      h1="How to get cited in Google AI Overviews"
      directAnswer="The most effective way to get cited in Google AI Overviews is to publish answer-first pages with clear entities, FAQ/HowTo schema, and unique facts—then earn brand mentions so AI systems treat you as a trustworthy source. Structure beats keyword stuffing."
      jsonLd={jsonLd}
    >
      <div className="space-y-10 text-gray-300 leading-relaxed">
        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            What are the steps?
          </h2>
          <ol className="space-y-6 list-decimal pl-5">
            {steps.map((step) => (
              <li key={step.name}>
                <h3 className="text-lg font-semibold text-white mb-1">{step.name}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            What should you avoid?
          </h2>
          <ul className="space-y-2 list-disc pl-5">
            <li>Thin combinatorial pages that restate the same template</li>
            <li>Answers buried below long brand stories</li>
            <li>Blocking AI crawlers you want discovery from</li>
            <li>Unsourced claims with no method or proof</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Niche playbooks</h2>
          <p className="mb-3">
            Structure is the same; the facts are not.{' '}
            <Link href="/guides/ai-citations" className="text-emerald-400 hover:underline">
              Founder AI citation cluster
            </Link>{' '}
            covers cybersecurity, legal, hotels, and AI startups without adding another pSEO matrix.
          </p>
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
