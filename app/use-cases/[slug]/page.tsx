import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { useCases } from '@/lib/pseo/data/use-cases';
import { industries } from '@/lib/pseo/data/industries';
import { absoluteUrl } from '@/lib/site';
import { readParams } from '@/lib/next-params';

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return useCases.map((useCase) => ({
    slug: useCase.slug,
  }));
}

export const revalidate = 86400;

export async function generateMetadata({ params: rawParams }: PageProps): Promise<Metadata> {
  const params = await readParams(rawParams);
  const useCase = useCases.find(u => u.slug === params.slug);
  if (!useCase) return { title: 'Not Found' };
  
  return {
    title: `${useCase.name} SEO | How to Use SEO for ${useCase.name} | Anthroly`,
    description: `Learn how to use AI SEO for ${useCase.name.toLowerCase()}. ${useCase.description} Strategy, implementation, and examples.`,
    openGraph: {
      title: `${useCase.name} SEO | Anthroly`,
      description: `AI-powered SEO for ${useCase.name.toLowerCase()}.`,
      url: absoluteUrl(`/use-cases/${useCase.slug}`),
      type: 'website',
    },
    alternates: {
      canonical: absoluteUrl(`/use-cases/${useCase.slug}`),
    },
  };
}

export default async function UseCasePage({ params: rawParams }: PageProps) {
  const params = await readParams(rawParams);
  const useCase = useCases.find(u => u.slug === params.slug);
  
  if (!useCase) {
    notFound();
  }
  
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <Link href="/use-cases" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-6">
              ← Back to Use Cases
            </Link>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              SEO for{' '}
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 text-transparent bg-clip-text">
                {useCase.name}
              </span>
            </h1>
            <p className="text-xl text-zinc-400 mb-8">
              {useCase.description}
            </p>
            <Link
              href="/#ai-crawler"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold hover:from-purple-500 hover:to-blue-500 transition-all shadow-lg shadow-purple-500/25"
            >
              Start {useCase.name} with AI SEO
            </Link>
          </div>
        </div>
      </section>
      
      {/* Benefits */}
      <section className="py-16 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8">Benefits of SEO for {useCase.name}</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {useCase.benefits.map((benefit, index) => (
              <div key={index} className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-green-400 text-sm">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-zinc-100 mb-2">{benefit}</h3>
                    <p className="text-zinc-400 text-sm">
                      A key advantage of using SEO for {useCase.name.toLowerCase()} that compounds over time.
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Challenges */}
      <section className="py-16 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8">Challenges (And How We Solve Them)</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {useCase.challenges.map((challenge, index) => (
              <div key={index} className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl">
                <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center mb-4">
                  <span className="text-orange-400 text-lg">!</span>
                </div>
                <h3 className="font-semibold text-zinc-100 mb-2">{challenge}</h3>
                <p className="text-zinc-400 text-sm">
                  Anthroly&apos;s managed program addresses this through consistent execution and clear reporting.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* By Industry */}
      <section className="py-16 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">{useCase.name} by Industry</h2>
          <p className="text-zinc-400 mb-8">
            Get industry-specific {useCase.name.toLowerCase()} strategies tailored to your vertical.
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {industries.slice(0, 12).map((industry) => (
              <Link
                key={industry.slug}
                href={`/use-cases/${useCase.slug}/${industry.slug}`}
                className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-lg hover:border-purple-500/50 transition-all text-center"
              >
                <div className="font-medium text-zinc-100">{industry.name}</div>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <p className="text-zinc-400">+ {industries.length - 12} more industries</p>
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-16 border-t border-zinc-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start {useCase.name}?</h2>
          <p className="text-zinc-400 mb-8">
            Get a free AI analysis showing your {useCase.name.toLowerCase()} opportunities.
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
