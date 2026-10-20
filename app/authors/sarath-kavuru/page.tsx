import type { Metadata } from 'next';
import Link from 'next/link';
import { getPostSummaries } from '@/lib/blog';
import { PageHead, ResourceNav } from '@/components/resources/PageHead';
import { absoluteUrl } from '@/lib/site';
import { combineSchemas, generateBreadcrumbSchema } from '@/lib/schema';
import { AUTHOR, authorPersonSchema } from '@/lib/resources/author';

export const dynamic = 'force-static';

const DESC = 'Sarath Kavuru leads Anthroly, which builds RL environments and datasets for AI labs. Research notes and papers on reward hacking, RL environments, and post-training data.';

export const metadata: Metadata = {
  title: 'Sarath Kavuru',
  description: DESC,
  alternates: { canonical: absoluteUrl(AUTHOR.path) },
  openGraph: { type: 'profile', url: absoluteUrl(AUTHOR.path), title: 'Sarath Kavuru · Anthroly', description: DESC },
};

const PAPERS = [
  {
    title: 'Specification Gaps and Verifier Failures: A Survey and Practitioner Framework for Reward Hacking in Rubric-Based Reinforcement Learning',
    url: 'https://huggingface.co/datasets/sarathkavuru/anthroly-research/tree/main/papers/reward-hacking-rubric-rl',
  },
];

export default function AuthorPage() {
  const posts = getPostSummaries().filter((p) => p.author.name === AUTHOR.name);
  const page = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    url: absoluteUrl(AUTHOR.path),
    mainEntity: authorPersonSchema(),
  };
  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: combineSchemas(page, generateBreadcrumbSchema([{ name: 'Home', url: '/' }, { name: AUTHOR.name, url: AUTHOR.path }])),
        }}
      />
      <PageHead eyebrow="Author" title={AUTHOR.name} lede={DESC} />
      <div className="page-x border-t border-rule">
        <div className="mx-auto max-w-3xl py-16 text-[17px] leading-[1.7]">
          <h2 className="font-serif text-[2rem]">Profiles</h2>
          <ul className="mt-4 space-y-2">
            {AUTHOR.sameAs.map((u) => (
              <li key={u}><a href={u} rel="me noopener" className="underline underline-offset-4">{u.replace('https://', '')}</a></li>
            ))}
          </ul>
          <h2 className="mt-14 font-serif text-[2rem]">Articles</h2>
          <ul className="mt-4 space-y-3">
            {posts.map((p) => (
              <li key={p.slug}><Link href={`/blog/${p.slug}`} className="underline underline-offset-4">{p.title}</Link></li>
            ))}
          </ul>
          <h2 className="mt-14 font-serif text-[2rem]">Papers</h2>
          <ul className="mt-4 space-y-3">
            {PAPERS.map((p) => (
              <li key={p.url}><a href={p.url} rel="noopener" className="underline underline-offset-4">{p.title}</a> (preprint, Hugging Face)</li>
            ))}
          </ul>
          <ResourceNav />
        </div>
      </div>
    </article>
  );
}
