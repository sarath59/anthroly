"use client"

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Bot,
  Check,
  Crosshair,
  FileText,
  Gauge,
  Link2,
  Megaphone,
  MessageSquare,
  Play,
  Quote,
  Search,
  Sparkles,
  Target,
  Upload,
} from 'lucide-react';
import { BOOK_CALL_URL, PRIMARY_CTA_LABEL } from '@/lib/site';
import { currentPageParam, DATAFAST_GOALS, trackGoal } from '@/lib/datafast';
import { Button } from '../ui/button';
import {
  GlowPulse,
  GradientBeam,
  ScrollReveal,
  SpotlightCard,
  StaggerContainer,
  StaggerItem,
} from '../ui/animated-elements';

const ROTATING_SURFACES = ['AI answers', 'ChatGPT', 'Claude', 'Perplexity', 'AI Overviews', 'Gemini'];

const PLATFORM_MODULES = [
  {
    name: 'Prompt Volumes',
    tagline: 'See what millions of people ask AI, and align strategy with demand.',
    detail: 'We map the prompts your buyers actually type, cluster them by intent, and turn them into a publishing queue.',
    href: '/tools',
    icon: Search,
    color: 'emerald',
  },
  {
    name: 'Answer Engine Insights',
    tagline: 'See how AI represents your brand in every conversation.',
    detail: 'Track sentiment, competitor share of answer, and the sources each engine cites when it describes you.',
    href: '/aeo',
    icon: MessageSquare,
    color: 'cyan',
  },
  {
    name: 'Agents',
    tagline: 'Autonomous workers for every function of your marketing team.',
    detail: 'Research, briefs, drafts, FAQ blocks, schema, and outreach lists—run by agents, reviewed by our strategists.',
    href: '/#features',
    icon: Bot,
    color: 'purple',
  },
  {
    name: 'Agent Analytics',
    tagline: 'Track how your site is interpreted and crawled by ChatGPT, Gemini, Claude, Perplexity, and more.',
    detail: 'Bot-level crawl logs show which pages each engine fetches, how often, and what it takes away.',
    href: '/aeo/engine/chatgpt',
    icon: BarChart3,
    color: 'blue',
  },
  {
    name: 'Aim',
    tagline: 'Find the highest-impact work for your brand, every week.',
    detail: 'A prioritised queue of the pages, prompts, and citations worth fixing next—shipped in your weekly report.',
    href: '/#how-it-works',
    icon: Crosshair,
    color: 'amber',
  },
];

const CHANNEL_AGENTS = [
  {
    name: 'AEO & SEO',
    promise: 'Increase AI Search visibility',
    detail: 'Answer-first pages, schema, and internal links built so engines can quote you cleanly.',
    href: '/aeo',
    icon: Target,
    color: 'emerald',
  },
  {
    name: 'Content & Demand',
    promise: 'Drive human and bot traffic',
    detail: '15 human-reviewed blogs a month, plus glossary and comparison pages that earn citations.',
    href: '/#features',
    icon: FileText,
    color: 'cyan',
  },
  {
    name: 'PR & Communications',
    promise: 'Shape AI conversations',
    detail: '15–25 high-DR placements a month, because engines repeat what credible sources say about you.',
    href: '/#pricing',
    icon: Megaphone,
    color: 'purple',
  },
];

const REPORT_CHECKS = ['AI Visibility', 'Source Citations', 'Brand Sentiment', 'Content AEO'];

const TRY_AGENTS = [
  {
    id: 'demand',
    name: 'Demand Gen Agent',
    output: 'Finds the 20 highest-volume prompts in your category and the pages that answer them.',
  },
  {
    id: 'brand',
    name: 'Brand Agent',
    output: 'Audits how ChatGPT, Claude, and Perplexity describe you today—and what they get wrong.',
  },
  {
    id: 'content',
    name: 'Content Agent',
    output: 'Generates AEO-optimised FAQ blocks and schema for any landing page you point it at.',
  },
];

