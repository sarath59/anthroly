import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Award,
  BadgeCheck,
  BookOpenCheck,
  Building2,
  Compass,
  FileSearch,
  Globe2,
  LineChart,
  Link2,
  MessageCircleQuestion,
  Newspaper,
  Quote,
  Scale,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react';
import { BOOK_CALL_URL, PRIMARY_CTA_LABEL } from '@/lib/site';
import { Button } from '../ui/button';
import {
  GlowPulse,
  ScrollReveal,
  SpotlightCard,
  StaggerContainer,
  StaggerItem,
} from '../ui/static-fx';

function bookCallWith(_note: string): string {
  return BOOK_CALL_URL;
}

/** What shifts underneath your pipeline every week */
const WHAT_CHANGES = [
  {
    label: 'The inboxes change',
    detail: 'New titles, new companies, new buying windows. Yesterday’s list is already stale.',
    icon: MessageCircleQuestion,
  },
  {
    label: 'The proof changes',
    detail: 'New competitors, new objections, new reasons they ignore a cold email.',
    icon: Newspaper,
  },
  {
    label: 'Your rivals change',
    detail: 'Someone else is already sending 1,000 a day. Silence is a decision.',
    icon: Scale,
  },
  {
    label: 'Your offer changes',
    detail: 'What converted last month can bounce this month. The agent has to keep up.',
    icon: Compass,
  },
];

/** Workstreams the outreach team runs every day */
const TEAM_WORKSTREAMS = [
  { label: 'ICP research', icon: LineChart },
  { label: 'List building', icon: BadgeCheck },
  { label: 'Personalization', icon: Scale },
  { label: 'Sequence design', icon: FileSearch },
  { label: '1,000 emails/day', icon: BookOpenCheck },
  { label: 'Follow-ups', icon: Newspaper },
  { label: 'Deliverability', icon: Globe2 },
  { label: 'Reply routing', icon: Link2 },
  { label: 'Offer testing', icon: Globe2 },
  { label: 'Exclusion lists', icon: Building2 },
  { label: 'Spam defense', icon: ShieldCheck },
];

/** The battlegrounds where pipeline is won or lost */
const COMPETE_FOR = [
  {
    name: 'The first inbox',
    detail:
      'Be the email they actually open — personalized to a real reason, not a mail-merge first name.',
    icon: Award,
    color: 'emerald',
  },
  {
    name: 'High-intent accounts',
    detail:
      'Reach the people who can buy this quarter — not a scraped list of anyone with a LinkedIn URL.',
    icon: MessageCircleQuestion,
    color: 'cyan',
  },
  {
    name: 'The follow-up they never get',
    detail:
      'Most deals die in the silence after email one. The agent never forgets the second, third, or fifth touch.',
    icon: Scale,
    color: 'purple',
  },
  {
    name: 'Proof in the pitch',
    detail:
      'Authority links and real outcomes in the copy — so you do not sound like a stranger with a calendar link.',
    icon: Building2,
    color: 'blue',
  },
  {
    name: 'Deliverability',
    detail:
      'Volume without a burned domain. Warmup, rotation, and kill-switches so 1,000/day does not become 0/day.',
    icon: Link2,
    color: 'amber',
  },
];

const BUYER_QUESTIONS = [
  'Why should I reply to this?',
  'Is this another spray-and-pray?',
  'Who else uses this?',
  'Can I trust the domain?',
  'What happens if I ignore it?',
];

const COLOR_MAP: Record<string, { border: string; text: string; glow: string }> = {
  emerald: { border: 'hover:border-emerald-500/40', text: 'text-emerald-400', glow: 'rgba(16,185,129,0.30)' },
  cyan: { border: 'hover:border-cyan-500/40', text: 'text-cyan-400', glow: 'rgba(34,211,238,0.28)' },
  purple: { border: 'hover:border-purple-500/40', text: 'text-purple-400', glow: 'rgba(168,85,247,0.28)' },
  blue: { border: 'hover:border-blue-500/40', text: 'text-blue-400', glow: 'rgba(59,130,246,0.28)' },
  amber: { border: 'hover:border-amber-500/40', text: 'text-amber-400', glow: 'rgba(245,158,11,0.28)' },
};

