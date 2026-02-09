/**
 * Integrations Dataset
 * Integration profiles for integration-based pSEO pages
 */

import { Integration } from '../types';

export const seoIntegrations: Integration[] = [
  {
    id: 'wordpress',
    name: 'WordPress',
    slug: 'wordpress',
    description: 'WordPress is the world\'s most popular content management system, powering over 40% of all websites, making it essential for SEO tool integration and optimization.',
    category: 'cms',
    setupSteps: [
      'Install required SEO plugins (Yoast, Rank Math, or All in One SEO)',
      'Configure Google Search Console and Analytics integration',
      'Set up XML sitemap generation and submission',
      'Configure robots.txt and meta tag controls',
      'Implement schema markup through plugin or custom code',
      'Connect AI content tools via API or plugin',
      'Set up automated content publishing workflows'
    ],
    useCases: [
      'Automated blog content publishing from AI generation',
      'Programmatic landing page creation at scale',
      'Schema markup automation across post types',
      'Internal linking optimization with AI suggestions',
      'Performance monitoring and Core Web Vitals tracking',
      'Multi-site SEO management for agencies'
    ],
    benefits: [
      'Largest plugin ecosystem for SEO functionality',
      'Easy content management for non-technical users',
      'Extensive documentation and community support',
      'Flexible API for custom integrations',
      'SEO-friendly architecture out of the box'
    ]
  },
  {
    id: 'shopify',
    name: 'Shopify',
    slug: 'shopify',
    description: 'Shopify is a leading e-commerce platform used by millions of merchants, requiring specialized SEO integration approaches for product and category optimization.',
    category: 'ecommerce',
    setupSteps: [
      'Configure Shopify\'s built-in SEO settings and URL structure',
      'Install and configure SEO apps (SEO Manager, Plug in SEO)',
      'Set up product schema markup for rich snippets',
      'Configure Google Merchant Center integration',
      'Implement canonical tags for variant and collection pages',
      'Set up automated product description optimization',
      'Connect inventory data for dynamic availability markup'
    ],
    useCases: [
      'Product page SEO optimization at scale',
      'Collection page content enhancement',
      'Automated product schema generation',
      'Review and rating rich snippet integration',
      'Cross-sell and internal linking optimization',
      'Multi-market SEO for international stores'
    ],
    benefits: [
      'Built-in SEO basics with minimal configuration',
      'Strong app ecosystem for SEO enhancement',
      'Reliable hosting with good performance',
      'Mobile-optimized themes for Core Web Vitals',
      'Google channel integration for shopping ads'
    ]
  },
  {
    id: 'hubspot',
    name: 'HubSpot',
    slug: 'hubspot',
    description: 'HubSpot is an all-in-one marketing platform combining CRM, content management, and marketing automation, ideal for integrated SEO and lead generation strategies.',
    category: 'marketing-automation',
    setupSteps: [
      'Configure HubSpot CMS SEO settings and recommendations',
      'Set up blog SEO optimization tools',
      'Integrate Google Search Console via HubSpot',
      'Configure landing page SEO templates',
      'Set up topic clusters and pillar page strategy',
      'Connect AI content tools via HubSpot marketplace',
      'Configure SEO reporting dashboards'
    ],
    useCases: [
      'Content strategy planning with topic clusters',
      'SEO recommendations integrated into content editor',
      'Landing page optimization for conversion and ranking',
      'Lead attribution connecting SEO to revenue',
      'Automated SEO reporting for stakeholders',
      'Personalized content based on SEO traffic segments'
    ],
    benefits: [
      'Integrated SEO tools within marketing platform',
      'Built-in topic cluster strategy support',
      'Clear SEO-to-revenue attribution',
      'No-code landing page creation',
      'Strong content analytics integration'
    ]
  },
  {
    id: 'webflow',
    name: 'Webflow',
    slug: 'webflow',
    description: 'Webflow is a visual web development platform that combines design flexibility with CMS capabilities, offering strong SEO customization without code.',
    category: 'cms',
    setupSteps: [
      'Configure site-wide SEO settings in project settings',
      'Set up custom meta tags and Open Graph for all pages',
      'Configure clean URL structure and 301 redirects',
      'Implement custom schema markup via embed code',
      'Set up CMS collection SEO templates',
      'Configure sitemap settings and automatic generation',
      'Connect external SEO tools via Webflow API'
    ],
    useCases: [
      'Design-led SEO landing pages',
      'Programmatic page generation via CMS collections',
      'Custom schema implementation without developers',
      'A/B testing landing page designs for SEO',
      'Fast-loading pages for Core Web Vitals',
      'Agency client site management at scale'
    ],
    benefits: [
      'Full control over technical SEO without code',
      'Fast, clean code output for performance',
      'Visual CMS for scalable content',
      'Built-in responsive design for mobile SEO',
      'Clean exports for hosting anywhere'
    ]
  },
  {
    id: 'google-search-console-integration',
    name: 'Google Search Console',
    slug: 'google-search-console',
    description: 'Google Search Console provides direct data from Google about your site\'s search performance, making integration essential for any SEO strategy.',
    category: 'google',
    setupSteps: [
      'Verify domain ownership via DNS or meta tag',
      'Submit XML sitemap for indexing',
      'Connect GSC API for automated data extraction',
      'Set up automated reporting via Data Studio or custom tools',
      'Configure alerts for indexing issues',
      'Integrate with analytics for combined insights',
      'Set up multi-property management for enterprise'
    ],
    useCases: [
      'Performance monitoring for rankings and clicks',
      'Index coverage troubleshooting and fixes',
      'Core Web Vitals monitoring and alerts',
      'Keyword opportunity discovery from impressions',
      'Mobile usability issue detection',
      'Security and manual action monitoring'
    ],
    benefits: [
      'Direct data from Google (ground truth)',
      'Free and comprehensive indexing data',
      'Early warning for technical issues',
      'Keyword performance data not available elsewhere',
      'API access for automation and integration'
    ]
  },
  {
    id: 'google-analytics-4-integration',
    name: 'Google Analytics 4',
    slug: 'google-analytics-4',
    description: 'Google Analytics 4 provides event-based user analytics essential for measuring SEO traffic quality, conversions, and user behavior on site.',
    category: 'google',
    setupSteps: [
      'Create GA4 property and install tracking code',
      'Configure enhanced measurement for automatic events',
      'Set up conversion goals for SEO success metrics',
      'Connect Search Console for combined data',
      'Configure BigQuery export for advanced analysis',
      'Set up custom events for engagement tracking',
      'Create SEO-specific reporting dashboards'
    ],
    useCases: [
      'Organic traffic quality analysis',
      'SEO conversion tracking and attribution',
      'Landing page performance analysis',
      'User journey mapping from organic entry',
      'Content engagement metrics',
      'Multi-channel attribution including organic'
    ],
    benefits: [
      'Free, comprehensive traffic analytics',
      'Cross-platform user tracking',
      'Machine learning-powered insights',
      'BigQuery integration for data ownership',
      'Flexible event-based tracking model'
    ]
  },
  {
    id: 'slack',
    name: 'Slack',
    slug: 'slack',
    description: 'Slack is a business communication platform ideal for SEO alert notifications, team collaboration on SEO tasks, and automated reporting delivery.',
    category: 'communication',
    setupSteps: [
      'Create dedicated SEO channel or workspace',
      'Set up incoming webhook for automated alerts',
      'Configure bot integration for command-based queries',
      'Connect SEO tools via native integrations or Zapier',
      'Set up scheduled report delivery to channels',
      'Configure alert thresholds for ranking changes',
      'Create workflow automations for SEO tasks'
    ],
    useCases: [
      'Real-time ranking drop alerts',
      'Weekly SEO performance summaries',
      'Team collaboration on content optimization',
      'Automated backlink acquisition notifications',
      'Technical issue alerts from crawlers',
      'Competitor activity notifications'
    ],
    benefits: [
      'Instant notifications to entire team',
      'Centralized SEO communication',
      'Easy integration with most SEO tools',
      'Searchable history of SEO updates',
      'Automation capabilities via workflows'
    ]
  },
  {
    id: 'zapier',
    name: 'Zapier',
    slug: 'zapier',
    description: 'Zapier is a no-code automation platform connecting thousands of apps, enabling powerful SEO workflow automation without development resources.',
    category: 'automation',
    setupSteps: [
      'Connect SEO tools to Zapier (GSC, Ahrefs, Semrush)',
      'Set up triggers for key SEO events',
      'Create multi-step zaps for complex workflows',
      'Configure data transformation steps',
      'Set up error handling and notifications',
      'Test workflows thoroughly before activation',
      'Monitor zap performance and optimize'
    ],
    useCases: [
      'Auto-create tasks when rankings drop',
      'Sync keyword data across platforms',
      'Trigger content updates based on performance',
      'Automate backlink outreach sequences',
      'Populate content calendars from keyword research',
      'Send automated client reports'
    ],
    benefits: [
      'No-code automation capability',
      '5000+ app integrations available',
      'Multi-step workflow support',
      'Scheduling and conditional logic',
      'Accessible for non-technical marketers'
    ]
  },
  {
    id: 'notion',
    name: 'Notion',
    slug: 'notion',
    description: 'Notion is an all-in-one workspace for notes, projects, and wikis, increasingly used for SEO content planning, keyword tracking, and team documentation.',
    category: 'project-management',
    setupSteps: [
      'Create SEO workspace with essential databases',
      'Set up keyword tracking database with properties',
      'Create content calendar with SEO fields',
      'Build backlink tracking and outreach database',
      'Configure API integration for automated updates',
      'Set up dashboards for SEO metrics overview',
      'Create team wiki for SEO processes'
    ],
    useCases: [
      'Content calendar management with SEO metadata',
      'Keyword research organization and prioritization',
      'Backlink outreach tracking and CRM',
      'SEO process documentation and training',
      'Client reporting templates and delivery',
      'Competitive analysis tracking'
    ],
    benefits: [
      'Flexible database structure for any workflow',
      'Excellent collaboration features',
      'API access for automation',
      'Templates for quick setup',
      'Connected databases for holistic view'
    ]
  },
  {
    id: 'airtable',
    name: 'Airtable',
    slug: 'airtable',
    description: 'Airtable is a flexible database platform combining spreadsheet familiarity with database power, ideal for managing large-scale SEO data and workflows.',
    category: 'project-management',
    setupSteps: [
      'Create SEO base with linked tables',
      'Set up keyword database with ranking history',
      'Build content inventory with SEO metrics',
      'Configure automation for data updates',
      'Connect to data sources via API or integrations',
      'Create views for different team members',
      'Set up sync with other tools via Zapier'
    ],
    useCases: [
      'Large-scale keyword tracking and analysis',
      'Content inventory management',
      'Link building campaign management',
      'Programmatic SEO page tracking',
      'Client deliverable management',
      'SEO testing and experiment tracking'
    ],
    benefits: [
      'Powerful data relationships and views',
      'Strong automation capabilities',
      'Robust API for integrations',
      'Scalable for large datasets',
      'Team collaboration built-in'
    ]
  },
  {
    id: 'next-js',
    name: 'Next.js',
    slug: 'nextjs',
    description: 'Next.js is a React framework for production with built-in performance optimization and SEO-friendly features like server-side rendering and static generation.',
    category: 'framework',
    setupSteps: [
      'Configure next/head for meta tag management',
      'Implement getStaticProps for pre-rendering',
      'Set up dynamic sitemap generation',
      'Configure robots.txt via public folder or API',
      'Implement structured data via next/script',
      'Optimize images with next/image',
      'Configure ISR for content freshness'
    ],
    useCases: [
      'High-performance SEO-optimized websites',
      'Programmatic landing page generation',
      'Server-rendered content for full indexability',
      'Static site generation for speed',
      'Hybrid rendering strategies',
      'API-driven content websites'
    ],
    benefits: [
      'Excellent Core Web Vitals out of the box',
      'Automatic code splitting',
      'Built-in image optimization',
      'Flexible rendering strategies',
      'Strong TypeScript support'
    ]
  },
  {
    id: 'contentful',
    name: 'Contentful',
    slug: 'contentful',
    description: 'Contentful is a headless CMS providing structured content via API, enabling flexible content delivery across platforms with strong SEO metadata capabilities.',
    category: 'headless-cms',
    setupSteps: [
      'Configure content models with SEO fields',
      'Set up canonical URL and meta tag patterns',
      'Implement webhook-triggered builds',
      'Configure preview environments',
      'Set up content scheduling for SEO campaigns',
      'Implement multi-locale content structure',
      'Configure asset optimization for images'
    ],
    useCases: [
      'Multi-channel content distribution',
      'Programmatic content management',
      'Multi-market SEO with locale support',
      'Content API for multiple frontends',
      'Structured content for better AI understanding',
      'Enterprise content operations at scale'
    ],
    benefits: [
      'Structured content model flexibility',
      'Strong multi-locale support',
      'Reliable, scalable infrastructure',
      'Rich text with structured data',
      'Extensive API and SDK support'
    ]
  },
  {
    id: 'semrush-integration',
    name: 'Semrush',
    slug: 'semrush-api',
    description: 'Semrush offers comprehensive API access for integrating keyword research, rank tracking, and competitive analysis into custom SEO workflows and tools.',
    category: 'seo-tools',
    setupSteps: [
      'Obtain API key from Semrush account',
      'Configure rate limiting for API calls',
      'Set up data pipelines for keyword data',
      'Implement rank tracking automation',
      'Configure competitive analysis queries',
      'Build custom reporting dashboards',
      'Set up alerting based on API data'
    ],
    useCases: [
      'Automated keyword research workflows',
      'Custom rank tracking dashboards',
      'Competitive intelligence automation',
      'Content gap analysis at scale',
      'Backlink monitoring integration',
      'White-label reporting for agencies'
    ],
    benefits: [
      'Comprehensive data coverage',
      'Reliable, well-documented API',
      'Multiple endpoint types available',
      'Historical data access',
      'Strong support and documentation'
    ]
  },
  {
    id: 'ahrefs-integration',
    name: 'Ahrefs',
    slug: 'ahrefs-api',
    description: 'Ahrefs provides API access to the largest backlink database and keyword research tools, enabling powerful custom integrations for link building and analysis.',
    category: 'seo-tools',
    setupSteps: [
      'Enable API access in Ahrefs subscription',
      'Configure authentication and rate limits',
      'Set up backlink monitoring pipelines',
      'Implement keyword data extraction',
      'Configure competitor tracking queries',
      'Build custom backlink analysis tools',
      'Set up alerting for link changes'
    ],
    useCases: [
      'Automated backlink monitoring',
      'Custom link building prospecting tools',
      'Competitor backlink analysis at scale',
      'Content Explorer integration for ideation',
      'Site audit automation',
      'Custom keyword research workflows'
    ],
    benefits: [
      'Largest backlink database in industry',
      'Fresh data with regular updates',
      'Comprehensive endpoint coverage',
      'Strong developer documentation',
      'Reliable uptime and performance'
    ]
  }
];

export const integrationCategories = [
  { id: 'cms', name: 'Content Management Systems', slug: 'cms' },
  { id: 'ecommerce', name: 'E-commerce Platforms', slug: 'ecommerce' },
  { id: 'marketing-automation', name: 'Marketing Automation', slug: 'marketing-automation' },
  { id: 'google', name: 'Google Tools', slug: 'google-tools' },
  { id: 'communication', name: 'Communication', slug: 'communication' },
  { id: 'automation', name: 'Automation', slug: 'automation' },
  { id: 'project-management', name: 'Project Management', slug: 'project-management' },
  { id: 'framework', name: 'Frameworks', slug: 'frameworks' },
  { id: 'headless-cms', name: 'Headless CMS', slug: 'headless-cms' },
  { id: 'seo-tools', name: 'SEO Tools', slug: 'seo-tools' },
];
