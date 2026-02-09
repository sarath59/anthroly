"use client"

import React, { useEffect, useRef, useState } from 'react';

// Logo.dev publishable key
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
    { name: "OpenAI", domain: "openai.com" },
    { name: "Anthropic", domain: "anthropic.com" },
    { name: "Ahrefs", domain: "ahrefs.com" },
    { name: "SEMrush", domain: "semrush.com" },
    { name: "Vercel", domain: "vercel.com" },
    { name: "Stripe", domain: "stripe.com" },
  ];

  const integrations = [
    { name: "Google", domain: "google.com" },
    { name: "WordPress", domain: "wordpress.com" },
    { name: "Webflow", domain: "webflow.com" },
    { name: "Shopify", domain: "shopify.com" },
    { name: "Next.js", domain: "nextjs.org" },
    { name: "Notion", domain: "notion.so" },
    { name: "Slack", domain: "slack.com" },
    { name: "HubSpot", domain: "hubspot.com" },
  ];

  const getLogoUrl = (domain: string) => {
    return `https://img.logo.dev/${domain}?token=${LOGO_DEV_KEY}`;
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
                <div className="h-12 w-full flex items-center justify-center mb-3">
                  <img
                    src={getLogoUrl(tool.domain)}
                    alt={`${tool.name} logo`}
                    className="h-10 w-auto max-w-[100px] object-contain"
                    loading="lazy"
                  />
                </div>
                <div className="text-sm font-medium text-white">{tool.name}</div>
              </div>
            ))}
          </div>

          {/* Integrations - Logo Strip */}
          <div className="text-center">
            <p className="text-gray-500 text-sm mb-8">Integrates seamlessly with</p>
            <div className="flex flex-wrap justify-center items-center gap-10 md:gap-12 max-w-4xl mx-auto">
              {integrations.map((integration, index) => (
                <div 
                  key={index}
                  className="group flex flex-col items-center gap-3"
                  title={integration.name}
                >
                  <div className="h-10 flex items-center justify-center">
                    <img
                      src={getLogoUrl(integration.domain)}
                      alt={`${integration.name} logo`}
                      className="h-8 w-auto max-w-[80px] object-contain"
                      loading="lazy"
                    />
                  </div>
                  <span className="text-xs text-gray-500">{integration.name}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
