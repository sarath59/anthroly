/**
 * Generators for rich APAC market pages (/markets/...)
 * Unique long-form content per country and country×topic.
 */

import {
  PSEOPage,
  ContentSection,
  FAQ,
  InternalLink,
  RelatedPage,
} from './types';
import {
  ApacCountry,
  ApacTopic,
  apacCountries,
  apacTopics,
  getApacCountry,
  getApacTopic,
} from './data/apac-markets';
import { countWords } from './generator';
import { BOOK_CALL_URL, PRIMARY_CTA_LABEL } from '../site';

function fill(template: string, country: ApacCountry): string {
  return template
    .split('{country}')
    .join(country.name)
    .split('{adjective}')
    .join(country.adjective);
}

function relatedTopics(country: ApacCountry, current?: ApacTopic, limit = 6): RelatedPage[] {
  return apacTopics
    .filter((t) => t.slug !== current?.slug)
    .slice(0, limit)
    .map((t, i) => ({
      url: `/markets/${country.slug}/${t.slug}`,
      title: fill(t.h1Template, country),
      playbook: 'locations' as const,
      relevanceScore: 90 - i,
    }));
}

function siblingCountries(current: ApacCountry): RelatedPage[] {
  return apacCountries
    .filter((c) => c.slug !== current.slug)
    .map((c, i) => ({
      url: `/markets/${c.slug}`,
      title: `AI SEO & AEO in ${c.name}`,
      playbook: 'locations' as const,
      relevanceScore: 85 - i,
    }));
}

function baseInternalLinks(country: ApacCountry): InternalLink[] {
  return [
    { url: '/markets', anchorText: 'APAC AI SEO Markets', context: 'Hub' },
    { url: `/markets/${country.slug}`, anchorText: `${country.name} AI SEO & AEO`, context: 'Country hub' },
    { url: '/aeo', anchorText: 'Answer Engine Optimization', context: 'Service' },
    { url: '/customers', anchorText: 'Customer case studies', context: 'Proof' },
    { url: '/aeo/aeo-vs-seo-vs-geo', anchorText: 'AEO vs SEO vs GEO', context: 'Education' },
    { url: '/#pricing', anchorText: 'View pricing', context: 'CTA' },
    { url: '/ai-seo-agency', anchorText: 'AI SEO by city', context: 'Locations' },
  ];
}

function cityLinks(country: ApacCountry): InternalLink[] {
  const seen = new Set<string>();
  return country.cities
    .filter((c) => {
      if (seen.has(c.slug)) return false;
      seen.add(c.slug);
      return true;
    })
    .map((c) => ({
      url: `/ai-seo-agency/${c.slug}`,
      anchorText: `AI SEO agency in ${c.name}`,
      context: 'City page',
    }));
}

