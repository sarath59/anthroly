import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  apacCountries,
  apacTopics,
  getApacCountry,
  getApacTopic,
  getAllApacMarketPaths,
} from '@/lib/pseo/data/apac-markets';
import { getApacTopicComboPage } from '@/lib/pseo/apac-generators';
import { generatePageStructuredData } from '@/lib/pseo';
import PSEOPageLayout from '@/components/pseo/PSEOPageLayout';
import { absoluteUrl } from '@/lib/site';

interface PageProps {
  params: { country: string; topic: string };
}

/** Pre-build every country × topic page at deploy time for reliable Google crawls */
export function generateStaticParams() {
  return getAllApacMarketPaths();
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const page = getApacTopicComboPage(params.country, params.topic);
  if (!page) {
    return { title: 'Page Not Found | Anthroly' };
  }

  return {
    title: page.seo.title,
    description: page.seo.metaDescription,
    keywords: [page.seo.primaryKeyword, ...page.seo.secondaryKeywords],
    alternates: {
      canonical: absoluteUrl(page.url),
    },
    openGraph: {
      title: page.seo.title,
      description: page.seo.metaDescription,
      url: absoluteUrl(page.url),
      type: 'website',
      siteName: 'Anthroly',
    },
    twitter: {
      card: 'summary_large_image',
      title: page.seo.title,
      description: page.seo.metaDescription,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function ApacTopicPage({ params }: PageProps) {
  const country = getApacCountry(params.country);
  const topic = getApacTopic(params.topic);
  const page = getApacTopicComboPage(params.country, params.topic);

  if (!country || !topic || !page) {
    notFound();
  }

  const structuredData = generatePageStructuredData(page);
  const related = apacTopics.filter((t) => t.slug !== topic.slug).slice(0, 12);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: structuredData }}
      />
      <PSEOPageLayout page={page} />

      <section className="bg-black border-t border-gray-900 py-14">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <nav aria-label="Related market pages" className="mb-8">
              <p className="text-sm text-gray-500 mb-3">
                <Link href="/markets" className="hover:text-emerald-400">
                  Markets
                </Link>
                {' / '}
                <Link href={`/markets/${country.slug}`} className="hover:text-emerald-400">
                  {country.name}
                </Link>
                {' / '}
                <span className="text-gray-300">{topic.name}</span>
              </p>
            </nav>

            <h2 className="text-xl font-bold text-white mb-4">
              More {country.name} playbooks
            </h2>
            <ul className="grid sm:grid-cols-2 gap-2 mb-10">
              {related.map((t) => (
                <li key={t.slug}>
                  <Link
                    href={`/markets/${country.slug}/${t.slug}`}
                    className="text-sm text-gray-400 hover:text-emerald-400"
                  >
                    {t.name} in {country.name}
                  </Link>
                </li>
              ))}
            </ul>

            <h2 className="text-xl font-bold text-white mb-4">
              Same playbook in other markets
            </h2>
            <ul className="flex flex-wrap gap-3">
              {apacCountries
                .filter((c) => c.slug !== country.slug)
                .map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/markets/${c.slug}/${topic.slug}`}
                      className="text-sm px-3 py-1.5 rounded-full border border-gray-800 text-gray-300 hover:border-emerald-500/40 hover:text-emerald-400"
                    >
                      {topic.name} · {c.name}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
