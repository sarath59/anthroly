"use client"

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

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
    { 
      name: "OpenAI", 
      logo: "https://cdn.worldvectorlogo.com/logos/openai-2.svg",
      description: "GPT-4 Content" 
    },
    { 
      name: "Anthropic", 
      logo: "https://cdn.brandfetch.io/idxCvVB0Wu/theme/dark/symbol.svg",
      description: "Claude Analysis" 
    },
    { 
      name: "Ahrefs", 
      logo: "https://cdn.worldvectorlogo.com/logos/ahrefs.svg",
      description: "Backlink Data" 
    },
    { 
      name: "SEMrush", 
      logo: "https://cdn.worldvectorlogo.com/logos/semrush.svg",
      description: "Keyword Intel" 
    },
    { 
      name: "Vercel", 
      logo: "https://cdn.worldvectorlogo.com/logos/vercel.svg",
      description: "Infrastructure" 
    },
    { 
      name: "Stripe", 
      logo: "https://cdn.worldvectorlogo.com/logos/stripe-4.svg",
      description: "Payments" 
    },
  ];

  const integrations = [
    { 
      name: "Google Search Console", 
      logo: "https://cdn.worldvectorlogo.com/logos/google-search-console.svg"
    },
    { 
      name: "Google Analytics", 
      logo: "https://cdn.worldvectorlogo.com/logos/google-analytics-4.svg"
    },
    { 
      name: "WordPress", 
      logo: "https://cdn.worldvectorlogo.com/logos/wordpress-icon-1.svg"
    },
    { 
      name: "Webflow", 
      logo: "https://cdn.worldvectorlogo.com/logos/webflow-1.svg"
    },
    { 
      name: "Shopify", 
      logo: "https://cdn.worldvectorlogo.com/logos/shopify.svg"
    },
    { 
      name: "Next.js", 
      logo: "https://cdn.worldvectorlogo.com/logos/next-js.svg"
    },
    { 
      name: "Notion", 
      logo: "https://cdn.worldvectorlogo.com/logos/notion-2.svg"
    },
    { 
      name: "Slack", 
      logo: "https://cdn.worldvectorlogo.com/logos/slack-new-logo.svg"
    },
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

          {/* Main Tools - Logo Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-16 max-w-6xl mx-auto">
            {tools.map((tool, index) => (
              <div 
                key={index}
                className="group flex flex-col items-center justify-center p-6 bg-gray-900/50 border border-gray-800 rounded-2xl hover:border-gray-600 hover:bg-gray-900/80 transition-all duration-300"
              >
                <div className="h-12 w-full flex items-center justify-center mb-3">
                  <Image
                    src={tool.logo}
                    alt={`${tool.name} logo`}
                    width={120}
                    height={48}
                    className="h-8 w-auto object-contain brightness-0 invert opacity-70 group-hover:opacity-100 transition-opacity"
                    unoptimized
                  />
                </div>
                <div className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors">{tool.description}</div>
              </div>
            ))}
          </div>

          {/* Integrations - Logo Strip */}
          <div className="text-center">
            <p className="text-gray-500 text-sm mb-6">Integrates seamlessly with</p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 max-w-5xl mx-auto">
              {integrations.map((integration, index) => (
                <div 
                  key={index}
                  className="group flex items-center justify-center"
                  title={integration.name}
                >
                  <Image
                    src={integration.logo}
                    alt={`${integration.name} logo`}
                    width={100}
                    height={32}
                    className="h-6 md:h-7 w-auto object-contain brightness-0 invert opacity-50 group-hover:opacity-80 transition-opacity"
                    unoptimized
                  />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
