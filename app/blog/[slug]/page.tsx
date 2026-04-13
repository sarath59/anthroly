import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { BOOK_CALL_URL, PRIMARY_CTA_LABEL } from '@/lib/site';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft, Calendar, Clock, Tag, User, Share2, BookOpen } from 'lucide-react';
import { blogPosts, getBlogPostBySlug, getRelatedBlogPosts } from '@/lib/pseo/data/blog-posts';

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export const revalidate = 86400;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = getBlogPostBySlug(params.slug);
  
  if (!post) {
    return { title: 'Not Found' };
  }
  
  return {
    title: `${post.title} | Anthroly Blog`,
    description: post.metaDescription,
    keywords: [post.primaryKeyword, ...post.secondaryKeywords],
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      url: `https://anthroly.com/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt || post.publishedAt,
      authors: [post.author],
      tags: post.tags,
    },
    alternates: {
      canonical: `https://anthroly.com/blog/${post.slug}`,
    },
  };
}

function generateArticleSchema(post: NonNullable<ReturnType<typeof getBlogPostBySlug>>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.metaDescription,
    author: {
      '@type': 'Organization',
      name: post.author,
      url: 'https://anthroly.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Anthroly',
      url: 'https://anthroly.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://anthroly.com/logo.png',
      },
    },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://anthroly.com/blog/${post.slug}`,
    },
    keywords: [post.primaryKeyword, ...post.secondaryKeywords].join(', '),
  };
}

