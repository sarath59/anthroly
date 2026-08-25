/**
 * pSEO Page Generator Engine
 * Generates high-quality, scalable SEO pages with validation
 */

import {
  PSEOPage,
  PlaybookType,
  ValidationResult,
  GenerationConfig,
  DEFAULT_GENERATION_CONFIG,
  GlossaryTerm,
  Tool,
  Persona,
  Location,
  Integration,
  ContentSection,
  FAQ,
  SchemaData,
  InternalLink,
  RelatedPage,
} from './types';

import { SITE_URL, absoluteUrl, BOOK_CALL_URL, PRIMARY_CTA_LABEL, SYSTEM_NAME, SPRINT_NAME } from '../site';
import { seoGlossaryTerms } from './data/seo-glossary';
import { citationGuideForPersona } from '../guides/citations-cluster';
import {
  commercialCta,
  howAnthrolyServesBody,
  locationLabel,
  locationMarketSection,
  personaRoleTable,
  pricingAnswer,
} from './page-facts';

const EXISTING_GLOSSARY_SLUGS = new Set(seoGlossaryTerms.map(t => t.slug));

/** Only return relatedTerms that have real /glossary/[slug] pages. */
export function getExistingRelatedTerms(relatedTerms: string[], limit = 3): string[] {
  return relatedTerms.filter(slug => EXISTING_GLOSSARY_SLUGS.has(slug)).slice(0, limit);
}

// ============================================================================
// WORD COUNT UTILITY
// ============================================================================

export function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(word => word.length > 0).length;
}

// ============================================================================
// SLUG VALIDATION
// ============================================================================

const generatedSlugs = new Set<string>();
const generatedPrimaryKeywords = new Set<string>();

export function isSlugUnique(slug: string): boolean {
  return !generatedSlugs.has(slug);
}

export function registerSlug(slug: string): void {
  generatedSlugs.add(slug);
}

export function isPrimaryKeywordUnique(keyword: string): boolean {
  const normalized = keyword.toLowerCase().trim();
  return !generatedPrimaryKeywords.has(normalized);
}

export function registerPrimaryKeyword(keyword: string): void {
  generatedPrimaryKeywords.add(keyword.toLowerCase().trim());
}

// ============================================================================
// CONTENT QUALITY VALIDATION
// ============================================================================

export function validatePage(
  page: PSEOPage,
  config: GenerationConfig = DEFAULT_GENERATION_CONFIG
): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  
  // Calculate word count
  let totalWords = 0;
  totalWords += countWords(page.content.introduction);
  page.content.sections.forEach(section => {
    totalWords += countWords(section.heading);
    totalWords += countWords(section.body);
    if (section.listItems) {
      section.listItems.forEach(item => {
        totalWords += countWords(item);
      });
    }
  });
  page.content.faq.forEach(faq => {
    totalWords += countWords(faq.question);
    totalWords += countWords(faq.answer);
  });
  
  // Determine content type (informational vs utility)
  const isInformational = ['glossary', 'examples', 'curation'].includes(page.playbookType);
  const minWords = isInformational ? config.minWordCount.informational : config.minWordCount.utility;
  
  // Validate word count
  if (totalWords < minWords) {
    errors.push(`Word count (${totalWords}) below minimum (${minWords}) for ${isInformational ? 'informational' : 'utility'} content`);
  }
  
  // Validate FAQ count
  if (page.content.faq.length < config.minFAQs) {
    errors.push(`FAQ count (${page.content.faq.length}) below minimum (${config.minFAQs})`);
  }
  
  // Validate internal links
  if (page.internalLinks.length < config.minInternalLinks) {
    errors.push(`Internal links (${page.internalLinks.length}) below minimum (${config.minInternalLinks})`);
  }
  
  // Validate related pages
  if (page.relatedPages.length < config.minRelatedPages) {
    errors.push(`Related pages (${page.relatedPages.length}) below minimum (${config.minRelatedPages})`);
  }
  
  // Validate slug uniqueness
  if (!isSlugUnique(page.slug)) {
    errors.push(`Duplicate slug detected: ${page.slug}`);
  }
  
  // Validate primary keyword uniqueness
  if (!isPrimaryKeywordUnique(page.seo.primaryKeyword)) {
    warnings.push(`Potential keyword cannibalization: ${page.seo.primaryKeyword}`);
  }
  
  // Validate meta description length
  if (page.seo.metaDescription.length < 120) {
    warnings.push('Meta description too short (recommended: 120-160 characters)');
  }
  if (page.seo.metaDescription.length > 160) {
    warnings.push('Meta description too long (recommended: 120-160 characters)');
  }
  
  // Validate title length
  if (page.seo.title.length > 60) {
    warnings.push('Title too long (recommended: under 60 characters)');
  }
  
  // Calculate uniqueness score (simple heuristic)
  const uniquenessScore = calculateUniquenessScore(page);
  
  if (uniquenessScore < 70) {
    warnings.push(`Low uniqueness score (${uniquenessScore}). Consider adding more specific content.`);
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    metrics: {
      wordCount: totalWords,
      internalLinkCount: page.internalLinks.length,
      faqCount: page.content.faq.length,
      uniquenessScore,
    },
  };
}

