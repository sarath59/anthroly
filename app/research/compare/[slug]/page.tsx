import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { COMPARISONS } from '@/lib/resources/compare';
import { PageHead, ResourceNav, linkLabel } from '@/components/resources/PageHead';
import { absoluteUrl, SITE_URL } from '@/lib/site';
import { combineSchemas, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/schema';
import { authorPersonSchema, AUTHOR } from '@/lib/resources/author';

export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return COMPARISONS.map((c) => ({ slug: c.slug }));
}

const get = (slug: string) => COMPARISONS.find((c) => c.slug === slug);

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const c = get(params.slug);
  if (!c) return {};
  const url = absoluteUrl(`/research/compare/${c.slug}`);
  return {
    title: c.title,
    description: c.description,
    alternates: { canonical: url },
    openGraph: { type: 'article', url, title: c.title, description: c.description, siteName: 'Anthroly' },
  };
}

export default function ComparePage({ params }: { params: { slug: string } }) {
  const c = get(params.slug);
  if (!c) notFound();
  const url = absoluteUrl(`/research/compare/${c.slug}`);
  const article = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: c.title,
    description: c.description,
    url,
    mainEntityOfPage: url,
    author: authorPersonSchema(),
    publisher: { '@id': `${SITE_URL}/#organization` },
    datePublished: '2026-10-20',
    dateModified: '2026-10-20',
    citation: c.citations.map((x) => x.url),
  };

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: combineSchemas(
            article,
            generateFAQSchema(c.faq),
            generateBreadcrumbSchema([
              { name: 'Home', url: '/' },
              { name: 'Compare', url: '/research/compare' },
              { name: c.shortTitle, url: `/research/compare/${c.slug}` },
            ])
          ),
        }}
      />
      <PageHead back={{ href: '/research/compare', label: 'All comparisons' }} eyebrow={`${c.a} · ${c.b}`} title={c.title} />
      <div className="page-x border-t border-rule">
        <div className="mx-auto max-w-3xl py-16 text-[17px] leading-[1.7]">
          <section aria-labelledby="answer">
            <h2 id="answer" className="font-serif text-[2rem]">
              What is the difference between {c.a} and {c.b}?
            </h2>
            <p className="mt-4">{c.answer}</p>
            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint">
              By <Link href={AUTHOR.path} className="underline">{AUTHOR.name}</Link> · October 20, 2026
            </p>
          </section>

          <section className="mt-14">
            <h2 className="font-serif text-[2rem]">Comparison table</h2>
            <div className="mt-6 overflow-x-auto">
              <table className="w-full border-collapse text-left text-[15px]">
                <thead>
                  <tr className="border-b border-ink">
                    <th className="py-3 pr-4">Dimension</th>
                    <th className="py-3 pr-4">{c.a}</th>
                    <th className="py-3">{c.b}</th>
                  </tr>
                </thead>
                <tbody>
                  {c.rows.map((r) => (
                    <tr key={r.dimension} className="border-b border-rule align-top">
                      <th scope="row" className="py-3 pr-4 font-semibold">{r.dimension}</th>
                      <td className="py-3 pr-4">{r.a}</td>
                      <td className="py-3">{r.b}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="mt-14">
            <h2 className="font-serif text-[2rem]">When to use each</h2>
            <p className="mt-4"><strong>{c.a}:</strong> {c.whenA}</p>
            <p className="mt-3"><strong>{c.b}:</strong> {c.whenB}</p>
          </section>

          <section className="mt-14 border-t border-ink pt-10">
            <h2 className="font-serif text-[2rem]">Frequently asked questions</h2>
            <dl className="mt-6 divide-y divide-rule">
              {c.faq.map((f) => (
                <div key={f.question} className="py-5">
                  <dt className="font-semibold">{f.question}</dt>
                  <dd className="mt-2 text-ink-muted">{f.answer}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="mt-14">
            <h2 className="font-serif text-[2rem]">References</h2>
            <ol className="mt-4 list-decimal space-y-2 pl-6 text-[15px]">
              {c.citations.map((x) => (
                <li key={x.url}>
                  <a href={x.url} rel="noopener" className="underline underline-offset-4">{x.label}</a>
                </li>
              ))}
            </ol>
          </section>

          <section className="mt-14">
            <h2 className="font-serif text-[2rem]">Related</h2>
            <ul className="mt-4 space-y-2 text-[15px]">
              {c.related.map((r) => (
                <li key={r}><Link href={r} className="underline underline-offset-4">{linkLabel(r)}</Link></li>
              ))}
            </ul>
          </section>
          <ResourceNav />
        </div>
      </div>
    </article>
  );
}
