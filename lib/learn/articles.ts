import type { Article } from './types';
import { sellCompanyData } from './posts/sell-company-data';
import { operationalData } from './posts/operational-data';
import { dataWorth } from './posts/data-worth';
import { licensingVsSelling } from './posts/licensing-vs-selling';
import { dataBroker } from './posts/data-broker';
import { rlEnvironments } from './posts/rl-environments';
import { agentTrajectories } from './posts/agent-trajectories';
import { rlhfPreferenceData } from './posts/rlhf-preference-data';
import { anonymization } from './posts/anonymization';
import { evaluationData } from './posts/evaluation-data';

export type { Article };

export const ARTICLES: Article[] = [
  sellCompanyData,
  operationalData,
  dataWorth,
  licensingVsSelling,
  dataBroker,
  rlEnvironments,
  agentTrajectories,
  rlhfPreferenceData,
  anonymization,
  evaluationData,
];

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

export function relatedArticles(slug: string, count = 3): Article[] {
  const current = getArticle(slug);
  const others = ARTICLES.filter((a) => a.slug !== slug);
  const sameCategory = others.filter((a) => a.category === current?.category);
  const rest = others.filter((a) => a.category !== current?.category);
  return [...sameCategory, ...rest].slice(0, count);
}
