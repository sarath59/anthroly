"use client"

import React, { useEffect, useRef, useState } from 'react';

export const PoweredBy = () => {
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

  const tools = [
    { name: "OpenAI", description: "GPT-4 Content" },
    { name: "Anthropic", description: "Claude Analysis" },
    { name: "Ahrefs", description: "Backlink Data" },
    { name: "SEMrush", description: "Keyword Intel" },
    { name: "Vercel", description: "Infrastructure" },
    { name: "Stripe", description: "Payments" },
  ];

  const integrations = [
    "Google Search Console",
    "Google Analytics",
    "WordPress",
    "Webflow",
    "Shopify",
    "Next.js",
    "Notion",
    "Slack",
  ];

  return (
    <section ref={sectionRef} className="py-16 md:py-20 bg-transparent relative overflow-hidden border-y border-gray-800/50">
      <div className="container mx-auto px-4">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          {/* Section Header */}
          <div className="text-center mb-12">
            <p className="text-gray-500 text-sm uppercase tracking-widest mb-2">Built with enterprise-grade tools</p>
            <h3 className="text-2xl md:text-3xl font-bold text-white">
              Powered by the Best in the Industry
            </h3>
          </div>

          {/* Main Tools */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12 max-w-5xl mx-auto">
            {tools.map((tool, index) => (
              <div 
                key={index}
                className="p-4 bg-gray-900/50 border border-gray-800 rounded-xl text-center hover:border-gray-700 transition-colors"
              >
                <div className="text-lg font-bold text-white mb-1">{tool.name}</div>
                <div className="text-xs text-gray-500">{tool.description}</div>
              </div>
            ))}
          </div>

          {/* Integrations */}
          <div className="text-center">
            <p className="text-gray-500 text-sm mb-4">Integrates seamlessly with</p>
            <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
              {integrations.map((integration, index) => (
                <span 
                  key={index}
                  className="px-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-full text-sm text-gray-400"
                >
                  {integration}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
