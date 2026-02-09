/**
 * Target Personas Dataset
 * Detailed persona profiles for persona-based pSEO pages
 */

import { Persona } from '../types';

export const targetPersonas: Persona[] = [
  {
    id: 'saas-founder',
    name: 'SaaS Founder',
    slug: 'saas-founders',
    title: 'Founder/CEO of SaaS Company',
    industry: 'Technology / Software',
    painPoints: [
      'High customer acquisition costs eating into margins',
      'Dependence on paid advertising for growth',
      'Difficulty standing out in crowded markets',
      'Limited time and expertise for SEO execution',
      'Struggling to build sustainable organic traffic',
      'Competitors outranking for key product terms',
      'AI search engines not recommending their product'
    ],
    goals: [
      'Reduce CAC through organic channels',
      'Build sustainable, compounding traffic growth',
      'Establish thought leadership in their niche',
      'Get recommended by AI assistants like ChatGPT',
      'Outrank competitors for bottom-funnel keywords',
      'Scale content production without scaling team'
    ],
    challenges: [
      'Building SEO infrastructure from scratch',
      'Finding writers who understand technical products',
      'Maintaining content quality while scaling',
      'Measuring SEO ROI against other channels',
      'Keeping up with algorithm changes'
    ],
    solutions: [
      'AI-powered content generation with human quality assurance',
      'Automated technical SEO monitoring and fixes',
      'Programmatic landing pages for feature keywords',
      'GEO optimization to appear in AI responses',
      'High-DR backlink acquisition through AI agents',
      'Comprehensive keyword gap analysis against competitors'
    ]
  },
  {
    id: 'marketing-director',
    name: 'Marketing Director',
    slug: 'marketing-directors',
    title: 'VP/Director of Marketing',
    industry: 'Cross-Industry',
    painPoints: [
      'Pressure to demonstrate ROI on marketing spend',
      'Limited budget for comprehensive SEO team',
      'Difficulty coordinating SEO across departments',
      'Keeping executive team informed on SEO progress',
      'Managing multiple vendors and tools',
      'Balancing short-term campaigns with long-term SEO'
    ],
    goals: [
      'Build predictable organic traffic pipeline',
      'Demonstrate clear SEO ROI to leadership',
      'Integrate SEO with broader marketing strategy',
      'Reduce reliance on paid acquisition',
      'Establish brand authority in target markets',
      'Future-proof marketing for AI search landscape'
    ],
    challenges: [
      'Justifying long-term SEO investment',
      'Reporting SEO results to non-technical stakeholders',
      'Coordinating content across multiple teams',
      'Maintaining consistency across global markets',
      'Adapting to constant search algorithm changes'
    ],
    solutions: [
      'Automated weekly performance reports for stakeholders',
      'AI-driven content calendar aligned with marketing goals',
      'Integrated GEO strategy for AI search visibility',
      'Scalable content production matching campaign needs',
      'Competitive monitoring with actionable insights',
      'Clear ROI tracking connecting SEO to revenue'
    ]
  },
  {
    id: 'ecommerce-manager',
    name: 'E-commerce Manager',
    slug: 'ecommerce-managers',
    title: 'E-commerce/Digital Commerce Manager',
    industry: 'Retail / E-commerce',
    painPoints: [
      'Product pages not ranking against Amazon and competitors',
      'Thin content across thousands of product pages',
      'Category pages lacking SEO optimization',
      'Seasonal traffic fluctuations impacting revenue',
      'Technical SEO issues from platform limitations',
      'Poor mobile shopping experience affecting rankings'
    ],
    goals: [
      'Rank product pages for commercial intent keywords',
      'Build topical authority in product categories',
      'Reduce dependence on marketplaces',
      'Improve organic shopping visibility',
      'Scale content across product catalog',
      'Capture product-related searches before Amazon'
    ],
    challenges: [
      'Managing SEO for thousands of products',
      'Creating unique content at scale',
      'Technical limitations of e-commerce platforms',
      'Competing with marketplace giants',
      'Seasonal keyword strategy planning'
    ],
    solutions: [
      'Programmatic product description optimization',
      'Category page content expansion',
      'Comparison and buying guide creation',
      'Technical SEO automation for product feeds',
      'Review and UGC optimization strategies',
      'Seasonal content calendar automation'
    ]
  },
  {
    id: 'agency-owner',
    name: 'Agency Owner',
    slug: 'agency-owners',
    title: 'Digital Marketing Agency Owner',
    industry: 'Marketing Services',
    painPoints: [
      'Scaling SEO services without proportional team growth',
      'Maintaining quality across multiple clients',
      'Pricing pressure from competitors',
      'Client churn from slow or unclear results',
      'Difficulty recruiting skilled SEO talent',
      'Managing diverse client expectations'
    ],
    goals: [
      'Deliver better results with leaner teams',
      'Differentiate with AI-powered services',
      'Increase client retention through results',
      'Scale service delivery profitably',
      'Build recurring revenue from SEO services',
      'Stay ahead of industry changes'
    ],
    challenges: [
      'Training team on evolving best practices',
      'White-labeling reports and dashboards',
      'Managing multiple tool subscriptions',
      'Standardizing processes across clients',
      'Demonstrating value to justify retainers'
    ],
    solutions: [
      'White-label AI SEO services to resell',
      'Automated client reporting dashboards',
      'Scalable content production for all clients',
      'Standardized playbooks for consistent delivery',
      'AI-powered link building at scale',
      'Competitive edge with GEO services'
    ]
  },
  {
    id: 'content-manager',
    name: 'Content Manager',
    slug: 'content-managers',
    title: 'Content Marketing Manager',
    industry: 'Cross-Industry',
    painPoints: [
      'Pressure to produce more content with same resources',
      'Writer bandwidth limiting content output',
      'Content not ranking despite effort invested',
      'Difficulty measuring content ROI',
      'Maintaining brand voice at scale',
      'Content gaps versus competitors'
    ],
    goals: [
      'Increase content production without quality loss',
      'Ensure all content ranks for target keywords',
      'Build comprehensive topic coverage',
      'Demonstrate content-to-revenue connection',
      'Create content that AI systems reference',
      'Establish brand as go-to resource'
    ],
    challenges: [
      'Balancing quantity and quality demands',
      'Optimizing existing underperforming content',
      'Coordinating with SEO and demand gen teams',
      'Managing freelancers and content ops',
      'Keeping content fresh and updated'
    ],
    solutions: [
      'AI-assisted content drafts with human refinement',
      'Content optimization scoring and recommendations',
      'Automated content briefs from keyword research',
      'Content refresh and update workflows',
      'Performance tracking tied to business goals',
      'Programmatic content for long-tail keywords'
    ]
  },
  {
    id: 'startup-cto',
    name: 'Startup CTO',
    slug: 'startup-ctos',
    title: 'CTO/Technical Co-Founder',
    industry: 'Technology Startups',
    painPoints: [
      'Limited bandwidth for non-core technical work',
      'SEO seen as outside technical domain',
      'Technical debt affecting site performance',
      'Need for developer-friendly SEO solutions',
      'Integrating SEO with existing tech stack',
      'Pressure to support marketing without dedicated resources'
    ],
    goals: [
      'Implement SEO without heavy engineering lift',
      'Automate technical SEO maintenance',
      'Build SEO-friendly architecture from start',
      'Use data and APIs over manual processes',
      'Support marketing team efficiently',
      'Maintain site performance while improving SEO'
    ],
    challenges: [
      'Prioritizing SEO against product development',
      'Understanding marketing metrics as engineer',
      'Finding SEO solutions that integrate with stack',
      'Avoiding performance-killing SEO mistakes',
      'Managing crawl budget for dynamic sites'
    ],
    solutions: [
      'API-first SEO tools that integrate with workflows',
      'Automated technical SEO monitoring and alerts',
      'Performance-optimized content delivery',
      'Developer-friendly documentation and setup',
      'CI/CD integration for SEO checks',
      'Headless CMS-compatible solutions'
    ]
  },
  {
    id: 'small-business-owner',
    name: 'Small Business Owner',
    slug: 'small-business-owners',
    title: 'Local Business Owner',
    industry: 'Small Business / Local Services',
    painPoints: [
      'Limited budget for marketing and SEO',
      'Local competitors outranking online',
      'No time or expertise for SEO management',
      'Dependence on word-of-mouth and referrals',
      'Poor online reviews affecting business',
      'Not showing up in Google Maps searches'
    ],
    goals: [
      'Appear in local search results',
      'Get more customers through Google',
      'Build positive online reputation',
      'Compete with larger local competitors',
      'Reduce customer acquisition costs',
      'Generate leads without paid advertising'
    ],
    challenges: [
      'Understanding what SEO work is needed',
      'Finding affordable, trustworthy SEO help',
      'Managing Google Business Profile effectively',
      'Generating and managing customer reviews',
      'Creating local content consistently'
    ],
    solutions: [
      'Affordable local SEO packages',
      'Google Business Profile optimization',
      'Review generation and management',
      'Local citation building automation',
      'Location-specific content creation',
      'Simplified reporting and communication'
    ]
  },
  {
    id: 'seo-professional',
    name: 'SEO Professional',
    slug: 'seo-professionals',
    title: 'In-House SEO Specialist/Manager',
    industry: 'Cross-Industry',
    painPoints: [
      'Too many tasks with too few resources',
      'Manual processes consuming time',
      'Difficulty getting buy-in for SEO initiatives',
      'Keeping up with algorithm updates',
      'Pressure to show quick results',
      'Tool overload and subscription costs'
    ],
    goals: [
      'Automate repetitive SEO tasks',
      'Scale impact without scaling team',
      'Stay ahead of industry changes',
      'Demonstrate clear business impact',
      'Develop AI and GEO expertise',
      'Build more efficient workflows'
    ],
    challenges: [
      'Balancing strategy and execution',
      'Training stakeholders on SEO importance',
      'Integrating multiple tools and data sources',
      'Proving SEO value versus paid channels',
      'Adapting to AI-driven search changes'
    ],
    solutions: [
      'AI automation for content and link building',
      'Consolidated reporting across all metrics',
      'GEO training and implementation',
      'Time-saving workflow automations',
      'Competitive intelligence automation',
      'Industry-leading best practices access'
    ]
  },
  {
    id: 'affiliate-marketer',
    name: 'Affiliate Marketer',
    slug: 'affiliate-marketers',
    title: 'Affiliate Website Owner',
    industry: 'Affiliate Marketing',
    painPoints: [
      'Algorithm updates devastating traffic overnight',
      'Thin affiliate content getting penalized',
      'Difficulty competing with authority sites',
      'AI overviews reducing click-through to sites',
      'Link building for affiliate sites is challenging',
      'Maintaining multiple niche sites efficiently'
    ],
    goals: [
      'Build algorithm-resistant affiliate sites',
      'Create genuinely helpful comparison content',
      'Scale quality content production',
      'Diversify traffic sources beyond Google',
      'Build authority that withstands updates',
      'Appear in AI recommendations for products'
    ],
    challenges: [
      'Creating differentiated review content',
      'Building links to commercial content',
      'Staying compliant with FTC and affiliate rules',
      'Managing seasonal and trend shifts',
      'Avoiding over-optimization penalties'
    ],
    solutions: [
      'AI-assisted expert-level product reviews',
      'Authentic backlink acquisition strategies',
      'GEO optimization for product recommendations',
      'Content quality assessment and improvement',
      'Diversification across pSEO playbooks',
      'Trend monitoring and quick content deployment'
    ]
  },
  {
    id: 'b2b-marketer',
    name: 'B2B Marketer',
    slug: 'b2b-marketers',
    title: 'B2B Marketing Manager',
    industry: 'B2B / Enterprise',
    painPoints: [
      'Long sales cycles making attribution difficult',
      'Technical content requiring SME involvement',
      'Limited search volume for niche B2B keywords',
      'Competitors with larger content budgets',
      'Decision-makers researching via AI assistants',
      'Complex buying committees with varied needs'
    ],
    goals: [
      'Capture demand at all funnel stages',
      'Establish thought leadership in niche',
      'Support sales team with content assets',
      'Appear in AI-powered research queries',
      'Build trust through comprehensive resources',
      'Generate qualified leads through content'
    ],
    challenges: [
      'Creating technical content without SME bottleneck',
      'Targeting multiple personas in buying committee',
      'Measuring content influence on long sales cycles',
      'Standing out in specialized B2B searches',
      'Balancing gated and ungated content'
    ],
    solutions: [
      'AI content with expert review workflow',
      'Persona-specific content targeting',
      'Full-funnel keyword strategy',
      'GEO optimization for B2B research queries',
      'Integration and comparison content at scale',
      'Case study and social proof amplification'
    ]
  }
];

export const personaCategories = [
  { id: 'executives', name: 'Executives & Founders', slug: 'executives-founders' },
  { id: 'marketing', name: 'Marketing Professionals', slug: 'marketing-professionals' },
  { id: 'technical', name: 'Technical Roles', slug: 'technical-roles' },
  { id: 'small-business', name: 'Small Business', slug: 'small-business' },
  { id: 'specialists', name: 'SEO & Content Specialists', slug: 'specialists' },
];
