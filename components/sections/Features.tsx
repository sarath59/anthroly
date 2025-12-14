"use client"

import React, { useEffect, useRef, useState } from 'react';
import { PenTool, Bot, Search, BarChart3, Globe, Zap, CheckCircle2, ArrowRight } from 'lucide-react';

const features = [
  {
    icon: PenTool,
    title: 'Human Writers, Not Bots',
    description: 'Our vetted team of expert copywriters crafts 30 high-quality, engaging blog posts every month. No hallucinations, no robotic tone—just real content that connects.',
    color: 'blue'
  },
  {
    icon: Bot,
    title: '24/7 AI Agents for Backlinks',
    description: 'While you sleep, our autonomous AI agent scours the web, identifies link-building opportunities, and secures backlinks to boost your domain authority.',
    color: 'purple'
  },
  {
    icon: Search,
    title: 'Strategic SEO Research',
    description: 'We don\'t just write; we target. Every article is based on deep keyword research to find low-competition, high-traffic opportunities in your niche.',
    color: 'pink'
  },
  {
    icon: Globe,
    title: 'Multi-Platform Distribution',
    description: 'Your content doesn\'t just sit on your blog. We optimize it for sharing across social channels to maximize reach and engagement.',
    color: 'orange'
  },
  {
    icon: BarChart3,
    title: 'Performance Analytics',
    description: 'Track your growth with transparent reporting. See your rankings climb and your traffic grow with detailed monthly insights.',
    color: 'green'
  },
  {
    icon: Zap,
    title: 'Instant Authority',
    description: 'By combining volume (30 posts/mo) with authority (backlinks), you signal to Google that you are a serious player in your industry.',
    color: 'yellow'
  }
];

export const Features = () => {
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

  return (
    <section id="features" ref={sectionRef} className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black">
            The Hybrid Advantage
          </h2>
          <p className="text-xl text-gray-600">
            Why choose between quality and scale? We give you both.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className={`group p-8 rounded-3xl bg-gray-50 hover:bg-black hover:text-white transition-all duration-500 transform ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-white shadow-sm group-hover:bg-white/10 group-hover:text-white transition-colors`}>
                  <Icon className={`text-${feature.color}-500 group-hover:text-white`} size={28} />
                </div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-600 group-hover:text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Deep Dive Section */}
        <div className="mt-32 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className={`relative ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'} transition-all duration-1000 delay-300`}>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl transform rotate-3 opacity-20 blur-lg"></div>
              <div className="relative bg-black text-white p-10 rounded-3xl overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-20">
                  <Bot size={120} />
                </div>
                <h3 className="text-3xl font-bold mb-6">Meet Your New AI Agent</h3>
                <ul className="space-y-4">
                  {[
                    'Scans 10,000+ pages daily for opportunities',
                    'Analyzes competitor backlink profiles',
                    'Automates outreach and relationship building',
                    'Monitors brand mentions 24/7'
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="text-purple-400 flex-shrink-0" size={20} />
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className={`relative ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'} transition-all duration-1000 delay-500`}>
              <h3 className="text-3xl font-bold mb-6">While Humans Do What Humans Do Best.</h3>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                AI is great for data, but terrible at nuance. That&apos;s why we never let AI write your blogs. Our team of professional copywriters crafts stories that engage your audience, build trust, and convert visitors into customers.
              </p>
              <div className="flex items-center gap-2 text-black font-semibold cursor-pointer hover:gap-4 transition-all">
                See content examples <ArrowRight size={20} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
