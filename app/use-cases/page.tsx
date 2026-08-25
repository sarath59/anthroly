import { Metadata } from 'next';
import Link from 'next/link';
import { useCases } from '@/lib/pseo/data/use-cases';
import { absoluteUrl, PRIMARY_CTA_LABEL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'SEO Use Cases | How to Use SEO for Your Goals | Anthroly',
  description: 'Discover how to use AI SEO for lead generation, e-commerce sales, brand awareness, and 15+ other business goals. Strategy guides and implementation.',
  keywords: 'seo use cases, lead generation seo, ecommerce seo, brand awareness seo, ai seo use cases',
  openGraph: {
    title: 'SEO Use Cases | Anthroly',
    description: 'AI-powered SEO strategies for 18+ business use cases.',
    url: absoluteUrl('/use-cases'),
    type: 'website',
  },
  alternates: {
    canonical: absoluteUrl('/use-cases'),
  },
};

export default function UseCasesPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 text-sm text-purple-300 mb-6">
              18+ Use Cases
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              SEO for{' '}
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 text-transparent bg-clip-text">
                Every Goal
              </span>
            </h1>
            <p className="text-xl text-zinc-400 mb-8">
              Whether you need leads, sales, awareness, or growth—there&apos;s an SEO 
              strategy for it. Discover how AI-powered SEO achieves your specific goals.
            </p>
          </div>
        </div>
      </section>
      
      {/* Use Cases Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((useCase) => (
              <Link
                key={useCase.id}
                href={`/use-cases/${useCase.slug}`}
                className="group p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl hover:border-purple-500/50 hover:bg-zinc-900/80 transition-all"
              >
                <h3 className="text-xl font-semibold mb-3 text-zinc-100 group-hover:text-purple-300 transition-colors">
                  {useCase.name}
                </h3>
                <p className="text-zinc-400 mb-4 text-sm">
                  {useCase.description}
                </p>
                <div className="space-y-2">
                  <div className="text-xs text-zinc-500 uppercase tracking-wide">Key Benefits:</div>
                  <div className="flex flex-wrap gap-2">
                    {useCase.benefits.slice(0, 2).map((benefit) => (
                      <span
                        key={benefit}
                        className="text-xs px-2 py-1 bg-green-500/10 text-green-400 rounded-full"
                      >
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Stats */}
      <section className="py-16 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-purple-400 mb-2">18</div>
              <div className="text-zinc-400">Use Cases</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-400 mb-2">360</div>
              <div className="text-zinc-400">Industry Combinations</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-400 mb-2">5-10x</div>
              <div className="text-zinc-400">Typical ROI</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-400 mb-2">90</div>
              <div className="text-zinc-400">Days to Results</div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-16 border-t border-zinc-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">What&apos;s your SEO goal?</h2>
          <p className="text-zinc-400 mb-8">
            Start with the $216 Founder Growth Diagnostic — a 90-minute researched audit mapped to your goal.
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
