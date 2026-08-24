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
} from '../ui/animated-elements';

function bookCallWith(_note: string): string {
  return BOOK_CALL_URL;
}

/** What shifts underneath your AI visibility every week */
const WHAT_CHANGES = [
  {
    label: 'The answers change',
    detail: 'Every model update rewrites who gets named, cited, and recommended.',
    icon: MessageCircleQuestion,
  },
  {
    label: 'The sources change',
    detail: 'Engines rotate the publications, reviews, and pages they trust.',
    icon: Newspaper,
  },
  {
    label: 'Your competitors change',
    detail: 'Rivals publish, pitch, and optimize for the same prompts you care about.',
    icon: Scale,
  },
  {
    label: "Your customers' questions change",
    detail: 'New prompts appear weekly as buyers learn to research with AI.',
    icon: Compass,
  },
];

/** Workstreams the research team runs every day */
const TEAM_WORKSTREAMS = [
  { label: 'AI search visibility', icon: LineChart },
  { label: 'Brand recommendations', icon: BadgeCheck },
  { label: 'Competitive intelligence', icon: Scale },
  { label: 'Original research', icon: FileSearch },
  { label: 'Content & authority', icon: BookOpenCheck },
  { label: 'Digital PR opportunities', icon: Newspaper },
  { label: 'Third-party visibility', icon: Globe2 },
  { label: 'Citation opportunities', icon: Link2 },
  { label: 'Citation neighborhoods', icon: Globe2 },
  { label: 'Industry research', icon: Building2 },
  { label: 'Brand reputation', icon: ShieldCheck },
];

/** The battlegrounds where brands win or lose AI recommendations */
const COMPETE_FOR = [
  {
    name: 'Category recommendations',
    detail:
      'Be in the consideration set when buyers ask ChatGPT, Gemini, Claude, or Perplexity for the best companies, products, and services in your category.',
    icon: Award,
    color: 'emerald',
  },
  {
    name: 'High-intent questions',
    detail:
      'Strengthen your presence around the pricing, comparison, and "is it worth it" questions customers ask AI immediately before they buy.',
    icon: MessageCircleQuestion,
    color: 'cyan',
  },
  {
    name: 'Competitive comparisons',
    detail:
      'Improve how answer engines frame your brand when a prompt puts you head-to-head with competitors and alternatives.',
    icon: Scale,
    color: 'purple',
  },
  {
    name: 'Industry authority',
    detail:
      'Build the original research, data, and evidence that establish your brand as a credible source AI systems keep returning to.',
    icon: Building2,
    color: 'blue',
  },
  {
    name: 'AI citations',
    detail:
      'Increase the likelihood that answer engines discover, crawl, and reference your pages when they assemble an answer.',
    icon: Link2,
    color: 'amber',
  },
];

