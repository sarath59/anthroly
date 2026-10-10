import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { ARTICLES } from '@/lib/learn/articles';
import { Reveal } from './Reveal';

const FEATURED = ['sell-company-data-to-ai-labs', 'rl-environments-explained', 'how-much-is-company-data-worth'];

export function LearnTeaser() {
  const featured = FEATURED.map((slug) => ARTICLES.find((a) => a.slug === slug)!).filter(Boolean);

  return (
    <section id="learn" className="border-t border-rule bg-paper-deep">
      <div className="page-x py-24 lg:py-32">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <Reveal>
            <p className="eyebrow">Field notes</p>
            <h2 className="mt-5 font-serif text-display-md">Plain answers about a young market.</h2>
          </Reveal>
          <Reveal delay={0.06}>
            <Link href="/learn" className="btn-ghost">
              All ten guides
              <ArrowUpRight size={16} />
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {featured.map((a, i) => (
            <Reveal key={a.slug} delay={i * 0.06} className="h-full">
              <Link
                href={`/learn/${a.slug}`}
                className="group flex h-full flex-col rounded-[6px] border border-rule bg-paper p-8 transition-all duration-500 hover:-translate-y-1 hover:border-ink/30 hover:shadow-[0_24px_48px_-28px_rgba(21,20,15,0.4)]"
              >
                <div className="flex items-center justify-between">
                  <span className="eyebrow">{a.category}</span>
                  <span className="font-mono text-[11px] text-ink-faint">{a.readMinutes} min</span>
                </div>
                <h3 className="mt-10 font-serif text-[1.9rem] leading-[1.1] text-balance">{a.title}</h3>
                <p className="mt-4 text-[15px] leading-[1.6] text-ink-muted">{a.dek}</p>
                <span className="mt-auto flex items-center gap-2 pt-8 text-[14px] font-medium">
                  Read
                  <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
