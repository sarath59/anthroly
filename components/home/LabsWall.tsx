import { AI_LABS, logoUrl } from '@/lib/site';
import { Reveal } from './Reveal';

export function LabsWall() {
  return (
    <section id="customers" className="border-y border-rule bg-paper-card">
      <div className="page-x py-20 lg:py-24">
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <p className="eyebrow">Who buys from us</p>
            <h2 className="mt-5 font-serif text-display-md text-balance">
              We sell to every major AI lab.
            </h2>
          </Reveal>
          <Reveal delay={0.08} className="lg:col-span-5">
            <p className="text-[17px] leading-[1.6] text-ink-muted text-pretty">
              Data we&apos;ve licensed sits in the training and evaluation pipelines of the labs
              below. Lab-specific terms stay confidential, as they should.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.12}>
          <ul className="mt-14 grid grid-cols-2 border-l border-t border-rule sm:grid-cols-3 lg:grid-cols-5">
            {AI_LABS.map((lab) => (
              <li
                key={lab.domain}
                className="group flex h-32 flex-col items-center justify-center gap-3 border-b border-r border-rule transition-colors duration-300 hover:bg-paper"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={logoUrl(lab.domain)}
                  alt={`${lab.name} logo`}
                  width={36}
                  height={36}
                  loading="lazy"
                  decoding="async"
                  className="h-9 w-9 rounded-md object-contain opacity-80 mix-blend-multiply grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0"
                />
                <span className="text-[13px] font-medium tracking-tight text-ink-soft">{lab.name}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
