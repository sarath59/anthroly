/**
 * Industries Dataset
 * Industry verticals for cross-playbook combinations
 */

export interface Industry {
  id: string;
  name: string;
  slug: string;
  description: string;
  painPoints: string[];
  seoNeeds: string[];
  keywords: string[];
}

export const industries: Industry[] = [
  {
    id: 'saas',
    name: 'SaaS',
    slug: 'saas',
    description: 'Software as a Service companies delivering cloud-based applications',
    painPoints: ['High CAC', 'Competitive keywords', 'Long sales cycles', 'Churn reduction'],
    seoNeeds: ['Product-led content', 'Comparison pages', 'Integration content', 'Feature pages'],
    keywords: ['saas seo', 'software marketing', 'b2b saas', 'cloud software']
  },
  {
    id: 'ecommerce',
    name: 'E-commerce',
    slug: 'ecommerce',
    description: 'Online retail and direct-to-consumer brands',
    painPoints: ['Amazon competition', 'Product page rankings', 'Seasonal traffic', 'Category optimization'],
    seoNeeds: ['Product SEO', 'Category pages', 'Buying guides', 'Review optimization'],
    keywords: ['ecommerce seo', 'online store seo', 'product seo', 'shopping seo']
  },
  {
    id: 'fintech',
    name: 'Fintech',
    slug: 'fintech',
    description: 'Financial technology and digital banking services',
    painPoints: ['YMYL compliance', 'Trust building', 'Regulatory content', 'Competitive landscape'],
    seoNeeds: ['E-E-A-T optimization', 'Educational content', 'Comparison tools', 'Calculator pages'],
    keywords: ['fintech seo', 'financial services marketing', 'banking seo', 'finance content']
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    slug: 'healthcare',
    description: 'Healthcare providers, healthtech, and medical services',
    painPoints: ['YMYL requirements', 'Medical accuracy', 'HIPAA considerations', 'Local competition'],
    seoNeeds: ['Medical E-E-A-T', 'Local SEO', 'Patient education', 'Provider directories'],
    keywords: ['healthcare seo', 'medical seo', 'healthtech marketing', 'hospital seo']
  },
  {
    id: 'legal',
    name: 'Legal Services',
    slug: 'legal',
    description: 'Law firms and legal technology companies',
    painPoints: ['High CPC keywords', 'Local competition', 'Trust building', 'Practice area targeting'],
    seoNeeds: ['Local SEO', 'Practice area pages', 'Case study content', 'FAQ optimization'],
    keywords: ['law firm seo', 'legal marketing', 'attorney seo', 'legal services seo']
  },
  {
    id: 'real-estate',
    name: 'Real Estate',
    slug: 'real-estate',
    description: 'Real estate agencies, property tech, and property management',
    painPoints: ['Hyperlocal competition', 'Listing visibility', 'Market fluctuations', 'Agent branding'],
    seoNeeds: ['Local SEO', 'Neighborhood pages', 'Market reports', 'Property listings optimization'],
    keywords: ['real estate seo', 'realtor marketing', 'property seo', 'real estate marketing']
  },
  {
    id: 'education',
    name: 'Education & EdTech',
    slug: 'education',
    description: 'Educational institutions and learning technology platforms',
    painPoints: ['Enrollment cycles', 'Program differentiation', 'Student recruitment', 'Course visibility'],
    seoNeeds: ['Program pages', 'Course content', 'Student resources', 'Comparison content'],
    keywords: ['education seo', 'edtech marketing', 'university seo', 'online course seo']
  },
  {
    id: 'travel',
    name: 'Travel & Hospitality',
    slug: 'travel',
    description: 'Travel agencies, hotels, and tourism businesses',
    painPoints: ['OTA competition', 'Seasonal demand', 'Destination visibility', 'Review management'],
    seoNeeds: ['Destination pages', 'Local SEO', 'Experience content', 'Booking optimization'],
    keywords: ['travel seo', 'hotel seo', 'tourism marketing', 'hospitality seo']
  },
  {
    id: 'manufacturing',
    name: 'Manufacturing',
    slug: 'manufacturing',
    description: 'Industrial manufacturing and B2B suppliers',
    painPoints: ['Technical content', 'Long sales cycles', 'Niche keywords', 'Global reach'],
    seoNeeds: ['Technical content', 'Product catalogs', 'Industry applications', 'Specification pages'],
    keywords: ['manufacturing seo', 'industrial marketing', 'b2b manufacturing', 'industrial seo']
  },
  {
    id: 'professional-services',
    name: 'Professional Services',
    slug: 'professional-services',
    description: 'Consulting, accounting, and business services',
    painPoints: ['Service differentiation', 'Trust building', 'Local visibility', 'Thought leadership'],
    seoNeeds: ['Service pages', 'Case studies', 'Thought leadership', 'Local SEO'],
    keywords: ['consulting seo', 'professional services marketing', 'b2b services seo']
  },
  {
    id: 'restaurants',
    name: 'Restaurants & Food Service',
    slug: 'restaurants',
    description: 'Restaurants, cafes, and food service businesses',
    painPoints: ['Local competition', 'Review management', 'Menu visibility', 'Delivery platforms'],
    seoNeeds: ['Local SEO', 'Menu optimization', 'Review management', 'Location pages'],
    keywords: ['restaurant seo', 'local restaurant marketing', 'food service seo']
  },
  {
    id: 'fitness',
    name: 'Fitness & Wellness',
    slug: 'fitness',
    description: 'Gyms, fitness apps, and wellness services',
    painPoints: ['Local competition', 'Membership acquisition', 'Class visibility', 'App store optimization'],
    seoNeeds: ['Local SEO', 'Class/program pages', 'Fitness content', 'Location optimization'],
    keywords: ['fitness seo', 'gym marketing', 'wellness seo', 'health club seo']
  },
  {
    id: 'automotive',
    name: 'Automotive',
    slug: 'automotive',
    description: 'Car dealerships, auto services, and automotive tech',
    painPoints: ['Local competition', 'Inventory visibility', 'Service differentiation', 'Brand vs dealer'],
    seoNeeds: ['Inventory pages', 'Local SEO', 'Service pages', 'Make/model content'],
    keywords: ['automotive seo', 'car dealer seo', 'auto service marketing']
  },
  {
    id: 'insurance',
    name: 'Insurance',
    slug: 'insurance',
    description: 'Insurance providers and insurtech companies',
    painPoints: ['YMYL compliance', 'High CPC', 'Trust building', 'Product complexity'],
    seoNeeds: ['Product pages', 'Educational content', 'Comparison tools', 'Quote optimization'],
    keywords: ['insurance seo', 'insurtech marketing', 'insurance marketing']
  },
  {
    id: 'nonprofit',
    name: 'Nonprofit',
    slug: 'nonprofit',
    description: 'Nonprofit organizations and charitable causes',
    painPoints: ['Limited budgets', 'Donor acquisition', 'Awareness building', 'Grant visibility'],
    seoNeeds: ['Cause content', 'Donation optimization', 'Event pages', 'Impact stories'],
    keywords: ['nonprofit seo', 'charity marketing', 'ngo seo']
  },
  {
    id: 'media',
    name: 'Media & Publishing',
    slug: 'media',
    description: 'News outlets, publishers, and content platforms',
    painPoints: ['News SEO', 'Subscription conversion', 'Content freshness', 'Discover visibility'],
    seoNeeds: ['News SEO', 'Topic clusters', 'Author authority', 'Archive optimization'],
    keywords: ['media seo', 'publisher seo', 'news seo', 'content marketing']
  },
  {
    id: 'gaming',
    name: 'Gaming',
    slug: 'gaming',
    description: 'Video game developers and gaming platforms',
    painPoints: ['App store visibility', 'Community building', 'Launch timing', 'Streamer relations'],
    seoNeeds: ['Game pages', 'Community content', 'Guide content', 'Update announcements'],
    keywords: ['gaming seo', 'video game marketing', 'game developer seo']
  },
  {
    id: 'crypto',
    name: 'Crypto & Web3',
    slug: 'crypto',
    description: 'Cryptocurrency, blockchain, and Web3 projects',
    painPoints: ['YMYL concerns', 'Trust building', 'Regulatory uncertainty', 'Technical complexity'],
    seoNeeds: ['Educational content', 'Project pages', 'DeFi guides', 'Token information'],
    keywords: ['crypto seo', 'web3 marketing', 'blockchain seo', 'defi marketing']
  },
  {
    id: 'recruitment',
    name: 'Recruitment & HR Tech',
    slug: 'recruitment',
    description: 'Staffing agencies and HR technology platforms',
    painPoints: ['Job board competition', 'Candidate acquisition', 'Employer branding', 'Niche targeting'],
    seoNeeds: ['Job pages', 'Career content', 'Industry guides', 'Salary information'],
    keywords: ['recruitment seo', 'hr tech marketing', 'staffing agency seo']
  },
  {
    id: 'cybersecurity',
    name: 'Cybersecurity',
    slug: 'cybersecurity',
    description: 'Security software and services companies',
    painPoints: ['Technical credibility', 'Threat landscape content', 'Enterprise sales', 'Compliance content'],
    seoNeeds: ['Threat intelligence', 'Product comparisons', 'Compliance guides', 'Technical content'],
    keywords: ['cybersecurity seo', 'infosec marketing', 'security software marketing']
  }
];

export const industryCategories = [
  { id: 'technology', name: 'Technology', industries: ['saas', 'fintech', 'cybersecurity', 'gaming', 'crypto'] },
  { id: 'services', name: 'Professional Services', industries: ['legal', 'professional-services', 'recruitment'] },
  { id: 'retail', name: 'Retail & Consumer', industries: ['ecommerce', 'restaurants', 'fitness', 'travel'] },
  { id: 'healthcare-finance', name: 'Healthcare & Finance', industries: ['healthcare', 'insurance'] },
  { id: 'other', name: 'Other Industries', industries: ['real-estate', 'education', 'manufacturing', 'automotive', 'nonprofit', 'media'] }
];
