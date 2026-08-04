/**
 * pSEO Module Entry Point
 * Export all pSEO utilities, data, and generators
 */

// Types
export * from './types';

// Data
export { seoGlossaryTerms, glossaryCategories } from './data/seo-glossary';
export { seoTools, toolCategories } from './data/tools';
export { targetPersonas, personaCategories } from './data/personas';
export { seoLocations, locationRegions } from './data/locations';
export { seoIntegrations, integrationCategories } from './data/integrations';
export { industries, industryCategories } from './data/industries';
export { useCases } from './data/use-cases';
export { answerEngines, anthropicClaudeEngines, chatgptEngines, getAnswerEngine } from './data/answer-engines';
export type { AnswerEngine } from './data/answer-engines';
export { aeoTopics, getAeoTopic } from './data/aeo-topics';
export type { AeoTopic } from './data/aeo-topics';
export { 
  blogPosts, 
  blogCategories, 
  getBlogPostBySlug, 
  getBlogPostsByCategory, 
  getBlogPostsByLocation,
  getRelatedBlogPosts,
  getAllBlogTags 
} from './data/blog-posts';

// Generator
export {
  generateGlossaryPage,
  generatePersonaPage,
  generateLocationPage,
  generateIntegrationPage,
  generateToolComparisonPage,
  getExistingRelatedTerms,
  validatePage,
  countWords,
  isSlugUnique,
  registerSlug,
  isPrimaryKeywordUnique,
  registerPrimaryKeyword,
  resetGenerationState,
} from './generator';

// Combinatorial Generators
export {
  generateAnswerEnginePage,
  generateAeoTopicPage,
  generateAeoTopicEnginePage,
  getAeoScaleCounts,
} from './aeo-generators';

export {
  generatePersonaLocationPage,
  generatePersonaIndustryPage,
  generateIndustryLocationPage,
  generateGlossaryIndustryPage,
  generateUseCaseIndustryPage,
  generateToolComparisonIndustryPage,
  generateIntegrationIndustryPage,
  generatePersonaIndustryLocationPage,
  generateGlossaryIndustryLocationPage,
  generateUseCaseIndustryLocationPage,
  getCombinationCounts,
  getAllPersonaLocationSlugs,
  getAllPersonaIndustrySlugs,
  getAllIndustryLocationSlugs,
  getAllGlossaryIndustrySlugs,
  getAllUseCaseIndustrySlugs,
  getAllPersonaIndustryLocationSlugs,
} from './combinations';

// Additional Data
export { languages, languageRegions } from './data/languages';
export { seoServices, serviceCategories } from './data/services';

// Schema
export {
  generateFAQSchema,
  generateBreadcrumbSchema,
  generateOrganizationSchema,
  generateWebSiteSchema,
  generateArticleSchema,
  generateServiceSchema,
  generateHowToSchema,
  generateDefinedTermSchema,
  generateItemListSchema,
  generateSoftwareSchema,
  combineSchemas,
  generatePageStructuredData,
} from './schema';

// Helper function to get all static paths for build time
export function getAllGlossaryPaths(): string[] {
  const { seoGlossaryTerms } = require('./data/seo-glossary');
  return seoGlossaryTerms.map((term: { slug: string }) => term.slug);
}

export function getAllPersonaPaths(): string[] {
  const { targetPersonas } = require('./data/personas');
  return targetPersonas.map((persona: { slug: string }) => persona.slug);
}

export function getAllLocationPaths(): string[] {
  const { seoLocations } = require('./data/locations');
  return seoLocations.map((location: { slug: string }) => location.slug);
}

export function getAllIntegrationPaths(): string[] {
  const { seoIntegrations } = require('./data/integrations');
  return seoIntegrations.map((integration: { slug: string }) => integration.slug);
}

export function getAllComparisonPaths(): string[] {
  const { seoTools } = require('./data/tools');
  const paths: string[] = [];
  
  // Generate comparison paths for tool combinations
  for (let i = 0; i < seoTools.length; i++) {
    for (let j = i + 1; j < seoTools.length; j++) {
      // Only compare tools in similar categories
      if (seoTools[i].category === seoTools[j].category) {
        paths.push(`${seoTools[i].slug}-vs-${seoTools[j].slug}`);
      }
    }
  }
  
  return paths;
}
