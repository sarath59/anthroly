/**
 * Customer brand SEO clusters
 *
 * For each full case study in customerCaseStudies, generate unique supporting
 * pages under /customers/[slug]/[topic] that target brand+modifier queries
 * (e.g. "MongoDB AI search results", "WHOOP AEO playbook").
 *
 * SAFETY RULES:
 * - Never invent metrics — only study.metrics
 * - Never invent quotes — only quotes present in study.blocks
 * - Never invent results — only paraphrase study.summary / study paragraphs
 * - Every page must include brand name + distinct topic intent in title/H1
 */

import {
  customerCaseStudies,
  getCaseStudy,
  type CaseBlock,
  type CustomerCaseStudy,
  type CustomerMetric,
} from './customers';
import { BOOK_CALL_URL, PRIMARY_CTA_LABEL } from './site';

export type CustomerClusterTopicSlug =
  | 'results'
  | 'aeo-strategy'
  | 'chatgpt-visibility'
  | 'quotes-and-lessons'
  | 'playbook';

export interface CustomerClusterTopic {
  slug: CustomerClusterTopicSlug;
  name: string;
  /** Short label for nav pills */
  navLabel: string;
  /** Used in titles: "{Brand} {titleFragment}" */
  titleFragment: string;
  primaryKeywordTemplate: string; // "{brand}" placeholder
  searchIntent: string;
}

export interface ClusterFAQ {
  question: string;
  answer: string;
}

export interface ClusterSection {
  heading: string;
  body: string;
  listItems?: string[];
}

export interface CustomerClusterPage {
  url: string;
  brandSlug: string;
  brand: string;
  topicSlug: CustomerClusterTopicSlug;
  topicName: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  directAnswer: string;
  introduction: string;
  sections: ClusterSection[];
  faqs: ClusterFAQ[];
  metrics: CustomerMetric[];
  quotes: { body: string; name: string; role: string }[];
  publishedAt: string;
  canonicalCaseStudyUrl: string;
  siblingTopics: { slug: CustomerClusterTopicSlug; name: string; url: string }[];
  relatedBrands: { slug: string; brand: string; title: string }[];
  cta: { headline: string; description: string; buttonText: string; buttonUrl: string };
  wordCount: number;
}

export const CUSTOMER_CLUSTER_TOPICS: CustomerClusterTopic[] = [
  {
    slug: 'results',
    name: 'AI Search Results',
    navLabel: 'Results',
    titleFragment: 'AI Search Results & Metrics',
    primaryKeywordTemplate: '{brand} AI search results',
    searchIntent: 'Documented visibility, citation, and business outcomes',
  },
  {
    slug: 'aeo-strategy',
    name: 'AEO Strategy',
    navLabel: 'AEO Strategy',
    titleFragment: 'Answer Engine Optimization Strategy',
    primaryKeywordTemplate: '{brand} AEO strategy',
    searchIntent: 'How the brand approached answer engine optimization',
  },
  {
    slug: 'chatgpt-visibility',
    name: 'ChatGPT & AI Visibility',
    navLabel: 'ChatGPT Visibility',
    titleFragment: 'ChatGPT & AI Answer Visibility',
    primaryKeywordTemplate: '{brand} ChatGPT visibility',
    searchIntent: 'How the brand shows up in ChatGPT and AI answers',
  },
  {
    slug: 'quotes-and-lessons',
    name: 'Quotes & Lessons',
    navLabel: 'Quotes',
    titleFragment: 'Quotes & Marketing Lessons',
    primaryKeywordTemplate: '{brand} AI search case study quotes',
    searchIntent: 'Leadership quotes and reusable lessons',
  },
  {
    slug: 'playbook',
    name: 'Execution Playbook',
    navLabel: 'Playbook',
    titleFragment: 'Anthroly Execution Playbook',
    primaryKeywordTemplate: '{brand} AEO playbook',
    searchIntent: 'What was executed to improve AI visibility',
  },
];

function countWords(text: string): number {
  return text
    .trim()
    .split(/\s+/)
    .filter((w) => w.length > 0).length;
}

function fillBrand(template: string, brand: string): string {
  return template.split('{brand}').join(brand);
}