export function generateApacCountryHubPage(country: ApacCountry): PSEOPage {
  const url = `/markets/${country.slug}`;
  const primaryKeyword = `AI SEO ${country.name}`;
  const h1 = `AI SEO & Answer Engine Optimization in ${country.name}`;

  const directAnswer = `Anthroly helps ${country.name} businesses win Google rankings and AI recommendations across ChatGPT, Claude, Perplexity, Gemini, and Google AI Overviews. A dedicated human research team improves your brand’s visibility, citations, and recommendability every day—so buyers in ${country.name} and export markets find you in the answers that matter.`;

  const introduction = `${country.marketOverview} ${country.aiSearchContext} Anthroly is a human-led AI SEO and AEO partner built for ${country.adjective} companies that need measurable presence in both classic search and AI answers.`;

  const sections: ContentSection[] = [
    {
      heading: `Why ${country.name} companies need AI SEO and AEO now`,
      body: `Search behavior in ${country.name} has split into two layers. Buyers still use Google—but they also ask AI assistants who to trust, which product to buy, and which agency or vendor to shortlist. ${country.aiSearchContext}`,
      listItems: country.buyerQuestions,
    },
    {
      heading: `What makes the ${country.name} market different`,
      body: `Generic global SEO playbooks underperform in ${country.name}. Local language expectations, competitive density, and buyer research habits require a market-specific approach:`,
      listItems: country.localNuances,
    },
    {
      heading: `Priority business hubs and industries in ${country.name}`,
      body: `We focus on the clusters where AI-assisted research already influences pipeline and revenue in ${country.name}:`,
      listItems: [
        ...country.businessHubs.map((h) => `Business hub: ${h}`),
        ...country.industries.slice(0, 8).map((i) => `Industry focus: ${i}`),
      ],
    },
    {
      heading: `Cities and regions we support in ${country.name}`,
      body: `Country-level authority still needs city-level depth. Anthroly supports the commercial centers that drive ${country.adjective} demand:`,
      listItems: country.cities.map((c) => `${c.name} — ${c.note}`),
    },
    {
      heading: `Search engines and AI platforms that matter in ${country.name}`,
      body: `Your ${country.name} program should cover the discovery surfaces your buyers actually use:`,
      listItems: [
        ...country.searchEngines.map((e) => `Search: ${e}`),
        ...country.aiPlatforms.map((e) => `AI platform: ${e}`),
      ],
    },
    {
      heading: `How Anthroly works for ${country.name} brands`,
      body: `You do not get a dashboard and a homework list. You get a human-led team working continuously on your brand’s AI visibility and search authority.`,
      listItems: [
        'AI search visibility monitoring across major answer engines',
        'Prompt and citation opportunity mapping for local buyer language',
        'Answer-first content systems (blogs, FAQs, comparison pages)',
        'Digital PR and high-DR backlinks that strengthen entity authority',
        'Competitive intelligence on who AI currently recommends',
        'Weekly reporting tied to visibility, citations, and pipeline proxies',
      ],
    },
    {
      heading: `Services for ${country.name}: from tracking to recommendation`,
      body: `Most tools stop at monitoring. Anthroly’s mission in ${country.name} is to change what AI says about your brand—moving you from “mentioned” to “recommended.” Explore focused playbooks:`,
      listItems: apacTopics
        .filter((t) => t.kind === 'service')
        .slice(0, 10)
        .map((t) => `${t.name}: /markets/${country.slug}/${t.slug}`),
    },
    {
      heading: `Industry playbooks for ${country.name}`,
      body: `Different verticals face different AI-query patterns and YMYL requirements. We run industry-specific AEO for ${country.name}:`,
      listItems: apacTopics
        .filter((t) => t.kind === 'industry')
        .map((t) => `${t.name} in ${country.name}: /markets/${country.slug}/${t.slug}`),
    },
    {
      heading: `Engine-specific visibility in ${country.name}`,
      body: `ChatGPT, Claude, Perplexity, Gemini, and Copilot do not behave identically. We maintain engine-specific programs for ${country.name} buyers:`,
      listItems: apacTopics
        .filter((t) => t.kind === 'engine')
        .map((t) => `${t.name} visibility in ${country.name}: /markets/${country.slug}/${t.slug}`),
    },
    {
      heading: `Keywords ${country.name} teams already search`,
      body: `These commercial and informational queries reflect how ${country.adjective} marketers look for AI SEO and AEO partners:`,
      listItems: country.localKeywords,
    },
    {
      heading: `Technical SEO foundations that help Google index your growth pages`,
      body: `Traffic from ${country.name} only compounds if Google can discover, crawl, and index the pages that target local intent. Anthroly builds indexable systems—not orphan thin URLs.`,
      listItems: [
        'Unique long-form pages with clear primary intent (no doorway spam)',
        'Canonical tags, breadcrumbs, and JSON-LD on every market page',
        'Internal links from country hubs to city, industry, and engine spokes',
        'XML sitemap inclusion with prioritized APAC URLs',
        'Fast, statically generated pages for reliable first crawl',
        'Human editorial quality so pages earn “indexed” not “crawled – not indexed”',
      ],
    },
    {
      heading: `Who this is for in ${country.name}`,
      body: `Anthroly partners with ${country.adjective} SaaS companies, ecommerce brands, fintechs, professional services firms, manufacturers going global, and growth teams that cannot hire a 30–40 person AI visibility department in-house.`,
    },
  ];

  const faq: FAQ[] = [
    {
      question: `Do you work with companies based in ${country.name}?`,
      answer: `Yes. Anthroly works with ${country.name}-based teams and international companies targeting ${country.adjective} buyers. Delivery is remote-friendly with English-first collaboration (${country.languages.join(', ')} as relevant).`,
    },
    {
      question: `What is the difference between SEO and AEO for ${country.name}?`,
      answer: `SEO improves rankings and clicks on Google in ${country.name}. AEO improves how AI assistants cite and recommend your brand. We run both because ${country.adjective} buyers use both surfaces before purchasing.`,
    },
    {
      question: `Which AI platforms do you cover for ${country.name}?`,
      answer: `We prioritize ${country.aiPlatforms.slice(0, 4).join(', ')}, plus Google AI Overviews where relevant. Engine mix is tailored to how your buyers research.`,
    },
    {
      question: `Can you help with city-level SEO in ${country.name}?`,
      answer: `Yes. Country hubs build national/entity authority; city pages and local content cover ${country.cities
        .slice(0, 4)
        .map((c) => c.name)
        .join(', ')} and related markets.`,
    },
    {
      question: `How fast can ${country.name} brands see AI visibility improvements?`,
      answer: `Many teams see measurement clarity within days and early citation/content movement within weeks. Compounding recommendation gains typically build over 30–90 days as content, PR, and entity signals strengthen.`,
    },
    {
      question: `Is Anthroly a software dashboard or a service?`,
      answer: `A human-led service. Software can show that visibility changed; our researchers work on why it changed and what to publish, pitch, and fix next for your ${country.name} program.`,
    },
  ];

  const internalLinks: InternalLink[] = [
    ...baseInternalLinks(country),
    ...cityLinks(country),
    ...apacTopics.slice(0, 8).map((t) => ({
      url: `/markets/${country.slug}/${t.slug}`,
      anchorText: fill(t.h1Template, country),
      context: 'Topic spoke',
    })),
  ];

  const relatedPages: RelatedPage[] = [
    ...siblingCountries(country),
    ...relatedTopics(country, undefined, 8),
  ];

  let wordCount = countWords(introduction) + countWords(directAnswer);
  sections.forEach((s) => {
    wordCount += countWords(s.heading) + countWords(s.body);
    s.listItems?.forEach((i) => {
      wordCount += countWords(i);
    });
  });
  faq.forEach((f) => {
    wordCount += countWords(f.question) + countWords(f.answer);
  });

  return {
    url,
    slug: country.slug,
    playbookType: 'locations',
    seo: {
      title: `AI SEO & AEO in ${country.name} | ChatGPT & Google Visibility | Anthroly`,
      metaDescription: `${country.metaFocus}. Human-led answer engine optimization for ChatGPT, Claude, Perplexity, and Google AI Overviews—built for ${country.adjective} businesses.`,
      primaryKeyword,
      secondaryKeywords: country.localKeywords.slice(0, 6),
      searchIntent: 'commercial',
      canonicalUrl: url,
    },
    content: {
      h1,
      directAnswer,
      introduction,
      sections,
      faq,
      callToAction: {
        headline: `Put your ${country.name} brand in the AI conversation`,
        description: `Get a dedicated human team working on your AI visibility across Google and answer engines used by ${country.adjective} buyers.`,
        buttonText: PRIMARY_CTA_LABEL,
        buttonUrl: BOOK_CALL_URL,
      },
    },
    schema: {
      type: 'Service',
      structuredData: {},
    },
    internalLinks,
    relatedPages,
    dataRequirementsUsed: ['apac-markets', country.slug],
    generatedAt: new Date().toISOString(),
    wordCount,
    qualityScore: 92,
  };
}

