"use client"

import React, { useEffect, useRef, useState } from 'react';
import { Share2, Linkedin, Twitter, BookOpen, TrendingUp, Users, CheckCircle2, Eye, MessageSquare } from 'lucide-react';
import { LogoStrip, SOCIAL_PLATFORMS } from '../ui/CompanyLogos';
import { GlowPulse } from '../ui/animated-elements';

export const SocialArticles = () => {
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

  const platforms = [
    {
      icon: Linkedin,
      name: "LinkedIn",
      color: "bg-blue-600",
      description: "Thought leadership articles that position you as an industry expert",
      stats: "4.2K avg views"
    },
    {
      icon: Twitter,
      name: "X (Twitter)",
      color: "bg-black",
      description: "Engaging threads that spark conversations and build your following",
      stats: "8.5K avg impressions"
    },
    {
      icon: BookOpen,
      name: "Medium",
      color: "bg-green-600",
      description: "In-depth articles that rank on Google and establish domain authority",
      stats: "2.1K avg reads"
    }
  ];

  return (
    <section id="social" ref={sectionRef} className="py-24 md:py-32 bg-transparent relative overflow-hidden">
      {/* Background */}
      <GlowPulse className="bottom-1/3 left-0" color="blue" size={500} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,_rgba(59,130,246,0.05)_0%,_transparent_50%)]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className={`max-w-4xl mx-auto text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 text-blue-300 rounded-full text-sm font-semibold mb-6 border border-blue-500/30">
            <Share2 size={16} />
            <span>🌐 AI pulls from social content — be where it looks</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
            Be Everywhere AI Looks
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 leading-relaxed">
            <span className="text-white font-semibold">AI engines cite social + publisher content millions of times.</span> We publish across high-authority platforms so your brand becomes the “default answer” — not your competitor.
          </p>
        </div>

        {/* Platform Cards */}
        <div className={`grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {platforms.map((platform, index) => {
            const Icon = platform.icon;
            return (
              <div 
                key={index}
                className="bg-gray-900/80 rounded-2xl p-6 border border-gray-800 hover:border-blue-500/30 transition-all duration-300 group"
              >
                <div className={`w-14 h-14 ${platform.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="text-white" size={28} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{platform.name}</h3>
                <p className="text-gray-400 mb-4 leading-relaxed">{platform.description}</p>
                <div className="flex items-center gap-2 text-sm text-emerald-400 font-semibold">
                  <Eye size={16} />
                  <span>{platform.stats}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
          {/* Left: Why It Matters */}
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
              Why Social Content Matters for SEO & GEO
            </h3>
            
            <div className="space-y-6 mb-8">
              <div className="p-5 bg-gray-900/80 rounded-xl border border-gray-800">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <TrendingUp className="text-blue-400" size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">AI Reads Everything</h4>
                    <p className="text-gray-400 text-sm">ChatGPT and Claude pull information from LinkedIn articles, X threads, and Medium posts. Being visible there means being recommended more often.</p>
                  </div>
                </div>
              </div>
              
              <div className="p-5 bg-gray-900/80 rounded-xl border border-gray-800">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <Users className="text-purple-400" size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">Build Authority Signals</h4>
                    <p className="text-gray-400 text-sm">When your content appears across multiple high-authority platforms, search engines trust you more. It&apos;s called E-E-A-T (Experience, Expertise, Authoritativeness, Trust).</p>
                  </div>
                </div>
              </div>

              <div className="p-5 bg-gray-900/80 rounded-xl border border-gray-800">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                    <MessageSquare className="text-emerald-400" size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">Engagement Drives Rankings</h4>
                    <p className="text-gray-400 text-sm">High engagement on social platforms sends positive signals to search engines. More likes, comments, and shares = higher rankings.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Sample Content */}
          <div className={`transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="bg-black text-white rounded-3xl p-6 md:p-8">
              <h3 className="text-xl font-bold mb-6">What We Create For You</h3>
              
              <div className="space-y-4">
                {/* LinkedIn */}
                <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Linkedin className="text-blue-400" size={18} />
                    <span className="text-sm text-gray-400">LinkedIn Article</span>
                  </div>
                  <p className="text-white font-medium mb-2">&quot;Why 80% of SaaS Companies Fail at SEO (And How to Be in the 20%)&quot;</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>2,400 words</span>
                    <span>•</span>
                    <span>SEO-optimized</span>
                    <span>•</span>
                    <span>Includes CTA</span>
                  </div>
                </div>

                {/* X Thread */}
                <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Twitter className="text-white" size={18} />
                    <span className="text-sm text-gray-400">X Thread</span>
                  </div>
                  <p className="text-white font-medium mb-2">&quot;I analyzed 500 top-ranking pages. Here&apos;s what they all have in common (Thread) 🧵&quot;</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>12 tweets</span>
                    <span>•</span>
                    <span>Engagement hooks</span>
                    <span>•</span>
                    <span>Data-driven</span>
                  </div>
                </div>

                {/* Medium */}
                <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="text-green-400" size={18} />
                    <span className="text-sm text-gray-400">Medium Post</span>
                  </div>
                  <p className="text-white font-medium mb-2">&quot;The Complete Guide to AI-Powered SEO in 2026&quot;</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>3,500 words</span>
                    <span>•</span>
                    <span>Top publication</span>
                    <span>•</span>
                    <span>Backlinks included</span>
                  </div>
                </div>
              </div>

              {/* Output */}
              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Monthly output:</span>
                  <span className="text-emerald-400 font-bold">15 social articles across all platforms</span>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 text-gray-300">
                <CheckCircle2 className="text-blue-400 flex-shrink-0" size={18} />
                <span>All content written in your brand voice</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <CheckCircle2 className="text-blue-400 flex-shrink-0" size={18} />
                <span>Scheduled and published automatically</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <CheckCircle2 className="text-blue-400 flex-shrink-0" size={18} />
                <span>Repurposed from your blog content for efficiency</span>
              </div>
            </div>

            {/* Social Platforms */}
            <div className="mt-8">
              <LogoStrip 
                companies={SOCIAL_PLATFORMS} 
                label="Published across"
                size="sm"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
