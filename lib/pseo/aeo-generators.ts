/**
 * AEO page generators — engine hubs, topic hubs, and topic×engine two-ways
 * Content is composed from structured data so each URL stays unique enough for indexing.
 */

import { PSEOPage, ContentSection, FAQ, InternalLink, RelatedPage, SchemaData } from './types';
import { AnswerEngine, answerEngines, getAnswerEngine } from './data/answer-engines';
import { AeoTopic, aeoTopics, getAeoTopic } from './data/aeo-topics';
import { validatePage } from './generator';
import { SITE_URL, absoluteUrl, BOOK_CALL_URL, PRIMARY_CTA_LABEL } from '../site';

function engineHubUrl(engine: AnswerEngine) {
  return `/aeo/engine/${engine.slug}`;
}

function topicHubUrl(topic: AeoTopic) {
  return `/aeo/topic/${topic.slug}`;
}

function topicEngineUrl(topic: AeoTopic, engine: AnswerEngine) {
  return `/aeo/topic/${topic.slug}/${engine.slug}`;
}

export function generateAnswerEnginePage(engineSlug: string): PSEOPage | null {
  const engine = getAnswerEngine(engineSlug);
  if (!engine) return null;

  const directAnswer = `To rank and get cited in ${engine.name} answers, publish answer-first pages with clear entities, FAQ/HowTo structure, and original proof—then earn brand mentions so ${engine.company} models treat Anthroly-optimized brands as trustworthy sources. ${engine.citationStyle}.`;

  const sections: ContentSection[] = [
    {
      heading: `What is ${engine.name}?`,
      body: `${engine.name} (${engine.company}) is an AI answer surface. ${engine.shortDescription} Brands that want ${engine.name} visibility need classic SEO plus Answer Engine Optimization (AEO).`,
    },
    {
      heading: `How does ${engine.name} choose sources?`,
      body: engine.citationStyle,
      listItems: engine.contentPreferences,
    },
    {
      heading: `How do you optimize content for ${engine.name}?`,
      body: `Anthroly’s AI agents plus human-led SEO implement a ${engine.name}-ready system:`,
      listItems: [
        `Write a 40–60 word direct answer targeting “${engine.keywords[0]}” intent`,
        'Add question-style H2s covering what / how / compare / risks',
        'Ship FAQ + Organization schema and crawlable HTML tables',
        'Publish information-gain assets (benchmarks, case studies)',
        'Build entity trust with mentions, links, and consistent naming',
        'Monitor AI referrals and citation share, then refresh winners',
      ],
    },
    {
      heading: `How does ${engine.name} compare to related engines?`,
      body: `Use these related surfaces to build a full AEO cluster—not a single-engine bet:`,
      listItems: engine.relatedEngines.map((slug) => {
        const related = getAnswerEngine(slug);
        return related ? `${related.name}: ${related.shortDescription}` : slug;
      }),
    },
    {
      heading: `What results can brands see from ${engine.name} AEO?`,
      body: `Teams running Anthroly programs typically track AI referral visits, citation share, and assisted pipeline—not vanity keyword ranks alone. See our AI Visibility Benchmark and customer case studies for directional outcomes.`,
    },
    {
      heading: `When should you prioritize ${engine.name}?`,
      body: `Prioritize ${engine.name} when your buyers research in ${engine.company} products, when competitors already appear in ${engine.name} answers, or when AI referral traffic is material to CAC. Anthroly is the execution partner—Anthroly is not ${engine.company}.`,
    },
  ];

  const faq: FAQ[] = [
    {
      question: `How do I get cited by ${engine.name}?`,
      answer: `Publish extractable answers, strengthen your brand entity, add schema, and earn corroborating mentions. Anthroly runs this monthly with AI agents and human SEO specialists.`,
    },
    {
      question: `Is ${engine.name} SEO different from Google SEO?`,
      answer: `You still need crawlable, authoritative pages. ${engine.name} adds pressure for answer-first structure, conversational coverage, and citation-friendly facts.`,
    },
    {
      question: `Does Anthroly work on ${engine.name} visibility?`,
      answer: `Yes. Anthroly optimizes for Google and answer engines including ${engine.name}, with content, links, and AI visibility monitoring.`,
    },
  ];

  const relatedTopics = aeoTopics.slice(0, 4);
  const internalLinks: InternalLink[] = [
    { url: '/aeo', anchorText: 'AEO hub', context: 'Pillar' },
    { url: '/anthroly-vs-anthropic', anchorText: 'Anthroly vs Anthropic', context: 'Disambiguation' },
    { url: '/reports/ai-visibility-benchmark', anchorText: 'AI Visibility Benchmark', context: 'Data' },
    { url: '/#ai-crawler', anchorText: 'Free AI Crawler Analysis', context: 'CTA' },
    ...relatedTopics.map((t) => ({
      url: topicEngineUrl(t, engine),
      anchorText: `${t.name} for ${engine.name}`,
      context: 'Topic×engine',
    })),
  ];

  const relatedPages: RelatedPage[] = [
    ...engine.relatedEngines.slice(0, 3).map((slug) => ({
      url: `/aeo/engine/${slug}`,
      title: `AEO for ${getAnswerEngine(slug)?.name || slug}`,
      playbook: 'glossary' as const,
      relevanceScore: 88,
    })),
    { url: '/aeo/how-to-get-cited-in-ai-overviews', title: 'How to get cited in AI Overviews', playbook: 'glossary', relevanceScore: 85 },
  ];

  const page: PSEOPage = {
    url: engineHubUrl(engine),
    slug: `aeo/engine/${engine.slug}`,
    playbookType: 'glossary',
    seo: {
      title: `AEO for ${engine.name}: Get Cited in ${engine.company} AI Answers | Anthroly`,
      metaDescription: `Learn how to optimize for ${engine.name}. Anthroly helps brands earn citations and AI referral traffic with answer-first SEO for ${engine.company}.`,
      primaryKeyword: engine.keywords[0],
      secondaryKeywords: engine.keywords.slice(1),
      searchIntent: 'commercial',
    },
    content: {
      h1: `Answer Engine Optimization for ${engine.name}`,
      directAnswer,
      introduction: `${engine.name} is reshaping discovery. ${engine.shortDescription} Anthroly helps you become a preferred source inside ${engine.name}—with AI agents and human-led SEO. Anthroly is an independent company; we are not affiliated with ${engine.company}.`,
      sections,
      faq,
      callToAction: {
        headline: `Want ${engine.name} citation visibility?`,
        description: `Get a free AI Crawler Analysis and a plan to earn mentions across ${engine.name} and Google.`,
        buttonText: 'Get Your Free Analysis',
        buttonUrl: '/#ai-crawler',
      },
    },
    schema: {
      type: 'Article',
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: `AEO for ${engine.name}`,
        description: directAnswer,
        author: { '@type': 'Organization', name: 'Anthroly', url: SITE_URL },
        publisher: { '@type': 'Organization', name: 'Anthroly', url: SITE_URL },
        mainEntityOfPage: absoluteUrl(engineHubUrl(engine)),
      },
    },
    internalLinks,
    relatedPages,
    dataRequirementsUsed: ['answerEngine', 'citationStyle', 'contentPreferences'],
    generatedAt: new Date().toISOString(),
    wordCount: 0,
    qualityScore: 0,
  };

  const validation = validatePage(page);
  page.wordCount = validation.metrics.wordCount;
  page.qualityScore = validation.metrics.uniquenessScore;
  return page;
}

