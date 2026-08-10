import { SITE_URL, absoluteUrl } from './site';

/** Named author used for E-E-A-T on blog, AEO hubs, and Person schema */
export const SITE_AUTHOR = {
  name: 'Sarath Kavuru',
  jobTitle: 'Founder, Anthroly',
  email: 'sharatth@anthroly.com',
  url: absoluteUrl('/aeo'),
  sameAs: [
    'https://cal.com/sarath-kavuru-0uizws/30min',
    'https://twitter.com/anthroly',
    'https://linkedin.com/company/anthroly',
  ],
  bio: 'Sarath Kavuru is the founder of Anthroly, a human-led SEO and AEO company focused on high-DR backlinks, content, and getting brands cited in Google and AI answer engines.',
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
