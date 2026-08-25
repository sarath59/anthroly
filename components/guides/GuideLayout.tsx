import Link from 'next/link';
import { AuthorByline } from '@/components/aeo/AuthorByline';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import type { GuidePage } from '@/lib/guides/citations-cluster';
import { CITATION_PILLAR_PATH, citationSpokes } from '@/lib/guides/citations-cluster';
import {
  citationDiagramPath,
  getCitationDiagram,
  GUIDE_DIAGRAM_SIZE,
} from '@/lib/guides/citation-diagrams';
import {
  absoluteUrl,
  BOOK_CALL_URL,
  PRIMARY_CTA_LABEL,
} from '@/lib/site';
import {
  combineSchemas,
  generateArticleSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateHowToSchema,
  generateOrganizationSchema,
} from '@/lib/pseo/schema';
import { generatePersonSchema, SITE_AUTHOR } from '@/lib/author';

function headingId(heading: string): string {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

export function guideJsonLd(page: GuidePage): string {
  const diagram = getCitationDiagram(page.slug);
  const diagramUrl = absoluteUrl(citationDiagramPath(page.slug));
  const article = generateArticleSchema(
    page.title,
    page.metaDescription,
    page.path,
    page.datePublished,
    page.dateModified
  ) as Record<string, unknown>;
  article.author = {
    '@type': 'Person',
    name: SITE_AUTHOR.name,
    url: SITE_AUTHOR.url,
  };
  article.image = {
    '@type': 'ImageObject',
    url: diagramUrl,
    width: GUIDE_DIAGRAM_SIZE.width,
    height: GUIDE_DIAGRAM_SIZE.height,
    caption: diagram.caption,
  };

  const crumbs = [
    { name: 'Home', url: '/' },
    { name: 'Guides', url: CITATION_PILLAR_PATH },
  ];
  if (page.slug) {
    crumbs.push({ name: page.h1, url: page.path });
  }

  const schemas: object[] = [
    article,
    generateFAQSchema(page.faqs),
    generateBreadcrumbSchema(crumbs),
    generateOrganizationSchema(),
    generatePersonSchema(),
  ];

  if (page.howTo) {
    schemas.push(
      generateHowToSchema(page.howTo.name, page.howTo.description, page.howTo.steps, {
        url: page.path,
      })
    );
  }

  if (!page.slug) {
    schemas.push({
      '@type': 'ItemList',
      name: 'AI citation cluster',
      itemListElement: citationSpokes.map((spoke, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: spoke.h1,
        url: spoke.path,
      })),
    });
  }

  return combineSchemas(...schemas);
}