const RESOURCES = [
  {
    label: 'Report',
    title: 'AI Visibility Benchmark',
    description: 'How brands are actually being cited across answer engines, with our own program data.',
    href: '/reports/ai-visibility-benchmark',
  },
  {
    label: 'Playbook',
    title: 'How to get cited in AI Overviews',
    description: 'The exact structure, schema, and sourcing that makes a page quotable.',
    href: '/aeo/how-to-get-cited-in-ai-overviews',
  },
  {
    label: 'Guides',
    title: 'AEO vs SEO vs GEO',
    description: 'What changed, what still works, and where to spend your next hour of effort.',
    href: '/aeo/aeo-vs-seo-vs-geo',
  },
];

const EXPLORE_COLUMNS = [
  {
    heading: 'Platform',
    links: [
      { label: 'Answer Engine Optimization', href: '/aeo' },
      { label: 'AEO for ChatGPT', href: '/aeo/engine/chatgpt' },
      { label: 'AEO for Claude', href: '/aeo/engine/claude' },
      { label: 'AEO for Perplexity', href: '/aeo/engine/perplexity' },
      { label: 'AI Overviews', href: '/aeo/engine/google-ai-overviews' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { label: 'Blog', href: '/blog' },
      { label: 'Guides & resources', href: '/resources' },
      { label: 'Free tools', href: '/tools' },
      { label: 'Glossary', href: '/glossary' },
      { label: 'AI Visibility Benchmark', href: '/reports/ai-visibility-benchmark' },
    ],
  },
  {
    heading: 'Solutions',
    links: [
      { label: 'For SaaS founders', href: '/for/saas-founders' },
      { label: 'For marketing directors', href: '/for/marketing-directors' },
      { label: 'For agency owners', href: '/for/agency-owners' },
      { label: 'Industries', href: '/industries' },
      { label: 'Integrations', href: '/integrations' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'Customer stories', href: '/customers' },
      { label: 'Pricing', href: '/#pricing' },
      { label: 'Comparisons', href: '/compare' },
      { label: 'Anthroly vs Anthropic', href: '/anthroly-vs-anthropic' },
      { label: 'AI SEO agency', href: '/ai-seo-agency' },
    ],
  },
];

const COLOR_MAP: Record<string, { border: string; text: string; glow: string; chip: string }> = {
  emerald: {
    border: 'hover:border-emerald-500/40',
    text: 'text-emerald-400',
    glow: 'rgba(16,185,129,0.30)',
    chip: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300',
  },
  cyan: {
    border: 'hover:border-cyan-500/40',
    text: 'text-cyan-400',
    glow: 'rgba(34,211,238,0.28)',
    chip: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300',
  },
  purple: {
    border: 'hover:border-purple-500/40',
    text: 'text-purple-400',
    glow: 'rgba(168,85,247,0.28)',
    chip: 'bg-purple-500/10 border-purple-500/30 text-purple-300',
  },
  blue: {
    border: 'hover:border-blue-500/40',
    text: 'text-blue-400',
    glow: 'rgba(59,130,246,0.28)',
    chip: 'bg-blue-500/10 border-blue-500/30 text-blue-300',
  },
  amber: {
    border: 'hover:border-amber-500/40',
    text: 'text-amber-400',
    glow: 'rgba(245,158,11,0.28)',
    chip: 'bg-amber-500/10 border-amber-500/30 text-amber-300',
  },
};

function bookCallWith(note: string): string {
  return `${BOOK_CALL_URL}?notes=${encodeURIComponent(note)}`;
}

const RotatingSurface = ({ index }: { index: number }) => (
  <span className="relative inline-flex min-w-[1ch] align-bottom">
    <AnimatePresence mode="wait" initial={false}>
      <motion.span
        key={ROTATING_SURFACES[index]}
        initial={{ opacity: 0, y: '0.35em', filter: 'blur(6px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        exit={{ opacity: 0, y: '-0.35em', filter: 'blur(6px)' }}
        transition={{ duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400"
      >
        {ROTATING_SURFACES[index]}
      </motion.span>
    </AnimatePresence>
  </span>
);

export const MarketingAgents = () => {
  const [surfaceIndex, setSurfaceIndex] = useState(0);
  const [consoleTab, setConsoleTab] = useState<'publish' | 'test'>('publish');
  const [reportUrl, setReportUrl] = useState('');
  const [agentEmail, setAgentEmail] = useState('');
  const [activeAgent, setActiveAgent] = useState(TRY_AGENTS[0].id);

  useEffect(() => {
    const interval = setInterval(() => {
      setSurfaceIndex(prev => (prev + 1) % ROTATING_SURFACES.length);
    }, 2600);
    return () => clearInterval(interval);
  }, []);

  const selectedAgent = TRY_AGENTS.find(agent => agent.id === activeAgent) ?? TRY_AGENTS[0];

  return (
    <section
      id="marketing-agents"
      className="relative overflow-hidden bg-transparent py-24 text-white md:py-32"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(16,185,129,0.10),_transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,_rgba(255,255,255,0.04)_1px,_transparent_1px),linear-gradient(to_bottom,_rgba(255,255,255,0.04)_1px,_transparent_1px)] bg-[size:64px_64px] opacity-40 [mask-image:radial-gradient(ellipse_at_center,_black,_transparent_75%)]" />
        <GlowPulse className="-top-20 left-1/4" color="emerald" size={620} />
        <GlowPulse className="bottom-0 right-1/5" color="cyan" size={520} />
      </div>

      <div className="container relative z-10 mx-auto px-4 lg:px-8">
        {/* ── Headline ─────────────────────────────────────────── */}
        <ScrollReveal className="mx-auto max-w-5xl text-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-gray-300 backdrop-blur">
            <Sparkles size={14} className="text-emerald-400" />
            The AI answer layer
          </div>

          <h2 className="text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="block text-white">Marketing agents to win in</span>
            <span className="block">
              <RotatingSurface index={surfaceIndex} />
            </span>
          </h2>

          <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-gray-400 md:text-xl">
            Reach millions of consumers who are using AI to discover new products and brands.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a href={BOOK_CALL_URL} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
              <Button
                size="xl"
                className="h-14 w-full rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 px-10 text-lg font-bold text-black shadow-[0_0_50px_-12px_rgba(16,185,129,0.5)] transition-all hover:from-emerald-400 hover:to-cyan-400 hover:shadow-[0_0_70px_-15px_rgba(16,185,129,0.7)] sm:w-auto"
              >
                {PRIMARY_CTA_LABEL}
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </a>
            <Link href="/#pricing" className="w-full sm:w-auto">
              <Button
                size="xl"
                variant="outline"
                className="h-14 w-full rounded-full border-white/20 px-10 text-lg font-bold text-white hover:bg-white/10 sm:w-auto"
              >
                Get started
              </Button>
            </Link>
          </div>
        </ScrollReveal>

        {/* ── Agent console mock ───────────────────────────────── */}
        <ScrollReveal delay={0.15} className="mx-auto mt-16 max-w-5xl">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-black/60 p-2 shadow-[0_40px_120px_-40px_rgba(16,185,129,0.35)] backdrop-blur">
            <GradientBeam color="emerald" />
            <div className="relative rounded-[20px] border border-white/10 bg-black/70">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-5 py-4">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-500/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
                  <span className="ml-3 font-mono text-xs text-gray-500">anthroly / content-agent</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setConsoleTab('publish')}
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                      consoleTab === 'publish'
                        ? 'bg-emerald-500 text-black'
                        : 'border border-white/10 text-gray-400 hover:text-white'
                    }`}
                  >
                    <Upload size={13} />
                    Publish
                  </button>
                  <button
                    type="button"
                    onClick={() => setConsoleTab('test')}
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                      consoleTab === 'test'
                        ? 'bg-white text-black'
                        : 'border border-white/10 text-gray-400 hover:text-white'
                    }`}
                  >
                    <Play size={13} />
                    Run test
                  </button>
                </div>
              </div>

              <div className="grid gap-6 p-6 md:grid-cols-[1.1fr_0.9fr] md:p-8">
                <div>
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                    {consoleTab === 'publish' ? 'Queued this week' : 'Prompt under test'}
                  </p>
                  {consoleTab === 'publish' ? (
                    <ul className="space-y-3">
                      {[
                        'FAQ block + schema for /pricing',
                        'Comparison page: you vs top 3 alternatives',
                        'Glossary entry: answer engine optimization',
                        'Outreach batch — 6 DR 70+ prospects',
                      ].map(item => (
                        <li
                          key={item}
                          className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.03] px-4 py-3 text-sm text-gray-300"
                        >
                          <Check size={16} className="mt-0.5 flex-shrink-0 text-emerald-400" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="space-y-4">
                      <div className="rounded-xl border border-white/5 bg-white/[0.03] px-4 py-3 font-mono text-sm text-gray-300">
                        &ldquo;What&apos;s the best tool for tracking brand mentions in AI search?&rdquo;
                      </div>
                      <p className="text-sm text-gray-500">
                        We run the prompt across engines, capture who gets named, and log every source cited.
                      </p>
                    </div>
                  )}
                </div>

                <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent p-5">
                  <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Answer engines watched
                  </p>
                  <div className="space-y-3">
                    {[
                      { engine: 'ChatGPT', share: 78 },
                      { engine: 'Claude', share: 64 },
                      { engine: 'Perplexity', share: 71 },
                      { engine: 'AI Overviews', share: 58 },
                    ].map(row => (
                      <div key={row.engine}>
                        <div className="mb-1.5 flex items-center justify-between text-xs">
                          <span className="text-gray-300">{row.engine}</span>
                          <span className="font-mono text-gray-500">{row.share}%</span>
                        </div>
                        <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                          <motion.div
                            className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-cyan-400"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${row.share}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.1, ease: [0.21, 0.47, 0.32, 0.98] }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="mt-5 text-xs leading-relaxed text-gray-500">
                    Illustrative view of the visibility tracking included in every Anthroly program.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* ── Trusted by ───────────────────────────────────────── */}
        <ScrollReveal delay={0.1} className="mx-auto mt-16 max-w-4xl text-center">
          <p className="mb-6 text-xs uppercase tracking-[0.2em] text-gray-500">
            Used by some of the sharpest marketers on the internet
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {[
              { brand: 'llmoutrank', slug: 'llmoutrank' },
              { brand: 'isthisaiorno.com', slug: 'isthisaiorno' },
              { brand: 'Jobstronauts', slug: 'jobstronauts' },
            ].map(customer => (
              <Link
                key={customer.slug}
                href={`/customers/${customer.slug}`}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-2.5 text-sm font-medium text-gray-300 transition-all hover:border-emerald-500/30 hover:text-white"
              >
                {customer.brand}
                <ArrowUpRight size={14} className="text-gray-500" />
              </Link>
            ))}
          </div>
        </ScrollReveal>

        {/* ── Big statement ────────────────────────────────────── */}
        <ScrollReveal delay={0.1} className="mx-auto mt-24 max-w-4xl text-center md:mt-32">
          <p className="text-2xl font-semibold leading-snug text-white sm:text-3xl md:text-4xl">
            Over 100 million people search with AI every day. Brands that aren&apos;t recommended get
            left behind.
          </p>
          <p className="mt-6 text-xl text-gray-400 md:text-2xl">
            Anthroly ensures yours isn&apos;t one of them.
          </p>
        </ScrollReveal>

        {/* ── Platform modules ─────────────────────────────────── */}
        <div className="mx-auto mt-24 max-w-6xl md:mt-32">
          <ScrollReveal className="mx-auto max-w-3xl text-center">
            <h3 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Scale your presence,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                not your workload
              </span>
            </h3>
            <p className="mt-5 text-lg text-gray-400">
              Anthroly is the full-stack marketing layer for the marketer of the future. Understand,
              analyze, build, and measure—all in one program.
            </p>
          </ScrollReveal>

          <StaggerContainer className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {PLATFORM_MODULES.map(module => {
              const Icon = module.icon;
              const colors = COLOR_MAP[module.color];
              return (
                <StaggerItem key={module.name} className="h-full">
                  <SpotlightCard
                    className={`h-full rounded-2xl border border-white/10 bg-black/40 transition-colors ${colors.border}`}
                    spotlightColor={colors.glow}
                  >
                    <Link href={module.href} className="group flex h-full flex-col p-6">
                      <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                        <Icon size={20} className={colors.text} />
                      </div>
                      <h4 className="mb-2 text-lg font-bold text-white">{module.name}</h4>
                      <p className="mb-3 text-sm font-medium text-gray-300">{module.tagline}</p>
                      <p className="mb-6 flex-1 text-sm leading-relaxed text-gray-500">{module.detail}</p>
                      <span
                        className={`inline-flex items-center gap-2 text-sm font-semibold ${colors.text} transition-all group-hover:gap-3`}
                      >
                        Learn more
                        <ArrowRight size={15} />
                      </span>
                    </Link>
                  </SpotlightCard>
                </StaggerItem>
              );
            })}

            <StaggerItem className="h-full">
              <div className="flex h-full flex-col justify-between rounded-2xl border border-emerald-500/25 bg-gradient-to-br from-emerald-500/15 via-cyan-500/10 to-transparent p-6">
                <div>
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-black/30">
                    <Gauge size={20} className="text-emerald-400" />
                  </div>
                  <h4 className="mb-2 text-lg font-bold text-white">One program, one team</h4>
                  <p className="text-sm leading-relaxed text-gray-300">
                    Every module above ships as part of a single managed engagement—senior strategists
                    with agents doing the heavy lifting.
                  </p>
                </div>
                <a href={BOOK_CALL_URL} target="_blank" rel="noopener noreferrer" className="mt-6">
                  <Button className="w-full rounded-xl bg-white font-semibold text-black hover:bg-gray-200">
                    {PRIMARY_CTA_LABEL}
                    <ArrowRight size={16} className="ml-2" />
                  </Button>
                </a>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>

        {/* ── Testimonial ──────────────────────────────────────── */}
        <ScrollReveal className="mx-auto mt-24 max-w-4xl md:mt-32">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-black/50 p-8 backdrop-blur md:p-12">
            <GlowPulse className="-right-20 -top-20" color="cyan" size={320} />
            <Quote size={44} className="relative mb-6 text-emerald-400/40" />
            <blockquote className="relative text-2xl font-semibold leading-snug text-white md:text-3xl">
              &ldquo;AI Search used to be a black box. Now it&apos;s a competitive advantage.&rdquo;
            </blockquote>
            <div className="relative mt-8 flex flex-wrap items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 text-lg font-bold text-black">
                GB
              </div>
              <div>
                <p className="font-semibold text-white">George Bonaci</p>
                <p className="text-sm text-gray-400">VP of Growth &amp; Demand</p>
              </div>
            </div>
            <p className="relative mt-8 rounded-2xl border border-white/10 bg-black/40 p-5 text-sm leading-relaxed text-gray-400">
              <span className="font-semibold text-gray-200">Our part in this:</span> Anthroly was a
              small piece of a much bigger program. We genuinely worked with this team—on AEO content
              and citation coverage—and we&apos;re not claiming credit for the whole result.
            </p>
          </div>
        </ScrollReveal>

        {/* ── Free AEO report ──────────────────────────────────── */}
        <ScrollReveal className="mx-auto mt-24 max-w-5xl md:mt-32">
          <div className="grid gap-8 rounded-3xl border border-white/10 bg-black/40 p-8 md:grid-cols-[1.05fr_0.95fr] md:p-12">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-300">
                AEO Report
              </div>
              <h3 className="text-3xl font-bold tracking-tight md:text-4xl">
                Get your free AEO Report today
              </h3>
              <p className="mt-4 text-gray-400">
                Discover how your brand performs on answer engines—and uncover the opportunities to
                outpace the competition.
              </p>

              <form
                className="mt-7 flex flex-col gap-3 sm:flex-row"
                onSubmit={event => {
                  event.preventDefault();
                  trackGoal(DATAFAST_GOALS.aeoReport, {
                    page: currentPageParam(),
                    website: (reportUrl || 'my website').slice(0, 255),
                  });
                  window.open(
                    bookCallWith(`Free AEO report request for ${reportUrl || 'my website'}`),
                    '_blank',
                    'noopener,noreferrer'
                  );
                }}
              >
                <label className="sr-only" htmlFor="aeo-report-url">
                  Enter your website URL
                </label>
                <input
                  id="aeo-report-url"
                  type="text"
                  inputMode="url"
                  value={reportUrl}
                  onChange={event => setReportUrl(event.target.value)}
                  placeholder="Enter your website URL"
                  className="flex-1 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/40"
                />
                <Button
                  type="submit"
                  className="rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-6 py-3 font-semibold text-black hover:from-emerald-400 hover:to-cyan-400"
                >
                  Analyze my brand
                </Button>
              </form>
            </div>

            <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent p-6">
              <p className="mb-5 text-sm font-semibold text-white">Get insights into:</p>
              <ul className="space-y-3">
                {REPORT_CHECKS.map(item => (
                  <li key={item} className="flex items-center gap-3 text-sm text-gray-300">
                    <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-emerald-500/15">
                      <Check size={13} className="text-emerald-400" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-xs leading-relaxed text-gray-500">
                A human reviews every report before it reaches you—no auto-generated PDF dumps.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* ── Channel agents ───────────────────────────────────── */}
        <div className="mx-auto mt-24 max-w-6xl md:mt-32">
          <ScrollReveal className="mx-auto max-w-3xl text-center">
            <h3 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Agents for every marketing channel
            </h3>
            <p className="mt-5 text-lg text-gray-400">
              Pick the outcome you need. The same team and the same agents run behind all three.
            </p>
          </ScrollReveal>

          <StaggerContainer className="mt-12 grid gap-5 md:grid-cols-3">
            {CHANNEL_AGENTS.map(agent => {
              const Icon = agent.icon;
              const colors = COLOR_MAP[agent.color];
              return (
                <StaggerItem key={agent.name} className="h-full">
                  <SpotlightCard
                    className={`h-full rounded-2xl border border-white/10 bg-black/40 transition-colors ${colors.border}`}
                    spotlightColor={colors.glow}
                  >
                    <Link href={agent.href} className="group flex h-full flex-col p-7">
                      <span
                        className={`mb-5 inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${colors.chip}`}
                      >
                        <Icon size={13} />
                        {agent.name}
                      </span>
                      <h4 className="mb-3 text-xl font-bold text-white">{agent.promise}</h4>
                      <p className="mb-6 flex-1 text-sm leading-relaxed text-gray-400">{agent.detail}</p>
                      <span
                        className={`inline-flex items-center gap-2 text-sm font-semibold ${colors.text} transition-all group-hover:gap-3`}
                      >
                        Learn more
                        <ArrowRight size={15} />
                      </span>
                    </Link>
                  </SpotlightCard>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>

        {/* ── Try an agent ─────────────────────────────────────── */}
        <ScrollReveal className="mx-auto mt-24 max-w-5xl md:mt-32">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-emerald-500/10 via-transparent to-cyan-500/10 p-8 md:p-12">
            <div className="grid gap-8 md:grid-cols-[1fr_1fr]">
              <div>
                <h3 className="text-3xl font-bold tracking-tight md:text-4xl">
                  Try an Anthroly Agent
                </h3>
                <p className="mt-4 text-gray-400">
                  Use one of our most popular agents to generate AEO-optimized FAQs for your landing
                  pages.
                </p>

                <form
                  className="mt-7 flex flex-col gap-3 sm:flex-row"
                  onSubmit={event => {
                    event.preventDefault();
                    trackGoal(DATAFAST_GOALS.tryAgent, {
                      page: currentPageParam(),
                      agent: selectedAgent.name.slice(0, 255),
                      email: (agentEmail || '').slice(0, 255),
                    });
                    window.open(
                      bookCallWith(
                        `Try an agent: ${selectedAgent.name}${agentEmail ? ` — ${agentEmail}` : ''}`
                      ),
                      '_blank',
                      'noopener,noreferrer'
                    );
                  }}
                >
                  <label className="sr-only" htmlFor="try-agent-email">
                    Enter your email
                  </label>
                  <input
                    id="try-agent-email"
                    type="email"
                    value={agentEmail}
                    onChange={event => setAgentEmail(event.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/40"
                  />
                  <Button
                    type="submit"
                    className="rounded-xl bg-white px-6 py-3 font-semibold text-black hover:bg-gray-200"
                  >
                    Try an Agent
                  </Button>
                </form>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/50 p-6">
                <div className="flex flex-wrap gap-2">
                  {TRY_AGENTS.map(agent => (
                    <button
                      key={agent.id}
                      type="button"
                      onClick={() => setActiveAgent(agent.id)}
                      className={`rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                        activeAgent === agent.id
                          ? 'bg-emerald-500 text-black'
                          : 'border border-white/10 text-gray-400 hover:text-white'
                      }`}
                    >
                      {agent.name}
                    </button>
                  ))}
                </div>
                <div className="mt-6 rounded-xl border border-white/5 bg-white/[0.03] p-5">
                  <p className="mb-2 font-mono text-xs uppercase tracking-wider text-emerald-400">
                    Output
                  </p>
                  <p className="text-sm leading-relaxed text-gray-300">{selectedAgent.output}</p>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* ── Resources ────────────────────────────────────────── */}
        <div className="mx-auto mt-24 max-w-6xl md:mt-32">
          <ScrollReveal className="mx-auto max-w-3xl text-center">
            <h3 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Learn the playbook we run
            </h3>
            <p className="mt-4 text-gray-400">
              Everything we publish is the same material we use on client programs.
            </p>
          </ScrollReveal>

          <StaggerContainer className="mt-12 grid gap-5 md:grid-cols-3">
            {RESOURCES.map(resource => (
              <StaggerItem key={resource.href} className="h-full">
                <Link
                  href={resource.href}
                  className="group flex h-full flex-col rounded-2xl border border-white/10 bg-black/40 p-6 transition-all hover:border-emerald-500/30 hover:bg-black/60"
                >
                  <span className="mb-4 w-fit rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                    {resource.label}
                  </span>
                  <h4 className="mb-2 text-lg font-bold text-white group-hover:text-emerald-400">
                    {resource.title}
                  </h4>
                  <p className="mb-5 flex-1 text-sm leading-relaxed text-gray-500">
                    {resource.description}
                  </p>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 transition-all group-hover:gap-3">
                    View details
                    <ArrowRight size={15} />
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        {/* ── Explore grid ─────────────────────────────────────── */}
        <ScrollReveal className="mx-auto mt-24 max-w-6xl md:mt-32">
          <div className="rounded-3xl border border-white/10 bg-black/30 p-8 md:p-12">
            <div className="mb-8 flex items-center gap-3">
              <Link2 size={18} className="text-emerald-400" />
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gray-400">
                Explore everything
              </p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {EXPLORE_COLUMNS.map(column => (
                <div key={column.heading}>
                  <p className="mb-4 text-sm font-bold text-white">{column.heading}</p>
                  <ul className="space-y-2.5">
                    {column.links.map(link => (
                      <li key={link.href + link.label}>
                        <Link
                          href={link.href}
                          className="text-sm text-gray-400 transition-colors hover:text-emerald-400"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* ── Closing CTA ──────────────────────────────────────── */}
        <ScrollReveal className="mx-auto mt-24 max-w-4xl text-center md:mt-32">
          <h3 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl">
            <span className="block text-white">Get your brand mentioned by</span>
            <span className="mt-2 block">
              <RotatingSurface index={surfaceIndex} />
            </span>
          </h3>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400">
            Reach millions of consumers who are using AI to discover new products and brands.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a href={BOOK_CALL_URL} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
              <Button
                size="xl"
                className="h-14 w-full rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 px-10 text-lg font-bold text-black hover:from-emerald-400 hover:to-cyan-400 sm:w-auto"
              >
                {PRIMARY_CTA_LABEL}
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </a>
            <Link href="/#pricing" className="w-full sm:w-auto">
              <Button
                size="xl"
                variant="outline"
                className="h-14 w-full rounded-full border-white/20 px-10 text-lg font-bold text-white hover:bg-white/10 sm:w-auto"
              >
                Get started
              </Button>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
