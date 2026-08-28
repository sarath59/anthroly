import React from 'react';
import { Layers, Code, Zap, TrendingUp, CheckCircle2, ArrowRight } from 'lucide-react';
import { LogoStrip, PSEO_SUCCESS } from '../ui/CompanyLogos';
import { GlowPulse } from '../ui/static-fx';

export const PSEOImplementation = () => {

  const pseoExamples = [
    { template: "[title] at [company] in [industry]", pages: "1,000/day", example: "VP Ops at a 20–50 person SaaS" },
    { template: "[trigger] + [offer]", pages: "follow-ups", example: "just hired a competitor last quarter" },
    { template: "[you] vs [incumbent]", pages: "proof batch", example: "why they reply after the 3rd touch" },
    { template: "[city] [role] buying now", pages: "ICP slice", example: "Austin marketing directors" }
  ];

  return (
    <section id="pseo" className="py-24 md:py-32 bg-transparent relative overflow-hidden">
      <GlowPulse className="bottom-1/4 left-0" color="purple" size={500} />
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,_rgba(139,92,246,0.05)_0%,_transparent_50%)]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className={`max-w-4xl mx-auto text-center mb-16 transition-all duration-1000 opacity-100 translate-y-0`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-500/20 text-violet-300 rounded-full text-sm font-semibold mb-6 border border-violet-500/30">
            <Layers size={16} />
            <span>1,000 emails/day is a system, not a heroic Sunday</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
            1,000 Emails a Day. One ICP. Infinite Angles.
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 leading-relaxed">
            <span className="text-white font-semibold">Founders send 40. The agent sends 1,000.</span> Same offer, templated across industries, titles, and triggers — personalized enough to get a reply, volume enough to fill a calendar.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
          {/* Left: Explanation */}
          <div className={`transition-all duration-1000 delay-200 opacity-100 translate-x-0`}>
            <div className="mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                What is 1,000 emails/day, actually?
              </h3>
              <p className="text-lg text-gray-400 leading-relaxed mb-6">
                Instead of you writing one email at a time, the outreach agent uses templates and data to generate hundreds of unique, personalized notes a day. Think of how a great SDR would write if they never slept — then give them a kill-switch and an operator.
              </p>
              <p className="text-lg text-gray-400 leading-relaxed">
                <span className="font-semibold text-white">The result?</span> Pipeline at a volume no founder can sustain by hand — without sounding like a blast from a CSV.
              </p>
            </div>

            {/* Process Steps */}
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-violet-500/10 rounded-xl border border-violet-500/20">
                <div className="flex-shrink-0 w-10 h-10 bg-violet-500 text-white rounded-lg flex items-center justify-center font-bold">1</div>
                <div>
                  <h4 className="font-bold text-white">Lock the pattern</h4>
                  <p className="text-gray-400 text-sm">ICP, exclusion list, and the 3–5 angles that actually get replies</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-violet-500/10 rounded-xl border border-violet-500/20">
                <div className="flex-shrink-0 w-10 h-10 bg-violet-500 text-white rounded-lg flex items-center justify-center font-bold">2</div>
                <div>
                  <h4 className="font-bold text-white">Build sequences</h4>
                  <p className="text-gray-400 text-sm">Personalization tokens + follow-ups that never drop</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-violet-500/10 rounded-xl border border-violet-500/20">
                <div className="flex-shrink-0 w-10 h-10 bg-violet-500 text-white rounded-lg flex items-center justify-center font-bold">3</div>
                <div>
                  <h4 className="font-bold text-white">Send &amp; watch</h4>
                  <p className="text-gray-400 text-sm">1,000/day live. Daily updates. Kill-switch if a domain wobbles.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Examples */}
          <div className={`transition-all duration-1000 delay-400 opacity-100 translate-x-0`}>
            <div className="bg-black text-white p-6 md:p-8 rounded-3xl">
              <div className="flex items-center gap-3 mb-6">
                <Code className="text-violet-400" size={24} />
                <h3 className="text-xl font-bold">List patterns the agent uses</h3>
              </div>

              <div className="space-y-4">
                {pseoExamples.map((example, index) => (
                  <div key={index} className="p-4 bg-white/5 border border-white/10 rounded-xl hover:border-violet-500/30 transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <code className="text-violet-400 text-sm font-mono">{example.template}</code>
                      <span className="text-xs text-gray-500">{example.pages}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <ArrowRight size={14} />
                      <span className="text-gray-300">{example.example}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="flex items-center gap-3 text-emerald-400">
                  <Zap size={20} />
                  <span className="font-semibold">Result: 2,000+ pages ranking in 90 days</span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="p-5 bg-violet-500/10 rounded-2xl border border-violet-500/20 text-center">
                <div className="text-3xl font-bold text-white mb-1">10x</div>
                <div className="text-sm text-gray-400">More keywords covered</div>
              </div>
              <div className="p-5 bg-violet-500/10 rounded-2xl border border-violet-500/20 text-center">
                <div className="text-3xl font-bold text-white mb-1">$0.02</div>
                <div className="text-sm text-gray-400">Cost per page created</div>
              </div>
            </div>

            {/* Benefits */}
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 text-gray-300">
                <CheckCircle2 className="text-violet-400 flex-shrink-0" size={18} />
                <span>Capture long-tail searches competitors miss</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <CheckCircle2 className="text-violet-400 flex-shrink-0" size={18} />
                <span>Each page is unique — no duplicate content issues</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <CheckCircle2 className="text-violet-400 flex-shrink-0" size={18} />
                <span>Scales infinitely as you add more data</span>
              </div>
            </div>

            {/* pSEO Success Stories */}
            <div className="mt-8">
              <LogoStrip 
                companies={PSEO_SUCCESS} 
                label="Companies crushing it with pSEO"
                size="sm"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
