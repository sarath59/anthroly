"use client"

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '../ui/button';
import { ArrowRight, Sparkles, Bot, PenTool } from 'lucide-react';

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
          <div className="flex justify-center gap-3 mb-12 opacity-0 animate-fade-in-up" style={{ animationFillMode: 'forwards' }}>
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full text-sm font-medium hover:bg-white/10 transition-colors cursor-default">
              <PenTool size={16} className="text-blue-400" />
              <span className="text-gray-200">Human Quality</span>
            </div>
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full text-sm font-medium hover:bg-white/10 transition-colors cursor-default">
              <Bot size={16} className="text-cyan-400" />
              <span className="text-gray-200">AI Scale</span>
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 leading-[1.1] opacity-0 animate-fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
            <span className="block text-white drop-shadow-2xl">
              Human-Written Articles +
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-white">
              AI-Driven Backlinks on Autopilot Every Month.
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed opacity-0 animate-fade-in-up font-light" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
            The hybrid growth engine. Expert human writers + autonomous SEO agents. One flat monthly price.
          </p>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-24 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
            <Link href="/#pricing">
              <Button size="xl" className="bg-white text-black hover:bg-gray-200 h-16 px-10 text-xl rounded-full font-bold shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_-15px_rgba(255,255,255,0.5)] transition-all transform hover:-translate-y-1">
                Start Growing for $99/mo
                <ArrowRight className="ml-2" size={24} />
              </Button>
            </Link>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-px border-t border-b border-white/10 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 animate-fade-in-up backdrop-blur-sm" style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
            <div className="py-10 px-4 group hover:bg-white/5 transition-colors duration-500">
              <div className="text-5xl font-bold text-white mb-2 tracking-tighter group-hover:scale-110 transition-transform duration-500">30</div>
              <div className="text-gray-500 uppercase tracking-widest text-xs font-semibold">Monthly Articles</div>
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
        </div>
      </div>
    </section>
  );
};