const BUYER_QUESTIONS = [
  "What's the best option for me?",
  'Which company should I choose?',
  'What are the alternatives?',
  'Which product is most reliable?',
  'What do experts recommend?',
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
            Human-led · Discover layer
          </div>

          <h2
            id="human-led-ai-visibility-heading"
            className="text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl"
          >
            <span className="block text-white">Make AI recommend</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-emerald-400 to-cyan-400">
              your brand
            </span>
          </h2>

          <p className="mx-auto mt-7 max-w-2xl text-xl font-medium leading-relaxed text-gray-200">
            Your customers ask ChatGPT who to buy from. This is the Discover layer: we make you easier to find in AI answers — then founder authority and outreach turn that attention into conversations.
          </p>

          <div className="mx-auto mt-8 max-w-2xl space-y-4 text-lg leading-relaxed text-gray-400">
            <p>
              ChatGPT, Gemini, Claude, Perplexity, and other AI platforms are becoming part of the
              buying journey. But getting your brand mentioned isn&apos;t enough.{' '}
              <strong className="font-semibold text-white">
                You need AI to understand why your brand should be recommended.
              </strong>
            </p>
            <p>
              Our team works continuously to improve your brand&apos;s presence, authority, and
              recommendations across{' '}
              <Link href="/aeo" className="text-emerald-400 underline-offset-4 hover:underline">
                AI search
              </Link>
              .
            </p>
          </div>

          <div className="mx-auto mt-8 w-fit rounded-2xl border border-purple-500/25 bg-purple-500/10 px-6 py-4">
            <p className="text-base font-semibold text-purple-200 md:text-lg">
              Researchers and writers work your category every week — not a dashboard you log into alone.
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
              Your AI search presence,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                managed by humans
              </span>
            </h3>
            <p className="mt-5 text-lg leading-relaxed text-gray-400">
              AI visibility isn&apos;t something you fix once. That&apos;s why we run a continuous,
              human-led AI visibility service—the managed alternative to yet another{' '}
              <Link
                href="/aeo/aeo-vs-seo-vs-geo"
                className="text-emerald-400 underline-offset-4 hover:underline"
              >
                AEO
              </Link>{' '}
              dashboard.
            </p>
            <p className="mt-4 leading-relaxed text-gray-400">
              Our research team monitors how AI platforms perceive your brand, identifies
              opportunities to strengthen your presence, and continuously develops the content,
              research, and evidence your brand needs to become more authoritative in AI search.
            </p>
            <p className="mt-6 text-lg font-semibold text-white">
              You don&apos;t get a dashboard and a list of recommendations.{' '}
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
              Humans research and write.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-emerald-400">
                One mission:
              </span>{' '}
              get your brand recommended.
            </h3>
            <p className="mt-5 text-lg text-gray-400">
              Behind your AI visibility program is a dedicated team of researchers, strategists,
              writers, analysts, and content specialists. Every day, they work across:
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
              Software can tell you that your visibility changed.{' '}
              <span className="font-semibold text-white">
                Our people work on why it changed—and what to do next.
              </span>
            </p>
          </ScrollReveal>
        </div>

        {/* ── Mentioned vs recommended ─────────────────────────── */}
        <div className="mx-auto mt-24 max-w-5xl md:mt-32">
          <ScrollReveal className="mx-auto max-w-3xl text-center">
            <h3 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              We don&apos;t just track AI.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                We work to change what AI says about your brand.
              </span>
            </h3>
            <p className="mt-5 text-lg text-gray-400">
              Most AEO solutions stop at monitoring. We go further—continuously studying your
              brand&apos;s presence across AI search and strengthening the information, authority,
              and evidence surrounding it.
            </p>
          </ScrollReveal>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            <ScrollReveal delay={0.05}>
              <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-black/40 p-8">
                <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  The goal isn&apos;t simply
                </p>
                <p className="text-2xl font-semibold text-gray-500 md:text-3xl">
                  &ldquo;Your brand was mentioned.&rdquo;
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
                  &ldquo;Your brand became the recommendation.&rdquo;
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* ── Built for brands that depend on being chosen ─────── */}
        <div className="mx-auto mt-24 max-w-6xl md:mt-32">
          <ScrollReveal className="mx-auto max-w-3xl text-center">
            <h3 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Built for brands that depend on being chosen
            </h3>
            <p className="mt-5 text-lg text-gray-400">
              Enterprise software, consumer brands, financial platforms, healthcare companies,
              marketplaces, fast-growing startups—your customers are increasingly using AI to
              research their options. We help make sure your brand is visible throughout that
              journey.
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
                    See where you stand today
                  </h4>
                  <p className="text-sm leading-relaxed text-gray-300">
                    Start with a human-reviewed audit of how answer engines describe, compare, and
                    recommend your brand right now.
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
                  Your AI visibility team,{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-emerald-400">
                    without hiring 40 people
                  </span>
                </h3>
                <p className="mt-5 leading-relaxed text-gray-400">
                  Building an internal AI search team means recruiting researchers, content
                  strategists, analysts, writers, SEO specialists, and PR expertise—then managing
                  all of it. Instead, get access to an entire team already working on your brand.
                </p>
                <ul className="mt-6 space-y-2.5 text-sm text-gray-300">
                  {['No hiring.', 'No managing freelancers.', 'No building an AEO department from scratch.'].map(
                    item => (
                      <li key={item} className="flex items-center gap-3">
                        <BadgeCheck size={16} className="flex-shrink-0 text-emerald-400" />
                        {item}
                      </li>
                    )
                  )}
                </ul>
                <p className="mt-6 font-semibold text-white">
                  Just a team working continuously to grow your presence in AI search.
                </p>
              </div>

              <div className="grid content-center gap-4">
                {[
                  { stat: 'Human-led', label: 'researchers, writers, operators — not a dashboard' },
                  { stat: 'Every day', label: 'research, content, and outreach in motion' },
                  { stat: 'One focus', label: 'your visibility across answer engines' },
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
              The new search is already here.
            </h3>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-400">
              Your customers aren&apos;t only searching Google anymore. They&apos;re asking:
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
              We help make sure your brand is ready for those answers.
            </p>
            <p className="mx-auto mt-4 max-w-xl text-gray-400">
              Put your brand in the conversation. Get a dedicated human team working on your AI
              visibility—see{' '}
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
