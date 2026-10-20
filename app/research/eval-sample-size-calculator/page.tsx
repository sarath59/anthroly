import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHead, ResourceNav } from '@/components/resources/PageHead';
import { SampleSizeCalculator } from '@/components/resources/SampleSizeCalculator';
import { absoluteUrl, SITE_URL } from '@/lib/site';
import { combineSchemas, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/schema';

export const dynamic = 'force-static';

const TITLE = 'Eval Sample Size & Label Count Calculator';
const DESC = 'Free calculator for LLM evaluation sets: how many labeled items you need for a target margin of error, how many to detect a difference between two models, and the Wilson confidence interval for an observed score.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: absoluteUrl('/research/eval-sample-size-calculator') },
  openGraph: { type: 'website', url: absoluteUrl('/research/eval-sample-size-calculator'), title: TITLE, description: DESC, siteName: 'Anthroly' },
};

const FAQ = [
  { question: 'How many examples do I need in an LLM eval set?', answer: 'For a ±3 point margin of error at 95% confidence on a score near 70%, about 897 independent items: n = 1.96² × 0.7 × 0.3 / 0.03². Halving the margin roughly quadruples the items.' },
  { question: 'Why use the Wilson interval instead of p ± 1.96·SE?', answer: 'The normal (Wald) interval can extend below 0% or above 100% and undercovers when accuracy is near the extremes or n is small. The Wilson score interval keeps better coverage in those cases.' },
  { question: 'Do these formulas hold if eval items are clustered?', answer: 'No. If items share a passage or template, they are not independent and the effective sample size is smaller. Miller (2024) recommends clustered standard errors in that case.' },
];

export default function CalculatorPage() {
  const url = absoluteUrl('/research/eval-sample-size-calculator');
  const app = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: TITLE,
    url,
    description: DESC,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any (runs in the browser)',
    isAccessibleForFree: true,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    publisher: { '@id': `${SITE_URL}/#organization` },
  };
  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: combineSchemas(
            app,
            generateFAQSchema(FAQ),
            generateBreadcrumbSchema([
              { name: 'Home', url: '/' },
              { name: 'Tools', url: '/research/eval-sample-size-calculator' },
              { name: TITLE, url: '/research/eval-sample-size-calculator' },
            ])
          ),
        }}
      />
      <PageHead eyebrow="Free tool · runs in your browser" title={TITLE} lede={DESC} />
      <div className="page-x border-t border-rule">
        <div className="mx-auto max-w-3xl py-16 text-[17px] leading-[1.7]">
          <SampleSizeCalculator />

          <section className="mt-16 border-t border-ink pt-10">
            <h2 className="font-serif text-[2rem]">Frequently asked questions</h2>
            <dl className="mt-6 divide-y divide-rule">
              {FAQ.map((f) => (
                <div key={f.question} className="py-5">
                  <dt className="font-semibold">{f.question}</dt>
                  <dd className="mt-2 text-ink-muted">{f.answer}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="mt-14">
            <h2 className="font-serif text-[2rem]">Assumptions and references</h2>
            <p className="mt-4">
              Items are treated as independent Bernoulli trials (correct/incorrect). Nothing you enter leaves your browser. See also{' '}
              <Link href="/research/glossary#confidence-interval-for-accuracy" className="underline">confidence intervals for eval accuracy</Link> and{' '}
              <Link href="/learn/evaluation-datasets-contamination" className="underline">evaluation datasets and contamination</Link>.
            </p>
            <ol className="mt-4 list-decimal space-y-2 pl-6 text-[15px]">
              <li><a className="underline" rel="noopener" href="https://arxiv.org/abs/2411.00640">Miller, 2024. Adding Error Bars to Evals: A Statistical Approach to Language Model Evaluations (arXiv:2411.00640)</a></li>
              <li><a className="underline" rel="noopener" href="https://en.wikipedia.org/wiki/Binomial_proportion_confidence_interval">Binomial proportion confidence interval (Wilson score interval)</a></li>
              <li><a className="underline" rel="noopener" href="https://en.wikipedia.org/wiki/Sample_size_determination">Sample size determination</a></li>
            </ol>
          </section>
          <ResourceNav />
        </div>
      </div>
    </article>
  );
}
