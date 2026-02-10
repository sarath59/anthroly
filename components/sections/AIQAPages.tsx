"use client"

import React, { useEffect, useRef, useState } from 'react';
import { 
  MessageCircleQuestion, 
  Bot, 
  Search, 
  CheckCircle2, 
  Sparkles,
  Target,
  TrendingUp,
  Zap,
  ArrowRight
} from 'lucide-react';
import { Button } from '../ui/button';
import Link from 'next/link';

export const AIQAPages = () => {
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

  const aiEngines = [
    { name: "ChatGPT", description: "400M+ weekly users" },
    { name: "Claude", description: "Growing rapidly" },
    { name: "Perplexity", description: "10M+ daily searches" },
    { name: "Gemini", description: "Google's AI search" },
    { name: "Google AI Overview", description: "Billions of searches" },
  ];

  const features = [
    {
      icon: MessageCircleQuestion,
      title: "Question-Answer Format",
      description: "Structured content that AI engines love to cite. Each page answers specific questions your customers are asking."
    },
    {
      icon: Target,
      title: "Intent-Optimized",
      description: "We research what questions are being asked about your industry and create pages that directly answer them."
    },
    {
      icon: Bot,
      title: "AI-First Structure",
      description: "Schema markup, clear headings, concise answers, and source citations that make it easy for AI to quote you."
    },
    {
      icon: TrendingUp,
      title: "Dual Ranking",
      description: "These pages rank on both Google AND AI search results. Double the visibility from a single piece of content."
    },
  ];

  const exampleQuestions = [
    "What is [your service] and how does it work?",
    "How much does [your product] cost?",
    "What are the benefits of [your solution]?",
    "[Your product] vs competitors comparison",
    "Best [your category] for [use case]",
    "How to choose a [your industry] provider",
  ];

  return (
    <section 
      id="ai-qa-pages" 
      ref={sectionRef} 
      className="py-24 md:py-32 bg-transparent text-white relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[200px]"></div>
        <div className="absolute bottom-1/3 left-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[180px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className={`max-w-4xl mx-auto text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 text-purple-300 rounded-full text-sm font-semibold mb-6 border border-purple-500/30">
            <Sparkles size={16} />
            <span>🚀 NEW: AI-Optimized Q&A Pages</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            15 Pages/Month That Rank on{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">
              AI Search Results
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            When someone asks ChatGPT or Perplexity about your industry, <span className="text-white font-semibold">you want to be the answer they cite</span>. Our AI Q&A pages are specifically structured to appear in AI-generated responses.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className={`grid lg:grid-cols-2 gap-12 items-center mb-16 transition-all duration-1000 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Left: Features */}
          <div className="space-y-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="flex gap-4 p-5 bg-gray-900/50 border border-gray-800 rounded-2xl hover:border-purple-500/50 transition-all duration-300"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                  <feature.icon className="text-purple-400" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right: AI Engines + Stats */}
          <div className="space-y-8">
            {/* AI Engines We Target */}
            <div className="p-8 bg-gray-900/50 border border-gray-800 rounded-3xl">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                <Bot className="text-purple-400" size={24} />
                AI Engines We Optimize For
              </h3>
              <div className="space-y-3">
                {aiEngines.map((engine, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-black/30 rounded-xl">
                    <span className="text-white font-medium">{engine.name}</span>
                    <span className="text-purple-300 text-sm">{engine.description}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-gray-900/50 border border-gray-800 rounded-2xl">
                <div className="text-3xl font-bold text-purple-400 mb-1">15</div>
                <div className="text-xs text-gray-500">Pages/Month</div>
              </div>
              <div className="text-center p-4 bg-gray-900/50 border border-gray-800 rounded-2xl">
                <div className="text-3xl font-bold text-purple-400 mb-1">50+</div>
                <div className="text-xs text-gray-500">AI Mentions</div>
              </div>
              <div className="text-center p-4 bg-gray-900/50 border border-gray-800 rounded-2xl">
                <div className="text-3xl font-bold text-purple-400 mb-1">5</div>
                <div className="text-xs text-gray-500">AI Engines</div>
              </div>
            </div>
          </div>
        </div>

        {/* Example Questions Section */}
        <div className={`max-w-4xl mx-auto mb-16 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h3 className="text-2xl font-bold text-center mb-8">
            Example Questions We&apos;ll Create Pages For
          </h3>
          <div className="grid md:grid-cols-2 gap-3">
            {exampleQuestions.map((question, index) => (
              <div 
                key={index}
                className="flex items-center gap-3 p-4 bg-gray-900/50 border border-gray-800 rounded-xl"
              >
                <MessageCircleQuestion className="text-purple-400 flex-shrink-0" size={20} />
                <span className="text-gray-300 text-sm">&quot;{question}&quot;</span>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-500 text-sm mt-4">
            We research the exact questions being asked about your industry and create optimized pages for each one.
          </p>
        </div>

        {/* How It Works */}
        <div className={`max-w-4xl mx-auto mb-16 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="p-8 bg-gradient-to-r from-purple-500/10 via-indigo-500/10 to-purple-500/10 border border-purple-500/20 rounded-3xl">
            <h3 className="text-2xl font-bold text-center mb-8">How AI Q&A Pages Work</h3>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="text-purple-400" size={24} />
                </div>
                <div className="text-sm font-semibold text-white mb-2">1. Research</div>
                <p className="text-xs text-gray-500">We find the questions people ask about your industry</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircleQuestion className="text-purple-400" size={24} />
                </div>
                <div className="text-sm font-semibold text-white mb-2">2. Create</div>
                <p className="text-xs text-gray-500">We write AI-optimized Q&A pages with proper structure</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="text-purple-400" size={24} />
                </div>
                <div className="text-sm font-semibold text-white mb-2">3. Publish</div>
                <p className="text-xs text-gray-500">Pages go live on your site with schema markup</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="text-purple-400" size={24} />
                </div>
                <div className="text-sm font-semibold text-white mb-2">4. Get Cited</div>
                <p className="text-xs text-gray-500">AI engines start citing your content as a source</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className={`text-center transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-gray-400 mb-6">
            <span className="text-white font-semibold">50+ AI brand mentions</span> in your first 30 days, or we give you an extra month free.
          </p>
          <Link href="/#pricing">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:from-purple-400 hover:to-indigo-400 rounded-full font-bold shadow-lg shadow-purple-500/20"
            >
              Get 15 AI Q&A Pages/Month
              <ArrowRight className="ml-2" size={20} />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
