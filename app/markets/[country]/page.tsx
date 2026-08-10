import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  apacCountries,
  apacTopics,
  getApacCountry,
  getAllApacCountrySlugs,
} from '@/lib/pseo/data/apac-markets';
import { getApacCountryPage } from '@/lib/pseo/apac-generators';
import { generatePageStructuredData } from '@/lib/pseo';
import PSEOPageLayout from '@/components/pseo/PSEOPageLayout';
import { absoluteUrl } from '@/lib/site';

interface PageProps {
  params: { country: string };
}

export function generateStaticParams() {
  return getAllApacCountrySlugs().map((country) => ({ country }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const page = getApacCountryPage(params.country);
  if (!page) {
    return { title: 'Market Not Found | Anthroly' };
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

export default function ApacCountryPage({ params }: PageProps) {
  const country = getApacCountry(params.country);
  const page = getApacCountryPage(params.country);

  if (!country || !page) {
    notFound();
  }

  const structuredData = generatePageStructuredData(page);
  const services = apacTopics.filter((t) => t.kind === 'service');
  const industries = apacTopics.filter((t) => t.kind === 'industry');
  const engines = apacTopics.filter((t) => t.kind === 'engine');

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: structuredData }}
      />
      <PSEOPageLayout page={page} />

      {/* Crawlable spoke index — HTML links Googlebot can follow */}
      <section className="bg-black border-t border-gray-900 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-2">
              All {country.name} AEO & AI SEO playbooks
            </h2>
            <p className="text-gray-400 mb-8">
              Indexable topic pages for {country.name}. Each URL is unique, statically generated,
              and listed in sitemap.xml.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-emerald-400 font-semibold mb-3">Services</h3>
                <ul className="space-y-2">
                  {services.map((t) => (
                    <li key={t.slug}>
                      <Link
                        href={`/markets/${country.slug}/${t.slug}`}
                        className="text-gray-300 hover:text-white text-sm"
                      >
                        {t.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-emerald-400 font-semibold mb-3">Industries</h3>
                <ul className="space-y-2">
                  {industries.map((t) => (
                    <li key={t.slug}>
                      <Link
                        href={`/markets/${country.slug}/${t.slug}`}
                        className="text-gray-300 hover:text-white text-sm"
                      >
                        {t.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-emerald-400 font-semibold mb-3">AI engines</h3>
                <ul className="space-y-2">
                  {engines.map((t) => (
                    <li key={t.slug}>
                      <Link
                        href={`/markets/${country.slug}/${t.slug}`}
                        className="text-gray-300 hover:text-white text-sm"
                      >
                        {t.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-emerald-400 font-semibold mb-3">City pages</h3>
              <ul className="flex flex-wrap gap-3">
                {Array.from(new Set(country.cities.map((c) => c.slug))).map((slug) => {
                  const city = country.cities.find((c) => c.slug === slug)!;
                  return (
                    <li key={slug}>
                      <Link
                        href={`/ai-seo-agency/${slug}`}
                        className="text-sm px-3 py-1.5 rounded-full border border-gray-800 text-gray-300 hover:border-emerald-500/40 hover:text-emerald-400"
                      >
                        {city.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="mt-10 flex flex-wrap gap-4 text-sm">
              <Link href="/markets" className="text-gray-500 hover:text-emerald-400">
                ← All markets
              </Link>
              {apacCountries
                .filter((c) => c.slug !== country.slug)
                .map((c) => (
                  <Link
                    key={c.slug}
                    href={`/markets/${c.slug}`}
                    className="text-gray-500 hover:text-emerald-400"
                  >
                    {c.name}
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