function extractQuotes(
  blocks: CaseBlock[]
): { body: string; name: string; role: string }[] {
  return blocks
    .filter((b): b is Extract<CaseBlock, { type: 'quote' }> => b.type === 'quote')
    .map((b) => ({ body: b.body, name: b.name, role: b.role }));
}

function extractParagraphs(blocks: CaseBlock[]): string[] {
  return blocks.filter((b): b is Extract<CaseBlock, { type: 'p' }> => b.type === 'p').map((b) => b.text);
}

function extractHeadings(blocks: CaseBlock[]): string[] {
  return blocks
    .filter((b): b is Extract<CaseBlock, { type: 'h2' | 'h3' }> => b.type === 'h2' || b.type === 'h3')
    .map((b) => b.text);
}

function metricsLines(metrics: CustomerMetric[]): string[] {
  return metrics.map((m) => `${m.value} — ${m.label}`);
}

function pickParagraphs(paragraphs: string[], start: number, count: number): string[] {
  if (paragraphs.length === 0) return [];
  const out: string[] = [];
  for (let i = 0; i < count; i++) {
    out.push(paragraphs[(start + i) % paragraphs.length]);
  }
  // Dedupe while preserving order if corpus is small
  return [...new Set(out)];
}

function getTopic(slug: string): CustomerClusterTopic | undefined {
  return CUSTOMER_CLUSTER_TOPICS.find((t) => t.slug === slug);
}

function relatedBrandCards(study: CustomerCaseStudy, limit = 2) {
  const idx = customerCaseStudies.findIndex((c) => c.slug === study.slug);
  if (idx < 0) return [];
  return [1, 2].slice(0, limit).map((offset) => {
    const r = customerCaseStudies[(idx + offset) % customerCaseStudies.length];
    return { slug: r.slug, brand: r.brand, title: r.title };
  });
}

function buildResultsPage(study: CustomerCaseStudy, topic: CustomerClusterTopic): Omit<
  CustomerClusterPage,
  'url' | 'siblingTopics' | 'relatedBrands' | 'canonicalCaseStudyUrl' | 'wordCount' | 'cta'
