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
    title: 'Map the authority neighborhood',
    detail:
      'The backlink agent studies where your rivals already earn editorial mentions — publications, resources, and reference sites that make a cold email feel familiar.',
    icon: Map,
  },
  {
    step: '02',
    title: 'Isolate sources worth earning',
    detail:
      'We set junk, PBNs, and directories aside. The agent hunts the other publications, reviews, listicles, and docs that actually move domain trust.',
    icon: Eye,
  },
  {
    step: '03',
    title: 'Prioritize where your brand must appear',
    detail:
      'Humans score each target by relevance, authority, and commercial impact — then the agent works the shortlist 24/7, not a random blast.',
    icon: Crosshair,
  },
  {
    step: '04',
    title: 'Earn links while you sleep',
    detail:
      'The agent prospects, pitches, and follows up around the clock. Operators QA every placement. Editorial only.',
    icon: Network,
  },
  {
    step: '05',
    title: 'Feed proof into outreach',
    detail:
      'New links go back into the email agent — so the next 1,000 sends land heavier than the last.',
    icon: ShieldCheck,
  },
];

const OUTCOMES = [
  {
    title: 'Not 100 random backlinks',
    detail:
      'We pursue the specific sources that actually move authority in your category — so every link compounds the next email.',
    icon: Target,
  },
  {
    title: 'Quality filter on every target',
    detail:
      'Operators decide which neighbors matter. The agent never stops hunting. Nothing is spray-and-pray. Nothing is a PBN.',
    icon: Users,
  },
  {
    title: 'Built for replies, not vanity DR',
    detail:
      'The goal is a domain that makes cold email feel like a warm intro — because the web already vouches for you.',
    icon: Sparkles,
  },
];

const DELIVERABLES = [
  'Authority-neighborhood map for your category',
  'Prioritized target list (junk and PBNs excluded)',
  '24/7 prospecting, pitching, and follow-up',
  'Tracking of every editorial placement as it lands',
  'Ongoing refresh as the neighborhood rotates',
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
            24/7 backlink agent
          </div>

          <h2
            id="citation-neighbors-heading"
            className="text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl"
          >
            <span className="block text-white">High-quality backlinks while</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400">
              you sleep, ship, and sell
            </span>
          </h2>

          <p className="mx-auto mt-7 max-w-2xl text-xl font-medium leading-relaxed text-gray-200">
            Cold email without authority is noise. This agent hunts editorial links around the clock — so every send lands heavier than the last.
          </p>

          <div className="mx-auto mt-8 max-w-2xl space-y-4 text-lg leading-relaxed text-gray-400">
            <p>
              Cheap link farms stain the domain. Then every cold email looks like a scam — because
              the web already said you are one. The 24/7 backlink agent does the opposite.
            </p>
            <p>
              <strong className="font-semibold text-white">
                It hunts, pitches, and earns high-quality placements while you stay in the product.
              </strong>{' '}
              Not a hundred random backlinks. Editorial only. No PBNs. No junk.
            </p>
          </div>

          <div className="mx-auto mt-8 w-fit rounded-2xl border border-cyan-500/25 bg-cyan-500/10 px-6 py-4">
            <p className="text-base font-semibold text-cyan-100 md:text-lg">
              Autonomous hunting. Human quality filters. 24/7.
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
                What you receive from the backlink agent
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
                Part of Anthroly&apos;s{' '}
                <Link
                  href="/#human-led-ai-visibility"
                  className="text-emerald-400 underline-offset-4 hover:underline"
                >
                  outreach agent
                </Link>{' '}
                and{' '}
                <Link href="/aeo" className="text-emerald-400 underline-offset-4 hover:underline">
                  dual-agent program
                </Link>{' '}
                — two machines we set up and run, not a self-serve checklist.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <div className="flex h-full flex-col justify-between rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-8 md:p-10">
              <div>
                <Quote size={28} className="mb-6 text-cyan-400/70" />
                <p className="text-2xl font-semibold leading-snug text-white md:text-3xl">
                  Don&apos;t buy links that stain the domain.
                </p>
                <p className="mt-5 text-lg leading-relaxed text-gray-300">
                  Let a 24/7 agent earn editorial placements — the kind that make 1,000 emails a day feel like a warm intro.
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
