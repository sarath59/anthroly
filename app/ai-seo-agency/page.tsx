import { Metadata } from 'next';
import Link from 'next/link';
import { seoLocations, apacCountries, APAC_CITY_SLUGS } from '@/lib/pseo';
import { Button } from '@/components/ui/button';
import { ArrowRight, MapPin, Globe } from 'lucide-react';
import { absoluteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'AI SEO Agency Locations | Singapore, China, Australia, NZ & Global | Anthroly',
  description: 'AI SEO and AEO services in Singapore, China, Australia, New Zealand, and 100+ cities worldwide. Local expertise plus answer engine optimization.',
  keywords: ['seo agency', 'ai seo agency', 'AI SEO Singapore', 'AEO Australia', 'SEO China', 'SEO New Zealand'],
  openGraph: {
    title: 'AI SEO Agency Locations | Anthroly',
    description: 'Priority APAC markets plus major cities worldwide.',
    url: absoluteUrl('/ai-seo-agency'),
    type: 'website',
  },
  alternates: {
    canonical: absoluteUrl('/ai-seo-agency'),
  },
};

export default function LocationsIndexPage() {
  const apacSet = new Set<string>(APAC_CITY_SLUGS);
  const usLocations = seoLocations.filter(l => l.country === 'United States');
  const apacCityLocations = seoLocations.filter(l => apacSet.has(l.slug));
  const internationalLocations = seoLocations.filter(
    l => l.country !== 'United States' && !apacSet.has(l.slug)
  );

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_#111_1px,_transparent_1px)] bg-[size:32px_32px] opacity-40"></div>
          <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[120px]"></div>
          <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px]"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-sm font-medium text-emerald-400 mb-6">
              <Globe size={16} />
              <span>{seoLocations.length}+ Markets Worldwide</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              AI SEO Agency in{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400">
                Your City
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-400 leading-relaxed mb-8 max-w-3xl mx-auto">
              Local market expertise combined with AI-powered execution. Whether you&apos;re in San Francisco 
              or Singapore, our platform optimizes for your specific market while building global authority.
            </p>

            <Link href="/#ai-crawler">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-black hover:from-emerald-400 hover:to-cyan-400 rounded-full font-semibold"
              >
                Get Local SEO Analysis
                <ArrowRight className="ml-2" size={18} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Priority APAC country hubs */}
      <section className="py-16 border-b border-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between gap-4 mb-8 flex-wrap">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                  <Globe className="text-emerald-400" size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Priority APAC Markets</h2>
                  <p className="text-gray-500">Singapore · China · Australia · New Zealand</p>
                </div>
              </div>
              <Link href="/markets" className="text-emerald-400 text-sm font-medium hover:text-emerald-300">
                View all market hubs →
              </Link>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              {apacCountries.map((country) => (
                <Link
                  key={country.slug}
                  href={`/markets/${country.slug}`}
                  className="group p-5 bg-emerald-500/5 border border-emerald-500/20 rounded-xl hover:border-emerald-500/40 transition-all"
                >
                  <h3 className="font-semibold text-white group-hover:text-emerald-400 transition-colors mb-1">
                    {country.name}
                  </h3>
                  <p className="text-sm text-gray-500">Country AEO hub</p>
                </Link>
              ))}
            </div>
            <h3 className="text-lg font-semibold text-white mb-4">APAC cities</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {apacCityLocations.map((location) => (
                <Link
                  key={location.id}
                  href={`/ai-seo-agency/${location.slug}`}
                  className="group p-4 bg-gray-900/50 border border-gray-800 rounded-xl hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all"
                >
                  <h3 className="font-semibold text-white group-hover:text-emerald-400 transition-colors">
                    {location.city}
                  </h3>
                  <p className="text-sm text-gray-500">{location.country}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* US Locations */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                <MapPin className="text-emerald-400" size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">United States</h2>
                <p className="text-gray-500">{usLocations.length} major markets</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {usLocations.map((location) => (
                <Link
                  key={location.id}
                  href={`/ai-seo-agency/${location.slug}`}
                  className="group p-4 bg-gray-900/50 border border-gray-800 rounded-xl hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all"
                >
                  <h3 className="font-semibold text-white group-hover:text-emerald-400 transition-colors">
                    {location.city}
                  </h3>
                  <p className="text-sm text-gray-500">{location.state}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* International Locations */}
      <section className="py-16 bg-gray-950/50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center">
                <Globe className="text-cyan-400" size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">International</h2>
                <p className="text-gray-500">{internationalLocations.length} global markets</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {internationalLocations.map((location) => (
                <Link
                  key={location.id}
                  href={`/ai-seo-agency/${location.slug}`}
                  className="group p-4 bg-gray-900/50 border border-gray-800 rounded-xl hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-all"
                >
                  <h3 className="font-semibold text-white group-hover:text-cyan-400 transition-colors">
                    {location.city}
                  </h3>
                  <p className="text-sm text-gray-500">{location.country}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Location Matters */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Local Expertise, Hands-On Execution
            </h2>
            <p className="text-gray-400">
              Our strategists map local markets—from search behavior to competitor landscapes—then your team ships the work with clear reporting.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="p-6 bg-gray-900/50 border border-gray-800 rounded-xl text-center">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <MapPin className="text-emerald-400" size={24} />
              </div>
              <h3 className="font-semibold text-white mb-2">Local Keywords</h3>
              <p className="text-sm text-gray-400">
                Target &quot;[service] in [city]&quot; searches that drive local business
              </p>
            </div>
            <div className="p-6 bg-gray-900/50 border border-gray-800 rounded-xl text-center">
              <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Globe className="text-cyan-400" size={24} />
              </div>
              <h3 className="font-semibold text-white mb-2">Global Authority</h3>
              <p className="text-sm text-gray-400">
                Build domain authority that helps you rank everywhere
              </p>
            </div>
            <div className="p-6 bg-gray-900/50 border border-gray-800 rounded-xl text-center">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <ArrowRight className="text-blue-400" size={24} />
              </div>
              <h3 className="font-semibold text-white mb-2">AI Visibility</h3>
              <p className="text-sm text-gray-400">
                Get recommended by AI assistants for local queries
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/10 via-cyan-600/10 to-blue-600/10"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Dominate Your Local Market?
            </h2>
            <p className="text-lg text-gray-400 mb-8">
              Get a free AI analysis showing your local search visibility and opportunities 
              in your specific market.
            </p>
            <Link href="/#ai-crawler">
              <Button 
                size="xl" 
                className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-black hover:from-emerald-400 hover:to-cyan-400 rounded-full font-bold shadow-[0_0_40px_-10px_rgba(16,185,129,0.6)]"
              >
                Get Your Free Local Analysis
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
