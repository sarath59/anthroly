import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { ARTICLES } from '@/lib/learn/articles';
import { absoluteUrl } from '@/lib/site';
import { generateBreadcrumbSchema, combineSchemas } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Field notes on AI training data, data licensing and RL',
  description:
    'Plain-English guides to selling company data to AI labs, data licensing, RL environments, agent trajectories, RLHF, anonymization and evaluation data.',
  alternates: { canonical: absoluteUrl('/learn') },
};

const CATEGORIES = ['Selling data', 'Market', 'Training data', 'Safeguards'] as const;

export default function LearnIndex() {
  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Datary Labs field notes',
    itemListElement: ARTICLES.map((a, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: absoluteUrl(`/learn/${a.slug}`),
      name: a.title,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: combineSchemas(
            itemList,
            generateBreadcrumbSchema([
              { name: 'Home', url: '/' },
              { name: 'Learn', url: '/learn' },
            ])
          ),
        }}
      />

      <section className="grain pt-[68px]">
        <div className="page-x">
          <div className="flex items-center justify-between border-b border-rule py-4">
            <p className="eyebrow">Field notes · {ARTICLES.length} guides</p>
            <p className="eyebrow hidden sm:block">Updated October 2026</p>
          </div>
          <div className="grid gap-10 pb-20 pt-16 lg:grid-cols-12 lg:pb-28 lg:pt-24">
            <h1 className="font-serif text-display-xl lg:col-span-8">
              Plain answers about a <em className="text-signal">young market.</em>
            </h1>
            <p className="self-end text-[19px] leading-[1.6] text-ink-muted lg:col-span-4">
              What labs buy, what your record is worth, how licenses work, and what terms like RL
              environments and trajectory data actually mean. Written for operators, not just
              researchers.
            </p>
          </div>
        </div>
      </section>

      <section className="page-x pb-32">
        {CATEGORIES.map((category) => {
          const items = ARTICLES.filter((a) => a.category === category);
          if (!items.length) return null;
          return (
            <div key={category} className="grid gap-6 border-t border-ink py-12 lg:grid-cols-12">
              <h2 className="eyebrow lg:col-span-3 lg:pt-3">{category}</h2>
              <ul className="lg:col-span-9">
                {items.map((a) => (
                  <li key={a.slug} className="border-b border-rule last:border-b-0">
                    <Link
                      href={`/learn/${a.slug}`}
                      className="group grid gap-3 py-8 md:grid-cols-[1fr_auto] md:items-baseline md:gap-10"
                    >
                      <div>
                        <h3 className="font-serif text-[2.1rem] leading-[1.08] transition-colors group-hover:text-signal">
                          {a.title}
                        </h3>
                        <p className="mt-3 max-w-2xl text-[16px] leading-[1.6] text-ink-muted">{a.dek}</p>
                      </div>
                      <span className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-faint">
                        {a.readMinutes} min read
                        <ArrowUpRight
                          size={18}
                          className="text-ink transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </section>
    </>
  );
}
