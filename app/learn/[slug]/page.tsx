import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { ARTICLES, getArticle, relatedArticles } from '@/lib/learn/articles';
import { ArticleBody, extractHeadings } from '@/components/learn/ArticleBody';
import { absoluteUrl } from '@/lib/site';
import {
  combineSchemas,
  generateArticleSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
} from '@/lib/schema';

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const article = getArticle(params.slug);
  if (!article) return {};
  const url = absoluteUrl(`/learn/${article.slug}`);
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: url },
    openGraph: {
      title: article.title,
      description: article.description,
      url,
      type: 'article',
      publishedTime: article.published,
      modifiedTime: article.updated,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
    },
  };
}

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = getArticle(params.slug);
  if (!article) notFound();

  const headings = extractHeadings(article.body);
  const related = relatedArticles(article.slug);
  const path = `/learn/${article.slug}`;
  const schemas = [
    generateArticleSchema(article.title, article.description, path, article.published, article.updated),
    generateBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Learn', url: '/learn' },
      { name: article.shortTitle, url: path },
    ]),
    ...(article.faq?.length ? [generateFAQSchema(article.faq)] : []),
  ];

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: combineSchemas(...schemas) }} />

      <header className="grain pt-[68px]">
        <div className="page-x">
          <div className="flex items-center justify-between border-b border-rule py-4">
            <Link href="/learn" className="eyebrow flex items-center gap-2 transition-colors hover:text-ink">
              <ArrowLeft size={13} />
              Field notes
            </Link>
            <p className="eyebrow">{article.category}</p>
          </div>

          <div className="mx-auto max-w-4xl pb-16 pt-16 text-center lg:pb-20 lg:pt-24">
            <h1 className="font-serif text-display-lg text-balance">{article.title}</h1>
            <p className="mx-auto mt-8 max-w-2xl text-[20px] leading-[1.55] text-ink-muted text-pretty">
              {article.dek}
            </p>
            <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint">
              Anthroly · {formatDate(article.updated)} · {article.readMinutes} min read
            </p>
          </div>
        </div>
      </header>

      <div className="page-x border-t border-rule">
        <div className="grid gap-12 py-16 lg:grid-cols-12 lg:py-20">
          <aside className="hidden lg:col-span-3 lg:block">
            <nav className="sticky top-28" aria-label="On this page">
              <p className="eyebrow">On this page</p>
              <ol className="mt-5 space-y-3 border-l border-rule">
                {headings.map((h) => (
                  <li key={h.id}>
                    <a
                      href={`#${h.id}`}
                      className="-ml-px block border-l border-transparent pl-4 text-[14px] leading-snug text-ink-muted transition-colors hover:border-signal hover:text-ink"
                    >
                      {h.text}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          <div className="lg:col-span-7 lg:col-start-5">
            <ArticleBody body={article.body} />

            {article.faq?.length ? (
              <section className="mt-20 border-t border-ink pt-10">
                <h2 className="font-serif text-[2.1rem]">Quick answers</h2>
                <dl className="mt-8 divide-y divide-rule">
                  {article.faq.map((f) => (
                    <div key={f.question} className="py-6">
                      <dt className="font-semibold text-ink">{f.question}</dt>
                      <dd className="mt-2 text-[16px] leading-[1.7] text-ink-muted">{f.answer}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            ) : null}

            <div className="mt-20 rounded-[6px] bg-ink p-10 text-paper sm:p-12">
              <p className="eyebrow !text-paper/50">Anthroly</p>
              <p className="mt-5 font-serif text-[2.2rem] leading-[1.08]">
                We buy operating data from US companies and supply every major AI lab.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/contact" className="btn-paper">
                  Sell your data
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-paper/30 px-6 py-3.5 text-[15px] font-medium transition-colors hover:border-paper"
                >
                  Source data for your lab
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="border-t border-rule bg-paper-deep">
        <div className="page-x py-20">
          <p className="eyebrow">Keep reading</p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {related.map((a) => (
              <Link
                key={a.slug}
                href={`/learn/${a.slug}`}
                className="group flex flex-col rounded-[6px] border border-rule bg-paper p-8 transition-all duration-500 hover:-translate-y-1 hover:border-ink/30"
              >
                <span className="eyebrow">{a.category}</span>
                <h3 className="mt-8 font-serif text-[1.7rem] leading-[1.1]">{a.title}</h3>
                <span className="mt-auto flex items-center gap-2 pt-8 text-[14px] font-medium">
                  Read
                  <ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
