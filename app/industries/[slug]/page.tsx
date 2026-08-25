import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { industries } from '@/lib/pseo/data/industries';
import { uniqueSeoLocations } from '@/lib/pseo/indexable';
import { absoluteUrl, BOOK_CALL_URL, PRIMARY_CTA_LABEL } from '@/lib/site';
import { readParams } from '@/lib/next-params';
import { ApacCitySpokeGrid } from '@/components/pseo/ApacCitySpokeGrid';
import { getApacCitySpokes } from '@/lib/pseo/apac-spokes';
import { citationGuideForIndustry } from '@/lib/guides/citations-cluster';

interface PageProps {
  params: { slug: string };
}

export const revalidate = 86400;

export async function generateStaticParams() {
  return industries.map((industry) => ({
    slug: industry.slug,
  }));
}

export async function generateMetadata({ params: rawParams }: PageProps): Promise<Metadata> {
  const params = await readParams(rawParams);
  const industry = industries.find(i => i.slug === params.slug);
  if (!industry) return { title: 'Not Found' };
  
  return {
    title: `${industry.name} SEO | AI-Powered ${industry.name} Marketing | Anthroly`,
    description: `AI SEO for ${industry.name.toLowerCase()} companies. Industry-specific pages, founder authority, and AI-search citation work — start with the $216 diagnostic.`,
    keywords: industry.keywords.join(', '),
    openGraph: {
      title: `${industry.name} SEO | Anthroly`,
      description: `AI-powered SEO for ${industry.name.toLowerCase()} companies.`,
      url: absoluteUrl(`/industries/${industry.slug}`),
      type: 'website',
    },
    alternates: {
      canonical: absoluteUrl(`/industries/${industry.slug}`),
    },
  };
}

export default async function IndustryPage({ params: rawParams }: PageProps) {
  const params = await readParams(rawParams);
  const industry = industries.find(i => i.slug === params.slug);
  
  if (!industry) {
    notFound();
  }

  // After notFound(), industry is defined (narrow for language servers that miss never-return typing)
  const data = industry!;
  const citationGuide = citationGuideForIndustry(data.slug);
  
  const apacCities = new Set(getApacCitySpokes().map((city) => city.slug));
  const otherLocations = uniqueSeoLocations()
    .filter((location) => !apacCities.has(location.slug))
    .slice(0, 12);
  
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <Link href="/industries" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-6">
              ← Back to Industries
            </Link>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              AI SEO for{' '}
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 text-transparent bg-clip-text">
                {data.name}
              </span>
            </h1>
            <p className="text-xl text-zinc-400 mb-8">
              {data.description}
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={BOOK_CALL_URL}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold hover:from-purple-500 hover:to-blue-500 transition-all shadow-lg shadow-purple-500/25"
              >
                {PRIMARY_CTA_LABEL}
              </a>
              {citationGuide && (
                <Link
                  href={citationGuide.href}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/20 text-white font-semibold hover:border-emerald-400/50"
                >
                  {citationGuide.title}
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* Pain Points */}
      <section className="py-16 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8">{data.name} SEO Challenges</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {data.painPoints.map((painPoint, index) => (
              <div key={index} className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-red-400 text-sm">!</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-zinc-100 mb-2">{painPoint}</h3>
                    <p className="text-zinc-400 text-sm">
                      A common challenge for {data.name.toLowerCase()} companies that our team addresses with hands-on SEO and content.
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {citationGuide && (
        <section className="py-12 border-t border-zinc-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              href={citationGuide.href}
              className="block p-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 hover:border-emerald-400/50"
            >
              <p className="text-sm font-semibold uppercase tracking-wider text-emerald-400 mb-2">
                Niche AI citations
              </p>
              <h2 className="text-2xl font-bold text-white mb-2">{citationGuide.title}</h2>
              <p className="text-zinc-400">
                Original AEO brief for this niche — extractable answers, tables, and YMYL-safe structure.
                Not another programmatic city page.
              </p>
            </Link>
          </div>
        </section>
      )}
      
      {/* SEO Needs */}
      <section className="py-16 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8">What {data.name} Companies Need</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.seoNeeds.map((need, index) => (
              <div key={index} className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl">
                <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center mb-4">
                  <span className="text-purple-400 text-lg">✓</span>
                </div>
                <h3 className="font-semibold text-zinc-100">{need}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <ApacCitySpokeGrid
        heading={`${data.name} SEO in APAC cities`}
        description={`HTML spokes into /industries/${data.slug}/[city] for the 21 priority APAC markets.`}
        hrefFor={(citySlug) => `/industries/${data.slug}/${citySlug}`}
        accent="purple"
      />

      {otherLocations.length > 0 && (
      <section className="py-16 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">{data.name} SEO in other cities</h2>
          <p className="text-zinc-400 mb-8">
            Additional {data.name.toLowerCase()} location pages beyond the APAC crawl set.
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {otherLocations.map((location) => (
              <Link
                key={location.slug}
                href={`/industries/${data.slug}/${location.slug}`}
                className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-lg hover:border-purple-500/50 transition-all text-center"
              >
                <div className="font-medium text-zinc-100">{location.city}</div>
                <div className="text-sm text-zinc-500">{location.country}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      )}
      
      {/* CTA */}
      <section className="py-16 border-t border-zinc-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready for {data.name} AI search visibility?</h2>
          <p className="text-zinc-400 mb-8">
            Start with the $216 Founder Growth Diagnostic — credited 100% toward the sprint if you start within 7 days.
          </p>
          <Link
            href="/#pricing"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold hover:from-purple-500 hover:to-blue-500 transition-all shadow-lg shadow-purple-500/25"
          >
            {PRIMARY_CTA_LABEL}
          </Link>
        </div>
      </section>
    </div>
  );
}
