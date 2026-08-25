import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Crosshair,
  Eye,
  FileSearch,
  Layers,
  Map,
  Network,
  Quote,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
} from 'lucide-react';
import { BOOK_CALL_URL, PRIMARY_CTA_LABEL } from '@/lib/site';
import { Button } from '../ui/button';
import {
  GlowPulse,
  ScrollReveal,
  StaggerContainer,
  StaggerItem,
} from '../ui/static-fx';

function bookCallWith(_note: string): string {
  return BOOK_CALL_URL;
}

/** What our human team delivers — not a DIY playbook */
const WHAT_WE_DO = [
  {
    step: '01',
    title: 'Map your citation neighborhood',
    detail:
      'Our researchers study the pages ChatGPT, Perplexity, Claude, and Gemini repeatedly cite when answering category questions — especially the sources that appear beside your competitors.',
    icon: Map,
  },
  {
    step: '02',
    title: 'Isolate the sources AI already trusts',
    detail:
      'We set the competitor pages aside and focus on the other publications, reviews, listicles, docs, and reference sites that form the neighborhood answer engines already rely on.',
    icon: Eye,
  },
  {
    step: '03',
    title: 'Prioritize where your brand must appear',
    detail:
      'Humans score each neighbor by citation frequency, topical fit, and commercial impact — then build a shortlist of placements worth earning, not a random outreach blast.',
    icon: Crosshair,
  },
  {
    step: '04',
    title: 'Earn mentions with human digital PR',
    detail:
      'Our writers, outreach specialists, and strategists secure brand mentions, quotes, data inclusions, and editorial coverage on those trusted sources.',
    icon: Network,
  },
  {
    step: '05',
    title: 'Verify the neighborhood reflects you',
    detail:
      'We re-check how AI answers cite the category after placements land — and keep working the neighborhood as sources rotate.',
    icon: ShieldCheck,
  },
];

const OUTCOMES = [
  {
    title: 'Not 100 random backlinks',
    detail:
      'We pursue the specific sources AI already uses to construct answers in your category — so authority compounds where models look.',
    icon: Target,
  },
  {
    title: 'Human judgment on every target',
    detail:
      'Researchers decide which neighbors matter. Strategists decide the angle. Writers and PR specialists execute. Nothing is spray-and-pray.',
    icon: Users,
  },
  {
    title: 'Built for recommendation, not vanity links',
    detail:
      'The goal is for answer engines to keep encountering your brand inside the evidence they already trust — until you become part of the recommendation.',
    icon: Sparkles,
  },
];

const DELIVERABLES = [
  'Citation-neighborhood map for your category prompts',
  'Prioritized target list of AI-trusted sources (excluding competitor pages)',
  'Human-led pitches, contributions, and digital PR for those sources',
  'Tracking of brand presence inside the neighborhood over time',
  'Ongoing refresh as answer engines rotate what they cite',
];

