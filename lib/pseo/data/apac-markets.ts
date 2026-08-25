/**
 * Priority APAC markets for country-level SEO / AEO pages.
 * Focus: Singapore, China, Australia (heavy) + New Zealand.
 *
 * These power /markets/[country] and /markets/[country]/[topic]
 * with unique long-form copy — not thin template swaps.
 */

export type ApacCountrySlug = 'singapore' | 'australia' | 'china' | 'new-zealand';

export type ApacTopicKind = 'service' | 'industry' | 'engine';

export interface ApacCountry {
  slug: ApacCountrySlug;
  name: string;
  shortName: string;
  adjective: string;
  currency: string;
  primaryLanguage: string;
  languages: string[];
  timezone: string;
  cities: { name: string; slug: string; note: string }[];
  searchEngines: string[];
  aiPlatforms: string[];
  businessHubs: string[];
  industries: string[];
  localKeywords: string[];
  /** Unique market narrative — used in hub intro */
  marketOverview: string;
  /** Why AI search matters locally */
  aiSearchContext: string;
  /** Competitive / regulatory nuances */
  localNuances: string[];
  /** Buyer intent phrases common in this market */
  buyerQuestions: string[];
  stats: { label: string; value: string }[];
  metaFocus: string;
}

export interface ApacTopic {
  slug: string;
  name: string;
  kind: ApacTopicKind;
  primaryKeywordTemplate: string; // "{country}" placeholder
  secondaryKeywords: string[];
  h1Template: string;
  angle: string;
  outcomes: string[];
  faqSeed: { q: string; a: string }[];
}