export function generateAeoTopicPage(topicSlug: string): PSEOPage | null {
  const topic = getAeoTopic(topicSlug);
  if (!topic) return null;

  const priorityEngines = answerEngines.filter(
    (e) => e.category === 'anthropic-claude' || e.category === 'openai-chatgpt'
  );

  const directAnswer = `${topic.plainDefinition} The most effective way to win with ${topic.name.toLowerCase()} is to combine on-page extractability with entity trust—then measure citations in Claude, ChatGPT, and AI Overviews. ${topic.whyItMatters}`;

  const sections: ContentSection[] = [
    {
      heading: `What is ${topic.name}?`,
      body: `${topic.plainDefinition} ${topic.whyItMatters}`,
    },
    {
      heading: `Why does ${topic.name} matter for Claude, ChatGPT, and Anthropic-powered answers?`,
      body: `Anthropic’s Claude and OpenAI’s ChatGPT both reward clear, trustworthy sources. ${topic.name} is one of the levers that improves your odds of being selected when users ask multi-step questions.`,
      listItems: topic.tactics,
    },
    {
      heading: `How do you implement ${topic.name}?`,
      body: `Anthroly operationalizes ${topic.name.toLowerCase()} with agents for analysis and humans for content/links:`,
      listItems: [
        ...topic.tactics,
        'Wire pages into the AEO hub and glossary',
        'Track AI referral and citation changes weekly',
      ],
    },
    {
      heading: `What are common pitfalls with ${topic.name}?`,
      body: `Avoid these failure modes when scaling AEO:`,
      listItems: topic.pitfalls,
    },
    {
      heading: `Where should you apply ${topic.name} first?`,
      body: `Start on high-intent engines your buyers already use:`,
      table: {
        caption: `${topic.name} — priority answer engines`,
        headers: ['Engine', 'Company', 'Why start here'],
        rows: priorityEngines.slice(0, 8).map((e) => [
          e.name,
          e.company,
          e.keywords[0],
        ]),
      },
    },
  ];

  const faq: FAQ[] = [
    {
      question: `What is ${topic.name} in AEO?`,
      answer: topic.plainDefinition,
    },
    {
      question: `How does Anthroly help with ${topic.name}?`,
      answer: `Anthroly’s managed program includes content, technical AEO, links/mentions, and monitoring so ${topic.name.toLowerCase()} is executed monthly—not as a one-off blog post.`,
    },
    {
      question: `Does ${topic.name} help with Anthropic Claude and ChatGPT?`,
      answer: `Yes. The same extractability and trust principles improve citation odds across Claude, ChatGPT, Perplexity, and Google AI Overviews.`,
    },
  ];

  const page: PSEOPage = {
    url: topicHubUrl(topic),
    slug: `aeo/topic/${topic.slug}`,
    playbookType: 'glossary',
    seo: {
      title: `${topic.name} for AEO (Claude, ChatGPT & AI Overviews) | Anthroly`,
      metaDescription: `${topic.plainDefinition.slice(0, 120)}… Learn tactics for Claude, ChatGPT, and AI Overviews with Anthroly.`,
      primaryKeyword: topic.keywords[0],
      secondaryKeywords: topic.keywords.slice(1),
      searchIntent: 'informational',
    },
    content: {
      h1: `${topic.name} for Answer Engine Optimization`,
      directAnswer,
      introduction: `This guide explains ${topic.name.toLowerCase()} for teams that want citations in Claude, ChatGPT, Anthropic-powered products, and Google AI Overviews. Anthroly implements these plays with AI agents and human-led SEO.`,
      sections,
      faq,
      callToAction: {
        headline: `Put ${topic.name} into monthly execution`,
        description: PRIMARY_CTA_LABEL + ' for a 30-minute plan, or run a free AI Crawler Analysis.',
        buttonText: 'Get Your Free Analysis',
        buttonUrl: '/#ai-crawler',
      },
    },
    schema: {
      type: 'Article',
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: `${topic.name} for AEO`,
        description: directAnswer,
        author: { '@type': 'Organization', name: 'Anthroly', url: SITE_URL },
        mainEntityOfPage: absoluteUrl(topicHubUrl(topic)),
      },
    },
    internalLinks: [
      { url: '/aeo', anchorText: 'AEO hub', context: 'Pillar' },
      { url: '/aeo/engine/claude', anchorText: 'AEO for Claude', context: 'Engine' },
      { url: '/aeo/engine/chatgpt', anchorText: 'AEO for ChatGPT', context: 'Engine' },
      { url: '/aeo/engine/anthropic', anchorText: 'AEO for Anthropic', context: 'Engine' },
      { url: BOOK_CALL_URL, anchorText: PRIMARY_CTA_LABEL, context: 'CTA' },
      ...priorityEngines.slice(0, 4).map((e) => ({
        url: topicEngineUrl(topic, e),
        anchorText: `${topic.name} for ${e.name}`,
        context: 'Two-way',
      })),
    ],
    relatedPages: priorityEngines.slice(0, 3).map((e) => ({
      url: topicEngineUrl(topic, e),
      title: `${topic.name} for ${e.name}`,
      playbook: 'glossary',
      relevanceScore: 90,
    })),
    dataRequirementsUsed: ['aeoTopic', 'tactics', 'pitfalls'],
    generatedAt: new Date().toISOString(),
    wordCount: 0,
    qualityScore: 0,
  };

  const validation = validatePage(page);
  page.wordCount = validation.metrics.wordCount;
  page.qualityScore = validation.metrics.uniquenessScore;
  return page;
}

