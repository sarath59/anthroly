import { Metadata } from 'next';
import Link from 'next/link';
import { seoIntegrations, integrationCategories } from '@/lib/pseo';
import { BOOK_CALL_URL, PRIMARY_CTA_LABEL } from '@/lib/site';
import { Button } from '@/components/ui/button';
import { ArrowRight, Puzzle, Zap, Link as LinkIcon } from 'lucide-react';

export const metadata: Metadata = {
  title: 'SEO Integrations | Connect Your Tech Stack | Anthroly',
  description: 'Connect Anthroly with WordPress, Shopify, HubSpot, Webflow, and more. Automate your SEO workflows with powerful integrations.',
  keywords: ['seo integrations', 'wordpress seo', 'shopify seo', 'hubspot seo', 'seo automation'],
  openGraph: {
    title: 'SEO Integrations | Anthroly',
    description: 'Connect your tech stack with AI-powered SEO automation.',
    url: 'https://anthroly.com/integrations',
    type: 'website',
  },
  alternates: {
    canonical: 'https://anthroly.com/integrations',
  },
};

const categoryIcons: Record<string, React.ReactNode> = {
  cms: <Puzzle className="text-emerald-400" size={24} />,
  ecommerce: <Zap className="text-cyan-400" size={24} />,
  'marketing-automation': <LinkIcon className="text-blue-400" size={24} />,
  google: <Puzzle className="text-red-400" size={24} />,
  communication: <Zap className="text-purple-400" size={24} />,
  automation: <LinkIcon className="text-orange-400" size={24} />,
  'project-management': <Puzzle className="text-pink-400" size={24} />,
  framework: <Zap className="text-indigo-400" size={24} />,
  'headless-cms': <LinkIcon className="text-teal-400" size={24} />,
  'seo-tools': <Puzzle className="text-yellow-400" size={24} />,
};

export default function IntegrationsIndexPage() {
  // Group integrations by category
  const integrationsByCategory = integrationCategories.map(category => ({
    ...category,
    integrations: seoIntegrations.filter(i => i.category === category.id),
  })).filter(cat => cat.integrations.length > 0);

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
              <Puzzle size={16} />
              <span>{seoIntegrations.length}+ Integrations</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Connect Your{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400">
                Tech Stack
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-400 leading-relaxed mb-8 max-w-3xl mx-auto">
              Anthroly integrates seamlessly with your existing tools. From CMS platforms to analytics, 
              automate your SEO workflows without disrupting what&apos;s already working.
            </p>

            <Link href="/#ai-crawler">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-black hover:from-emerald-400 hover:to-cyan-400 rounded-full font-semibold"
              >
                See How It Works
                <ArrowRight className="ml-2" size={18} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Integrations by Category */}
      {integrationsByCategory.map((category, index) => (
        <section 
          key={category.id} 
          className={`py-16 ${index % 2 === 1 ? 'bg-gray-950/50' : ''}`}
        >
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center">
                  {categoryIcons[category.id] || <Puzzle className="text-emerald-400" size={24} />}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{category.name}</h2>
                  <p className="text-gray-500">{category.integrations.length} integrations</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.integrations.map((integration) => (
                  <Link
                    key={integration.id}
                    href={`/integrations/${integration.slug}`}
                    className="group p-5 bg-gray-900/50 border border-gray-800 rounded-xl hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all"
                  >
                    <h3 className="font-semibold text-lg text-white group-hover:text-emerald-400 transition-colors mb-2">
                      {integration.name}
                    </h3>
                    <p className="text-sm text-gray-400 line-clamp-2 mb-4">
                      {integration.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        {integration.useCases.length} use cases
                      </span>
                      <span className="text-emerald-400 group-hover:translate-x-1 transition-transform">
                        <ArrowRight size={16} />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/10 via-cyan-600/10 to-blue-600/10"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Don&apos;t See Your Tool?
            </h2>
            <p className="text-lg text-gray-400 mb-8">
              We&apos;re constantly adding new integrations. Contact us to request support 
              for your specific tech stack or get a custom integration built.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
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
        </div>
      </section>
    </div>
  );
}