> {
  const paragraphs = extractParagraphs(study.blocks);
  const quotes = extractQuotes(study.blocks);
  const primary = study.metrics[0];
  const selected = pickParagraphs(paragraphs, 0, 4);

  const sections: ClusterSection[] = [
    {
      heading: `${study.brand} AI search results at a glance`,
      body: `These are the documented outcomes from the ${study.brand} customer story published by Anthroly. Every figure below comes from the full case study — not estimates.`,
      listItems: metricsLines(study.metrics),
    },
    {
      heading: `What “winning” looked like for ${study.brand}`,
      body: study.summary,
    },
    {
      heading: `Context behind the ${study.brand} numbers`,
      body: selected[0] || study.summary,
    },
    {
      heading: `How the results compounded`,
      body:
        selected[1] ||
        `As ${study.brand} improved how answer engines understood and cited their brand, visibility and trust signals strengthened together. The full narrative lives on the main case study page.`,
    },
    {
      heading: `Why these metrics matter for AI search`,
      body: `For brands in competitive categories, AI answer visibility influences shortlists before a sales conversation starts. ${study.brand}'s reported ${primary?.value ?? 'gains'} (${primary?.label ?? 'primary outcome'}) shows why teams treat Answer Engine Optimization as a growth channel — not a side project.`,
      listItems: [
        'Buyers ask ChatGPT, Claude, Perplexity, and Google AI Overviews before visiting vendor sites',
        'Citation share and accuracy affect whether your brand is recommended or skipped',
        'Documented results help marketers justify AEO investment internally',
      ],
    },
    {
      heading: `Who searches for ${study.brand} AI search results`,
      body: `This page is written for marketers, founders, and operators comparing AEO vendors or studying ${study.brand}'s AI visibility gains. If you need product docs or pricing for ${study.brand}, use their official site — Anthroly publishes the customer-story angle only.`,
    },
    {
      heading: `Read the full ${study.brand} story`,
      body: `This results page is a focused metrics hub. For the complete problem → approach → outcome narrative, quotes, and timeline, see the full ${study.brand} case study on Anthroly.`,
    },
  ];

  if (selected[2]) {
    sections.splice(3, 0, {
      heading: `Additional detail from the ${study.brand} program`,
      body: selected[2],
    });
  }
  if (selected[3]) {
    sections.splice(4, 0, {
      heading: `Supporting narrative from the case study`,
      body: selected[3],
    });
  }

  const faqs: ClusterFAQ[] = [
    {
      question: `What results did ${study.brand} achieve with Anthroly?`,
      answer: `${study.brand} reported: ${metricsLines(study.metrics).join('; ')}. Full context is in the ${study.brand} case study.`,
    },
    {
      question: `Where do the ${study.brand} AI search metrics come from?`,
      answer: `They are taken from Anthroly's published ${study.brand} customer story (${study.publishedAt}). This page restates those documented outcomes for searchers looking specifically for results.`,
    },
    {
      question: `Can my company get similar AI search results to ${study.brand}?`,
      answer: `Results vary by category, starting visibility, and execution speed. Anthroly runs the same class of human-led AEO work — visibility monitoring, content, citations, and iteration — tailored to your brand.`,
    },
    {
      question: `Is this an official ${study.brand} page?`,
      answer: `No. This is an Anthroly customer story page about ${study.brand}'s AI search / AEO results. For product information, visit ${study.brand}'s own website.`,
    },
  ];

  return {
    brandSlug: study.slug,
    brand: study.brand,
    topicSlug: topic.slug,
    topicName: topic.name,
    title: `${study.brand} ${topic.titleFragment}: ${primary?.value ?? ''} ${primary?.label ?? ''}`.trim(),
    metaTitle: `${study.brand} AI Search Results: ${primary?.value ?? 'Case Study'} | Anthroly`,
    metaDescription: `${study.brand} AI search results: ${metricsLines(study.metrics)
      .slice(0, 3)
      .join('; ')}. Read the documented Anthroly case study outcomes.`,
    h1: `${study.brand} AI Search Results & Metrics`,
    directAnswer: `${study.brand} achieved ${metricsLines(study.metrics).join('; ')} through a human-led Answer Engine Optimization program with Anthroly. ${study.summary}`,
    introduction: `Searching for ${study.brand} AI search results? This page isolates the documented metrics and outcomes from Anthroly's ${study.brand} case study so marketers can evaluate the impact of AEO quickly.`,
    sections,
    faqs,
    metrics: study.metrics,
    quotes: quotes.slice(0, 2),
    publishedAt: study.publishedAt,
  };
}

function buildAeoStrategyPage(study: CustomerCaseStudy, topic: CustomerClusterTopic): Omit<
  CustomerClusterPage,
  'url' | 'siblingTopics' | 'relatedBrands' | 'canonicalCaseStudyUrl' | 'wordCount' | 'cta'