function generateFAQSchema(post: NonNullable<ReturnType<typeof getBlogPostBySlug>>) {
  if (post.faq.length === 0) return null;
  
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: post.faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export default function BlogPostPage({ params }: PageProps) {
  const post = getBlogPostBySlug(params.slug);
  
  if (!post) {
    notFound();
  }
  
  const relatedPosts = getRelatedBlogPosts(post, 3);
  const articleSchema = generateArticleSchema(post);
  const faqSchema = generateFAQSchema(post);
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      
      <div className="min-h-screen bg-black text-white">
        {/* Hero Section */}
        <section className="relative pt-32 pb-12 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_#111_1px,_transparent_1px)] bg-[size:32px_32px] opacity-40"></div>
            <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[120px]"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto">
              {/* Breadcrumb */}
              <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
                <Link href="/blog" className="hover:text-emerald-400 transition-colors flex items-center gap-1">
                  <ArrowLeft size={14} />
                  Blog
                </Link>
                <span>/</span>
                <span className="text-gray-400">{post.category.replace(/-/g, ' ')}</span>
              </nav>

              {/* Meta Tags */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-sm font-medium rounded-full">
                  {post.category.replace(/-/g, ' ').toUpperCase()}
                </span>
                {post.location && (
                  <span className="px-3 py-1 bg-blue-500/10 text-blue-400 text-sm font-medium rounded-full">
                    {post.location}
                  </span>
                )}
                {post.industry && (
                  <span className="px-3 py-1 bg-purple-500/10 text-purple-400 text-sm font-medium rounded-full">
                    {post.industry}
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 leading-tight">
                {post.title}
              </h1>

              {/* Post Meta */}
              <div className="flex flex-wrap items-center gap-6 text-gray-400 mb-8">
                <span className="flex items-center gap-2">
                  <User size={16} className="text-emerald-400" />
                  {post.author}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar size={16} className="text-emerald-400" />
                  {new Date(post.publishedAt).toLocaleDateString('en-US', { 
                    month: 'long', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}
                </span>
                <span className="flex items-center gap-2">
                  <Clock size={16} className="text-emerald-400" />
                  {post.readingTime} min read
                </span>
              </div>

              {/* Excerpt */}
              <p className="text-xl text-gray-300 leading-relaxed border-l-4 border-emerald-500 pl-6">
                {post.excerpt}
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Introduction */}
              <div className="prose prose-lg prose-invert max-w-none mb-12">
                {post.introduction.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-gray-300 leading-relaxed mb-6">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Table of Contents */}
              <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 mb-12">
                <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <BookOpen size={18} className="text-emerald-400" />
                  Table of Contents
                </h2>
                <nav className="space-y-2">
                  {post.sections.map((section, index) => (
                    <a
                      key={index}
                      href={`#section-${index}`}
                      className="block text-gray-400 hover:text-emerald-400 transition-colors"
                    >
                      {index + 1}. {section.heading}
                    </a>
                  ))}
                  <a href="#key-takeaways" className="block text-gray-400 hover:text-emerald-400 transition-colors">
                    Key Takeaways
                  </a>
                  <a href="#faq" className="block text-gray-400 hover:text-emerald-400 transition-colors">
                    FAQ
                  </a>
                </nav>
              </div>

              {/* Article Sections */}
              {post.sections.map((section, index) => (
                <div key={index} id={`section-${index}`} className="mb-12 scroll-mt-24">
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                    {section.heading}
                  </h2>
                  
                  <div className="prose prose-lg prose-invert max-w-none">
                    {section.content.split('\n\n').map((paragraph, pIndex) => (
                      <p key={pIndex} className="text-gray-300 leading-relaxed mb-4">
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {/* Subsections */}
                  {section.subsections?.map((subsection, subIndex) => (
                    <div key={subIndex} className="mt-8 pl-6 border-l-2 border-gray-800">
                      <h3 className="text-xl font-bold text-white mb-4">
                        {subsection.subheading}
                      </h3>
                      <div className="prose prose-lg prose-invert max-w-none">
                        {subsection.content.split('\n\n').map((paragraph, pIndex) => (
                          <p key={pIndex} className="text-gray-300 leading-relaxed mb-4">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}

                  {/* List Items */}
                  {section.listItems && section.listItems.length > 0 && (
                    <ul className="mt-6 space-y-3">
                      {section.listItems.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start gap-3 text-gray-300">
                          <span className="flex-shrink-0 w-6 h-6 bg-emerald-500/20 rounded-full flex items-center justify-center mt-0.5">
                            <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Quote */}
                  {section.quote && (
                    <blockquote className="mt-8 border-l-4 border-emerald-500 pl-6 py-4 bg-emerald-500/5 rounded-r-xl">
                      <p className="text-lg text-gray-200 italic mb-2">&ldquo;{section.quote.text}&rdquo;</p>
                      {section.quote.author && (
                        <cite className="text-sm text-gray-400">— {section.quote.author}</cite>
                      )}
                    </blockquote>
                  )}

                  {/* Callout */}
                  {section.callout && (
                    <div className={`mt-8 p-6 rounded-xl border ${
                      section.callout.type === 'tip' ? 'bg-emerald-500/10 border-emerald-500/30' :
                      section.callout.type === 'warning' ? 'bg-amber-500/10 border-amber-500/30' :
                      section.callout.type === 'info' ? 'bg-blue-500/10 border-blue-500/30' :
                      'bg-green-500/10 border-green-500/30'
                    }`}>
                      <p className={`text-sm font-medium mb-2 ${
                        section.callout.type === 'tip' ? 'text-emerald-400' :
                        section.callout.type === 'warning' ? 'text-amber-400' :
                        section.callout.type === 'info' ? 'text-blue-400' :
                        'text-green-400'
                      }`}>
                        {section.callout.type.toUpperCase()}
                      </p>
                      <p className="text-gray-300">{section.callout.content}</p>
                    </div>
                  )}
                </div>
              ))}

              {/* Key Takeaways */}
              <div id="key-takeaways" className="mb-12 scroll-mt-24 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                    <BookOpen size={20} className="text-emerald-400" />
                  </span>
                  Key Takeaways
                </h2>
                <ul className="space-y-4">
                  {post.keyTakeaways.map((takeaway, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-200">
                      <span className="flex-shrink-0 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-black text-sm font-bold">
                        {index + 1}
                      </span>
                      {takeaway}
                    </li>
                  ))}
                </ul>
              </div>

              {/* FAQ Section */}
              <div id="faq" className="mb-12 scroll-mt-24">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  {post.faq.map((item, index) => (
                    <details
                      key={index}
                      className="group bg-gray-900/50 border border-gray-800 rounded-xl overflow-hidden"
                    >
                      <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-800/50 transition-colors">
                        <h3 className="font-semibold text-white pr-4">{item.question}</h3>
                        <span className="flex-shrink-0 w-6 h-6 bg-emerald-500/20 rounded-full flex items-center justify-center group-open:rotate-180 transition-transform">
                          <ArrowRight size={14} className="text-emerald-400 rotate-90" />
                        </span>
                      </summary>
                      <div className="px-6 pb-6">
                        <p className="text-gray-300 leading-relaxed">{item.answer}</p>
                      </div>
                    </details>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap items-center gap-2 mb-12 pt-8 border-t border-gray-800">
                <Tag size={16} className="text-gray-500" />
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-900 border border-gray-800 rounded-full text-sm text-gray-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* CTA Box */}
              <div className="bg-gradient-to-br from-emerald-600/20 to-cyan-600/20 border border-emerald-500/30 rounded-2xl p-8 text-center mb-12">
                <h3 className="text-2xl font-bold text-white mb-3">
                  Ready to Implement These Strategies?
                </h3>
                <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                  Stop reading and start ranking. Get a free AI analysis showing exactly 
                  how visible you are to AI assistants—and what it takes to reach #1.
                </p>
                <Link href="/#ai-crawler">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-black hover:from-emerald-400 hover:to-cyan-400 rounded-full font-semibold"
                  >
                    Get Your Free AI Analysis
                    <ArrowRight className="ml-2" size={18} />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="py-16 bg-gray-950/50">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-2xl font-bold text-white mb-8">Related Articles</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedPosts.map((relatedPost) => (
                    <Link
                      key={relatedPost.id}
                      href={`/blog/${relatedPost.slug}`}
                      className="group p-6 bg-gray-900/50 border border-gray-800 rounded-2xl hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all"
                    >
                      <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-medium rounded mb-3 inline-block">
                        {relatedPost.category.replace(/-/g, ' ')}
                      </span>
                      
                      <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors mb-2 line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      
                      <p className="text-sm text-gray-400 line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Bottom CTA */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/10 via-cyan-600/10 to-blue-600/10"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Let Our Team Run Your SEO
              </h2>
              <p className="text-lg text-gray-400 mb-8">
                15 blogs/month. 15–25 high-DR backlinks. Continuous AI optimization. 
                All for less than the cost of a single freelance article.
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
    </>
  );
}
