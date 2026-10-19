import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { getPostSummaries } from '@/lib/blog';
import { absoluteUrl } from '@/lib/site';
import { generateBreadcrumbSchema, combineSchemas } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Research Blog',
  description:
    'Research notes on data labeling, RL environments, reward design, and evaluation methodology from the Anthroly team.',
  alternates: { canonical: absoluteUrl('/blog') },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

export default function BlogIndex() {
  const posts = getPostSummaries();

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Anthroly Research Blog',
    url: absoluteUrl('/blog'),
    description: 'Research notes on data labeling, RL environments, reward design, and evaluation methodology.',
    blogPost: posts.map((p) => ({
      '@type': 'BlogPosting',
      headline: p.title,
      url: absoluteUrl(`/blog/${p.slug}`),
      datePublished: p.publishedAt,
      dateModified: p.updatedAt,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: combineSchemas(
            blogSchema,
            generateBreadcrumbSchema([
              { name: 'Home', url: '/' },
              { name: 'Research Blog', url: '/blog' },
            ])
          ),
        }}
      />

      <section className="grain pt-[68px]">
        <div className="page-x">
          <div className="flex items-center justify-between border-b border-rule py-4">
            <p className="eyebrow">Research Blog · {posts.length} posts</p>
          </div>
          <div className="grid gap-10 pb-20 pt-16 lg:grid-cols-12 lg:pb-28 lg:pt-24">
            <h1 className="font-serif text-display-xl lg:col-span-8">
              Notes on <em className="text-signal">data and RL.</em>
            </h1>
            <p className="self-end text-[19px] leading-[1.6] text-ink-muted lg:col-span-4">
              Research findings, evaluation methodology, and lessons from building RL environments
              and grading systems for frontier AI labs.
            </p>
          </div>
        </div>
      </section>

      <section className="page-x pb-32">
        {posts.length === 0 ? (
          <p className="py-12 text-ink-muted">No published posts yet.</p>
        ) : (
          <ul>
            {posts.map((p) => (
              <li key={p.slug} className="border-b border-rule last:border-b-0">
                <Link
                  href={`/blog/${p.slug}`}
                  className="group grid gap-3 py-8 md:grid-cols-[1fr_auto] md:items-baseline md:gap-10"
                >
                  <div>
                    <h2 className="font-serif text-[2.1rem] leading-[1.08] transition-colors group-hover:text-signal">
                      {p.title}
                    </h2>
                    <p className="mt-3 max-w-2xl text-[16px] leading-[1.6] text-ink-muted">
                      {p.description}
                    </p>
                    <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-faint">
                      {p.author.name}
                      {p.author.credentials && `, ${p.author.credentials}`} · {formatDate(p.publishedAt)}
                      {p.draft && ' · DRAFT'}
                    </p>
                  </div>
                  <span className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-faint">
                    {p.readingTime} min read
                    <ArrowUpRight
                      size={18}
                      className="text-ink transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
