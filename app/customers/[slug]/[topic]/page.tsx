import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Sparkles } from 'lucide-react';
import {
  generateCustomerClusterPage,
  getAllCustomerClusterPaths,
  getClusterTopicsForBrand,
} from '@/lib/customer-clusters';
import { getCaseStudy } from '@/lib/customers';
import { absoluteUrl } from '@/lib/site';
import { readParams } from '@/lib/next-params';
import { Button } from '@/components/ui/button';
import {
  combineSchemas,
  generateArticleSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateOrganizationSchema,
} from '@/lib/pseo/schema';

interface PageProps {
  params: { slug: string; topic: string };
}

export const dynamicParams = false;
export const revalidate = 86400;

export function generateStaticParams() {
  return getAllCustomerClusterPaths();
}

export function generateMetadata({ params }: PageProps): Metadata {
  const page = generateCustomerClusterPage(params.slug, params.topic);
  if (!page) return {};

  const url = absoluteUrl(page.url);
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: page.title,
      description: page.metaDescription,
      url,
      siteName: 'Anthroly',
      type: 'article',
      publishedTime: page.publishedAt,
    },
    twitter: {
      card: 'summary',
      title: page.metaTitle,
      description: page.metaDescription,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function CustomerClusterTopicPage({ params: rawParams }: PageProps) {
  const params = await readParams(rawParams);
  const study = getCaseStudy(params.slug);
  const page = generateCustomerClusterPage(params.slug, params.topic);
  if (!study || !page) notFound();

  const topicNav = getClusterTopicsForBrand(params.slug);
  const structuredData = combineSchemas(
    generateArticleSchema(page.title, page.metaDescription, page.url, page.publishedAt),
    generateFAQSchema(page.faqs),
    generateBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Customers', url: '/customers' },
      { name: study.brand, url: page.canonicalCaseStudyUrl },
      { name: page.topicName, url: page.url },
    ]),
    generateOrganizationSchema()
  );

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: structuredData }}
      />

      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_#222_1px,_transparent_1px)] bg-[size:32px_32px] opacity-20" />
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <article className="max-w-3xl mx-auto">
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-gray-500">
            <Link href="/" className="hover:text-gray-300 transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/customers" className="hover:text-gray-300 transition-colors">
              Customers
            </Link>
            <span className="mx-2">/</span>
            <Link
              href={page.canonicalCaseStudyUrl}
              className="hover:text-gray-300 transition-colors"
            >
              {study.brand}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-300">{page.topicName}</span>
          </nav>

          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 text-emerald-300 rounded-full text-sm font-semibold mb-6 border border-emerald-500/30">
              <Sparkles size={16} />
              <span>
                {study.brand} · {page.topicName}
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight leading-tight">
              {page.h1}
            </h1>

            <div className="mb-8 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-5 md:p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2">
                Key answer
              </p>
              <p className="text-base md:text-lg text-white leading-relaxed">{page.directAnswer}</p>
            </div>

            <p className="text-xl text-gray-400 leading-relaxed">{page.introduction}</p>
          </div>

          {/* Cluster nav */}
          <nav aria-label={`${study.brand} topic pages`} className="mb-10">
            <p className="text-xs uppercase tracking-wider text-gray-500 mb-3">
              {study.brand} topic cluster
            </p>
            <ul className="flex flex-wrap gap-2">
              <li>
                <Link
                  href={page.canonicalCaseStudyUrl}
                  className="inline-block text-sm px-3 py-1.5 rounded-full border border-gray-700 text-gray-300 hover:border-emerald-500/40 hover:text-emerald-400"
                >
                  Full case study
                </Link>
              </li>
              {topicNav.map((t) => (
                <li key={t.slug}>
                  <Link
                    href={t.url}
                    className={`inline-block text-sm px-3 py-1.5 rounded-full border transition-colors ${
                      t.slug === page.topicSlug
                        ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-300'
                        : 'border-gray-700 text-gray-300 hover:border-emerald-500/40 hover:text-emerald-400'
                    }`}
                  >
                    {t.navLabel}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {page.metrics.map((metric, i) => (
              <div key={i} className="rounded-2xl border border-gray-800 bg-black/40 p-5">
                <div className="text-2xl md:text-3xl font-bold text-emerald-400 mb-2">
                  {metric.value}
                </div>
                <div className="text-sm text-gray-400 leading-snug">{metric.label}</div>
              </div>
            ))}
          </div>

          {/* Sections */}
          {page.sections.map((section, i) => (
            <section key={i} className="mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-white mt-4 mb-4">
                {section.heading}
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">{section.body}</p>
              {section.listItems && section.listItems.length > 0 && (
                <ul className="space-y-3 mb-2">
                  {section.listItems.map((item, j) => (
                    <li key={j} className="flex items-start gap-3 text-gray-300 leading-relaxed">
                      <span className="text-emerald-400 mt-1 shrink-0">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          {/* Quotes */}
          {page.quotes.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                From the {study.brand} story
              </h2>
              {page.quotes.map((q, i) => (
                <blockquote
                  key={i}
                  className="my-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6 md:p-8"
                >
                  <p className="text-lg md:text-xl text-white leading-relaxed mb-4">
                    &ldquo;{q.body}&rdquo;
                  </p>
                  <footer className="text-sm">
                    <span className="font-semibold text-emerald-300">{q.name}</span>
                    <span className="text-gray-400"> — {q.role}</span>
                  </footer>
                </blockquote>
              ))}
            </section>
          )}

          {/* FAQ */}
          <section className="mb-14">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
              FAQ: {study.brand} {page.topicName}
            </h2>
            <div className="space-y-6">
              {page.faqs.map((faq, i) => (
                <div key={i} className="rounded-2xl border border-gray-800 bg-black/40 p-5 md:p-6">
                  <h3 className="text-lg font-semibold text-white mb-2">{faq.question}</h3>
                  <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Disclaimer for brand SERP clarity */}
          <p className="text-sm text-gray-500 mb-12 leading-relaxed">
            This is an Anthroly customer story page about {study.brand}&apos;s AI search / AEO
            results. It is not the official {study.brand} website. For product information, visit{' '}
            <a
              href={`https://${study.domain}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-emerald-400 underline-offset-2 hover:underline"
            >
              {study.domain}
            </a>
            .
          </p>

          {/* Sibling topics */}
          <div className="mb-12 pt-10 border-t border-gray-800">
            <h2 className="text-xl font-bold text-white mb-4">
              More {study.brand} pages
            </h2>
            <ul className="grid sm:grid-cols-2 gap-3">
              <li>
                <Link
                  href={page.canonicalCaseStudyUrl}
                  className="block p-4 rounded-xl border border-gray-800 hover:border-gray-700 text-sm text-gray-300 hover:text-white"
                >
                  Full {study.brand} case study
                </Link>
              </li>
              {page.siblingTopics.map((t) => (
                <li key={t.slug}>
                  <Link
                    href={t.url}
                    className="block p-4 rounded-xl border border-gray-800 hover:border-gray-700 text-sm text-gray-300 hover:text-white"
                  >
                    {study.brand} · {t.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Related brands */}
          <div className="mb-12">
            <h2 className="text-xl font-bold text-white mb-4">Other teams we empower</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {page.relatedBrands.map((r) => (
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
          </div>

          {/* CTA */}
          <div className="rounded-2xl bg-black/40 border border-gray-800 p-8 md:p-10 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{page.cta.headline}</h2>
            <p className="text-gray-400 mb-6 max-w-xl mx-auto">{page.cta.description}</p>
            <a href={page.cta.buttonUrl} target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                className="bg-emerald-500 text-black hover:bg-emerald-400 font-semibold"
              >
                {page.cta.buttonText}
                <ArrowRight className="ml-2" size={18} />
              </Button>
            </a>
          </div>

        </article>
      </div>
    </div>
  );
}