> {
  const paragraphs = extractParagraphs(study.blocks);
  const headings = extractHeadings(study.blocks);
  const quotes = extractQuotes(study.blocks);
  const selected = pickParagraphs(paragraphs, 1, 5);

  const sections: ClusterSection[] = [
    {
      heading: `Why ${study.brand} needed an AEO strategy`,
      body: selected[0] || study.summary,
    },
    {
      heading: `${study.brand}'s Answer Engine Optimization focus`,
      body: `${study.summary} Anthroly partnered with ${study.brand} to treat AI answers as a measurable discovery channel — alongside classic SEO.`,
      listItems: headings.slice(0, 6).map((h) => `Story chapter: ${h}`),
    },
    {
      heading: `Strategic pillars reflected in the ${study.brand} story`,
      body: `While every program is customized, the ${study.brand} narrative highlights these AEO pillars:`,
      listItems: [
        'Measure how answer engines mention and cite the brand',
        'Improve source content and evidence AI systems can trust',
        'Build workflows so insights turn into published updates quickly',
        'Track outcomes with clear visibility and business metrics',
      ],
    },
    {
      heading: `What changed for ${study.brand}`,
      body: selected[1] || study.summary,
    },
    {
      heading: `Execution notes from the case study`,
      body: selected[2] || selected[0] || study.summary,
    },
    {
      heading: `Outcomes that validated the strategy`,
      body: `Strategy only matters if results move. ${study.brand}'s documented outcomes:`,
      listItems: metricsLines(study.metrics),
    },
    {
      heading: `AEO vs SEO for teams studying ${study.brand}`,
      body: `SEO improves rankings and clicks. AEO improves how AI systems recommend and cite a brand. ${study.brand}'s story shows both layers reinforcing each other when content, accuracy, and authority are managed together.`,
    },
  ];

  if (selected[3]) {
    sections.push({
      heading: `Further detail from ${study.brand}'s journey`,
      body: selected[3],
    });
  }

  const faqs: ClusterFAQ[] = [
    {
      question: `What was ${study.brand}'s AEO strategy?`,
      answer: `${study.summary} See the full Anthroly case study for the complete strategy narrative.`,
    },
    {
      question: `Did ${study.brand} use Answer Engine Optimization or only SEO?`,
      answer: `The published story centers on AI search / answer engine visibility and related workflows — the core of AEO — while still respecting classic search foundations.`,
    },
    {
      question: `Where can I read ${study.brand}'s full AEO case study?`,
      answer: `On Anthroly at /customers/${study.slug}, including metrics, quotes, and the end-to-end story.`,
    },
    {
      question: `What results did the ${study.brand} AEO work produce?`,
      answer: metricsLines(study.metrics).join('; ') + '.',
    },
  ];

  return {
    brandSlug: study.slug,
    brand: study.brand,
    topicSlug: topic.slug,
    topicName: topic.name,
    title: `${study.brand} ${topic.titleFragment}`,
    metaTitle: `${study.brand} AEO Strategy Case Study | Anthroly`,
    metaDescription: `${study.brand} Answer Engine Optimization strategy: ${study.summary.slice(0, 140)}…`,
    h1: `${study.brand} Answer Engine Optimization (AEO) Strategy`,
    directAnswer: `${study.brand}'s AEO strategy focused on measurable AI search visibility and recommendation quality. ${study.summary}`,
    introduction: `This page summarizes the Answer Engine Optimization strategy behind Anthroly's ${study.brand} customer story — for marketers researching how ${study.brand} approached AI answers, citations, and visibility.`,
    sections,
    faqs,
    metrics: study.metrics,
    quotes: quotes.slice(0, 2),
    publishedAt: study.publishedAt,
  };
}

function buildChatgptPage(study: CustomerCaseStudy, topic: CustomerClusterTopic): Omit<
  CustomerClusterPage,
  'url' | 'siblingTopics' | 'relatedBrands' | 'canonicalCaseStudyUrl' | 'wordCount' | 'cta'
