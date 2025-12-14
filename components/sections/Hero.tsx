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
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_#333_1px,_transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-900 rounded-full mix-blend-screen filter blur-[100px] opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-900 rounded-full mix-blend-screen filter blur-[100px] opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          
          {/* Dual Badge System */}
          <div className="flex justify-center gap-4 mb-8 opacity-0 animate-fade-in-up" style={{ animationFillMode: 'forwards' }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-sm font-medium">
              <PenTool size={14} className="text-blue-400" />
              <span>Human Quality</span>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-sm font-medium">
              <Bot size={14} className="text-purple-400" />
              <span>AI Scale</span>
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 leading-tight opacity-0 animate-fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500">
              30 Human-Written Articles.
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              24/7 AI Agents for Backlinks.
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed opacity-0 animate-fade-in-up" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
            The world&apos;s first hybrid growth engine. We give you an entire content team and an automated SEO agent for one flat monthly price.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
            <Link href="/#pricing">
              <Button size="xl" className="bg-white text-black hover:bg-gray-200 h-14 px-8 text-lg rounded-full group">
                Start Growing for $99/mo
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </Button>
            </Link>
            <Link href="/#features">
              <Button size="xl" variant="outline" className="border-white/20 text-white hover:bg-white/10 h-14 px-8 text-lg rounded-full">
                See How It Works
              </Button>
            </Link>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-gradient-to-r from-transparent via-gray-800 to-transparent opacity-0 animate-fade-in-up" style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
            <div className="bg-black py-8 px-4">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">30</div>
              <div className="text-gray-500 uppercase tracking-widest text-sm">Monthly Articles</div>
            </div>
            <div className="bg-black py-8 px-4">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">24/7</div>
              <div className="text-gray-500 uppercase tracking-widest text-sm">AI Agent Active</div>
            </div>
            <div className="bg-black py-8 px-4">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">$99</div>
              <div className="text-gray-500 uppercase tracking-widest text-sm">Flat Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
