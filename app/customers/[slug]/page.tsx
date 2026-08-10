import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Sparkles } from 'lucide-react';
import { customerCaseStudies, getCaseStudy, type CaseBlock } from '@/lib/customers';
import { absoluteUrl } from '@/lib/site';
import { BOOK_CALL_URL, PRIMARY_CTA_LABEL } from '@/lib/site';
import { Button } from '@/components/ui/button';
import {
  combineSchemas,
  generateArticleSchema,
  generateBreadcrumbSchema,
  generateOrganizationSchema,
} from '@/lib/pseo/schema';

interface PageProps {
  params: { slug: string };
}

export const dynamicParams = false;

export function generateStaticParams() {
  return customerCaseStudies.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const study = getCaseStudy(params.slug);
  if (!study) return {};

  const url = absoluteUrl(`/customers/${study.slug}`);
  return {
    title: study.metaTitle,
    description: study.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: study.title,
      description: study.metaDescription,
      url,
      siteName: 'Anthroly',
      type: 'article',
      publishedTime: study.publishedAt,
    },
    twitter: {
      card: 'summary',
      title: study.metaTitle,
      description: study.metaDescription,
    },
  };
}

function renderBlock(block: CaseBlock, index: number) {
  switch (block.type) {
    case 'h2':
      return (
        <h2 key={index} className="text-2xl md:text-3xl font-bold text-white mt-12 mb-4">
          {block.text}
        </h2>
      );
    case 'h3':
      return (
        <h3 key={index} className="text-xl font-semibold text-white mt-8 mb-3">
          {block.text}
        </h3>
      );
    case 'p':
      return (
        <p key={index} className="text-gray-300 leading-relaxed mb-5">
          {block.text}
        </p>
      );
    case 'ul':
      return (
        <ul key={index} className="space-y-3 mb-6">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-gray-300 leading-relaxed">
              <span className="text-emerald-400 mt-1 shrink-0">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case 'quote':
      return (
        <blockquote
          key={index}
          className="my-8 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6 md:p-8"
        >
          <p className="text-lg md:text-xl text-white leading-relaxed mb-4">
            &ldquo;{block.body}&rdquo;
          </p>
          <footer className="text-sm">
            <span className="font-semibold text-emerald-300">{block.name}</span>
            <span className="text-gray-400"> — {block.role}</span>
          </footer>
        </blockquote>
      );
  }
}

export default function CustomerCaseStudyPage({ params }: PageProps) {
  const study = getCaseStudy(params.slug);
  if (!study) notFound();

  const url = `/customers/${study.slug}`;
  const structuredData = combineSchemas(
    generateArticleSchema(study.title, study.metaDescription, url, study.publishedAt),
    generateBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Customers', url: '/customers' },
      { name: study.brand, url },
    ]),
    generateOrganizationSchema()
  );

  // "Other teams we empower" — two neighboring stories for internal linking
  const idx = customerCaseStudies.findIndex((c) => c.slug === study.slug);
  const related = [
    customerCaseStudies[(idx + 1) % customerCaseStudies.length],
    customerCaseStudies[(idx + 2) % customerCaseStudies.length],
  ];

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: structuredData }}
      />

      {/* Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_#222_1px,_transparent_1px)] bg-[size:32px_32px] opacity-20" />
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <article className="max-w-3xl mx-auto">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-gray-500">
            <Link href="/" className="hover:text-gray-300 transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/customers" className="hover:text-gray-300 transition-colors">
              Customers
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-300">{study.brand}</span>
          </nav>

          {/* Hero */}
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 text-emerald-300 rounded-full text-sm font-semibold mb-6 border border-emerald-500/30">
              <Sparkles size={16} />
              <span>Customer story</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight leading-tight">
              {study.title}
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed">{study.summary}</p>
          </div>

          {/* Metrics band */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
            {study.metrics.map((metric, i) => (
              <div
                key={i}
                className="rounded-2xl border border-gray-800 bg-black/40 p-5"
              >
                <div className="text-2xl md:text-3xl font-bold text-emerald-400 mb-2">
                  {metric.value}
                </div>
                <div className="text-sm text-gray-400 leading-snug">{metric.label}</div>
              </div>
            ))}
          </div>

          {/* Body */}
          <div>{study.blocks.map((block, i) => renderBlock(block, i))}</div>

          {/* Other teams we empower */}
          <div className="mt-16 pt-12 border-t border-gray-800">
            <h2 className="text-2xl font-bold text-white mb-6">Other teams we empower</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/customers/${r.slug}`}
                  className="block p-5 rounded-2xl bg-black/40 border border-gray-800 hover:border-gray-700 transition-colors group"
                >
                  <p className="text-sm font-semibold text-emerald-400 mb-1">{r.brand}</p>
                  <p className="text-gray-300 group-hover:text-white transition-colors text-sm leading-snug">
                    {r.title}
                  </p>
                </Link>
              ))}
            </div>
            <div className="mt-6">
              <Link
                href="/customers"
                className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
              >
                View all customer stories
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-14 rounded-2xl bg-black/40 border border-gray-800 p-8 md:p-10 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to win in AI answers?
            </h2>
            <p className="text-gray-400 mb-6 max-w-xl mx-auto">
              Get the same visibility intelligence, content execution, and marketing agents
              behind these results.
            </p>
            <a href={BOOK_CALL_URL} target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                className="bg-emerald-500 text-black hover:bg-emerald-400 font-semibold"
              >
                {PRIMARY_CTA_LABEL}
                <ArrowRight className="ml-2" size={18} />
              </Button>
            </a>
          </div>
        </article>
      </div>
    </div>
  );
}
