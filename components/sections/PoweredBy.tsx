"use client"

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

// Logo.dev publishable key for img.logo.dev
const LOGO_DEV_KEY = 'pk_FajouHbYTb2g0kE67Vlytw';

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
    { name: "OpenAI", domain: "openai.com", description: "AI Content Generation" },
    { name: "Anthropic", domain: "anthropic.com", description: "AI Research & Analysis" },
    { name: "Ahrefs", domain: "ahrefs.com", description: "SEO & Backlink Tools" },
    { name: "SEMrush", domain: "semrush.com", description: "Marketing Intelligence" },
    { name: "Vercel", domain: "vercel.com", description: "Cloud Platform" },
    { name: "Stripe", domain: "stripe.com", description: "Payment Processing" },
  ];

  const integrations = [
    { name: "Google Search Console", domain: "search.google.com" },
    { name: "Google Analytics", domain: "analytics.google.com" },
    { name: "WordPress", domain: "wordpress.com" },
    { name: "Webflow", domain: "webflow.com" },
    { name: "Shopify", domain: "shopify.com" },
    { name: "Next.js", domain: "nextjs.org" },
    { name: "Notion", domain: "notion.so" },
    { name: "Slack", domain: "slack.com" },
  ];

  const getLogoUrl = (domain: string) => {
    return `https://img.logo.dev/${domain}?token=${LOGO_DEV_KEY}&size=120&format=png`;
  };

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

          {/* Main Tools - Logo Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-16 max-w-6xl mx-auto">
            {tools.map((tool, index) => (
              <div 
                key={index}
                className="group flex flex-col items-center justify-center p-6 bg-gray-900/50 border border-gray-800 rounded-2xl hover:border-gray-600 hover:bg-gray-800/50 transition-all duration-300"
              >
                <div className="h-12 w-12 flex items-center justify-center mb-3 rounded-xl bg-white/10 p-2">
                  <Image
                    src={getLogoUrl(tool.domain)}
                    alt={`${tool.name} logo`}
                    width={40}
                    height={40}
                    className="w-8 h-8 object-contain"
                    unoptimized
                  />
                </div>
                <div className="text-sm font-medium text-white mb-1">{tool.name}</div>
                <div className="text-xs text-gray-500">{tool.description}</div>
              </div>
            ))}
          </div>

          {/* Integrations - Logo Strip */}
          <div className="text-center">
            <p className="text-gray-500 text-sm mb-8">Integrates seamlessly with</p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-10 max-w-4xl mx-auto">
              {integrations.map((integration, index) => (
                <div 
                  key={index}
                  className="group flex flex-col items-center gap-2"
                  title={integration.name}
                >
                  <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-white/5 p-1.5 group-hover:bg-white/10 transition-colors">
                    <Image
                      src={getLogoUrl(integration.domain)}
                      alt={`${integration.name} logo`}
                      width={32}
                      height={32}
                      className="w-7 h-7 object-contain"
                      unoptimized
                    />
                  </div>
                  <span className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors">{integration.name}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
