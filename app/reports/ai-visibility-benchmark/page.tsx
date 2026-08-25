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
  title: 'AI Visibility Benchmark Report | Anthroly',
  description:
    'Anthroly AI Visibility Benchmark: citation lift and AI referral outcomes observed across customer programs, with methodology notes for AEO planning.',
  alternates: { canonical: absoluteUrl('/reports/ai-visibility-benchmark') },
  openGraph: {
    title: 'AI Visibility Benchmark | Anthroly',
    description: 'Benchmark signals for AI referral traffic and citation share.',
    url: absoluteUrl('/reports/ai-visibility-benchmark'),
    images: [{ url: absoluteUrl('/logo.png'), alt: 'Anthroly AI Visibility Benchmark' }],
  },
};

/** Aggregated from published Anthroly case studies — not a third-party panel survey */
const BENCHMARK_ROWS = [
  {
    brand: 'llmoutrank',
    window: '2 months',
    aiReferralVisits: '2,400+',
    citationLift: '5x',
    notes: 'AI referral visits and citation share vs program start',
  },
  {
    brand: 'isthisaiorno.com',
    window: '6 weeks',
    aiReferralVisits: '3,200+ monthly visitors',
    citationLift: '8x AI visibility',
    notes: 'Monthly visitors attributed to AI search surfaces',
  },
  {
    brand: 'Jobstronauts',
    window: '1 month',
    aiReferralVisits: '1,500+ AI-driven clicks',
    citationLift: '4x citation share',
    notes: 'First-month AI click and citation share change',
  },
];

const faqs = [
  {
    question: 'Is this a statistically representative industry survey?',
    answer:
      'No. This benchmark aggregates outcomes from Anthroly customer case studies. Treat it as directional information gain for AEO planning, not a census of all websites.',
  },
  {
    question: 'How was citation lift measured?',
    answer:
      'Citation lift compares tracked AI mention/citation share (and related AI referral traffic) after program start versus the baseline period documented in each case study.',
  },
];

export default function AiVisibilityBenchmarkPage() {
  const article = generateArticleSchema(
    'AI Visibility Benchmark Report',
    'Benchmark of AI referral and citation outcomes from Anthroly customer programs.',
    '/reports/ai-visibility-benchmark',
    '2026-08-04'
  ) as Record<string, unknown>;
  article.author = {
    '@type': 'Person',
    name: SITE_AUTHOR.name,
    url: SITE_AUTHOR.url,
  };

  const jsonLd = combineSchemas(
    article,
    {
      '@type': 'Dataset',
      name: 'Anthroly AI Visibility Benchmark',
      description:
        'Aggregated AI referral and citation outcomes from published Anthroly customer case studies.',
      creator: { '@type': 'Organization', name: 'Anthroly', url: absoluteUrl('/') },
      url: absoluteUrl('/reports/ai-visibility-benchmark'),
    },
    generateFAQSchema(faqs),
    generateOrganizationSchema(),
    generatePersonSchema()
  );

  return (
    <AeoPageShell
      eyebrow="Original data / report"
      h1="AI Visibility Benchmark"
      directAnswer="Across published Anthroly customer programs, brands saw multi-thousand AI referral visits and 4x–8x citation or AI-visibility lifts within 1–2 months. This benchmark aggregates those case results so marketers can set realistic AEO expectations—not a third-party panel survey."
      jsonLd={jsonLd}
    >
      <div className="space-y-10 text-gray-300 leading-relaxed">
        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            What does this benchmark measure?
          </h2>
          <p>
            We summarize AI referral traffic and citation-related lifts from Anthroly case studies
            (llmoutrank, isthisaiorno, Jobstronauts). Numbers below are taken from those published
            customer pages so other sites can cite a primary source with methodology notes.
          </p>
          <p className="mt-3 text-sm text-amber-200/90 border border-amber-500/30 bg-amber-500/5 rounded-xl p-4">
            Methodology note: This is an Anthroly customer-outcome benchmark, not an independent
            industry survey. Sample size is the three published case studies linked below.
          </p>
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            What results did customers see?
          </h2>
          <div className="overflow-x-auto rounded-xl border border-gray-800">
            <table className="w-full text-left text-sm">
              <caption className="px-4 py-2 text-left text-gray-400 border-b border-gray-800 bg-gray-900/80">
                Anthroly customer AI visibility outcomes (published case studies)
              </caption>
              <thead className="bg-gray-900 text-white">
                <tr>
                  <th scope="col" className="px-4 py-3">Brand</th>
                  <th scope="col" className="px-4 py-3">Window</th>
                  <th scope="col" className="px-4 py-3">AI referral / traffic</th>
                  <th scope="col" className="px-4 py-3">Citation / visibility lift</th>
                  <th scope="col" className="px-4 py-3">Notes</th>
                </tr>
              </thead>
              <tbody>
                {BENCHMARK_ROWS.map((row) => (
                  <tr key={row.brand} className="border-t border-gray-800 odd:bg-black/40">
                    <td className="px-4 py-3 font-medium text-white">{row.brand}</td>
                    <td className="px-4 py-3">{row.window}</td>
                    <td className="px-4 py-3">{row.aiReferralVisits}</td>
                    <td className="px-4 py-3">{row.citationLift}</td>
                    <td className="px-4 py-3">{row.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            What are the implications for AEO?
          </h2>
          <ul className="space-y-2 list-disc pl-5">
            <li>Citation and AI referral gains can appear within the first 30–60 days when execution is consistent.</li>
            <li>Programs that pair content, links, and AI visibility monitoring outperform one-off blog posts.</li>
            <li>Publishing primary outcomes (like this page) creates information gain other AIs can cite.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Source case studies</h2>
          <ul className="space-y-2">
            <li>
              <Link href="/guides/ai-citations/measuring-ai-mentions" className="text-emerald-400 hover:underline">
                How we measure AI mentions (prompt log)
              </Link>
            </li>
            <li>
              <Link href="/customers/llmoutrank" className="text-emerald-400 hover:underline">
                llmoutrank case study
              </Link>
            </li>
            <li>
              <Link href="/customers/isthisaiorno" className="text-emerald-400 hover:underline">
                isthisaiorno case study
              </Link>
            </li>
            <li>
              <Link href="/customers/jobstronauts" className="text-emerald-400 hover:underline">
                Jobstronauts case study
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
