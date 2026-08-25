import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, Calendar, Clock, Tag } from 'lucide-react';
import { blogPosts, blogCategories } from '@/lib/pseo/data/blog-posts';
import { absoluteUrl, BOOK_CALL_URL, PRIMARY_CTA_LABEL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'AI SEO Blog | Insights, Strategies & Industry Guides | Anthroly',
  description: 'Expert insights on AI SEO, local search optimization, and industry-specific strategies. Learn how to dominate both traditional and AI-powered search.',
  keywords: ['ai seo blog', 'seo strategies', 'digital marketing blog', 'search optimization', 'ai marketing'],
  openGraph: {
    title: 'AI SEO Blog | Anthroly',
    description: 'Expert insights on AI SEO, local search optimization, and industry-specific strategies.',
    url: absoluteUrl('/blog'),
    type: 'website',
  },
  alternates: {
    canonical: absoluteUrl('/blog'),
  },
};

export default function BlogIndexPage() {
  const featuredPosts = blogPosts.slice(0, 3);
  const recentPosts = blogPosts.slice(3, 12);
  const popularCategories = blogCategories.slice(0, 8);

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
              <BookOpen size={16} />
              <span>AI SEO Insights & Strategies</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              The{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400">
                AI SEO Blog
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-400 leading-relaxed mb-8 max-w-3xl mx-auto">
              Expert insights on dominating both traditional and AI-powered search. 
              Industry strategies, local SEO guides, and the latest in AI search optimization.
            </p>

            <a href={BOOK_CALL_URL} target="_blank" rel="noopener noreferrer">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-black hover:from-emerald-400 hover:to-cyan-400 rounded-full font-semibold"
              >
                {PRIMARY_CTA_LABEL}
                <ArrowRight className="ml-2" size={18} />
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">Featured Articles</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {featuredPosts.map((post, index) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className={`group relative overflow-hidden rounded-2xl border border-gray-800 hover:border-emerald-500/30 transition-all ${
                    index === 0 ? 'lg:col-span-2 lg:row-span-2' : ''
                  }`}
                >
                  <div className={`p-6 ${index === 0 ? 'lg:p-8' : ''} bg-gradient-to-br from-gray-900 to-gray-950 h-full flex flex-col`}>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-medium rounded-full">
                        {post.category.replace(/-/g, ' ').toUpperCase()}
                      </span>
                      {post.location && (
                        <span className="px-3 py-1 bg-blue-500/10 text-blue-400 text-xs font-medium rounded-full">
                          {post.location}
                        </span>
                      )}
                    </div>
                    
                    <h3 className={`font-bold text-white group-hover:text-emerald-400 transition-colors mb-3 ${
                      index === 0 ? 'text-2xl lg:text-3xl' : 'text-lg'
                    }`}>
                      {post.title}
                    </h3>
                    
                    <p className={`text-gray-400 mb-4 flex-1 ${index === 0 ? 'text-base' : 'text-sm line-clamp-2'}`}>
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {post.readingTime} min read
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 bg-gray-950/50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-xl font-bold text-white mb-6">Browse by Category</h2>
            
            <div className="flex flex-wrap gap-3">
              {popularCategories.map((category) => (
                <Link
                  key={category.id}
                  href={`/blog?category=${category.id}`}
                  className="px-4 py-2 bg-gray-900 border border-gray-800 rounded-full text-sm text-gray-300 hover:text-emerald-400 hover:border-emerald-500/30 transition-all"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Recent Posts Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">Latest Articles</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group p-6 bg-gray-900/50 border border-gray-800 rounded-2xl hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-medium rounded">
                      {post.category.replace(/-/g, ' ')}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {post.readingTime} min
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {blogPosts.length > 12 && (
              <div className="text-center mt-12">
                <Link href="/blog/all">
                  <Button variant="outline" size="lg" className="rounded-full border-gray-700 hover:border-emerald-500/50">
                    View All Articles
                    <ArrowRight className="ml-2" size={16} />
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/10 via-cyan-600/10 to-blue-600/10"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Dominate AI Search?
            </h2>
            <p className="text-lg text-gray-400 mb-8">
              Stop reading about AI SEO—start implementing it. The $216 Founder Growth
              Diagnostic maps buyer prompts, current citations, and the pages that can actually
              be extracted.
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