export const apacCountries: ApacCountry[] = [
  {
    slug: 'singapore',
    name: 'Singapore',
    shortName: 'Singapore',
    adjective: 'Singaporean',
    currency: 'SGD',
    primaryLanguage: 'English',
    languages: ['English', 'Mandarin', 'Malay', 'Tamil'],
    timezone: 'Asia/Singapore',
    cities: [
      { name: 'Singapore CBD', slug: 'singapore', note: 'Regional HQ and financial district' },
      { name: 'Marina Bay', slug: 'singapore', note: 'Enterprise and fintech cluster' },
      { name: 'One-North', slug: 'singapore', note: 'Deep tech and AI research corridor' },
    ],
    searchEngines: ['Google', 'Google AI Overviews'],
    aiPlatforms: ['ChatGPT', 'Claude', 'Gemini', 'Perplexity', 'Microsoft Copilot'],
    businessHubs: [
      'Regional APAC headquarters',
      'Fintech and wealth tech',
      'Enterprise SaaS',
      'Logistics and trade',
      'Healthcare and biotech',
      'Government-linked digital transformation',
    ],
    industries: [
      'Fintech',
      'SaaS',
      'Cybersecurity',
      'Professional services',
      'Logistics',
      'Healthcare',
      'E-commerce',
      'Education',
    ],
    localKeywords: [
      'AI SEO Singapore',
      'AEO agency Singapore',
      'ChatGPT SEO Singapore',
      'answer engine optimization Singapore',
      'AI visibility Singapore',
      'SEO agency Singapore for SaaS',
    ],
    marketOverview:
      'Singapore is the APAC command center for global brands. English-first buyers, high digital maturity, and dense competition mean ranking on Google alone is no longer enough—CFOs, CTOs, and procurement teams ask ChatGPT, Claude, and Perplexity which vendor to shortlist before they ever click a blue link.',
    aiSearchContext:
      'In Singapore, AI assistants are already part of B2B research. Multinational buyers compare vendors in ChatGPT; founders validate categories in Perplexity; enterprise teams paste RFPs into Claude. If your brand is missing from those answers, you lose the shortlist before the sales call.',
    localNuances: [
      'English is the primary business language—content quality expectations are extremely high.',
      'Many companies run APAC campaigns from Singapore for SEA and Greater China.',
      'PDPA and trust signals matter for fintech, healthcare, and enterprise buyers.',
      'Regional HQs evaluate agencies that can operate across time zones and markets.',
      'Competitors are often global brands with large content budgets—precision beats volume.',
    ],
    buyerQuestions: [
      'What is the best AI SEO agency in Singapore?',
      'How do Singapore SaaS companies get cited in ChatGPT?',
      'Who helps with answer engine optimization in Singapore?',
      'How can my brand show up in Google AI Overviews in Singapore?',
      'What is AEO vs SEO for Singapore B2B companies?',
    ],
    stats: [
      { label: 'Business language', value: 'English-first' },
      { label: 'Priority engines', value: 'Google + ChatGPT + Claude' },
      { label: 'Buyer profile', value: 'APAC HQ & enterprise' },
      { label: 'Focus', value: 'AEO + B2B authority' },
    ],
    metaFocus: 'AI SEO, AEO, and ChatGPT visibility for Singapore businesses',
  },
  {
    slug: 'australia',
    name: 'Australia',
    shortName: 'Australia',
    adjective: 'Australian',
    currency: 'AUD',
    primaryLanguage: 'English',
    languages: ['English'],
    timezone: 'Australia/Sydney',
    cities: [
      { name: 'Sydney', slug: 'sydney', note: 'Finance, SaaS, and APAC HQs' },
      { name: 'Melbourne', slug: 'melbourne', note: 'Creative, healthtech, and startups' },
      { name: 'Brisbane', slug: 'brisbane', note: 'Growth market and services' },
      { name: 'Perth', slug: 'perth', note: 'Resources, energy, and services' },
      { name: 'Adelaide', slug: 'adelaide', note: 'Defence, tech, and education' },
      { name: 'Canberra', slug: 'canberra', note: 'Government and enterprise' },
      { name: 'Gold Coast', slug: 'gold-coast', note: 'Tourism and lifestyle brands' },
    ],
    searchEngines: ['Google', 'Google AI Overviews'],
    aiPlatforms: ['ChatGPT', 'Claude', 'Gemini', 'Perplexity', 'Microsoft Copilot'],
    businessHubs: [
      'Financial services (Sydney)',
      'Healthtech and education (Melbourne)',
      'Government and defence (Canberra)',
      'Resources and energy (Perth)',
      'Tourism and hospitality',
      'National SaaS and marketplace brands',
    ],
    industries: [
      'SaaS',
      'Healthcare',
      'Fintech',
      'E-commerce',
      'Professional services',
      'Education',
      'Real estate',
      'Travel',
      'Cybersecurity',
    ],
    localKeywords: [
      'AI SEO Australia',
      'AEO agency Australia',
      'SEO agency Sydney AI search',
      'ChatGPT SEO Melbourne',
      'answer engine optimization Australia',
      'AI visibility Australia',
    ],
    marketOverview:
      'Australian buyers research nationally, then decide locally. Brands in Sydney, Melbourne, Brisbane, and Perth compete in Google—and increasingly in AI answers that shape category shortlists for SaaS, healthcare, finance, and professional services.',
    aiSearchContext:
      'Australians are heavy ChatGPT and Google AI Overview users. Category queries like “best payroll software Australia” or “best SEO agency Melbourne” increasingly return AI summaries. Brands that only optimize for classic SERPs lose the recommendation layer.',
    localNuances: [
      'Australian English spelling and local proof points outperform US-centric content.',
      'National brands still need city-level authority for Sydney, Melbourne, and Brisbane.',
      'YMYL verticals (health, finance, legal) need strong E-E-A-T and original research.',
      'Timezone advantage for APAC delivery with English-native content quality.',
      'Competition includes local agencies plus global platforms entering AU markets.',
    ],
    buyerQuestions: [
      'Best AI SEO agency in Australia?',
      'How do Australian brands get recommended in ChatGPT?',
      'AEO services for Sydney and Melbourne companies?',
      'How to rank in Google AI Overviews Australia?',
      'SEO vs AEO for Australian e-commerce brands?',
    ],
    stats: [
      { label: 'Priority cities', value: 'Sydney · Melbourne · Brisbane' },
      { label: 'Language', value: 'Australian English' },
      { label: 'AI surfaces', value: 'ChatGPT + AI Overviews' },
      { label: 'Focus', value: 'National + city AEO' },
    ],
    metaFocus: 'AI SEO and AEO for Australian brands in Sydney, Melbourne, and nationwide',
  },
  {
    slug: 'china',
    name: 'China',
    shortName: 'China',
    adjective: 'Chinese',
    currency: 'CNY',
    primaryLanguage: 'Mandarin Chinese',
    languages: ['Mandarin', 'English (international / export)'],
    timezone: 'Asia/Shanghai',
    cities: [
      { name: 'Shanghai', slug: 'shanghai', note: 'Finance, ecommerce, multinationals' },
      { name: 'Beijing', slug: 'beijing', note: 'Tech, AI, policy, headquarters' },
      { name: 'Shenzhen', slug: 'shenzhen', note: 'Hardware, electronics, innovation' },
      { name: 'Guangzhou', slug: 'guangzhou', note: 'Trade and manufacturing' },
      { name: 'Hangzhou', slug: 'hangzhou', note: 'Ecommerce and tech platforms' },
      { name: 'Chengdu', slug: 'chengdu', note: 'West China growth hub' },
      { name: 'Hong Kong', slug: 'hong-kong', note: 'Gateway for international brands' },
    ],
    searchEngines: ['Baidu', 'Google (international / export audiences)', 'Bing'],
    aiPlatforms: [
      'ChatGPT (global buyers)',
      'Claude (global buyers)',
      'Perplexity',
      'Gemini',
      'Domestic AI assistants for local discovery',
    ],
    businessHubs: [
      'Export and cross-border ecommerce',
      'Hardware and manufacturing brands going global',
      'SaaS and enterprise software with overseas GTM',
      'Fintech and payments for international corridors',
      'Consumer brands expanding into Western AI search',
      'Multinationals with China + global visibility needs',
    ],
    industries: [
      'Manufacturing',
      'E-commerce',
      'SaaS',
      'Cybersecurity',
      'Fintech',
      'Travel',
      'Automotive',
      'Education',
    ],
    localKeywords: [
      'AI SEO China',
      'AEO for Chinese brands going global',
      'ChatGPT visibility for China exporters',
      'SEO agency Shanghai AI search',
      'answer engine optimization China',
      'get cited in ChatGPT from China',
    ],
    marketOverview:
      'China-based companies that sell globally must win where international buyers research: Google, ChatGPT, Claude, and Perplexity. Domestic platforms matter locally—but for export, SaaS, hardware, and cross-border brands, Western AI answers increasingly decide who gets shortlisted overseas.',
    aiSearchContext:
      'Procurement teams in the US, Europe, Singapore, and Australia ask AI which Chinese manufacturer, SaaS, or brand to trust. If your English-language entity, citations, and evidence are weak, AI recommends competitors—even when your product is stronger.',
    localNuances: [
      'Separate strategies for domestic discovery vs global AI/Google visibility.',
      'English content quality, entity clarity, and third-party citations are critical for exporters.',
      'Shanghai, Beijing, Shenzhen, Hangzhou, and Guangzhou each have distinct industry clusters.',
      'Hong Kong often acts as the international brand and communications bridge.',
      'Technical SEO must account for hosting, crawlability, and international hreflang where relevant.',
    ],
    buyerQuestions: [
      'How can a China-based brand get recommended in ChatGPT?',
      'Best AEO agency for Chinese exporters?',
      'AI SEO for Shanghai and Shenzhen companies going global?',
      'How to improve Google and AI visibility from China?',
      'What is answer engine optimization for cross-border ecommerce?',
    ],
    stats: [
      { label: 'Priority cities', value: 'Shanghai · Beijing · Shenzhen' },
      { label: 'Dual focus', value: 'Global AI + export SEO' },
      { label: 'Languages', value: 'EN for global · ZH local' },
      { label: 'Outcome', value: 'Overseas AI recommendations' },
    ],
    metaFocus: 'AI SEO and AEO for China brands winning Google and ChatGPT with global buyers',
  },
  {
    slug: 'new-zealand',
    name: 'New Zealand',
    shortName: 'New Zealand',
    adjective: 'New Zealand',
    currency: 'NZD',
    primaryLanguage: 'English',
    languages: ['English', 'Māori'],
    timezone: 'Pacific/Auckland',
    cities: [
      { name: 'Auckland', slug: 'auckland', note: 'Largest commercial hub' },
      { name: 'Wellington', slug: 'wellington', note: 'Government, tech, creative' },
      { name: 'Christchurch', slug: 'christchurch', note: 'South Island business center' },
      { name: 'Hamilton', slug: 'hamilton', note: 'Growth and services market' },
      { name: 'Tauranga', slug: 'tauranga', note: 'Trade and regional growth' },
      { name: 'Queenstown', slug: 'queenstown', note: 'Tourism and experience brands' },
    ],
    searchEngines: ['Google', 'Google AI Overviews'],
    aiPlatforms: ['ChatGPT', 'Claude', 'Gemini', 'Perplexity'],
    businessHubs: [
      'SaaS and tech exports',
      'Tourism and hospitality',
      'Agritech and food brands',
      'Professional services',
      'Government and civic tech',
      'Consumer brands selling into AU/US',
    ],
    industries: [
      'SaaS',
      'Travel',
      'E-commerce',
      'Professional services',
      'Education',
      'Healthcare',
      'Fintech',
      'Agriculture tech',
    ],
    localKeywords: [
      'AI SEO New Zealand',
      'AEO agency Auckland',
      'ChatGPT SEO New Zealand',
      'SEO agency Wellington AI',
      'answer engine optimization NZ',
      'AI visibility New Zealand',
    ],
    marketOverview:
      'New Zealand brands punch above their weight internationally—but many still underinvest in AI search. Auckland and Wellington companies competing in AU, US, and UK markets need Google rankings and AI recommendations that travel with their buyers.',
    aiSearchContext:
      'NZ buyers and overseas customers ask AI for “best [category] New Zealand” and compare local vendors against Australian and global alternatives. Visibility in ChatGPT and Google AI Overviews is becoming a trust signal for export-minded NZ brands.',
    localNuances: [
      'Smaller market—authority and originality outperform generic content farms.',
      'Many NZ companies sell into Australia; content should win both NZ and AU intent.',
      'Tourism, SaaS, and food/agritech have distinct AI-query patterns.',
      'Local proof, case studies, and .co.nz trust signals still matter.',
      'Lean teams benefit from a managed human-led AEO program over DIY tooling.',
    ],
    buyerQuestions: [
      'Best AI SEO agency in New Zealand?',
      'How do Auckland companies get cited in ChatGPT?',
      'AEO services for New Zealand SaaS exporters?',
      'SEO and AI Overviews for NZ tourism brands?',
      'How to compete with Australian brands in AI search?',
    ],
    stats: [
      { label: 'Priority cities', value: 'Auckland · Wellington' },
      { label: 'Export focus', value: 'AU · US · UK buyers' },
      { label: 'AI surfaces', value: 'ChatGPT + AI Overviews' },
      { label: 'Advantage', value: 'Lean teams, high trust' },
    ],
    metaFocus: 'AI SEO and AEO for New Zealand brands in Auckland, Wellington, and export markets',
  },
];