export function GuideLayout({ page }: { page: GuidePage }) {
  const jsonLd = guideJsonLd(page);
  const diagram = getCitationDiagram(page.slug);
  const diagramSrc = citationDiagramPath(page.slug);

  return (
    <div className="min-h-screen bg-black text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />

      <section className="relative pt-32 pb-12 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_0%,_rgba(16,185,129,0.08),_transparent_50%)]" />
        <div className="container mx-auto px-4 relative z-10 max-w-4xl">
          <nav className="text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-emerald-400">Home</Link>
            <span className="mx-2">/</span>
            <Link href={CITATION_PILLAR_PATH} className="hover:text-emerald-400">
              AI citations
            </Link>
            {page.slug && (
              <>
                <span className="mx-2">/</span>
                <span className="text-gray-400">{page.h1}</span>
              </>
            )}
          </nav>

          <p className="text-emerald-400 text-sm font-semibold uppercase tracking-wider mb-3">
            Founder AI citations
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
            {page.h1}
          </h1>

          <div className="mb-8 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-5 md:p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2">
              Key answer
            </p>
            <p className="text-base md:text-lg text-white leading-relaxed">{page.directAnswer}</p>
          </div>

          <figure className="mb-8">
            <img
              src={diagramSrc}
              width={GUIDE_DIAGRAM_SIZE.width}
              height={GUIDE_DIAGRAM_SIZE.height}
              alt={diagram.alt}
              decoding="async"
              className="w-full h-auto rounded-2xl border border-gray-800 bg-gray-950"
            />
            <figcaption className="mt-3 text-sm text-gray-500">{diagram.caption}</figcaption>
          </figure>

          <AuthorByline className="mb-8" />
        </div>
      </section>

      <section className="pb-16">
        <div className="container mx-auto px-4 max-w-4xl text-gray-300 leading-relaxed">
          <nav aria-label="On this page" className="mb-12 rounded-xl border border-gray-800 bg-gray-900/40 p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-3">
              On this page
            </p>
            <ol className="space-y-2 text-sm">
              {page.sections.map((section) => (
                <li key={section.heading}>
                  <a href={`#${headingId(section.heading)}`} className="text-gray-400 hover:text-emerald-400">
                    {section.heading}
                  </a>
                </li>
              ))}
              <li>
                <a href="#faq" className="text-gray-400 hover:text-emerald-400">
                  Frequently asked questions
                </a>
              </li>
            </ol>
          </nav>

          <div className="space-y-12">
            {page.sections.map((section) => (
              <section key={section.heading}>
                <h2
                  id={headingId(section.heading)}
                  className="text-2xl md:text-3xl font-bold text-white mb-4 scroll-mt-28"
                >
                  {section.heading}
                </h2>
                {section.body.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)} className="mb-4">
                    {paragraph}
                  </p>
                ))}
                {section.list && (
                  <ul className="list-disc pl-5 space-y-2 mb-4">
                    {section.list.map((item) => (
                      <li key={item.slice(0, 48)}>{item}</li>
                    ))}
                  </ul>
                )}
                {section.table && (
                  <div className="overflow-x-auto rounded-xl border border-gray-800 my-6">
                    <table className="w-full text-left text-sm">
                      <caption className="px-4 py-2 text-left text-gray-400 border-b border-gray-800 bg-gray-900/80">
                        {section.table.caption}
                      </caption>
                      <thead className="bg-gray-900 text-white">
                        <tr>
                          {section.table.headers.map((header) => (
                            <th key={header} scope="col" className="px-4 py-3 font-semibold">
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {section.table.rows.map((row) => (
                          <tr key={row.join('|').slice(0, 80)} className="border-t border-gray-800 odd:bg-black/40">
                            {row.map((cell) => (
                              <td key={cell.slice(0, 40)} className="px-4 py-3 align-top">
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>
            ))}

            <section id="faq">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 scroll-mt-28">
                Frequently asked questions
              </h2>
              <div className="space-y-4">
                {page.faqs.map((faq) => (
                  <div key={faq.question} className="border border-gray-800 rounded-xl p-5">
                    <h3 className="font-semibold text-white mb-2">{faq.question}</h3>
                    <p>{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Related in this cluster</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {page.related.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="p-5 rounded-xl border border-gray-800 bg-gray-900/50 hover:border-emerald-500/40 transition-colors"
                  >
                    <h3 className="font-semibold text-white mb-1">{item.label}</h3>
                    <p className="text-sm text-gray-400">{item.note}</p>
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </div>
      </section>

      <section className="py-16 border-t border-gray-800">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Get a citation brief for your niche</h2>
          <p className="text-gray-400 mb-8">
            The $216 Founder Growth Diagnostic maps buyer prompts, current citations, and the pages
            that can actually be extracted — credited toward the sprint if you start within 7 days.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href={BOOK_CALL_URL} target="_blank" rel="noopener noreferrer">
              <Button className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-black rounded-full font-semibold">
                {PRIMARY_CTA_LABEL}
                <ArrowRight className="ml-2" size={18} />
              </Button>
            </a>
            <Link href="/#pricing">
              <Button variant="outline" className="border-gray-700 text-white rounded-full">
                See pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
