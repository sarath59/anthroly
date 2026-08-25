import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Globe2, MapPin, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { absoluteUrl, BOOK_CALL_URL, PRIMARY_CTA_LABEL } from '@/lib/site';
import {
  apacCountries,
  apacTopics,
  getAllApacMarketPaths,
} from '@/lib/pseo/data/apac-markets';
import {
  generateBreadcrumbSchema,
  generateItemListSchema,
  generateOrganizationSchema,
  combineSchemas,
} from '@/lib/pseo/schema';
import { ApacCitySpokeGrid } from '@/components/pseo/ApacCitySpokeGrid';

export const revalidate = 86400;

export const metadata: Metadata = {
  title: 'AI SEO & AEO Markets: Singapore, China, Australia, New Zealand | Anthroly',
  description:
    'Human-led AI SEO and Answer Engine Optimization for Singapore, China, Australia, and New Zealand. Get recommended in ChatGPT, Claude, Perplexity, and Google AI Overviews.',
  keywords: [
    'AI SEO Singapore',
    'AEO Australia',
    'ChatGPT SEO China',
    'AI visibility New Zealand',
    'answer engine optimization APAC',
  ],
  alternates: {
    canonical: absoluteUrl('/markets'),
  },
  openGraph: {
    title: 'APAC AI SEO & AEO Markets | Anthroly',
    description:
      'Priority markets: Singapore, China, Australia, and New Zealand. Country hubs and industry playbooks built to rank and get cited.',
    url: absoluteUrl('/markets'),
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function MarketsIndexPage() {
  const spokeCount = getAllApacMarketPaths().length;
  const structuredData = combineSchemas(
    generateOrganizationSchema(),
    generateBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Markets', url: '/markets' },
    ]),
    generateItemListSchema(
      'Anthroly APAC AI SEO & AEO Markets',
      apacCountries.map((c) => ({
        name: `AI SEO & AEO in ${c.name}`,
        url: `/markets/${c.slug}`,
        description: c.metaFocus,
      }))
    )
  );

  const services = apacTopics.filter((t) => t.kind === 'service');
  const industries = apacTopics.filter((t) => t.kind === 'industry');
  const engines = apacTopics.filter((t) => t.kind === 'engine');

  return (
    <div className="min-h-screen bg-black text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: structuredData }}
      />

      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_#111_1px,_transparent_1px)] bg-[size:32px_32px] opacity-40" />
          <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[120px]" />
          <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-cyan-600/10 rounded-full blur-[100px]" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-sm font-medium text-emerald-400 mb-6">
              <Globe2 size={16} />
              <span>Priority markets · Singapore · China · Australia · New Zealand</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              AI SEO & AEO for the markets where{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400">
                your next customers research
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-400 leading-relaxed mb-6 max-w-3xl mx-auto">
              Anthroly builds indexable, country-specific Answer Engine Optimization pages and
              programs for Singapore, China, Australia, and New Zealand—so businesses in these
              markets find you on Google and get recommended in ChatGPT, Claude, Perplexity, and
              Gemini.
            </p>

            <p className="text-sm text-gray-500 mb-8">
              {apacCountries.length} country hubs · {spokeCount} topic pages · city spokes across
              APAC — statically generated for crawl reliability
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <a href={BOOK_CALL_URL} target="_blank" rel="noopener noreferrer">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-black hover:from-emerald-400 hover:to-cyan-400 rounded-full font-semibold"
                >
                  {PRIMARY_CTA_LABEL}
                  <ArrowRight className="ml-2" size={18} />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 border-t border-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Priority countries</h2>
            <p className="text-gray-400 mb-10 max-w-3xl">
              Start with a country hub, then explore service, industry, and engine playbooks.
              Every page is unique, internally linked, and included in our XML sitemap.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {apacCountries.map((country) => (
                <Link
                  key={country.slug}
                  href={`/markets/${country.slug}`}
                  className="group block p-6 md:p-8 rounded-2xl border border-gray-800 bg-gray-950/60 hover:border-emerald-500/40 hover:bg-emerald-500/[0.03] transition-all"
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <p className="text-emerald-400 text-sm font-medium mb-1">
                        {country.shortName}
                      </p>
                      <h3 className="text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                        AI SEO & AEO in {country.name}
                      </h3>
                    </div>
                    <MapPin className="text-gray-600 group-hover:text-emerald-400 transition-colors" size={22} />
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed mb-5 line-clamp-3">
                    {country.marketOverview}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {country.stats.slice(0, 3).map((s) => (
                      <span
                        key={s.label}
                        className="text-xs px-2.5 py-1 rounded-full bg-white/5 text-gray-300 border border-white/10"
                      >
                        {s.value}
                      </span>
                    ))}
                  </div>
                  <span className="inline-flex items-center text-emerald-400 text-sm font-medium">
                    Open {country.name} hub
                    <ArrowRight className="ml-1.5" size={16} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 border-t border-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <Sparkles className="text-emerald-400" size={22} />
              <h2 className="text-2xl md:text-3xl font-bold">Browse by playbook type</h2>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Services</h3>
                <ul className="space-y-2">
                  {services.map((t) => (
                    <li key={t.slug}>
                      <Link
                        href={`/markets/singapore/${t.slug}`}
                        className="text-gray-400 hover:text-emerald-400 text-sm transition-colors"
                      >
                        {t.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Industries</h3>
                <ul className="space-y-2">
                  {industries.map((t) => (
                    <li key={t.slug}>
                      <Link
                        href={`/markets/australia/${t.slug}`}
                        className="text-gray-400 hover:text-emerald-400 text-sm transition-colors"
                      >
                        {t.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">AI engines</h3>
                <ul className="space-y-2">
                  {engines.map((t) => (
                    <li key={t.slug}>
                      <Link
                        href={`/markets/china/${t.slug}`}
                        className="text-gray-400 hover:text-emerald-400 text-sm transition-colors"
                      >
                        {t.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-12 p-6 rounded-2xl border border-gray-800 bg-gradient-to-br from-emerald-500/5 to-transparent">
              <h3 className="text-xl font-bold mb-2">Full crawlable index</h3>
              <p className="text-gray-400 text-sm mb-4">
                Every country × topic URL below is linked for Googlebot discovery (not sitemap-only
                orphans). Priority: Singapore, China, Australia, then New Zealand.
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                {apacCountries.map((country) => (
                  <div key={country.slug}>
                    <Link
                      href={`/markets/${country.slug}`}
                      className="font-semibold text-emerald-400 hover:text-emerald-300"
                    >
                      {country.name}
                    </Link>
                    <ul className="mt-2 space-y-1 max-h-64 overflow-y-auto pr-2">
                      {apacTopics.map((topic) => (
                        <li key={`${country.slug}-${topic.slug}`}>
                          <Link
                            href={`/markets/${country.slug}/${topic.slug}`}
                            className="text-gray-500 hover:text-gray-300"
                          >
                            {topic.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <ApacCitySpokeGrid
        heading="APAC city pages Googlebot should crawl first"
        description="21 priority city hubs, linked in HTML from this market index — not sitemap-only orphans."
        hrefFor={(citySlug) => `/ai-seo-agency/${citySlug}`}
      />
    </div>
  );
}
