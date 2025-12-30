"use client"

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '../ui/button';
import { ArrowRight, Sparkles, Bot, PenTool, Check } from 'lucide-react';

const TerminalText = () => {
  const [text, setText] = useState('');
  const [stepIndex, setStepIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  const steps = [
    "Initializing Anthroly Agent v2.1...",
    "Scanning high-DR directory database...",
    "Found 150+ relevant directories and tool lists...",
    "Analyzing target directory submission requirements...",
    "Generating optimized SaaS description...",
    "Auto-filling submission fields...",
    "Uploading assets and screenshots...",
    "Verifying submission with email agent...",
    "Success! Submitted to high-authority directory.",
    "Targeting next submission platform...",
    "Checking domain authority (DR 85)...",
    "Submitting to tech directory #12...",
    "Submitting to startup list #4...",
    "Submitting to tool aggregator...",
    "Processing batch submission #42...",
    "Success! 5 new high-quality backlinks acquired."
  ];

  useEffect(() => {
    let currentText = '';
    let charIndex = 0;
    let timeoutId: NodeJS.Timeout;

    const typeStep = () => {
      const targetText = steps[stepIndex];
      
      if (charIndex < targetText.length) {
        currentText += targetText[charIndex];
        setText(currentText);
        charIndex++;
        timeoutId = setTimeout(typeStep, 50); // Typing speed
      } else {
        setIsTyping(false);
        timeoutId = setTimeout(() => {
          setIsTyping(true);
          charIndex = 0;
          currentText = '';
          setText('');
          setStepIndex((prev) => (prev + 1) % steps.length);
        }, 2000); // Pause before next step
      }
    };

    typeStep();

    return () => clearTimeout(timeoutId);
  }, [stepIndex]);

  return (
    <div className="flex items-center gap-3">
      <div className="text-cyan-400 animate-pulse">
        <span className="mr-2">➜</span>
      </div>
      <span className="text-gray-300">
        {text}
        <span className="animate-pulse inline-block w-2 h-4 bg-cyan-400 ml-1 align-middle"></span>
      </span>
    </div>
  );
};

export const Hero = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-black text-white overflow-hidden pt-20">
      {/* Abstract Background */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_#222_1px,_transparent_1px)] bg-[size:32px_32px] opacity-50"></div>
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-blue-600/20 rounded-full mix-blend-screen filter blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-white/5 rounded-full mix-blend-screen filter blur-[150px] animate-float"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          
          {/* Dual Badge System */}
          <div className="flex flex-wrap justify-center gap-3 mb-8 md:mb-12 opacity-0 animate-fade-in-up" style={{ animationFillMode: 'forwards' }}>
            <div className="inline-flex items-center gap-2 px-4 md:px-5 py-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full text-xs md:text-sm font-medium hover:bg-white/10 transition-colors cursor-default">
              <Bot size={14} className="text-cyan-400" />
              <span className="text-gray-200">AI Scale</span>
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 leading-tight md:leading-[1.1] opacity-0 animate-fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-white">
              AI-Driven Backlinks on Autopilot Every Month.
            </span>
          </h1>

          {/* Services Sublines */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 text-left max-w-4xl mx-auto mb-12 opacity-0 animate-fade-in-up px-4" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
            {[
              "24/7 AI agents to get legit non-spammy backlinks",
              "24/7 AI agents to build your product's brand",
              "Collaborate with influencers on LinkedIn to market your SaaS",
              "Build free pSEO tools for your SaaS to list more and get more traffic on Google",
              "Keyword research",
              "30 blogs per month using AI with human supervision for high quality content",
              "Weekly SEO analysis",
              "Weekly reports"
            ].map((service, index) => (
              <div key={index} className="flex items-start gap-3 text-gray-300 text-sm md:text-base">
                <Check className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span>{service}</span>
              </div>
            ))}
          </div>

          {/* AI Terminal Simulation */}
          <div className="max-w-2xl mx-auto mb-12 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
            <div className="bg-black/50 border border-white/10 rounded-xl overflow-hidden backdrop-blur-md shadow-2xl">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border-b border-white/5">
                <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                <div className="ml-auto flex items-center gap-2 text-[10px] text-gray-500 font-mono">
                  <Bot size={12} />
                  <span>ANTHROLY_AGENT_V2.1</span>
                </div>
              </div>
              <div className="p-6 font-mono text-sm md:text-base text-left min-h-[100px] flex items-center">
                <TerminalText />
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 md:mb-24 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
            <Link href="/#pricing" className="w-full sm:w-auto">
              <Button size="xl" className="w-full sm:w-auto bg-white text-black hover:bg-gray-200 h-14 md:h-16 px-8 md:px-10 text-lg md:text-xl rounded-full font-bold shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_-15px_rgba(255,255,255,0.5)] transition-all transform hover:-translate-y-1">
                Start Growing for $99/mo
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-px border-t border-b border-white/10 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 animate-fade-in-up backdrop-blur-sm" style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
            <div className="py-10 px-4 group hover:bg-white/5 transition-colors duration-500">
              <div className="text-5xl font-bold text-white mb-2 tracking-tighter group-hover:scale-110 transition-transform duration-500">100%</div>
              <div className="text-gray-500 uppercase tracking-widest text-xs font-semibold">Automated</div>
            </div>
            <div className="py-10 px-4 group hover:bg-white/5 transition-colors duration-500 border-l-0 md:border-l border-r-0 md:border-r border-white/10">
              <div className="text-5xl font-bold text-white mb-2 tracking-tighter group-hover:scale-110 transition-transform duration-500">24/7</div>
              <div className="text-gray-500 uppercase tracking-widest text-xs font-semibold">AI Agent Active</div>
            </div>
            <div className="py-10 px-4 group hover:bg-white/5 transition-colors duration-500">
              <div className="text-5xl font-bold text-white mb-2 tracking-tighter group-hover:scale-110 transition-transform duration-500">$99</div>
              <div className="text-gray-500 uppercase tracking-widest text-xs font-semibold">Flat Rate</div>
            </div>
          </div>

          {/* Guarantee Text */}
          <div className="mt-8 md:mt-12 text-center opacity-0 animate-fade-in-up" style={{ animationDelay: '1s', animationFillMode: 'forwards' }}>
            <p className="text-sm md:text-base text-gray-400 max-w-2xl mx-auto border border-white/10 bg-white/5 rounded-xl p-4 md:p-6 backdrop-blur-sm">
              <span className="text-cyan-400 font-bold block mb-2">OUR GUARANTEE</span>
              If we cannot get you 20-30 backlinks per month with an average DR 70-90, we will refund you and give you one month of free service.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