function calculateUniquenessScore(page: PSEOPage): number {
  // Simple heuristic based on content diversity
  let score = 50; // Base score
  
  // Bonus for FAQ variety
  const uniqueFAQTopics = new Set(page.content.faq.map(f => f.question.split(' ').slice(0, 3).join(' ')));
  score += Math.min(uniqueFAQTopics.size * 5, 15);
  
  // Bonus for section variety
  const uniqueSectionHeadings = new Set(page.content.sections.map(s => s.heading.split(' ').slice(0, 2).join(' ')));
  score += Math.min(uniqueSectionHeadings.size * 5, 20);
  
  // Bonus for internal links
  score += Math.min(page.internalLinks.length * 2, 10);
  
  // Bonus for data requirements (indicates data-driven content)
  score += Math.min(page.dataRequirementsUsed.length * 2, 5);
  
  return Math.min(score, 100);
}

// ============================================================================
// GLOSSARY PAGE GENERATOR
// ============================================================================

export function generateGlossaryPage(term: GlossaryTerm): PSEOPage {
  const slug = `glossary/${term.slug}`;
  const url = `/${slug}`;
  const directAnswer =
    term.definition.length <= 320
      ? term.definition
      : `${term.definition.slice(0, 280).replace(/\s+\S*$/, '')}.`;
  
  const sections: ContentSection[] = [
    {
      heading: `How does ${term.term} work?`,
      body: term.technicalExplanation,
    },
    {
      heading: `What are practical examples of ${term.term}?`,
      body: `These real-world examples show how ${term.term.toLowerCase()} shows up in modern search and AI answers:`,
      listItems: term.examples,
    },
    {
      heading: `How does ${term.term} compare to related SEO concepts?`,
      body: `${term.term} sits alongside related ideas that AI Overviews and traditional rankings both use. Use the related terms below to build topical coverage so answer engines can cite you as a complete source—not a single-keyword page.`,
      listItems: getExistingRelatedTerms(term.relatedTerms, 5).map(
        (rt) => rt.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
      ),
    },
    {
      heading: `What are the risks of ignoring ${term.term}?`,
      body: `Skipping ${term.term.toLowerCase()} usually means weaker extractability for AI Overviews, thinner topical authority, and slower ranking movement when competitors publish clearer, better-structured answers. Teams that treat ${term.term.toLowerCase()} as a one-off tactic—not an ongoing practice—lose citation share as answer engines refresh sources.`,
    },
    {
      heading: `How do Anthroly humans and AI agents help with ${term.term}?`,
      body: howAnthrolyServesBody([
        `**${term.term} execution**: Agents analyze gaps; humans write and place content so ${term.term.toLowerCase()} is implemented, measured, and improved.`,
      ]),
    },
  ];
  
  const faq: FAQ[] = [
    {
      question: `What is ${term.term} in simple terms?`,
      answer: term.definition,
    },
    {
      question: `Why is ${term.term} important for SEO and AEO?`,
      answer: `${term.term} affects how Google and AI answer engines extract, trust, and cite your content. Strong ${term.term.toLowerCase()} practice improves classic rankings and makes your pages easier to quote in AI Overviews.`,
    },
    {
      question: `How do I implement ${term.term} for my website?`,
      answer: `Start with an audit, ship answer-first content and technical fixes, then monitor Search Console and AI citations. Anthroly's agents plus human SEO team can run this loop monthly so execution does not stall.`,
    },
    {
      question: `What tools help with ${term.term}?`,
      answer: `Use Google Search Console for foundational data, crawler and citation checks for AI visibility, and platforms like Ahrefs or Semrush for competitive gaps. Pair tools with clear on-page answers and schema.`,
    },
    {
      question: `How does ${term.term} relate to AI Overviews?`,
      answer: `AI Overviews prefer clear, sourced paragraphs they can lift. Pages that define ${term.term.toLowerCase()} early, support it with examples and lists, and demonstrate expertise are more likely to be cited.`,
    },
  ];
  
  const internalLinks: InternalLink[] = [
    {
      url: '/glossary',
      anchorText: 'SEO Glossary',
      context: 'Parent category page',
    },
    {
      url: '/aeo',
      anchorText: 'Answer Engine Optimization hub',
      context: 'AEO pillar',
    },
    {
      url: '/#pricing',
      anchorText: 'AI Crawler Analysis',
      context: 'Related service for implementing this concept',
    },
    {
      url: BOOK_CALL_URL,
      anchorText: PRIMARY_CTA_LABEL,
      context: 'Conversion opportunity',
    },
    ...getExistingRelatedTerms(term.relatedTerms, 3).map(relatedSlug => ({
      url: `/glossary/${relatedSlug}`,
      anchorText: relatedSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
      context: 'Related glossary term',
    })),
  ];
  
  const relatedPages: RelatedPage[] = [
    ...getExistingRelatedTerms(term.relatedTerms, 2).map(relatedSlug => ({
      url: `/glossary/${relatedSlug}`,
      title: relatedSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
      playbook: 'glossary' as PlaybookType,
      relevanceScore: 90,
    })),
    {
      url: '/aeo',
      title: 'Answer Engine Optimization',
      playbook: 'glossary' as PlaybookType,
      relevanceScore: 85,
    },
    {
      url: '/for/seo-professionals',
      title: 'AI SEO for SEO Professionals',
      playbook: 'personas' as PlaybookType,
      relevanceScore: 75,
    },
  ];
  
  const schema: SchemaData = {
    type: 'DefinedTerm',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'DefinedTerm',
      name: term.term,
      description: term.definition,
      inDefinedTermSet: {
        '@type': 'DefinedTermSet',
        name: 'SEO and AI Marketing Glossary',
        url: absoluteUrl('/glossary'),
      },
    },
  };
  
  const page: PSEOPage = {
    url,
    slug,
    playbookType: 'glossary',
    seo: {
      title: `${term.term}: Definition, Examples & SEO Guide | Anthroly`,
      metaDescription: `${term.definition.slice(0, 130)}... Learn how ${term.term} impacts your SEO strategy.`,
      primaryKeyword: term.term.toLowerCase(),
      secondaryKeywords: [
        `what is ${term.term.toLowerCase()}`,
        `${term.term.toLowerCase()} definition`,
        `${term.term.toLowerCase()} example`,
        `${term.term.toLowerCase()} seo`,
      ],
      searchIntent: 'informational',
    },
    content: {
      h1: `What is ${term.term}?`,
      directAnswer,
      introduction: `This guide explains how ${term.term.toLowerCase()} works, how it compares to related concepts, when to use it, and how Anthroly's AI agents plus human-led SEO help you implement it for Google and AI answer engines.`,
      sections,
      faq,
      callToAction: commercialCta(
        `Ready to apply ${term.term}?`,
        `A 90-minute researched ${SYSTEM_NAME} audit that includes ${term.term.toLowerCase()} — credited 100% toward the sprint if you start within 7 days.`
      ),
    },
    schema,
    internalLinks,
    relatedPages,
    dataRequirementsUsed: ['glossaryTerm', 'relatedTerms', 'examples'],
    generatedAt: new Date().toISOString(),
    wordCount: 0, // Will be calculated
    qualityScore: 0, // Will be calculated
  };
  
  // Calculate metrics
  const validation = validatePage(page);
  page.wordCount = validation.metrics.wordCount;
  page.qualityScore = validation.metrics.uniquenessScore;
  
  return page;
}