/** Topics that combine with each country → indexable spoke pages */
export const apacTopics: ApacTopic[] = [
  // Services
  {
    slug: 'answer-engine-optimization',
    name: 'Answer Engine Optimization (AEO)',
    kind: 'service',
    primaryKeywordTemplate: 'answer engine optimization {country}',
    secondaryKeywords: ['AEO agency', 'AI answer optimization', 'get cited in AI search'],
    h1Template: 'Answer Engine Optimization (AEO) in {country}',
    angle:
      'Make your brand the recommendation inside ChatGPT, Claude, Perplexity, Gemini, and Google AI Overviews—not just another blue link.',
    outcomes: [
      'Higher brand mention rate in AI answers',
      'Stronger citation share vs competitors',
      'Content and PR engineered for AI extraction',
      'Weekly human-led monitoring and iteration',
    ],
    faqSeed: [
      {
        q: 'What is AEO?',
        a: 'Answer Engine Optimization improves how AI systems understand, cite, and recommend your brand when users ask commercial questions.',
      },
      {
        q: 'Is AEO different from SEO?',
        a: 'Yes. SEO wins rankings and clicks. AEO wins recommendations and citations inside AI-generated answers. Anthroly runs both together.',
      },
    ],
  },
  {
    slug: 'ai-seo',
    name: 'AI SEO',
    kind: 'service',
    primaryKeywordTemplate: 'AI SEO {country}',
    secondaryKeywords: ['AI powered SEO', 'SEO for AI search', 'AI SEO agency'],
    h1Template: 'AI SEO Agency in {country}',
    angle:
      'Traditional SEO plus AI-search readiness: technical foundations, content systems, and authority work that help Google and answer engines prefer your brand.',
    outcomes: [
      'Sustainable organic growth',
      'AI Overview and assistant readiness',
      'Founder-sourced authority content from one interview a month',
      'Citation-ready pages for Google and answer engines',
    ],
    faqSeed: [
      {
        q: 'What is AI SEO?',
        a: 'AI SEO combines classic search optimization with strategies that help large language models and AI Overviews accurately represent and recommend your brand.',
      },
    ],
  },
  {
    slug: 'ai-visibility',
    name: 'AI Visibility',
    kind: 'service',
    primaryKeywordTemplate: 'AI visibility {country}',
    secondaryKeywords: ['brand visibility in AI', 'AI search monitoring', 'LLM visibility'],
    h1Template: 'AI Visibility Services in {country}',
    angle:
      'Measure and improve how often AI platforms mention, cite, and recommend your brand for the prompts that drive revenue.',
    outcomes: [
      'Prompt-level visibility tracking',
      'Competitive AI share-of-voice',
      'Correction workflows for inaccurate answers',
      'Human researchers improving your entity daily',
    ],
    faqSeed: [
      {
        q: 'What does AI visibility mean?',
        a: 'AI visibility is how often and how accurately AI systems mention your brand when buyers ask category, comparison, and solution questions.',
      },
    ],
  },
  {
    slug: 'chatgpt-seo',
    name: 'ChatGPT SEO',
    kind: 'service',
    primaryKeywordTemplate: 'ChatGPT SEO {country}',
    secondaryKeywords: ['get cited in ChatGPT', 'ChatGPT optimization', 'ChatGPT brand visibility'],
    h1Template: 'ChatGPT SEO & Citation Strategy in {country}',
    angle:
      'Win the prompts buyers type into ChatGPT—category questions, comparisons, and “best of” recommendations that shape shortlists.',
    outcomes: [
      'Higher ChatGPT mention and citation rates',
      'Content structured for model extraction',
      'Third-party sources that ChatGPT trusts',
      'Ongoing prompt monitoring and iteration',
    ],
    faqSeed: [
      {
        q: 'Can you guarantee ChatGPT mentions?',
        a: 'No ethical agency can guarantee model outputs. We systematically improve the evidence, content, and citations that increase your probability of being recommended.',
      },
    ],
  },
  {
    slug: 'google-ai-overviews',
    name: 'Google AI Overviews',
    kind: 'service',
    primaryKeywordTemplate: 'Google AI Overviews SEO {country}',
    secondaryKeywords: ['AI Overviews optimization', 'SGE SEO', 'get cited in AI Overviews'],
    h1Template: 'Google AI Overviews Optimization in {country}',
    angle:
      'Earn citations and brand presence inside Google AI Overviews while protecting classic organic rankings.',
    outcomes: [
      'AI Overview citation opportunities mapped',
      'Answer-first content and FAQ systems',
      'Entity and E-E-A-T strengthening',
      'SERP + AI Overview reporting',
    ],
    faqSeed: [
      {
        q: 'Do AI Overviews replace SEO?',
        a: 'No. AI Overviews change the SERP, but strong SEO foundations still feed the sources Google cites. We optimize for both layers.',
      },
    ],
  },
  {
    slug: 'generative-engine-optimization',
    name: 'Generative Engine Optimization (GEO)',
    kind: 'service',
    primaryKeywordTemplate: 'GEO generative engine optimization {country}',
    secondaryKeywords: ['GEO agency', 'generative engine optimization', 'LLM SEO'],
    h1Template: 'Generative Engine Optimization (GEO) in {country}',
    angle:
      'Optimize for generative engines that synthesize answers from many sources—so your brand becomes part of the generated narrative.',
    outcomes: [
      'Higher generative citation probability',
      'Source-page optimization for LLMs',
      'Research and digital PR for authority',
      'Cross-engine measurement',
    ],
    faqSeed: [
      {
        q: 'Is GEO the same as AEO?',
        a: 'They overlap. GEO emphasizes generative engines; AEO emphasizes answer engines broadly. Anthroly covers both under one human-led program.',
      },
    ],
  },
  {
    slug: 'digital-pr',
    name: 'Digital PR for AI Citations',
    kind: 'service',
    primaryKeywordTemplate: 'digital PR AI citations {country}',
    secondaryKeywords: ['digital PR agency', 'earned media for AEO', 'citation building'],
    h1Template: 'Digital PR for AI Citations in {country}',
    angle:
      'Earn the third-party mentions and high-authority pages that AI systems cite when recommending brands in your category.',
    outcomes: [
      'Publisher and listicle targeting from citation data',
      'Earned mentions AI systems actually cite',
      'Brand narrative control in earned media',
      'AI citation share growth',
    ],
    faqSeed: [
      {
        q: 'Why does digital PR matter for AI search?',
        a: 'AI systems frequently cite third-party articles, reviews, and listicles. Winning those sources improves both SEO and AI recommendations.',
      },
    ],
  },
  {
    slug: 'content-marketing',
    name: 'AI-Ready Content Marketing',
    kind: 'service',
    primaryKeywordTemplate: 'AI content marketing {country}',
    secondaryKeywords: ['SEO content agency', 'AEO content', 'answer-first content'],
    h1Template: 'AI-Ready Content Marketing in {country}',
    angle:
      'Publish answer-first, citation-ready content that ranks on Google and gets extracted by AI assistants—without sounding like machine filler.',
    outcomes: [
      'Founder-sourced authority content from one interview a month',
      'FAQ and Q&A systems for AI extraction',
      'Topic clusters mapped to real AI prompts',
      'Human editorial quality control',
    ],
    faqSeed: [
      {
        q: 'Is the content AI-written?',
        a: 'We use AI for research velocity, then human researchers and editors refine every asset for accuracy, originality, and brand voice.',
      },
    ],
  },
  {
    slug: 'local-seo',
    name: 'Local SEO + AI Search',
    kind: 'service',
    primaryKeywordTemplate: 'local SEO AI search {country}',
    secondaryKeywords: ['local SEO agency', 'Google Business Profile', 'city SEO'],
    h1Template: 'Local SEO & AI Search in {country}',
    angle:
      'Win city and regional intent on Google Maps and classic local pack—while making sure AI answers mention the right locations and services.',
    outcomes: [
      'Local pack and Maps improvements',
      'City and service-area content systems',
      'Review and citation hygiene',
      'Local prompts monitored in AI tools',
    ],
    faqSeed: [
      {
        q: 'Do AI assistants care about local SEO?',
        a: 'Yes. Location-qualified prompts (“best accountant Auckland”, “fintech agency Singapore”) increasingly surface AI answers that blend local and national sources.',
      },
    ],
  },
  {
    slug: 'b2b-seo',
    name: 'B2B SEO & AEO',
    kind: 'service',
    primaryKeywordTemplate: 'B2B SEO AEO {country}',
    secondaryKeywords: ['B2B SEO agency', 'enterprise AEO', 'demand gen SEO'],
    h1Template: 'B2B SEO & AEO in {country}',
    angle:
      'Help enterprise and mid-market buyers find—and get recommended—your brand during long, AI-assisted research cycles.',
    outcomes: [
      'Bottom-funnel comparison and category pages',
      'AI shortlist inclusion for high-intent prompts',
      'Thought leadership that builds entity authority',
      'Pipeline-aligned reporting',
    ],
    faqSeed: [
      {
        q: 'How does AEO affect B2B pipeline?',
        a: 'Buyers use AI to build vendor shortlists before talking to sales. Showing up in those answers increases qualified inbound and shortens discovery.',
      },
    ],
  },
  {
    slug: 'ecommerce-seo',
    name: 'Ecommerce SEO & AI Shopping',
    kind: 'service',
    primaryKeywordTemplate: 'ecommerce SEO AI {country}',
    secondaryKeywords: ['ecommerce AEO', 'AI shopping visibility', 'product SEO'],
    h1Template: 'Ecommerce SEO & AI Shopping Visibility in {country}',
    angle:
      'Make products discoverable in Google and recommendable in AI shopping and product-research answers.',
    outcomes: [
      'Category and product content systems',
      'AI product-query coverage',
      'Review and specification clarity',
      'Traffic and AI-referred conversion tracking',
    ],
    faqSeed: [
      {
        q: 'Does AI search drive ecommerce revenue?',
        a: 'Yes—especially for considered purchases. Shoppers ask AI for comparisons and then convert on brand sites. We optimize for both discovery and conversion.',
      },
    ],
  },
  {
    slug: 'saas-seo',
    name: 'SaaS SEO & AEO',
    kind: 'service',
    primaryKeywordTemplate: 'SaaS SEO AEO {country}',
    secondaryKeywords: ['SaaS SEO agency', 'SaaS ChatGPT visibility', 'PLG SEO'],
    h1Template: 'SaaS SEO & AEO in {country}',
    angle:
      'Own category, competitor, and integration prompts so AI assistants recommend your product when developers and buyers research software.',
    outcomes: [
      'Category and competitor content systems',
      'Integration and use-case pages',
      'Higher AI referral signup quality',
      'Continuous prompt and citation monitoring',
    ],
    faqSeed: [
      {
        q: 'Why do SaaS companies need AEO now?',
        a: 'Developers and buyers start research in ChatGPT and Claude. If competitors are recommended and you are not, organic signup quality drops even if classic SEO looks healthy.',
      },
    ],
  },
  // Industries
  {
    slug: 'fintech',
    name: 'Fintech',
    kind: 'industry',
    primaryKeywordTemplate: 'fintech SEO AEO {country}',
    secondaryKeywords: ['fintech marketing', 'YMYL SEO', 'financial services AI visibility'],
    h1Template: 'Fintech SEO & AEO in {country}',
    angle:
      'Build trust-grade visibility for regulated financial products across Google and AI answers—without thin hype content.',
    outcomes: [
      'YMYL-safe educational content',
      'Comparison and product explainers AI can cite',
      'Authority and compliance-aware PR',
      'Visibility on high-intent finance prompts',
    ],
    faqSeed: [
      {
        q: 'Is fintech AEO different from normal SEO?',
        a: 'Yes. Accuracy, trust, and compliance language matter more. We prioritize evidence, clarity, and reputable citations over aggressive claims.',
      },
    ],
  },
  {
    slug: 'healthcare',
    name: 'Healthcare',
    kind: 'industry',
    primaryKeywordTemplate: 'healthcare SEO AEO {country}',
    secondaryKeywords: ['healthtech SEO', 'medical E-E-A-T', 'healthcare AI visibility'],
    h1Template: 'Healthcare SEO & AEO in {country}',
    angle:
      'Help health brands earn accurate AI representation and search visibility with medically careful, E-E-A-T-strong content systems.',
    outcomes: [
      'Accurate AI answers about your services',
      'Patient and buyer education content',
      'Local + national healthcare intent coverage',
      'Risk reduction from misinformation in AI answers',
    ],
    faqSeed: [
      {
        q: 'Can AI give wrong healthcare answers about my brand?',
        a: 'Yes. We monitor inaccurate claims and strengthen authoritative sources so AI systems are more likely to cite correct information.',
      },
    ],
  },
  {
    slug: 'cybersecurity',
    name: 'Cybersecurity',
    kind: 'industry',
    primaryKeywordTemplate: 'cybersecurity SEO AEO {country}',
    secondaryKeywords: ['infosec marketing', 'security software SEO', 'cyber AEO'],
    h1Template: 'Cybersecurity SEO & AEO in {country}',
    angle:
      'Win technical evaluation prompts where security buyers ask AI for tools, comparisons, and compliance guidance.',
    outcomes: [
      'Technical comparison and category pages',
      'Compliance and threat-education content',
      'Citation wins on analyst-style listicles',
      'Higher AI shortlist inclusion',
    ],
    faqSeed: [
      {
        q: 'Do security buyers use AI search?',
        a: 'Increasingly yes—especially for shortlists and “best tools for X compliance” queries. Being cited early influences later RFP stages.',
      },
    ],
  },
  {
    slug: 'professional-services',
    name: 'Professional Services',
    kind: 'industry',
    primaryKeywordTemplate: 'professional services SEO {country}',
    secondaryKeywords: ['consulting SEO', 'B2B services AEO', 'agency SEO'],
    h1Template: 'Professional Services SEO & AEO in {country}',
    angle:
      'Help consultancies, agencies, and advisory firms become the recommended expert when buyers ask AI who to hire.',
    outcomes: [
      'Service-line and industry pages',
      'Thought leadership that builds entity authority',
      'Local and national recommendation coverage',
      'Stronger inbound from AI-assisted research',
    ],
    faqSeed: [
      {
        q: 'Can professional services brands rank in AI answers?',
        a: 'Yes—especially for “best [service] in [city/country]” and problem-solution prompts. Credibility and clear service proof are essential.',
      },
    ],
  },
  {
    slug: 'real-estate',
    name: 'Real Estate',
    kind: 'industry',
    primaryKeywordTemplate: 'real estate SEO AEO {country}',
    secondaryKeywords: ['property SEO', 'proptech marketing', 'real estate AI search'],
    h1Template: 'Real Estate SEO & AEO in {country}',
    angle:
      'Capture high-intent property and proptech queries across Google and AI assistants with local depth and national authority.',
    outcomes: [
      'Location and market-report content systems',
      'AI visibility for neighborhood and buying prompts',
      'Agency and proptech differentiation',
      'Lead-quality improvements from informed visitors',
    ],
    faqSeed: [
      {
        q: 'How does AI search affect real estate?',
        a: 'Buyers ask AI about neighborhoods, costs, and agencies. Brands with clear, current, citable content win those early research moments.',
      },
    ],
  },
  {
    slug: 'education',
    name: 'Education & EdTech',
    kind: 'industry',
    primaryKeywordTemplate: 'education SEO AEO {country}',
    secondaryKeywords: ['edtech SEO', 'university SEO', 'course visibility AI'],
    h1Template: 'Education & EdTech SEO & AEO in {country}',
    angle:
      'Help schools, universities, and edtech platforms show up when students and parents ask AI what to choose.',
    outcomes: [
      'Program and course page systems',
      'AI citation for admissions and comparison prompts',
      'International student intent coverage',
      'Enrollment-oriented content operations',
    ],
    faqSeed: [
      {
        q: 'Do students use AI to choose schools?',
        a: 'Yes. Prospective students ask AI for program comparisons, costs, and rankings. Accurate, structured content improves recommendation odds.',
      },
    ],
  },
  {
    slug: 'travel',
    name: 'Travel & Hospitality',
    kind: 'industry',
    primaryKeywordTemplate: 'travel SEO AEO {country}',
    secondaryKeywords: ['tourism SEO', 'hotel SEO', 'travel AI search'],
    h1Template: 'Travel & Hospitality SEO & AEO in {country}',
    angle:
      'Win destination, itinerary, and booking-adjacent prompts where travelers ask AI where to go and what to book.',
    outcomes: [
      'Destination and experience content clusters',
      'AI recommendation presence for travel prompts',
      'Seasonal demand capture',
      'Brand visibility against OTAs and aggregators',
    ],
    faqSeed: [
      {
        q: 'Can hotels and destinations win AI recommendations?',
        a: 'Yes—especially with unique local expertise, structured FAQs, and authoritative third-party mentions AI systems already trust.',
      },
    ],
  },
  {
    slug: 'manufacturing',
    name: 'Manufacturing',
    kind: 'industry',
    primaryKeywordTemplate: 'manufacturing SEO AEO {country}',
    secondaryKeywords: ['industrial SEO', 'B2B manufacturing marketing', 'exporter SEO'],
    h1Template: 'Manufacturing SEO & AEO in {country}',
    angle:
      'Help manufacturers and suppliers get found—and recommended—when global buyers ask AI for capable vendors.',
    outcomes: [
      'Technical product and application pages',
      'Export-market AI visibility',
      'Specification clarity for LLM extraction',
      'Stronger inbound RFQs from informed buyers',
    ],
    faqSeed: [
      {
        q: 'Why do manufacturers need AEO?',
        a: 'Global buyers use AI to shortlist suppliers. Clear English specs, certifications, and citable proof help your factory or brand make that shortlist.',
      },
    ],
  },
  {
    slug: 'recruitment',
    name: 'Recruitment & HR Tech',
    kind: 'industry',
    primaryKeywordTemplate: 'recruitment SEO AEO {country}',
    secondaryKeywords: ['HR tech SEO', 'staffing agency SEO', 'employer brand AI'],
    h1Template: 'Recruitment & HR Tech SEO & AEO in {country}',
    angle:
      'Become the recommended staffing or HR platform when hiring managers and candidates ask AI for options.',
    outcomes: [
      'Role and industry landing systems',
      'Employer-brand and candidate content',
      'AI shortlist inclusion for hiring tools',
      'Higher-intent organic applications and demos',
    ],
    faqSeed: [
      {
        q: 'Does AI search affect hiring tool selection?',
        a: 'Yes. HR leaders ask AI for ATS, payroll, and staffing recommendations. Citation presence influences consideration sets.',
      },
    ],
  },
  {
    slug: 'ecommerce-brands',
    name: 'Ecommerce Brands',
    kind: 'industry',
    primaryKeywordTemplate: 'ecommerce brand SEO AEO {country}',
    secondaryKeywords: ['DTC SEO', 'online store AEO', 'Shopify AI visibility'],
    h1Template: 'Ecommerce Brand SEO & AEO in {country}',
    angle:
      'Grow branded and category demand so AI shopping and product research answers point to your store—not only marketplaces.',
    outcomes: [
      'Category ownership content',
      'Product FAQ and comparison systems',
      'AI-referred traffic growth',
      'Stronger brand queries and conversion',
    ],
    faqSeed: [
      {
        q: 'How is ecommerce AEO different from marketplace SEO?',
        a: 'Marketplace SEO fights for listings. AEO builds brand recommendability in AI answers so shoppers choose you before they reach a marketplace.',
      },
    ],
  },
  {
    slug: 'insurance',
    name: 'Insurance',
    kind: 'industry',
    primaryKeywordTemplate: 'insurance SEO AEO {country}',
    secondaryKeywords: ['insurtech SEO', 'insurance content marketing', 'YMYL AEO'],
    h1Template: 'Insurance SEO & AEO in {country}',
    angle:
      'Win high-CPC insurance intents with trustworthy content AI can cite—and buyers can act on.',
    outcomes: [
      'Product explainers and comparison pages',
      'Trust-building educational clusters',
      'AI accuracy monitoring for claims',
      'Lower CAC via organic + AI discovery',
    ],
    faqSeed: [
      {
        q: 'Is insurance AEO risky?',
        a: 'It requires careful claims language. We focus on clarity, compliance-minded education, and authoritative citations rather than aggressive promises.',
      },
    ],
  },
  // Engines
  {
    slug: 'chatgpt',
    name: 'ChatGPT',
    kind: 'engine',
    primaryKeywordTemplate: 'ChatGPT visibility {country}',
    secondaryKeywords: ['get recommended by ChatGPT', 'ChatGPT citations', 'optimize for ChatGPT'],
    h1Template: 'Get Recommended by ChatGPT in {country}',
    angle:
      'A country-specific playbook for improving how ChatGPT mentions, cites, and recommends your brand to local and international buyers.',
    outcomes: [
      'Prompt map for {country} buyer language',
      'Citation and source strategy',
      'Content formats ChatGPT extracts well',
      'Ongoing ChatGPT visibility tracking',
    ],
    faqSeed: [
      {
        q: 'How do brands get into ChatGPT answers?',
        a: 'By strengthening clear, citable source material, third-party mentions, and entity consistency—then iterating based on real prompt monitoring.',
      },
    ],
  },
  {
    slug: 'claude',
    name: 'Claude',
    kind: 'engine',
    primaryKeywordTemplate: 'Claude AI SEO {country}',
    secondaryKeywords: ['get cited in Claude', 'Anthropic Claude visibility', 'Claude AEO'],
    h1Template: 'Get Cited in Claude AI in {country}',
    angle:
      'Optimize for Claude’s preference for clear, well-sourced, carefully reasoned content—especially for B2B and technical buyers.',
    outcomes: [
      'Source pages Claude can trust',
      'Technical depth without fluff',
      'Entity clarity across your site',
      'Claude-specific prompt monitoring',
    ],
    faqSeed: [
      {
        q: 'Is Claude optimization different from ChatGPT?',
        a: 'The fundamentals overlap, but Claude often rewards clearer sourcing and deeper explanation. We tailor structure and evidence accordingly.',
      },
    ],
  },
  {
    slug: 'perplexity',
    name: 'Perplexity',
    kind: 'engine',
    primaryKeywordTemplate: 'Perplexity SEO {country}',
    secondaryKeywords: ['Perplexity citations', 'optimize for Perplexity', 'Perplexity AEO'],
    h1Template: 'Perplexity SEO & Citations in {country}',
    angle:
      'Win Perplexity’s citation-heavy answers with pages and third-party sources built to be referenced.',
    outcomes: [
      'Higher Perplexity citation share',
      'Source-page and PR targeting',
      'Freshness and factual clarity',
      'Competitive citation gap analysis',
    ],
    faqSeed: [
      {
        q: 'Why focus on Perplexity?',
        a: 'Perplexity shows citations prominently. Winning those source slots builds both traffic and AI authority signals.',
      },
    ],
  },
  {
    slug: 'gemini',
    name: 'Gemini',
    kind: 'engine',
    primaryKeywordTemplate: 'Gemini SEO {country}',
    secondaryKeywords: ['Google Gemini visibility', 'Gemini AEO', 'optimize for Gemini'],
    h1Template: 'Google Gemini Visibility in {country}',
    angle:
      'Align your content and entity signals with Gemini and Google’s AI surfaces used by {country} buyers.',
    outcomes: [
      'Gemini and AI Overview readiness',
      'Stronger Google entity alignment',
      'Structured answer content',
      'Cross-Google AI surface reporting',
    ],
    faqSeed: [
      {
        q: 'Does Gemini use the same signals as Google Search?',
        a: 'They are related but not identical. Strong Google presence helps, but answer structure, entity clarity, and citations still need deliberate AEO work.',
      },
    ],
  },
  {
    slug: 'microsoft-copilot',
    name: 'Microsoft Copilot',
    kind: 'engine',
    primaryKeywordTemplate: 'Microsoft Copilot SEO {country}',
    secondaryKeywords: ['Copilot visibility', 'Bing AI SEO', 'Copilot AEO'],
    h1Template: 'Microsoft Copilot Visibility in {country}',
    angle:
      'Improve how Copilot surfaces your brand for workplace research and vendor discovery prompts.',
    outcomes: [
      'Workplace-research prompt coverage',
      'Bing + Copilot citation opportunities',
      'Enterprise-friendly content clarity',
      'Monitoring for Copilot answers',
    ],
    faqSeed: [
      {
        q: 'Do enterprise buyers use Copilot for vendor research?',
        a: 'Increasingly yes—especially inside Microsoft-centric organizations. Being present in Copilot answers supports enterprise discovery.',
      },
    ],
  },
];

