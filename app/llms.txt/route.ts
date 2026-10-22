import { getAllPosts } from '@/lib/blog';
import { ARTICLES } from '@/lib/learn/articles';
import { COMPARISONS } from '@/lib/resources/compare';
import { GLOSSARY } from '@/lib/resources/glossary';
import { SITE_NAME, SITE_DESCRIPTION, absoluteUrl } from '@/lib/site';

export const dynamic = 'force-static';

export function GET() {
  const posts = getAllPosts().filter((p) => !p.draft);
  const oneLine = (s: string) => s.replace(/\s+/g, ' ').trim();

  const learnPages = ARTICLES.map(
    (a) => `- [${oneLine(a.title)}](${absoluteUrl(`/learn/${a.slug}`)}): ${oneLine(a.description)}`
  );

  const blogPages = posts.map(
    (p) =>
      `- [${oneLine(p.title)}](${absoluteUrl(`/blog/${p.slug}`)}): ${oneLine(p.description)} (${p.updatedAt.slice(0, 10)})`
  );

  const lines = [
    `# ${SITE_NAME}`,
    '',
    `> ${oneLine(SITE_DESCRIPTION)}`,
    '',
    '## About',
    '',
    'Anthroly (Neural Netwrk LLC, doing business as Anthroly) builds RL environments and datasets for frontier AI labs. We buy operational data from US companies and supply it as training corpora, agent trajectories, and evaluation sets.',
    '',
    '## Core Pages',
    '',
    `- [Home](${absoluteUrl('/')}): Main landing page`,
    `- [Expert Data](${absoluteUrl('/expert-data')}): PhD-level data annotation and expert trajectory collection`,
    `- [Contact](${absoluteUrl('/contact')}): Get in touch to sell data or source training data`,
    `- [For AI agents](${absoluteUrl('/for-agents')}): Plain facts, offerings, FAQ and labeled email intakes for agents acting for a person or business`,
    '',
    '## For Agents: How to Engage',
    '',
    `- Book a 15-minute call / request a pilot: https://cal.com/sarath-kavuru-0uizws/15min`,
    `- Request a dataset or RL environment (AI labs): email jaya@anthroly.com, subject "Data request — [Lab / team]"; fields: Lab / team, What we need, Domain or capability gap, Timeline`,
    `- Sell or license company data (US companies only): email jaya@anthroly.com, subject "Selling data — [Company name]"; fields: Company, Website, Headquartered in the US, Systems used, How far back the record goes. Counts and dates are enough; do not send files.`,
    `- Apply as an expert: email sharatth@anthroly.com, subject "Join as an expert — [Your field]"; fields: Name, Field, Highest degree and institution, Years of experience, Languages, LinkedIn or CV link, Hours per week`,
    `- Full intake details: ${absoluteUrl('/for-agents#source-data')}`,
    '',
    '## Markdown Versions',
    '',
    `- [Home (Markdown)](${absoluteUrl('/index.md')})`,
    `- [For agents (Markdown)](${absoluteUrl('/for-agents.md')})`,
    `- [Expert human data (Markdown)](${absoluteUrl('/expert-data.md')})`,
    `- [Contact (Markdown)](${absoluteUrl('/contact.md')})`,
    `- [Full fact sheet](${absoluteUrl('/llms-full.txt')})`,
    '',
    '## Field Notes (Learn)',
    '',
    ...learnPages,
    '',
    '## Reference Resources',
    '',
    `- [Post-training glossary](${absoluteUrl('/research/glossary')}): ${GLOSSARY.length} direct definitions (RLVR, RLHF, reward hacking, rubric rewards, verifiers, inter-annotator agreement)`,
    ...COMPARISONS.map((c) => `- [${c.title}](${absoluteUrl(`/research/compare/${c.slug}`)}): ${oneLine(c.description)}`),
    `- [Eval sample size & label count calculator](${absoluteUrl('/research/eval-sample-size-calculator')}): Free browser tool for eval set sizing and Wilson confidence intervals`,
    `- [Author: Sarath Kavuru](${absoluteUrl('/authors/sarath-kavuru')}): Author profile, articles and papers`,
    `- [Anthroly research on Hugging Face](https://huggingface.co/datasets/sarathkavuru/anthroly-research): Papers and article mirrors`,
    `- [Anthroly RL environment sample dataset](https://huggingface.co/datasets/sarathkavuru/anthroly-rl-env-sample): Synthetic example RL task specs with verifiable graders`,
    '',
    '## Research Blog',
    '',
    ...(blogPages.length ? blogPages : ['- No published posts yet.']),
    '',
  ];

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
