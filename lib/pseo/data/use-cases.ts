/**
 * Use Cases Dataset
 * SEO use cases for cross-playbook combinations
 */

export interface UseCase {
  id: string;
  name: string;
  slug: string;
  description: string;
  benefits: string[];
  challenges: string[];
}

export const useCases: UseCase[] = [
  {
    id: 'lead-generation',
    name: 'Lead Generation',
    slug: 'lead-generation',
    description: 'Attracting and capturing qualified business leads through organic search',
    benefits: ['Lower CAC than paid', 'Compounding returns', 'Higher quality leads', 'Brand building'],
    challenges: ['Longer time to results', 'Content investment', 'Attribution complexity']
  },
  {
    id: 'brand-awareness',
    name: 'Brand Awareness',
    slug: 'brand-awareness',
    description: 'Building brand visibility and recognition through search presence',
    benefits: ['Top-of-funnel reach', 'Thought leadership', 'Competitive positioning', 'Trust building'],
    challenges: ['Difficult to measure', 'Long-term investment', 'Content volume needed']
  },
  {
    id: 'ecommerce-sales',
    name: 'E-commerce Sales',
    slug: 'ecommerce-sales',
    description: 'Driving direct product sales through organic product and category visibility',
    benefits: ['Direct revenue attribution', 'High intent traffic', 'Margin preservation', 'Scale potential'],
    challenges: ['Amazon competition', 'Technical complexity', 'Inventory management']
  },
  {
    id: 'local-customers',
    name: 'Local Customer Acquisition',
    slug: 'local-customers',
    description: 'Attracting nearby customers through local search optimization',
    benefits: ['High conversion rates', 'Immediate revenue', 'Competitive advantage', 'Review building'],
    challenges: ['Geographic limitations', 'Review management', 'Multi-location complexity']
  },
  {
    id: 'saas-signups',
    name: 'SaaS Signups & Trials',
    slug: 'saas-signups',
    description: 'Driving software trial signups and freemium conversions',
    benefits: ['Product-qualified leads', 'Scalable acquisition', 'Lower CAC over time', 'Viral potential'],
    challenges: ['Long consideration cycle', 'Competitive keywords', 'Content-to-conversion gap']
  },
  {
    id: 'content-monetization',
    name: 'Content Monetization',
    slug: 'content-monetization',
    description: 'Generating revenue through advertising, affiliates, or subscriptions on content',
    benefits: ['Passive income potential', 'Scalable model', 'Multiple revenue streams', 'Asset building'],
    challenges: ['Traffic volume needed', 'Ad rate fluctuations', 'Content freshness requirements']
  },
  {
    id: 'thought-leadership',
    name: 'Thought Leadership',
    slug: 'thought-leadership',
    description: 'Establishing authority and expertise in your industry through content',
    benefits: ['Premium positioning', 'Speaking opportunities', 'Partnership attraction', 'Pricing power'],
    challenges: ['Expertise required', 'Consistency needed', 'Long-term commitment']
  },
  {
    id: 'recruitment',
    name: 'Recruitment & Employer Branding',
    slug: 'recruitment-seo',
    description: 'Attracting job candidates through career and employer brand content',
    benefits: ['Reduced recruiting costs', 'Better candidate quality', 'Employer brand building', 'Passive pipeline'],
    challenges: ['Career page optimization', 'Glassdoor management', 'Content authenticity']
  },
  {
    id: 'international-expansion',
    name: 'International Expansion',
    slug: 'international-expansion',
    description: 'Entering new geographic markets through localized SEO',
    benefits: ['New market access', 'First-mover advantage', 'Diversified revenue', 'Global brand'],
    challenges: ['Localization costs', 'Cultural nuances', 'Technical complexity', 'Local competition']
  },
  {
    id: 'product-launches',
    name: 'Product Launches',
    slug: 'product-launches',
    description: 'Building organic visibility for new products and features',
    benefits: ['Launch amplification', 'Long-term discovery', 'Competitive positioning', 'Feature adoption'],
    challenges: ['Timing coordination', 'Keyword research', 'Content creation speed']
  },
  {
    id: 'customer-education',
    name: 'Customer Education',
    slug: 'customer-education',
    description: 'Reducing support costs and improving retention through educational content',
    benefits: ['Reduced support tickets', 'Better onboarding', 'Increased retention', 'Upsell opportunities'],
    challenges: ['Content maintenance', 'Search vs support intent', 'Keeping content current']
  },
  {
    id: 'competitive-displacement',
    name: 'Competitive Displacement',
    slug: 'competitive-displacement',
    description: 'Capturing market share from competitors through comparison and alternative content',
    benefits: ['Bottom-funnel capture', 'Competitor traffic', 'Differentiation clarity', 'Decision influence'],
    challenges: ['Ethical considerations', 'Keeping comparisons current', 'Competitor response']
  },
  {
    id: 'affiliate-revenue',
    name: 'Affiliate Revenue',
    slug: 'affiliate-revenue',
    description: 'Generating commission income through affiliate product recommendations',
    benefits: ['Low barrier to entry', 'Passive income', 'Flexible scaling', 'Multiple niches'],
    challenges: ['Google scrutiny', 'Commission changes', 'Content quality requirements', 'Competition']
  },
  {
    id: 'app-downloads',
    name: 'App Downloads',
    slug: 'app-downloads',
    description: 'Driving mobile app installs through web search visibility',
    benefits: ['Web-to-app bridge', 'ASO complement', 'Brand searches', 'Feature discovery'],
    challenges: ['Attribution tracking', 'App store handoff', 'Deep linking complexity']
  },
  {
    id: 'event-registrations',
    name: 'Event Registrations',
    slug: 'event-registrations',
    description: 'Driving attendance for webinars, conferences, and events',
    benefits: ['Lead generation', 'Community building', 'Content creation', 'Partnership opportunities'],
    challenges: ['Timing sensitivity', 'One-time content', 'Registration optimization']
  },
  {
    id: 'investor-relations',
    name: 'Investor Relations',
    slug: 'investor-relations',
    description: 'Building visibility with investors and maintaining public company presence',
    benefits: ['Investor discovery', 'Credibility building', 'PR amplification', 'Regulatory compliance'],
    challenges: ['Compliance requirements', 'Message control', 'Sensitive information']
  },
  {
    id: 'partnership-development',
    name: 'Partnership Development',
    slug: 'partnership-development',
    description: 'Attracting integration partners and strategic alliances through visibility',
    benefits: ['Inbound partnerships', 'Ecosystem building', 'Integration requests', 'Co-marketing opportunities'],
    challenges: ['Partner qualification', 'Content strategy', 'Relationship management']
  },
  {
    id: 'crisis-management',
    name: 'Crisis & Reputation Management',
    slug: 'crisis-management',
    description: 'Protecting and repairing brand reputation through search presence',
    benefits: ['Narrative control', 'Negative suppression', 'Trust rebuilding', 'Stakeholder communication'],
    challenges: ['Speed requirements', 'Ongoing monitoring', 'Authenticity balance']
  }
];