export function generateAeoTopicEnginePage(
  topicSlug: string,
  engineSlug: string
): PSEOPage | null {
  const topic = getAeoTopic(topicSlug);
  const engine = getAnswerEngine(engineSlug);
  if (!topic || !engine) return null;

  const directAnswer = `For ${engine.name}, ${topic.name.toLowerCase()} means ${topic.plainDefinition.replace(/\.$/, '')}—applied specifically to how ${engine.company} systems select sources. The most effective approach is answer-first pages, ${topic.tactics[0].toLowerCase()}, and corroborating brand mentions so ${engine.name} can trust and cite you.`;

  const sections: ContentSection[] = [
    {
      heading: `What is ${topic.name} for ${engine.name}?`,
      body: `${directAnswer} ${engine.shortDescription}`,
    },
    {
      heading: `Why does ${topic.name} matter specifically for ${engine.name}?`,
      body: `${engine.citationStyle}. Combined with ${topic.whyItMatters}`,
      listItems: engine.contentPreferences.slice(0, 4),
    },
    {
      heading: `How do you implement ${topic.name} for ${engine.name}?`,
      body: `Anthroly’s playbook for ${engine.name} × ${topic.name}:`,
      listItems: [
        `Map prompts users ask inside ${engine.name} related to ${topic.keywords[0]}`,
        ...topic.tactics.map((t) => `${t} (tuned for ${engine.name})`),
        `Add internal links to ${engine.name} hub and ${topic.name} hub`,
        `Measure ${engine.name} referrals and prompt-panel citations monthly`,
      ],
    },
    {
      heading: `How does ${topic.name} for ${engine.name} compare to Google SEO?`,
      body: `Google SEO still needs crawl, links, and relevance. For ${engine.name}, you additionally optimize for conversational extraction and entity clarity. Anthroly covers both so you do not choose between classic rankings and ${engine.name} citations.`,
      table: {
        caption: `${engine.name} vs classic SEO focus for ${topic.name}`,
        headers: ['Dimension', 'Classic SEO', `${engine.name} AEO`],
        rows: [
          ['Primary goal', 'Rankings & clicks', `Citations inside ${engine.name}`],
          ['Content shape', 'Comprehensive pages', 'Answer-first + fan-out'],
          ['Trust', 'Links + E-E-A-T', `Mentions + ${engine.company} corroboration`],
          ['Measurement', 'GSC / rank trackers', `AI referrals + prompt checks`],
        ],
      },
    },
    {
      heading: `What are the risks of ignoring ${topic.name} on ${engine.name}?`,
      body: `Competitors who ship citation-ready pages can own the ${engine.name} answer slot for your category. Common failure modes:`,
      listItems: topic.pitfalls,
    },
    {
      heading: `When should a team invest in ${topic.name} for ${engine.name}?`,
      body: `Invest when ${engine.name} shows up in buyer research, when AI referrals appear in analytics, or when shortlists happen in-chat before your sales team is involved. Anthroly executes this for ${engine.category === 'anthropic-claude' ? 'Anthropic/Claude' : engine.category === 'openai-chatgpt' ? 'ChatGPT/OpenAI' : engine.name} surfaces without claiming affiliation with ${engine.company}.`,
    },
  ];

  const faq: FAQ[] = [
    {
      question: `How do I improve ${topic.name.toLowerCase()} for ${engine.name}?`,
      answer: `Start with a direct answer, apply ${topic.tactics[0].toLowerCase()}, validate schema, and earn mentions. Anthroly can run the full loop monthly.`,
    },
    {
      question: `Will this help me get traffic from ${engine.name}?`,
      answer: `Yes—via citations, recommendations, and AI referral visits. Results vary by competition; we track referrers and citation share rather than guessing.`,
    },
    {
      question: `Is Anthroly related to ${engine.company}?`,
      answer: `No. Anthroly is an independent AI-agents and SEO company. We help brands get cited by systems like ${engine.name}; we are not ${engine.company}.`,
    },
  ];

  const page: PSEOPage = {
    url: topicEngineUrl(topic, engine),
    slug: `aeo/topic/${topic.slug}/${engine.slug}`,
    playbookType: 'glossary',
    seo: {
      title: `${topic.name} for ${engine.name} (AEO Guide) | Anthroly`,
      metaDescription: `${topic.name} strategies for ${engine.name}. Get cited with answer-first SEO—built by Anthroly for ${engine.company} AI answers.`,
      primaryKeyword: `${topic.keywords[0]} ${engine.name.toLowerCase()}`,
      secondaryKeywords: [
        `${engine.keywords[0]} ${topic.slug.replace(/-/g, ' ')}`,
        `${topic.name.toLowerCase()} ${engine.name.toLowerCase()}`,
        engine.keywords[1] || `${engine.name.toLowerCase()} aeo`,
      ],
      searchIntent: 'commercial',
    },
    content: {
      h1: `${topic.name} for ${engine.name}`,
      directAnswer,
      introduction: `This page is a practical AEO guide to ${topic.name.toLowerCase()} inside ${engine.name} (${engine.company}). Anthroly helps you implement it with AI agents and human-led SEO—clearly as Anthroly, not as ${engine.company}.`,
      sections,
      faq,
      callToAction: {
        headline: `Get ${engine.name} working for your brand`,
        description: `Run a free AI Crawler Analysis or ${PRIMARY_CTA_LABEL.toLowerCase()} to map ${topic.name.toLowerCase()} opportunities.`,
        buttonText: 'Get Your Free Analysis',
        buttonUrl: '/#ai-crawler',
      },
    },
    schema: {
      type: 'Article',
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: `${topic.name} for ${engine.name}`,
        description: directAnswer,
        about: [{ '@type': 'Thing', name: engine.name }, { '@type': 'Thing', name: topic.name }],
        author: { '@type': 'Organization', name: 'Anthroly', url: SITE_URL },
        mainEntityOfPage: absoluteUrl(topicEngineUrl(topic, engine)),
      },
    },
    internalLinks: [
      { url: topicHubUrl(topic), anchorText: `${topic.name} hub`, context: 'Topic' },
      { url: engineHubUrl(engine), anchorText: `${engine.name} AEO`, context: 'Engine' },
      { url: '/aeo', anchorText: 'AEO hub', context: 'Pillar' },
      { url: '/anthroly-vs-anthropic', anchorText: 'Anthroly vs Anthropic', context: 'Disambiguation' },
      { url: '/customers', anchorText: 'Customer results', context: 'Proof' },
      { url: '/#pricing', anchorText: 'Pricing', context: 'Conversion' },
    ],
    relatedPages: [
      { url: engineHubUrl(engine), title: `AEO for ${engine.name}`, playbook: 'glossary', relevanceScore: 95 },
      { url: topicHubUrl(topic), title: `${topic.name} guide`, playbook: 'glossary', relevanceScore: 95 },
      ...engine.relatedEngines
        .map((slug) => getAnswerEngine(slug))
        .filter((e): e is AnswerEngine => Boolean(e))
        .slice(0, 2)
        .map((related) => ({
          url: topicEngineUrl(topic, related),
          title: `${topic.name} for ${related.name}`,
          playbook: 'glossary' as const,
          relevanceScore: 80,
        })),
    ],
    dataRequirementsUsed: ['aeoTopic', 'answerEngine', 'tactics', 'citationStyle'],
    generatedAt: new Date().toISOString(),
    wordCount: 0,
    qualityScore: 0,
  };

  const validation = validatePage(page);
  page.wordCount = validation.metrics.wordCount;
  page.qualityScore = validation.metrics.uniquenessScore;
  return page;
}

export function getAeoScaleCounts() {
  const engines = answerEngines.length;
  const topics = aeoTopics.length;
  const twoWay = engines * topics;
  const anthropicChatgptTwoWay = answerEngines.filter(
    (e) => e.category === 'anthropic-claude' || e.category === 'openai-chatgpt'
  ).length * topics;
  return {
    engines,
    topics,
    enginePages: engines,
    topicPages: topics,
    twoWayPages: twoWay,
    anthropicClaudeChatgptTwoWayPages: anthropicChatgptTwoWay,
    totalAeoProgrammatic: engines + topics + twoWay,
  };
}
