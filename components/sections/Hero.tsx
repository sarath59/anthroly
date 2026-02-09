"use client"

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { Button } from '../ui/button';
import { ArrowRight, Sparkles, Bot, Check, Shield, Clock } from 'lucide-react';

const TerminalText = () => {
  const [text, setText] = useState('');
  const [stepIndex, setStepIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const steps = [
    "Initializing AI Crawler Analysis...",
    "Scanning your website for AI visibility gaps...",
    "Found 47 optimization opportunities...",
    "Deploying AI Visibility Monitor...",
    "Generating SEO-optimized blog #12 of 30...",
    "AI Agent acquiring high-DR backlink...",
    "pSEO implementation: Creating tool page #3...",
    "Publishing LinkedIn article for GEO boost...",
    "Compiling weekly performance report...",
    "Success! Domain Authority increased by 12 points.",
    "Building free calculator tool for your site...",
    "Medium article syndication complete...",
    "X/Twitter thread published: 2.4K impressions...",
    "Backlink acquired: DR 87 tech publication...",
    "Growth metrics: +340% organic traffic this month."
  ];

  useEffect(() => {
    let charIndex = 0;
    let currentText = '';
    const targetText = steps[stepIndex];

    const typeChar = () => {
      if (charIndex < targetText.length) {
        currentText += targetText[charIndex];
        setText(currentText);
        charIndex++;
        timeoutRef.current = setTimeout(typeChar, 35);
      } else {
        // Finished typing, wait then move to next step
        timeoutRef.current = setTimeout(() => {
          setText('');
          setStepIndex((prev) => (prev + 1) % steps.length);
        }, 2000);
      }
    };

    typeChar();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [stepIndex]);

  return (
    <div className="flex items-center gap-3 min-h-[24px]">
      <span className="text-emerald-400">➜</span>
      <span className="text-gray-300 font-mono">
        {text}
        <span className="inline-block w-2 h-5 bg-emerald-400 ml-1 animate-pulse align-middle"></span>
      </span>
    </div>
  );
};

export const Hero = () => {
  const services = [
    "AI Crawler Analysis & Optimization",
    "AI Visibility Monitoring 24/7",
    "30 SEO Blogs/Month (AI + Human QA)",
    "AI Backlink Agents (DR 70-90)",
    "pSEO Tool Pages Built Automatically",
    "10 Free Tools/Month for Your Site",
    "LinkedIn, X, Medium Articles",
    "Weekly Automated Reports",
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-black text-white overflow-hidden pt-24 pb-16">
      {/* Premium Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_#111_1px,_transparent_1px)] bg-[size:32px_32px] opacity-40"></div>
        <div className="absolute -top-40 -left-40 w-[700px] h-[700px] bg-emerald-600/15 rounded-full blur-[150px] animate-pulse"></div>
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-1/3 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[140px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          
          {/* VC-Style Badge */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 backdrop-blur-xl border border-emerald-500/30 rounded-full text-sm font-semibold">
              <Sparkles size={16} className="text-emerald-400" />
              <span className="text-emerald-300">AI-Native Productized Agency</span>
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight">
            <span className="block text-white mb-2">Your Competitors Are Already</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400">
              Invisible to AI Search.
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl lg:text-2xl text-gray-400 max-w-4xl mx-auto mb-8 leading-relaxed">
            ChatGPT, Perplexity, and Claude are replacing Google. If AI can&apos;t find you, <span className="text-white font-semibold">you don&apos;t exist.</span> We make sure you dominate both SEO and the new AI-powered search — automatically, every single month.
          </p>

          {/* Urgency Banner */}
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-full mb-10">
            <Clock size={18} className="text-orange-400" />
            <span className="text-orange-300 font-medium">60-Day Trial — Only $99/month — Limited Spots</span>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 max-w-5xl mx-auto mb-12">
            {services.map((service, index) => (
              <div key={index} className="flex items-center gap-3 text-left p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-emerald-500/30 transition-all">
                <div className="flex-shrink-0 w-5 h-5 bg-emerald-500/20 rounded-full flex items-center justify-center">
                  <Check className="w-3 h-3 text-emerald-400" />
                </div>
                <span className="text-gray-300 text-sm">{service}</span>
              </div>
            ))}
          </div>

          {/* AI Terminal Simulation */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="bg-gray-950 border border-gray-800 rounded-xl overflow-hidden shadow-2xl">
              <div className="flex items-center gap-2 px-4 py-3 bg-gray-900 border-b border-gray-800">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <div className="ml-auto flex items-center gap-2 text-xs text-gray-500 font-mono">
                  <Bot size={14} className="text-emerald-400" />
                  <span>ANTHROLY_GROWTH_ENGINE</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                </div>
              </div>
              <div className="p-5 min-h-[60px] bg-gray-950">
                <TerminalText />
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <a 
              href="https://buy.stripe.com/4gM6oHaCL1gLd23b2nb3q0a" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <Button 
                size="xl" 
                className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-cyan-500 text-black hover:from-emerald-400 hover:to-cyan-400 h-14 md:h-16 px-8 md:px-12 text-lg md:text-xl rounded-full font-bold shadow-[0_0_50px_-12px_rgba(16,185,129,0.5)] hover:shadow-[0_0_70px_-15px_rgba(16,185,129,0.7)] transition-all"
              >
                Start 60-Day Trial — $99/mo
                <ArrowRight className="ml-2" size={22} />
              </Button>
            </a>
            <Link href="/#ai-crawler" className="w-full sm:w-auto">
              <Button 
                variant="outline" 
                size="xl" 
                className="w-full sm:w-auto border-2 border-white/30 bg-transparent text-white hover:bg-white/10 hover:border-white/50 h-14 md:h-16 px-8 md:px-10 text-lg rounded-full font-semibold transition-all"
              >
                See What You Get
              </Button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-4xl mx-auto mb-12">
            <div className="text-center p-4">
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">100%</div>
              <div className="text-gray-500 text-xs md:text-sm uppercase tracking-wider">Automated</div>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">24/7</div>
              <div className="text-gray-500 text-xs md:text-sm uppercase tracking-wider">AI Working</div>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">60</div>
              <div className="text-gray-500 text-xs md:text-sm uppercase tracking-wider">Day Trial</div>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">$99</div>
              <div className="text-gray-500 text-xs md:text-sm uppercase tracking-wider">Per Month</div>
            </div>
          </div>

          {/* Guarantee Banner */}
          <div className="max-w-3xl mx-auto">
            <div className="relative p-6 md:p-8 bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-blue-500/10 border border-emerald-500/20 rounded-2xl">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="px-4 py-1 bg-emerald-500 text-black text-xs font-bold rounded-full uppercase tracking-wider">
                  Risk-Free Guarantee
                </span>
              </div>
              <div className="flex items-center justify-center gap-3 mb-3 pt-2">
                <Shield className="text-emerald-400" size={24} />
                <span className="text-lg md:text-xl font-bold text-white">Our Promise To You</span>
              </div>
              <p className="text-gray-300 text-center leading-relaxed">
                If we cannot deliver <span className="text-emerald-400 font-semibold">20-30 high-quality backlinks</span> per month with an average <span className="text-emerald-400 font-semibold">DR 70-90</span>, we will refund your payment AND give you one month of free service. Zero risk. Maximum reward.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2 text-gray-500">
          <span className="text-xs uppercase tracking-widest">Scroll to discover</span>
          <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-gray-500 rounded-full animate-bounce"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