// ============================================================================
// PERSONA PAGE GENERATOR
// ============================================================================

export function generatePersonaPage(persona: Persona): PSEOPage {
  const slug = `for/${persona.slug}`;
  const url = `/${slug}`;
  
  const directAnswer = `Anthroly helps ${persona.name}s grow organic and AI-search demand with the ${SYSTEM_NAME}: Discover, Trust, and Contact — without hiring a full in-house SEO team. Built for ${persona.title}s who need outcomes, not another dashboard.`;

  const sections: ContentSection[] = [
    {
      heading: `What challenges do ${persona.name}s face with SEO?`,
      body: `As a ${persona.title}, search visibility competes with everything else on your plate. Buyers now discover brands through Google and AI assistants, but most SEO plans still ignore answer engines. Common blockers:`,
      listItems: persona.painPoints,
    },
    {
      heading: `What do ${persona.name}s need from SEO and AEO?`,
      body: `${persona.name}s want compounding organic growth, clear ROI, and citation-ready content for AI Overviews—without building a large SEO org:`,
      listItems: persona.goals,
    },
    {
      heading: `How does Anthroly compare to traditional agencies?`,
      body: `Traditional SEO often fails ${persona.name}s because it is slow, report-heavy, and Google-only. Anthroly ships monthly with AI agents for analysis and humans for content and links—covering classic SEO and Answer Engine Optimization:`,
      listItems: persona.challenges,
    },
    {
      heading: `How do AI agents solve these problems?`,
      body: `Agents analyze and monitor; humans execute content and outreach. You stay focused on the business while we address each gap:`,
      listItems: persona.solutions,
    },
    {
      heading: `What do ${persona.name}s get with Anthroly?`,
      body: howAnthrolyServesBody([
        `**Role fit**: Built for ${persona.title}s in ${persona.industry}.`,
      ]),
      table: personaRoleTable(persona),
    },
    {
      heading: `When should a ${persona.title} start?`,
      body: `Start when organic CAC is rising, competitors appear in AI answers you do not, or you cannot staff SEO full-time. Most ${persona.name}s see delivery in 30 days and compounding gains by 90 days—domain authority, traffic, and AI citation share—without adding headcount.`,
    },
  ];
  
  const faq: FAQ[] = [
    {
      question: `Is Anthroly right for ${persona.name}s?`,
      answer: `Yes. Anthroly is built for ${persona.name}s who need SEO and AI-citation results without full-time SEO ops. Agents plus humans execute; you get weekly reports and strategic oversight.`,
    },
    {
      question: `How quickly will I see results?`,
      answer: `Most ${persona.name}s see the ${SPRINT_NAME} ship in 30 days, then monthly Discover / Trust / Contact work. Rankings and citations compound; we do not guarantee a traffic number. ${pricingAnswer(`Scoped to ${persona.title}s, not a bloated agency retainer.`)}`,
    },
    {
      question: `Do I need technical knowledge to use Anthroly?`,
      answer: `No. Our team handles technical SEO, content, and links. Reports stay clear for ${persona.name}s; deeper strategy calls are available when you want them.`,
    },
    {
      question: `How does Anthroly compare to hiring an in-house SEO or agency?`,
      answer: `In-house SEO often costs $8,000–$25,000+/month fully loaded. ${pricingAnswer(`You get the ${SYSTEM_NAME} instead of bloated overhead.`)}`,
    },
    {
      question: `What makes AI SEO and AEO different from traditional SEO?`,
      answer: `Traditional SEO targets Google blue links. AI SEO and AEO also optimize for AI Overviews and assistants like ChatGPT and Perplexity. Anthroly covers both so customers find you in classic search and AI answers.`,
    },
  ];
  
  const internalLinks: InternalLink[] = [
    {
      url: '/',
      anchorText: 'AI agents platform',
      context: 'Homepage',
    },
    {
      url: '/aeo',
      anchorText: 'Answer Engine Optimization',
      context: 'AEO hub',
    },
    {
      url: '/#pricing',
      anchorText: 'AI Crawler Analysis',
      context: 'Key service',
    },
    {
      url: '/#pricing',
      anchorText: 'View Pricing',
      context: 'Conversion opportunity',
    },
    {
      url: '/glossary/ai-seo',
      anchorText: 'What is AI SEO?',
      context: 'Educational content',
    },
    {
      url: '/glossary/answer-engine-optimization',
      anchorText: 'What is AEO?',
      context: 'Educational content',
    },
    {
      url: '/for',
      anchorText: 'All personas we serve',
      context: 'Parent category',
    },
  ];

  const personaGuide = citationGuideForPersona(persona.slug);
  if (personaGuide) {
    internalLinks.push({
      url: personaGuide.href,
      anchorText: personaGuide.title,
      context: 'Niche AI citations guide',
    });
  }
  
  const relatedPages: RelatedPage[] = [
    {
      url: '/aeo',
      title: 'Answer Engine Optimization',
      playbook: 'glossary' as PlaybookType,
      relevanceScore: 90,
    },
    {
      url: '/glossary/ai-seo',
      title: 'AI SEO Definition & Guide',
      playbook: 'glossary' as PlaybookType,
      relevanceScore: 85,
    },
    {
      url: '/glossary/generative-engine-optimization-geo',
      title: 'GEO: Generative Engine Optimization',
      playbook: 'glossary' as PlaybookType,
      relevanceScore: 80,
    },
  ];

  if (personaGuide) {
    relatedPages.push({
      url: personaGuide.href,
      title: personaGuide.title,
      playbook: 'glossary' as PlaybookType,
      relevanceScore: 88,
    });
  }
  
  const schema: SchemaData = {
    type: 'Service',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: `AI SEO for ${persona.name}s`,
      description: `AI agents and human-led SEO for ${persona.title}s in ${persona.industry}, optimized for Google and AI answer engines`,
      provider: {
        '@type': 'Organization',
        name: 'Anthroly',
        url: SITE_URL,
      },
      serviceType: 'AI SEO and Answer Engine Optimization',
      audience: {
        '@type': 'Audience',
        audienceType: persona.name,
      },
    },
  };
  
  const page: PSEOPage = {
    url,
    slug,
    playbookType: 'personas',
    seo: {
      title: `AI SEO for ${persona.name}s | ${persona.industry} SEO Solutions | Anthroly`,
      metaDescription: `Managed SEO for ${persona.name}s. The ${SYSTEM_NAME}: Discover, Trust, and Contact — without building an in-house team.`,
      primaryKeyword: `seo for ${persona.slug.replace(/-/g, ' ')}`,
      secondaryKeywords: [
        `${persona.industry.toLowerCase()} seo`,
        `${persona.name.toLowerCase()} seo services`,
        `ai seo for ${persona.slug.replace(/-/g, ' ')}`,
        `${persona.name.toLowerCase()} marketing`,
      ],
      searchIntent: 'commercial',
    },
    content: {
      h1: `AI Agents & SEO for ${persona.name}s`,
      directAnswer,
      introduction: `You're a ${persona.title} balancing growth with limited bandwidth. Between ${persona.challenges[0].toLowerCase()} and ${persona.challenges[1]?.toLowerCase() || 'competing priorities'}, full SEO + AEO execution rarely fits. Anthroly runs AI agents with human-led SEO so you stay visible in Google and AI answers.`,
      sections,
      faq,
      callToAction: commercialCta(
        `Get the diagnostic for ${persona.name}s`,
        `A 90-minute researched ${SYSTEM_NAME} audit for ${persona.title}s — credited 100% toward the sprint if you start within 7 days.`
      ),
    },
    schema,
    internalLinks,
    relatedPages,
    dataRequirementsUsed: ['persona', 'painPoints', 'goals', 'challenges', 'solutions'],
    generatedAt: new Date().toISOString(),
    wordCount: 0,
    qualityScore: 0,
  };
  
  const validation = validatePage(page);
  page.wordCount = validation.metrics.wordCount;
  page.qualityScore = validation.metrics.uniquenessScore;
  
  return page;
}

