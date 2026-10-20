import { SITE_URL, absoluteUrl } from '@/lib/site';

export const AUTHOR = {
  slug: 'sarath-kavuru',
  name: 'Sarath Kavuru',
  path: '/authors/sarath-kavuru',
  sameAs: ['https://huggingface.co/sarathkavuru', 'https://github.com/sarath59'],
} as const;

export function authorPersonSchema() {
  return {
    '@type': 'Person',
    '@id': `${absoluteUrl(AUTHOR.path)}#person`,
    name: AUTHOR.name,
    url: absoluteUrl(AUTHOR.path),
    sameAs: [...AUTHOR.sameAs],
    worksFor: { '@id': `${SITE_URL}/#organization` },
  };
}
