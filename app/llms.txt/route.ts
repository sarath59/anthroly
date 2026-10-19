import { getAllPosts } from '@/lib/blog';
import { ARTICLES } from '@/lib/learn/articles';
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
    '',
    '## Field Notes (Learn)',
    '',
    ...learnPages,
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
