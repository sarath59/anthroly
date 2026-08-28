import React from 'react';
import { Check, Shield, ArrowRight, Sparkles, ClipboardCheck, Calendar } from 'lucide-react';
import {
  ANCHOR_LINE,
  BOOK_CALL_URL,
  COHORT_SLOTS,
  CONNECT_FEE_LABEL,
  CORE_OUTCOME,
  DAILY_UPDATE_LINE,
  DIAGNOSTIC_CREDIT_NOTE,
  DIAGNOSTIC_NAME,
  PACKAGE_RETAINER,
  PACKAGE_SETUP,
  PRIMARY_CTA_LABEL,
  SETUP_REFUND_NOTE,
  SLOTS_LINE,
  SPRINT_NAME,
} from '@/lib/site';
import { Button } from '../ui/button';
import { LogoStrip, TECH_COMPANIES } from '../ui/CompanyLogos';
import { GlowPulse, SpotlightCard, HoverTilt } from '../ui/static-fx';

const diagnosticPrep = [
  'Current outbound volume, reply rate, and list quality',
  '3–5 competitor outreach + link profiles',
  'Inbox, domain, and deliverability risk',
  'Existing backlink neighborhood (who already cites rivals)',
  'ICP tightness — who should never get an email',
  'Where a 1,000/day agent would waste budget vs print money',
];

const diagnosticAgenda = [
  { time: 'Start', label: 'Current pipeline reality' },
  { time: 'Build', label: 'Outreach agent design' },
  { time: 'Build', label: '24/7 backlink agent design' },
  { time: 'Loop', label: 'Compounding loop' },
  { time: 'Go live', label: `You sign off — then ${PACKAGE_SETUP}` },
];

const startFeeBegins = [
  {
    week: 'Build 1',
    title: 'ICP + infrastructure',
    items: ['ICP and exclusion list', 'Sending domains + warmup', 'Offer + proof points', 'Competitor link map', 'Agent access and guardrails'],
  },
  {
    week: 'Build 2',
    title: 'Outreach agent ready',
    items: ['Personalization engine', '1,000-email/day sequences', 'Follow-up that never drops', 'Reply routing to your inbox', 'Daily send dashboard'],
  },
  {
    week: 'Build 3',
    title: 'Backlink agent ready',
    items: ['Target neighborhood locked', '24/7 prospecting + pitching', 'Quality filters (no junk, no PBNs)', 'Placement tracking', 'First editorial wins in motion'],
  },
  {
    week: 'Build 4',
    title: 'The loop',
    items: ['Links feeding email proof', 'Reply handling playbook', 'CRM / pipeline wiring', 'Kill-switch rules', 'Operating cadence after go-live'],
  },
];

const retainerIncludes = [
  '1,000 emails/day outreach agent',
  '24/7 backlink agent',
  'We maintain and run both agents',
  'Daily updates',
  'List + ICP refresh',
  'Deliverability watch',
  'Link quality QA',
];

