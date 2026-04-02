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
  
  const sections: ContentSection[] = [
    {
      heading: `What is ${term.term}?`,
      body: term.definition,
    },
    {
      heading: `${term.term}: A Technical Deep Dive`,
      body: term.technicalExplanation,
    },
    {
      heading: `Practical Examples of ${term.term}`,
      body: `Understanding ${term.term} becomes clearer with real-world applications. Here are concrete examples that illustrate how this concept works in practice:`,
      listItems: term.examples,
    },
    {
      heading: `Why ${term.term} Matters for Your SEO Strategy`,
      body: `In the evolving landscape of search, understanding ${term.term} is no longer optional—it's essential. As AI-powered search engines like ChatGPT, Claude, and Perplexity reshape how users find information, mastering concepts like ${term.term} gives you a competitive edge. This knowledge helps you build strategies that work across both traditional and AI-powered search, ensuring your business remains visible wherever your customers are looking.`,
    },
    {
      heading: `How Anthroly Helps with ${term.term}`,
      body: `At Anthroly, we've built AI systems that automatically optimize your presence for concepts like ${term.term}. Our AI Crawler Analysis identifies gaps in your ${term.term.toLowerCase()} strategy, while our 24/7 AI agents continuously work to improve your visibility. Whether it's generating optimized content, building high-quality backlinks, or monitoring your competitive position, our AI-powered approach ensures you stay ahead in both traditional SEO and the emerging AI search landscape.`,
    },
  ];
  
  const faq: FAQ[] = [
    {
      question: `What is ${term.term} in simple terms?`,
      answer: term.definition,
    },
    {
      question: `Why is ${term.term} important for SEO?`,
      answer: `${term.term} is crucial because it directly impacts how search engines and AI systems understand and rank your content. Mastering this concept helps you build more effective SEO strategies that drive organic traffic and improve visibility in both traditional and AI-powered search results.`,
    },
    {
      question: `How do I implement ${term.term} for my website?`,
      answer: `Implementation starts with understanding your current state through an SEO audit, then systematically applying ${term.term.toLowerCase()} best practices. This typically involves technical optimizations, content strategy adjustments, and ongoing monitoring. For complex implementations, working with an AI-powered SEO agency like Anthroly can accelerate results through automated optimization and expert guidance.`,
    },
    {
      question: `What tools help with ${term.term}?`,
      answer: `Several tools can help you implement and monitor ${term.term}, including Google Search Console for foundational data, dedicated SEO platforms like Ahrefs and Semrush for advanced analysis, and AI-powered tools for automation. The right combination depends on your specific needs and technical resources.`,
    },
    {
      question: `How does ${term.term} relate to AI search optimization?`,
      answer: `As AI-powered search engines become more prevalent, ${term.term} takes on new dimensions. AI systems interpret and weight this concept differently than traditional search algorithms, making it essential to optimize for both. Understanding these nuances ensures your content performs well across ChatGPT, Perplexity, Claude, and traditional search engines.`,
    },
  ];
  
  const internalLinks: InternalLink[] = [
    {
      url: '/glossary',
      anchorText: 'SEO Glossary',
      context: 'Parent category page',
    },
    {
      url: '/#ai-crawler',
      anchorText: 'AI Crawler Analysis',
      context: 'Related service for implementing this concept',
    },
    {
      url: '/#pricing',
      anchorText: 'Book a call',
      context: 'Conversion opportunity',
    },
    ...term.relatedTerms.slice(0, 3).map(relatedSlug => ({
      url: `/glossary/${relatedSlug}`,
      anchorText: relatedSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
      context: 'Related glossary term',
    })),
  ];
  
  const relatedPages: RelatedPage[] = [
    ...term.relatedTerms.slice(0, 2).map(relatedSlug => ({
      url: `/glossary/${relatedSlug}`,
      title: relatedSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
      playbook: 'glossary' as PlaybookType,
      relevanceScore: 90,
    })),
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
        url: 'https://anthroly.com/glossary',
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
      h1: `${term.term}: The Complete Guide`,
      introduction: `${term.term} is a fundamental concept that shapes modern search engine optimization. Whether you're new to SEO or a seasoned professional, understanding ${term.term.toLowerCase()} is essential for building effective strategies that drive organic traffic. In this comprehensive guide, we'll explore what ${term.term.toLowerCase()} means, why it matters, and how you can leverage it to improve your search visibility in both traditional and AI-powered search engines.`,
      sections,
      faq,
      callToAction: {
        headline: `Ready to Master ${term.term}?`,
        description: `Let our AI-powered platform automatically optimize your site for ${term.term.toLowerCase()} and hundreds of other ranking factors. Start with a free AI Crawler Analysis.`,
        buttonText: 'Get Your Free Analysis',
        buttonUrl: '/#ai-crawler',
      },
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
  
  const sections: ContentSection[] = [
    {
      heading: `The Challenge: Why ${persona.name}s Struggle with SEO`,
      body: `As a ${persona.title}, you face unique challenges when it comes to search visibility. The digital landscape has shifted dramatically—40% of searches now happen through AI assistants like ChatGPT and Claude, yet most SEO strategies are still built for the old paradigm. Let's examine the specific obstacles standing between you and organic growth:`,
      listItems: persona.painPoints,
    },
    {
      heading: `What ${persona.name}s Actually Need from SEO`,
      body: `Understanding your goals is the first step toward achieving them. ${persona.name}s consistently tell us they're looking for sustainable, measurable growth without the overhead of building internal teams. Here's what matters most:`,
      listItems: persona.goals,
    },
    {
      heading: `The Roadblocks: Why Traditional SEO Falls Short`,
      body: `Traditional SEO approaches often fail ${persona.name}s because they weren't designed for your reality. Limited time, competing priorities, and the rapid pace of AI-driven change create a perfect storm of challenges:`,
      listItems: persona.challenges,
    },
    {
      heading: `How AI-Powered SEO Solves These Problems`,
      body: `This is where Anthroly's AI-native approach changes everything. Instead of throwing more human hours at the problem, we've built AI systems that work 24/7 to grow your organic presence. Here's how we address each challenge:`,
      listItems: persona.solutions,
    },
    {
      heading: `The Anthroly Advantage for ${persona.name}s`,
      body: `Our platform was built specifically for busy professionals like you who need results without the overhead. Here's what you get:

**AI Crawler Analysis**: Our AI audits your site and identifies exactly where you're invisible to AI search engines, with prioritized recommendations.

**24/7 AI Visibility Monitoring**: Continuous monitoring of how ChatGPT, Claude, and Perplexity reference your brand and competitors.

**30 SEO Blogs/Month**: AI-generated, human-refined content that builds topical authority and captures search traffic.

**AI Backlink Agents**: Our AI agents acquire 20-30 high-quality backlinks monthly (DR 70-90 average) while you focus on your business.

**Programmatic SEO**: Automated generation of conversion-focused landing pages that capture long-tail search traffic.

**Automated Reporting**: Weekly performance reports delivered to your inbox—no dashboards to check, no metrics to decipher.`,
    },
    {
      heading: `Real Results for ${persona.industry} Professionals`,
      body: `${persona.name}s using Anthroly typically see significant improvements within the first 90 days. Domain authority increases averaging 12 points, 340%+ organic traffic growth, and consistent high-quality backlink acquisition. But perhaps most importantly, they achieve this without adding headcount or spending hours on SEO execution.

Our AI-first approach means you get enterprise-level SEO execution at a fraction of the cost and time investment of traditional agencies or in-house teams. The future of search is AI—your SEO strategy should be too.`,
    },
  ];
  
  const faq: FAQ[] = [
    {
      question: `Is Anthroly right for ${persona.name}s?`,
      answer: `Yes, Anthroly is specifically designed for ${persona.name}s who need powerful SEO results without the time investment of traditional approaches. Our AI handles the execution while you maintain strategic oversight through automated reports and a dedicated account manager.`,
    },
    {
      question: `How quickly will I see results?`,
      answer: `Most ${persona.name}s see initial improvements within 30 days, with significant results by 90 days. This includes backlink acquisition (20-30 high-DR links monthly), content publication (30 blogs/month), and improved rankings for target keywords. SEO compounds over time, so results accelerate the longer you work with us.`,
    },
    {
      question: `Do I need technical knowledge to use Anthroly?`,
      answer: `No technical expertise required. Our platform handles all technical SEO, content optimization, and implementation automatically. You receive clear, jargon-free reports showing your progress and ROI. For ${persona.name}s who want deeper involvement, we provide strategic consultation calls as needed.`,
    },
    {
      question: `How does Anthroly compare to hiring an in-house SEO or agency?`,
      answer: `Traditional SEO teams cost $8,000-$25,000+ monthly when you factor in salaries, tools, and overhead. Agencies often charge similar rates with inconsistent results. Anthroly delivers more output (30 blogs, 20-30 backlinks, continuous optimization) at a fraction of the cost because our AI automates what humans do manually.`,
    },
    {
      question: `What makes AI SEO different from traditional SEO?`,
      answer: `AI SEO addresses a new reality: 40% of searches now happen through AI assistants like ChatGPT and Claude. Traditional SEO only optimizes for Google. Anthroly optimizes for both—ensuring you're visible whether customers search through Google, ask ChatGPT, or query Perplexity. Plus, our AI agents work 24/7, executing at a pace and scale impossible for human teams.`,
    },
  ];
  
  const internalLinks: InternalLink[] = [
    {
      url: '/',
      anchorText: 'AI SEO Platform',
      context: 'Homepage',
    },
    {
      url: '/#ai-crawler',
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
      url: '/glossary/generative-engine-optimization-geo',
      anchorText: 'Learn about GEO',
      context: 'Educational content',
    },
    {
      url: '/for',
      anchorText: 'All Industries We Serve',
      context: 'Parent category',
    },
  ];
  
  const relatedPages: RelatedPage[] = [
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
  
  const schema: SchemaData = {
    type: 'Service',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: `AI SEO for ${persona.name}s`,
      description: `AI-powered SEO services designed specifically for ${persona.title}s in ${persona.industry}`,
      provider: {
        '@type': 'Organization',
        name: 'Anthroly',
        url: 'https://anthroly.com',
      },
      serviceType: 'AI SEO Services',
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
      metaDescription: `AI-powered SEO built for ${persona.name}s. Get 30 blogs/month, 20-30 high-DR backlinks, and 24/7 AI optimization—without the overhead. See how it works.`,
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
      h1: `AI SEO Built for ${persona.name}s`,
      introduction: `You're a ${persona.title} with too much to do and too little time. SEO is important—you know that—but executing it effectively? That's another story. Between ${persona.challenges[0].toLowerCase()} and ${persona.challenges[1]?.toLowerCase() || 'managing competing priorities'}, finding the bandwidth for comprehensive SEO feels impossible. That's exactly why we built Anthroly: AI-powered SEO that works while you focus on what matters most.`,
      sections,
      faq,
      callToAction: {
        headline: `Ready to See AI SEO in Action?`,
        description: `Get a free AI Crawler Analysis showing exactly how visible you are to AI search engines—and how to fix it. No commitment, no sales pitch, just actionable insights.`,
        buttonText: 'Get Your Free Analysis',
        buttonUrl: '/#ai-crawler',
      },
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
  const locationName = location.state 
    ? `${location.city}, ${location.state}` 
    : `${location.city}, ${location.country}`;
  
  const sections: ContentSection[] = [
    {
      heading: `Why ${location.city} Businesses Need AI-Powered SEO`,
      body: `${locationName} is a competitive market where digital visibility can make or break your business. ${location.localInsights[0]} ${location.localInsights[1] || ''} In this environment, traditional SEO isn't enough—you need AI-powered optimization that works 24/7 to keep you ahead of local competitors and visible to the growing number of customers using AI search.`,
    },
    {
      heading: `The ${location.city} SEO Landscape`,
      body: `Understanding your local market is crucial for SEO success. Here's what makes ${location.city} unique:`,
      listItems: location.localInsights,
    },
    {
      heading: `What Anthroly Delivers for ${location.city} Businesses`,
      body: `Our AI-native SEO platform provides everything ${location.city} businesses need to dominate both traditional and AI-powered search:

**Local + Global Visibility**: We optimize for "${location.city} [your service]" searches while building authority that drives traffic from anywhere.

**AI Search Optimization**: 40% of searches now happen through ChatGPT, Claude, and Perplexity. We ensure ${location.city} customers find you there too.

**High-Quality Content**: 30 SEO blogs monthly, written by AI and refined by humans, establishing your ${location.city} business as an industry authority.

**Premium Backlinks**: 20-30 high-DR (70-90) backlinks monthly. We acquire links from publications your ${location.city} competitors can't reach.

**Automated Everything**: From technical SEO to content publishing to reporting—our AI handles execution while you run your business.`,
    },
    {
      heading: `Local SEO + AI SEO: The Winning Combination`,
      body: `${location.city} businesses often choose between local SEO (Google Maps, local pack) and broader content SEO. With Anthroly, you get both. Our AI optimizes your Google Business Profile, builds local citations, and creates location-specific content—while simultaneously building the domain authority and AI visibility that drives traffic from anywhere.

This hybrid approach is especially powerful in ${location.city}, where ${location.localInsights[2] || 'businesses face increasing competition from both local and national players'}.`,
    },
    {
      heading: `Serving ${location.city} and Beyond`,
      body: `While we specialize in helping ${location.city} businesses succeed, Anthroly works with companies worldwide. Our AI-powered approach isn't limited by geography—we can optimize for any market, any language, and any search engine. Whether you're a local ${location.city} business or a company looking to expand into ${location.state || location.country}, our platform scales with your ambitions.`,
    },
  ];
  
  const faq: FAQ[] = [
    {
      question: `Do I need to be in ${location.city} to work with Anthroly?`,
      answer: `No—we work with businesses worldwide. However, if you're targeting ${location.city} customers, we'll optimize specifically for that market including local search, regional keywords, and ${location.city}-specific content angles.`,
    },
    {
      question: `How is Anthroly different from other ${location.city} SEO agencies?`,
      answer: `Traditional ${location.city} SEO agencies rely on human teams—which means limited output and high costs. Anthroly uses AI to execute at scale: 30 blogs/month, 20-30 high-DR backlinks, and continuous optimization. You get more output at a fraction of the cost, plus optimization for AI search engines that most agencies don't even understand yet.`,
    },
    {
      question: `Can you help with local SEO for my ${location.city} business?`,
      answer: `Absolutely. Our platform handles Google Business Profile optimization, local citation building, review management, and location-specific content creation. We combine this with broader SEO to build both local visibility and domain authority.`,
    },
    {
      question: `What industries do you serve in ${location.city}?`,
      answer: `We work with businesses across industries in ${location.city}—from SaaS and tech to professional services, e-commerce, and beyond. Our AI adapts to your specific industry, competitors, and target keywords for customized optimization.`,
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
      url: '/#ai-crawler',
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
      description: `AI-powered SEO services for ${location.city} businesses. 30 blogs/month, 20-30 high-DR backlinks, 24/7 AI optimization.`,
      url: `https://anthroly.com${url}`,
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
      metaDescription: `${location.city}'s AI-powered SEO agency. Get 30 blogs/month, 20-30 high-DR backlinks, and 24/7 AI optimization for local and AI search visibility.`,
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
      introduction: `Looking for an SEO agency in ${location.city} that actually delivers? Anthroly brings AI-powered SEO to ${locationName} businesses—combining local search optimization with cutting-edge AI visibility. While traditional ${location.city} agencies promise results, our AI works 24/7 to execute at a scale and speed human teams can't match. 30 optimized blogs monthly. 20-30 high-DR backlinks. Continuous technical optimization. And optimization for AI search engines that your competitors aren't even thinking about yet.`,
      sections,
      faq,
      callToAction: {
        headline: `See How Visible Your ${location.city} Business Is`,
        description: `Get a free AI Crawler Analysis showing exactly how you appear in AI search results—and what it takes to dominate ${location.city} search.`,
        buttonText: 'Get Your Free Analysis',
        buttonUrl: '/#ai-crawler',
      },
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
      body: integration.description + ` When combined with Anthroly's AI-powered SEO platform, ${integration.name} becomes even more powerful—enabling automated optimization workflows that drive organic growth while you focus on your core business.`,
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
      body: `Anthroly's AI-powered platform extends ${integration.name}'s capabilities with automated optimization, content generation, and intelligent workflows. Our AI agents can:

- **Automate content publishing** directly to ${integration.name} with SEO optimization built-in
- **Monitor performance** and trigger optimization workflows based on ranking changes
- **Generate reports** combining ${integration.name} data with broader SEO metrics
- **Scale execution** beyond what manual processes allow

This integration creates a flywheel effect: ${integration.name} handles your core workflow while Anthroly's AI continuously optimizes for search visibility.`,
    },
  ];
  
  const faq: FAQ[] = [
    {
      question: `Does Anthroly integrate with ${integration.name}?`,
      answer: `Yes, Anthroly works seamlessly with ${integration.name}. Our platform can push optimized content, sync data, and automate SEO workflows through ${integration.name}'s API and native integrations.`,
    },
    {
      question: `Do I need technical skills to set up the ${integration.name} integration?`,
      answer: `Basic setup is straightforward and our team provides guidance. For advanced automation and custom workflows, we offer implementation support to ensure everything works perfectly.`,
    },
    {
      question: `What SEO improvements can I expect with ${integration.name} integration?`,
      answer: `Typical improvements include streamlined content workflows, consistent on-page optimization, automated technical SEO maintenance, and better tracking of SEO performance. Results compound over time as the integration automates more of your SEO execution.`,
    },
    {
      question: `Can I use ${integration.name} with Anthroly's AI content generation?`,
      answer: `Absolutely. Our AI can generate SEO-optimized content and publish it directly to ${integration.name}, complete with meta tags, schema markup, and internal linking—all without manual intervention.`,
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
      url: '/#ai-crawler',
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
      description: `Step-by-step guide to setting up ${integration.name} for SEO success with Anthroly's AI platform.`,
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
        description: `See how Anthroly's AI platform can automate your ${integration.name} SEO workflows. Get a free analysis showing your current gaps and opportunities.`,
        buttonText: 'Get Your Free Analysis',
        buttonUrl: '/#ai-crawler',
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

**Or consider Anthroly:** If your main goal is growing organic traffic without becoming an SEO tool expert, Anthroly's AI-powered platform handles execution automatically. We use the best tools internally so you don't have to choose—or manage—them yourself.`,
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
      answer: `Not necessarily. Anthroly's AI platform handles SEO execution automatically, using enterprise-grade tools and data sources internally. You get the benefits without managing subscriptions, learning interfaces, or interpreting data yourself. Our automated reports give you the insights you need without the tool overhead.`,
    },
    {
      question: `What's the best alternative to ${toolA.name} and ${toolB.name}?`,
      answer: `Alternatives depend on your primary use case. For comprehensive SEO, consider Moz Pro or SE Ranking. For a completely different approach, Anthroly uses AI to execute SEO automatically—so instead of analyzing what to do, you get 30 blogs/month, 20-30 backlinks, and continuous optimization done for you.`,
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
        url: 'https://anthroly.com',
      },
    },
  };
  
  const page: PSEOPage = {
    url,
    slug,
    playbookType: 'comparisons',
    seo: {
      title: `${toolA.name} vs ${toolB.name}: Complete Comparison Guide (2024) | Anthroly`,
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
        description: `Instead of managing SEO tools yourself, let Anthroly's AI handle execution. We use the best tools internally so you get results without the complexity.`,
        buttonText: 'See How It Works',
        buttonUrl: '/#ai-crawler',
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
