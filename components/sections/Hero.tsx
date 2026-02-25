"use client"

import React from 'react';
import Link from 'next/link';
import { Button } from '../ui/button';
import { ArrowRight, Users, Bot, MessageSquare } from 'lucide-react';
import { LogoStrip, AI_COMPANIES } from '../ui/CompanyLogos';
import { GlowPulse } from '../ui/animated-elements';

export const Hero = () => {
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
        <div className="max-w-6xl mx-auto text-center">
          
          {/* Main Heading - Clear Value Prop */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
            <span className="block text-white mb-2">Rank on Google.</span>
            <span className="block text-white mb-2">Get Cited by AI.</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400">
              We Handle Both.
            </span>
          </h1>

          {/* Subheadline - Problem + Solution */}
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-8 leading-relaxed">
            ChatGPT, Perplexity, and Google AI are deciding who gets recommended. 
            Our team combines <span className="text-white font-semibold">AI automation</span> with <span className="text-white font-semibold">human expertise</span> to get you visible everywhere that matters.
          </p>

          {/* Human Touch Highlight - Builds Trust */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm">
              <Users size={16} className="text-emerald-400" />
              <span className="text-gray-300">Real humans onboard you</span>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm">
              <MessageSquare size={16} className="text-cyan-400" />
              <span className="text-gray-300">Weekly strategy calls</span>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm">
              <Bot size={16} className="text-purple-400" />
              <span className="text-gray-300">AI works 24/7 in between</span>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
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
                Get Started — $99/mo
                <ArrowRight className="ml-2" size={22} />
              </Button>
            </a>

            <Link href="/#how-it-works" className="w-full sm:w-auto">
              <Button
                size="xl"
                variant="outline"
                className="w-full sm:w-auto border-white/20 text-white hover:bg-white/10 h-14 md:h-16 px-8 md:px-12 text-lg md:text-xl rounded-full font-bold"
              >
                See How It Works
              </Button>
            </Link>
          </div>

          {/* Quick Stats - Social Proof */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white">45+</div>
              <div className="text-gray-500 text-sm">Pages/Month</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white">DR 70+</div>
              <div className="text-gray-500 text-sm">Avg Backlinks</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white">Weekly</div>
              <div className="text-gray-500 text-sm">Human Check-ins</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white">$99</div>
              <div className="text-gray-500 text-sm">Per Month</div>
            </div>
          </div>

          {/* Platforms We Optimize For */}
          <div className="mb-8">
            <LogoStrip 
              companies={AI_COMPANIES} 
              label="Get visible on Google + AI platforms"
              size="md"
              showNames={true}
            />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2 text-gray-500">
          <span className="text-xs uppercase tracking-widest">See what you get</span>
          <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-gray-500 rounded-full animate-bounce"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
