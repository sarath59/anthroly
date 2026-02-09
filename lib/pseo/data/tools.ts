/**
 * SEO Tools Dataset
 * Comprehensive data for tool comparisons, integrations, and recommendations
 */

import { Tool } from '../types';

export const seoTools: Tool[] = [
  {
    id: 'ahrefs',
    name: 'Ahrefs',
    slug: 'ahrefs',
    description: 'Ahrefs is an all-in-one SEO toolset providing backlink analysis, keyword research, competitor analysis, rank tracking, and site auditing capabilities used by SEO professionals worldwide.',
    category: 'seo-suite',
    features: [
      'Site Explorer for backlink analysis',
      'Keywords Explorer with click metrics',
      'Site Audit for technical SEO',
      'Rank Tracker for SERP monitoring',
      'Content Explorer for content research',
      'Competitive analysis tools',
      'Domain Rating (DR) metric'
    ],
    pricing: 'Starting at $99/month (Lite plan)',
    website: 'https://ahrefs.com',
    pros: [
      'Largest backlink database in the industry',
      'Highly accurate keyword difficulty scores',
      'Excellent content gap analysis',
      'User-friendly interface',
      'Regular data updates and new features',
      'Strong educational resources'
    ],
    cons: [
      'Higher price point than some alternatives',
      'Limited reports on lower-tier plans',
      'No social media tracking',
      'Rank tracking credits can run out quickly'
    ]
  },
  {
    id: 'semrush',
    name: 'Semrush',
    slug: 'semrush',
    description: 'Semrush is a comprehensive digital marketing platform offering SEO, PPC, content marketing, social media, and competitive research tools in one integrated suite.',
    category: 'seo-suite',
    features: [
      'Keyword Magic Tool with 25B+ keywords',
      'Domain Overview and analysis',
      'Site Audit with 140+ checks',
      'Position Tracking',
      'Backlink Analytics and Audit',
      'Content Marketing Platform',
      'PPC and advertising tools',
      'Social media management'
    ],
    pricing: 'Starting at $129.95/month (Pro plan)',
    website: 'https://semrush.com',
    pros: [
      'All-in-one marketing platform',
      'Excellent keyword research database',
      'Strong PPC and advertising tools',
      'Comprehensive content optimization',
      'Good local SEO features',
      'API access for integrations'
    ],
    cons: [
      'Can be overwhelming for beginners',
      'Some features feel less polished than competitors',
      'Higher learning curve',
      'Backlink database smaller than Ahrefs'
    ]
  },
  {
    id: 'moz-pro',
    name: 'Moz Pro',
    slug: 'moz-pro',
    description: 'Moz Pro is an SEO software suite known for its Domain Authority metric, offering keyword research, link building, site audits, and rank tracking with a focus on accessibility.',
    category: 'seo-suite',
    features: [
      'Keyword Explorer with Priority score',
      'Link Explorer and analysis',
      'Site Crawl for technical issues',
      'Rank Tracking',
      'On-Page Grader',
      'Domain Authority (DA) metric',
      'MozBar browser extension',
      'SERP analysis tools'
    ],
    pricing: 'Starting at $99/month (Standard plan)',
    website: 'https://moz.com',
    pros: [
      'Beginner-friendly interface',
      'Strong educational content (Whiteboard Friday)',
      'Domain Authority is industry-standard metric',
      'Accurate keyword difficulty',
      'Good local SEO features via Moz Local',
      'Active community'
    ],
    cons: [
      'Smaller backlink database than Ahrefs/Semrush',
      'Slower data refresh rates',
      'Fewer features than competitors',
      'Limited international data'
    ]
  },
  {
    id: 'screaming-frog',
    name: 'Screaming Frog SEO Spider',
    slug: 'screaming-frog',
    description: 'Screaming Frog is a powerful website crawler that analyzes technical SEO elements including broken links, redirects, metadata, duplicate content, and page depth.',
    category: 'technical-seo',
    features: [
      'Website crawling and analysis',
      'Broken link detection',
      'Redirect chain analysis',
      'Duplicate content finder',
      'Meta data extraction',
      'XML sitemap generation',
      'JavaScript rendering',
      'Custom extraction',
      'Google Analytics/GSC integration'
    ],
    pricing: 'Free version (500 URLs) / £199/year (Paid)',
    website: 'https://screamingfrog.co.uk',
    pros: [
      'Industry-leading crawler capabilities',
      'Desktop-based (your data stays local)',
      'Highly customizable',
      'Integrates with GA, GSC, Ahrefs, Majestic',
      'Excellent for large site audits',
      'One-time annual fee, no monthly billing'
    ],
    cons: [
      'Steeper learning curve',
      'Requires desktop installation',
      'Can be resource-intensive for large sites',
      'Interface feels dated',
      'Limited visualization options'
    ]
  },
  {
    id: 'surfer-seo',
    name: 'Surfer SEO',
    slug: 'surfer-seo',
    description: 'Surfer SEO is a content optimization platform that uses NLP and competitive analysis to provide real-time content scoring and optimization recommendations.',
    category: 'content-optimization',
    features: [
      'Content Editor with live scoring',
      'SERP Analyzer',
      'Keyword Research',
      'Content Planner',
      'Audit tool for existing content',
      'NLP term recommendations',
      'Google Docs integration',
      'WordPress plugin'
    ],
    pricing: 'Starting at $89/month (Essential plan)',
    website: 'https://surferseo.com',
    pros: [
      'Real-time content optimization scoring',
      'Data-driven recommendations',
      'Easy to use Content Editor',
      'Good team collaboration features',
      'Regular algorithm updates',
      'Helpful content briefs'
    ],
    cons: [
      'Can lead to over-optimization if followed blindly',
      'Limited keyword research depth',
      'No backlink analysis',
      'Credit-based system limits usage'
    ]
  },
  {
    id: 'clearscope',
    name: 'Clearscope',
    slug: 'clearscope',
    description: 'Clearscope is an AI-powered content optimization platform that helps create comprehensive, high-ranking content by analyzing top-performing pages for any given keyword.',
    category: 'content-optimization',
    features: [
      'Content grading and scoring',
      'AI-powered term recommendations',
      'Competitive content analysis',
      'Readability metrics',
      'Google Docs add-on',
      'WordPress integration',
      'Content inventory tracking',
      'Team collaboration'
    ],
    pricing: 'Starting at $170/month (Essentials plan)',
    website: 'https://clearscope.io',
    pros: [
      'Highly accurate content recommendations',
      'Clean, intuitive interface',
      'Excellent Google Docs integration',
      'Strong enterprise features',
      'Great customer support',
      'Trusted by major brands'
    ],
    cons: [
      'Premium pricing',
      'Limited keyword research features',
      'No technical SEO capabilities',
      'Report credits limit usage'
    ]
  },
  {
    id: 'google-search-console',
    name: 'Google Search Console',
    slug: 'google-search-console',
    description: 'Google Search Console is Google\'s free service for monitoring, maintaining, and troubleshooting your site\'s presence in Google Search results.',
    category: 'google-tools',
    features: [
      'Search performance data',
      'Index coverage reports',
      'URL inspection tool',
      'Core Web Vitals reports',
      'Mobile usability testing',
      'Security issues alerts',
      'Manual actions monitoring',
      'Sitemap submission',
      'Rich results testing'
    ],
    pricing: 'Free',
    website: 'https://search.google.com/search-console',
    pros: [
      'Direct data from Google',
      'Completely free',
      'Essential for SEO monitoring',
      'Index and crawl insights',
      'Core Web Vitals tracking',
      'Security alerts'
    ],
    cons: [
      'Limited historical data (16 months)',
      'Sampling affects data accuracy',
      'Basic keyword research',
      'No competitor analysis',
      'Delayed data (2-3 days)'
    ]
  },
  {
    id: 'google-analytics',
    name: 'Google Analytics 4',
    slug: 'google-analytics-4',
    description: 'Google Analytics 4 is Google\'s latest analytics platform providing event-based tracking, cross-platform measurement, and AI-powered insights for understanding user behavior.',
    category: 'google-tools',
    features: [
      'Event-based data model',
      'Cross-platform tracking',
      'AI-powered insights',
      'Predictive metrics',
      'Enhanced ecommerce',
      'Custom reports and explorations',
      'BigQuery integration',
      'Privacy-centric design',
      'Free and paid tiers'
    ],
    pricing: 'Free (GA4 360 for enterprise)',
    website: 'https://analytics.google.com',
    pros: [
      'Free and powerful',
      'Cross-device tracking',
      'Machine learning insights',
      'BigQuery export',
      'Privacy-compliant design',
      'Integration ecosystem'
    ],
    cons: [
      'Steep learning curve from UA',
      'Different data model takes adjustment',
      'Some features require setup',
      'Interface can be confusing',
      'Limited historical data on migration'
    ]
  },
  {
    id: 'sitebulb',
    name: 'Sitebulb',
    slug: 'sitebulb',
    description: 'Sitebulb is a desktop website crawler that provides insightful, prioritized audit reports with visual hints and recommendations for technical SEO improvements.',
    category: 'technical-seo',
    features: [
      'Website crawling and auditing',
      'Prioritized issue reporting',
      'Visual site structure maps',
      'Hint system with recommendations',
      'JavaScript rendering',
      'Log file analysis',
      'PDF report generation',
      'Custom extraction',
      'Scheduled crawls'
    ],
    pricing: 'Starting at $13.50/month (Lite) / $35/month (Pro)',
    website: 'https://sitebulb.com',
    pros: [
      'Exceptional reporting and visualization',
      'Prioritized, actionable hints',
      'Great for client presentations',
      'Good price-to-value ratio',
      'Regular updates and improvements',
      'Excellent support'
    ],
    cons: [
      'Desktop-based only',
      'Slower than Screaming Frog for large sites',
      'Some advanced features require Pro',
      'Windows and Mac only'
    ]
  },
  {
    id: 'brightlocal',
    name: 'BrightLocal',
    slug: 'brightlocal',
    description: 'BrightLocal is a specialized local SEO platform offering citation building, review management, local rank tracking, and Google Business Profile management tools.',
    category: 'local-seo',
    features: [
      'Local rank tracking',
      'Citation building and management',
      'Review monitoring and generation',
      'Google Business Profile audit',
      'Local search audit',
      'White-label reporting',
      'Competitor analysis',
      'Citation Tracker'
    ],
    pricing: 'Starting at $39/month (Track plan)',
    website: 'https://brightlocal.com',
    pros: [
      'Comprehensive local SEO toolkit',
      'Excellent citation management',
      'Good review monitoring',
      'Affordable pricing',
      'White-label options for agencies',
      'Regular local search research'
    ],
    cons: [
      'Limited to local SEO use cases',
      'Citation building can be slow',
      'Interface showing age',
      'Some data accuracy issues'
    ]
  },
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    slug: 'chatgpt',
    description: 'ChatGPT by OpenAI is a conversational AI that can assist with content creation, SEO strategy ideation, keyword research, and various SEO-related tasks through natural language interaction.',
    category: 'ai-tools',
    features: [
      'Content generation and editing',
      'SEO strategy brainstorming',
      'Keyword idea generation',
      'Meta description writing',
      'Content outline creation',
      'Competitor analysis assistance',
      'Technical SEO explanations',
      'Code generation for SEO tools'
    ],
    pricing: 'Free tier / $20/month (Plus) / $200/month (Pro)',
    website: 'https://chat.openai.com',
    pros: [
      'Versatile SEO assistant',
      'Fast content ideation',
      'Helpful for explanations',
      'Code and automation help',
      'Continuous improvements',
      'Plugins for extended functionality'
    ],
    cons: [
      'Can produce inaccurate information',
      'No real-time data access (without plugins)',
      'Output requires fact-checking',
      'AI detection considerations',
      'Generic outputs without specific prompting'
    ]
  },
  {
    id: 'jasper',
    name: 'Jasper',
    slug: 'jasper',
    description: 'Jasper (formerly Jarvis) is an AI content platform designed for marketing teams, offering templates and workflows for creating SEO-optimized content at scale.',
    category: 'ai-tools',
    features: [
      'AI content generation',
      'SEO-focused templates',
      'Brand voice customization',
      'Campaign workflows',
      'Team collaboration',
      'Surfer SEO integration',
      'Chrome extension',
      'API access'
    ],
    pricing: 'Starting at $49/month (Creator plan)',
    website: 'https://jasper.ai',
    pros: [
      'Purpose-built for marketing content',
      'Good template library',
      'Brand voice training',
      'Surfer SEO integration',
      'Team features for collaboration',
      'Regular new features'
    ],
    cons: [
      'Expensive compared to ChatGPT',
      'Output quality varies',
      'Learning curve for best results',
      'Credit-based limitations'
    ]
  },
  {
    id: 'link-whisper',
    name: 'Link Whisper',
    slug: 'link-whisper',
    description: 'Link Whisper is a WordPress plugin that uses AI to suggest relevant internal links, helping improve site structure and distribute link equity more effectively.',
    category: 'internal-linking',
    features: [
      'AI-powered link suggestions',
      'Bulk internal linking',
      'Orphan content detection',
      'Link reporting and analytics',
      'Auto-linking rules',
      'Broken link detection',
      'Anchor text optimization',
      'WordPress integration'
    ],
    pricing: '$77/year (single site) / $117/year (3 sites)',
    website: 'https://linkwhisper.com',
    pros: [
      'Saves hours on internal linking',
      'Smart AI suggestions',
      'Easy bulk operations',
      'Good orphan content finder',
      'Reasonable pricing',
      'Active development'
    ],
    cons: [
      'WordPress only',
      'Suggestions need review',
      'Can slow down large sites',
      'Limited analytics depth'
    ]
  },
  {
    id: 'pitchbox',
    name: 'Pitchbox',
    slug: 'pitchbox',
    description: 'Pitchbox is an outreach and link building platform that streamlines prospecting, email outreach, and relationship management for acquiring high-quality backlinks.',
    category: 'link-building',
    features: [
      'Prospecting automation',
      'Email sequence management',
      'CRM for link building',
      'Template library',
      'Response tracking',
      'Team collaboration',
      'Reporting and analytics',
      'Integration with SEO tools'
    ],
    pricing: 'Custom pricing (typically $500+/month)',
    website: 'https://pitchbox.com',
    pros: [
      'Comprehensive outreach platform',
      'Good prospecting features',
      'Email deliverability focus',
      'Team collaboration built-in',
      'Strong reporting',
      'Integrations with major SEO tools'
    ],
    cons: [
      'Premium pricing',
      'Learning curve',
      'Overkill for small operations',
      'Enterprise-focused'
    ]
  },
  {
    id: 'buzzstream',
    name: 'BuzzStream',
    slug: 'buzzstream',
    description: 'BuzzStream is a digital PR and link building platform offering prospecting, outreach management, and relationship tracking for content promotion and link acquisition.',
    category: 'link-building',
    features: [
      'Contact discovery and research',
      'Email outreach campaigns',
      'Relationship management',
      'Team collaboration',
      'Link monitoring',
      'Template management',
      'Performance reporting',
      'Browser extension'
    ],
    pricing: 'Starting at $24/month (Starter plan)',
    website: 'https://buzzstream.com',
    pros: [
      'Affordable entry point',
      'Good prospecting tools',
      'Useful browser extension',
      'Clean interface',
      'Good for agencies',
      'Link monitoring features'
    ],
    cons: [
      'Email deliverability challenges',
      'Limited automation',
      'Interface can be slow',
      'Reporting could be better'
    ]
  }
];

export const toolCategories = [
  { id: 'seo-suite', name: 'All-in-One SEO Suites', slug: 'seo-suite' },
  { id: 'technical-seo', name: 'Technical SEO Tools', slug: 'technical-seo' },
  { id: 'content-optimization', name: 'Content Optimization', slug: 'content-optimization' },
  { id: 'google-tools', name: 'Google Tools', slug: 'google-tools' },
  { id: 'local-seo', name: 'Local SEO Tools', slug: 'local-seo' },
  { id: 'ai-tools', name: 'AI SEO Tools', slug: 'ai-tools' },
  { id: 'internal-linking', name: 'Internal Linking', slug: 'internal-linking' },
  { id: 'link-building', name: 'Link Building Tools', slug: 'link-building' },
];
