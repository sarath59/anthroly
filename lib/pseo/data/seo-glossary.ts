/**
 * SEO Glossary Dataset - Comprehensive Edition
 * High-quality, in-depth glossary terms for AI SEO industry
 * Each term includes expert-level explanations, real examples, and actionable insights
 */

import { GlossaryTerm } from '../types';

export const seoGlossaryTerms: GlossaryTerm[] = [
  // ============================================================================
  // AI & EMERGING TECHNOLOGY
  // ============================================================================
  {
    id: 'ai-seo',
    term: 'AI SEO',
    slug: 'ai-seo',
    definition: 'AI SEO is the application of artificial intelligence and machine learning technologies to automate, optimize, and enhance search engine optimization strategies at scale, fundamentally transforming how businesses achieve organic visibility.',
    technicalExplanation: 'AI SEO leverages natural language processing (NLP), machine learning algorithms, and predictive analytics to analyze search patterns, generate optimized content, identify ranking opportunities, and automate technical SEO audits. Unlike traditional SEO which relies heavily on manual analysis, AI SEO systems can process millions of data points in real-time, identifying correlations between ranking factors that would be impossible for humans to detect. Key technical components include transformer-based language models for content optimization, graph neural networks for link analysis, and reinforcement learning for strategy optimization. Modern AI SEO platforms utilize embeddings to understand semantic relationships between queries and content, enabling more nuanced optimization than keyword-based approaches. The technology stack typically includes vector databases for similarity search, fine-tuned LLMs for content generation, and automated testing frameworks for continuous optimization.',
    relatedTerms: ['generative-engine-optimization', 'programmatic-seo', 'machine-learning-seo', 'nlp-content-optimization', 'search-intent'],
    examples: [
      'Using GPT-4 to automatically generate meta descriptions that maximize click-through rates based on SERP analysis',
      'Employing machine learning models trained on ranking data to predict which content topics will trend in 3-6 months',
      'Automated technical SEO audits that identify and prioritize fixes by predicted traffic impact',
      'AI-powered internal linking systems that automatically suggest contextually relevant links',
      'Real-time content optimization scoring that compares against top-ranking competitors'
    ],
    category: 'ai-technology'
  },
  {
    id: 'generative-engine-optimization',
    term: 'Generative Engine Optimization (GEO)',
    slug: 'generative-engine-optimization-geo',
    definition: 'Generative Engine Optimization (GEO) is the practice of optimizing digital content and brand presence to appear in AI-powered search engines and large language model responses, including ChatGPT, Claude, Perplexity, Google AI Overviews, and Bing Copilot.',
    technicalExplanation: 'GEO differs fundamentally from traditional SEO because AI systems retrieve and synthesize information differently than conventional search crawlers. While Google indexes pages and ranks them, LLMs compress information into parameters during training and retrieve it through attention mechanisms during inference. GEO focuses on: (1) structured data markup that LLMs can parse during retrieval-augmented generation (RAG), (2) authoritative content signals that influence model training data selection, (3) factual accuracy that passes model verification and citation systems, (4) brand mention consistency across training data sources, and (5) entity disambiguation to ensure correct brand attribution. Technical implementation involves schema.org markup optimization for knowledge graph integration, strategic placement of citations in Wikipedia and academic sources that models reference, and content structuring that aligns with how RAG systems chunk and retrieve information. Unlike SEO which optimizes for ranking position, GEO optimizes for being cited as a source in AI-generated responses.',
    relatedTerms: ['ai-seo', 'llm-optimization', 'answer-engine-optimization', 'knowledge-graph-seo', 'rag-optimization'],
    examples: [
      'Structuring FAQ content with clear question-answer pairs so ChatGPT can directly cite your answers in responses',
      'Building consistent brand mentions across Wikipedia, Crunchbase, LinkedIn, and industry publications that LLMs reference',
      'Implementing comprehensive schema markup (Organization, Product, FAQPage) that AI systems parse for factual grounding',
      'Creating content with explicit citations and statistics that LLMs prefer when generating cited responses',
      'Optimizing for featured snippets which AI Overviews often source directly'
    ],
    category: 'ai-technology'
  },
  {
    id: 'llm-optimization',
    term: 'LLM Optimization',
    slug: 'llm-optimization',
    definition: 'LLM Optimization is the process of structuring and presenting digital content to maximize visibility and accurate representation in Large Language Model outputs, including chatbots, AI assistants, and generative search results.',
    technicalExplanation: 'LLM optimization requires understanding how these models process and retrieve information. During training, LLMs learn patterns from vast text corpora, with more frequently cited and authoritative sources receiving stronger weight in the model\'s parameters. During inference, especially with RAG-enabled systems, content is chunked, embedded into vector space, and retrieved based on semantic similarity to queries. Optimization strategies include: ensuring content appears in high-quality training data sources (academic papers, Wikipedia, established publications), structuring content for optimal chunking (clear sections, descriptive headings), including explicit entity mentions and relationships, providing factual claims with citations, and maintaining consistency across all brand mentions online. Technical considerations include optimizing for the 512-2048 token context windows common in retrieval systems, using clear declarative statements that can be extracted as facts, and avoiding ambiguous pronouns that complicate entity attribution.',
    relatedTerms: ['generative-engine-optimization', 'rag-optimization', 'ai-content-visibility', 'semantic-search'],
    examples: [
      'Ensuring company facts are consistently stated across all web properties so LLMs learn accurate information',
      'Creating authoritative content that gets cited in academic papers and industry reports',
      'Structuring product documentation with clear, factual statements that LLMs can confidently cite',
      'Building a strong Wikipedia presence with well-sourced brand and product information',
      'Optimizing for semantic search by using natural language that matches how users query AI assistants'
    ],
    category: 'ai-technology'
  },
  {
    id: 'ai-content-detection',
    term: 'AI Content Detection',
    slug: 'ai-content-detection',
    definition: 'AI content detection refers to tools and methods used to identify whether text was generated by artificial intelligence systems like ChatGPT, Claude, or other language models, with significant implications for SEO and content strategy.',
    technicalExplanation: 'AI detection tools analyze text for statistical patterns characteristic of machine generation. Key indicators include: perplexity (how predictable word choices are—AI tends toward higher probability tokens), burstiness (variation in sentence structure—humans write with more variance), token distribution uniformity, and semantic coherence patterns. Tools like GPTZero, Originality.ai, and Copyleaks use classifier models trained on labeled AI vs. human text. However, detection accuracy varies significantly (60-95%) and false positives are common, especially with edited or technical content. Google\'s official stance emphasizes quality over authorship: AI content isn\'t inherently penalized, but content must demonstrate E-E-A-T and provide genuine value. Best practices involve human editing for voice and accuracy, adding unique insights and first-hand experience, fact-checking all claims, and ensuring content genuinely serves user needs rather than just targeting keywords.',
    relatedTerms: ['ai-generated-content', 'content-quality', 'helpful-content-update', 'e-e-a-t'],
    examples: [
      'Running blog drafts through multiple detection tools to assess AI fingerprints before publication',
      'Human editors adding personal anecdotes, proprietary data, and expert opinions to AI drafts',
      'Restructuring AI-generated content to vary sentence patterns and add human-like inconsistencies',
      'Combining AI efficiency for research and outlines with human writing for final content',
      'Using AI for data analysis and summarization while humans craft the narrative and insights'
    ],
    category: 'ai-technology'
  },
  {
    id: 'machine-learning-seo',
    term: 'Machine Learning SEO',
    slug: 'machine-learning-seo',
    definition: 'Machine Learning SEO applies predictive algorithms and pattern recognition to identify ranking opportunities, forecast traffic potential, and automate optimization decisions based on historical performance data.',
    technicalExplanation: 'Machine learning in SEO operates across several domains: (1) Ranking factor analysis using regression models to identify which page attributes correlate with higher positions, (2) Traffic forecasting using time-series models (ARIMA, Prophet) to predict seasonal trends and growth trajectories, (3) Keyword clustering using unsupervised learning to group semantically related terms, (4) Content optimization using NLP models to analyze top-ranking content and identify gaps, (5) Link quality scoring using graph neural networks to evaluate backlink value, and (6) Anomaly detection for identifying traffic drops or crawl issues. Common algorithms include Random Forests for feature importance in ranking analysis, BERT embeddings for semantic similarity, and gradient boosting for traffic prediction. Implementation requires clean historical data, proper feature engineering, and continuous model retraining as search algorithms evolve.',
    relatedTerms: ['ai-seo', 'predictive-analytics', 'algorithm-analysis', 'automated-optimization'],
    examples: [
      'Building a model that predicts keyword difficulty more accurately than third-party tools by analyzing your site\'s specific authority',
      'Using clustering algorithms to identify content gaps and topical opportunities competitors haven\'t covered',
      'Forecasting traffic impact of algorithm updates based on historical patterns and site characteristics',
      'Automatically prioritizing technical fixes by predicted traffic recovery impact',
      'Identifying content decay patterns to proactively refresh pages before rankings drop'
    ],
    category: 'ai-technology'
  },
  {
    id: 'nlp-content-optimization',
    term: 'NLP Content Optimization',
    slug: 'nlp-content-optimization',
    definition: 'NLP Content Optimization uses Natural Language Processing technology to analyze, score, and improve content based on semantic relevance, topical coverage, and alignment with search engine understanding of user intent.',
    technicalExplanation: 'NLP optimization tools work by analyzing top-ranking content for a target keyword, extracting semantic patterns, and providing recommendations for improving topical coverage. The technical process involves: (1) Scraping and parsing top 10-20 SERP results, (2) Extracting entities, n-grams, and semantic relationships using NLP models, (3) Building a "content model" representing ideal topical coverage, (4) Comparing target content against this model, (5) Generating specific recommendations for missing topics, entities, and semantic terms. Advanced tools use transformer models (BERT, T5) to understand context and measure true semantic similarity rather than just keyword presence. Key metrics include content scores (Clearscope, Surfer), entity coverage, semantic completeness, and readability optimization. The goal is creating comprehensive content that thoroughly addresses the query topic from all relevant angles.',
    relatedTerms: ['semantic-seo', 'content-optimization', 'entity-seo', 'topic-modeling'],
    examples: [
      'Using Clearscope to identify that a "project management" article is missing coverage of "Gantt charts," "resource allocation," and "milestone tracking"',
      'Analyzing competitor content to find semantic terms that correlate with higher rankings',
      'Optimizing content entity density to match patterns seen in featured snippet results',
      'Using TF-IDF analysis to identify over-optimized and under-optimized terms',
      'Building topic clusters based on NLP-identified semantic relationships between keywords'
    ],
    category: 'ai-technology'
  },
  {
    id: 'answer-engine-optimization',
    term: 'Answer Engine Optimization (AEO)',
    slug: 'answer-engine-optimization',
    definition: 'Answer Engine Optimization is the practice of formatting content to directly answer user questions, optimizing for featured snippets, People Also Ask boxes, voice search results, and AI-generated answer panels.',
    technicalExplanation: 'AEO focuses on the structural and semantic patterns that search engines use to extract direct answers. Key technical elements include: (1) Question-answer formatting with clear H2/H3 questions followed by concise 40-60 word answers, (2) List and table structures that Google can directly extract, (3) Schema markup (FAQPage, HowTo, QAPage) that explicitly marks Q&A content, (4) Position zero optimization by providing the most concise, accurate answer in the first paragraph, (5) Speakable schema for voice search optimization. Featured snippets typically source from content ranking in positions 1-10, with preference for pages that directly answer the query in extractable formats. Voice search optimization requires natural language patterns matching conversational queries, with answers optimized for 29-word average response length.',
    relatedTerms: ['featured-snippets', 'voice-search-optimization', 'people-also-ask', 'zero-click-searches'],
    examples: [
      'Structuring a "What is SEO?" section with the definition in the first sentence, optimized for the definition snippet format',
      'Creating comparison tables that Google can extract directly into featured snippet tables',
      'Using "How to" H2 headers followed by numbered lists for how-to snippet optimization',
      'Answering People Also Ask questions within content to capture multiple SERP positions',
      'Implementing speakable schema to mark content suitable for voice assistant responses'
    ],
    category: 'ai-technology'
  },
  {
    id: 'rag-optimization',
    term: 'RAG Optimization',
    slug: 'rag-optimization',
    definition: 'RAG (Retrieval-Augmented Generation) Optimization is the practice of structuring content to be effectively retrieved and cited by AI systems that combine search retrieval with language model generation.',
    technicalExplanation: 'RAG systems work by first retrieving relevant document chunks from a vector database, then feeding those chunks to an LLM to generate responses. Optimizing for RAG requires understanding the retrieval and generation phases: (1) Retrieval optimization involves ensuring content is chunked effectively (clear section breaks, descriptive headings), embedding-friendly (uses terminology users would search for), and authoritative (from domains RAG systems trust). (2) Generation optimization involves structuring content so LLMs can extract and cite it accurately: explicit factual statements, clear attribution, consistent entity naming, and citation-worthy statistics. Technical considerations include optimizing for typical chunk sizes (512-1024 tokens), ensuring facts are self-contained within chunks, and providing explicit source information the LLM can cite.',
    relatedTerms: ['llm-optimization', 'generative-engine-optimization', 'vector-search-optimization', 'ai-citation'],
    examples: [
      'Structuring content with clear, self-contained paragraphs that can be retrieved as complete answers',
      'Including explicit statistics with dates and sources that LLMs prefer to cite',
      'Using descriptive headings that match semantic search queries',
      'Ensuring brand name appears with key facts so RAG systems attribute correctly',
      'Creating content that directly answers questions in the format "X is Y because Z"'
    ],
    category: 'ai-technology'
  },

  // ============================================================================
  // PROGRAMMATIC SEO
  // ============================================================================
  {
    id: 'programmatic-seo',
    term: 'Programmatic SEO',
    slug: 'programmatic-seo',
    definition: 'Programmatic SEO (pSEO) is the strategy of creating large numbers of targeted, search-optimized web pages automatically using templates, databases, and algorithms while maintaining content quality and uniqueness for sustainable organic growth.',
    technicalExplanation: 'Programmatic SEO operates on template-driven page generation combined with dynamic data insertion. The technical architecture includes: (1) Structured databases containing entities (products, locations, features, comparisons), (2) Template engines combining data with page structures using frameworks like Next.js, Gatsby, or custom solutions, (3) Content variation algorithms ensuring uniqueness through synonym rotation, sentence restructuring, and conditional logic, (4) Automated internal linking systems based on entity relationships, (5) Quality validation layers checking word count, uniqueness scores, and SEO completeness. Success requires careful keyword research to identify page-worthy query patterns (search volume, intent), robust data sources with sufficient depth for unique content, and content enrichment strategies preventing thin content penalties. Technical implementation often uses headless CMS platforms, static site generators for performance, and CI/CD pipelines for automated deployment. Scale considerations include managing crawl budget, preventing keyword cannibalization, and maintaining indexation rates.',
    relatedTerms: ['template-seo', 'scalable-content', 'automated-landing-pages', 'dynamic-page-generation'],
    examples: [
      'Zapier\'s integration pages: "Connect [App A] with [App B]" for 5,000+ app combinations',
      'NerdWallet\'s comparison pages: "Best credit cards for [persona/category]" targeting 500+ segments',
      'G2\'s review and comparison pages for 100,000+ software products',
      'Nomadlist\'s city pages with cost of living, internet speed, and safety scores for 1,000+ cities',
      'Wise\'s currency converter pages for every currency pair combination'
    ],
    category: 'seo-strategy'
  },
  {
    id: 'template-seo',
    term: 'Template SEO',
    slug: 'template-seo',
    definition: 'Template SEO is the practice of creating reusable page templates that combine fixed structural elements with dynamic content variables to generate unique, optimized pages at scale.',
    technicalExplanation: 'Template SEO architecture consists of: (1) Master templates defining page structure, including H1 patterns, section layouts, schema markup, and CTA placements, (2) Content variables that inject entity-specific data into fixed structures, (3) Conditional logic that shows/hides sections based on data availability, (4) Variation systems that rotate phrasing to prevent duplicate content, (5) SEO metadata templates generating unique titles and descriptions from variables. Technical implementation uses templating languages (Jinja, Handlebars, JSX) with data binding from databases or APIs. Quality control requires testing templates across representative data samples, ensuring all variable combinations produce readable content, and implementing fallbacks for missing data. The goal is achieving 80% template efficiency (consistent structure) with 20% unique content that differentiates each page.',
    relatedTerms: ['programmatic-seo', 'dynamic-content', 'content-at-scale', 'page-templates'],
    examples: [
      'Product category templates with dynamic filters, product grids, and category-specific buying guides',
      'Location landing page templates combining city data with service information',
      'Comparison page templates with dynamic feature matrices and recommendation logic',
      'Glossary templates with term definitions, related terms, and contextual examples',
      'Tool/product profile templates with consistent structure but unique data'
    ],
    category: 'seo-strategy'
  },
  {
    id: 'content-at-scale',
    term: 'Content at Scale',
    slug: 'content-at-scale',
    definition: 'Content at Scale refers to strategies and technologies for producing large volumes of high-quality, SEO-optimized content while maintaining uniqueness, value, and editorial standards across thousands or millions of pages.',
    technicalExplanation: 'Scaling content production requires balancing volume with quality through: (1) Tiered content strategies where flagship content receives heavy human investment while long-tail pages use more automation, (2) AI-assisted workflows combining machine efficiency with human oversight at critical points, (3) Content operations infrastructure including editorial calendars, approval workflows, and quality scoring systems, (4) Modular content architectures where components (intros, CTAs, disclaimers) are reused while core content varies, (5) Quality assurance automation checking for duplicates, thin content, and SEO completeness. Technical stack typically includes headless CMS for content management, AI writing tools for draft generation, plagiarism and quality checkers, and automated publishing pipelines. Success metrics include content production velocity, average quality scores, indexation rates, and traffic per page.',
    relatedTerms: ['programmatic-seo', 'ai-content-generation', 'content-operations', 'editorial-workflow'],
    examples: [
      'Producing 500 city-specific service pages with unique local insights and data for each',
      'Generating 1,000 product comparison articles with genuine analysis and recommendations',
      'Creating multilingual content across 20 languages with cultural localization',
      'Building comprehensive glossaries with 500+ terms, each with expert-level explanations',
      'Scaling blog production from 10 to 100 posts monthly while maintaining quality standards'
    ],
    category: 'seo-strategy'
  },
  {
    id: 'keyword-cannibalization',
    term: 'Keyword Cannibalization',
    slug: 'keyword-cannibalization',
    definition: 'Keyword cannibalization occurs when multiple pages on the same website compete for identical or very similar search queries, confusing search engines about which page to rank and diluting the site\'s authority for that topic.',
    technicalExplanation: 'Cannibalization happens when Google cannot determine which page should rank for a query, resulting in: fluctuating rankings as different pages compete, split link equity across multiple URLs, reduced overall visibility for the query, and wasted crawl budget indexing redundant content. Detection methods include: (1) site:domain.com "keyword" searches to identify competing pages, (2) Google Search Console query analysis showing multiple URLs ranking for the same terms, (3) Position tracking showing ranking instability, (4) SEO tools like Ahrefs showing keyword overlap percentages between pages. Resolution strategies depend on the situation: content consolidation via 301 redirects for truly duplicate pages, canonical tags for necessary duplicates (pagination, filters), content differentiation by adjusting focus keywords and intent, internal linking hierarchy establishing the primary page, or noindex for low-value duplicate pages. Prevention requires keyword mapping during content planning and regular cannibalization audits.',
    relatedTerms: ['content-consolidation', 'canonical-tags', 'content-pruning', 'keyword-mapping'],
    examples: [
      'A site with /seo-tips/ and /seo-best-practices/ both targeting "SEO tips" splitting rankings',
      'E-commerce category and brand pages competing for "[brand] [product type]" queries',
      'Blog posts from different years covering the same topic cannibalizing each other',
      'Location pages with overlapping service areas competing for "[service] near me"',
      'Multiple product pages with slight variations ranking for the same commercial keywords'
    ],
    category: 'technical-seo'
  },

  // ============================================================================
  // TECHNICAL SEO
  // ============================================================================
  {
    id: 'technical-seo',
    term: 'Technical SEO',
    slug: 'technical-seo',
    definition: 'Technical SEO encompasses website and server optimizations that help search engine crawlers efficiently access, crawl, interpret, and index your site, forming the foundation upon which content and link strategies build.',
    technicalExplanation: 'Technical SEO covers multiple domains: (1) Site Architecture: URL structure conventions, internal linking topology, navigation patterns, and information hierarchy. (2) Crawlability: robots.txt configuration, XML sitemaps, crawl budget optimization, and URL parameter handling. (3) Indexability: canonical tags, noindex directives, pagination handling (rel=prev/next is deprecated; use self-referencing canonicals), and JavaScript SEO considerations. (4) Rendering: Client-side vs. server-side rendering implications, dynamic rendering for JS-heavy sites, and hydration issues. (5) Performance: Core Web Vitals optimization (LCP, INP, CLS), server response times, caching strategies, and CDN configuration. (6) Security: HTTPS implementation, security headers, and handling of mixed content. (7) Mobile: Responsive design, mobile-first indexing compliance, and mobile usability. (8) Structured Data: Schema.org implementation, testing, and rich result qualification. Technical audits use tools like Screaming Frog, Sitebulb, and Google Search Console to identify issues, prioritized by traffic impact.',
    relatedTerms: ['site-architecture', 'crawlability', 'indexation', 'core-web-vitals', 'schema-markup'],
    examples: [
      'Implementing hreflang tags correctly for a 20-language international site',
      'Configuring server-side rendering for a React SPA to ensure Googlebot can index content',
      'Optimizing a 10,000-page e-commerce site\'s crawl budget by blocking low-value faceted navigation',
      'Reducing LCP from 4.5s to 1.8s through image optimization and critical CSS inlining',
      'Fixing a complex redirect chain issue causing 15% of pages to be non-indexable'
    ],
    category: 'technical-seo'
  },
  {
    id: 'core-web-vitals',
    term: 'Core Web Vitals',
    slug: 'core-web-vitals',
    definition: 'Core Web Vitals are a set of specific metrics that Google considers essential for user experience, measuring loading performance (LCP), interactivity (INP), and visual stability (CLS) as ranking factors.',
    technicalExplanation: 'Core Web Vitals consist of three primary metrics: (1) Largest Contentful Paint (LCP) measures loading performance—specifically when the largest content element becomes visible. Target: under 2.5 seconds. Optimization involves image optimization, preloading critical resources, server response optimization, and render-blocking resource elimination. (2) Interaction to Next Paint (INP, replaced FID in March 2024) measures responsiveness—the latency of all user interactions throughout the page lifecycle. Target: under 200ms. Optimization involves breaking up long tasks, optimizing JavaScript execution, using web workers, and implementing proper event handling. (3) Cumulative Layout Shift (CLS) measures visual stability—unexpected layout shifts during page load. Target: under 0.1. Optimization involves setting explicit dimensions on media, reserving space for dynamic content, and avoiding inserting content above existing content. Metrics are measured in the field via Chrome User Experience Report (CrUX) data, representing real user experiences on the 75th percentile.',
    relatedTerms: ['page-experience', 'lcp', 'inp', 'cls', 'page-speed', 'performance-optimization'],
    examples: [
      'Implementing lazy loading with aspect ratio boxes to maintain a CLS score under 0.05',
      'Using next/image in Next.js to automatically optimize images and improve LCP',
      'Breaking up a 350ms JavaScript task into smaller chunks to improve INP',
      'Implementing a CDN to reduce Time to First Byte from 800ms to 200ms',
      'Preloading the LCP image on product pages to reduce perceived load time by 40%'
    ],
    category: 'technical-seo'
  },
  {
    id: 'schema-markup',
    term: 'Schema Markup',
    slug: 'schema-markup',
    definition: 'Schema markup is structured data vocabulary from schema.org added to web pages that helps search engines understand content context and enables enhanced SERP features like rich snippets, knowledge panels, and featured results.',
    technicalExplanation: 'Schema markup uses JSON-LD (recommended), Microdata, or RDFa formats to provide explicit meaning to search engines. Implementation involves: (1) Identifying applicable schema types—Article, Product, FAQPage, HowTo, LocalBusiness, Organization, Review, Event, etc. (2) Implementing required and recommended properties for each type. (3) Nesting schemas appropriately (e.g., Review within Product). (4) Testing with Google\'s Rich Results Test and Schema Markup Validator. (5) Monitoring rich result performance in Search Console. Technical considerations include ensuring schema matches visible page content (no hidden schema), keeping schemas updated when content changes, and avoiding schema spam (marking up content that isn\'t actually on the page). Benefits include enhanced SERP visibility through rich snippets, better AI understanding for GEO, knowledge panel generation, and improved click-through rates (FAQ rich results show 87% CTR improvement in studies).',
    relatedTerms: ['structured-data', 'rich-snippets', 'json-ld', 'knowledge-graph', 'serp-features'],
    examples: [
      'Implementing FAQPage schema to earn FAQ rich results showing 87% average CTR increase',
      'Adding Product schema with price, availability, and reviews for shopping snippet eligibility',
      'Using HowTo schema on tutorial content to qualify for step-by-step rich results',
      'Implementing LocalBusiness schema for multi-location business listings',
      'Adding Organization schema to establish entity recognition in knowledge graph'
    ],
    category: 'technical-seo'
  },
  {
    id: 'crawl-budget',
    term: 'Crawl Budget',
    slug: 'crawl-budget',
    definition: 'Crawl budget is the number of URLs search engine bots will crawl on your site within a given timeframe, determined by crawl rate limit (server capacity) and crawl demand (page value), critical for large sites.',
    technicalExplanation: 'Crawl budget is influenced by: (1) Crawl rate limit—how fast Googlebot can crawl without overloading your server, adjustable in Search Console. (2) Crawl demand—how valuable Google considers your pages based on popularity, freshness, and authority. Optimization strategies include: improving site speed and server response (faster responses = more crawls), eliminating duplicate content (wastes budget on redundant URLs), blocking low-value pages via robots.txt (infinite scroll pages, search results, parameter variations), fixing crawl errors (404s, 500s waste crawl attempts), prioritizing important pages in sitemap, using internal linking to signal important pages, and managing URL parameters (set rules in Search Console). Analysis involves log file parsing to see actual Googlebot behavior, comparing against total crawlable URLs, and monitoring Search Console crawl stats. Sites under 10,000 pages rarely need crawl budget optimization; it becomes critical at 100,000+ pages.',
    relatedTerms: ['crawl-rate', 'indexation', 'robots-txt', 'xml-sitemap', 'log-file-analysis'],
    examples: [
      'An e-commerce site blocking 2 million faceted navigation URLs via robots.txt to save crawl budget',
      'Implementing server-side pagination to prevent infinite scroll from wasting crawl budget',
      'Using log file analysis to discover Googlebot spending 40% of crawl budget on low-value pages',
      'Setting URL parameters in Search Console to prevent crawling of session IDs and tracking parameters',
      'Increasing server capacity to handle more concurrent crawl requests without slowing response times'
    ],
    category: 'technical-seo'
  },
  {
    id: 'javascript-seo',
    term: 'JavaScript SEO',
    slug: 'javascript-seo',
    definition: 'JavaScript SEO addresses the challenges of ensuring JavaScript-rendered content is properly crawled, rendered, and indexed by search engines, critical for modern web applications built with React, Vue, Angular, and similar frameworks.',
    technicalExplanation: 'Google processes JavaScript in three phases: (1) Crawling—fetching the initial HTML. (2) Rendering—executing JavaScript to generate final DOM, using a separate render queue that can delay indexing by days or weeks. (3) Indexing—processing the rendered content. Challenges include: render queue delays, JavaScript errors breaking rendering, client-side routing issues, lazy-loaded content not being crawled, and dynamic content timing issues. Solutions include: Server-Side Rendering (SSR)—rendering on server, sending full HTML to both users and bots; Static Site Generation (SSG)—pre-rendering at build time; Hybrid approaches (Next.js, Nuxt) combining SSR/SSG/CSR; Dynamic rendering—serving pre-rendered HTML to bots while users get JavaScript app (Google tolerates this, though prefers SSR). Testing involves comparing rendered output between Chrome DevTools and Google\'s Mobile-Friendly Test or URL Inspection tool in Search Console.',
    relatedTerms: ['server-side-rendering', 'dynamic-rendering', 'spa-seo', 'progressive-enhancement'],
    examples: [
      'Migrating a React SPA to Next.js SSR to reduce time-to-index from 2 weeks to 2 days',
      'Implementing dynamic rendering for a Vue.js app using Prerender.io',
      'Fixing client-side routing that prevented Google from discovering deep pages',
      'Ensuring meta tags are rendered server-side rather than injected via JavaScript',
      'Using Intersection Observer API for lazy loading that Googlebot can trigger'
    ],
    category: 'technical-seo'
  },
  {
    id: 'site-architecture',
    term: 'Site Architecture',
    slug: 'site-architecture',
    definition: 'Site architecture is the structural organization of a website\'s pages, navigation, and internal linking, designed to optimize both user experience and search engine crawlability while distributing link equity effectively.',
    technicalExplanation: 'Optimal site architecture follows these principles: (1) Flat hierarchy—important pages should be within 3 clicks of the homepage to ensure crawl frequency and link equity distribution. (2) Logical URL structure—URLs should reflect site hierarchy (domain.com/category/subcategory/page). (3) Siloing—grouping related content together through URL structure and internal linking to build topical authority. (4) Hub and spoke model—pillar pages link to related cluster content, with clusters linking back to pillar. (5) Navigation optimization—primary nav for main categories, breadcrumbs for hierarchy context, footer links for utility pages. (6) Internal linking equity flow—high-authority pages should link to pages needing ranking boost. (7) Faceted navigation handling—prevent infinite URL combinations through proper parameter handling. Tools like Screaming Frog visualize site architecture through crawl visualization, identifying orphan pages (no internal links) and pages too deep in hierarchy.',
    relatedTerms: ['internal-linking', 'url-structure', 'siloing', 'topical-authority', 'information-architecture'],
    examples: [
      'Restructuring an e-commerce site from 6-click depth to 3-click depth, improving indexation by 40%',
      'Implementing topic clusters with pillar pages that boosted organic traffic 150% in 6 months',
      'Creating a hub page strategy for a SaaS company that improved time-on-site by 45%',
      'Using breadcrumbs with schema markup to improve internal linking and SERP appearance',
      'Fixing 5,000 orphan pages discovered through crawl analysis by adding them to appropriate categories'
    ],
    category: 'technical-seo'
  },
  {
    id: 'canonical-tags',
    term: 'Canonical Tags',
    slug: 'canonical-tags',
    definition: 'Canonical tags (rel="canonical") are HTML elements that tell search engines which URL represents the master copy of a page, helping prevent duplicate content issues and consolidating link equity to the preferred URL.',
    technicalExplanation: 'Canonical implementation requires understanding: (1) Self-referencing canonicals—every page should have a canonical pointing to itself (or the preferred version). (2) Cross-domain canonicals—pointing to content on another domain (use carefully; requires ownership of target domain). (3) Canonical vs. redirect—canonicals are hints (Google may ignore); redirects are directives. Use redirects when users should be redirected, canonicals when duplicate access is necessary (e.g., parameters for tracking). (4) Common mistakes: canonicalizing paginated pages to page 1 (incorrect; use self-referencing), HTTP/HTTPS or trailing slash inconsistencies, relative URLs (use absolute), canonical chains (A→B→C should be A→C). (5) Canonical signals: rel="canonical" is strongest, but Google also considers internal links, sitemap inclusion, redirects, and HTTPS preference. Monitor in Search Console\'s URL Inspection tool to verify Google\'s selected canonical matches your intent.',
    relatedTerms: ['duplicate-content', 'url-normalization', 'link-equity', 'indexation'],
    examples: [
      'Setting canonical on product pages with color variations to the default color URL',
      'Canonicalizing print and mobile versions of articles to the main URL',
      'Using cross-domain canonical when syndicating content to Medium or LinkedIn',
      'Fixing thousands of canonicals pointing to HTTP instead of HTTPS after migration',
      'Implementing dynamic canonicals that handle UTM parameters and session IDs'
    ],
    category: 'technical-seo'
  },
  {
    id: 'xml-sitemap',
    term: 'XML Sitemap',
    slug: 'xml-sitemap',
    definition: 'An XML sitemap is a file listing all important URLs on your website that you want search engines to crawl and index, serving as a roadmap that helps search engines discover and prioritize your content.',
    technicalExplanation: 'XML sitemap best practices include: (1) Include only indexable, canonical URLs—no 404s, redirects, noindex pages, or non-canonical versions. (2) Keep under 50MB or 50,000 URLs per file; use sitemap index files for larger sites. (3) Update lastmod dates only when content actually changes (Google uses this for crawl prioritization). (4) Segment into multiple sitemaps by content type (products, blog, pages) for easier monitoring. (5) Submit via Search Console and reference in robots.txt. (6) Consider priority and changefreq attributes deprecated—Google largely ignores them. (7) Use dynamic generation for large sites rather than manual updates. (8) Monitor indexation rates: if submitted URLs >> indexed URLs, investigate crawl or quality issues. Advanced implementations include image sitemaps, video sitemaps, news sitemaps (for Google News), and hreflang sitemaps for international sites.',
    relatedTerms: ['crawlability', 'indexation', 'robots-txt', 'search-console'],
    examples: [
      'Implementing a dynamically generated sitemap that updates automatically when content changes',
      'Splitting a 200,000 URL site into category-specific sitemaps for monitoring indexation by section',
      'Discovering 30% of blog posts weren\'t indexed by comparing sitemap to Search Console coverage',
      'Adding image sitemaps that improved image search traffic by 60%',
      'Creating a news sitemap that qualified the site for Google News inclusion'
    ],
    category: 'technical-seo'
  },
  {
    id: 'robots-txt',
    term: 'Robots.txt',
    slug: 'robots-txt',
    definition: 'Robots.txt is a text file at your website\'s root that instructs search engine crawlers which areas of your site to access and which to avoid, helping manage crawl budget and prevent indexing of low-value pages.',
    technicalExplanation: 'Robots.txt operates on the Robots Exclusion Protocol: (1) User-agent specifies which bot rules apply to (*, Googlebot, Bingbot, etc.). (2) Disallow blocks access to specified paths. (3) Allow permits access within a disallowed directory. (4) Crawl-delay (honored by Bing, not Google) requests time between crawls. (5) Sitemap reference points to sitemap locations. Important: robots.txt blocks crawling, NOT indexing—pages can still rank if linked externally; use noindex meta tag to prevent indexing. Common patterns include blocking admin areas, search results pages, filter/sort parameters, staging environments, and personal information pages. Errors can be catastrophic—Disallow: / blocks entire site. Testing via Google\'s robots.txt Tester or Search Console is essential. Note that directives are case-sensitive and order matters for overlapping rules.',
    relatedTerms: ['crawl-budget', 'noindex', 'crawlability', 'meta-robots'],
    examples: [
      'Blocking /search/ and /filter/ paths to prevent crawling infinite parameter combinations',
      'Using Allow within Disallow to permit specific CSS/JS files needed for rendering',
      'Accidentally blocking entire site with "Disallow: /" costing weeks of rankings recovery',
      'Setting different rules for Googlebot vs. other bots to allow full access to Google only',
      'Blocking staging subdomain but discovering Google indexed it anyway via external links'
    ],
    category: 'technical-seo'
  },
  {
    id: 'hreflang',
    term: 'Hreflang Tags',
    slug: 'hreflang-tags',
    definition: 'Hreflang tags are HTML attributes that tell search engines which language and regional versions of a page exist, ensuring users see the most relevant localized version in search results.',
    technicalExplanation: 'Hreflang implementation requires: (1) Bidirectional references—page A must reference page B, and B must reference A. (2) Self-referencing—each page must include hreflang to itself. (3) Correct language/region codes—use ISO 639-1 language codes and ISO 3166-1 Alpha-2 country codes (e.g., en-US, de-DE, pt-BR). (4) x-default for fallback—specifies page for users not matching any hreflang. (5) Implementation options: HTML head link tags, HTTP headers (for PDFs), or XML sitemap. (6) Common errors: missing return tags, incorrect codes, broken URLs, mixing implementation methods. Hreflang does NOT prevent indexation of regional pages—use proper country targeting in Search Console. For large international sites, XML sitemap implementation is recommended for manageability. Monitor in Search Console under International Targeting > Language for errors.',
    relatedTerms: ['international-seo', 'geotargeting', 'multilingual-seo', 'canonical-tags'],
    examples: [
      'Implementing hreflang for 25 language versions with x-default pointing to English',
      'Fixing common error: en-UK (wrong) vs en-GB (correct) for British English',
      'Using sitemap hreflang implementation for a site with 50,000 pages in 10 languages',
      'Discovering users seeing German pages when searching in French due to missing hreflang',
      'Combining hreflang with currency/pricing localization for e-commerce'
    ],
    category: 'technical-seo'
  },

  // ============================================================================
  // LINK BUILDING & AUTHORITY
  // ============================================================================
  {
    id: 'domain-authority',
    term: 'Domain Authority (DA)',
    slug: 'domain-authority',
    definition: 'Domain Authority is a search engine ranking score developed by Moz that predicts how likely a website is to rank in search engine result pages, measured on a logarithmic scale from 0 to 100 based on link profile strength.',
    technicalExplanation: 'Domain Authority is calculated using machine learning algorithms analyzing: total linking root domains, total backlinks, MozRank (link popularity), MozTrust (link trustworthiness derived from trusted seed sites), and spam score. The logarithmic scale means improving from 20→30 is significantly easier than 70→80—each point requires exponentially more links at higher levels. DA should be used for: competitive comparison (is your DA higher/lower than competitors for target keywords?), link prospecting (targeting sites with higher DA for backlinks), and progress tracking over time. DA should NOT be used as an absolute measure of ranking ability—it\'s a proprietary metric that doesn\'t directly influence Google. Similar metrics: Ahrefs Domain Rating (DR), Semrush Authority Score, Majestic Trust Flow/Citation Flow. All are third-party approximations of Google\'s actual authority signals.',
    relatedTerms: ['domain-rating', 'page-authority', 'backlink-profile', 'link-equity', 'trust-flow'],
    examples: [
      'A new website starting at DA 1, reaching DA 30 after 12 months of consistent link building',
      'Major sites like Wikipedia (DA 100), NYTimes (DA 95) demonstrating ceiling of the scale',
      'Using DA filter in outreach to prioritize backlink targets above DA 40',
      'DA drop of 5 points after disavowing toxic backlinks, followed by traffic increase',
      'Comparing your DA 35 against competitor DA 55 to set realistic ranking timelines'
    ],
    category: 'link-building'
  },
  {
    id: 'domain-rating',
    term: 'Domain Rating (DR)',
    slug: 'domain-rating',
    definition: 'Domain Rating is an Ahrefs metric measuring the strength of a website\'s backlink profile on a logarithmic scale from 0 to 100, calculated based on the quantity and quality of external backlinks pointing to the domain.',
    technicalExplanation: 'Domain Rating calculation considers: (1) Number of unique domains linking to the target (raw count). (2) DR of linking domains (quality weighting). (3) Number of unique domains each linking site points to (link dilution—a DR 70 site linking to 10,000 sites passes less value than one linking to 100). (4) Dofollow vs. nofollow status. DR focuses purely on link authority, ignoring content quality, traffic, or topical relevance. This makes DR useful for link building prospecting but incomplete for overall authority assessment. DR updates on a rolling basis as new links are discovered and old links are lost. Note: DR can decrease if you lose links, or if linking sites lose their own links. Ahrefs specifically calculates DR separate from their URL Rating (UR) metric, which measures individual page authority.',
    relatedTerms: ['domain-authority', 'url-rating', 'referring-domains', 'backlink-quality'],
    examples: [
      'Targeting guest post opportunities on sites with DR 50+ for maximum authority transfer',
      'Noticing DR dropped from 45 to 42 after a linking site with DR 80 was penalized',
      'Building 100 links from DR 20-30 sites having less impact than 5 links from DR 70+ sites',
      'Using DR in combination with traffic data to identify truly valuable link targets',
      'Monitoring competitors\' DR growth to benchmark your link building velocity'
    ],
    category: 'link-building'
  },
  {
    id: 'backlink',
    term: 'Backlink',
    slug: 'backlink',
    definition: 'A backlink is an incoming hyperlink from one website to another, serving as a vote of confidence that signals to search engines the linked content is valuable and authoritative, remaining one of Google\'s top ranking factors.',
    technicalExplanation: 'Backlink value depends on multiple factors: (1) Linking domain authority (DA/DR)—higher authority domains pass more value. (2) Page authority—the specific page\'s strength matters too. (3) Relevance—links from topically related content carry more weight (a tech blog linking to tech content vs. random directory). (4) Anchor text—the clickable text signals what the linked page is about (balance exact match, partial match, and branded anchors to avoid over-optimization penalties). (5) Link placement—editorial links within content are more valuable than footer/sidebar links. (6) Link attributes—dofollow passes full equity; nofollow, sponsored, and UGC are signals but pass limited/no equity. (7) Link neighborhood—being linked alongside spammy sites can harm you. (8) Link velocity—sudden spikes in links can trigger spam filters. Google\'s link algorithm likely considers over 200 link-related signals to determine value.',
    relatedTerms: ['link-building', 'anchor-text', 'referring-domain', 'link-equity', 'dofollow'],
    examples: [
      'Earning an editorial backlink from TechCrunch (DR 93) that increased target page rankings by 15 positions',
      'A link from an industry-specific blog (DR 45) outperforming a general directory (DR 60) due to relevance',
      'Diversifying anchor text portfolio: 40% branded, 30% partial match, 20% generic, 10% exact match',
      'Identifying and disavowing toxic backlinks from PBN discovered during audit',
      'Guest post link in author bio vs. contextual link in body having different ranking impacts'
    ],
    category: 'link-building'
  },
  {
    id: 'link-building',
    term: 'Link Building',
    slug: 'link-building',
    definition: 'Link building is the process of acquiring hyperlinks from external websites to your own through various outreach, content, and relationship strategies, essential for improving domain authority and search rankings.',
    technicalExplanation: 'Effective link building strategies include: (1) Digital PR—creating newsworthy content (original research, data studies, surveys) that earns media coverage and natural links. (2) Guest posting—contributing valuable content to relevant publications in exchange for editorial links. (3) Broken link building—finding broken links on resource pages, creating replacement content, and suggesting your link as the replacement. (4) Resource page outreach—getting listed on curated resource pages in your industry. (5) HARO/Connectively—providing expert commentary to journalists writing stories. (6) Skyscraper technique—creating content significantly better than existing ranking content and reaching out to sites linking to inferior versions. (7) Unlinked mention reclamation—finding brand mentions without links and requesting link addition. (8) Linkable asset creation—tools, calculators, templates, and comprehensive guides that naturally attract links. Avoid manipulative practices (PBNs, paid links without disclosure, link farms) that violate Google guidelines and risk penalties.',
    relatedTerms: ['outreach', 'digital-pr', 'guest-posting', 'link-equity', 'anchor-text'],
    examples: [
      'Publishing original industry research that earned 150 backlinks from news sites and blogs in 30 days',
      'Conducting 500 personalized outreach emails resulting in 35 guest post placements (7% success rate)',
      'Using HARO to earn 5 links monthly from major publications including Forbes and Business Insider',
      'Creating a free SEO audit tool that passively earns 20+ links monthly from people sharing it',
      'Recovering 40 links by finding and reaching out about broken links pointing to your old URLs'
    ],
    category: 'link-building'
  },
  {
    id: 'anchor-text',
    term: 'Anchor Text',
    slug: 'anchor-text',
    definition: 'Anchor text is the visible, clickable text in a hyperlink that provides context to both users and search engines about the linked page\'s content, serving as a relevance signal for ranking.',
    technicalExplanation: 'Anchor text types include: (1) Exact match—exactly matches target keyword ("SEO tools"). (2) Partial match—contains target keyword ("best SEO tools for beginners"). (3) Branded—company/product name ("Ahrefs"). (4) Naked URL—the URL itself ("www.example.com"). (5) Generic—non-descriptive ("click here," "learn more"). (6) Image—when images are linked, alt text serves as anchor. Natural anchor text distribution varies by page type, but rough guidelines for a commercial page: 5-10% exact match, 20-30% partial match, 30-40% branded, 10-20% naked/generic. Over-optimization (too many exact match anchors) triggers Google\'s Penguin filter, causing ranking penalties. Internal anchor text can be more keyword-focused since it\'s under your control and appears more natural. Analyze competitors\' anchor profiles as a benchmark for natural distribution.',
    relatedTerms: ['backlink', 'link-equity', 'penguin-update', 'internal-linking'],
    examples: [
      'A page penalized for 80% exact match anchors recovering after building more branded and generic links',
      'Using descriptive anchors for internal links to pass topical context ("enterprise SEO platform" vs. "click here")',
      'Requesting anchor text changes from webmasters for links with overly commercial anchors',
      'Analyzing competitor anchor distribution to understand what looks natural in your niche',
      'Image links with optimized alt text serving as effective anchor text alternatives'
    ],
    category: 'link-building'
  },
  {
    id: 'link-equity',
    term: 'Link Equity',
    slug: 'link-equity',
    definition: 'Link equity (also called "link juice") is the value or authority that a hyperlink passes from one page to another, influenced by the linking page\'s authority, relevance, and technical link attributes.',
    technicalExplanation: 'Link equity flow follows these principles: (1) Distribition—link equity from a page is divided among all outbound links (a page with 10 links passes ~10% equity each vs. 100 links passing ~1% each). (2) NoFollow dilution—nofollow links don\'t pass equity, but the "lost" equity isn\'t redistributed to dofollow links (it\'s lost entirely). (3) Redirect equity—301 redirects pass most (not all) link equity; chains reduce equity at each hop. (4) Internal equity flow—internal links distribute your site\'s total equity; strategic internal linking can boost priority pages. (5) Reciprocal link devaluation—sites linking to each other may see reduced equity transfer. (6) Relevance multiplier—contextually relevant links likely pass more effective equity. PageRank (Google\'s foundational link algorithm) modeled equity as probability distribution of a "random surfer" clicking through links, though the actual algorithm is now much more sophisticated.',
    relatedTerms: ['pagerank', 'backlink', 'dofollow', 'link-building', 'internal-linking'],
    examples: [
      'Strategic internal linking funneling equity from high-authority blog posts to commercial pages',
      'Fixing redirect chains (A→B→C→D) to direct paths (A→D) to preserve link equity',
      'Earning a link from a homepage (receives most equity) vs. deep page on same domain',
      'Consolidating multiple weak pages into one strong page via 301s to concentrate equity',
      'Using nofollow on comment sections and user-generated links to preserve equity for editorial links'
    ],
    category: 'link-building'
  },
  {
    id: 'dofollow-nofollow',
    term: 'Dofollow vs Nofollow Links',
    slug: 'dofollow-nofollow-links',
    definition: 'Dofollow links pass link equity and serve as endorsements, while nofollow links (rel="nofollow") instruct search engines not to pass ranking credit, though Google now treats nofollow as a hint rather than directive.',
    technicalExplanation: 'Link attribute evolution: (1) rel="nofollow" (2005)—originally created to combat comment spam; tells engines not to follow/pass credit. (2) rel="sponsored" (2019)—specifically for paid/sponsored links. (3) rel="ugc" (2019)—for user-generated content like comments and forums. Google\'s 2019 update changed nofollow from a directive to a hint—Google may choose to follow/credit nofollow links for crawling and ranking purposes. Best practices: Use sponsored for paid links (FTC compliance), ugc for user-generated content, nofollow for untrusted links or when you don\'t want to editorially endorse. For link building: prioritize dofollow links for equity, but nofollow links from high-authority sites (Wikipedia, news sites) still provide traffic, brand visibility, and may pass some ranking signals. A natural link profile contains a mix of both.',
    relatedTerms: ['link-equity', 'backlink', 'sponsored-links', 'ugc-links'],
    examples: [
      'Forbes and many news sites using nofollow on external links, yet those links still correlate with rankings',
      'Wikipedia links (nofollow) driving significant referral traffic and indirect SEO benefit',
      'FTC requiring rel="sponsored" on paid placements and affiliate links',
      'Acquiring a mix of 70% dofollow and 30% nofollow links appearing more natural than 100% dofollow',
      'Press release links being nofollow but still valuable for brand visibility and citation'
    ],
    category: 'link-building'
  },
  {
    id: 'digital-pr',
    term: 'Digital PR',
    slug: 'digital-pr',
    definition: 'Digital PR is the practice of earning high-quality backlinks and brand mentions through creating newsworthy content, building journalist relationships, and leveraging news cycles to gain media coverage.',
    technicalExplanation: 'Digital PR strategies include: (1) Data-driven content—original research, surveys, and data analysis that provides unique insights journalists want to cite. (2) Newsjacking—quickly creating content around trending news stories with relevant expertise. (3) Expert positioning—building relationships with journalists as a quotable source via HARO, Connectively, and direct outreach. (4) Creative campaigns—interactive tools, visual assets, and provocative studies designed for shareability. (5) Local PR—targeting local news with region-specific angles. Success metrics include: links earned (quantity and quality), brand mentions (linked and unlinked), referral traffic, and brand search volume increases. Digital PR differs from traditional PR by focusing specifically on link-worthy content and measurable SEO outcomes. Tools like BuzzSumo, Google Alerts, and HARO help identify opportunities and track coverage.',
    relatedTerms: ['link-building', 'content-marketing', 'brand-mentions', 'haro'],
    examples: [
      'Conducting a survey of 1,000 professionals that earned coverage in Inc., Forbes, and 50+ industry blogs',
      'Creating an interactive calculator that became a resource page standard, earning 200+ passive links',
      'Newsjacking a trending tech story with expert commentary, earning links from TechCrunch and Wired',
      'Building a media list of 500 journalists and earning 40+ placements over 12 months',
      'Regional data study ("Cost of Living in Every US State") earning links from local news in 35 states'
    ],
    category: 'link-building'
  },

  // ============================================================================
  // CONTENT STRATEGY
  // ============================================================================
  {
    id: 'search-intent',
    term: 'Search Intent',
    slug: 'search-intent',
    definition: 'Search intent is the underlying goal or purpose behind a user\'s search query, categorized as informational, navigational, transactional, or commercial investigation, critical for content alignment and ranking success.',
    technicalExplanation: 'Search intent categories: (1) Informational—seeking knowledge ("what is SEO," "how to build backlinks")—serve comprehensive guides, tutorials, definitions. (2) Navigational—finding a specific site ("Ahrefs login," "Facebook")—brand pages rank. (3) Transactional—ready to purchase ("buy SEO software," "Semrush pricing")—serve product pages, pricing, CTAs. (4) Commercial investigation—comparing options ("best SEO tools 2024," "Ahrefs vs Semrush")—serve comparison content, reviews, listicles. Google\'s algorithms analyze user behavior signals (click patterns, dwell time, pogo-sticking) to determine which content type satisfies each query. Misaligned content fails regardless of SEO quality—ranking a blog post for "buy running shoes" won\'t work when Google knows users want product pages. SERP analysis reveals intent: check what currently ranks (product pages vs. guides vs. lists) to understand what Google believes users want.',
    relatedTerms: ['serp-analysis', 'content-alignment', 'user-intent', 'keyword-research'],
    examples: [
      '"How to do keyword research" (informational) → comprehensive guide with steps and examples',
      '"SEO agency pricing" (commercial) → pricing page with packages and comparison table',
      '"Buy Ahrefs subscription" (transactional) → direct signup/checkout page',
      '"Semrush vs Ahrefs" (commercial) → detailed comparison article with verdict',
      'Mismatched intent: ranking a product page for "what is [product type]" and seeing poor engagement'
    ],
    category: 'content-strategy'
  },
  {
    id: 'e-e-a-t',
    term: 'E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness)',
    slug: 'e-e-a-t-experience-expertise-authoritativeness-trustworthiness',
    definition: 'E-E-A-T is a framework from Google\'s Search Quality Rater Guidelines evaluating content quality based on the creator\'s Experience, Expertise, Authoritativeness, and Trustworthiness, particularly important for YMYL topics.',
    technicalExplanation: 'E-E-A-T components: (1) Experience—first-hand knowledge of the topic (added in 2022). A product review by someone who actually used the product demonstrates experience. (2) Expertise—formal knowledge/skill in the area. Medical content should be written/reviewed by healthcare professionals. (3) Authoritativeness—recognition as a go-to source. Sites frequently cited by others in the field demonstrate authority. (4) Trustworthiness—legitimacy, transparency, and accuracy. Clear ownership, contact information, and accurate content. E-E-A-T is not a direct algorithm factor but guides how quality raters evaluate search results, influencing algorithm development. Implementation includes: detailed author bios with credentials, about pages with company history, clear editorial policies, expert review processes for YMYL content, citations from authoritative sources, and reputation management across the web.',
    relatedTerms: ['ymyl', 'content-quality', 'author-authority', 'trust-signals'],
    examples: [
      'Medical site adding "Medically reviewed by Dr. [Name], MD" badges and author credentials to every article',
      'Financial advisor including CFA certification, 15 years experience, and photo in bio',
      'Recipe blog adding personal photos and "I made this 50+ times" experience markers',
      'Building author entities with consistent bios across site, social media, and guest posts',
      'Creating robust About and Contact pages with physical address and team information'
    ],
    category: 'content-strategy'
  },
  {
    id: 'topical-authority',
    term: 'Topical Authority',
    slug: 'topical-authority',
    definition: 'Topical authority is a website\'s perceived expertise on a specific subject, built through comprehensive content coverage, internal linking, and external validation within a topic cluster, improving rankings across related queries.',
    technicalExplanation: 'Topical authority builds through: (1) Content depth—thoroughly covering all aspects of a topic (a site about "SEO" should cover technical SEO, link building, content strategy, tools, etc.). (2) Content breadth—addressing related subtopics and questions (going beyond core topic to related queries users might have). (3) Internal linking structure—pillar-cluster model connecting comprehensive pillar pages to detailed cluster content. (4) External validation—backlinks from topic-relevant sources (an SEO site getting links from other SEO sites vs. random directories). (5) Entity associations—being connected to topic-related entities in knowledge graphs. (6) User engagement—strong engagement signals on topic-related content. Google\'s algorithms can evaluate how comprehensively a site covers a topic versus competitors. Tools like MarketMuse and Clearscope help identify topical gaps by analyzing what competitors cover that you don\'t.',
    relatedTerms: ['content-clusters', 'pillar-pages', 'entity-seo', 'semantic-seo'],
    examples: [
      'HubSpot\'s topical authority for "inbound marketing" built through 500+ interlinked articles',
      'A new site ranking for competitive keywords after building 50+ articles in a tight topic cluster',
      'Audit revealing competitor covers 300 subtopics while you cover 80—identifying content gap',
      'Earning backlinks from industry publications (Moz, Search Engine Journal) reinforcing SEO topical authority',
      'Internal linking restructure improving rankings across entire topic cluster by 20% average'
    ],
    category: 'content-strategy'
  },
  {
    id: 'content-clusters',
    term: 'Content Clusters',
    slug: 'content-clusters',
    definition: 'Content clusters (topic clusters) are groups of interlinked content pieces centered around a comprehensive pillar page, designed to build topical authority and demonstrate comprehensive expertise to search engines.',
    technicalExplanation: 'Cluster architecture consists of: (1) Pillar page—comprehensive overview of the main topic (2,000-5,000 words covering all major subtopics at a high level). (2) Cluster content—detailed pages on specific subtopics (each going deep on one aspect the pillar page covers broadly). (3) Internal linking—pillar links to all cluster pages; clusters link back to pillar and to each other where relevant. (4) URL structure—optionally reflecting hierarchy (/seo/ as pillar, /seo/link-building/, /seo/technical-seo/ as clusters). Benefits include: demonstrating topical depth to Google, creating clear crawl paths, consolidating authority on the pillar page, and capturing long-tail traffic through cluster pages. Planning involves keyword research to identify all related subtopics, competitive analysis to find gaps, and content mapping to assign keywords to pillar vs. clusters based on search volume and intent.',
    relatedTerms: ['pillar-pages', 'topical-authority', 'internal-linking', 'site-architecture'],
    examples: [
      'SEO pillar page covering all aspects at high level, with 25 cluster pages going deep on each subtopic',
      'Content map showing 100 keywords organized into 8 clusters, each with a pillar page',
      'Cluster page "Link Building Outreach Templates" linking to pillar "Complete Link Building Guide"',
      'Implementing cluster structure increasing organic traffic 300% in 6 months by demonstrating topical depth',
      'Using internal link analysis to identify cluster pages not properly connected to pillars'
    ],
    category: 'content-strategy'
  },
  {
    id: 'keyword-research',
    term: 'Keyword Research',
    slug: 'keyword-research',
    definition: 'Keyword research is the process of discovering and analyzing search terms that people enter into search engines, used to inform content strategy, understand search demand, and prioritize SEO opportunities.',
    technicalExplanation: 'Keyword research process: (1) Seed keyword generation—brainstorming starting terms from business knowledge, competitor analysis, and customer language. (2) Expansion—using tools (Ahrefs, Semrush, Google Keyword Planner) to find related keywords, questions, and long-tail variations. (3) Search volume analysis—monthly search volume, trends, seasonality patterns. (4) Difficulty assessment—competition level based on ranking sites\' authority and content quality. (5) Intent classification—categorizing by search intent to align content formats. (6) Click potential—accounting for SERP features that reduce organic clicks (featured snippets, knowledge panels). (7) Business value—assessing which keywords drive valuable traffic (commercial vs. informational). (8) Clustering—grouping semantically related keywords to target with single pages. (9) Prioritization—ranking opportunities by potential impact, difficulty, and resources required. Output is a prioritized keyword map assigning target keywords to existing or planned content.',
    relatedTerms: ['search-volume', 'keyword-difficulty', 'long-tail-keywords', 'search-intent'],
    examples: [
      'Discovering "SEO audit checklist" (1,900 searches/month, low difficulty) as a quick-win opportunity',
      'Using "People Also Ask" mining to find question-based keywords for FAQ content',
      'Analyzing seasonal trends showing "tax software" peaks January-April',
      'Keyword gap analysis revealing competitors rank for 500 keywords you don\'t target',
      'Clustering 50 keywords around "email marketing" to target with pillar and cluster content'
    ],
    category: 'content-strategy'
  },
  {
    id: 'long-tail-keywords',
    term: 'Long-Tail Keywords',
    slug: 'long-tail-keywords',
    definition: 'Long-tail keywords are specific, multi-word search phrases with lower search volume but higher conversion intent, typically easier to rank for and collectively representing the majority of all search queries.',
    technicalExplanation: 'Long-tail characteristics: (1) Length—typically 4+ words, though length isn\'t the defining factor. (2) Specificity—addresses specific needs vs. broad topics ("best CRM for small real estate agencies" vs. "CRM software"). (3) Search volume—individually low (10-500 monthly searches) but collectively massive (70% of all searches). (4) Competition—typically lower due to specificity and reduced commercial interest. (5) Intent clarity—more specific query reveals clearer intent, enabling better content alignment. (6) Conversion rates—often 2-5x higher than head terms due to specificity matching user needs. Strategy involves: identifying long-tail variations of target topics through tools, People Also Ask, Reddit/Quora questions, and support ticket analysis; creating content addressing these specific queries; and building internal links to capture queries across the long-tail spectrum.',
    relatedTerms: ['keyword-research', 'search-intent', 'content-strategy', 'conversion-optimization'],
    examples: [
      '"SEO" (head term, 100K searches, very hard) vs. "SEO checklist for Shopify stores" (500 searches, easy)',
      'Creating FAQ sections targeting 50 long-tail question variations',
      'Blog post ranking for 200 long-tail keywords generating more total traffic than homepage',
      'Programmatic pages targeting "[tool] alternative for [use case]" long-tail patterns',
      'Support ticket analysis revealing customers search for specific feature-based queries'
    ],
    category: 'content-strategy'
  },
  {
    id: 'content-optimization',
    term: 'Content Optimization',
    slug: 'content-optimization',
    definition: 'Content optimization is the process of improving web content to rank higher in search results through keyword integration, semantic enrichment, user experience enhancement, and technical SEO implementation.',
    technicalExplanation: 'Content optimization areas: (1) Keyword optimization—natural integration of primary and secondary keywords in title, headings, body, URL, meta description, and image alt text without stuffing. (2) Semantic optimization—covering related entities, topics, and terminology that NLP models associate with the topic (tools: Clearscope, Surfer, MarketMuse). (3) Structure optimization—proper heading hierarchy (H1→H2→H3), short paragraphs, bullet lists, and scannable formatting. (4) Intent optimization—ensuring content format matches search intent (guide vs. product page vs. comparison). (5) Freshness optimization—updating dates, statistics, and information for evergreen relevance. (6) Engagement optimization—compelling introductions, clear value propositions, and effective CTAs. (7) Technical optimization—meta tags, schema markup, internal links, and page speed. (8) Comprehensiveness—covering topic thoroughly while remaining focused (word count appropriate to topic depth).',
    relatedTerms: ['on-page-seo', 'semantic-seo', 'nlp-content-optimization', 'content-refresh'],
    examples: [
      'Using Clearscope to improve content score from 35 to 80, resulting in position improvement from 15 to 4',
      'Adding missing semantic terms (identified via NLP analysis) that competitors covered',
      'Restructuring 3,000-word wall of text into scannable sections with headers, lists, and images',
      'Updating 2-year-old article with current statistics, improving rankings within 2 weeks',
      'Adding FAQ schema and content, earning rich results and 40% CTR improvement'
    ],
    category: 'content-strategy'
  },
  {
    id: 'content-refresh',
    term: 'Content Refresh',
    slug: 'content-refresh',
    definition: 'Content refresh (content pruning/updating) is the practice of updating existing content to maintain or improve search rankings by adding new information, improving quality, and signaling freshness to search engines.',
    technicalExplanation: 'Content refresh strategies: (1) Identifying candidates—pages with declining traffic, rankings, or engagement; content with outdated information; pages ranking positions 5-20 with improvement potential. (2) Audit and analysis—comparing against current top-ranking content for gaps, analyzing user engagement data for weak sections, checking for outdated information/links. (3) Update types: factual updates (statistics, dates), comprehensiveness improvements (adding missing subtopics), format improvements (better structure, visuals), technical updates (internal links, schema), and complete rewrites when necessary. (4) Implementation—updating publication/modified dates only when substantive changes are made, maintaining URL to preserve link equity, adding new sections rather than replacing unless necessary. (5) Monitoring—tracking ranking and traffic changes post-refresh (typically 2-8 weeks to see impact). Best practice: quarterly content audits identifying refresh opportunities.',
    relatedTerms: ['content-audit', 'content-decay', 'evergreen-content', 'historical-optimization'],
    examples: [
      'Updating "Best SEO Tools 2022" to 2024 version with new tools and pricing, recovering lost traffic',
      'Adding 500 words covering new subtopic competitors added, improving rankings from #8 to #3',
      'Identifying 50 pages with >50% traffic decline over 12 months for priority refresh',
      'Content consolidation: merging 3 weak articles into one comprehensive piece via 301 redirects',
      'Quarterly refresh schedule maintaining 100 top-performing articles\' rankings and traffic'
    ],
    category: 'content-strategy'
  },

  // ============================================================================
  // METRICS & ANALYTICS
  // ============================================================================
  {
    id: 'organic-traffic',
    term: 'Organic Traffic',
    slug: 'organic-traffic',
    definition: 'Organic traffic refers to visitors who arrive at your website through unpaid search engine results, representing the primary goal of SEO and typically delivering higher engagement and conversion rates than other channels.',
    technicalExplanation: 'Organic traffic measurement: (1) In Google Analytics 4—measured via Traffic Acquisition reports filtered by Session default channel group = "Organic Search." (2) Key metrics: sessions, users, new users, engagement rate, conversions, and revenue attributed to organic. (3) Segmentation dimensions: landing page, country, device, search query (via Search Console integration). (4) Quality assessment—beyond volume, evaluate engagement rate, pages/session, conversion rate, and bounce rate compared to other channels. (5) Attribution—understand organic\'s role in conversion paths through GA4\'s Model Comparison and Path reports. (6) Forecasting—project organic traffic using historical trends, seasonality, and ranking position changes. Organic traffic typically converts 2-3x better than paid traffic due to higher intent. Traffic analysis should correlate with Search Console impressions and clicks for complete picture.',
    relatedTerms: ['search-traffic', 'google-analytics', 'conversion-rate', 'seo-roi'],
    examples: [
      'Tracking organic traffic growth from 50K to 200K monthly sessions over 12 months of SEO investment',
      'Segmenting organic traffic by landing page to identify which content drives results',
      'Comparing organic traffic conversion rate (4.2%) vs. paid (1.8%) to justify SEO budget',
      'Identifying organic traffic drops correlating with algorithm update dates',
      'Forecasting next quarter\'s organic traffic based on ranking improvements and seasonality'
    ],
    category: 'metrics'
  },
  {
    id: 'click-through-rate',
    term: 'Click-Through Rate (CTR)',
    slug: 'click-through-rate-ctr',
    definition: 'Click-through rate is the percentage of users who click on your search result after seeing it, calculated as clicks divided by impressions, serving as a key metric for evaluating SERP performance and title/description effectiveness.',
    technicalExplanation: 'CTR factors and optimization: (1) Position impact—#1 position averages 27-30% CTR, dropping to 2-3% by position 10; CTR benchmarks vary significantly by query type and SERP features. (2) Title optimization—compelling titles with numbers, power words, year dates, and emotional triggers improve CTR; titles should match search intent and include target keyword. (3) Meta description—though not a ranking factor, compelling descriptions with clear value propositions and CTAs improve CTR. (4) Rich results—FAQ, review stars, and other rich snippets can significantly boost CTR. (5) URL appearance—clean, readable URLs may influence clicks. (6) Brand recognition—known brands see higher CTR at all positions. CTR data in Search Console may be used as a ranking signal (though Google denies direct use), making it worth optimizing. Calculate expected CTR by position, then identify pages underperforming expectations for optimization.',
    relatedTerms: ['impressions', 'title-tags', 'meta-descriptions', 'serp-features'],
    examples: [
      'Improving CTR from 2% to 5% by adding current year and "Complete Guide" to title',
      'FAQ rich results increasing page CTR by 87% compared to plain blue link',
      'Position #3 page with 8% CTR outperforming position #2 page with 4% CTR',
      'A/B testing meta descriptions via canonical changes to identify highest-performing version',
      'Brand page CTR of 35% at #1 vs. competitor page CTR of 22% at same position'
    ],
    category: 'metrics'
  },
  {
    id: 'keyword-difficulty',
    term: 'Keyword Difficulty (KD)',
    slug: 'keyword-difficulty',
    definition: 'Keyword difficulty is a metric estimating how hard it would be to rank for a specific keyword, typically scored 0-100 based on the backlink profiles and authority of currently ranking pages.',
    technicalExplanation: 'Keyword difficulty calculation varies by tool: (1) Ahrefs KD—based on number of referring domains to top 10 results; estimates referring domains needed to rank top 10. (2) Semrush KD—considers authority of ranking domains, page authority, and other factors. (3) Moz KD—combines Page Authority, Domain Authority, and estimated CTR. Limitations of KD scores: (1) Only considers link metrics, not content quality, topical authority, or search intent alignment. (2) Doesn\'t account for your site\'s specific authority in the topic. (3) Scores aren\'t comparable across tools. Better approach: analyze top 3-5 results manually for domain authority (can you compete?), content quality (can you create better?), and topical relevance (do you have authority in this space?). New sites should target KD 0-20 initially, building to harder keywords as authority grows.',
    relatedTerms: ['keyword-research', 'competition-analysis', 'serp-analysis', 'domain-authority'],
    examples: [
      '"SEO" (KD 95) vs. "SEO for dentists" (KD 35)—same topic, different competitive reality',
      'New DA 15 site targeting only KD 0-25 keywords initially, with 60% ranking in top 10',
      'Discovering KD 40 keyword actually easy because competitors have weak content',
      'Building authority over 12 months to successfully target KD 50-70 keywords',
      'Comparing KD across tools: Ahrefs shows 45, Semrush shows 62 for same keyword'
    ],
    category: 'metrics'
  },
  {
    id: 'search-visibility',
    term: 'Search Visibility',
    slug: 'search-visibility',
    definition: 'Search visibility is a metric measuring your website\'s overall presence in search engine results, calculated as the sum of estimated traffic from all ranking keywords weighted by position and search volume.',
    technicalExplanation: 'Search visibility calculation: For each ranking keyword, multiply search volume by estimated CTR for that position, then sum across all keywords. This creates a single metric showing total potential organic reach. Use cases: (1) Trend analysis—tracking visibility over time to measure overall SEO health independent of individual rankings. (2) Competitive benchmarking—comparing visibility against competitors for market share analysis. (3) Algorithm impact assessment—visibility changes after algorithm updates show net impact. (4) Category analysis—visibility by topic cluster shows where you\'re strong/weak. Tools like Sistrix, Semrush, and Ahrefs calculate visibility scores (each using slightly different methodologies). Note: visibility potential ≠ actual traffic, as CTR models are estimates and don\'t account for SERP features or user behavior variations.',
    relatedTerms: ['organic-traffic', 'serp-analysis', 'competitive-analysis', 'share-of-voice'],
    examples: [
      'Search visibility dropping 15% during core update while traffic only dropped 5% (positions dropped but recovered quickly)',
      'Competitor analysis showing your 8% visibility vs. competitor\'s 22% in target keyword set',
      'Visibility growth from 5% to 18% over 12 months correlating with 3x traffic increase',
      'Topic-level visibility: 25% in "SEO tools" but only 5% in "link building"—content gap identified',
      'Algorithm update causing industry-wide visibility redistribution from small to large sites'
    ],
    category: 'metrics'
  },

  // ============================================================================
  // LOCAL SEO
  // ============================================================================
  {
    id: 'local-seo',
    term: 'Local SEO',
    slug: 'local-seo',
    definition: 'Local SEO is the practice of optimizing a business\'s online presence to attract customers from relevant local searches, including Google Maps, local pack results, and location-based queries.',
    technicalExplanation: 'Local SEO components: (1) Google Business Profile optimization—complete profile with accurate NAP (Name, Address, Phone), business hours, categories, attributes, photos, and posts. (2) Local citations—consistent NAP across directories (Yelp, Yellow Pages, industry directories); inconsistencies confuse Google. (3) Reviews—quantity, quality, recency, and response rate all impact local rankings. (4) Local content—city-specific landing pages, local blog content, and location-specific schema. (5) Local link building—chamber of commerce, local news, community organizations, and local business associations. (6) On-page local signals—NAP on website, local keywords, embedded Google Maps. Local algorithm weighs: relevance (query-business match), distance (searcher proximity), and prominence (overall online presence). Local pack (3-pack) gets ~44% of clicks in local searches, making it highly valuable real estate.',
    relatedTerms: ['google-business-profile', 'local-citations', 'nap-consistency', 'local-pack'],
    examples: [
      'Optimizing GBP profile increasing local pack appearances by 200% in 3 months',
      'Fixing NAP inconsistencies across 50 directories resolving "duplicate" listing issues',
      'Implementing review generation strategy increasing reviews from 23 to 150 in 6 months',
      'Creating city-specific service pages for 20 locations, each with unique local content',
      'Earning links from local news site and chamber of commerce boosting local pack position'
    ],
    category: 'local-seo'
  },
  {
    id: 'google-business-profile',
    term: 'Google Business Profile (GBP)',
    slug: 'google-business-profile',
    definition: 'Google Business Profile (formerly Google My Business) is a free tool for managing your business\'s appearance in Google Search and Maps, essential for local SEO success and local pack visibility.',
    technicalExplanation: 'GBP optimization elements: (1) Basic info—accurate business name (no keyword stuffing), address, phone, website, hours, and categories (primary category most important). (2) Attributes—business-specific features (wheelchair accessible, free Wi-Fi, etc.). (3) Photos—regular uploads of business, products, team; businesses with photos receive 42% more direction requests. (4) Posts—weekly updates, offers, events, and products keeping profile active. (5) Q&A—monitoring and answering questions, seeding common FAQs. (6) Reviews—actively requesting reviews, responding to all (positive and negative). (7) Products/Services—listing offerings with descriptions and prices. (8) Messaging—enabling direct customer communication. Performance tracking via GBP Insights shows searches, views, actions (calls, directions, website clicks). Multi-location businesses use GBP\'s bulk management or third-party tools for consistency.',
    relatedTerms: ['local-seo', 'local-pack', 'google-maps', 'local-reviews'],
    examples: [
      'Adding primary category "SEO Agency" vs. "Marketing Agency" improving relevant local search visibility',
      'Posting weekly updates correlating with 30% increase in profile views',
      'Responding to all reviews within 24 hours improving sentiment and engagement',
      'Adding 50 photos over 3 months increasing direction requests by 65%',
      'Using Q&A to answer common questions before customers ask'
    ],
    category: 'local-seo'
  },
  {
    id: 'local-pack',
    term: 'Local Pack (Map Pack)',
    slug: 'local-pack',
    definition: 'The local pack is a prominent SERP feature displaying three local business listings with a map, appearing for queries with local intent and capturing significant click share from local searchers.',
    technicalExplanation: 'Local pack ranking factors: (1) Relevance—how well the business matches the query; determined by GBP categories, business description, and reviews mentioning relevant services. (2) Distance—proximity to the searcher or location in query; absolute ranking factor that can\'t be gamed. (3) Prominence—overall online presence including reviews (quantity/quality/recency), citations, links, and organic website rankings. Ranking strategies: choose the most specific applicable GBP categories, encourage reviews mentioning services/keywords naturally, build local citations and links, create strong local content on website, and maintain NAP consistency. The local pack appears for ~30% of all searches, with the top position receiving 24% of clicks. Clicking "More places" expands to full local finder with all nearby results. Note: personalization based on user\'s location history also influences results.',
    relatedTerms: ['local-seo', 'google-business-profile', 'map-pack-rankings', 'local-search'],
    examples: [
      'Ranking #1 in local pack for "SEO agency [city]" driving 150 calls/month',
      'Distance preventing local pack appearance for downtown searchers when business is in suburbs',
      'Adding "AI SEO" to GBP business description improving relevance for AI-related queries',
      '50 new reviews with service keywords helping achieve local pack position for more query variations',
      'Competitor analysis showing top local pack results all have 200+ reviews'
    ],
    category: 'local-seo'
  },

  // ============================================================================
  // SERP FEATURES
  // ============================================================================
  {
    id: 'featured-snippets',
    term: 'Featured Snippets',
    slug: 'featured-snippets',
    definition: 'Featured snippets are selected search results displayed in a special box at the top of Google\'s organic results (position zero), providing direct answers to user queries and capturing significant click share.',
    technicalExplanation: 'Featured snippet types: (1) Paragraph—text answer to "what/who/why" questions; 40-60 words is optimal. (2) List—numbered or bulleted for "how to" or "best" queries; 5-8 items typical. (3) Table—for comparisons, specifications, and data; Google extracts from HTML tables. (4) Video—YouTube clips for tutorial and demonstration queries. Optimization strategies: identify snippet opportunities (queries with existing snippets you can compete for, or queries with snippet-worthy intent), structure content with the question as an H2 and the answer immediately following, use the optimal format (paragraph, list, table) matching the query type, and provide concise, direct answers. Featured snippets source from pages ranking in positions 1-10, with most coming from top 5. Getting the snippet can dramatically increase CTR, though some queries see reduced clicks due to answer satisfaction within SERP.',
    relatedTerms: ['answer-engine-optimization', 'position-zero', 'serp-features', 'people-also-ask'],
    examples: [
      'Formatting "What is SEO?" answer in 50-word paragraph immediately after H2, earning featured snippet',
      'Creating comparison table that Google extracts as table snippet for "CRM software comparison"',
      'Numbered list format earning "how to do keyword research" featured snippet',
      'Featured snippet position increasing CTR from 8% to 23% for target keyword',
      'Losing featured snippet to competitor who provided more concise, accurate answer'
    ],
    category: 'serp-features'
  },
  {
    id: 'people-also-ask',
    term: 'People Also Ask (PAA)',
    slug: 'people-also-ask',
    definition: 'People Also Ask is a SERP feature displaying expandable questions related to the search query, with answers sourced from various websites, appearing in approximately 65% of all search results.',
    technicalExplanation: 'PAA characteristics: (1) Dynamic expansion—clicking one question reveals more related questions, creating infinite scroll potential. (2) Source diversity—answers can come from any ranking page, not just top 10. (3) Query coverage—single pages can appear for multiple PAA questions across different searches. (4) Answer extraction—Google extracts 2-3 sentences that directly answer the question. Optimization strategies: identify PAA questions using SEMrush, Ahrefs, or manual search; create FAQ sections answering these questions in 40-50 word concise answers; use question as H2 and answer immediately after; ensure answer is self-contained without requiring additional context. PAA provides significant visibility opportunity—appearing for multiple questions creates compounding visibility. Some studies show PAA clicks have lower conversion rates as users seek quick answers.',
    relatedTerms: ['featured-snippets', 'faq-schema', 'answer-engine-optimization', 'serp-features'],
    examples: [
      'One article appearing in PAA boxes for 15 different related queries',
      'Creating 25-question FAQ section targeting specific PAA opportunities, capturing 8',
      'Competitor PAA analysis revealing 50 questions to target in content strategy',
      'Answer optimized from 150 words to 45 words, triggering PAA appearance',
      'PAA mining revealing content gaps—questions being asked that your content doesn\'t address'
    ],
    category: 'serp-features'
  },
  {
    id: 'knowledge-panel',
    term: 'Knowledge Panel',
    slug: 'knowledge-panel',
    definition: 'A knowledge panel is an information box appearing in Google search results that displays key facts about entities (people, places, organizations, things), pulled from Google\'s Knowledge Graph.',
    technicalExplanation: 'Knowledge panel components: (1) Entity type—determines display format and available fields (Organization, Person, Product, etc.). (2) Basic facts—name, description, logo/image, founded date, headquarters, founders, etc. (3) Social profiles—links to verified social media accounts. (4) Related entities—connections to other knowledge graph entities. (5) User-generated content—reviews, questions, or user-submitted info. Influencing knowledge panels: (1) Claim and verify your panel via Google\'s verification process. (2) Implement Organization/Person schema with consistent entity information. (3) Build consistent entity presence across authoritative sources (Wikipedia, Wikidata, Crunchbase, LinkedIn). (4) Maintain consistent NAP and entity details across all web properties. (5) Earn mentions in authoritative sources Google trusts for Knowledge Graph data. Knowledge panels significantly increase brand visibility and provide control over brand SERP appearance.',
    relatedTerms: ['knowledge-graph', 'entity-seo', 'brand-serp', 'schema-markup'],
    examples: [
      'Brand knowledge panel appearing for branded searches, increasing brand SERP real estate',
      'Claiming and editing knowledge panel to correct outdated company information',
      'Wikipedia article creation resulting in knowledge panel generation within 2 weeks',
      'Schema implementation connecting company entity to founder entities in knowledge graph',
      'Competitor analysis showing they have knowledge panel while you don\'t—entity building priority'
    ],
    category: 'serp-features'
  },
  {
    id: 'ai-overviews',
    term: 'AI Overviews (SGE)',
    slug: 'ai-overviews-sge',
    definition: 'AI Overviews (formerly Search Generative Experience/SGE) are AI-generated summaries appearing at the top of Google search results, synthesizing information from multiple sources to provide comprehensive answers.',
    technicalExplanation: 'AI Overviews characteristics: (1) Generative response—AI synthesizes information from multiple sources rather than extracting from one page. (2) Source citations—links to pages the AI sourced information from appear below the summary. (3) Expandable depth—users can explore deeper with follow-up questions in a chat-like interface. (4) Selective appearance—currently appears for informational queries where summaries add value. Optimization strategies: focus on GEO principles (accurate, structured, authoritative content), implement comprehensive schema markup, ensure content is factually accurate with citations, build authority in the topic (topical authority), and maintain strong E-E-A-T signals. Impact on SEO: AI Overviews may reduce clicks to websites for simple informational queries, but create new visibility opportunities for sources cited within the overview. Early data suggests commercial and transactional queries less affected than pure informational.',
    relatedTerms: ['generative-engine-optimization', 'ai-seo', 'llm-optimization', 'zero-click-searches'],
    examples: [
      'Brand being cited as source in AI Overview for industry-related queries',
      'Optimizing content structure specifically for AI Overview citation',
      'Query type analysis showing which keywords trigger AI Overviews vs. traditional results',
      'Building topical authority resulting in consistent AI Overview citations',
      'Monitoring AI Overview appearance rates and click-through impact in Search Console'
    ],
    category: 'serp-features'
  },

  // ============================================================================
  // ADDITIONAL STRATEGIC TERMS
  // ============================================================================
  {
    id: 'seo-audit',
    term: 'SEO Audit',
    slug: 'seo-audit',
    definition: 'An SEO audit is a comprehensive analysis of a website\'s search engine optimization, identifying technical issues, content gaps, and opportunities to improve organic search visibility and performance.',
    technicalExplanation: 'SEO audit components: (1) Technical audit—crawlability (robots.txt, XML sitemap, crawl errors), indexability (canonicals, noindex, redirects), site speed (Core Web Vitals), mobile-friendliness, HTTPS, structured data, and international SEO. (2) On-page audit—title tags, meta descriptions, heading structure, content quality, keyword optimization, and internal linking. (3) Content audit—identifying thin content, duplicate content, content gaps, and refresh opportunities. (4) Backlink audit—profile analysis, toxic link identification, anchor text distribution, and link building opportunities. (5) Competitive audit—comparing against top competitors across all dimensions. (6) Analytics audit—tracking accuracy, goal configuration, and data quality. Tools: Screaming Frog or Sitebulb for technical crawls, Ahrefs/Semrush for backlinks and keywords, Google Search Console for indexing and performance, and PageSpeed Insights for performance. Output should be prioritized recommendations with estimated impact and effort.',
    relatedTerms: ['technical-seo', 'content-audit', 'backlink-audit', 'competitive-analysis'],
    examples: [
      'Comprehensive audit revealing 10,000 pages blocked by robots.txt unintentionally',
      'Content audit identifying 200 thin pages for consolidation or removal',
      'Backlink audit discovering 5,000 toxic links requiring disavow',
      'Technical audit fixing Core Web Vitals issues improving rankings within 30 days',
      'Competitive audit revealing competitor has 3x more content in key topic clusters'
    ],
    category: 'seo-strategy'
  },
  {
    id: 'serp-analysis',
    term: 'SERP Analysis',
    slug: 'serp-analysis',
    definition: 'SERP analysis is the process of examining search engine results pages for target keywords to understand search intent, competitive landscape, and ranking opportunities.',
    technicalExplanation: 'SERP analysis process: (1) Intent determination—what content types rank? Product pages indicate transactional intent, guides indicate informational, lists indicate commercial. (2) SERP features—what features appear? Featured snippets, PAA, local pack, images, videos all indicate optimization opportunities. (3) Competitive assessment—who ranks and why? Analyze top 5-10 results for domain authority, content depth, word count, and backlink strength. (4) Content gap analysis—what topics do ranking pages cover that you don\'t? (5) Format analysis—do results favor certain formats (listicles vs. guides vs. tools)? (6) Click opportunity—how much of the SERP is ads or features vs. organic? (7) Ranking volatility—are positions stable or fluctuating (indicating uncertainty in intent)? Use SERP analysis to inform content strategy, set realistic ranking expectations, and identify the specific requirements for ranking success.',
    relatedTerms: ['search-intent', 'competitive-analysis', 'keyword-research', 'content-strategy'],
    examples: [
      'SERP analysis revealing top 3 results all have 3,000+ word guides with video components',
      'Identifying featured snippet opportunity from poorly-formatted current result',
      'Discovering all page-1 results have DA 50+ indicating difficult competitive landscape',
      'SERP analysis showing image carousel present—opportunity for image optimization',
      'Recognizing mixed intent (both guide and tool) suggesting comprehensive hybrid content'
    ],
    category: 'seo-strategy'
  },
  {
    id: 'competitor-analysis',
    term: 'Competitor Analysis (SEO)',
    slug: 'competitor-analysis-seo',
    definition: 'SEO competitor analysis is the systematic evaluation of competing websites\' search performance, strategies, and tactics to identify opportunities, benchmarks, and strategic insights for your own SEO.',
    technicalExplanation: 'Competitor analysis dimensions: (1) Visibility comparison—keyword overlap, unique keywords, share of voice in target topics. (2) Content analysis—content volume, types, depth, freshness, and topic coverage gaps. (3) Backlink analysis—referring domain count and quality, link velocity, link types (editorial, guest posts, PR), and anchor text strategies. (4) Technical comparison—site speed, mobile experience, schema implementation, and site structure. (5) SERP feature ownership—who wins featured snippets, knowledge panels, PAA. (6) Authority metrics—DA/DR comparison and trajectory. Tools: Ahrefs/Semrush Content Gap and Backlink Gap tools, Screaming Frog for technical comparison, and manual SERP analysis for qualitative insights. Output: prioritized opportunities where competitors are weak or where you can differentiate, plus benchmarks for what "good" looks like in your space.',
    relatedTerms: ['competitive-intelligence', 'content-gap', 'backlink-gap', 'market-analysis'],
    examples: [
      'Competitor analysis revealing top rival has 5x more content in your target topic cluster',
      'Backlink gap analysis showing competitors earn 50 links/month from guest posting',
      'Discovering competitor\'s traffic spike correlated with new programmatic page type',
      'Technical comparison showing your 4.5s LCP vs. competitor\'s 1.8s—speed priority identified',
      'Content gap revealing 200 keywords competitors rank for that you don\'t target'
    ],
    category: 'seo-strategy'
  },
  {
    id: 'conversion-rate-optimization',
    term: 'Conversion Rate Optimization (CRO)',
    slug: 'conversion-rate-optimization-cro',
    definition: 'Conversion Rate Optimization is the systematic process of increasing the percentage of website visitors who complete desired actions, working synergistically with SEO to maximize the value of organic traffic.',
    technicalExplanation: 'CRO process: (1) Data collection—analytics, heatmaps, session recordings, user surveys to understand behavior and friction points. (2) Hypothesis formation—based on data, form testable hypotheses about what changes might improve conversion. (3) A/B testing—statistically valid tests comparing control against variations to prove hypotheses. (4) Implementation—rolling out winning variations and iterating. SEO-CRO synergy: (1) Improving on-page experience (time on site, bounce rate) may improve rankings. (2) Conversion-optimized landing pages can maintain SEO performance with proper testing setup. (3) Page speed improvements help both CRO and SEO. (4) Content that satisfies user intent (good for SEO) also converts better (good for CRO). Tools: Google Optimize (deprecated 2023, use alternatives), VWO, Optimizely, Hotjar, and GA4 for analysis.',
    relatedTerms: ['landing-page-optimization', 'a-b-testing', 'user-experience', 'bounce-rate'],
    examples: [
      'CRO testing increasing landing page conversion from 2% to 4%, doubling SEO traffic value',
      'Improving page load time for CRO also improving rankings (Core Web Vitals impact)',
      'Testing above-fold CTA placement improving conversions without affecting rankings',
      'User research revealing confusion that, when fixed, reduced bounce rate and improved rankings',
      'Implementing FAQ section improving both engagement (CRO) and featured snippet eligibility (SEO)'
    ],
    category: 'seo-strategy'
  },
  {
    id: 'mobile-first-indexing',
    term: 'Mobile-First Indexing',
    slug: 'mobile-first-indexing',
    definition: 'Mobile-first indexing means Google predominantly uses the mobile version of a website\'s content for indexing and ranking, reflecting the majority of searches now occurring on mobile devices.',
    technicalExplanation: 'Mobile-first indexing implications: (1) Content parity—mobile version must have the same content as desktop; hidden content (tabs, accordions) is indexed but may be weighted less. (2) Structured data—schema markup must be on mobile version. (3) Meta tags—robots meta, canonical tags must be on mobile version. (4) Images/video—mobile version must include all media with proper alt text. (5) Hreflang—must point to mobile URLs for international sites. (6) Internal links—mobile navigation must provide access to all important pages. (7) Ads and interstitials—intrusive mobile interstitials can hurt rankings. Verification: Use URL Inspection tool in Search Console to see which version Google is crawling/indexing. Responsive design is the recommended approach, ensuring one URL serves all devices with content parity. Separate mobile URLs (m.domain.com) require proper canonical/alternate tag implementation.',
    relatedTerms: ['responsive-design', 'mobile-usability', 'page-experience', 'core-web-vitals'],
    examples: [
      'Discovering mobile version missing 50% of content due to lazy loading, causing ranking drops',
      'Implementing responsive design replacing m.domain.com setup, improving crawl efficiency',
      'Fixing mobile interstitial penalty by changing popup to banner, recovering rankings',
      'Adding schema markup to mobile version (was only on desktop) restoring rich results',
      'Mobile page speed optimization from 6s to 2s improving mobile rankings significantly'
    ],
    category: 'technical-seo'
  },
  {
    id: 'indexation',
    term: 'Indexation',
    slug: 'indexation',
    definition: 'Indexation is the process by which search engines add web pages to their searchable database after crawling and processing the content, determining which pages can appear in search results.',
    technicalExplanation: 'Indexation process: (1) Discovery—Googlebot discovers URLs through links, sitemaps, or direct submission. (2) Crawling—Googlebot fetches page content and resources. (3) Rendering—for JavaScript sites, Google renders the page to see final content. (4) Processing—content is analyzed, entities extracted, and relevance determined. (5) Indexing—page is added to Google\'s index if it meets quality thresholds. Indexation issues: (1) Blocked by robots.txt—page is discovered but not crawled. (2) Noindex directive—page is crawled but not indexed. (3) Canonical to different URL—page is indexed but canonical version ranks. (4) Quality threshold—page is crawled but deemed too low quality to index. (5) Crawl budget—page is not discovered frequently enough to be indexed. Monitoring: Search Console\'s Pages report shows indexation status and reasons for non-indexation. Use URL Inspection tool for individual page diagnosis.',
    relatedTerms: ['crawlability', 'crawl-budget', 'noindex', 'canonical-tags'],
    examples: [
      'Discovering 40% of pages are "Crawled - currently not indexed" indicating quality issues',
      'Fixing noindex tag accidentally added to template affecting 1,000 pages',
      'Sitemap submission improving indexation rate from 60% to 90% for new content',
      'URL Inspection revealing page is being crawled but canonical points to different URL',
      'Improving content quality on thin pages to meet indexation threshold'
    ],
    category: 'technical-seo'
  },
  {
    id: 'internal-linking',
    term: 'Internal Linking',
    slug: 'internal-linking',
    definition: 'Internal linking is the practice of connecting pages within your own website through hyperlinks, distributing link equity, establishing site hierarchy, and helping search engines discover and understand your content.',
    technicalExplanation: 'Internal linking principles: (1) Hierarchy establishment—important pages should receive more internal links and be fewer clicks from homepage. (2) Equity distribution—high-authority pages (those with external links) should link to pages needing ranking boosts. (3) Contextual relevance—link from topically relevant content with descriptive anchor text. (4) User experience—links should help users navigate to related, valuable content. (5) Crawl efficiency—internal links ensure all pages are discoverable and frequently crawled. Strategy implementation: audit current internal link structure (Screaming Frog, Ahrefs), identify orphan pages (no internal links), identify top pages by backlink equity for strategic outbound links, use keyword-rich anchor text (more flexibility than external anchors), and implement consistent link patterns (related posts, breadcrumbs, hub pages). Tools like Link Whisper and Yoast automate suggestions within WordPress.',
    relatedTerms: ['link-equity', 'site-architecture', 'anchor-text', 'content-clusters'],
    examples: [
      'Audit revealing homepage links to 300 pages, but product pages average only 5 internal links',
      'Adding internal links from 20 high-DA blog posts to commercial page, improving rankings by 15 positions',
      'Implementing related posts widget increasing average internal links per post from 3 to 8',
      'Fixing 500 orphan pages by adding them to category pages and related content links',
      'Strategic pillar-cluster linking structure improving traffic across entire topic cluster by 150%'
    ],
    category: 'technical-seo'
  },
  {
    id: 'bounce-rate',
    term: 'Bounce Rate',
    slug: 'bounce-rate',
    definition: 'Bounce rate is the percentage of visitors who leave a website after viewing only one page without taking any action, often indicating content-user intent misalignment or poor user experience.',
    technicalExplanation: 'Bounce rate context: (1) GA4 change—Universal Analytics defined bounce as single-page sessions; GA4 replaced this with "Engagement Rate" (sessions lasting >10 seconds, having conversion event, or having 2+ page views). Bounced sessions are those NOT engaged. (2) Benchmark variation—bounce rate varies dramatically by page type: blog posts (70-90% normal), homepage (40-60%), product pages (30-50%), landing pages (depends on goal). (3) SEO implications—while bounce rate itself isn\'t a confirmed ranking factor, the underlying user behavior signals (pogo-sticking, dwell time) likely influence rankings. High bounce rates may indicate: content doesn\'t match search intent, poor page experience, content answers question fully (not always bad), technical issues, or above-fold content doesn\'t engage. Reducing bounce: align content with search intent, improve above-fold experience, ensure fast loading, add compelling CTAs, and interlink to relevant content.',
    relatedTerms: ['engagement-rate', 'dwell-time', 'pogo-sticking', 'user-experience'],
    examples: [
      'Blog post bounce rate of 85% is normal; same rate on checkout page is problematic',
      'Reducing landing page bounce rate from 70% to 50% by adding relevant internal links',
      'High bounce rate on product pages correlated with slow mobile load time—fixed, bounce decreased 20%',
      'Featured snippet driving high bounce rate as users get answers without clicking—actually a success',
      'Comparing bounce rate between organic and paid traffic revealing intent mismatch on paid campaigns'
    ],
    category: 'metrics'
  },
  {
    id: 'dwell-time',
    term: 'Dwell Time',
    slug: 'dwell-time',
    definition: 'Dwell time is the duration a user spends on a page after clicking from search results before returning to the SERP, used as a user satisfaction signal by search engines.',
    technicalExplanation: 'Dwell time dynamics: (1) Not a GA metric—dwell time is specifically time between SERP click and return to SERP, which Google measures but doesn\'t share (it\'s not the same as "time on page" in analytics). (2) Quality signal—longer dwell time suggests content satisfied the query; quick returns (pogo-sticking) suggest it didn\'t. (3) Context matters—a quick return after a simple factual query isn\'t negative; a quick return from a comprehensive guide is. (4) Bing confirmation—Bing has confirmed using dwell time; Google hasn\'t explicitly but likely uses similar signals. Optimization: create comprehensive content that fully addresses queries, use engaging formats (video, interactive elements) to increase time, structure content for easy scanning to help users find what they need, and ensure page loads quickly so users don\'t bounce before seeing content. Dwell time is an indirect signal—focus on genuinely satisfying user intent rather than gaming time metrics.',
    relatedTerms: ['bounce-rate', 'pogo-sticking', 'user-engagement', 'search-intent'],
    examples: [
      'Adding video to guide pages increasing average dwell time from 1:30 to 4:45',
      'Long-form content consistently showing higher dwell times than thin content on similar topics',
      'Interactive calculator keeping users engaged for 5+ minutes on tool page',
      'Recognizing quick dwell time on "phone number for [company]" is successful—user found answer',
      'Pogo-sticking analysis revealing page 1 content wasn\'t matching search intent'
    ],
    category: 'metrics'
  },
  {
    id: 'algorithm-update',
    term: 'Algorithm Update',
    slug: 'algorithm-update',
    definition: 'An algorithm update is a change to search engine ranking systems that can significantly impact search results and website visibility, ranging from minor daily adjustments to major core updates.',
    technicalExplanation: 'Algorithm update types: (1) Core updates—broad changes to overall ranking systems, released several times yearly with official announcements; can take 2 weeks to fully roll out. (2) Spam updates—targeting specific manipulative practices (link spam, content spam). (3) Product reviews updates—improving quality of review content in results. (4) Helpful content updates—demoting content created primarily for search engines rather than users. (5) Daily/unconfirmed updates—thousands of small changes yearly, often unannounced. Recovery approach: for core updates, focus on overall quality and E-E-A-T rather than specific fixes; for targeted updates (spam, reviews), address specific guidelines violations. Timeline: some recoveries take until next core update (months); others are faster. Monitoring: use SEMrush Sensor, Mozcast, or Algoroo to detect volatility; correlate ranking changes with known update dates.',
    relatedTerms: ['core-update', 'helpful-content-update', 'spam-update', 'ranking-factors'],
    examples: [
      'Site losing 50% traffic in core update, recovering 80% in following core update after quality improvements',
      'Product review site penalized in reviews update for thin, affiliate-focused content',
      'Helpful Content Update impacting AI-generated content farms with low editorial value',
      'Minor daily fluctuations vs. major core update causing industry-wide ranking shifts',
      'Using update timeline to diagnose traffic drop cause—correlation with Spam Update dates'
    ],
    category: 'seo-strategy'
  },
  {
    id: 'seo-roi',
    term: 'SEO ROI',
    slug: 'seo-roi',
    definition: 'SEO ROI (Return on Investment) measures the financial return generated from SEO activities relative to the cost invested, essential for justifying SEO budgets and comparing against other marketing channels.',
    technicalExplanation: 'SEO ROI calculation: (Organic Revenue - SEO Cost) / SEO Cost × 100. Components: (1) Revenue attribution—track organic traffic conversion value in GA4; for non-ecommerce, assign values to leads/goals. (2) Cost calculation—include agency/contractor fees, tools, content creation, developer time, and internal staff time allocated to SEO. (3) Time horizon—SEO compounds over time; calculate ROI over 12-24 month periods, not monthly. (4) Comparison method—compare value of organic traffic to equivalent paid traffic cost (organic traffic × estimated CPC = paid equivalent value). Challenges: attribution complexity (organic often assists conversions), brand vs. non-brand separation, and long time to value. Advanced approaches: cohort analysis tracking users acquired through SEO, lifetime value calculation for SEO-acquired customers, and incrementality testing. Most SEO ROI calculations show 5-10x return over 24 months, though results vary significantly by industry and starting point.',
    relatedTerms: ['organic-traffic', 'conversion-tracking', 'attribution', 'marketing-roi'],
    examples: [
      'Calculating 12-month SEO investment of $100K generating $500K in organic revenue = 400% ROI',
      'Valuing 50K monthly organic visits at $2 CPC equivalent = $100K/month paid traffic value',
      'First 6 months negative ROI as investment compounds; months 7-12 showing 200% ROI',
      'Comparing SEO ROI (350%) vs. PPC ROI (150%) to justify budget reallocation',
      'Attributing $2M pipeline influence to organic traffic using multi-touch attribution'
    ],
    category: 'metrics'
  }
];

export const glossaryCategories = [
  { id: 'ai-technology', name: 'AI & Emerging Technology', slug: 'ai-technology' },
  { id: 'technical-seo', name: 'Technical SEO', slug: 'technical-seo' },
  { id: 'content-strategy', name: 'Content Strategy', slug: 'content-strategy' },
  { id: 'link-building', name: 'Link Building & Authority', slug: 'link-building' },
  { id: 'metrics', name: 'Metrics & Analytics', slug: 'metrics' },
  { id: 'local-seo', name: 'Local SEO', slug: 'local-seo' },
  { id: 'seo-strategy', name: 'SEO Strategy', slug: 'seo-strategy' },
  { id: 'serp-features', name: 'SERP Features', slug: 'serp-features' },
];
