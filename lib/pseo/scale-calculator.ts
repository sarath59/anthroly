/**
 * pSEO Scale Calculator
 * Calculate total pages from all combinations
 */

import { seoGlossaryTerms } from './data/seo-glossary';
import { seoTools } from './data/tools';
import { targetPersonas } from './data/personas';
import { seoLocations } from './data/locations';
import { seoIntegrations } from './data/integrations';
import { industries } from './data/industries';
import { useCases } from './data/use-cases';
import { languages } from './data/languages';
import { seoServices } from './data/services';

export interface PageCountBreakdown {
  // Base counts
  glossary: number;
  personas: number;
  locations: number;
  integrations: number;
  industries: number;
  useCases: number;
  languages: number;
  services: number;
  toolComparisons: number;
  
  // Two-way combinations
  personaLocation: number;
  industryLocation: number;
  glossaryIndustry: number;
  useCaseIndustry: number;
  integrationIndustry: number;
  serviceIndustry: number;
  serviceLocation: number;
  languageIndustry: number;
  personaIndustry: number;
  
  // Three-way combinations (for massive scale)
  personaIndustryLocation: number;
  serviceIndustryLocation: number;
  glossaryIndustryLocation: number;
  
  // Totals
  baseTotal: number;
  twoWayTotal: number;
  threeWayTotal: number;
  grandTotal: number;
}

export function calculatePageCount(): PageCountBreakdown {
  const glossary = seoGlossaryTerms.length;
  const personas = targetPersonas.length;
  const locations = seoLocations.length;
  const integrations = seoIntegrations.length;
  const industryCount = industries.length;
  const useCaseCount = useCases.length;
  const languageCount = languages.length;
  const serviceCount = seoServices.length;
  
  // Count tool comparisons (same category pairs)
  let toolComparisons = 0;
  for (let i = 0; i < seoTools.length; i++) {
    for (let j = i + 1; j < seoTools.length; j++) {
      if (seoTools[i].category === seoTools[j].category) {
        toolComparisons++;
      }
    }
  }
  
  // Base pages
  const baseTotal = glossary + personas + locations + integrations + industryCount + useCaseCount + languageCount + serviceCount + toolComparisons;
  
  // Two-way combinations
  const personaLocation = personas * locations;
  const industryLocation = industryCount * locations;
  const glossaryIndustry = glossary * industryCount;
  const useCaseIndustry = useCaseCount * industryCount;
  const integrationIndustry = integrations * industryCount;
  const serviceIndustry = serviceCount * industryCount;
  const serviceLocation = serviceCount * locations;
  const languageIndustry = languageCount * industryCount;
  const personaIndustry = personas * industryCount;
  
  const twoWayTotal = personaLocation + industryLocation + glossaryIndustry + useCaseIndustry + integrationIndustry + serviceIndustry + serviceLocation + languageIndustry + personaIndustry;
  
  // Three-way combinations (selective - only high-value combinations)
  // We don't want to create ALL possible 3-way combos, just the most valuable
  const personaIndustryLocation = personas * industryCount * locations;
  const serviceIndustryLocation = serviceCount * industryCount * locations;
  const glossaryIndustryLocation = Math.floor(glossary * industryCount * locations * 0.3); // Only 30% of high-value terms
  
  const threeWayTotal = personaIndustryLocation + serviceIndustryLocation + glossaryIndustryLocation;
  
  const grandTotal = baseTotal + twoWayTotal + threeWayTotal;
  
  return {
    glossary,
    personas,
    locations,
    integrations,
    industries: industryCount,
    useCases: useCaseCount,
    languages: languageCount,
    services: serviceCount,
    toolComparisons,
    
    personaLocation,
    industryLocation,
    glossaryIndustry,
    useCaseIndustry,
    integrationIndustry,
    serviceIndustry,
    serviceLocation,
    languageIndustry,
    personaIndustry,
    
    personaIndustryLocation,
    serviceIndustryLocation,
    glossaryIndustryLocation,
    
    baseTotal,
    twoWayTotal,
    threeWayTotal,
    grandTotal,
  };
}

