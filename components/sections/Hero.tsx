"use client"

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { Button } from '../ui/button';
import { ArrowRight, Sparkles, Bot, Check, Shield, TrendingUp } from 'lucide-react';
import { LogoStrip, AI_COMPANIES } from '../ui/CompanyLogos';
import { ScrollReveal, GlowPulse, SpotlightCard, GradientBeam, ScaleOnScroll, FloatingBadge } from '../ui/animated-elements';

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
    "15 AI Q&A Pages/Month (Rank on AI)",
    "AI Backlink Agents (Avg DR 70+)",
    "pSEO Tool Pages Built Automatically",
    "20 Free Tools/Month for Your Site",
    "LinkedIn, X, Medium Articles",
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-transparent text-white overflow-hidden pt-24 pb-16">
      {/* Subtle dot grid */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_#222_1px,_transparent_1px)] bg-[size:32px_32px] opacity-20"></div>
      </div>
      
      {/* Ambient glow */}
      <GlowPulse className="top-1/4 left-1/4" color="emerald" size={500} />
      <GlowPulse className="bottom-1/4 right-1/4" color="cyan" size={400} />

      <div className="container mx-auto px-4 lg:px-8 xl:px-12 relative z-10">
        <div className="max-w-7xl mx-auto text-center">
          
          {/* Badges - Social Proof + Urgency */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 backdrop-blur-xl border border-emerald-500/30 rounded-full text-sm font-semibold">
              <Sparkles size={16} className="text-emerald-400" />
              <span className="text-emerald-300">The First AI-Native SEO/GEO Agency</span>
            </div>
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur-xl border border-amber-500/30 rounded-full text-sm font-semibold animate-pulse">
              <span className="text-amber-300">🔥 Founding Member Pricing</span>
            </div>
          </div>

          {/* Main Heading - Future-Pacing Fear + Direct Question */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight mb-8 leading-[1.1]">
            <span className="block text-white mb-2">In 6 Months, 90% of Buying Decisions</span>
            <span className="block text-white mb-2">Will Start with AI.</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400">
              Will It Recommend You?
            </span>
          </h1>

          {/* Subheadline - Data-Driven Urgency */}
          <p className="text-lg md:text-xl lg:text-2xl xl:text-3xl text-gray-400 max-w-5xl mx-auto mb-12 leading-relaxed">
            <span className="text-white font-semibold">Hundreds of millions now ask AI before they buy.</span> ChatGPT, Perplexity, and Google AI are shaping what people trust — and what they click. <span className="text-emerald-400 font-semibold">If AI can&apos;t understand you, it can&apos;t recommend you.</span>
          </p>

          <p className="text-base md:text-lg text-gray-500 max-w-4xl mx-auto mb-10">
            Anthroly builds an AI + SEO growth engine that gets you <span className="text-white font-semibold">indexed, cited, and ranked</span> in 30 days — while you focus on your business.
          </p>

          {/* AI Terminal Simulation */}
          <ScaleOnScroll className="max-w-3xl mx-auto mb-12">
            <SpotlightCard className="rounded-xl">
              <div className="relative bg-gray-950 border border-gray-800 rounded-xl overflow-hidden shadow-2xl">
                <GradientBeam color="emerald" />
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
            </SpotlightCard>
            <p className="text-gray-500 text-sm mt-3 text-center">This is what our AI does for you — 24/7, automatically.</p>
          </ScaleOnScroll>

          {/* Services Preview - Build Curiosity */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto mb-14">
            {services.map((service, index) => (
              <div key={index} className="flex items-center gap-3 text-left p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-emerald-500/30 transition-all">
                <div className="flex-shrink-0 w-6 h-6 bg-emerald-500/20 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-emerald-400" />
                </div>
                <span className="text-gray-300 text-sm md:text-base">{service}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <a
              href="https://buy.polar.sh/polar_cl_NBzHmxi4dZuSh5bLGhG0iUoBqLAa8Y3dBUiFv0fZ1AN"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <Button
                size="xl"
                className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-cyan-500 text-black hover:from-emerald-400 hover:to-cyan-400 h-14 md:h-16 px-8 md:px-12 text-lg md:text-xl rounded-full font-bold shadow-[0_0_50px_-12px_rgba(16,185,129,0.5)] hover:shadow-[0_0_70px_-15px_rgba(16,185,129,0.7)] transition-all"
              >
                Start 30-Day Trial — $350/mo
                <ArrowRight className="ml-2" size={22} />
              </Button>
            </a>

            <Link href="/#ai-crawler" className="w-full sm:w-auto">
              <Button
                size="xl"
                variant="outline"
                className="w-full sm:w-auto border-white/20 text-white hover:bg-white/10 h-14 md:h-16 px-8 md:px-12 text-lg md:text-xl rounded-full font-bold"
              >
                See How It Works
              </Button>
            </Link>
          </div>

          {/* AI Platforms We Optimize For */}
          <div className="mb-14">
            <LogoStrip 
              companies={AI_COMPANIES} 
              label="Optimize your visibility on"
              size="md"
              showNames={true}
            />
          </div>

          {/* Trust Indicators - Credibility */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 max-w-5xl mx-auto mb-14">
            <div className="text-center p-4">
              <div className="text-4xl md:text-5xl font-bold text-white mb-1">100%</div>
              <div className="text-gray-500 text-sm md:text-base uppercase tracking-wider">Automated</div>
            </div>
            <div className="text-center p-4">
              <div className="text-4xl md:text-5xl font-bold text-white mb-1">24/7</div>
              <div className="text-gray-500 text-sm md:text-base uppercase tracking-wider">AI Working</div>
            </div>
            <div className="text-center p-4">
              <div className="text-4xl md:text-5xl font-bold text-white mb-1">DR 70+</div>
              <div className="text-gray-500 text-sm md:text-base uppercase tracking-wider">Backlinks</div>
            </div>
            <div className="text-center p-4">
              <div className="text-4xl md:text-5xl font-bold text-white mb-1">45+</div>
              <div className="text-gray-500 text-sm md:text-base uppercase tracking-wider">Pages/Month</div>
            </div>
          </div>

          {/* Guarantee Banner - Risk Reversal (Subtle, Not About Price) */}
          <div className="max-w-4xl mx-auto">
            <div className="relative p-6 md:p-8 bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-blue-500/10 border border-emerald-500/20 rounded-2xl">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="px-4 py-1 bg-emerald-500 text-black text-xs font-bold rounded-full uppercase tracking-wider">
                  Our Commitment
                </span>
              </div>
              <div className="flex items-center justify-center gap-3 mb-3 pt-2">
                <Shield className="text-emerald-400" size={24} />
                <span className="text-lg md:text-xl font-bold text-white">Results You Can Measure</span>
              </div>
              <p className="text-gray-300 text-center leading-relaxed">
                We commit to <span className="text-emerald-400 font-semibold">20-30 high-quality backlinks</span> per month (DR 50-90, <span className="text-emerald-400 font-semibold">avg DR 70+</span>). If we miss it, you get <span className="text-white font-semibold">one free month of service</span>. Simple.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2 text-gray-500">
          <span className="text-xs uppercase tracking-widest">Discover what we do</span>
          <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-gray-500 rounded-full animate-bounce"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
