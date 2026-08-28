import React from 'react';
import { 
  CheckCircle2, 
  FileText, 
  Search, 
  Users, 
  Clock, 
  Shield,
  Zap,
  TrendingUp,
  Bot,
  Target,
  MessageCircleQuestion,
  Megaphone,
  Mail,
  Link2,
} from 'lucide-react';
import { GlowPulse } from '../ui/static-fx';
import { CORE_OUTCOME, IDENTITY_LINE, PACKAGE_RETAINER, PACKAGE_SETUP, SYSTEM_NAME } from '@/lib/site';

export const GuaranteedResults = () => {

  const sprintDeliverables = [
    { icon: Target, metric: "W1", label: "ICP + infra", detail: "ICP, domains, warmup, competitor link map", highlight: true },
    { icon: Mail, metric: "W2", label: "Outreach live", detail: "1,000 emails/day + follow-ups that never drop", highlight: true },
    { icon: Link2, metric: "W3", label: "Backlinks live", detail: "24/7 hunter + quality filters, no junk", highlight: false },
    { icon: Zap, metric: "W4", label: "The loop", detail: "Links feeding emails, CRM, kill-switch, cadence", highlight: false },
  ];

  const discoverOutcomes = [
    { icon: Mail, metric: "1,000", label: "Emails / day", detail: "Personalized. Not a blast from a CSV." },
    { icon: Users, metric: "ICP", label: "Tight lists", detail: "Who should never get an email, locked" },
    { icon: MessageCircleQuestion, metric: "Follow-ups", label: "Never drop", detail: "The agent remembers. Founders forget." },
    { icon: Target, metric: "Replies", label: "Routed to you", detail: "You take the conversation. It hunts." },
  ];

  const trustOutcomes = [
    { icon: Link2, metric: "24/7", label: "Backlink agent", detail: "Hunting while you sleep, ship, and sell." },
    { icon: Shield, metric: "Editorial", label: "Quality filter", detail: "No PBNs. No directories. No stains." },
    { icon: FileText, metric: "Pitch", label: "Human-grade", detail: "Real angles. Real editors. Real placements." },
    { icon: TrendingUp, metric: "Proof", label: "Feeds email", detail: "Authority makes cold mail feel warm." },
  ];

  const aiVisibility = [
    { name: "Sends / day", tracked: true },
    { name: "Reply rate", tracked: true },
    { name: "Bounce + spam risk", tracked: true },
    { name: "Links earned", tracked: true },
    { name: "Link quality score", tracked: true },
  ];

  const sprintWeeks = [
    { milestone: "Week 1 — ICP + sending infra locked", time: "Days 1–7" },
    { milestone: "Week 2 — Outreach agent sending 1,000/day", time: "Days 8–14" },
    { milestone: "Week 3 — Backlink agent hunting 24/7", time: "Days 15–21" },
    { milestone: "Week 4 — Loop live: links feeding replies", time: "Days 22–30" },
  ];

  return (
    <section 
      id="features" 
      
      className="py-24 md:py-32 bg-transparent text-white relative overflow-hidden"
    >
      <div className="absolute inset-0">
        <GlowPulse className="top-1/4 left-0" color="emerald" size={600} />
        <GlowPulse className="bottom-1/4 right-0" color="cyan" size={500} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className={`max-w-4xl mx-auto text-center mb-16 transition-all duration-1000 opacity-100 translate-y-0`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 text-emerald-300 rounded-full text-sm font-semibold mb-6 border border-emerald-500/30">
            <Shield size={16} />
            <span>Go-live fee you only pay when you sign off</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            What {PACKAGE_SETUP} actually buys
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {CORE_OUTCOME} The {SYSTEM_NAME} are two machines we set up and operate. <span className="text-white font-semibold">{IDENTITY_LINE}</span>
          </p>
        </div>

        <div className={`mb-16 transition-all duration-1000 delay-100 opacity-100 translate-y-0`}>
          <h3 className="text-2xl font-bold text-center mb-8">
            <span>What the go-live fee actually ships</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            {sprintDeliverables.filter((d) => d.highlight).map((item, index) => (
              <div
                key={`hi-${index}`}
                className="relative group p-6 bg-gradient-to-br from-emerald-500/[0.12] to-cyan-500/[0.06] border border-emerald-500/40 rounded-2xl ring-1 ring-emerald-500/25 shadow-[0_0_32px_-14px_rgba(16,185,129,0.4)] text-center hover:border-emerald-400/60 transition-all duration-300"
              >
                <div className="relative z-10 pt-2">
                  <item.icon className="mx-auto text-emerald-300 mb-3" size={28} />
                  <div className="text-4xl font-bold text-white mb-1">{item.metric}</div>
                  <div className="text-sm font-semibold text-white mb-1">{item.label}</div>
                  <div className="text-xs text-emerald-100/75">{item.detail}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
            {sprintDeliverables.filter((d) => !d.highlight).map((item, index) => (
              <div
                key={index}
                className="relative p-5 bg-gray-900/50 border border-gray-800 rounded-2xl text-center hover:border-emerald-500/30 transition-colors duration-300"
              >
                <item.icon className="mx-auto text-emerald-400 mb-2" size={24} />
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">{item.metric}</div>
                <div className="text-xs font-medium text-gray-300 mb-1">{item.label}</div>
                <div className="text-[11px] text-gray-500 leading-snug">{item.detail}</div>
              </div>
            ))}
          </div>
        </div>

        <div className={`mb-16 transition-all duration-1000 delay-200 opacity-100 translate-y-0`}>
          <h3 className="text-2xl font-bold text-center mb-8">
            <span className="text-cyan-400">📬</span> Outreach <span className="text-gray-500 text-lg font-normal">(1,000 emails / day)</span>
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {discoverOutcomes.map((item, index) => (
              <div 
                key={index}
                className="p-6 bg-gray-900/50 border border-gray-800 rounded-2xl hover:border-cyan-500/50 transition-all duration-300 text-center"
              >
                <item.icon className="mx-auto text-cyan-400 mb-3" size={28} />
                <div className="text-2xl font-bold text-white mb-1">{item.metric}</div>
                <div className="text-sm font-semibold text-gray-300 mb-1">{item.label}</div>
                <div className="text-xs text-gray-500">{item.detail}</div>
              </div>
            ))}
          </div>
        </div>

        <div className={`mb-16 transition-all duration-1000 delay-250 opacity-100 translate-y-0`}>
          <h3 className="text-2xl font-bold text-center mb-8">
            <span className="text-purple-400">🔗</span> Backlinks <span className="text-gray-500 text-lg font-normal">(24/7 high-quality hunter)</span>
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {trustOutcomes.map((item, index) => (
              <div 
                key={index}
                className="p-6 bg-gray-900/50 border border-gray-800 rounded-2xl hover:border-purple-500/50 transition-all duration-300 text-center"
              >
                <item.icon className="mx-auto text-purple-400 mb-3" size={28} />
                <div className="text-2xl font-bold text-white mb-1">{item.metric}</div>
                <div className="text-sm font-semibold text-gray-300 mb-1">{item.label}</div>
                <div className="text-xs text-gray-500">{item.detail}</div>
              </div>
            ))}
          </div>
        </div>

        <div className={`grid md:grid-cols-2 gap-8 mb-16 transition-all duration-1000 delay-300 opacity-100 translate-y-0`}>
          <div className="p-8 bg-gray-900/50 border border-gray-800 rounded-3xl">
            <div className="flex items-center gap-3 mb-6">
              <Bot className="text-purple-400" size={28} />
              <h3 className="text-xl font-bold">What we track</h3>
            </div>
            <p className="text-gray-400 text-sm mb-6">
              You don&apos;t buy a black box. You see sends, replies, bounces, and every placement as it lands — so you know both agents are hunting, not napping.
            </p>
            <div className="space-y-3">
              {aiVisibility.map((ai, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-black/30 rounded-xl">
                  <span className="text-gray-300">{ai.name}</span>
                  <div className="flex items-center gap-2 text-emerald-400 text-sm">
                    <CheckCircle2 size={16} />
                    <span>Tracked</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-8 bg-gray-900/50 border border-gray-800 rounded-3xl">
            <div className="flex items-center gap-3 mb-6">
              <Zap className="text-yellow-400" size={28} />
              <h3 className="text-xl font-bold">Both agents — week by week</h3>
            </div>
            <p className="text-gray-400 text-sm mb-6">
              Outreach without links is noise. Links without a pipeline are a trophy case. Week 4 locks the loop.
            </p>
            <div className="space-y-3">
              {sprintWeeks.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-black/30 rounded-xl">
                  <span className="text-gray-300 text-sm">{item.milestone}</span>
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-yellow-400" />
                    <span className="text-yellow-400 font-semibold text-sm whitespace-nowrap">{item.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={`max-w-4xl mx-auto transition-all duration-1000 delay-400 opacity-100 translate-y-0`}>
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 via-cyan-500 to-purple-500 rounded-3xl blur opacity-30"></div>
            <div className="relative p-8 md:p-10 bg-gray-900 rounded-3xl border border-gray-800">
              <div className="text-center mb-6">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  Then {PACKAGE_RETAINER}/month keeps both agents hunting
                </h3>
                <p className="text-gray-400 max-w-2xl mx-auto">
                  We maintain and run both agents for you — 1,000 emails/day, 24/7 backlink hunting, and a daily update so you never wonder if they clocked out.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className={`max-w-3xl mx-auto mt-12 text-center transition-all duration-1000 delay-500 opacity-100 translate-y-0`}>
          <div className="p-8 bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-emerald-500/10 border border-emerald-500/20 rounded-3xl">
            <Shield className="mx-auto text-emerald-400 mb-4" size={40} />
            <h3 className="text-2xl font-bold mb-4">Not happy at any point?</h3>
            <p className="text-gray-300 leading-relaxed mb-6">
              If you are not happy at any point in this process, you get:
            </p>
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-emerald-300 font-bold text-lg">
              <span>The {PACKAGE_SETUP} go-live fee back. In full.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