// ============================================================================
// LOCATION PAGE GENERATOR
// ============================================================================

export function generateLocationPage(location: Location): PSEOPage {
  const slug = `ai-seo-agency/${location.slug}`;
  const url = `/${slug}`;
  const locationName = locationLabel(location);
  
  const directAnswer = `Anthroly is a human-led SEO partner for ${location.city} businesses: local and national search plus AI Overview citation readiness through the ${SYSTEM_NAME} — so customers find you on Google and in AI answers.`;

  const sections: ContentSection[] = [
    {
      heading: `Why do ${location.city} businesses need AI-powered SEO?`,
      body: `${locationName} is a competitive market where digital visibility can make or break your business. ${location.localInsights[0]} ${location.localInsights[1] || ''} Traditional SEO alone is not enough—you need humans optimizing for Google and answer engines, with machines helping you ship.`,
    },
    locationMarketSection(location),
    {
      heading: `What makes the ${location.city} SEO landscape unique?`,
      body: `Local market context that should shape your SEO and AEO plan:`,
      listItems: location.localInsights,
    },
    {
      heading: `What does Anthroly deliver for ${location.city} businesses?`,
      body: howAnthrolyServesBody([
        `**Local + national visibility**: Rank for "${location.city} [your service]" while building broader authority.`,
        `**Market context**: ${location.localInsights[2] || location.localInsights[0]}`,
      ]),
    },
    {
      heading: `How does local SEO compare to AI SEO in ${location.city}?`,
      body: `${location.city} teams often pick Maps/local pack or content SEO. Anthroly does both: Google Business Profile, citations, and location content—plus domain authority and AI visibility. That hybrid matters where ${location.localInsights[2] || 'local and national competitors collide'}.`,
    },
    {
      heading: `When should a ${location.city} company start?`,
      body: `Start when local pack rankings stall, AI assistants omit your brand, or you cannot staff SEO. Anthroly works for ${location.city}-based companies and remote teams targeting ${location.state || location.country}.`,
    },
  ];
  
  const faq: FAQ[] = [
    {
      question: `Do I need to be in ${location.city} to work with Anthroly?`,
      answer: `No—we work with businesses worldwide. However, if you're targeting ${location.city} customers, we'll optimize specifically for that market including local search, regional keywords, and ${location.city}-specific content angles.`,
    },
    {
      question: `How is Anthroly different from other ${location.city} SEO agencies?`,
      answer: `Traditional ${location.city} SEO agencies often bill like senior consultants but move slowly. ${pricingAnswer(`Work is scoped to ${location.city} demand, including AI search engines many agencies still ignore.`)}`,
    },
    {
      question: `Can you help with local SEO for my ${location.city} business?`,
      answer: `Absolutely. Our team handles Google Business Profile optimization, local citation building, review management, and location-specific content creation. We combine this with broader SEO to build both local visibility and domain authority.`,
    },
    {
      question: `What industries do you serve in ${location.city}?`,
      answer: `We work with businesses across industries in ${location.city}—from SaaS and tech to professional services, e-commerce, and beyond. Our strategists adapt to your industry, competitors, and target keywords for customized optimization.`,
    },
    {
      question: `How long until I see results in ${location.city} search?`,
      answer: `Most ${location.city} businesses see initial improvements within 30 days, with significant results by 90 days. Local SEO improvements (Google Maps, local pack) often come faster, while broader organic rankings build over time. We provide weekly reports so you can track progress.`,
    },
  ];
  
  const internalLinks: InternalLink[] = [
    {
      url: '/',
      anchorText: 'Anthroly AI SEO Platform',
      context: 'Homepage',
    },
    {
      url: '/#pricing',
      anchorText: 'Free AI Crawler Analysis',
      context: 'Lead magnet',
    },
    {
      url: '/#pricing',
      anchorText: 'View Pricing',
      context: 'Conversion',
    },
    {
      url: '/glossary/local-seo',
      anchorText: 'What is Local SEO?',
      context: 'Educational',
    },
    {
      url: '/glossary/ai-seo',
      anchorText: 'AI SEO Explained',
      context: 'Educational',
    },
    {
      url: '/ai-seo-agency',
      anchorText: 'All Locations',
      context: 'Parent category',
    },
  ];
  
  const relatedPages: RelatedPage[] = [
    {
      url: '/glossary/local-seo',
      title: 'Local SEO Guide',
      playbook: 'glossary' as PlaybookType,
      relevanceScore: 90,
    },
    {
      url: '/for/small-business-owners',
      title: 'AI SEO for Small Businesses',
      playbook: 'personas' as PlaybookType,
      relevanceScore: 85,
    },
  ];
  
  const schema: SchemaData = {
    type: 'LocalBusiness',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: `Anthroly - AI SEO Agency ${location.city}`,
      description: `Managed SEO for ${location.city} businesses through the ${SYSTEM_NAME}: Discover, Trust, and Contact.`,
      url: absoluteUrl(url),
      areaServed: {
        '@type': 'City',
        name: location.city,
        containedInPlace: {
          '@type': location.state ? 'State' : 'Country',
          name: location.state || location.country,
        },
      },
      serviceType: ['AI SEO', 'Local SEO', 'Link Building', 'Content Marketing'],
    },
  };
  
  const page: PSEOPage = {
    url,
    slug,
    playbookType: 'locations',
    seo: {
      title: `AI SEO Agency in ${location.city} | Local + AI Search Optimization | Anthroly`,
      metaDescription: `${location.city} managed SEO. The ${SYSTEM_NAME} for local Google visibility and AI-search citations — not a thin city template.`,
      primaryKeyword: `ai seo agency ${location.city.toLowerCase()}`,
      secondaryKeywords: [
        `seo agency ${location.city.toLowerCase()}`,
        `${location.city.toLowerCase()} seo services`,
        `seo company ${location.city.toLowerCase()}`,
        `local seo ${location.city.toLowerCase()}`,
      ],
      searchIntent: 'commercial',
    },
    content: {
      h1: `AI SEO Agency in ${location.city}`,
      directAnswer,
      introduction: `Looking for SEO in ${location.city} that covers Google and AI answers? Anthroly pairs AI agents with human-led SEO for ${locationName}: monthly content, high-DR links, local optimization, and citation-ready structure competitors still ignore.`,
      sections,
      faq,
      callToAction: commercialCta(
        `Get the diagnostic for ${location.city}`,
        `A 90-minute researched ${SYSTEM_NAME} audit for businesses targeting ${location.city} — credited 100% toward the sprint if you start within 7 days.`
      ),
    },
    schema,
    internalLinks,
    relatedPages,
    dataRequirementsUsed: ['location', 'localInsights', 'city', 'state', 'country'],
    generatedAt: new Date().toISOString(),
    wordCount: 0,
    qualityScore: 0,
  };
  
  const validation = validatePage(page);
  page.wordCount = validation.metrics.wordCount;
  page.qualityScore = validation.metrics.uniquenessScore;
  
  return page;
}

