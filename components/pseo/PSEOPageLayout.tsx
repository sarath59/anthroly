"use client";

import React from 'react';
import Link from 'next/link';
import { BOOK_CALL_URL } from '@/lib/site';
import { Button } from '../ui/button';
import { ArrowRight, ChevronRight, ExternalLink } from 'lucide-react';
import type { PSEOPage, ContentSection, FAQ, InternalLink, RelatedPage } from '@/lib/pseo/types';

interface PSEOPageLayoutProps {
  page: PSEOPage;
}

export const PSEOPageLayout: React.FC<PSEOPageLayoutProps> = ({ page }) => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_#111_1px,_transparent_1px)] bg-[size:32px_32px] opacity-40"></div>
          <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[120px]"></div>
          <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px]"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Breadcrumbs */}
          <Breadcrumbs url={page.url} />
          
          {/* Main Heading */}
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-sm font-medium text-emerald-400 mb-6">
              <span className="capitalize">{page.playbookType}</span>
              <span className="text-gray-500">•</span>
              <span className="text-gray-400">{page.wordCount}+ words</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
              {page.content.h1}
            </h1>
            
            <p className="text-lg md:text-xl text-gray-400 leading-relaxed mb-8">
              {page.content.introduction}
            </p>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/#ai-crawler">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-black hover:from-emerald-400 hover:to-cyan-400 rounded-full font-semibold shadow-[0_0_30px_-8px_rgba(16,185,129,0.5)]"
                >
                  Get Free AI Analysis
                  <ArrowRight className="ml-2" size={18} />
                </Button>
              </Link>
              <a href={BOOK_CALL_URL} target="_blank" rel="noopener noreferrer">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-gray-700 text-white hover:bg-white/10 rounded-full"
                >
                  Book a call
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Content Sections */}
            {page.content.sections.map((section, index) => (
              <ContentBlock key={index} section={section} index={index} />
            ))}

            {/* Internal Links Section */}
            {page.internalLinks.length > 0 && (
              <InternalLinksBlock links={page.internalLinks} />
            )}

            {/* FAQ Section */}
            {page.content.faq.length > 0 && (
              <FAQBlock faqs={page.content.faq} />
            )}

            {/* Related Pages */}
            {page.relatedPages.length > 0 && (
              <RelatedPagesBlock pages={page.relatedPages} />
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection cta={page.content.callToAction} />
    </div>
  );
};

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

const Breadcrumbs: React.FC<{ url: string }> = ({ url }) => {
  const parts = url.split('/').filter(Boolean);
  const breadcrumbs = [{ name: 'Home', url: '/' }];
  
  const categoryNames: Record<string, string> = {
    glossary: 'SEO Glossary',
    for: 'Industries',
    'ai-seo-agency': 'Locations',
    integrations: 'Integrations',
    compare: 'Comparisons',
  };
  
  let currentPath = '';
  parts.forEach((part, index) => {
    currentPath += `/${part}`;
    breadcrumbs.push({
      name: index < parts.length - 1 
        ? categoryNames[part] || part.charAt(0).toUpperCase() + part.slice(1)
        : part.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
      url: currentPath,
    });
  });

  return (
    <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8 justify-center flex-wrap">
      {breadcrumbs.map((crumb, index) => (
        <React.Fragment key={crumb.url}>
          {index > 0 && <ChevronRight size={14} className="text-gray-600" />}
          {index < breadcrumbs.length - 1 ? (
            <Link href={crumb.url} className="hover:text-emerald-400 transition-colors">
              {crumb.name}
            </Link>
          ) : (
            <span className="text-gray-400">{crumb.name}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

const ContentBlock: React.FC<{ section: ContentSection; index: number }> = ({ section, index }) => {
  return (
    <div className="mb-12">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
        {section.heading}
      </h2>
      
      <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">
        {section.body}
      </div>
      
      {section.listItems && section.listItems.length > 0 && (
        <ul className="mt-6 space-y-3">
          {section.listItems.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-emerald-500/20 rounded-full flex items-center justify-center mt-0.5">
                <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
              </div>
              <span className="text-gray-300">{item}</span>
            </li>
          ))}
        </ul>
      )}
      
      {section.codeExample && (
        <pre className="mt-6 p-4 bg-gray-900 border border-gray-800 rounded-xl overflow-x-auto">
          <code className="text-emerald-400 text-sm font-mono">{section.codeExample}</code>
        </pre>
      )}
    </div>
  );
};

const InternalLinksBlock: React.FC<{ links: InternalLink[] }> = ({ links }) => {
  return (
    <div className="mb-12 p-6 bg-gray-900/50 border border-gray-800 rounded-2xl">
      <h3 className="text-xl font-bold text-white mb-4">Related Resources</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {links.map((link, index) => (
          <Link 
            key={index}
            href={link.url}
            className="flex items-center gap-3 p-3 bg-black/50 border border-gray-800 rounded-xl hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all group"
          >
            <div className="flex-shrink-0 w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center">
              <ExternalLink size={14} className="text-emerald-400" />
            </div>
            <div>
              <span className="text-white group-hover:text-emerald-400 transition-colors font-medium">
                {link.anchorText}
              </span>
              <p className="text-xs text-gray-500">{link.context}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

const FAQBlock: React.FC<{ faqs: FAQ[] }> = ({ faqs }) => {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  return (
    <div className="mb-12">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
        Frequently Asked Questions
      </h2>
      
      <div className="space-y-3">
        {faqs.map((faq, index) => (
          <div 
            key={index}
            className="border border-gray-800 rounded-xl overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex items-center justify-between p-5 text-left bg-gray-900/50 hover:bg-gray-900 transition-colors"
            >
              <span className="font-semibold text-white pr-4">{faq.question}</span>
              <ChevronRight 
                size={20} 
                className={`flex-shrink-0 text-emerald-400 transition-transform ${
                  openIndex === index ? 'rotate-90' : ''
                }`}
              />
            </button>
            
            {openIndex === index && (
              <div className="p-5 bg-black/50 border-t border-gray-800">
                <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const RelatedPagesBlock: React.FC<{ pages: RelatedPage[] }> = ({ pages }) => {
  return (
    <div className="mb-12">
      <h3 className="text-xl font-bold text-white mb-4">You Might Also Like</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {pages.map((page, index) => (
          <Link
            key={index}
            href={page.url}
            className="p-4 bg-gray-900/50 border border-gray-800 rounded-xl hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all group"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs rounded-full capitalize">
                {page.playbook}
              </span>
              <span className="text-xs text-gray-500">
                {page.relevanceScore}% match
              </span>
            </div>
            <h4 className="font-semibold text-white group-hover:text-emerald-400 transition-colors">
              {page.title}
            </h4>
          </Link>
        ))}
      </div>
    </div>
  );
};

const CTASection: React.FC<{ cta: PSEOPage['content']['callToAction'] }> = ({ cta }) => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/10 via-cyan-600/10 to-blue-600/10"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_#111_1px,_transparent_1px)] bg-[size:32px_32px] opacity-30"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {cta.headline}
          </h2>
          <p className="text-lg text-gray-400 mb-8">
            {cta.description}
          </p>
          <Link href={cta.buttonUrl}>
            <Button 
              size="xl" 
              className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-black hover:from-emerald-400 hover:to-cyan-400 rounded-full font-bold shadow-[0_0_40px_-10px_rgba(16,185,129,0.6)] hover:shadow-[0_0_60px_-12px_rgba(16,185,129,0.8)] transition-all"
            >
              {cta.buttonText}
              <ArrowRight className="ml-2" size={20} />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PSEOPageLayout;
