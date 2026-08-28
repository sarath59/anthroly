import React from 'react';
import { PenTool, Sparkles, CheckCircle2 } from 'lucide-react';
import { LogoStrip, CMS_PLATFORMS } from '../ui/CompanyLogos';
import { GlowPulse } from '../ui/static-fx';

export const AutomatedBlogs = () => {

  const blogFeatures = [
    {
      number: "01",
      title: "ICP + proof points",
      description: "We lock who gets an email, who never should, and the proof that makes a cold note feel warm."
    },
    {
      number: "02",
      title: "Personalization engine",
      description: "The outreach agent writes 1,000 unique emails a day — a real reason to write, not a mail-merge first name."
    },
    {
      number: "03",
      title: "Follow-ups that never drop",
      description: "Founders forget the third touch. The agent does not. Sequences run until they reply or we kill the thread."
    },
    {
      number: "04",
      title: "Daily send report",
      description: "You see volume, replies, bounces, and what we changed — every day, included in the $500/month run fee."
    }
  ];

  return (
    <section id="blogs" className="py-24 md:py-32 bg-transparent relative overflow-hidden">
      {/* Background */}
      <GlowPulse className="bottom-1/4 right-0" color="purple" size={500} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,_rgba(139,92,246,0.05)_0%,_transparent_50%)]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className={`max-w-4xl mx-auto text-center mb-16 transition-all duration-1000 opacity-100 translate-y-0`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 text-purple-300 rounded-full text-sm font-semibold mb-6 border border-purple-500/30">
            <PenTool size={16} />
            <span>The outreach agent writes. You take the replies.</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
            1,000 Emails a Day. None of Them Generic.
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 leading-relaxed">
            <span className="text-white font-semibold">Volume without personalization is spam.</span> The lead-gen agent researches, writes, and sends up to 1,000 personalized cold emails a day — with follow-ups that never freeze.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-7xl mx-auto">
          {/* Left: Process Flow */}
          <div className={`transition-all duration-1000 delay-200 opacity-100 translate-x-0`}>
            <div className="space-y-6">
              {blogFeatures.map((feature, index) => (
                <div 
                  key={index}
                  className="flex gap-5 p-5 bg-gray-900/80 rounded-2xl border border-gray-800 hover:border-purple-500/30 transition-all duration-300 group"
                >
                  <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform">
                    {feature.number}
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-lg mb-1">{feature.title}</h4>
                    <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Stats & Benefits */}
          <div className={`transition-all duration-1000 delay-400 opacity-100 translate-x-0`}>
            {/* Big Number */}
            <div className="bg-black text-white p-8 md:p-10 rounded-3xl mb-8">
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-5xl md:text-6xl font-bold">1,000</span>
                <span className="text-2xl text-gray-400">emails / day</span>
              </div>
              <p className="text-gray-400 text-lg mb-6">You approve ICP and voice once. The outreach agent hunts every day. The $216 initial fee starts setup. You stay in the product.</p>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="text-2xl font-bold text-white">$216</div>
                  <div className="text-sm text-gray-500">Upfront</div>
                </div>
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="text-2xl font-bold text-purple-400">$1,000</div>
                  <div className="text-sm text-gray-500">When you&apos;re happy</div>
                </div>
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="text-2xl font-bold text-white">$500</div>
                  <div className="text-sm text-gray-500">Then / month</div>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-purple-500/10 rounded-xl border border-purple-500/20">
                <CheckCircle2 className="text-purple-400 flex-shrink-0 mt-0.5" size={20} />
                <div>
                  <span className="font-semibold text-white">ICP-tight:</span>
                  <span className="text-gray-400"> Who should never get an email is locked before volume starts</span>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-purple-500/10 rounded-xl border border-purple-500/20">
                <CheckCircle2 className="text-purple-400 flex-shrink-0 mt-0.5" size={20} />
                <div>
                  <span className="font-semibold text-white">Voice-aligned:</span>
                  <span className="text-gray-400"> You approve tone once. The agent never sounds like a stranger with a calendar link</span>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-purple-500/10 rounded-xl border border-purple-500/20">
                <CheckCircle2 className="text-purple-400 flex-shrink-0 mt-0.5" size={20} />
                <div>
                  <span className="font-semibold text-white">Proof-fed:</span>
                  <span className="text-gray-400"> New backlinks go into the next batch so cold mail feels less cold</span>
                </div>
              </div>
            </div>

            {/* Bottom Note */}
            <div className="mt-8 p-5 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
              <div className="flex items-start gap-3">
                <Sparkles className="text-yellow-400 flex-shrink-0" size={20} />
                <p className="text-sm text-gray-300">
                  <span className="font-bold text-yellow-400">Why this matters:</span> 40 emails on Sunday is a hobby. 1,000 personalized emails a day is a machine. We only take 10 clients because we actually run it.
                </p>
              </div>
            </div>

            {/* CMS Integrations */}
            <div className="mt-8">
              <LogoStrip 
                companies={CMS_PLATFORMS} 
                label="Publishes to"
                size="sm"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
