import React from 'react';
import { Activity, Bell, TrendingUp, Shield, Eye, Clock, BarChart3, AlertCircle } from 'lucide-react';
import { LogoStrip, AI_COMPANIES } from '../ui/CompanyLogos';
import { GlowPulse } from '../ui/static-fx';

export const AIVisibilityMonitor = () => {

  return (
    <section id="ai-monitor" className="py-24 md:py-32 bg-transparent text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <GlowPulse className="top-0 right-0" color="blue" size={600} />
        <GlowPulse className="bottom-0 left-0" color="purple" size={400} />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className={`max-w-4xl mx-auto text-center mb-16 transition-all duration-1000 opacity-100 translate-y-0`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 text-blue-300 rounded-full text-sm font-semibold mb-6 border border-blue-500/30">
            <Activity size={16} />
            <span>Daily updates — you never wonder if the agents clocked out</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Know The Moment an Agent Stops Hunting
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 leading-relaxed">
            <span className="text-white font-semibold">$500/month includes a daily update.</span> Sends, replies, bounces, and every editorial link as it lands — so you know both agents are working, not napping.
          </p>
        </div>

        {/* Monitor Dashboard Mock */}
        <div className={`max-w-5xl mx-auto mb-16 transition-all duration-1000 delay-200 opacity-100 translate-y-0`}>
          <div className="bg-gray-900/80 border border-gray-800 rounded-3xl p-6 md:p-8 backdrop-blur-sm">
            {/* Dashboard Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-gray-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                  <Eye className="text-emerald-400" size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-white">Agent Dashboard</h3>
                  <p className="text-sm text-gray-500">Daily updates · both agents</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-emerald-400">Live • Updated 2 mins ago</span>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 py-6">
              <div className="p-4 bg-black/50 rounded-2xl border border-gray-800">
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">1,000</div>
                <div className="text-sm text-gray-500">Sends today (cap)</div>
                <div className="flex items-center gap-1 mt-2 text-emerald-400 text-xs">
                  <TrendingUp size={12} />
                  <span>Personalized cold email</span>
                </div>
              </div>
              <div className="p-4 bg-black/50 rounded-2xl border border-gray-800">
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">2</div>
                <div className="text-sm text-gray-500">Agents running</div>
                <div className="flex items-center gap-1 mt-2 text-emerald-400 text-xs">
                  <TrendingUp size={12} />
                  <span>Outreach + backlink, 24/7</span>
                </div>
              </div>
              <div className="p-4 bg-black/50 rounded-2xl border border-gray-800">
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">Inbox</div>
                <div className="text-sm text-gray-500">Replies routed to you</div>
                <div className="flex items-center gap-1 mt-2 text-blue-400 text-xs">
                  <BarChart3 size={12} />
                  <span>You take the conversation</span>
                </div>
              </div>
              <div className="p-4 bg-black/50 rounded-2xl border border-gray-800">
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">Watch</div>
                <div className="text-sm text-gray-500">Deliverability + kill-switch</div>
                <div className="flex items-center gap-1 mt-2 text-orange-400 text-xs">
                  <Bell size={12} />
                  <span>Humans own the stop button</span>
                </div>
              </div>
            </div>

            {/* Alert Feed */}
            <div className="space-y-3 pt-4 border-t border-gray-800">
              <div className="text-sm text-gray-500 mb-4">Recent Activity</div>
              <div className="flex items-start gap-3 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                <CheckIcon className="text-emerald-400 mt-0.5" />
                <div>
                  <p className="text-sm text-white">Outreach agent: personalized emails sent · replies routed to you</p>
                  <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                <TrendingUp size={18} className="text-blue-400 mt-0.5" />
                <div>
                  <p className="text-sm text-white">Backlink agent: editorial placement landed — quality filter passed</p>
                  <p className="text-xs text-gray-500 mt-1">5 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-orange-500/10 border border-orange-500/20 rounded-xl">
                <AlertCircle size={18} className="text-orange-400 mt-0.5" />
                <div>
                  <p className="text-sm text-white">Deliverability watch: bounce rate ticked up — warmup paused on one domain</p>
                  <p className="text-xs text-gray-500 mt-1">8 hours ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className={`grid md:grid-cols-3 gap-8 max-w-5xl mx-auto transition-all duration-1000 delay-400 opacity-100 translate-y-0`}>
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Clock className="text-blue-400" size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3">Daily updates</h3>
            <p className="text-gray-400 leading-relaxed">
              While you sleep, both agents hunt. You wake up to sends, replies, and links — not a monthly PDF.
            </p>
          </div>
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Bell className="text-purple-400" size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3">Instant alerts</h3>
            <p className="text-gray-400 leading-relaxed">
              Bounce spikes, spam-folder risk, a high-quality link landing — you hear it the same day, not next quarter.
            </p>
          </div>
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Shield className="text-emerald-400" size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3">Kill-switch ready</h3>
            <p className="text-gray-400 leading-relaxed">
              We don&apos;t just report problems. Operators pause a domain, tighten ICP, or stop junk pitches before they stain you.
            </p>
          </div>
        </div>

        {/* Monitoring These Platforms */}
        <div className={`mt-12 transition-all duration-1000 delay-500 opacity-100 translate-y-0`}>
          <LogoStrip 
            companies={AI_COMPANIES} 
            label="Models and tools both agents run on"
            size="sm"
          />
        </div>

        {/* Bottom CTA */}
        <div className={`mt-16 text-center transition-all duration-1000 delay-500 opacity-100 translate-y-0`}>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            <span className="text-white font-semibold">The founders who win</span> are not the ones writing 40 emails on Sunday. They&apos;re the ones whose agents never clock out — and who see the proof every morning.
          </p>
        </div>
      </div>
    </section>
  );
};

const CheckIcon = ({ className }: { className?: string }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="20,6 9,17 4,12"></polyline>
  </svg>
);
