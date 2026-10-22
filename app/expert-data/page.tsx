import type { Metadata } from 'next';
import { ArrowUpRight, Ban, Eye, FileSignature, KeyRound, Lock, Mail, Plus, UserCog } from 'lucide-react';
import {
  ENGAGEMENT_STEPS,
  EXPERT_APPLY_MAILTO,
  EXPERT_DOMAINS,
  EXPERT_FAQ,
  EXPERT_HEADLINE,
  EXPERT_SERVICES,
  EXPERT_STATS,
  EXPERT_SUBHEAD,
  EXPERT_TRENDS,
  PILOT_BOOKING_URL,
  QUALITY_CONTROLS,
  SECURITY_CONTROLS,
  VETTING_STEPS,
} from '@/lib/expert-data';
import { CONTACT_EMAIL, SITE_URL, absoluteUrl } from '@/lib/site';
import { combineSchemas, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/schema';
import { ExpertCTAs } from '@/components/expert/ExpertCTAs';
import { ExpertRecord } from '@/components/expert/ExpertRecord';
import { SectionHead } from '@/components/home/SectionHead';
import { Reveal } from '@/components/home/Reveal';
import { Mark } from '@/components/Mark';

export const metadata: Metadata = {
  title: 'Expert human data for frontier AI: RL environments, evals, SFT, RLHF',
  description: `${EXPERT_SUBHEAD} RL environments with automatic graders, expert evals, SFT, RLHF and Indic-language data in medicine, law and STEM. Start with a 1–2 week pilot.`,
  alternates: { canonical: absoluteUrl('/expert-data'), types: { 'text/markdown': absoluteUrl('/expert-data.md') } },
  openGraph: {
    title: `${EXPERT_HEADLINE} · Anthroly`,
    description: EXPERT_SUBHEAD,
    url: absoluteUrl('/expert-data'),
  },
};

const SECURITY_ICONS = [FileSignature, UserCog, KeyRound, Lock, Ban];

const REPORT_ROWS = [
  ['Gold-answer accuracy', 'per expert · per task type'],
  ['Inter-expert agreement', 'per batch · trend vs last week'],
  ['Review outcomes', 'accepted · reworked · rejected'],
  ['Policy checks', 'AI-tool rule · guideline flags'],
  ['Changes made', 'guideline updates · re-calibrations'],
] as const;

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Expert human data for frontier AI',
  serviceType: 'AI training data',
  description: `${EXPERT_HEADLINE} ${EXPERT_SUBHEAD}`,
  provider: { '@id': `${SITE_URL}/#organization` },
  url: absoluteUrl('/expert-data'),
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Expert data services',
    itemListElement: EXPERT_SERVICES.map((s) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: s.name, description: s.short },
    })),
  },
};