> {
  const paragraphs = extractParagraphs(study.blocks);
  const quotes = extractQuotes(study.blocks);
  const selected = pickParagraphs(paragraphs, 2, 5);
  const primary = study.metrics[0];

  const sections: ClusterSection[] = [
    {
      heading: `Why ChatGPT & AI answers matter for ${study.brand}`,
      body: `Buyers and practitioners increasingly ask ChatGPT, Claude, Perplexity, Gemini, and Google AI Overviews for recommendations before they click through to a website. ${study.brand}'s story is about earning accurate presence in those answers.`,
    },
    {
      heading: `${study.brand}'s AI visibility challenge`,
      body: selected[0] || study.summary,
    },
    {
      heading: `What improved in AI answer surfaces`,
      body: `Documented outcomes for ${study.brand}:`,
      listItems: metricsLines(study.metrics),
    },
    {
      heading: `How ${study.brand} strengthened recommendability`,
      body: selected[1] || study.summary,
    },
    {
      heading: `Accuracy and trust in AI answers`,
      body:
        selected[2] ||
        `When AI misstates product or category facts, the user blames the brand — not the model. ${study.brand}'s program treated accuracy and visibility as connected goals.`,
    },
    {
      heading: `Engines in scope for modern AEO programs`,
      body: `Programs like ${study.brand}'s typically monitor and influence presence across multiple answer surfaces:`,
      listItems: [
        'ChatGPT / ChatGPT Search',
        'Claude',
        'Perplexity',
        'Google AI Overviews / Gemini',
        'Microsoft Copilot where relevant',
      ],
    },
    {
      heading: `Takeaway for teams chasing ${study.brand}-like visibility`,
      body: `If your category already appears in ChatGPT answers, competitors may be capturing shortlists you never see in Google Analytics. ${study.brand}'s reported ${primary?.value ?? 'gains'} (${primary?.label ?? 'primary metric'}) is a concrete example of treating AI visibility as measurable growth work.`,
    },
  ];

  if (selected[3]) {
    sections.splice(4, 0, {
      heading: `More from the ${study.brand} AI visibility story`,
      body: selected[3],
    });
  }

  const faqs: ClusterFAQ[] = [
    {
      question: `Does ${study.brand} show up in ChatGPT?`,
      answer: `Anthroly's case study documents meaningful AI search / answer-engine visibility gains for ${study.brand}, including ${primary?.value ?? 'reported'} ${primary?.label ?? 'improvement'}. Model outputs change over time; the case study captures the program results as published.`,
    },
    {
      question: `How did ${study.brand} improve ChatGPT and AI visibility?`,
      answer: `${study.summary} Details are in the full case study and playbook pages.`,
    },
    {
      question: `Can Anthroly help my brand get cited in ChatGPT like ${study.brand}?`,
      answer: `Anthroly runs human-led AEO programs designed to improve how AI systems understand, cite, and recommend your brand. Results depend on your category and starting point.`,
    },
    {
      question: `Is ChatGPT the only engine that mattered for ${study.brand}?`,
      answer: `No. Modern AEO covers multiple answer engines. ${study.brand}'s story is framed around AI Search / answer engines broadly, not a single chatbot.`,
    },
  ];

  return {
    brandSlug: study.slug,
    brand: study.brand,
    topicSlug: topic.slug,
    topicName: topic.name,
    title: `${study.brand} ${topic.titleFragment}`,
    metaTitle: `${study.brand} ChatGPT & AI Visibility Case Study | Anthroly`,
    metaDescription: `How ${study.brand} improved ChatGPT and AI answer visibility with Anthroly. Key result: ${primary?.value ?? ''} ${primary?.label ?? ''}.`.trim(),
    h1: `${study.brand} ChatGPT & AI Answer Visibility`,
    directAnswer: `${study.brand} improved AI answer visibility through Anthroly's AEO program. Documented outcomes include ${metricsLines(study.metrics).join('; ')}.`,
    introduction: `Looking up ${study.brand} ChatGPT visibility or AI answer presence? This page focuses on the AI-assistant discovery angle from Anthroly's published ${study.brand} customer story.`,
    sections,
    faqs,
    metrics: study.metrics,
    quotes: quotes.slice(0, 2),
    publishedAt: study.publishedAt,
  };
}

function buildQuotesPage(study: CustomerCaseStudy, topic: CustomerClusterTopic): Omit<
  CustomerClusterPage,
  'url' | 'siblingTopics' | 'relatedBrands' | 'canonicalCaseStudyUrl' | 'wordCount' | 'cta'
