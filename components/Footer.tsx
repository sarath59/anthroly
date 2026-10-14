import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { CONTACT_EMAIL, TRANSACTED_LINE } from '@/lib/site';
import { ARTICLES } from '@/lib/learn/articles';
import { EXPERT_APPLY_MAILTO, EXPERT_SERVICES, PILOT_BOOKING_URL } from '@/lib/expert-data';
import { Mark } from './Mark';

const COMPANY_LINKS = [
  { href: '/#sell', label: 'Sell your data' },
  { href: '/#labs', label: 'Data for AI labs' },
  { href: '/#process', label: 'How a deal works' },
  { href: '/#safeguards', label: 'Safeguards' },
  { href: '/#faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
];

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-paper">
      <div className="page-x pb-10 pt-24">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Mark className="h-11 text-paper" label="Anthroly" />
            <p className="mt-6 font-serif text-[2.6rem] leading-[1.02] tracking-[-0.01em] sm:text-5xl">
              The record of how American work gets done,{' '}
              <em className="text-signal">licensed with care.</em>
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-10 inline-flex items-center gap-2 border-b border-paper/30 pb-1 text-lg transition-colors hover:border-signal hover:text-signal"
            >
              {CONTACT_EMAIL}
              <ArrowUpRight size={16} />
            </a>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4 lg:col-span-7">
            <div>
              <p className="eyebrow !text-paper/50">Company</p>
              <ul className="mt-6 space-y-3">
                {COMPANY_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-[15px] text-paper/75 transition-colors hover:text-paper">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow !text-paper/50">Expert data</p>
              <ul className="mt-6 space-y-3">
                <li>
                  <Link href="/expert-data" className="text-[15px] text-paper/75 transition-colors hover:text-paper">
                    Overview
                  </Link>
                </li>
                {EXPERT_SERVICES.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/expert-data#${s.slug}`}
                      className="text-[15px] text-paper/75 transition-colors hover:text-paper"
                    >
                      {s.name}
                    </Link>
                  </li>
                ))}
                <li className="pt-2">
                  <a
                    href={PILOT_BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[15px] text-signal transition-colors hover:text-paper"
                  >
                    Request a pilot
                    <ArrowUpRight size={14} />
                  </a>
                </li>
                <li>
                  <a href={EXPERT_APPLY_MAILTO} className="text-[15px] text-paper/75 transition-colors hover:text-paper">
                    Join as an expert
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-span-2">
              <p className="eyebrow !text-paper/50">Field notes</p>
              <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-1 xl:grid-cols-2">
                {ARTICLES.map((article) => (
                  <li key={article.slug}>
                    <Link
                      href={`/learn/${article.slug}`}
                      className="text-[15px] text-paper/75 transition-colors hover:text-paper"
                    >
                      {article.shortTitle}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div
          aria-hidden
          className="mt-24 flex select-none items-center gap-[3vw] text-paper/[0.07]"
        >
          <Mark className="h-[17vw]" />
          <span className="font-serif text-[19vw] leading-[0.8] tracking-[-0.04em]">Anthroly</span>
        </div>

        <div className="mt-6 flex flex-col gap-4 border-t border-paper/15 pt-8 font-mono text-[11px] uppercase tracking-[0.14em] text-paper/45 md:flex-row md:items-center md:justify-between">
          <span>© {year} Anthroly · {TRANSACTED_LINE}</span>
          <span>Data sourced exclusively from US companies</span>
          <span className="flex gap-6">
            <Link href="/privacy" className="hover:text-paper">Privacy</Link>
            <Link href="/terms" className="hover:text-paper">Terms</Link>
          </span>
        </div>
      </div>
    </footer>
  );
};