export const CitationNeighbors = () => {
  return (
    <section
      id="citation-neighbors"
      aria-labelledby="citation-neighbors-heading"
      className="relative overflow-hidden bg-transparent py-24 text-white md:py-32"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,_rgba(16,185,129,0.08),_transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,_rgba(34,211,238,0.06),_transparent_50%)]" />
        <GlowPulse className="-top-20 left-1/4" color="emerald" size={520} />
        <GlowPulse className="bottom-0 right-1/5" color="cyan" size={440} />
      </div>

      <div className="container relative z-10 mx-auto px-4 lg:px-8">
        <ScrollReveal className="mx-auto max-w-4xl text-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-emerald-300 backdrop-blur">
            <Layers size={14} />
            Citation Neighborhood Service
          </div>

          <h2
            id="citation-neighbors-heading"
            className="text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl"
          >
            <span className="block text-white">Enter the sources AI already</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400">
              uses to build the answer
            </span>
          </h2>

          <p className="mx-auto mt-7 max-w-2xl text-xl font-medium leading-relaxed text-gray-200">
            Answer engines don&apos;t invent authority from scratch. They assemble answers from a
            citation neighborhood they already trust.
          </p>

          <div className="mx-auto mt-8 max-w-2xl space-y-4 text-lg leading-relaxed text-gray-400">
            <p>
              When ChatGPT or Perplexity recommends your competitors, other pages appear beside
              them — publications, reviews, research, and reference sites the model keeps citing.
              Those sites are the neighborhood.
            </p>
            <p>
              <strong className="font-semibold text-white">
                Our human team maps that neighborhood for your category, then works to get your
                brand mentioned there.
              </strong>{' '}
              Not a hundred random backlinks. The sources AI already uses.
            </p>
          </div>

          <div className="mx-auto mt-8 w-fit rounded-2xl border border-cyan-500/25 bg-cyan-500/10 px-6 py-4">
            <p className="text-base font-semibold text-cyan-100 md:text-lg">
              Researchers + digital PR specialists. Human outreach. Human prioritization.
            </p>
          </div>

          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={bookCallWith('Citation Neighborhood Service inquiry')}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <Button
                size="xl"
                className="h-14 w-full rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 px-10 text-lg font-bold text-black shadow-[0_0_50px_-12px_rgba(16,185,129,0.5)] transition-all hover:shadow-[0_0_70px_-15px_rgba(34,211,238,0.55)] sm:w-auto"
              >
                {PRIMARY_CTA_LABEL}
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </a>
            <Link href="/customers" className="w-full sm:w-auto">
              <Button
                size="xl"
                variant="outline"
                className="h-14 w-full rounded-full border-gray-700 px-8 text-white hover:bg-white/10 sm:w-auto"
              >
                See customer stories
              </Button>
            </Link>
          </div>
        </ScrollReveal>

        {/* What we do */}
        <div className="mx-auto mt-24 max-w-6xl md:mt-32">
          <ScrollReveal className="mx-auto max-w-3xl text-center">
            <h3 className="text-3xl font-bold tracking-tight sm:text-4xl">
              What our team does for you
            </h3>
            <p className="mt-4 text-lg text-gray-400">
              A managed service — your researchers and PR specialists run this continuously. You
              receive the map, the placements, and the follow-through.
            </p>
          </ScrollReveal>

          <StaggerContainer className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {WHAT_WE_DO.map((item) => {
              const Icon = item.icon;
              return (
                <StaggerItem key={item.step} className="h-full">
                  <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-black/40 p-6 transition-colors hover:border-emerald-500/30">
                    <div className="mb-5 flex items-center justify-between">
                      <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400/80">
                        {item.step}
                      </span>
                      <Icon size={18} className="text-cyan-400" />
                    </div>
                    <h4 className="mb-3 text-lg font-bold text-white">{item.title}</h4>
                    <p className="text-sm leading-relaxed text-gray-400">{item.detail}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>

        {/* Outcomes */}
        <div className="mx-auto mt-24 grid max-w-6xl gap-6 md:mt-28 md:grid-cols-3">
          {OUTCOMES.map((item) => {
            const Icon = item.icon;
            return (
              <ScrollReveal key={item.title}>
                <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-7">
                  <Icon size={20} className="mb-5 text-emerald-400" />
                  <h4 className="mb-3 text-xl font-bold text-white">{item.title}</h4>
                  <p className="text-sm leading-relaxed text-gray-400">{item.detail}</p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Deliverables + quote */}
        <div className="mx-auto mt-24 grid max-w-6xl items-stretch gap-8 md:mt-28 lg:grid-cols-[1.1fr_0.9fr]">
          <ScrollReveal>
            <div className="h-full rounded-2xl border border-white/10 bg-black/40 p-8 md:p-10">
              <div className="mb-6 inline-flex items-center gap-2 text-emerald-400">
                <FileSearch size={18} />
                <span className="text-xs font-semibold uppercase tracking-wider">
                  Included in the service
                </span>
              </div>
              <h3 className="mb-6 text-2xl font-bold text-white md:text-3xl">
                What you receive from our humans
              </h3>
              <ul className="space-y-4">
                {DELIVERABLES.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-gray-300">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-sm text-gray-500">
                Part of Anthroly&apos;s broader{' '}
                <Link
                  href="/#human-led-ai-visibility"
                  className="text-emerald-400 underline-offset-4 hover:underline"
                >
                  human-led AI visibility
                </Link>{' '}
                and{' '}
                <Link href="/aeo" className="text-emerald-400 underline-offset-4 hover:underline">
                  Answer Engine Optimization
                </Link>{' '}
                program — executed by people, not a self-serve checklist.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <div className="flex h-full flex-col justify-between rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-8 md:p-10">
              <div>
                <Quote size={28} className="mb-6 text-cyan-400/70" />
                <p className="text-2xl font-semibold leading-snug text-white md:text-3xl">
                  Don&apos;t chase links AI ignores.
                </p>
                <p className="mt-5 text-lg leading-relaxed text-gray-300">
                  Enter the citation neighborhood your category already lives in — and make your
                  brand part of the evidence answer engines reuse.
                </p>
              </div>
              <a
                href={bookCallWith('Citation Neighborhood Service inquiry')}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-10 inline-flex"
              >
                <Button
                  size="lg"
                  className="rounded-full bg-white px-8 font-bold text-black hover:bg-gray-100"
                >
                  Talk to our research team
                  <ArrowRight className="ml-2" size={18} />
                </Button>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