export default function ExpertDataPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: combineSchemas(
            serviceSchema,
            generateFAQSchema([...EXPERT_FAQ]),
            generateBreadcrumbSchema([
              { name: 'Home', url: '/' },
              { name: 'Expert human data', url: '/expert-data' },
            ])
          ),
        }}
      />

      {/* Hero */}
      <section id="top" className="grain relative overflow-hidden pt-[68px]">
        <Mark className="pointer-events-none absolute -right-[14vw] top-[10vh] -z-10 h-[min(58vw,760px)] animate-[spin_160s_linear_infinite] text-ink/[0.035]" />
        <div className="page-x">
          <div className="flex items-center justify-between border-b border-rule py-4">
            <p className="eyebrow">Expert human data</p>
            <p className="eyebrow hidden sm:block">Free or low-cost 1–2 week pilot</p>
          </div>

          <h1 className="mt-14 max-w-6xl animate-rise font-serif text-display-xl text-balance sm:mt-20">
            Expert human data for <em className="text-signal">frontier AI.</em>
          </h1>

          <div className="mt-14 grid gap-16 pb-24 lg:mt-20 lg:grid-cols-12 lg:pb-32">
            <div className="animate-rise [animation-delay:120ms] lg:col-span-6">
              <p className="text-[22px] leading-[1.5] text-ink-soft text-pretty">{EXPERT_SUBHEAD}</p>
              <p className="mt-6 max-w-xl text-[17px] leading-[1.65] text-ink-muted text-pretty">
                RL environments with automatic graders, evals that today&apos;s models actually fail,
                expert-written SFT data, preference data for RLHF, and native Indic-language data in
                medicine, law and STEM.
              </p>
              <ExpertCTAs className="mt-10" />

              <dl className="mt-14 grid grid-cols-2 border-t border-rule">
                {EXPERT_STATS.map((s, i) => (
                  <div
                    key={s.label}
                    className={`py-6 pr-4 ${i % 2 ? 'border-l border-rule pl-6' : ''} ${i >= 2 ? 'border-t border-rule' : ''}`}
                  >
                    <dt className="sr-only">{s.label}</dt>
                    <dd>
                      <span className="block font-serif text-5xl leading-none">{s.value}</span>
                      <span className="mt-2 block text-[13px] text-ink-muted">{s.label}</span>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="animate-rise [animation-delay:240ms] lg:col-span-5 lg:col-start-8">
              <ExpertRecord />
            </div>
          </div>
        </div>
      </section>

      {/* What we do */}
      <section id="services" className="border-t border-rule bg-paper-card">
        <div className="page-x py-24 lg:py-36">
          <SectionHead
            index="01"
            label="What we do"
            title={
              <>
                Five kinds of data, <em className="text-signal">one bar for quality.</em>
              </>
            }
            intro="Every project is built by specialists from the field it describes, reviewed twice and delivered in the format your post-training pipeline already uses."
          />

          <div className="mt-20 border-t border-ink">
            {EXPERT_SERVICES.map((s) => (
              <article key={s.code} id={s.slug} className="scroll-mt-28 border-b border-rule">
                <Reveal className="grid gap-10 py-14 lg:grid-cols-12">
                  <div className="lg:col-span-6">
                    <span className="inline-flex h-11 min-w-11 items-center justify-center rounded-full border border-ink/20 px-3 font-mono text-[11px] text-signal">
                      {s.code}
                    </span>
                    <h3 className="mt-7 font-serif text-[clamp(2.1rem,3.4vw,3rem)] leading-[1.02]">{s.name}</h3>
                    <p className="mt-3 text-[17px] font-medium text-ink-soft">{s.short}</p>
                    <p className="mt-5 max-w-xl text-[16px] leading-[1.7] text-ink-muted">{s.body}</p>
                  </div>
                  <div className="lg:col-span-5 lg:col-start-8">
                    <p className="eyebrow">What you receive</p>
                    <ul className="mt-5 divide-y divide-rule border-y border-rule">
                      {s.deliverables.map((d) => (
                        <li key={d} className="flex gap-4 py-4 text-[15px] leading-[1.55] text-ink-soft">
                          <span className="mt-[0.7em] h-px w-4 shrink-0 bg-signal" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Domains */}
      <section id="domains" className="page-x py-24 lg:py-36">
        <SectionHead
          index="02"
          label="Domains"
          title={
            <>
              Where general raters <em className="text-signal">run out of road.</em>
            </>
          }
          intro="We focus on the fields where a wrong answer looks right to a non-expert, and where only someone who has done the work can tell the difference."
        />
        <div className="mt-20 grid gap-px overflow-hidden rounded-[6px] border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-4">
          {EXPERT_DOMAINS.map((d, i) => (
            <Reveal key={d.name} delay={i * 0.06} className="h-full">
              <div className="group flex h-full flex-col bg-paper p-8 transition-colors duration-500 hover:bg-paper-card">
                <span className="font-mono text-[11px] text-signal">0{i + 1}</span>
                <h3 className="mt-10 font-serif text-[2rem] leading-[1.05]">{d.name}</h3>
                <p className="mt-6 eyebrow">Who</p>
                <p className="mt-2 text-[15px] leading-[1.6] text-ink-soft">{d.people}</p>
                <p className="mt-5 eyebrow">Typical work</p>
                <p className="mt-2 text-[15px] leading-[1.6] text-ink-muted">{d.work}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Experts + vetting */}
      <section id="experts" className="relative overflow-hidden bg-ink text-paper">
        <div className="dot-grid-light pointer-events-none absolute inset-0 opacity-60" aria-hidden />
        <div className="page-x relative py-24 lg:py-36">
          <SectionHead
            dark
            index="03"
            label="Our experts"
            title={
              <>
                Verified before they see <em className="text-signal">a single task.</em>
              </>
            }
            intro="Anyone can claim a PhD on a profile. We check. Every expert on the bench has passed an identity check, a credential check and a paid skills test in their own field."
          />

          <Reveal delay={0.05}>
            <dl className="mt-20 grid grid-cols-2 border-t border-paper/20 lg:grid-cols-4">
              {EXPERT_STATS.map((s, i) => (
                <div
                  key={s.label}
                  className={`py-8 pr-6 ${i % 2 ? 'border-l border-paper/15 pl-6' : ''} ${
                    i === 2 ? 'lg:border-l lg:border-paper/15 lg:pl-6' : ''
                  } ${i >= 2 ? 'border-t border-paper/15 lg:border-t-0' : ''}`}
                >
                  <dt className="sr-only">{s.label}</dt>
                  <dd>
                    <span className="block font-serif text-[clamp(2.8rem,5vw,4.5rem)] leading-none">{s.value}</span>
                    <span className="mt-3 block text-[14px] text-paper/55">{s.label}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <ol className="mt-16 grid gap-px overflow-hidden rounded-[6px] border border-paper/15 bg-paper/15 md:grid-cols-2 lg:grid-cols-4">
            {VETTING_STEPS.map((v, i) => (
              <li key={v.name} className="h-full bg-ink">
                <Reveal delay={i * 0.07} className="flex h-full flex-col p-8">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-signal font-mono text-[11px] text-signal">
                      {i + 1}
                    </span>
                    {i < VETTING_STEPS.length - 1 && <span className="h-px flex-1 bg-paper/15" aria-hidden />}
                  </div>
                  <h3 className="mt-8 font-serif text-[1.8rem] leading-tight">{v.name}</h3>
                  <p className="mt-3 text-[15px] leading-[1.65] text-paper/60">{v.body}</p>
                </Reveal>
              </li>
            ))}
          </ol>

          <Reveal>
            <div className="mt-16 flex flex-col items-start justify-between gap-8 border-t border-paper/15 pt-10 md:flex-row md:items-center">
              <p className="max-w-xl font-serif text-[1.9rem] leading-tight">
                Engineer, scientist, doctor or Indic-language specialist? We pay for your expertise.
              </p>
              <a
                href={EXPERT_APPLY_MAILTO}
                className="btn-paper shrink-0"
              >
                Join as an expert
                <Mail size={15} />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Quality */}
      <section id="quality" className="page-x py-24 lg:py-36">
        <SectionHead
          index="04"
          label="Quality"
          title={
            <>
              Quality you can see, <em className="text-signal">every week.</em>
            </>
          }
          intro="We don’t ask you to trust the process. Hidden gold answers, two review layers and agreement scores produce numbers, and you get those numbers every week."
        />

        <div className="mt-20 grid gap-12 lg:grid-cols-12">
          <ul className="border-t border-ink lg:col-span-7">
            {QUALITY_CONTROLS.map((q, i) => (
              <li key={q.name} className="border-b border-rule">
                <Reveal delay={i * 0.04} className="grid gap-3 py-7 sm:grid-cols-[3rem_1fr_1.4fr] sm:gap-6">
                  <span className="font-mono text-[11px] text-signal">0{i + 1}</span>
                  <h3 className="font-serif text-[1.6rem] leading-tight">{q.name}</h3>
                  <p className="text-[15px] leading-[1.65] text-ink-muted">{q.body}</p>
                </Reveal>
              </li>
            ))}
          </ul>

          <Reveal delay={0.1} className="lg:col-span-5">
            <div className="sticky top-28 overflow-hidden rounded-[8px] border border-ink/15 bg-paper-card font-mono text-[12.5px] shadow-[0_30px_60px_-30px_rgba(21,20,15,0.3)]">
              <div className="flex items-center justify-between border-b border-rule px-5 py-3 text-[10.5px] uppercase tracking-[0.14em] text-ink-muted">
                <span>weekly_quality_report.pdf</span>
                <span>Sample layout</span>
              </div>
              <div className="border-b border-rule px-5 py-5">
                <p className="font-serif text-[1.7rem] leading-none text-ink">Week 06</p>
                <p className="mt-2 text-ink-faint">project · rl-coding-pilot</p>
              </div>
              <dl className="divide-y divide-rule">
                {REPORT_ROWS.map(([k, v]) => (
                  <div key={k} className="grid grid-cols-[1fr_auto] gap-4 px-5 py-3.5">
                    <dt className="text-ink-soft">{k}</dt>
                    <dd className="text-right text-ink-faint">{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="flex items-center gap-2 border-t border-rule bg-paper-deep px-5 py-3.5 text-ink-muted">
                <Eye size={14} className="text-signal" />
                Shared with your team every Monday
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Security */}
      <section id="security" className="border-y border-rule bg-paper-deep">
        <div className="page-x py-24 lg:py-36">
          <SectionHead
            index="05"
            label="Security"
            title={
              <>
                Your data stays <em className="text-signal">your data.</em>
              </>
            }
            intro="The same controls apply to every expert on every project, from the pilot onward."
          />
          <div className="mt-20 grid gap-px overflow-hidden rounded-[6px] border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-5">
            {SECURITY_CONTROLS.map((c, i) => {
              const Icon = SECURITY_ICONS[i];
              return (
                <Reveal key={c.name} delay={i * 0.05} className="h-full">
                  <div className="h-full bg-paper-card p-7">
                    <Icon size={22} strokeWidth={1.5} className="text-signal" />
                    <h3 className="mt-8 font-serif text-[1.55rem] leading-tight">{c.name}</h3>
                    <p className="mt-3 text-[14.5px] leading-[1.6] text-ink-muted">{c.body}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trends */}
      <section id="trends" className="page-x py-24 lg:py-36">
        <SectionHead
          index="06"
          label="Where the field is going"
          title={
            <>
              What labs are asking for <em className="text-signal">right now.</em>
            </>
          }
          intro="Post-training has moved from “which answer is nicer” to “did the agent actually finish the job, and can we prove it.” Here is what that changes, and how we build for it."
        />
        <div className="mt-20 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {EXPERT_TRENDS.map((t, i) => (
            <Reveal key={t.name} delay={(i % 3) * 0.06}>
              <div className="border-t border-ink pt-6">
                <span className="font-mono text-[11px] text-signal">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-5 font-serif text-[1.85rem] leading-tight">{t.name}</h3>
                <p className="mt-3 text-[15.5px] leading-[1.7] text-ink-muted">{t.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* How we work */}
      <section id="pilot" className="relative overflow-hidden bg-ink text-paper">
        <div className="dot-grid-light pointer-events-none absolute inset-0 opacity-60" aria-hidden />
        <div className="page-x relative py-24 lg:py-36">
          <SectionHead
            dark
            index="07"
            label="How we work"
            title={
              <>
                Prove it small. <em className="text-signal">Then scale.</em>
              </>
            }
            intro="No long contract up front. You judge the data from a real pilot before committing to a team."
          />

          <ol className="mt-20 grid gap-px overflow-hidden rounded-[6px] border border-paper/15 bg-paper/15 lg:grid-cols-3">
            {ENGAGEMENT_STEPS.map((s, i) => (
              <li key={s.step} className="h-full bg-ink">
                <Reveal delay={i * 0.08} className="flex h-full flex-col p-8 sm:p-10">
                  <span className="font-mono text-[11px] tracking-[0.14em] text-signal">{s.step}</span>
                  <h3 className="mt-10 font-serif text-[2.6rem] leading-none">{s.name}</h3>
                  <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-paper/45">{s.time}</p>
                  <p className="mt-6 text-[15.5px] leading-[1.65] text-paper/65">{s.body}</p>
                </Reveal>
              </li>
            ))}
          </ol>

          <Reveal>
            <ExpertCTAs dark className="mt-14" />
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="page-x py-24 lg:py-36">
        <div className="grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow flex items-center gap-3">
              <span className="text-signal">08</span>
              <span className="h-px w-8 bg-ink/25" />
              Questions
            </p>
            <h2 className="mt-8 font-serif text-display-md">Before you book a pilot.</h2>
            <p className="mt-6 text-[16px] leading-[1.6] text-ink-muted">
              Something else? Write to{' '}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-ink underline decoration-signal underline-offset-4">
                {CONTACT_EMAIL}
              </a>
              .
            </p>
          </Reveal>
          <div className="border-t border-ink lg:col-span-8">
            {EXPERT_FAQ.map((item) => (
              <details key={item.question} className="group border-b border-rule">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden">
                  <span className="font-serif text-[1.6rem] leading-snug transition-colors group-hover:text-signal">
                    {item.question}
                  </span>
                  <Plus size={20} className="mt-2 shrink-0 text-ink-muted transition-transform duration-300 group-open:rotate-45" />
                </summary>
                <p className="max-w-2xl pb-8 text-[16px] leading-[1.7] text-ink-muted">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="start" className="page-x pb-24 lg:pb-36">
        <div className="grid gap-px overflow-hidden rounded-[6px] border border-ink bg-ink md:grid-cols-2">
          <a
            href={PILOT_BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col bg-ink p-8 text-paper transition-colors duration-500 hover:bg-[#1d1c16] sm:p-12"
          >
            <div className="flex items-center justify-between">
              <span className="eyebrow !text-paper/50">For AI labs</span>
              <ArrowUpRight size={22} className="text-paper/40 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-signal" />
            </div>
            <h2 className="mt-12 font-serif text-[clamp(2.4rem,4vw,3.6rem)] leading-none">Request a pilot</h2>
            <p className="mt-5 max-w-md text-[16px] leading-[1.65] text-paper/60">
              Book 15 minutes. Tell us the capability gap and the domain, and we&apos;ll scope a 1–2
              week pilot with a vetted team.
            </p>
            <span className="mt-10 border-t border-paper/15 pt-5 font-mono text-[12px] text-paper/45">
              cal.com · 15 min intro call
            </span>
          </a>
          <a
            href={EXPERT_APPLY_MAILTO}
            className="group flex flex-col bg-paper p-8 transition-colors duration-500 hover:bg-paper-card sm:p-12"
          >
            <div className="flex items-center justify-between">
              <span className="eyebrow">For experts</span>
              <ArrowUpRight size={22} className="text-ink-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-signal" />
            </div>
            <h2 className="mt-12 font-serif text-[clamp(2.4rem,4vw,3.6rem)] leading-none">Join as an expert</h2>
            <p className="mt-5 max-w-md text-[16px] leading-[1.65] text-ink-muted">
              Email us your field, degree, languages and CV. If there&apos;s a fit, we send a paid
              skills test.
            </p>
            <span className="mt-10 border-t border-rule pt-5 font-mono text-[12px] text-ink-faint">{CONTACT_EMAIL}</span>
          </a>
        </div>
      </section>
    </>
  );
}