export function getApacCountry(slug: string): ApacCountry | undefined {
  return apacCountries.find((c) => c.slug === slug);
}

export function getApacTopic(slug: string): ApacTopic | undefined {
  return apacTopics.find((t) => t.slug === slug);
}

export function getAllApacCountrySlugs(): string[] {
  return apacCountries.map((c) => c.slug);
}

export function getAllApacTopicSlugs(): string[] {
  return apacTopics.map((t) => t.slug);
}

/** All country × topic paths for static generation + sitemap */
export function getAllApacMarketPaths(): { country: string; topic: string }[] {
  const paths: { country: string; topic: string }[] = [];
  for (const country of apacCountries) {
    for (const topic of apacTopics) {
      paths.push({ country: country.slug, topic: topic.slug });
    }
  }
  return paths;
}

export const APAC_CITY_SLUGS = [
  'singapore',
  'sydney',
  'melbourne',
  'brisbane',
  'perth',
  'adelaide',
  'canberra',
  'gold-coast',
  'auckland',
  'wellington',
  'christchurch',
  'hamilton',
  'tauranga',
  'queenstown',
  'shanghai',
  'beijing',
  'shenzhen',
  'guangzhou',
  'hangzhou',
  'chengdu',
  'hong-kong',
] as const;

export const APAC_PRIORITY_INDUSTRY_SLUGS = [
  'saas',
  'fintech',
  'ecommerce',
  'healthcare',
  'cybersecurity',
  'professional-services',
  'real-estate',
  'education',
  'travel',
  'manufacturing',
  'recruitment',
  'insurance',
  'legal',
  'media',
  'crypto',
] as const;

export const APAC_PRIORITY_PERSONA_SLUGS = [
  'saas-founders',
  'marketing-directors',
  'ecommerce-managers',
  'agency-owners',
  'content-managers',
  'startup-ctos',
  'seo-professionals',
  'b2b-marketers',
] as const;