export function printPageCountReport(): void {
  const counts = calculatePageCount();
  
  console.log('='.repeat(60));
  console.log('ANTHROLY pSEO PAGE COUNT REPORT');
  console.log('='.repeat(60));
  console.log('');
  console.log('BASE PAGES:');
  console.log(`  Glossary terms:        ${counts.glossary}`);
  console.log(`  Personas:              ${counts.personas}`);
  console.log(`  Locations:             ${counts.locations}`);
  console.log(`  Integrations:          ${counts.integrations}`);
  console.log(`  Industries:            ${counts.industries}`);
  console.log(`  Use Cases:             ${counts.useCases}`);
  console.log(`  Languages:             ${counts.languages}`);
  console.log(`  Services:              ${counts.services}`);
  console.log(`  Tool Comparisons:      ${counts.toolComparisons}`);
  console.log(`  ${'─'.repeat(30)}`);
  console.log(`  Base Total:            ${counts.baseTotal.toLocaleString()}`);
  console.log('');
  console.log('TWO-WAY COMBINATIONS:');
  console.log(`  Persona × Location:    ${counts.personaLocation.toLocaleString()} (${counts.personas}×${counts.locations})`);
  console.log(`  Industry × Location:   ${counts.industryLocation.toLocaleString()} (${counts.industries}×${counts.locations})`);
  console.log(`  Glossary × Industry:   ${counts.glossaryIndustry.toLocaleString()} (${counts.glossary}×${counts.industries})`);
  console.log(`  UseCase × Industry:    ${counts.useCaseIndustry.toLocaleString()} (${counts.useCases}×${counts.industries})`);
  console.log(`  Integration × Industry:${counts.integrationIndustry.toLocaleString()} (${counts.integrations}×${counts.industries})`);
  console.log(`  Service × Industry:    ${counts.serviceIndustry.toLocaleString()} (${counts.services}×${counts.industries})`);
  console.log(`  Service × Location:    ${counts.serviceLocation.toLocaleString()} (${counts.services}×${counts.locations})`);
  console.log(`  Language × Industry:   ${counts.languageIndustry.toLocaleString()} (${counts.languages}×${counts.industries})`);
  console.log(`  Persona × Industry:    ${counts.personaIndustry.toLocaleString()} (${counts.personas}×${counts.industries})`);
  console.log(`  ${'─'.repeat(30)}`);
  console.log(`  Two-Way Total:         ${counts.twoWayTotal.toLocaleString()}`);
  console.log('');
  console.log('THREE-WAY COMBINATIONS:');
  console.log(`  Persona×Industry×Location:  ${counts.personaIndustryLocation.toLocaleString()} (${counts.personas}×${counts.industries}×${counts.locations})`);
  console.log(`  Service×Industry×Location:  ${counts.serviceIndustryLocation.toLocaleString()} (${counts.services}×${counts.industries}×${counts.locations})`);
  console.log(`  Glossary×Industry×Location: ${counts.glossaryIndustryLocation.toLocaleString()} (30% of ${counts.glossary}×${counts.industries}×${counts.locations})`);
  console.log(`  ${'─'.repeat(30)}`);
  console.log(`  Three-Way Total:       ${counts.threeWayTotal.toLocaleString()}`);
  console.log('');
  console.log('='.repeat(60));
  console.log(`GRAND TOTAL:             ${counts.grandTotal.toLocaleString()} PAGES`);
  console.log('='.repeat(60));
}

// Quick formula to hit 150K with expanded data:
export function calculateScalePath() {
  // Current data sizes
  const current = calculatePageCount();
  
  // To hit 150K, we need:
  // Option 1: Expand all dimensions moderately
  // Option 2: Add more high-value 3-way combinations
  // Option 3: Add new dimension types
  
  console.log('\n\n');
  console.log('='.repeat(60));
  console.log('PATH TO 150,000 PAGES');
  console.log('='.repeat(60));
  console.log('');
  console.log(`Current total: ${current.grandTotal.toLocaleString()}`);
  console.log(`Gap to 150K: ${(150000 - current.grandTotal).toLocaleString()}`);
  console.log('');
  
  // Calculate what's needed
  // If we expand:
  // - Locations to 200 cities
  // - Industries to 50
  // - Services to 30
  // - Add service×industry×location
  
  const expanded = {
    locations: 200,
    industries: 50,
    services: 30,
    personas: 15,
    glossary: 100,
  };
  
  const expandedBase = expanded.glossary + expanded.personas + expanded.locations + current.integrations + expanded.industries + current.useCases + current.languages + expanded.services + current.toolComparisons;
  
  const expandedTwoWay = 
    (expanded.personas * expanded.locations) +
    (expanded.industries * expanded.locations) +
    (expanded.glossary * expanded.industries) +
    (current.useCases * expanded.industries) +
    (current.integrations * expanded.industries) +
    (expanded.services * expanded.industries) +
    (expanded.services * expanded.locations) +
    (current.languages * expanded.industries) +
    (expanded.personas * expanded.industries);
  
  const expandedThreeWay = 
    (expanded.personas * expanded.industries * expanded.locations) +
    (expanded.services * expanded.industries * expanded.locations) +
    Math.floor(expanded.glossary * expanded.industries * expanded.locations * 0.3);
  
  const expandedTotal = expandedBase + expandedTwoWay + expandedThreeWay;
  
  console.log('EXPANDED DATA SCENARIO:');
  console.log(`  Locations: ${current.locations} → ${expanded.locations}`);
  console.log(`  Industries: ${current.industries} → ${expanded.industries}`);
  console.log(`  Services: ${current.services} → ${expanded.services}`);
  console.log(`  Personas: ${current.personas} → ${expanded.personas}`);
  console.log(`  Glossary: ${current.glossary} → ${expanded.glossary}`);
  console.log('');
  console.log(`  Base pages: ${expandedBase.toLocaleString()}`);
  console.log(`  Two-way combos: ${expandedTwoWay.toLocaleString()}`);
  console.log(`  Three-way combos: ${expandedThreeWay.toLocaleString()}`);
  console.log('');
  console.log(`  EXPANDED TOTAL: ${expandedTotal.toLocaleString()} PAGES`);
  console.log('='.repeat(60));
}
