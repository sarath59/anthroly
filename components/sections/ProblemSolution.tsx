"use client"

import React, { useEffect, useRef, useState } from 'react';
import { AlertCircle, CheckCircle2, TrendingUp, Zap, Target, Shield, Link2 } from 'lucide-react';

export const ProblemSolution = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
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
    <section ref={sectionRef} className="py-32 bg-white relative overflow-hidden">
      {/* Animated Background Elements - Using CSS only */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-96 h-96 bg-gray-50 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-float"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-gray-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-float-delayed"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Section Title */}
          <div 
            className={`text-center mb-20 transform transition-all duration-1000 ease-out ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <div className="inline-block mb-4">
              <span className="px-4 py-2 bg-black text-white rounded-full text-sm font-semibold tracking-wide">
                THE CHALLENGE & OUR ANSWER
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="block">The Internet Has</span>
              <span className="block gradient-text">a Problem</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We have the solution to cut through the noise
            </p>
          </div>

          {/* Main Content - Side by Side Cards */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-20">
            {/* Problem Card */}
            <div
              className={`transform transition-all duration-1000 ease-out delay-200 ${
                isVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'
              }`}
            >
              <div className="group relative bg-white p-10 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 border border-gray-100 h-full overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-red-50 rounded-full -mr-20 -mt-20 group-hover:scale-150 transition-transform duration-700"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-red-50 rounded-full -ml-16 -mb-16 group-hover:scale-150 transition-transform duration-700"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-4 bg-red-100 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                      <AlertCircle className="text-red-600" size={32} />
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900">The Problem</h3>
                  </div>

                  <div className="space-y-6">
                    {[
                      {
                        title: "AI-Generated Slop Everywhere",
                        desc: "The internet is drowning in low-quality, AI-generated content that doesn't engage, convert, or provide real value."
                      },
                      {
                        title: "Missing Out on Authority Platforms",
                        desc: "Your competitors are dominating Medium, LinkedIn, and Reddit with parasite SEO while you're stuck trying to rank your own site."
                      },
                      {
                        title: "Weak Backlink Profile",
                        desc: "Without high-quality backlinks from reputable sources, your domain authority stays low and you can't compete for top rankings."
                      },
                      {
                        title: "Search Engines Are Evolving",
                        desc: "Google and AI-powered search are actively penalizing generic, machine-generated content. Quality matters more than ever."
                      },
                      {
                        title: "AI Tools Ignore Your Brand",
                        desc: "ChatGPT, Perplexity, and other AI assistants won't recommend brands without authoritative, quality content and strong online presence."
                      }
                    ].map((item, idx) => (
                      <div 
                        key={idx}
                        className="flex items-start gap-4 p-4 rounded-xl hover:bg-red-50 transition-all duration-300 group/item"
                      >
                        <div className="flex-shrink-0 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center mt-1 group-hover/item:scale-125 transition-transform duration-300">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-2">{item.title}</h4>
                          <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Solution Card */}
            <div
              className={`transform transition-all duration-1000 ease-out delay-500 ${
                isVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'
              }`}
            >
              <div className="group relative bg-gradient-to-br from-black via-gray-900 to-black p-10 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 h-full overflow-hidden">
                {/* Animated background elements */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -mr-32 -mt-32 group-hover:scale-150 transition-transform duration-1000"></div>
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full -ml-24 -mb-24 group-hover:scale-150 transition-transform duration-1000"></div>
                </div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-4 bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl group-hover:scale-110 transition-transform duration-300">
                      <CheckCircle2 className="text-white" size={32} />
                    </div>
                    <h3 className="text-3xl font-bold text-white">Our Solution</h3>
                  </div>

                  <div className="space-y-6">
                    {[
                      {
                        title: "30 Blogs Per Month, 100% Human-Written",
                        desc: "Consistent, high-quality blog posts every single month. No AI shortcuts, no generic content—just expert writers creating authentic content for your brand.",
                        icon: Shield
                      },
                      {
                        title: "Aggressive Parasite SEO Strategy",
                        desc: "Dominate search results by publishing high-quality content on authority platforms like Medium, LinkedIn, and Reddit for instant rankings.",
                        icon: Target
                      },
                      {
                        title: "Rank #1 on Google & AI Tools",
                        desc: "Content optimized to dominate traditional search engines and be featured in ChatGPT, Perplexity, and other AI assistants.",
                        icon: TrendingUp
                      },
                      {
                        title: "Deep SEO Analysis & Research",
                        desc: "Comprehensive keyword research, competitor analysis, and AI prompt optimization to capture every opportunity.",
                        icon: Zap
                      },
                      {
                        title: "Premium Backlink Acquisition",
                        desc: "Build powerful domain authority with high-quality backlinks from reputable websites and strategic parasite SEO placements that boost your rankings.",
                        icon: Link2
                      }
                    ].map((item, idx) => {
                      const Icon = item.icon;
                      return (
                        <div 
                          key={idx}
                          className="flex items-start gap-4 p-4 rounded-xl bg-white bg-opacity-5 backdrop-blur-sm hover:bg-opacity-10 transition-all duration-300 group/item border border-white border-opacity-10"
                        >
                          <div className="flex-shrink-0 p-2 bg-white rounded-lg group-hover/item:scale-110 transition-transform duration-300">
                            <Icon className="text-black" size={20} />
                          </div>
                          <div>
                            <h4 className="font-bold text-white mb-2">{item.title}</h4>
                            <p className="text-gray-300 leading-relaxed">{item.desc}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-8 p-6 bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl border border-white border-opacity-20">
                    <div className="flex items-center gap-3 mb-3">
                      <TrendingUp size={24} className="text-white" />
                      <span className="font-bold text-xl text-white">The Result</span>
                    </div>
                    <p className="text-gray-200 leading-relaxed">
                      Consistent, authoritative content that builds trust, dominates rankings, and converts visitors into loyal customers.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Stats/Trust Section */}
          <div 
            className={`transform transition-all duration-1000 delay-700 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                { number: "10x", label: "Better Engagement vs AI Content" },
                { number: "95%", label: "Client Retention Rate" },
                { number: "#1", label: "Ranking Guarantee" }
              ].map((stat, idx) => (
                <div 
                  key={idx}
                  className="text-center p-8 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="text-5xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

