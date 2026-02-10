"use client"

import React, { useEffect, useRef, useState } from 'react';
import { PenTool, Sparkles, CheckCircle2 } from 'lucide-react';
import { LogoStrip, CMS_PLATFORMS } from '../ui/CompanyLogos';

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
      title: "AI Research & Outline",
      description: "Our AI analyzes top-ranking content, identifies gaps, and creates comprehensive outlines targeting your keywords."
    },
    {
      number: "02",
      title: "AI Writing Engine",
      description: "Advanced language models craft engaging, SEO-optimized content that reads naturally and converts visitors."
    },
    {
      number: "03",
      title: "Human Quality Review",
      description: "Every piece is reviewed by human editors for accuracy, brand voice alignment, and factual correctness."
    },
    {
      number: "04",
      title: "Auto-Publish & Track",
      description: "Content is scheduled, published, and tracked automatically. You just watch the traffic grow."
    }
  ];

  return (
    <section id="blogs" ref={sectionRef} className="py-24 md:py-32 bg-transparent relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,_rgba(139,92,246,0.05)_0%,_transparent_50%)]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className={`max-w-4xl mx-auto text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 text-purple-300 rounded-full text-sm font-semibold mb-6 border border-purple-500/30">
            <PenTool size={16} />
            <span>📝 Companies publishing 16+ blogs/month get 3.5x more traffic</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
            30 Blogs + 15 AI Q&A Pages. Zero Writing.
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 leading-relaxed">
            <span className="text-white font-semibold">HubSpot found blogs generate 67% more leads.</span> But who has time to write 45 pieces of content a month? Our AI creates, our humans review, your site ranks on both Google AND AI search results.
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
              <p className="text-gray-400 text-lg mb-6">30 SEO blogs + 15 AI Q&A pages = 540 pieces of content per year, building your authority on Google AND AI search results.</p>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="text-2xl font-bold text-white">30</div>
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
                  <span className="font-semibold text-white">Keyword-targeted:</span>
                  <span className="text-gray-400"> Each article targets specific keywords with proven search volume</span>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-purple-500/10 rounded-xl border border-purple-500/20">
                <CheckCircle2 className="text-purple-400 flex-shrink-0 mt-0.5" size={20} />
                <div>
                  <span className="font-semibold text-white">Brand voice aligned:</span>
                  <span className="text-gray-400"> We learn your tone and style to maintain consistency</span>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-purple-500/10 rounded-xl border border-purple-500/20">
                <CheckCircle2 className="text-purple-400 flex-shrink-0 mt-0.5" size={20} />
                <div>
                  <span className="font-semibold text-white">Internally linked:</span>
                  <span className="text-gray-400"> Strategic internal links boost your entire site&apos;s SEO</span>
                </div>
              </div>
            </div>

            {/* Bottom Note */}
            <div className="mt-8 p-5 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
              <div className="flex items-start gap-3">
                <Sparkles className="text-yellow-400 flex-shrink-0" size={20} />
                <p className="text-sm text-gray-300">
                  <span className="font-bold text-yellow-400">Why this matters:</span> Businesses that blog consistently get 67% more leads than those that don&apos;t. But who has time to write 30 articles a month? Now you do.
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
