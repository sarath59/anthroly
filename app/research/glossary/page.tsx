import type { Metadata } from 'next';
import Link from 'next/link';
import { GLOSSARY } from '@/lib/resources/glossary';
import { PageHead, ResourceNav, linkLabel } from '@/components/resources/PageHead';
import { absoluteUrl, SITE_URL } from '@/lib/site';
import { combineSchemas, generateBreadcrumbSchema } from '@/lib/schema';

export const dynamic = 'force-static';

const TITLE = 'Glossary: RL Environments, RLVR, Reward Hacking & Data Labeling';
const DESC = `Direct definitions of ${GLOSSARY.length} post-training terms: RL environments, RLVR, RLHF, reward hacking, rubric rewards, verifiers, preference data, and inter-annotator agreement, with primary sources.`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: absoluteUrl('/research/glossary') },
  openGraph: { type: 'website', url: absoluteUrl('/research/glossary'), title: TITLE, description: DESC, siteName: 'Anthroly' },
};

export default function GlossaryPage() {
  const terms = [...GLOSSARY].sort((x, y) => x.term.localeCompare(y.term));
  const setId = absoluteUrl('/research/glossary') + '#termset';
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    '@id': setId,
    name: 'Anthroly Post-Training Glossary',
    url: absoluteUrl('/research/glossary'),
    publisher: { '@id': `${SITE_URL}/#organization` },
    hasDefinedTerm: terms.map((t) => ({
      '@type': 'DefinedTerm',
      '@id': absoluteUrl(`/research/glossary#${t.slug}`),
      name: t.term,
      description: t.definition,
      url: absoluteUrl(`/research/glossary#${t.slug}`),
      inDefinedTermSet: setId,
    })),
  };

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: combineSchemas(
            schema,
            generateBreadcrumbSchema([
              { name: 'Home', url: '/' },
              { name: 'Glossary', url: '/research/glossary' },
            ])
          ),
        }}
      />
      <PageHead eyebrow={`${terms.length} terms`} title="Post-training glossary" lede={DESC} />
      <div className="page-x border-t border-rule">
        <div className="mx-auto max-w-3xl py-16">
          <nav aria-label="Terms index" className="flex flex-wrap gap-x-4 gap-y-2 text-[14px]">
            {terms.map((t) => (
              <a key={t.slug} href={`#${t.slug}`} className="text-ink-muted hover:text-ink">
                {t.term.split(' (')[0]}
              </a>
            ))}
          </nav>
          <dl className="mt-12 divide-y divide-rule">
            {terms.map((t) => (
              <div key={t.slug} id={t.slug} className="scroll-mt-28 py-8">
                <dt>
                  <h2 className="font-serif text-[1.9rem] leading-tight">
                    <a href={`#${t.slug}`}>What is {t.term}?</a>
                  </h2>
                </dt>
                <dd className="mt-3 text-[17px] leading-[1.7] text-ink">
                  <p>{t.definition}</p>
                  {(t.related?.length || t.source) && (
                    <ul className="mt-3 space-y-1 text-[14px] text-ink-muted">
                      {t.source && (
                        <li>
                          Source:{' '}
                          <a href={t.source.url} rel="noopener" className="underline underline-offset-4">
                            {t.source.label}
                          </a>
                        </li>
                      )}
                      {t.related?.map((r) => (
                        <li key={r}>
                          Related:{' '}
                          <Link href={r} className="underline underline-offset-4">
                            {linkLabel(r)}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </dd>
              </div>
            ))}
          </dl>
          <ResourceNav />
        </div>
      </div>
    </article>
  );
}
