/**
 * Programmatic SEO Types
 * Core type definitions for scalable, high-quality SEO page generation
 */

// ============================================================================
// PLAYBOOK TYPES
// ============================================================================

export type PlaybookType =
  | 'templates'
  | 'curation'
  | 'conversions'
  | 'comparisons'
  | 'examples'
  | 'locations'
  | 'personas'
  | 'integrations'
  | 'glossary'
  | 'translations'
  | 'directory'
  | 'profiles';

// ============================================================================
// SEO METADATA
// ============================================================================

export interface SEOMetadata {
  title: string;
  metaDescription: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  searchIntent: 'informational' | 'transactional' | 'navigational' | 'commercial';
  canonicalUrl?: string;
}

// ============================================================================
// CONTENT STRUCTURES
// ============================================================================

export interface ContentSection {
  heading: string;
  body: string;
  listItems?: string[];
  codeExample?: string;
  image?: {
    src: string;
    alt: string;
    caption?: string;
  };
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface PageContent {
  h1: string;
  introduction: string;
  sections: ContentSection[];
  faq: FAQ[];
  callToAction: {
    headline: string;
    description: string;
    buttonText: string;
    buttonUrl: string;
  };
}

// ============================================================================
// SCHEMA.ORG STRUCTURED DATA
// ============================================================================

export interface SchemaData {
  type: 'Article' | 'FAQPage' | 'HowTo' | 'Product' | 'Service' | 'Organization' | 'LocalBusiness' | 'SoftwareApplication' | 'ItemList' | 'DefinedTerm';
  structuredData: Record<string, unknown>;
}

// ============================================================================
// INTERNAL LINKING
// ============================================================================

export interface InternalLink {
  url: string;
  anchorText: string;
  context: string; // Why this link is relevant
}

export interface RelatedPage {
  url: string;
  title: string;
  playbook: PlaybookType;
  relevanceScore: number; // 0-100
}

// ============================================================================
// COMPLETE PAGE OUTPUT
// ============================================================================

export interface PSEOPage {
  url: string;
  slug: string;
  playbookType: PlaybookType;
  seo: SEOMetadata;
  content: PageContent;
  schema: SchemaData;
  internalLinks: InternalLink[];
  relatedPages: RelatedPage[];
  dataRequirementsUsed: string[];
  generatedAt: string;
  wordCount: number;
  qualityScore: number; // 0-100
}

// ============================================================================
// VALIDATION RESULT
// ============================================================================

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  metrics: {
    wordCount: number;
    internalLinkCount: number;
    faqCount: number;
    uniquenessScore: number;
  };
}

// ============================================================================
// INPUT DATA STRUCTURES
// ============================================================================

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  parentId?: string;
  subcategories?: string[];
}

export interface Tool {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  features: string[];
  pricing?: string;
  website?: string;
  pros: string[];
  cons: string[];
}

export interface Location {
  id: string;
  city: string;
  state?: string;
  country: string;
  slug: string;
  population?: number;
  timezone?: string;
  localInsights: string[];
}

export interface Persona {
  id: string;
  name: string;
  slug: string;
  title: string;
  industry: string;
  painPoints: string[];
  goals: string[];
  challenges: string[];
  solutions: string[];
}

export interface Integration {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  setupSteps: string[];
  useCases: string[];
  benefits: string[];
}

export interface GlossaryTerm {
  id: string;
  term: string;
  slug: string;
  definition: string;
  technicalExplanation: string;
  relatedTerms: string[];
  examples: string[];
  category: string;
}

export interface Template {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  useCase: string;
  instructions: string[];
  variations: string[];
  downloadUrl?: string;
}

export interface Example {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  analysis: string;
  whyItWorks: string[];
  keyTakeaways: string[];
  sourceUrl?: string;
}

export interface Comparison {
  id: string;
  itemA: string;
  itemB: string;
  slug: string;
  category: string;
  features: {
    feature: string;
    itemAValue: string;
    itemBValue: string;
  }[];
  verdict: string;
  bestFor: {
    itemA: string[];
    itemB: string[];
  };
}

export interface DirectoryListing {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  attributes: Record<string, string>;
  tags: string[];
  rating?: number;
  verified: boolean;
}

export interface Profile {
  id: string;
  name: string;
  slug: string;
  type: 'company' | 'person' | 'product';
  description: string;
  facts: Record<string, string>;
  milestones: { date: string; event: string }[];
  insights: string[];
}

// ============================================================================
// MASTER INPUT DATASET
// ============================================================================

export interface PSEODataset {
  categories: Category[];
  tools: Tool[];
  locations: Location[];
  personas: Persona[];
  integrations: Integration[];
  glossaryTerms: GlossaryTerm[];
  templates: Template[];
  examples: Example[];
  comparisons: Comparison[];
  directoryListings: DirectoryListing[];
  profiles: Profile[];
}

// ============================================================================
// GENERATION CONFIG
// ============================================================================

export interface GenerationConfig {
  minWordCount: {
    informational: number;
    utility: number;
  };
  minFAQs: number;
  minInternalLinks: number;
  minRelatedPages: number;
  qualityThreshold: number;
  batchSize: number;
}

export const DEFAULT_GENERATION_CONFIG: GenerationConfig = {
  minWordCount: {
    informational: 900,
    utility: 600,
  },
  minFAQs: 3,
  minInternalLinks: 5,
  minRelatedPages: 2,
  qualityThreshold: 70,
  batchSize: 100,
};
