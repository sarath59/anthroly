import { Metadata } from 'next';
import Link from 'next/link';
import { absoluteUrl, BOOK_CALL_URL, PRIMARY_CTA_LABEL } from '@/lib/site';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, Building2, Target, Users, MapPin, FileText, Newspaper, Sparkles, Globe2 } from 'lucide-react';
import { seoGlossaryTerms, targetPersonas, seoLocations, blogPosts } from '@/lib/pseo';
import { industries } from '@/lib/pseo/data/industries';
import { useCases } from '@/lib/pseo/data/use-cases';

export const metadata: Metadata = {
  title: 'SEO Resources Hub | AI SEO Guides, Glossary & Industry Insights | Anthroly',
  description: 'Explore comprehensive SEO resources including our glossary of 100+ terms, industry-specific guides, use cases, and location-based insights for AI-powered SEO.',
  keywords: ['seo resources', 'seo guides', 'seo glossary', 'ai seo resources', 'seo learning center'],
  openGraph: {
    title: 'SEO Resources Hub | Anthroly',
    description: 'Comprehensive SEO resources including glossary, industry guides, use cases, and location insights.',
    url: absoluteUrl('/resources'),
    type: 'website',
  },
  alternates: {
    canonical: absoluteUrl('/resources'),
  },
};

const resourceCategories = [
  {
    title: 'Agency FAQ',
    description: '1000+ detailed Q&As about Anthroly, AEO, customers, and AI search',
    href: '/faq',
    icon: BookOpen,
    count: 1000,
    countLabel: 'answers',
    gradient: 'from-cyan-500 to-emerald-500',
    bgGlow: 'bg-cyan-600/10',
  },
  {
    title: 'APAC Markets',
    description: 'Singapore, China, Australia & New Zealand AI SEO / AEO hubs',
    href: '/markets',
    icon: Globe2,
    count: 100,
    countLabel: 'market pages',
    gradient: 'from-emerald-500 to-cyan-500',
    bgGlow: 'bg-emerald-600/10',
  },
  {
    title: 'Answer Engine Optimization',
    description: 'Claude, ChatGPT, Anthropic AEO hubs + 600+ topic×engine guides',
    href: '/aeo',
    icon: Sparkles,
    count: 600,
    countLabel: 'AEO pages',
    gradient: 'from-emerald-500 to-teal-500',
    bgGlow: 'bg-emerald-600/10',
  },
  {
    title: 'Blog',
    description: 'Expert insights on AI SEO, local search, and industry strategies',
    href: '/blog',
    icon: Newspaper,
    count: blogPosts.length,
    countLabel: 'articles',
    gradient: 'from-cyan-500 to-emerald-500',
    bgGlow: 'bg-cyan-600/10',
  },
  {
    title: 'SEO Glossary',
    description: 'Master 100+ SEO terms with clear definitions and practical examples',
    href: '/glossary',
    icon: BookOpen,
    count: seoGlossaryTerms.length,
    countLabel: 'terms',
    gradient: 'from-emerald-500 to-cyan-500',
    bgGlow: 'bg-emerald-600/10',
  },
  {
    title: 'Industries',
    description: 'Industry-specific SEO strategies for SaaS, eCommerce, healthcare, and more',
    href: '/industries',
    icon: Building2,
    count: industries.length,
    countLabel: 'industries',
    gradient: 'from-blue-500 to-purple-500',
    bgGlow: 'bg-blue-600/10',
  },
  {
    title: 'Use Cases',
    description: 'Explore SEO strategies for lead generation, brand awareness, and traffic growth',
    href: '/use-cases',
    icon: Target,
    count: useCases.length,
    countLabel: 'use cases',
    gradient: 'from-orange-500 to-pink-500',
    bgGlow: 'bg-orange-600/10',
  },
  {
    title: 'For Teams',
    description: 'Tailored SEO solutions for CTOs, marketers, founders, and agencies',
    href: '/for',
    icon: Users,
    count: targetPersonas.length,
    countLabel: 'personas',
    gradient: 'from-violet-500 to-fuchsia-500',
    bgGlow: 'bg-violet-600/10',
  },
  {
    title: 'Locations',
    description: 'Local SEO insights and strategies for 160+ cities worldwide',
    href: '/ai-seo-agency',
    icon: MapPin,
    count: seoLocations.length,
    countLabel: 'cities',
    gradient: 'from-rose-500 to-amber-500',
    bgGlow: 'bg-rose-600/10',
  },
];