export const HumanLedAIVisibility = () => {
  return (
    <section
      id="human-led-ai-visibility"
      aria-labelledby="human-led-ai-visibility-heading"
      className="relative overflow-hidden bg-transparent py-24 text-white md:py-32"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(168,85,247,0.08),_transparent_60%)]" />
        <GlowPulse className="-top-24 right-1/4" color="purple" size={560} />
        <GlowPulse className="bottom-10 left-1/5" color="emerald" size={480} />
      </div>

      <div className="container relative z-10 mx-auto px-4 lg:px-8">
        {/* ── Headline ─────────────────────────────────────────── */}
        <ScrollReveal className="mx-auto max-w-4xl text-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-gray-300 backdrop-blur">
            <Users size={14} className="text-purple-400" />
            Outreach agent · 1,000 emails / day
          </div>

          <h2
            id="human-led-ai-visibility-heading"
            className="text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl"
          >
            <span className="block text-white">Fill the calendar without</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-emerald-400 to-cyan-400">
              becoming the SDR
            </span>
          </h2>

          <p className="mx-auto mt-7 max-w-2xl text-xl font-medium leading-relaxed text-gray-200">
            This is the outreach agent: 1,000 personalized cold emails a day, with follow-ups that never freeze. You approve ICP and voice. We run the hunt.
          </p>

          <div className="mx-auto mt-8 max-w-2xl space-y-4 text-lg leading-relaxed text-gray-400">
            <p>
              Most founders still write 40 emails, then the product calls. Volume dies. Follow-ups die.
              Meanwhile a competitor is sending while you sleep.{' '}
              <strong className="font-semibold text-white">
                Silence in the inbox is not rest. It is lost pipeline.
              </strong>
            </p>
            <p>
              Our team sets up and operates the lead-gen agent across your ICP — and pairs it with{' '}
              <Link href="/aeo" className="text-emerald-400 underline-offset-4 hover:underline">
                the rest of the program
              </Link>
              .
            </p>
          </div>

          <div className="mx-auto mt-8 w-fit rounded-2xl border border-purple-500/25 bg-purple-500/10 px-6 py-4">
            <p className="text-base font-semibold text-purple-200 md:text-lg">
              Operators watch deliverability and QA every sequence — not a dashboard you log into alone.
            </p>
          </div>

          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={bookCallWith('AI Visibility Audit request')}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <Button
                size="xl"
                className="h-14 w-full rounded-full bg-gradient-to-r from-purple-500 via-emerald-500 to-cyan-500 px-10 text-lg font-bold text-black shadow-[0_0_50px_-12px_rgba(168,85,247,0.5)] transition-all hover:shadow-[0_0_70px_-15px_rgba(16,185,129,0.7)] sm:w-auto"
              >
                {PRIMARY_CTA_LABEL}
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </a>
          </div>
        </ScrollReveal>

        {/* ── Managed by humans ────────────────────────────────── */}
        <div className="mx-auto mt-24 grid max-w-6xl items-center gap-10 md:mt-32 lg:grid-cols-[1fr_1fr]">
          <ScrollReveal>
            <h3 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Your outreach agent,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                managed by humans
              </span>
            </h3>
            <p className="mt-5 text-lg leading-relaxed text-gray-400">
              Pipeline isn&apos;t something you batch on Sunday. That&apos;s why we run a continuous
              outreach agent—the managed alternative to yet another{' '}
              <Link
                href="/aeo/aeo-vs-seo-vs-geo"
                className="text-emerald-400 underline-offset-4 hover:underline"
              >
                AEO
              </Link>{' '}
              dashboard.
            </p>
            <p className="mt-4 leading-relaxed text-gray-400">
              Our operators monitor sends, replies, and bounce risk, then keep the agent hunting —
              lists refreshed, copy tightened, follow-ups never dropped.
            </p>
            <p className="mt-6 text-lg font-semibold text-white">
              You don&apos;t get a CSV and a login.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                You get a team working on your brand.
              </span>
            </p>
          </ScrollReveal>

          <StaggerContainer className="grid gap-4 sm:grid-cols-2">
            {WHAT_CHANGES.map(item => {
              const Icon = item.icon;
              return (
                <StaggerItem key={item.label} className="h-full">
                  <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-black/40 p-5 transition-colors hover:border-purple-500/30">
                    <Icon size={18} className="mb-4 text-purple-400" />
                    <p className="mb-1.5 text-sm font-bold text-white">{item.label}</p>
                    <p className="text-sm leading-relaxed text-gray-500">{item.detail}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>

        {/* ── The team behind it ───────────────────────────────── */}
        <div className="mx-auto mt-24 max-w-6xl md:mt-32">
          <ScrollReveal className="mx-auto max-w-3xl text-center">
            <h3 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              The agent hunts.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-emerald-400">
                You take the meetings.
              </span>
            </h3>
            <p className="mt-5 text-lg text-gray-400">
              Behind your outreach agent is a dedicated team of operators, copy leads, and
              deliverability specialists. Every day, they work across:
            </p>
          </ScrollReveal>

          <StaggerContainer className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {TEAM_WORKSTREAMS.map(item => {
              const Icon = item.icon;
              return (
                <StaggerItem key={item.label}>
                  <div className="flex h-full items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 transition-colors hover:border-emerald-500/30">
                    <Icon size={16} className="flex-shrink-0 text-emerald-400" />
                    <span className="text-sm font-medium text-gray-300">{item.label}</span>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>

          <ScrollReveal className="mx-auto mt-10 max-w-3xl text-center">
            <p className="text-lg text-gray-400">
              Software can tell you that volume dropped.{' '}
              <span className="font-semibold text-white">
                Our people work on why it dropped—and what the agent does next.
              </span>
            </p>
          </ScrollReveal>
        </div>

        {/* ── Mentioned vs recommended ─────────────────────────── */}
        <div className="mx-auto mt-24 max-w-5xl md:mt-32">
          <ScrollReveal className="mx-auto max-w-3xl text-center">
            <h3 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              We don&apos;t just send volume.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                We work to change who replies.
              </span>
            </h3>
            <p className="mt-5 text-lg text-gray-400">
              Most outreach tools stop at a CSV. We go further — continuously tightening ICP,
              personalization, and proof so 1,000 emails a day feel like one thoughtful note.
            </p>
          </ScrollReveal>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            <ScrollReveal delay={0.05}>
              <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-black/40 p-8">
                <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  The goal isn&apos;t simply
                </p>
                <p className="text-2xl font-semibold text-gray-500 md:text-3xl">
                  &ldquo;We blasted 1,000 emails.&rdquo;
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/15 via-cyan-500/10 to-transparent p-8">
                <Sparkles size={18} className="absolute right-6 top-6 text-emerald-400/60" />
                <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-emerald-300">
                  The goal is
                </p>
                <p className="text-2xl font-bold text-white md:text-3xl">
                  &ldquo;Replies showed up on the calendar.&rdquo;
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* ── Built for brands that depend on being chosen ─────── */}
        <div className="mx-auto mt-24 max-w-6xl md:mt-32">
          <ScrollReveal className="mx-auto max-w-3xl text-center">
            <h3 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Built for founders who cannot be the SDR
            </h3>
            <p className="mt-5 text-lg text-gray-400">
              SaaS, agencies, consultants, professional services — if you need conversations this
              quarter and cannot spend 20 hours a week hunting lists, the outreach agent is for you.
            </p>
          </ScrollReveal>

          <StaggerContainer className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {COMPETE_FOR.map(item => {
              const Icon = item.icon;
              const colors = COLOR_MAP[item.color];
              return (
                <StaggerItem key={item.name} className="h-full">
                  <SpotlightCard
                    className={`h-full rounded-2xl border border-white/10 bg-black/40 transition-colors ${colors.border}`}
                    spotlightColor={colors.glow}
                  >
                    <div className="flex h-full flex-col p-6">
                      <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                        <Icon size={20} className={colors.text} />
                      </div>
                      <h4 className="mb-3 text-lg font-bold text-white">{item.name}</h4>
                      <p className="text-sm leading-relaxed text-gray-500">{item.detail}</p>
                    </div>
                  </SpotlightCard>
                </StaggerItem>
              );
            })}

            <StaggerItem className="h-full">
              <div className="flex h-full flex-col justify-between rounded-2xl border border-purple-500/25 bg-gradient-to-br from-purple-500/15 via-emerald-500/10 to-transparent p-6">
                <div>
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-black/30">
                    <Users size={20} className="text-purple-400" />
                  </div>
                  <h4 className="mb-3 text-lg font-bold text-white">
                    See if 1,000/day would print money
                  </h4>
                  <p className="text-sm leading-relaxed text-gray-300">
                    Start with a human-reviewed audit of your list, reply rate, and where an outreach agent would waste budget vs fill the calendar.
                  </p>
                </div>
                <a
                  href={bookCallWith('AI Visibility Audit request')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6"
                >
                  <Button className="w-full rounded-xl bg-white font-semibold text-black hover:bg-gray-200">
                    Get your audit
                    <ArrowRight size={16} className="ml-2" />
                  </Button>
                </a>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>

        {/* ── Team without hiring ──────────────────────────────── */}
        <ScrollReveal className="mx-auto mt-24 max-w-5xl md:mt-32">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-black/50 p-8 backdrop-blur md:p-12">
            <GlowPulse className="-right-24 -top-24" color="purple" size={340} />
            <div className="relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <h3 className="text-3xl font-bold tracking-tight md:text-4xl">
                  Your outreach team,{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-emerald-400">
                    without hiring 40 people
                  </span>
                </h3>
                <p className="mt-5 leading-relaxed text-gray-400">
                  Hiring an SDR team means recruiting, ramping, and managing people who still sleep.
                  Instead, get an outreach agent already hunting — plus operators who watch it.
                </p>
                <ul className="mt-6 space-y-2.5 text-sm text-gray-300">
                  {['No hiring SDRs.', 'No managing freelancers.', 'No becoming the SDR yourself.'].map(
                    item => (
                      <li key={item} className="flex items-center gap-3">
                        <BadgeCheck size={16} className="flex-shrink-0 text-emerald-400" />
                        {item}
                      </li>
                    )
                  )}
                </ul>
                <p className="mt-6 font-semibold text-white">
                  Just an agent sending 1,000 a day — so you stay in the product.
                </p>
              </div>

              <div className="grid content-center gap-4">
                {[
                  { stat: '1,000/day', label: 'personalized cold emails — not a blast from a CSV' },
                  { stat: '24/7', label: 'the backlink agent hunts while this one sends' },
                  { stat: 'You decide', label: 'approve ICP and voice. Take the replies.' },
                ].map(row => (
                  <div
                    key={row.stat}
                    className="rounded-2xl border border-white/10 bg-black/40 px-6 py-5"
                  >
                    <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-emerald-400 md:text-3xl">
                      {row.stat}
                    </p>
                    <p className="mt-1 text-sm text-gray-400">{row.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* ── The new search is here ───────────────────────────── */}
        <div className="mx-auto mt-24 max-w-4xl text-center md:mt-32">
          <ScrollReveal>
            <h3 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Your buyers already live in inboxes.
            </h3>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-400">
              They&apos;re not waiting for another blog post. They&apos;re asking:
            </p>
          </ScrollReveal>

          <StaggerContainer className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {BUYER_QUESTIONS.map(question => (
              <StaggerItem key={question}>
                <span className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-medium text-gray-200">
                  <Quote size={13} className="flex-shrink-0 text-purple-400" />
                  {question}
                </span>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <ScrollReveal delay={0.1} className="mt-12">
            <p className="text-xl font-semibold text-white">
              We help make sure those emails get a reply.
            </p>
            <p className="mx-auto mt-4 max-w-xl text-gray-400">
              Put both agents to work. See{' '}
              <Link href="/customers" className="text-emerald-400 underline-offset-4 hover:underline">
                how teams already use us
              </Link>{' '}
              or dig into our{' '}
              <Link
                href="/reports/ai-visibility-benchmark"
                className="text-emerald-400 underline-offset-4 hover:underline"
              >
                AI Visibility Benchmark
              </Link>
              .
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href={bookCallWith('Human-led AI visibility program — talk to the team')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button
                  size="xl"
                  className="h-14 w-full rounded-full bg-gradient-to-r from-purple-500 via-emerald-500 to-cyan-500 px-10 text-lg font-bold text-black hover:opacity-90 sm:w-auto"
                >
                  Talk to our team
                  <ArrowRight className="ml-2" size={20} />
                </Button>
              </a>
            </div>
            <p className="mt-8 text-sm font-medium uppercase tracking-[0.18em] text-gray-500">
              Human-led. AI-native. Built for the next generation of search.
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