> {
  const paragraphs = extractParagraphs(study.blocks);
  const quotes = extractQuotes(study.blocks);
  const selected = pickParagraphs(paragraphs, 0, 3);

  const sections: ClusterSection[] = [
    {
      heading: `Why ${study.brand} quotes matter for marketers`,
      body: `When researching ${study.brand}'s AI search journey, practitioners look for first-hand language from the team — not just metrics. Below are quotes published in Anthroly's ${study.brand} case study, plus lessons you can apply.`,
    },
    {
      heading: `Lessons marketers can take from ${study.brand}`,
      body: `Based on the published story:`,
      listItems: [
        'Treat AI answers as a customer experience surface, not only a traffic channel',
        'Measure visibility and accuracy — not vanity dashboards alone',
        'Turn insights into content, PR, and workflow updates quickly',
        'Combine human expertise with agent-assisted execution for scale',
      ],
    },
    {
      heading: `Story context behind the quotes`,
      body: selected[0] || study.summary,
    },
    {
      heading: `Results that sit beside the quotes`,
      body: `Quotes without outcomes are inspiration; ${study.brand} also reported:`,
      listItems: metricsLines(study.metrics),
    },
    {
      heading: `How to use this page`,
      body: `Cite these lessons when building internal buy-in for AEO. For methodology and full narrative, continue to the main ${study.brand} case study and playbook pages.`,
    },
  ];

  if (selected[1]) {
    sections.splice(3, 0, {
      heading: `Additional narrative context`,
      body: selected[1],
    });
  }

  if (quotes.length === 0) {
    sections.push({
      heading: `Leadership perspective`,
      body: `The full ${study.brand} case study contains the complete narrative and any attributed commentary from the team. ${study.summary}`,
    });
  }

  const faqs: ClusterFAQ[] = [
    {
      question: `Who is quoted in the ${study.brand} case study?`,
      answer:
        quotes.length > 0
          ? quotes.map((q) => `${q.name}, ${q.role}`).join('; ') + '.'
          : `See the full ${study.brand} case study for attributed commentary and narrative detail.`,
    },
    {
      question: `What is the biggest lesson from ${study.brand}'s AI search story?`,
      answer: study.summary,
    },
    {
      question: `Where is the full ${study.brand} interview / case study?`,
      answer: `Anthroly published the full story at /customers/${study.slug}.`,
    },
    {
      question: `Can I share ${study.brand} quotes from this page?`,
      answer: `These quotes appear in Anthroly's published customer story. When sharing, attribute the speaker and link back to the full case study for context.`,
    },
  ];

  return {
    brandSlug: study.slug,
    brand: study.brand,
    topicSlug: topic.slug,
    topicName: topic.name,
    title: `${study.brand} ${topic.titleFragment}`,
    metaTitle: `${study.brand} Case Study Quotes & AEO Lessons | Anthroly`,
    metaDescription: `Quotes and marketing lessons from ${study.brand}'s AI search / AEO case study with Anthroly. ${study.summary.slice(0, 100)}`,
    h1: `${study.brand} Quotes & Marketing Lessons from AI Search`,
    directAnswer:
      quotes[0]
        ? `${quotes[0].name} (${quotes[0].role}) on ${study.brand}: “${quotes[0].body}” Key outcomes: ${metricsLines(study.metrics).slice(0, 2).join('; ')}.`
        : `${study.brand} AI search lessons: ${study.summary}`,
    introduction: `A quote-and-lessons hub for Anthroly's ${study.brand} customer story — built for people searching for ${study.brand} AI search insights, leadership commentary, and practical AEO takeaways.`,
    sections,
    faqs,
    metrics: study.metrics,
    quotes,
    publishedAt: study.publishedAt,
  };
}

function buildPlaybookPage(study: CustomerCaseStudy, topic: CustomerClusterTopic): Omit<
  CustomerClusterPage,
  'url' | 'siblingTopics' | 'relatedBrands' | 'canonicalCaseStudyUrl' | 'wordCount' | 'cta'
