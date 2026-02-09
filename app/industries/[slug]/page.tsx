import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { industries } from '@/lib/pseo/data/industries';
import { seoLocations } from '@/lib/pseo/data/locations';

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return industries.map((industry) => ({
    slug: industry.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const industry = industries.find(i => i.slug === params.slug);
  if (!industry) return { title: 'Not Found' };
  
  return {
    title: `${industry.name} SEO | AI-Powered ${industry.name} Marketing | Anthroly`,
    description: `AI SEO for ${industry.name.toLowerCase()} companies. Get 30 blogs/month, 20-30 high-DR backlinks, and ${industry.name.toLowerCase()}-specific optimization.`,
    keywords: industry.keywords.join(', '),
    openGraph: {
      title: `${industry.name} SEO | Anthroly`,
      description: `AI-powered SEO for ${industry.name.toLowerCase()} companies.`,
      url: `https://anthroly.com/industries/${industry.slug}`,
      type: 'website',
    },
    alternates: {
      canonical: `https://anthroly.com/industries/${industry.slug}`,
    },
  };
}

export default function IndustryPage({ params }: PageProps) {
  const industry = industries.find(i => i.slug === params.slug);
  
  if (!industry) {
    notFound();
  }
  
  // Get featured locations for this industry
  const featuredLocations = seoLocations.slice(0, 12);
  
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
                {industry.name}
              </span>
            </h1>
            <p className="text-xl text-zinc-400 mb-8">
              {industry.description}
            </p>
            <Link
              href="/#ai-crawler"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold hover:from-purple-500 hover:to-blue-500 transition-all shadow-lg shadow-purple-500/25"
            >
              Get Your Free {industry.name} SEO Analysis
            </Link>
          </div>
        </div>
      </section>
      
      {/* Pain Points */}
      <section className="py-16 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8">{industry.name} SEO Challenges</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {industry.painPoints.map((painPoint, index) => (
              <div key={index} className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-red-400 text-sm">!</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-zinc-100 mb-2">{painPoint}</h3>
                    <p className="text-zinc-400 text-sm">
                      A common challenge for {industry.name.toLowerCase()} companies that our AI addresses through automated optimization.
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* SEO Needs */}
      <section className="py-16 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8">What {industry.name} Companies Need</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {industry.seoNeeds.map((need, index) => (
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
      
      {/* Locations Grid */}
      <section className="py-16 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">{industry.name} SEO by Location</h2>
          <p className="text-zinc-400 mb-8">
            Get location-specific {industry.name.toLowerCase()} SEO in {seoLocations.length}+ cities worldwide.
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {featuredLocations.map((location) => (
              <Link
                key={location.slug}
                href={`/industries/${industry.slug}/${location.slug}`}
                className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-lg hover:border-purple-500/50 transition-all text-center"
              >
                <div className="font-medium text-zinc-100">{location.city}</div>
                <div className="text-sm text-zinc-500">{location.country}</div>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <p className="text-zinc-400">+ {seoLocations.length - 12} more locations</p>
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-16 border-t border-zinc-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Dominate {industry.name} Search?</h2>
          <p className="text-zinc-400 mb-8">
            Get a free AI analysis showing your {industry.name.toLowerCase()} search visibility and opportunities.
          </p>
          <Link
            href="/#ai-crawler"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold hover:from-purple-500 hover:to-blue-500 transition-all shadow-lg shadow-purple-500/25"
          >
            Get Your Free Analysis
          </Link>
        </div>
      </section>
    </div>
  );
}
