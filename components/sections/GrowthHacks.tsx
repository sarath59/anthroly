"use client"

import React, { useEffect, useRef, useState } from 'react';
import { Lightbulb, Target, Rocket, BarChart3, Globe, Megaphone, RefreshCw, Trophy, CheckCircle2 } from 'lucide-react';

export const GrowthHacks = () => {
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

  const growthHacks = [
    {
      icon: Target,
      title: "Competitor Gap Analysis",
      description: "We reverse-engineer your competitors&apos; entire SEO strategy — their backlinks, their keywords, their content. Then we do it better."
    },
    {
      icon: RefreshCw,
      title: "Content Repurposing Engine",
      description: "One blog post becomes a LinkedIn article, a Twitter thread, a Medium post, and 5 social snippets. Maximum reach, minimum effort."
    },
    {
      icon: Globe,
      title: "International SEO Expansion",
      description: "Ready to go global? We create localized content and build backlinks in new markets automatically."
    },
    {
      icon: Megaphone,
      title: "Digital PR & Brand Mentions",
      description: "Get featured in industry publications, podcasts, and news sites. Build authority through earned media."
    },
    {
      icon: BarChart3,
      title: "Technical SEO Audits",
      description: "Site speed, Core Web Vitals, schema markup, crawlability — we optimize the technical foundation that makes everything else work."
    },
    {
      icon: Trophy,
      title: "Featured Snippet Targeting",
      description: "Position zero is the new page one. We specifically optimize content to capture Google&apos;s featured snippets."
    }
  ];

  return (
    <section id="growth-hacks" ref={sectionRef} className="py-24 md:py-32 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,_#eff6ff_0%,_transparent_50%)]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className={`max-w-4xl mx-auto text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold mb-6">
            <Lightbulb size={16} />
            <span>And That&apos;s Not All</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-black">
            More Growth Hacks Included
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
            We don&apos;t just do the basics. We deploy <span className="text-black font-semibold">every proven growth strategy</span> that works for SEO and GEO. Here&apos;s what else you get.
          </p>
        </div>

        {/* Growth Hacks Grid */}
        <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {growthHacks.map((hack, index) => {
            const Icon = hack.icon;
            return (
              <div 
                key={index}
                className="p-6 md:p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-indigo-200 transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-5 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                  <Icon className="text-indigo-600 group-hover:text-white" size={24} />
                </div>
                <h3 className="text-xl font-bold text-black mb-3">{hack.title}</h3>
                <p className="text-gray-600 leading-relaxed">{hack.description}</p>
              </div>
            );
          })}
        </div>

        {/* Summary Box */}
        <div className={`mt-16 max-w-4xl mx-auto transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="p-8 bg-black text-white rounded-3xl">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">Everything You Need. Nothing You Don&apos;t.</h3>
                <p className="text-gray-400 leading-relaxed">
                  Traditional agencies charge you for strategy, then charge again for execution, then charge for reports. We do it all for one flat fee. No surprises, no scope creep, no BS.
                </p>
              </div>
              <div className="space-y-3">
                {[
                  "Keyword research & strategy",
                  "On-page optimization",
                  "Technical SEO fixes",
                  "Link building at scale",
                  "Content creation & publishing",
                  "Performance reporting"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="text-emerald-400" size={18} />
                    <span className="text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
