import type { Metadata } from 'next';
import Link from 'next/link';
import { COMPARISONS } from '@/lib/resources/compare';
import { PageHead, ResourceNav } from '@/components/resources/PageHead';
import { absoluteUrl } from '@/lib/site';
import { combineSchemas, generateBreadcrumbSchema } from '@/lib/schema';

export const dynamic = 'force-static';

const DESC = 'Side-by-side comparisons of post-training methods and data sources: RLVR vs RLHF, rubric rewards vs reward models, expert vs crowd annotation, synthetic vs human preference data, and process vs outcome rewards.';

export const metadata: Metadata = {
  title: 'Post-Training Method Comparisons',
  description: DESC,
  alternates: { canonical: absoluteUrl('/research/compare') },
};

export default function CompareIndex() {
  const list = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Post-training method comparisons',
    itemListElement: COMPARISONS.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: absoluteUrl(`/research/compare/${c.slug}`),
      name: c.title,
    })),
  };
  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: combineSchemas(list, generateBreadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Compare', url: '/research/compare' }])),
        }}
      />
      <PageHead eyebrow="Comparisons" title="Post-training method comparisons" lede={DESC} />
      <div className="page-x border-t border-rule">
        <div className="mx-auto max-w-3xl py-16">
          <ul className="divide-y divide-rule">
            {COMPARISONS.map((c) => (
              <li key={c.slug} className="py-8">
                <Link href={`/research/compare/${c.slug}`} className="group">
                  <h2 className="font-serif text-[2rem] leading-tight group-hover:text-signal">{c.title}</h2>
                  <p className="mt-3 text-[16px] leading-[1.7] text-ink-muted">{c.description}</p>
                </Link>
              </li>
            ))}
          </ul>
          <ResourceNav />
        </div>
      </div>
    </article>
  );
}
