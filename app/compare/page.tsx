import { Metadata } from 'next';
import Link from 'next/link';
import { seoTools, toolCategories } from '@/lib/pseo';
import { Button } from '@/components/ui/button';
import { ArrowRight, GitCompare, Zap } from 'lucide-react';

export const metadata: Metadata = {
  title: 'SEO Tool Comparisons | Side-by-Side Analysis | Anthroly',
  description: 'Compare popular SEO tools like Ahrefs vs Semrush, Moz vs Ahrefs, and more. Detailed feature comparisons, pricing analysis, and recommendations.',
  keywords: ['seo tool comparison', 'ahrefs vs semrush', 'seo software comparison', 'best seo tools', 'seo tool review'],
  openGraph: {
    title: 'SEO Tool Comparisons | Anthroly',
    description: 'Side-by-side comparisons of popular SEO tools.',
    url: 'https://anthroly.com/compare',
    type: 'website',
  },
  alternates: {
    canonical: 'https://anthroly.com/compare',
  },
};

// Generate comparison pairs for tools in same categories
function getComparisonPairs() {
  const pairs: { toolA: typeof seoTools[0]; toolB: typeof seoTools[0] }[] = [];
  
  for (let i = 0; i < seoTools.length; i++) {
    for (let j = i + 1; j < seoTools.length; j++) {
      if (seoTools[i].category === seoTools[j].category) {
        pairs.push({
          toolA: seoTools[i],
          toolB: seoTools[j],
        });
      }
    }
  }
  
  return pairs;
}

export default function CompareIndexPage() {
  const comparisonPairs = getComparisonPairs();
  
  // Group by category
  const pairsByCategory = toolCategories.map(category => ({
    ...category,
    pairs: comparisonPairs.filter(p => p.toolA.category === category.id),
  })).filter(cat => cat.pairs.length > 0);

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
              <GitCompare size={16} />
              <span>{comparisonPairs.length}+ Tool Comparisons</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              SEO Tool{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400">
                Comparisons
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-400 leading-relaxed mb-8 max-w-3xl mx-auto">
              Making the right tool choice can save you thousands and countless hours. 
              Our detailed comparisons help you pick the perfect SEO stack for your needs.
            </p>

            <Link href="/#ai-crawler">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-black hover:from-emerald-400 hover:to-cyan-400 rounded-full font-semibold"
              >
                Or Skip the Tools — Let AI Handle It
                <ArrowRight className="ml-2" size={18} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Comparisons */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">
              Popular Comparisons
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
              {comparisonPairs.slice(0, 6).map((pair) => (
                <Link
                  key={`${pair.toolA.slug}-vs-${pair.toolB.slug}`}
                  href={`/compare/${pair.toolA.slug}-vs-${pair.toolB.slug}`}
                  className="group p-5 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 rounded-xl hover:border-emerald-500/40 transition-all"
                >
                  <div className="flex items-center justify-center gap-4 mb-3">
                    <span className="font-semibold text-white">{pair.toolA.name}</span>
                    <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs rounded-full font-medium">
                      VS
                    </span>
                    <span className="font-semibold text-white">{pair.toolB.name}</span>
                  </div>
                  <p className="text-sm text-gray-400 text-center">
                    {toolCategories.find(c => c.id === pair.toolA.category)?.name}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Comparisons by Category */}
      {pairsByCategory.map((category, index) => (
        <section 
          key={category.id} 
          className={`py-16 ${index % 2 === 0 ? 'bg-gray-950/50' : ''}`}
        >
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center">
                  <GitCompare className="text-emerald-400" size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{category.name}</h2>
                  <p className="text-gray-500">{category.pairs.length} comparisons</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {category.pairs.map((pair) => (
                  <Link
                    key={`${pair.toolA.slug}-vs-${pair.toolB.slug}`}
                    href={`/compare/${pair.toolA.slug}-vs-${pair.toolB.slug}`}
                    className="group p-4 bg-gray-900/50 border border-gray-800 rounded-xl hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-white group-hover:text-emerald-400 transition-colors">
                        {pair.toolA.name}
                      </span>
                      <span className="text-gray-500">vs</span>
                      <span className="font-semibold text-white group-hover:text-emerald-400 transition-colors">
                        {pair.toolB.name}
                      </span>
                      <span className="ml-auto text-emerald-400 group-hover:translate-x-1 transition-transform">
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

      {/* Alternative CTA */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/10 via-cyan-600/10 to-blue-600/10"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-sm font-medium text-cyan-400 mb-6">
              <Zap size={16} />
              <span>A Different Approach</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              What If You Didn&apos;t Need Any of These Tools?
            </h2>
            <p className="text-lg text-gray-400 mb-8">
              Anthroly uses AI to execute SEO automatically. Instead of analyzing what to do, 
              you get 30 blogs/month, 20-30 high-DR backlinks, and continuous optimization—done for you.
            </p>
            <Link href="/#ai-crawler">
              <Button 
                size="xl" 
                className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-black hover:from-emerald-400 hover:to-cyan-400 rounded-full font-bold shadow-[0_0_40px_-10px_rgba(16,185,129,0.6)]"
              >
                See AI SEO in Action
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
