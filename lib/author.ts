import { SITE_URL, absoluteUrl } from './site';

export const AUTHOR_PATH = '/author/sarath-kavuru';

/** Named author used for E-E-A-T on blog, AEO hubs, and Person schema */
export const SITE_AUTHOR = {
  name: 'Sarath Kavuru',
  jobTitle: 'Founder, Anthroly',
  email: 'sharatth@anthroly.com',
  url: absoluteUrl(AUTHOR_PATH),
  sameAs: [
    'https://twitter.com/anthroly',
    'https://linkedin.com/company/anthroly',
  ],
  bio: 'Sarath Kavuru is the founder of Anthroly. He runs a human-led SEO and AEO practice that turns founder expertise into AI-search citations, authority content, and qualified conversations.',
} as const;

export function generatePersonSchema(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: SITE_AUTHOR.name,
    jobTitle: SITE_AUTHOR.jobTitle,
    email: SITE_AUTHOR.email,
    url: SITE_AUTHOR.url,
    description: SITE_AUTHOR.bio,
    worksFor: {
      '@type': 'Organization',
      name: 'Anthroly',
      url: SITE_URL,
    },
    sameAs: [...SITE_AUTHOR.sameAs],
  };
}
