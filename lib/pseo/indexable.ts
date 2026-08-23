/**
 * Single source of truth for indexable pSEO URLs.
 *
 * History: the site once listed ~35k thin three-ways. Those were
 * "Crawled – currently not indexed", then two-ways were cut to APAC-only
 * (~7k → ~3k sitemap URLs). This inventory restores 10k+ pages that:
 * - already have unique city / industry / persona data
 * - are prebuilt (no cold ISR 404s)
 * - stay well below the old doorway-page explosion
 */

import { seoGlossaryTerms } from './data/seo-glossary';
import { targetPersonas } from './data/personas';
import { seoLocations } from './data/locations';
import { seoIntegrations } from './data/integrations';
import { seoTools } from './data/tools';
import { industries } from './data/industries';
import { useCases } from './data/use-cases';
import { answerEngines } from './data/answer-engines';
import { aeoTopics } from './data/aeo-topics';
import { blogPosts } from './data/blog-posts';
import {
  apacCountries,
  apacTopics,
  APAC_CITY_SLUGS,
  APAC_PRIORITY_INDUSTRY_SLUGS,
  APAC_PRIORITY_PERSONA_SLUGS,
} from './data/apac-markets';
import { FREE_TOOLS } from '../data/free-tools';
import { allCustomerStories } from '../customers';
import { getAllCustomerClusterPaths } from '../customer-clusters';

/** Deduped locations — later city blocks reused slugs (phoenix, seattle, …). */
export function uniqueSeoLocations() {
  const seen = new Set<string>();
  return seoLocations.filter((location) => {
    if (seen.has(location.slug)) return false;
    seen.add(location.slug);
    return true;
  });
}

/**
 * Commercial hubs with real search demand — used for indexable three-ways.
 * APAC cities stay first; global hubs fill Google + LLM commercial queries.
 */
export const INDEXABLE_THREE_WAY_CITIES = [
  ...APAC_CITY_SLUGS,
  'san-francisco',
  'new-york',
  'los-angeles',
  'london',
  'austin',
  'seattle',
  'chicago',
  'boston',
  'toronto',
  'dubai',
  'bangalore',
  'tokyo',
] as const;

const THREE_WAY_CITY_SET = new Set<string>(INDEXABLE_THREE_WAY_CITIES);
const THREE_WAY_INDUSTRY_SET = new Set<string>(APAC_PRIORITY_INDUSTRY_SLUGS);
const THREE_WAY_PERSONA_SET = new Set<string>(APAC_PRIORITY_PERSONA_SLUGS);

export function isIndexablePersonaThreeWay(
  personaSlug: string,
  industrySlug: string,
  locationSlug: string
): boolean {
  return (
    THREE_WAY_PERSONA_SET.has(personaSlug) &&
    THREE_WAY_INDUSTRY_SET.has(industrySlug) &&
    THREE_WAY_CITY_SET.has(locationSlug)
  );
}

export function getIndexablePersonaLocationParams() {
  const locations = uniqueSeoLocations();
  const params: { persona: string; location: string }[] = [];
  for (const persona of targetPersonas) {
    for (const location of locations) {
      params.push({ persona: persona.slug, location: location.slug });
    }
  }
  return params;
}

export function getIndexablePersonaIndustryParams() {
  const params: { persona: string; industry: string }[] = [];
  for (const persona of targetPersonas) {
    for (const industry of industries) {
      params.push({ persona: persona.slug, industry: industry.slug });
    }
  }
  return params;
}

export function getIndexableIndustryLocationParams() {
  const locations = uniqueSeoLocations();
  const params: { slug: string; location: string }[] = [];
  for (const industry of industries) {
    for (const location of locations) {
      params.push({ slug: industry.slug, location: location.slug });
    }
  }
  return params;
}

export function getIndexableGlossaryIndustryParams() {
  const params: { slug: string; industry: string }[] = [];
  for (const term of seoGlossaryTerms) {
    for (const industry of industries) {
      params.push({ slug: term.slug, industry: industry.slug });
    }
  }
  return params;
}

export function getIndexableUseCaseIndustryParams() {
  const params: { slug: string; industry: string }[] = [];
  for (const useCase of useCases) {
    for (const industry of industries) {
      params.push({ slug: useCase.slug, industry: industry.slug });
    }
  }
  return params;
}

export function getIndexableIntegrationIndustryParams() {
  const params: { slug: string; industry: string }[] = [];
  for (const integration of seoIntegrations) {
    for (const industry of industries) {
      params.push({ slug: integration.slug, industry: industry.slug });
    }
  }
  return params;
}

export function getIndexablePersonaThreeWayParams() {
  const knownCities = new Set(uniqueSeoLocations().map((l) => l.slug));
  const params: { persona: string; industry: string; location: string }[] = [];
  for (const persona of APAC_PRIORITY_PERSONA_SLUGS) {
    for (const industry of APAC_PRIORITY_INDUSTRY_SLUGS) {
      for (const location of INDEXABLE_THREE_WAY_CITIES) {
        if (!knownCities.has(location)) continue;
        params.push({ persona, industry, location });
      }
    }
  }
  return params;
}

export function getIndexableAeoTopicEngineParams() {
  const params: { slug: string; engine: string }[] = [];
  for (const topic of aeoTopics) {
    for (const engine of answerEngines) {
      params.push({ slug: topic.slug, engine: engine.slug });
    }
  }
  return params;
}

function toolComparisonCount() {
  let count = 0;
  for (let i = 0; i < seoTools.length; i++) {
    for (let j = i + 1; j < seoTools.length; j++) {
      if (seoTools[i].category === seoTools[j].category) count += 1;
    }
  }
  return count;
}

const INDEX_PAGES = 23;

export function getIndexableCounts() {
  const locations = uniqueSeoLocations().length;
  const personas = targetPersonas.length;
  const industryCount = industries.length;
  const glossary = seoGlossaryTerms.length;
  const useCaseCount = useCases.length;
  const integrations = seoIntegrations.length;
  const aeoTwoWays = aeoTopics.length * answerEngines.length;
  const markets = apacCountries.length * (1 + apacTopics.length);
  const personaLocation = personas * locations;
  const personaIndustry = personas * industryCount;
  const industryLocation = industryCount * locations;
  const glossaryIndustry = glossary * industryCount;
  const useCaseIndustry = useCaseCount * industryCount;
  const integrationIndustry = integrations * industryCount;
  const threeWays = getIndexablePersonaThreeWayParams().length;

  const base =
    INDEX_PAGES +
    markets +
    glossary +
    blogPosts.length +
    allCustomerStories.length +
    getAllCustomerClusterPaths().length +
    answerEngines.length +
    aeoTopics.length +
    aeoTwoWays +
    personas +
    locations +
    industryCount +
    useCaseCount +
    integrations +
    FREE_TOOLS.length +
    toolComparisonCount();

  const twoWays =
    personaLocation +
    personaIndustry +
    industryLocation +
    glossaryIndustry +
    useCaseIndustry +
    integrationIndustry;

  return {
    locations,
    personas,
    industries: industryCount,
    glossary,
    useCases: useCaseCount,
    integrations,
    blogs: blogPosts.length,
    aeoTwoWays,
    markets,
    personaLocation,
    personaIndustry,
    industryLocation,
    glossaryIndustry,
    useCaseIndustry,
    integrationIndustry,
    threeWays,
    base,
    twoWays,
    grandTotal: base + twoWays + threeWays,
  };
}
