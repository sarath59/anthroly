/**
 * Unique, extractable facts for pSEO pages.
 * Interpolates existing TypeScript datasets — does not invent stats or cut URLs.
 */

import {
  BOOK_CALL_URL,
  EXECUTION_SUMMARY,
  GROWTH_PILLARS,
  OFFER_ONE_LINER,
  PRIMARY_CTA_LABEL,
  SYSTEM_NAME,
} from '../site';
import type { ContentSection, ContentTable, Location, Persona } from './types';
import type { Industry } from './data/industries';

export { OFFER_ONE_LINER, EXECUTION_SUMMARY };

export function formatPopulation(n?: number): string {
  if (!n || n <= 0) return 'Not published for this city record';
  return n.toLocaleString('en-US');
}

export function locationLabel(location: Location): string {
  return location.state
    ? `${location.city}, ${location.state}`
    : `${location.city}, ${location.country}`;
}

export function pricingAnswer(context: string): string {
  return `${OFFER_ONE_LINER} ${context}`;
}

export function commercialCta(headline: string, description: string) {
  return {
    headline,
    description,
    buttonText: PRIMARY_CTA_LABEL,
    buttonUrl: BOOK_CALL_URL,
  };
}

export function pillarListItems(): string[] {
  return GROWTH_PILLARS.map(
    (pillar) => `**${pillar.name} — ${pillar.mechanism}**: ${pillar.sell}`
  );
}

export function howAnthrolyServesBody(extraLines: string[]): string {
  return [
    `**${SYSTEM_NAME}**: ${EXECUTION_SUMMARY}`,
    ...pillarListItems(),
    ...extraLines,
  ].join('\n');
}

export function locationFactsTable(location: Location): ContentTable {
  const rows: string[][] = [
    ['City', location.city],
    ['Country', location.country],
  ];
  if (location.state) {
    rows.push(['Region / state', location.state]);
  }
  rows.push(['Population (city proper)', formatPopulation(location.population)]);
  rows.push([
    'Business timezone',
    location.timezone ? location.timezone.replace(/_/g, ' ') : 'Not published for this city record',
  ]);
  location.localInsights.forEach((insight, index) => {
    rows.push([`Local market fact ${index + 1}`, insight]);
  });
  return {
    caption: `${location.city} market facts used on this page`,
    headers: ['Fact', 'Detail'],
    rows,
  };
}

export function locationMarketSection(location: Location): ContentSection {
  return {
    heading: `${location.city} market facts (unique to this URL)`,
    body: `${locationLabel(location)} has its own demand pattern. These facts are taken from this city’s dataset so Google and answer engines can extract local evidence instead of a national template with the city name swapped in.`,
    table: locationFactsTable(location),
  };
}

export function industryKeywordTable(industry: Industry, city?: string): ContentTable {
  return {
    caption: city
      ? `${industry.name} query clusters in ${city}`
      : `${industry.name} query clusters this page covers`,
    headers: ['Query cluster', 'SEO / AEO need', 'Industry pressure'],
    rows: industry.keywords.map((keyword, index) => [
      city ? `${keyword} ${city}` : keyword,
      industry.seoNeeds[index] || industry.seoNeeds[0] || `${industry.name} content`,
      industry.painPoints[index] || industry.painPoints[0] || industry.description,
    ]),
  };
}

export function personaRoleTable(persona: Persona): ContentTable {
  const rows: string[][] = [];
  persona.painPoints.forEach((point, index) => {
    rows.push([
      'Role pressure',
      point,
      persona.goals[index] || persona.goals[0] || `Outcome for ${persona.title}s`,
    ]);
  });
  persona.challenges.slice(0, 3).forEach((challenge, index) => {
    rows.push([
      'Execution gap',
      challenge,
      persona.solutions[index] || persona.solutions[0] || 'Human-led execution',
    ]);
  });
  return {
    caption: `What ${persona.name}s actually need from search`,
    headers: ['Layer', 'Pressure', 'What this page is built to support'],
    rows,
  };
}