// ============================================================================
// INTEGRATION PAGE GENERATOR
// ============================================================================

export function generateIntegrationPage(integration: Integration): PSEOPage {
  const slug = `integrations/${integration.slug}`;
  const url = `/${slug}`;
  
  const sections: ContentSection[] = [
    {
      heading: `Why Integrate AI SEO with ${integration.name}?`,
      body: integration.description + ` When combined with Anthroly's managed SEO program, ${integration.name} becomes even more powerful—enabling consistent optimization workflows that drive organic growth while you focus on your core business.`,
    },
    {
      heading: `Setting Up ${integration.name} for SEO Success`,
      body: `Proper integration setup is crucial for maximizing your SEO results. Follow these steps to ensure ${integration.name} works seamlessly with your SEO strategy:`,
      listItems: integration.setupSteps,
    },
    {
      heading: `${integration.name} SEO Use Cases`,
      body: `${integration.name} enables powerful SEO workflows when properly configured. Here are the most valuable use cases:`,
      listItems: integration.useCases,
    },
    {
      heading: `Key Benefits of ${integration.name} Integration`,
      body: `Understanding the advantages helps you maximize value from your ${integration.name} SEO integration:`,
      listItems: integration.benefits,
    },
    {
      heading: `How Anthroly Enhances ${integration.name}`,
      body: `Anthroly's managed SEO service extends ${integration.name}'s capabilities with hands-on optimization, content workflows, and reporting. Our team can:

- **Publish optimized content** directly to ${integration.name} with on-page SEO built in
- **Monitor performance** and adjust priorities based on ranking and traffic changes
- **Deliver reports** combining ${integration.name} data with broader SEO metrics
- **Keep execution consistent** month over month without adding headcount

This integration creates a flywheel effect: ${integration.name} handles your core workflow while Anthroly keeps search execution moving forward.`,
    },
  ];
  
  const faq: FAQ[] = [
    {
      question: `Does Anthroly integrate with ${integration.name}?`,
      answer: `Yes, Anthroly works seamlessly with ${integration.name}. Our team can push optimized content, sync data, and run SEO workflows through ${integration.name}'s API and native integrations.`,
    },
    {
      question: `Do I need technical skills to set up the ${integration.name} integration?`,
      answer: `Basic setup is straightforward and our team provides guidance. For advanced automation and custom workflows, we offer implementation support to ensure everything works perfectly.`,
    },
    {
      question: `What SEO improvements can I expect with ${integration.name} integration?`,
      answer: `Typical improvements include streamlined content workflows, consistent on-page optimization, automated technical SEO maintenance, and better tracking of SEO performance. Results compound over time as the integration runs more of your SEO execution.`,
    },
    {
      question: `Can I use ${integration.name} with Anthroly's content production?`,
      answer: `Absolutely. Our writers and editors produce SEO-ready content and we publish it to ${integration.name} with meta tags, schema markup, and internal linking—so you're not stuck doing it yourself.`,
    },
    {
      question: `How does the integration help with AI search optimization?`,
      answer: `${integration.name} integration ensures your content is properly structured and marked up for AI search engines to understand. Combined with Anthroly's GEO optimization, this helps you appear in ChatGPT, Claude, and Perplexity responses—not just traditional search.`,
    },
  ];
  
  const internalLinks: InternalLink[] = [
    {
      url: '/',
      anchorText: 'Anthroly Platform',
      context: 'Homepage',
    },
    {
      url: '/#pricing',
      anchorText: 'AI Crawler Analysis',
      context: 'Service',
    },
    {
      url: '/#pricing',
      anchorText: 'View Pricing',
      context: 'Conversion',
    },
    {
      url: '/integrations',
      anchorText: 'All Integrations',
      context: 'Parent category',
    },
    {
      url: '/glossary/technical-seo',
      anchorText: 'Technical SEO Guide',
      context: 'Educational',
    },
    {
      url: '/for/startup-ctos',
      anchorText: 'AI SEO for CTOs',
      context: 'Related persona',
    },
  ];
  
  const relatedPages: RelatedPage[] = [
    {
      url: '/glossary/technical-seo',
      title: 'Technical SEO Guide',
      playbook: 'glossary' as PlaybookType,
      relevanceScore: 80,
    },
    {
      url: '/for/startup-ctos',
      title: 'AI SEO for Technical Leaders',
      playbook: 'personas' as PlaybookType,
      relevanceScore: 75,
    },
  ];
  
  const schema: SchemaData = {
    type: 'HowTo',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: `How to Integrate ${integration.name} with AI SEO`,
      description: `Step-by-step guide to setting up ${integration.name} for SEO success with Anthroly.`,
      step: integration.setupSteps.map((step, index) => ({
        '@type': 'HowToStep',
        position: index + 1,
        text: step,
      })),
    },
  };
  
  const page: PSEOPage = {
    url,
    slug,
    playbookType: 'integrations',
    seo: {
      title: `${integration.name} SEO Integration | Setup Guide & Use Cases | Anthroly`,
      metaDescription: `Learn how to integrate ${integration.name} with AI-powered SEO. Setup steps, use cases, and automation workflows for maximum organic growth.`,
      primaryKeyword: `${integration.name.toLowerCase()} seo integration`,
      secondaryKeywords: [
        `${integration.name.toLowerCase()} seo`,
        `${integration.name.toLowerCase()} seo setup`,
        `${integration.name.toLowerCase()} optimization`,
        `seo ${integration.name.toLowerCase()} integration`,
      ],
      searchIntent: 'informational',
    },
    content: {
      h1: `${integration.name} SEO Integration`,
      introduction: `${integration.name} is a powerful tool in your tech stack, but are you maximizing its SEO potential? This guide shows you how to integrate ${integration.name} with modern SEO practices—including AI-powered optimization—to drive sustainable organic growth. Whether you're setting up from scratch or optimizing an existing implementation, we'll cover everything you need to know.`,
      sections,
      faq,
      callToAction: {
        headline: `Supercharge Your ${integration.name} with AI SEO`,
        description: `See how Anthroly can automate your ${integration.name} SEO workflows. Get a free analysis showing your current gaps and opportunities.`,
        buttonText: PRIMARY_CTA_LABEL,
        buttonUrl: BOOK_CALL_URL,
      },
    },
    schema,
    internalLinks,
    relatedPages,
    dataRequirementsUsed: ['integration', 'setupSteps', 'useCases', 'benefits'],
    generatedAt: new Date().toISOString(),
    wordCount: 0,
    qualityScore: 0,
  };
  
  const validation = validatePage(page);
  page.wordCount = validation.metrics.wordCount;
  page.qualityScore = validation.metrics.uniquenessScore;
  
  return page;
}

