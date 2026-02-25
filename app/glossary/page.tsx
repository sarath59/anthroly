import { Metadata } from 'next';
import Link from 'next/link';
import { seoGlossaryTerms, glossaryCategories } from '@/lib/pseo';
import { Button } from '@/components/ui/button';
import { ArrowRight, Book, Search } from 'lucide-react';

export const metadata: Metadata = {
  title: 'SEO Glossary: 100+ Terms Explained | AI SEO Dictionary | Anthroly',
  description: 'Comprehensive SEO glossary covering AI SEO, GEO, technical SEO, link building, and more. Clear definitions with practical examples for modern search optimization.',
  keywords: ['seo glossary', 'seo terms', 'seo dictionary', 'ai seo glossary', 'seo definitions'],
  openGraph: {
    title: 'SEO Glossary: 100+ Terms Explained | Anthroly',
    description: 'Comprehensive SEO glossary covering AI SEO, GEO, technical SEO, link building, and more.',
    url: 'https://anthroly.com/glossary',
    type: 'website',
  },
  alternates: {
    canonical: 'https://anthroly.com/glossary',
  },
};

export default function GlossaryIndexPage() {
  // Group terms by category
  const termsByCategory = glossaryCategories.map(category => ({
    ...category,
    terms: seoGlossaryTerms.filter(term => term.category === category.id),
  })).filter(cat => cat.terms.length > 0);

  // Get all terms sorted alphabetically
  const allTermsSorted = [...seoGlossaryTerms].sort((a, b) => 
    a.term.localeCompare(b.term)
  );

  // Group by first letter
  const termsByLetter: Record<string, typeof seoGlossaryTerms> = {};
  allTermsSorted.forEach(term => {
    const firstLetter = term.term[0].toUpperCase();
    if (!termsByLetter[firstLetter]) {
      termsByLetter[firstLetter] = [];
    }
    termsByLetter[firstLetter].push(term);
  });

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
              <Book size={16} />
              <span>{seoGlossaryTerms.length}+ Terms Defined</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400">
                SEO Glossary
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-400 leading-relaxed mb-8 max-w-3xl mx-auto">
              Master the language of modern SEO. From AI-powered optimization to technical fundamentals, 
              get clear definitions and practical examples for every term you need to know.
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

      {/* Alphabet Navigation */}
      <section className="py-8 border-y border-gray-800 sticky top-16 bg-black/95 backdrop-blur-sm z-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2">
            {Object.keys(termsByLetter).sort().map(letter => (
              <a
                key={letter}
                href={`#letter-${letter}`}
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-900 hover:bg-emerald-500/20 hover:text-emerald-400 transition-colors font-semibold"
              >
                {letter}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
            Browse by Category
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-5xl mx-auto">
            {termsByCategory.map(category => (
              <div
                key={category.id}
                className="p-4 bg-gray-900/50 border border-gray-800 rounded-xl hover:border-emerald-500/30 transition-colors text-center"
              >
                <h3 className="font-semibold text-white mb-1">{category.name}</h3>
                <p className="text-sm text-gray-500">{category.terms.length} terms</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Alphabetical Listing */}
      <section className="py-16 bg-gray-950/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {Object.keys(termsByLetter).sort().map(letter => (
              <div key={letter} id={`letter-${letter}`} className="mb-12 scroll-mt-32">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                    <span className="text-2xl font-bold text-emerald-400">{letter}</span>
                  </div>
                  <div className="flex-1 h-px bg-gray-800"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {termsByLetter[letter].map(term => (
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
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/10 via-cyan-600/10 to-blue-600/10"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Apply These Concepts?
            </h2>
            <p className="text-lg text-gray-400 mb-8">
              Let Anthroly&apos;s AI handle the execution. Get 30 blogs/month, 20-30 high-DR backlinks, 
              and continuous optimization—without becoming an SEO expert yourself.
            </p>
            <a href="https://buy.polar.sh/polar_cl_NBzHmxi4dZuSh5bLGhG0iUoBqLAa8Y3dBUiFv0fZ1AN" target="_blank" rel="noopener noreferrer">
              <Button 
                size="xl" 
                className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-black hover:from-emerald-400 hover:to-cyan-400 rounded-full font-bold shadow-[0_0_40px_-10px_rgba(16,185,129,0.6)]"
              >
                Start for $99/month
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
