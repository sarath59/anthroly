import React from 'react';
import { Rocket, ShoppingCart, Code, Building2, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { GlowPulse } from '../ui/static-fx';

export const GrowthHacks = () => {

  const industries = [
    {
      icon: Code,
      title: "SaaS Companies",
      color: "from-blue-500 to-cyan-500",
      hacks: [
        "ICP lists of ops / growth titles",
        "1,000 personalized emails/day",
        "Follow-ups that never drop",
        "Editorial links that make cold mail convert",
        "Daily send + reply updates"
      ]
    },
    {
      icon: ShoppingCart,
      title: "E-Commerce",
      color: "from-orange-500 to-red-500",
      hacks: [
        "Store + brand ICP outreach",
        "Partnership and wholesale inboxes",
        "24/7 editorial link hunting",
        "Quality filters — no junk domains",
        "Daily placement + send updates"
      ]
    },
    {
      icon: Building2,
      title: "Agencies & Services",
      color: "from-purple-500 to-pink-500",
      hacks: [
        "Client-ready outbound without hiring SDRs",
        "1,000 emails/day on their offer",
        "Backlink agent for their domain",
        "Daily updates you can forward",
        "White-label if it fits"
      ]
    }
  ];

  return (
    <section id="growth-hacks" className="py-24 md:py-32 bg-transparent text-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <GlowPulse className="top-0 left-0" color="purple" size={500} />
        <GlowPulse className="bottom-0 right-0" color="blue" size={400} />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className={`max-w-4xl mx-auto text-center mb-16 transition-all duration-1000 opacity-100 translate-y-0`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 text-purple-300 rounded-full text-sm font-semibold mb-6 border border-purple-500/30">
            <Rocket size={16} />
            <span>Two agents. Tuned to how your market actually buys.</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            How Both Agents Hunt in Your Market
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 leading-relaxed">
            <span className="text-white font-semibold">Generic blasts fail. Industry-specific wins.</span> We tune ICP, angles, and link neighborhoods for SaaS, e-commerce, and service businesses — then both agents hunt 24/7.
          </p>
        </div>

        {/* Industry Cards */}
        <div className={`grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16 transition-all duration-1000 delay-200 opacity-100 translate-y-0`}>
          {industries.map((industry, index) => {
            const Icon = industry.icon;
            return (
              <div key={index} className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:border-white/20 transition-all group">
                <div className={`w-14 h-14 bg-gradient-to-r ${industry.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="text-white" size={28} />
                </div>
                <h3 className="text-xl font-bold mb-4">{industry.title}</h3>
                <ul className="space-y-3">
                  {industry.hacks.map((hack, hackIndex) => (
                    <li key={hackIndex} className="flex items-start gap-2 text-gray-400 text-sm">
                      <ArrowRight size={14} className="text-emerald-400 mt-1 flex-shrink-0" />
                      <span>{hack}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Additional Strategies */}
        <div className={`max-w-4xl mx-auto transition-all duration-1000 delay-400 opacity-100 translate-y-0`}>
          <div className="bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-cyan-500/20 border border-white/10 rounded-3xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="text-yellow-400" size={24} />
              <h3 className="text-2xl font-bold">Plus These Universal Strategies</h3>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-emerald-400 flex-shrink-0" size={18} />
                <span className="text-gray-300">Competitor backlink gap analysis</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-emerald-400 flex-shrink-0" size={18} />
                <span className="text-gray-300">Featured snippet optimization</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-emerald-400 flex-shrink-0" size={18} />
                <span className="text-gray-300">HARO and journalist outreach</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-emerald-400 flex-shrink-0" size={18} />
                <span className="text-gray-300">Podcast guesting for backlinks</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-emerald-400 flex-shrink-0" size={18} />
                <span className="text-gray-300">Reddit and Quora SEO</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-emerald-400 flex-shrink-0" size={18} />
                <span className="text-gray-300">YouTube SEO for video content</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
