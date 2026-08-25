import { Metadata } from 'next';
import Link from 'next/link';
import { AUTHOR_PATH, generatePersonSchema, SITE_AUTHOR } from '@/lib/author';
import { absoluteUrl, BOOK_CALL_URL, OFFER_ONE_LINER, PRIMARY_CTA_LABEL } from '@/lib/site';
import {
  combineSchemas,
  generateBreadcrumbSchema,
  generateOrganizationSchema,
} from '@/lib/pseo/schema';

export const revalidate = 86400;

export const metadata: Metadata = {
  title: 'Sarath Kavuru — Founder of Anthroly | AEO & AI Search',
  description:
    'Sarath Kavuru is the founder of Anthroly. He builds human-led SEO and Answer Engine Optimization programs so founders get cited in Google AI Overviews, ChatGPT, Perplexity, and Claude.',
  alternates: { canonical: absoluteUrl(AUTHOR_PATH) },
  openGraph: {
    title: 'Sarath Kavuru — Founder, Anthroly',
    description: SITE_AUTHOR.bio,
    url: absoluteUrl(AUTHOR_PATH),
    type: 'profile',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sarath Kavuru — Founder, Anthroly',
    description: SITE_AUTHOR.bio,
  },
};

const jsonLd = combineSchemas(
  generatePersonSchema(),
  generateOrganizationSchema(),
  generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Sarath Kavuru', url: AUTHOR_PATH },
  ]),
  {
    '@type': 'ProfilePage',
    name: `${SITE_AUTHOR.name} — ${SITE_AUTHOR.jobTitle}`,
    url: absoluteUrl(AUTHOR_PATH),
    mainEntity: {
      '@type': 'Person',
      name: SITE_AUTHOR.name,
      url: SITE_AUTHOR.url,
    },
    dateModified: '2026-08-25',
  }
);

export default function AuthorPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />

      <article className="container mx-auto px-4 pt-32 pb-20 max-w-3xl">
        <nav className="text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-emerald-400">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-400">Author</span>
        </nav>

        <p className="text-emerald-400 text-sm font-semibold uppercase tracking-wider mb-3">
          Author
        </p>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">{SITE_AUTHOR.name}</h1>
        <p className="text-lg text-gray-300 mb-8">{SITE_AUTHOR.jobTitle}</p>

        <div className="mb-10 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-5 md:p-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2">
            Key answer
          </p>
          <p className="text-base md:text-lg text-white leading-relaxed">
            {SITE_AUTHOR.bio} Programs start with a $216 Founder Growth Diagnostic, then a $1,500
            30-day sprint and $1,000/month execution. Humans do the work; machines help scale.
          </p>
        </div>

        <div className="space-y-8 text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-white mb-3">What Sarath works on</h2>
            <p>
              Anthroly is a human-led SEO and AEO company. The practice is built around one outcome:
              make a founder easier to discover, trust, and contact in the AI era. That means citation-ready
              pages for Google AI Overviews, ChatGPT, Perplexity, and Claude — plus founder interviews
              turned into authority content, and outreach that turns visibility into conversations.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">How to reach Sarath</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Email:{' '}
                <a className="text-emerald-400 hover:underline" href={`mailto:${SITE_AUTHOR.email}`}>
                  {SITE_AUTHOR.email}
                </a>
              </li>
              <li>
                Company:{' '}
                <Link className="text-emerald-400 hover:underline" href="/">
                  anthroly.com
                </Link>
              </li>
              <li>
                AEO education:{' '}
                <Link className="text-emerald-400 hover:underline" href="/aeo">
                  Answer Engine Optimization hub
                </Link>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">Start a diagnostic</h2>
            <p className="mb-6">{OFFER_ONE_LINER}</p>
            <a
              href={BOOK_CALL_URL}
              className="inline-flex items-center rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-black font-semibold px-6 py-3"
            >
              {PRIMARY_CTA_LABEL}
            </a>
          </section>
        </div>
      </article>
    </div>
  );
}
