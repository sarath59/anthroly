import React from 'react';
import { Search, Eye, AlertTriangle, CheckCircle2, Bot, Zap } from 'lucide-react';
import { LogoStrip, AI_COMPANIES } from '../ui/CompanyLogos';
import { GlowPulse, SpotlightCard, GradientBeam, ScaleOnScroll } from '../ui/static-fx';

export const AICrawlerAnalysis = () => {

  const crawlerFeatures = [
    {
      icon: Eye,
      title: "Outbound readiness",
      description: "See if your domain, inboxes, and list can survive 1,000 personalized emails a day"
    },
    {
      icon: AlertTriangle,
      title: "Link neighborhood gaps",
      description: "Where rivals already earn editorial links — and where junk would stain your domain"
    },
    {
      icon: Search,
      title: "Agent fit audit",
      description: "ICP tightness, exclusion list, and where an outreach agent would waste budget vs print money"
    },
    {
      icon: Zap,
      title: "Priority actions",
      description: "A ranked list of what we lock first when your slot starts — a build plan, not a PDF"
    }
  ];

  return (
    <section id="ai-crawler" className="py-24 md:py-32 bg-transparent relative overflow-hidden">
      {/* Subtle Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_rgba(16,185,129,0.05)_0%,_transparent_50%)]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className={`max-w-4xl mx-auto text-center mb-16 transition-all duration-1000 opacity-100 translate-y-0`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 text-emerald-300 rounded-full text-sm font-semibold mb-6 border border-emerald-500/30">
            <Bot size={16} />
            <span>Before 1,000 emails/day, we scan what would break</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
            Most Inboxes Are Not Ready for 1,000/Day
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 leading-relaxed">
            <span className="text-white font-semibold">Volume without a scan is how domains die.</span> We check deliverability, list quality, and your link neighborhood before either agent goes hunting.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
          {/* Left: Visual Demo */}
          <div className={`relative transition-all duration-1000 delay-200 opacity-100 translate-x-0`}>
            <ScaleOnScroll><div className="relative bg-black rounded-3xl p-8 shadow-2xl">
              <div className="absolute -top-4 -right-4 bg-emerald-500 text-black px-4 py-2 rounded-full text-sm font-bold">
                Live Analysis
              </div>
              
              <GradientBeam color="emerald" />
              
              {/* Mock Analysis UI */}
              <div className="space-y-6 relative">
                <div className="flex items-center justify-between pb-4 border-b border-gray-800">
                  <span className="text-gray-400 text-sm">yourwebsite.com</span>
                  <span className="text-emerald-400 text-sm font-mono flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                    Scanning...
                  </span>
                </div>
                
                {/* Score Display */}
                <div className="text-center py-6">
                  <div className="text-6xl font-bold text-white mb-2">47<span className="text-3xl text-gray-500">/100</span></div>
                  <div className="text-orange-400 font-semibold">Agent-readiness score</div>
                  <p className="text-gray-500 text-sm mt-2">You&apos;re not ready for 1,000 emails/day yet</p>
                </div>
                
                {/* Issues Found */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
                    <AlertTriangle size={18} className="text-red-400" />
                    <span className="text-gray-300 text-sm">Sending domain not warmed</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-orange-500/10 border border-orange-500/20 rounded-xl">
                    <AlertTriangle size={18} className="text-orange-400" />
                    <span className="text-gray-300 text-sm">ICP list too wide — burn risk</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                    <CheckCircle2 size={18} className="text-emerald-400" />
                    <span className="text-gray-300 text-sm">3 editorial link gaps vs rivals</span>
                  </div>
                </div>
              </div>
            </div></ScaleOnScroll>
            
            {/* Floating Elements */}
            <div className="absolute -bottom-6 -left-6 bg-gray-900 p-4 rounded-2xl shadow-xl border border-gray-800 animate-float">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-500/20 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="text-emerald-400" size={20} />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">Inboxes · Domains · Links</div>
                  <div className="text-xs text-gray-500">What we scan first</div>
                </div>
              </div>
            </div>

            {/* AI Platforms Logos */}
            <div className="mt-10">
              <LogoStrip 
                companies={AI_COMPANIES} 
                label="Models both agents can work with"
                size="sm"
              />
            </div>
          </div>

          {/* Right: Features */}
          <div className={`space-y-8 transition-all duration-1000 delay-400 opacity-100 translate-x-0`}>
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                See What Would Break at 1,000/Day
              </h3>
              <p className="text-lg text-gray-400 leading-relaxed mb-8">
                Cold email at this volume is not a CSV and a prayer. We look at inboxes, domains, and the links that make those emails land. <span className="font-semibold text-white">If you skip the scan, you pay in spam folders.</span>
              </p>
            </div>

            <div className="space-y-4">
              {crawlerFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className="flex gap-4 p-5 bg-gray-900/80 hover:bg-gray-800 border border-gray-800 hover:border-emerald-500/30 rounded-2xl transition-all duration-300 group cursor-default"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center group-hover:bg-emerald-500 transition-colors">
                      <Icon size={22} className="text-emerald-400 group-hover:text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1">{feature.title}</h4>
                      <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-4">
              <p className="text-sm text-gray-400 bg-gray-900/80 border border-gray-800 p-4 rounded-xl">
                <span className="font-semibold text-white">What the score measures:</span> deliverability, list tightness, bounce risk, and whether your domain already has the authority links that make cold email convert.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
