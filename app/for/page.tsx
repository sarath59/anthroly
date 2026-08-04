import { Metadata } from 'next';
import Link from 'next/link';
import { targetPersonas, personaCategories } from '@/lib/pseo';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users, Briefcase, Target } from 'lucide-react';
import { absoluteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'AI SEO for Every Industry & Role | Who We Serve | Anthroly',
  description: 'AI-powered SEO solutions tailored for SaaS founders, marketing directors, e-commerce managers, agencies, and more. See how Anthroly serves your specific needs.',
  keywords: ['seo for saas', 'seo for startups', 'seo for agencies', 'ai seo services', 'industry seo solutions'],
  openGraph: {
    title: 'AI SEO for Every Industry & Role | Anthroly',
    description: 'AI-powered SEO solutions tailored for your specific role and industry.',
    url: absoluteUrl('/for'),
    type: 'website',
  },
  alternates: {
    canonical: absoluteUrl('/for'),
  },
};

const industryIcons: Record<string, React.ReactNode> = {
  'Technology / Software': <Target className="text-emerald-400" size={24} />,
  'Cross-Industry': <Briefcase className="text-cyan-400" size={24} />,
  'Retail / E-commerce': <Users className="text-blue-400" size={24} />,
  'Marketing Services': <Target className="text-purple-400" size={24} />,
  'Technology Startups': <Target className="text-emerald-400" size={24} />,
  'Small Business / Local Services': <Users className="text-orange-400" size={24} />,
  'Affiliate Marketing': <Briefcase className="text-pink-400" size={24} />,
  'B2B / Enterprise': <Briefcase className="text-indigo-400" size={24} />,
};

export default function ForIndexPage() {
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
              <Users size={16} />
              <span>Tailored Solutions for Every Role</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              AI SEO Built for{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400">
                Your Success
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-400 leading-relaxed mb-8 max-w-3xl mx-auto">
              Whether you&apos;re a SaaS founder, marketing director, or agency owner, our managed SEO program
              adapts to your specific challenges and goals. Explore solutions designed for your role.
            </p>

            <Link href="/#ai-crawler">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-black hover:from-emerald-400 hover:to-cyan-400 rounded-full font-semibold"
              >
                Get Free AI Analysis
                <ArrowRight className="ml-2" size={18} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Personas Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {targetPersonas.map((persona) => (
              <Link
                key={persona.id}
                href={`/for/${persona.slug}`}
                className="group p-6 bg-gray-900/50 border border-gray-800 rounded-2xl hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center">
                    {industryIcons[persona.industry] || <Users className="text-emerald-400" size={24} />}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors mb-1">
                      {persona.name}s
                    </h3>
                    <p className="text-sm text-gray-500 mb-3">
                      {persona.title}
                    </p>
                    <p className="text-gray-400 text-sm line-clamp-2">
                      {persona.painPoints[0]}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-800">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{persona.industry}</span>
                    <span className="text-emerald-400 group-hover:translate-x-1 transition-transform">
                      <ArrowRight size={16} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-16 bg-gray-950/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Why Industry-Specific SEO Matters
            </h2>
            <p className="text-gray-400">
              Generic SEO strategies don&apos;t account for your unique challenges, competitors, and goals. 
              Our playbooks adapt to your specific context.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="p-6 bg-gray-900/50 border border-gray-800 rounded-xl text-center">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Target className="text-emerald-400" size={24} />
              </div>
              <h3 className="font-semibold text-white mb-2">Targeted Strategy</h3>
              <p className="text-sm text-gray-400">
                AI analyzes your specific market, competitors, and opportunities
              </p>
            </div>
            <div className="p-6 bg-gray-900/50 border border-gray-800 rounded-xl text-center">
              <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Briefcase className="text-cyan-400" size={24} />
              </div>
              <h3 className="font-semibold text-white mb-2">Role-Aware Content</h3>
              <p className="text-sm text-gray-400">
                Content that speaks to your audience&apos;s pain points and goals
              </p>
            </div>
            <div className="p-6 bg-gray-900/50 border border-gray-800 rounded-xl text-center">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="text-blue-400" size={24} />
              </div>
              <h3 className="font-semibold text-white mb-2">Industry Networks</h3>
              <p className="text-sm text-gray-400">
                Backlinks from publications your industry respects
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
              Don&apos;t See Your Role?
            </h2>
            <p className="text-lg text-gray-400 mb-8">
              Our team adapts to any industry and role. Get a free analysis to see exactly 
              how we can help your specific situation.
            </p>
            <Link href="/#ai-crawler">
              <Button 
                size="xl" 
                className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-black hover:from-emerald-400 hover:to-cyan-400 rounded-full font-bold shadow-[0_0_40px_-10px_rgba(16,185,129,0.6)]"
              >
                Get Your Free AI Analysis
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