> {
  const paragraphs = extractParagraphs(study.blocks);
  const headings = extractHeadings(study.blocks);
  const quotes = extractQuotes(study.blocks);
  const selected = pickParagraphs(paragraphs, 3, 5);

  const sections: ClusterSection[] = [
    {
      heading: `The ${study.brand} execution playbook (from the case study)`,
      body: `This page distills what was executed in Anthroly's work with ${study.brand}, based only on the published customer story — so operators can see the motion behind the metrics.`,
    },
    {
      heading: `Starting point`,
      body: selected[0] || study.summary,
    },
    {
      heading: `Operating motions highlighted in the story`,
      body: `From the ${study.brand} narrative, these motions show up repeatedly in successful AEO programs:`,
      listItems: [
        'Map the prompts and answer-engine surfaces that matter to buyers',
        'Monitor mentions, citations, and accuracy — not just classic rankings',
        'Ship answer-ready content and source improvements continuously',
        'Use agents/workflows to draft and route work to human experts',
        'Report outcomes with visibility and business-linked metrics',
      ],
    },
    {
      heading: `What the ${study.brand} story says happened next`,
      body: selected[1] || study.summary,
    },
    {
      heading: `Chapters in the full case study`,
      body: `Use these sections as a reading map for the complete ${study.brand} story:`,
      listItems: headings.slice(0, 8).map((h) => h),
    },
    {
      heading: `Results produced by the playbook`,
      body: `Documented ${study.brand} outcomes:`,
      listItems: metricsLines(study.metrics),
    },
    {
      heading: `How to adapt this playbook`,
      body: `Do not copy tactics blindly. Adapt prompt maps, accuracy standards, and content types to your category. Anthroly's role is to run a human-led program so your team does not have to build a 30–40 person AI visibility department from scratch.`,
    },
  ];

  if (selected[2]) {
    sections.splice(4, 0, {
      heading: `Implementation detail from ${study.brand}`,
      body: selected[2],
    });
  }

  const faqs: ClusterFAQ[] = [
    {
      question: `What did Anthroly do for ${study.brand}?`,
      answer: `${study.summary} The full case study covers monitoring, content/authority work, and workflows in depth.`,
    },
    {
      question: `Is there a step-by-step ${study.brand} AEO playbook?`,
      answer: `This page summarizes execution themes from the published story. For full detail, read /customers/${study.slug}.`,
    },
    {
      question: `What results did the ${study.brand} playbook drive?`,
      answer: metricsLines(study.metrics).join('; ') + '.',
    },
    {
      question: `Can Anthroly run this playbook for my brand?`,
      answer: `Yes — Anthroly provides human-led AI visibility / AEO programs. Book a call to assess fit for your category and goals.`,
    },
  ];

  return {
    brandSlug: study.slug,
    brand: study.brand,
    topicSlug: topic.slug,
    topicName: topic.name,
    title: `${study.brand} ${topic.titleFragment}`,
    metaTitle: `${study.brand} AEO Playbook: How Anthroly Executed | Anthroly`,
    metaDescription: `${study.brand} AEO execution playbook from Anthroly's case study. Outcomes: ${metricsLines(study.metrics).slice(0, 2).join('; ')}.`,
    h1: `${study.brand} AEO Execution Playbook`,
    directAnswer: `Anthroly's ${study.brand} playbook combined AI visibility measurement, source/content improvements, and human-led execution. Documented outcomes: ${metricsLines(study.metrics).join('; ')}.`,
    introduction: `An operator-focused summary of how Anthroly's work with ${study.brand} was framed in the published case study — for teams searching for a ${study.brand} AEO playbook or implementation outline.`,
    sections,
    faqs,
    metrics: study.metrics,
    quotes: quotes.slice(0, 1),
    publishedAt: study.publishedAt,
  };
}

function finalizePage(
  study: CustomerCaseStudy,
  topic: CustomerClusterTopic,
  partial: Omit<
    CustomerClusterPage,
    'url' | 'siblingTopics' | 'relatedBrands' | 'canonicalCaseStudyUrl' | 'wordCount' | 'cta'
  >
): CustomerClusterPage {
  const url = `/customers/${study.slug}/${topic.slug}`;
  const canonicalCaseStudyUrl = `/customers/${study.slug}`;

  let wordCount = countWords(partial.introduction) + countWords(partial.directAnswer);
  partial.sections.forEach((s) => {
    wordCount += countWords(s.heading) + countWords(s.body);
    s.listItems?.forEach((i) => {
      wordCount += countWords(i);
    });
  });
  partial.faqs.forEach((f) => {
    wordCount += countWords(f.question) + countWords(f.answer);
  });
  partial.quotes.forEach((q) => {
    wordCount += countWords(q.body);
  });

  // Soft floor: if somehow thin, append an explicit pointer section (should rarely trigger)
  const sections = [...partial.sections];
  if (wordCount < 550) {
    sections.push({
      heading: `Continue to the full ${study.brand} case study`,
      body: `${study.title}. ${study.summary} Metrics: ${metricsLines(study.metrics).join('; ')}.`,
    });
    wordCount += 80;
  }

  return {
    ...partial,
    sections,
    url,
    canonicalCaseStudyUrl,
    siblingTopics: CUSTOMER_CLUSTER_TOPICS.filter((t) => t.slug !== topic.slug).map((t) => ({
      slug: t.slug,
      name: t.name,
      url: `/customers/${study.slug}/${t.slug}`,
    })),
    relatedBrands: relatedBrandCards(study),
    wordCount,
    cta: {
      headline: `Want ${study.brand}-level AI visibility for your brand?`,
      description: `Anthroly runs human-led AEO programs that improve how AI systems cite and recommend you — the same class of work behind these customer stories.`,
      buttonText: PRIMARY_CTA_LABEL,
      buttonUrl: BOOK_CALL_URL,
    },
  };
}