export const Pricing = () => {

  return (
    <section id="pricing" className="py-24 md:py-32 bg-transparent text-white relative overflow-hidden">
      <div className="absolute inset-0">
        <GlowPulse className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" color="emerald" size={800} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className={`max-w-4xl mx-auto text-center mb-12 transition-all duration-1000 opacity-100 translate-y-0`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 text-emerald-300 rounded-full text-sm font-semibold mb-6 border border-emerald-500/30">
            <Sparkles size={16} />
            <span>Only {COHORT_SLOTS} slots. {CONNECT_FEE_LABEL} claims one.</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            {CORE_OUTCOME.replace(/\.$/, '')}.
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 leading-relaxed mb-4">
            {SLOTS_LINE} {CONNECT_FEE_LABEL} {DIAGNOSTIC_NAME.toLowerCase()} claims a slot and we begin building both agents.
            You pay the {PACKAGE_SETUP} {SPRINT_NAME.toLowerCase()} only when you are happy. Then {PACKAGE_RETAINER}/month
            to run them — with a daily update.
          </p>
          <p className="text-sm text-gray-500 max-w-2xl mx-auto">
            {ANCHOR_LINE}
          </p>
        </div>

        {/* Start fee — the first purchase */}
        <div className={`max-w-4xl mx-auto mb-10 transform transition-all duration-1000 delay-200 relative translate-y-0 opacity-100`}>
          <HoverTilt className="relative group" intensity={4}>
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 rounded-3xl blur opacity-50 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-pulse"></div>

            <SpotlightCard className="rounded-3xl">
              <div className="relative bg-gray-900 rounded-3xl p-8 md:p-12 border border-gray-800">
                <div className="text-center mb-8">
                  <p className="text-sm font-semibold uppercase tracking-wider text-emerald-400 mb-2">
                    Step 1 · {CONNECT_FEE_LABEL} {DIAGNOSTIC_NAME.toLowerCase()}
                  </p>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">{CONNECT_FEE_LABEL} {DIAGNOSTIC_NAME}</h3>
                  <p className="text-gray-400 max-w-xl mx-auto">
                    Claims a slot and we begin building both AI agents — outreach at 1,000 emails/day and the 24/7 backlink hunter. You do not pay the {PACKAGE_SETUP} {SPRINT_NAME.toLowerCase()} until you are happy.
                  </p>
                </div>

                <div className="flex items-center justify-center gap-4 mb-6">
                  <div className="flex items-baseline">
                    <span className="text-6xl md:text-7xl font-bold text-white">{CONNECT_FEE_LABEL}</span>
                  </div>
                </div>

                <p className="text-center text-sm text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-3 mb-8 max-w-2xl mx-auto">
                  {DIAGNOSTIC_CREDIT_NOTE}
                </p>

                <div className="grid md:grid-cols-2 gap-8 mb-10">
                  <div>
                    <div className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                      <ClipboardCheck size={16} className="text-emerald-400" />
                      What we lock in while we build
                    </div>
                    <ul className="space-y-3">
                      {diagnosticPrep.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-gray-300">
                          <div className="mt-0.5 flex-shrink-0 w-5 h-5 bg-emerald-500/30 rounded-full flex items-center justify-center">
                            <Check size={12} className="text-emerald-300" />
                          </div>
                          <span className="text-sm leading-tight">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                      <Calendar size={16} className="text-cyan-400" />
                      How the build rolls out
                    </div>
                    <ul className="space-y-3">
                      {diagnosticAgenda.map((item) => (
                        <li key={item.label} className="flex items-center justify-between gap-3 p-3 bg-black/40 border border-gray-800 rounded-xl">
                          <span className="text-sm text-white">{item.label}</span>
                          <span className="text-xs font-semibold text-cyan-400">{item.time}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mb-10">
                  <h4 className="text-sm font-bold text-white mb-4 text-center">What the {CONNECT_FEE_LABEL} start fee begins</h4>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {startFeeBegins.map((week) => (
                      <div key={week.week} className="p-5 rounded-2xl bg-black/40 border border-gray-800">
                        <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-1">{week.week}</div>
                        <h4 className="text-lg font-bold text-white mb-3">{week.title}</h4>
                        <ul className="space-y-2">
                          {week.items.map((item) => (
                            <li key={item} className="flex items-start gap-2 text-sm text-gray-400">
                              <Check size={14} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                <p className="text-sm text-gray-400 text-center mb-6">
                  After this: both agents are being built. You pay the {PACKAGE_SETUP} {SPRINT_NAME.toLowerCase()} only when you are happy. Then {PACKAGE_RETAINER}/month to run them — with a daily update.
                </p>

                <a href={BOOK_CALL_URL} target="_blank" rel="noopener noreferrer" className="block w-full">
                  <Button className="w-full h-14 md:h-16 text-lg md:text-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-black hover:from-emerald-400 hover:to-cyan-400 rounded-2xl font-bold shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.02] hover:shadow-emerald-500/40">
                    {PRIMARY_CTA_LABEL}
                    <ArrowRight className="ml-2" size={22} />
                  </Button>
                </a>
              </div>
            </SpotlightCard>
          </HoverTilt>
        </div>

        {/* Go-live + retainer */}
        <div className={`max-w-4xl mx-auto transition-all duration-1000 delay-300 opacity-100 translate-y-0`}>
          <div className="bg-gray-900/80 rounded-3xl p-8 md:p-12 border border-gray-800">
            <div className="text-center mb-10">
              <p className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-2">
                Step 2 · Once you are happy
              </p>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                {PACKAGE_SETUP} {SPRINT_NAME.toLowerCase()} + {PACKAGE_RETAINER}/month
              </h3>
              <p className="text-gray-400">
                The {PACKAGE_SETUP} is a one-time {SPRINT_NAME.toLowerCase()} when both agents are live and you sign off. Then {PACKAGE_RETAINER}/month to run them and send you a daily update.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <div className="p-6 rounded-2xl bg-black/40 border border-white/10">
                <div className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">{SPRINT_NAME}</div>
                <div className="text-4xl font-bold text-white mb-2">{PACKAGE_SETUP}</div>
                <p className="text-sm text-gray-400 mb-4">One-time. Charged only when you are happy and both agents are live.</p>
                <div className="flex items-start gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                  <Shield className="text-emerald-400 flex-shrink-0 mt-0.5" size={16} />
                  <p className="text-xs text-emerald-200">{SETUP_REFUND_NOTE}</p>
                </div>
              </div>
              <div className="p-6 rounded-2xl bg-black/40 border border-emerald-500/20">
                <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2">We run them</div>
                <div className="text-4xl font-bold text-emerald-400 mb-2">{PACKAGE_RETAINER}/mo</div>
                <p className="text-sm text-gray-400 mb-4">{DAILY_UPDATE_LINE}</p>
                <div className="flex flex-wrap gap-2">
                  {retainerIncludes.map((item) => (
                    <span key={item} className="text-xs text-gray-300 px-3 py-1.5 rounded-full bg-black/40 border border-gray-800">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-800">
              <div className="flex items-center justify-center gap-3 mb-3">
                <Shield className="text-emerald-400" size={24} />
                <span className="text-lg font-bold">The {PACKAGE_SETUP} is the number that comes back</span>
              </div>
              <p className="text-sm text-center text-gray-400 leading-relaxed max-w-lg mx-auto">
                {SETUP_REFUND_NOTE} No call to &quot;save&quot; you. No leftover credit. The {PACKAGE_SETUP} {SPRINT_NAME.toLowerCase()} comes back.
              </p>
            </div>
          </div>
        </div>

        <div className={`mt-16 max-w-4xl mx-auto transition-all duration-1000 delay-500 opacity-100 translate-y-0`}>
          <div className="p-8 bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-blue-500/10 border border-emerald-500/20 rounded-3xl">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">Only {COHORT_SLOTS} slots. Why {CONNECT_FEE_LABEL} first.</h3>
              <p className="text-gray-400 max-w-2xl mx-auto mb-6">
                We set up and run the agents ourselves. That is why there are only {COHORT_SLOTS} slots.
                {CONNECT_FEE_LABEL} claims a slot and we start building. You pay the {PACKAGE_SETUP} {SPRINT_NAME.toLowerCase()} when you are happy.
                Then {PACKAGE_RETAINER}/month to keep them hunting — with a daily update. If that feeling ever breaks, the {PACKAGE_SETUP} comes back.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-5 bg-black/50 rounded-xl">
                  <div className="text-3xl font-bold text-white mb-1">{CONNECT_FEE_LABEL}</div>
                  <div className="text-sm text-gray-500">Start fee · claim a slot · we begin building</div>
                </div>
                <div className="p-5 bg-black/50 rounded-xl">
                  <div className="text-3xl font-bold text-white mb-1">{PACKAGE_SETUP}</div>
                  <div className="text-sm text-gray-500">Go-live fee · only when you are happy · refundable</div>
                </div>
                <div className="p-5 bg-black/50 rounded-xl">
                  <div className="text-3xl font-bold text-emerald-400 mb-1">{PACKAGE_RETAINER}/mo</div>
                  <div className="text-sm text-gray-500">We run the agents every month + daily updates</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={`mt-12 transition-all duration-1000 delay-600 opacity-100 translate-y-0`}>
          <LogoStrip
            companies={TECH_COMPANIES}
            label="Secure payments & enterprise infrastructure"
            size="sm"
          />
        </div>
      </div>
    </section>
  );
};