export function generateApacTopicPage(country: ApacCountry, topic: ApacTopic): PSEOPage {
  const url = `/markets/${country.slug}/${topic.slug}`;
  const primaryKeyword = fill(topic.primaryKeywordTemplate, country);
  const h1 = fill(topic.h1Template, country);

  const directAnswer = `Anthroly delivers ${topic.name} for ${country.name} brands: a human-led program that improves how Google and AI platforms understand, cite, and recommend your company. ${topic.angle}`;

  const introduction = `${fill(topic.angle, country)} In ${country.name}, that means aligning content, digital PR, technical SEO, and continuous research with how ${country.adjective} buyers actually ask questions—across ${country.aiPlatforms.slice(0, 3).join(', ')} and Google.`;

  const sections: ContentSection[] = [
    {
      heading: `Why ${topic.name} matters in ${country.name}`,
      body: `${country.marketOverview} For teams investing in ${topic.name.toLowerCase()}, the opportunity is clear: ${country.aiSearchContext}`,
    },
    {
      heading: `What Anthroly delivers for ${topic.name} in ${country.name}`,
      body: `Our ${country.name} ${topic.name} program is execution-first:`,
      listItems: topic.outcomes.map((o) => fill(o, country)),
    },
    {
      heading: `Local market context for ${country.name}`,
      body: `Successful ${topic.name} work in ${country.name} accounts for local nuances:`,
      listItems: country.localNuances,
    },
    {
      heading: `Buyer questions we optimize for in ${country.name}`,
      body: `These are the kinds of prompts and searches that shape consideration in ${country.name}:`,
      listItems: [
        ...country.buyerQuestions,
        ...topic.secondaryKeywords.map((k) => `${k} in ${country.name}`),
      ],
    },
    {
      heading: `Cities and clusters covered`,
      body: `${topic.name} programs in ${country.name} typically prioritize:`,
      listItems: country.cities.map((c) => `${c.name}: ${c.note}`),
    },
    {
      heading: `How this connects to broader AI SEO in ${country.name}`,
      body: `${topic.name} works best as part of a full visibility system—monitoring, content, PR, and technical foundations. Explore the ${country.name} hub and related playbooks to build topical coverage Google and answer engines can trust.`,
      listItems: [
        `Country hub: AI SEO & AEO in ${country.name}`,
        ...apacTopics
          .filter((t) => t.kind === topic.kind && t.slug !== topic.slug)
          .slice(0, 5)
          .map((t) => `${t.name} in ${country.name}`),
      ],
    },
    {
      heading: `Technical SEO checklist for indexable ${country.name} pages`,
      body: `Every Anthroly market page is built to be crawlable and indexable:`,
      listItems: [
        'Unique H1, title, and meta description with clear commercial intent',
        'Direct-answer block optimized for AI Overviews and featured snippets',
        'FAQ schema-ready Q&A for rich results and LLM extraction',
        'Internal links to country hub, sibling topics, and city pages',
        'Canonical URL on www.anthroly.com',
        'Included in XML sitemap for discovery',
      ],
    },
    {
      heading: `Languages and messaging for ${country.name}`,
      body: `Primary business language for this program: ${country.primaryLanguage}. Supported context: ${country.languages.join(', ')}. Content is written for the buyers who influence revenue—often English-first for international and export motions, with local proof points for ${country.name}.`,
    },
  ];

  const faq: FAQ[] = [
    ...topic.faqSeed.map((f) => ({
      question: fill(f.q, country),
      answer: fill(f.a, country),
    })),
    {
      question: `Do you offer ${topic.name} specifically for ${country.name}?`,
      answer: `Yes. This page exists because ${country.name} has distinct buyer language, competitors, and AI usage patterns. Your program uses ${country.adjective} examples, cities, and prompt sets—not a US-only template.`,
    },
    {
      question: `How do I get started with ${topic.name} in ${country.name}?`,
      answer: `Book a call for an AI visibility audit. We assess current Google and answer-engine presence for your ${country.name} market, then propose a human-led execution plan.`,
    },
    {
      question: `Which industries in ${country.name} benefit most?`,
      answer: `Strong fit includes ${country.industries.slice(0, 6).join(', ')}. If buyers research options in AI tools before purchasing, ${topic.name} is relevant.`,
    },
  ];

  const internalLinks: InternalLink[] = [
    ...baseInternalLinks(country),
    ...cityLinks(country).slice(0, 6),
    ...apacTopics
      .filter((t) => t.slug !== topic.slug)
      .slice(0, 10)
      .map((t) => ({
        url: `/markets/${country.slug}/${t.slug}`,
        anchorText: fill(t.h1Template, country),
        context: 'Related topic',
      })),
  ];

  const relatedPages: RelatedPage[] = [
    {
      url: `/markets/${country.slug}`,
      title: `AI SEO & AEO in ${country.name}`,
      playbook: 'locations',
      relevanceScore: 100,
    },
    ...relatedTopics(country, topic, 8),
    ...apacCountries
      .filter((c) => c.slug !== country.slug)
      .map((c, i) => ({
        url: `/markets/${c.slug}/${topic.slug}`,
        title: fill(topic.h1Template, c),
        playbook: 'locations' as const,
        relevanceScore: 80 - i,
      })),
  ];

  let wordCount = countWords(introduction) + countWords(directAnswer);
  sections.forEach((s) => {
    wordCount += countWords(s.heading) + countWords(s.body);
    s.listItems?.forEach((i) => {
      wordCount += countWords(i);
    });
  });
  faq.forEach((f) => {
    wordCount += countWords(f.question) + countWords(f.answer);
  });

  return {
    url,
    slug: `${country.slug}-${topic.slug}`,
    playbookType: 'locations',
    seo: {
      title: `${h1} | Anthroly`,
      metaDescription: `${topic.name} for ${country.name}: ${topic.angle.slice(0, 120)} Human-led AEO and AI SEO by Anthroly.`,
      primaryKeyword,
      secondaryKeywords: [
        ...topic.secondaryKeywords.map((k) => `${k} ${country.name}`),
        ...country.localKeywords.slice(0, 3),
      ],
      searchIntent: 'commercial',
      canonicalUrl: url,
    },
    content: {
      h1,
      directAnswer,
      introduction,
      sections,
      faq,
      callToAction: {
        headline: `Grow ${topic.name.toLowerCase()} in ${country.name}`,
        description: `Talk to Anthroly about a human-led program for ${country.adjective} AI search visibility.`,
        buttonText: PRIMARY_CTA_LABEL,
        buttonUrl: BOOK_CALL_URL,
      },
    },
    schema: {
      type: 'Service',
      structuredData: {},
    },
    internalLinks,
    relatedPages,
    dataRequirementsUsed: ['apac-markets', country.slug, topic.slug],
    generatedAt: new Date().toISOString(),
    wordCount,
    qualityScore: 90,
  };
}

export function getApacCountryPage(slug: string): PSEOPage | null {
  const country = getApacCountry(slug);
  if (!country) return null;
  return generateApacCountryHubPage(country);
}

export function getApacTopicComboPage(countrySlug: string, topicSlug: string): PSEOPage | null {
  const country = getApacCountry(countrySlug);
  const topic = getApacTopic(topicSlug);
  if (!country || !topic) return null;
  return generateApacTopicPage(country, topic);
}