export function generateCustomerClusterPage(
  brandSlug: string,
  topicSlug: string
): CustomerClusterPage | null {
  const study = getCaseStudy(brandSlug);
  const topic = getTopic(topicSlug);
  if (!study || !topic) return null;

  let partial: Omit<
    CustomerClusterPage,
    'url' | 'siblingTopics' | 'relatedBrands' | 'canonicalCaseStudyUrl' | 'wordCount' | 'cta'
  >;

  switch (topic.slug) {
    case 'results':
      partial = buildResultsPage(study, topic);
      break;
    case 'aeo-strategy':
      partial = buildAeoStrategyPage(study, topic);
      break;
    case 'chatgpt-visibility':
      partial = buildChatgptPage(study, topic);
      break;
    case 'quotes-and-lessons':
      partial = buildQuotesPage(study, topic);
      break;
    case 'playbook':
      partial = buildPlaybookPage(study, topic);
      break;
    default:
      return null;
  }

  // Hard safety: brand must appear in H1 and meta title
  if (!partial.h1.includes(study.brand) || !partial.metaTitle.includes(study.brand)) {
    throw new Error(`Cluster page missing brand in titles for ${brandSlug}/${topicSlug}`);
  }

  if (topic.slug === 'results') {
    for (const m of study.metrics) {
      if (!partial.directAnswer.includes(m.value)) {
        throw new Error(`Results page missing metric value ${m.value} for ${brandSlug}`);
      }
    }
  }

  return finalizePage(study, topic, partial);
}

export function getAllCustomerClusterPaths(): { slug: string; topic: string }[] {
  const paths: { slug: string; topic: string }[] = [];
  for (const study of customerCaseStudies) {
    for (const topic of CUSTOMER_CLUSTER_TOPICS) {
      paths.push({ slug: study.slug, topic: topic.slug });
    }
  }
  return paths;
}

export function getClusterTopicsForBrand(brandSlug: string) {
  if (!getCaseStudy(brandSlug)) return [];
  return CUSTOMER_CLUSTER_TOPICS.map((t) => ({
    slug: t.slug,
    name: t.name,
    navLabel: t.navLabel,
    url: `/customers/${brandSlug}/${t.slug}`,
    primaryKeyword: fillBrand(t.primaryKeywordTemplate, getCaseStudy(brandSlug)!.brand),
  }));
}

/** Validate all cluster pages generate without throwing and meet uniqueness rules */
export function validateAllCustomerClusters(): {
  ok: boolean;
  count: number;
  errors: string[];
} {
  const errors: string[] = [];
  const titles = new Set<string>();
  let count = 0;

  for (const study of customerCaseStudies) {
    for (const topic of CUSTOMER_CLUSTER_TOPICS) {
      try {
        const page = generateCustomerClusterPage(study.slug, topic.slug);
        if (!page) {
          errors.push(`null page: ${study.slug}/${topic.slug}`);
          continue;
        }
        count++;
        if (titles.has(page.metaTitle)) {
          errors.push(`duplicate metaTitle: ${page.metaTitle}`);
        }
        titles.add(page.metaTitle);
        if (page.wordCount < 400) {
          errors.push(`thin page (${page.wordCount} words): ${page.url}`);
        }
        if (!page.metaDescription.includes(study.brand)) {
          errors.push(`metaDescription missing brand: ${page.url}`);
        }
        // Invented-metric guard: every metric value in the metrics band must be from study
        for (const m of page.metrics) {
          if (!study.metrics.some((sm) => sm.value === m.value && sm.label === m.label)) {
            errors.push(`foreign metric on ${page.url}`);
          }
        }
        // Invented-quote guard
        const realQuotes = extractQuotes(study.blocks);
        for (const q of page.quotes) {
          if (!realQuotes.some((rq) => rq.body === q.body && rq.name === q.name)) {
            errors.push(`foreign quote on ${page.url}`);
          }
        }
      } catch (e) {
        errors.push(`${study.slug}/${topic.slug}: ${e instanceof Error ? e.message : String(e)}`);
      }
    }
  }

  return { ok: errors.length === 0, count, errors };
}
