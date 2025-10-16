"use client"

import React, { useEffect, useRef, useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/card';
import { FileText, Search, Zap, Link2, MessageSquare, BarChart3 } from 'lucide-react';

const features = [
  {
    icon: FileText,
    title: 'Human-Crafted Blog Posts',
    description: 'Professional writers create engaging, SEO-optimized blog content that resonates with your audience and ranks on search engines.',
  },
  {
    icon: Search,
    title: 'Strategic Keyword Research',
    description: 'Deep-dive analysis to identify high-impact keywords and search queries that drive qualified traffic to your content.',
  },
  {
    icon: Zap,
    title: 'AI Prompt Research',
    description: 'Understand how your audience uses ChatGPT and AI tools to discover the exact prompts that should feature your brand.',
  },
  {
    icon: Link2,
    title: 'Premium Backlink Support',
    description: 'Build domain authority with high-quality backlinks from reputable sources in your industry.',
  },
  {
    icon: MessageSquare,
    title: 'Social Media Excellence',
    description: 'Compelling LinkedIn articles, X threads, and Reddit posts that spark conversations and build your community.',
  },
  {
    icon: BarChart3,
    title: 'Performance Tracking',
    description: 'Monitor your content\'s impact with detailed analytics on rankings, traffic, and AI visibility.',
  },
];

export const Features = () => {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          features.forEach((_, index) => {
            setTimeout(() => {
              setVisibleCards(prev => [...prev, index]);
            }, index * 150);
          });
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="py-24 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 left-20 w-80 h-80 bg-gray-50 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-float"></div>
        <div className="absolute bottom-40 right-20 w-80 h-80 bg-gray-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-float-delayed"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Everything You Need to Dominate
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive content services designed to establish your brand as the go-to authority in your industry.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className={`transform transition-all duration-700 ease-out ${
                    visibleCards.includes(index)
                      ? 'translate-y-0 opacity-100'
                      : 'translate-y-10 opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <Card className="h-full card-3d border-2 hover:border-black group relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
                    <CardHeader className="relative z-10">
                      <div className="w-14 h-14 bg-black rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                        <Icon className="text-white" size={26} />
                      </div>
                      <CardTitle className="text-xl mb-2 group-hover:translate-x-1 transition-transform duration-300">{feature.title}</CardTitle>
                      <CardDescription className="text-base leading-relaxed">
                        {feature.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </div>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 text-center">
            <div className="inline-block p-8 bg-gray-50 rounded-2xl">
              <h3 className="text-2xl font-bold mb-2">Ready to Get Started?</h3>
              <p className="text-gray-600 mb-4">
                Choose a plan that fits your content needs and start dominating search results.
              </p>
              <a
                href="/#pricing"
                className="inline-block px-8 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200"
              >
                View Pricing
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