export default function ResourcesPage() {
  // Get featured items from each category
  const featuredGlossaryTerms = seoGlossaryTerms.slice(0, 6);
  const featuredIndustries = industries.slice(0, 6);
  const featuredUseCases = useCases.slice(0, 6);
  const featuredLocations = seoLocations.slice(0, 8);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_#111_1px,_transparent_1px)] bg-[size:32px_32px] opacity-40"></div>
          <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[120px]"></div>
          <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-0 left-1/3 w-[300px] h-[300px] bg-purple-600/10 rounded-full blur-[80px]"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-sm font-medium text-emerald-400 mb-6">
              <FileText size={16} />
              <span>40,000+ Pages of SEO Knowledge</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400">
                SEO Resources Hub
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-400 leading-relaxed mb-8 max-w-3xl mx-auto">
              Your comprehensive guide to AI-powered SEO. Explore glossary terms, industry-specific strategies, 
              use cases, and local insights to accelerate your search visibility.
            </p>

            <Link href="/#ai-crawler">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-black hover:from-emerald-400 hover:to-cyan-400 rounded-full font-semibold"
              >
                Get Free AI SEO Analysis
                <ArrowRight className="ml-2" size={18} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Resource Categories Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {resourceCategories.map((category) => {
              const Icon = category.icon;
              return (
                <Link
                  key={category.title}
                  href={category.href}
                  className="group relative p-6 bg-gray-900/50 border border-gray-800 rounded-2xl hover:border-gray-700 transition-all duration-300 overflow-hidden"
                >
                  <div className={`absolute -top-20 -right-20 w-40 h-40 ${category.bgGlow} rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                  
                  <div className="relative z-10">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${category.gradient} p-0.5 mb-4`}>
                      <div className="w-full h-full bg-gray-900 rounded-xl flex items-center justify-center">
                        <Icon size={24} className="text-white" />
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                      {category.title}
                    </h3>
                    
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                      {category.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r ${category.gradient}`}>
                        {category.count} {category.countLabel}
                      </span>
                      <ArrowRight size={16} className="text-gray-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Glossary Terms */}
      <section className="py-16 bg-gray-950/50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                Popular SEO Terms
              </h2>
              <Link href="/glossary" className="text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-2">
                View all <ArrowRight size={16} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {featuredGlossaryTerms.map((term) => (
                <Link
                  key={term.id}
                  href={`/glossary/${term.slug}`}
                  className="p-4 bg-gray-900/50 border border-gray-800 rounded-xl hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all group"
                >
                  <h3 className="font-semibold text-white group-hover:text-emerald-400 transition-colors mb-2">
                    {term.term}
                  </h3>
                  <p className="text-sm text-gray-400 line-clamp-2">
                    {term.definition}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Industries */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                SEO by Industry
              </h2>
              <Link href="/industries" className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-2">
                View all <ArrowRight size={16} />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {featuredIndustries.map((industry) => (
                <Link
                  key={industry.slug}
                  href={`/industries/${industry.slug}`}
                  className="p-4 bg-gray-900/50 border border-gray-800 rounded-xl hover:border-blue-500/30 hover:bg-blue-500/5 transition-all group text-center"
                >
                  <h3 className="font-semibold text-white group-hover:text-blue-400 transition-colors text-sm">
                    {industry.name}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Use Cases */}
      <section className="py-16 bg-gray-950/50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                Popular Use Cases
              </h2>
              <Link href="/use-cases" className="text-orange-400 hover:text-orange-300 transition-colors flex items-center gap-2">
                View all <ArrowRight size={16} />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {featuredUseCases.map((useCase) => (
                <Link
                  key={useCase.slug}
                  href={`/use-cases/${useCase.slug}`}
                  className="p-4 bg-gray-900/50 border border-gray-800 rounded-xl hover:border-orange-500/30 hover:bg-orange-500/5 transition-all group text-center"
                >
                  <h3 className="font-semibold text-white group-hover:text-orange-400 transition-colors text-sm">
                    {useCase.name}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Locations */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                AI SEO by Location
              </h2>
              <Link href="/ai-seo-agency" className="text-rose-400 hover:text-rose-300 transition-colors flex items-center gap-2">
                View all <ArrowRight size={16} />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
              {featuredLocations.map((location) => (
                <Link
                  key={location.slug}
                  href={`/ai-seo-agency/${location.slug}`}
                  className="p-3 bg-gray-900/50 border border-gray-800 rounded-lg hover:border-rose-500/30 hover:bg-rose-500/5 transition-all group text-center"
                >
                  <span className="font-medium text-white group-hover:text-rose-400 transition-colors text-sm">
                    {location.city}
                  </span>
                </Link>
              ))}
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
              Ready to Put This Knowledge to Work?
            </h2>
            <p className="text-lg text-gray-400 mb-8">
              Let our team run execution. Get 15 blogs/month, 15–25 high-DR backlinks, 
              and continuous optimization—without becoming an SEO expert yourself.
            </p>
            <a href={BOOK_CALL_URL} target="_blank" rel="noopener noreferrer">
              <Button 
                size="xl" 
                className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-black hover:from-emerald-400 hover:to-cyan-400 rounded-full font-bold shadow-[0_0_40px_-10px_rgba(16,185,129,0.6)]"
              >
                {PRIMARY_CTA_LABEL}
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
