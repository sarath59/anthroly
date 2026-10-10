import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { CONTACT_EMAIL } from '@/lib/site';
import { Reveal } from './Reveal';
import { Mark } from '../Mark';

export function FinalCTA() {
  return (
    <section id="start" className="grain border-t border-rule">
      <div className="page-x py-28 text-center lg:py-44">
        <Reveal>
          <div className="group mx-auto mb-12 flex h-24 w-24 items-center justify-center rounded-full border border-rule bg-paper-card shadow-[0_20px_40px_-24px_rgba(21,20,15,0.45)]">
            <Mark className="h-11 transition-[color,transform] duration-1000 ease-out group-hover:rotate-[-120deg] group-hover:text-signal" />
          </div>
          <p className="eyebrow">Two minutes to start</p>
          <h2 className="mx-auto mt-8 max-w-5xl font-serif text-display-lg text-balance">
            Find out what your company&apos;s record is <em className="text-signal">worth.</em>
          </h2>
          <p className="mx-auto mt-8 max-w-xl text-[19px] leading-[1.6] text-ink-muted">
            A few short questions, then a call with the people who make the offer. No fee, no
            commitment, and nothing leaves your systems.
          </p>
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            <Link href="/contact?side=seller" className="btn-ink">
              Sell your data
              <ArrowRight size={16} />
            </Link>
            <Link href="/contact?side=lab" className="btn-ghost">
              I&apos;m buying for an AI lab
            </Link>
          </div>
          <p className="mt-10 font-mono text-[12px] text-ink-muted">
            or write to{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-ink underline decoration-signal underline-offset-4">
              {CONTACT_EMAIL}
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
