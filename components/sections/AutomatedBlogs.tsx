"use client"

import React, { useEffect, useRef, useState } from 'react';
import { PenTool, Sparkles, CheckCircle2 } from 'lucide-react';
import { LogoStrip, CMS_PLATFORMS } from '../ui/CompanyLogos';
import { GlowPulse } from '../ui/animated-elements';

export const AutomatedBlogs = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const blogFeatures = [
    {
      number: "01",
      title: "The agent researches",
      description: "It reads the live SERP, the AI answers, your competitors, and your own analytics—then builds the brief and keyword map."
    },
    {
      number: "02",
      title: "Humans write it",
      description: "Our writers draft every piece. Conversation-style, opinionated, structured to hold up on Google and inside AI answers."
    },
    {
      number: "03",
      title: "An editor signs off",
      description: "Facts, tone, and on-page SEO checked by a person. Nothing publishes on a maybe."
    },
    {
      number: "04",
      title: "The agent ships and learns",
      description: "It publishes on your schedule, watches how each piece performs, and feeds that evidence into next month's briefs."
    }
  ];

  return (
    <section id="blogs" ref={sectionRef} className="py-24 md:py-32 bg-transparent relative overflow-hidden">
      {/* Background */}
      <GlowPulse className="bottom-1/4 right-0" color="purple" size={500} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,_rgba(139,92,246,0.05)_0%,_transparent_50%)]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className={`max-w-4xl mx-auto text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 text-purple-300 rounded-full text-sm font-semibold mb-6 border border-purple-500/30">
            <PenTool size={16} />
            <span>📝 Companies publishing 16+ blogs/month get 3.5x more traffic</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
            The Agent Researches. Humans Write.
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 leading-relaxed">
            <span className="text-white font-semibold">30+ pages of content every month</span> — your agent handles research, briefs, and internal linking; our writers handle the sentences. It reads like a person because a person wrote it.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-7xl mx-auto">
          {/* Left: Process Flow */}
          <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
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
          <div className={`transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            {/* Big Number */}
            <div className="bg-black text-white p-8 md:p-10 rounded-3xl mb-8">
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-7xl md:text-8xl font-bold">45</span>
                <span className="text-2xl text-gray-400">pages/month</span>
              </div>
              <p className="text-gray-400 text-lg mb-6">15 SEO blogs + 15 AI Q&A pages = 360 pieces a year, compounding into authority on Google and inside every AI answer about your category.</p>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="text-2xl font-bold text-white">15</div>
                  <div className="text-sm text-gray-500">SEO Blogs</div>
                </div>
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="text-2xl font-bold text-purple-400">15</div>
                  <div className="text-sm text-gray-500">AI Q&A Pages</div>
                </div>
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="text-2xl font-bold text-white">100%</div>
                  <div className="text-sm text-gray-500">Human reviewed</div>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-purple-500/10 rounded-xl border border-purple-500/20">
                <CheckCircle2 className="text-purple-400 flex-shrink-0 mt-0.5" size={20} />
                <div>
                  <span className="font-semibold text-white">Evidence-led:</span>
                  <span className="text-gray-400"> Every topic is chosen from real search demand, not a content calendar guess</span>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-purple-500/10 rounded-xl border border-purple-500/20">
                <CheckCircle2 className="text-purple-400 flex-shrink-0 mt-0.5" size={20} />
                <div>
                  <span className="font-semibold text-white">Your voice, kept:</span>
                  <span className="text-gray-400"> The agent learns your tone from what you&apos;ve already published, and editors hold the line</span>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-purple-500/10 rounded-xl border border-purple-500/20">
                <CheckCircle2 className="text-purple-400 flex-shrink-0 mt-0.5" size={20} />
                <div>
                  <span className="font-semibold text-white">Wired together:</span>
                  <span className="text-gray-400"> Internal links are re-mapped across the whole site each time something new ships</span>
                </div>
              </div>
            </div>

            {/* Bottom Note */}
            <div className="mt-8 p-5 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
              <div className="flex items-start gap-3">
                <Sparkles className="text-yellow-400 flex-shrink-0" size={20} />
                <p className="text-sm text-gray-300">
                  <span className="font-bold text-yellow-400">Why this matters:</span> Consistency is the whole game, and consistency is exactly what humans alone can&apos;t sustain. The agent never misses a month; the humans make sure it&apos;s worth reading.
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
