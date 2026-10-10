import type { ReactNode } from 'react';
import { Reveal } from './Reveal';

export function SectionHead({
  index,
  label,
  title,
  intro,
  dark = false,
}: {
  index: string;
  label: string;
  title: ReactNode;
  intro?: ReactNode;
  dark?: boolean;
}) {
  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <Reveal className="lg:col-span-3">
        <p className={`eyebrow flex items-center gap-3 ${dark ? '!text-paper/50' : ''}`}>
          <span className="text-signal">{index}</span>
          <span className={`h-px w-8 ${dark ? 'bg-paper/25' : 'bg-ink/25'}`} />
          {label}
        </p>
      </Reveal>
      <div className="lg:col-span-9">
        <Reveal>
          <h2 className="font-serif text-display-lg text-balance">{title}</h2>
        </Reveal>
        {intro && (
          <Reveal delay={0.08}>
            <p
              className={`mt-7 max-w-2xl text-[19px] leading-[1.6] text-pretty ${
                dark ? 'text-paper/65' : 'text-ink-muted'
              }`}
            >
              {intro}
            </p>
          </Reveal>
        )}
      </div>
    </div>
  );
}
