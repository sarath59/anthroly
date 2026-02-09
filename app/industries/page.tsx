import { Metadata } from 'next';
import Link from 'next/link';
import { industries, industryCategories } from '@/lib/pseo/data/industries';

export const metadata: Metadata = {
  title: 'AI SEO by Industry | Industry-Specific SEO Solutions | Anthroly',
  description: 'AI-powered SEO solutions tailored for your industry. SaaS, E-commerce, Healthcare, Fintech, and 20+ industries with specialized SEO strategies.',
  keywords: 'industry seo, saas seo, ecommerce seo, healthcare seo, fintech seo, ai seo by industry',
  openGraph: {
    title: 'AI SEO by Industry | Anthroly',
    description: 'Industry-specific AI SEO solutions for 20+ verticals.',
    url: 'https://anthroly.com/industries',
    type: 'website',
  },
  alternates: {
    canonical: 'https://anthroly.com/industries',
  },
};

export default function IndustriesPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 text-sm text-purple-300 mb-6">
              20+ Industries Served
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              AI SEO for{' '}
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 text-transparent bg-clip-text">
                Your Industry
              </span>
            </h1>
            <p className="text-xl text-zinc-400 mb-8">
              Every industry has unique SEO challenges. Our AI-powered platform delivers 
              industry-specific strategies, content, and optimization tailored to your vertical.
            </p>
          </div>
        </div>
      </section>
      
      {/* Industries by Category */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {industryCategories.map((category) => (
            <div key={category.id} className="mb-16">
              <h2 className="text-2xl font-bold mb-8 text-zinc-100">{category.name}</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.industries.map((industryId) => {
                  const industry = industries.find(i => i.id === industryId);
                  if (!industry) return null;
                  
                  return (
                    <Link
                      key={industry.id}
                      href={`/industries/${industry.slug}`}
                      className="group p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl hover:border-purple-500/50 hover:bg-zinc-900/80 transition-all"
                    >
                      <h3 className="text-xl font-semibold mb-3 text-zinc-100 group-hover:text-purple-300 transition-colors">
                        {industry.name} SEO
                      </h3>
                      <p className="text-zinc-400 mb-4 text-sm">
                        {industry.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {industry.keywords.slice(0, 2).map((keyword) => (
                          <span
                            key={keyword}
                            className="text-xs px-2 py-1 bg-zinc-800/50 text-zinc-400 rounded-full"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* Stats */}
      <section className="py-16 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-purple-400 mb-2">20+</div>
              <div className="text-zinc-400">Industries Served</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-400 mb-2">1,420</div>
              <div className="text-zinc-400">Industry-Location Pages</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-400 mb-2">340%</div>
              <div className="text-zinc-400">Avg Traffic Growth</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-400 mb-2">$350</div>
              <div className="text-zinc-400">Starting Price</div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-16 border-t border-zinc-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Dominate Your Industry&apos;s Search Results?</h2>
          <p className="text-zinc-400 mb-8">
            Get a free AI analysis showing your industry search visibility and opportunities.
          </p>
          <Link
            href="/#ai-crawler"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold hover:from-purple-500 hover:to-blue-500 transition-all shadow-lg shadow-purple-500/25"
          >
            Get Your Free Industry Analysis
          </Link>
        </div>
      </section>
    </div>
  );
}
