import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { getAllPosts, getPostBySlug } from '@/lib/blog';
import { absoluteUrl, SITE_URL } from '@/lib/site';
import { combineSchemas, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/schema';

export const dynamicParams = false;
export const dynamic = 'force-static';

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) return {};
  const url = absoluteUrl(`/blog/${post.slug}`);
  const image = post.ogImage ? absoluteUrl(post.ogImage) : absoluteUrl('/logo.png');

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    authors: [{ name: post.author.name }],
    alternates: { canonical: post.canonical ? absoluteUrl(post.canonical) : url },
    robots: post.draft ? { index: false, follow: false } : undefined,
    openGraph: {
      type: 'article',
      url,
      title: post.title,
      description: post.description,
      siteName: 'Anthroly',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author.name],
      tags: post.tags,
      images: [{ url: image, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [image],
    },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

function generateBlogPostingSchema(post: NonNullable<ReturnType<typeof getPostBySlug>>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': absoluteUrl(`/blog/${post.slug}`),
    headline: post.title,
    description: post.description,
    url: absoluteUrl(`/blog/${post.slug}`),
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      '@type': 'Person',
      name: post.author.name,
      ...(post.author.credentials ? { jobTitle: post.author.credentials } : {}),
    },
    publisher: { '@id': `${SITE_URL}/#organization` },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': absoluteUrl(`/blog/${post.slug}`),
    },
    keywords: post.tags.join(', '),
    wordCount: post.body.split(/\s+/).length,
    timeRequired: `PT${post.readingTime}M`,
  };
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const { html, toc } = post;

  const schemas = [
    generateBlogPostingSchema(post),
    generateBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Research Blog', url: '/blog' },
      { name: post.title, url: `/blog/${post.slug}` },
    ]),
    ...(post.faq?.length ? [generateFAQSchema(post.faq)] : []),
  ];

  return (
    <article>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: combineSchemas(...schemas) }} />

      <header className="grain pt-[68px]">
        <div className="page-x">
          <div className="flex items-center justify-between border-b border-rule py-4">
            <Link href="/blog" className="eyebrow flex items-center gap-2 transition-colors hover:text-ink">
              <ArrowLeft size={13} />
              Research Blog
            </Link>
            {post.tags.length > 0 && (
              <p className="eyebrow">{post.tags.slice(0, 2).join(' · ')}</p>
            )}
          </div>

          <div className="mx-auto max-w-4xl pb-16 pt-16 text-center lg:pb-20 lg:pt-24">
            <h1 className="font-serif text-display-lg text-balance">{post.title}</h1>
            <p className="mx-auto mt-8 max-w-2xl text-[20px] leading-[1.55] text-ink-muted text-pretty">
              {post.description}
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint">
              <span>
                {post.author.name}
                {post.author.credentials && `, ${post.author.credentials}`}
              </span>
              <span>·</span>
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
              {post.updatedAt !== post.publishedAt && (
                <>
                  <span>·</span>
                  <span>
                    Updated <time dateTime={post.updatedAt}>{formatDate(post.updatedAt)}</time>
                  </span>
                </>
              )}
              <span>·</span>
              <span>{post.readingTime} min read</span>
              {post.draft && (
                <>
                  <span>·</span>
                  <span className="text-signal">DRAFT</span>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="page-x border-t border-rule">
        <div className="grid gap-12 py-16 lg:grid-cols-12 lg:py-20">
          {toc.length > 2 && (
            <aside className="hidden lg:col-span-3 lg:block">
              <nav className="sticky top-28" aria-label="Table of contents">
                <p className="eyebrow">On this page</p>
                <ol className="mt-5 space-y-3 border-l border-rule">
                  {toc.map((h) => (
                    <li key={h.id}>
                      <a
                        href={`#${h.id}`}
                        className={`-ml-px block border-l border-transparent pl-4 text-[14px] leading-snug text-ink-muted transition-colors hover:border-signal hover:text-ink ${h.level === 3 ? 'pl-8' : ''}`}
                      >
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </aside>
          )}

          <div className={toc.length > 2 ? 'lg:col-span-7 lg:col-start-5' : 'lg:col-span-8 lg:col-start-3'}>
            <div
              className="prose-research"
              dangerouslySetInnerHTML={{ __html: html }}
            />

            {post.faq && post.faq.length > 0 && (
              <section className="mt-20 border-t border-ink pt-10">
                <h2 className="font-serif text-[2.1rem]">Frequently asked questions</h2>
                <dl className="mt-8 divide-y divide-rule">
                  {post.faq.map((f) => (
                    <div key={f.question} className="py-6">
                      <dt className="font-semibold text-ink">{f.question}</dt>
                      <dd className="mt-2 text-[16px] leading-[1.7] text-ink-muted">{f.answer}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            )}

            <div className="mt-20 rounded-[6px] bg-ink p-10 text-paper sm:p-12">
              <p className="eyebrow !text-paper/50">Anthroly</p>
              <p className="mt-5 font-serif text-[2.2rem] leading-[1.08]">
                We build RL environments and datasets for AI labs.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/contact" className="btn-paper">
                  Work with us
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/learn"
                  className="inline-flex items-center gap-2 rounded-full border border-paper/30 px-6 py-3.5 text-[15px] font-medium transition-colors hover:border-paper"
                >
                  Learn more
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