// ============================================================================
// COMPARISON PAGE GENERATOR
// ============================================================================

export function generateToolComparisonPage(toolA: Tool, toolB: Tool): PSEOPage {
  const slug = `compare/${toolA.slug}-vs-${toolB.slug}`;
  const url = `/${slug}`;
  
  // Build feature comparison
  const allFeatures = [...new Set([...toolA.features, ...toolB.features])];
  
  const sections: ContentSection[] = [
    {
      heading: `${toolA.name} vs ${toolB.name}: Overview`,
      body: `Choosing between ${toolA.name} and ${toolB.name} depends on your specific needs, budget, and technical requirements. Both are respected tools in the ${toolA.category} space, but they serve different use cases and offer distinct advantages.

**${toolA.name}**: ${toolA.description}

**${toolB.name}**: ${toolB.description}`,
    },
    {
      heading: `${toolA.name} Pros and Cons`,
      body: `Understanding ${toolA.name}'s strengths and weaknesses helps you determine if it's the right fit:

**Pros:**
${toolA.pros.map(p => `- ${p}`).join('\n')}

**Cons:**
${toolA.cons.map(c => `- ${c}`).join('\n')}`,
    },
    {
      heading: `${toolB.name} Pros and Cons`,
      body: `Here's what you need to know about ${toolB.name}:

**Pros:**
${toolB.pros.map(p => `- ${p}`).join('\n')}

**Cons:**
${toolB.cons.map(c => `- ${c}`).join('\n')}`,
    },
    {
      heading: `Feature Comparison: ${toolA.name} vs ${toolB.name}`,
      body: `Both tools offer comprehensive feature sets, but the implementation and depth varies:

| Feature | ${toolA.name} | ${toolB.name} |
|---------|---------------|---------------|
${toolA.features.slice(0, 5).map(f => `| ${f} | ✓ | ${toolB.features.some(bf => bf.toLowerCase().includes(f.toLowerCase().split(' ')[0])) ? '✓' : '—'} |`).join('\n')}
${toolB.features.slice(0, 3).filter(f => !toolA.features.some(af => af.toLowerCase().includes(f.toLowerCase().split(' ')[0]))).map(f => `| ${f} | — | ✓ |`).join('\n')}`,
    },
    {
      heading: `Pricing Comparison`,
      body: `Budget is often a deciding factor:

**${toolA.name}**: ${toolA.pricing || 'Contact for pricing'}

**${toolB.name}**: ${toolB.pricing || 'Contact for pricing'}

Consider the total cost of ownership including training, additional features, and scaling costs as your needs grow.`,
    },
    {
      heading: `Our Verdict: When to Choose Each Tool`,
      body: `**Choose ${toolA.name} if:**
${toolA.pros.slice(0, 3).map(p => `- You prioritize ${p.toLowerCase()}`).join('\n')}

**Choose ${toolB.name} if:**
${toolB.pros.slice(0, 3).map(p => `- You need ${p.toLowerCase()}`).join('\n')}

**Or consider Anthroly:** If your main goal is growing organic traffic without becoming an SEO tool expert, Anthroly's managed SEO service handles execution automatically. We use the best tools internally so you don't have to choose—or manage—them yourself.`,
    },
  ];
  
  const faq: FAQ[] = [
    {
      question: `Is ${toolA.name} or ${toolB.name} better for beginners?`,
      answer: `${toolA.pros.some(p => p.toLowerCase().includes('beginner') || p.toLowerCase().includes('easy')) ? toolA.name : toolB.name} is generally more beginner-friendly due to its ${toolA.pros.some(p => p.toLowerCase().includes('beginner') || p.toLowerCase().includes('easy')) ? 'intuitive interface and learning resources' : 'straightforward setup process'}. However, both tools have learning curves that require time investment.`,
    },
    {
      question: `Can I use both ${toolA.name} and ${toolB.name} together?`,
      answer: `Yes, many SEO professionals use multiple tools to leverage each tool's strengths. ${toolA.name} and ${toolB.name} complement each other well in certain workflows. However, this increases cost and complexity—which is why many teams opt for comprehensive platforms or AI-powered solutions like Anthroly.`,
    },
    {
      question: `Which tool has better data accuracy?`,
      answer: `Both ${toolA.name} and ${toolB.name} use different data collection methodologies. ${toolA.name} is known for ${toolA.pros[0]?.toLowerCase() || 'comprehensive data'}, while ${toolB.name} excels at ${toolB.pros[0]?.toLowerCase() || 'detailed analysis'}. For critical decisions, cross-referencing data from multiple sources is recommended.`,
    },
    {
      question: `Do I need ${toolA.name} or ${toolB.name} if I use Anthroly?`,
      answer: `Not necessarily. Anthroly handles SEO execution automatically, using enterprise-grade tools and data sources internally. You get the benefits without managing subscriptions, learning interfaces, or interpreting data yourself. Our automated reports give you the insights you need without the tool overhead.`,
    },
    {
      question: `What's the best alternative to ${toolA.name} and ${toolB.name}?`,
      answer: `Alternatives depend on your primary use case. For comprehensive SEO, consider Moz Pro or SE Ranking. For a different approach, Anthroly runs the ${SYSTEM_NAME} so you get execution instead of another dashboard. ${pricingAnswer('')}`,
    },
  ];
  
  const internalLinks: InternalLink[] = [
    {
      url: '/',
      anchorText: 'AI SEO Platform',
      context: 'Homepage',
    },
    {
      url: '/#pricing',
      anchorText: 'Anthroly Pricing',
      context: 'Alternative option',
    },
    {
      url: '/compare',
      anchorText: 'All Comparisons',
      context: 'Parent category',
    },
    {
      url: '/glossary/technical-seo',
      anchorText: 'Technical SEO',
      context: 'Educational',
    },
    {
      url: '/for/seo-professionals',
      anchorText: 'SEO Professional Resources',
      context: 'Related persona',
    },
    {
      url: `/tools/${toolA.slug}`,
      anchorText: `${toolA.name} Profile`,
      context: 'Tool profile',
    },
  ];
  
  const relatedPages: RelatedPage[] = [
    {
      url: '/for/seo-professionals',
      title: 'AI SEO for SEO Professionals',
      playbook: 'personas' as PlaybookType,
      relevanceScore: 80,
    },
    {
      url: '/glossary/technical-seo',
      title: 'Technical SEO Guide',
      playbook: 'glossary' as PlaybookType,
      relevanceScore: 75,
    },
  ];
  
  const schema: SchemaData = {
    type: 'Article',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: `${toolA.name} vs ${toolB.name}: Comprehensive Comparison`,
      description: `In-depth comparison of ${toolA.name} and ${toolB.name} including features, pricing, pros, cons, and recommendations.`,
      author: {
        '@type': 'Organization',
        name: 'Anthroly',
      },
      publisher: {
        '@type': 'Organization',
        name: 'Anthroly',
        url: SITE_URL,
      },
    },
  };
  
  const page: PSEOPage = {
    url,
    slug,
    playbookType: 'comparisons',
    seo: {
      title: `${toolA.name} vs ${toolB.name}: Complete Comparison Guide (2026) | Anthroly`,
      metaDescription: `${toolA.name} vs ${toolB.name}: Detailed comparison of features, pricing, pros & cons. Find out which SEO tool is right for you.`,
      primaryKeyword: `${toolA.name.toLowerCase()} vs ${toolB.name.toLowerCase()}`,
      secondaryKeywords: [
        `${toolA.name.toLowerCase()} versus ${toolB.name.toLowerCase()}`,
        `${toolA.name.toLowerCase()} or ${toolB.name.toLowerCase()}`,
        `${toolA.name.toLowerCase()} comparison`,
        `${toolB.name.toLowerCase()} alternative`,
      ],
      searchIntent: 'commercial',
    },
    content: {
      h1: `${toolA.name} vs ${toolB.name}: Which Is Better?`,
      introduction: `Deciding between ${toolA.name} and ${toolB.name}? You're not alone—it's one of the most common tool decisions in SEO. Both are powerful platforms with loyal user bases, but they excel in different areas. This comparison breaks down everything you need to know: features, pricing, pros, cons, and our honest verdict on when to choose each. We'll also explain when you might not need either—and what to do instead.`,
      sections,
      faq,
      callToAction: {
        headline: 'Skip the Tool Overwhelm',
        description: `Instead of managing SEO tools yourself, let Anthroly's team handle execution. We use the best tools internally so you get results without the complexity.`,
        buttonText: PRIMARY_CTA_LABEL,
        buttonUrl: BOOK_CALL_URL,
      },
    },
    schema,
    internalLinks,
    relatedPages,
    dataRequirementsUsed: ['tool', 'features', 'pros', 'cons', 'pricing'],
    generatedAt: new Date().toISOString(),
    wordCount: 0,
    qualityScore: 0,
  };
  
  const validation = validatePage(page);
  page.wordCount = validation.metrics.wordCount;
  page.qualityScore = validation.metrics.uniquenessScore;
  
  return page;
}

// ============================================================================
// BATCH GENERATION
// ============================================================================

export interface BatchGenerationResult {
  successful: PSEOPage[];
  failed: { input: unknown; reason: string }[];
  stats: {
    total: number;
    successful: number;
    failed: number;
    averageWordCount: number;
    averageQualityScore: number;
  };
}

export function resetGenerationState(): void {
  generatedSlugs.clear();
  generatedPrimaryKeywords.clear();
}
