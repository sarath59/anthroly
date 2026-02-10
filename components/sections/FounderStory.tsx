"use client"

import React, { useEffect, useRef, useState } from 'react';
import { Linkedin, Twitter, Mail } from 'lucide-react';
import { GlowPulse } from '../ui/animated-elements';

export const FounderStory = () => {
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
    <section ref={sectionRef} className="py-20 md:py-28 bg-transparent relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <GlowPulse className="top-1/2 left-0" color="emerald" size={400} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className={`max-w-5xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          <div className="grid md:grid-cols-5 gap-10 items-center">
            
            {/* Photo Side */}
            <div className="md:col-span-2">
              <div className="relative">
                {/* Glow */}
                <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-3xl blur-2xl"></div>
                
                {/* Photo Container */}
                <div className="relative bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 p-1 rounded-3xl">
                  <div className="bg-gray-900 rounded-3xl p-6 text-center">
                    {/* Placeholder for photo - replace with actual image */}
                    <div className="w-40 h-40 mx-auto bg-gradient-to-br from-emerald-500/30 to-cyan-500/30 rounded-full flex items-center justify-center mb-4 border-2 border-emerald-500/30">
                      <span className="text-5xl font-bold text-white">SK</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-1">Sarath Kavuru</h3>
                    <p className="text-emerald-400 text-sm mb-4">Founder & CEO</p>
                    
                    {/* Social Links */}
                    <div className="flex justify-center gap-3">
                      <a 
                        href="https://linkedin.com/in/sarathkavuru" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-gray-800 hover:bg-emerald-500/20 border border-gray-700 hover:border-emerald-500/50 rounded-xl flex items-center justify-center transition-all"
                      >
                        <Linkedin size={18} className="text-gray-400" />
                      </a>
                      <a 
                        href="https://twitter.com/sarathkavuru" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-gray-800 hover:bg-emerald-500/20 border border-gray-700 hover:border-emerald-500/50 rounded-xl flex items-center justify-center transition-all"
                      >
                        <Twitter size={18} className="text-gray-400" />
                      </a>
                      <a 
                        href="mailto:sarath.k@neuralnetwrk.com"
                        className="w-10 h-10 bg-gray-800 hover:bg-emerald-500/20 border border-gray-700 hover:border-emerald-500/50 rounded-xl flex items-center justify-center transition-all"
                      >
                        <Mail size={18} className="text-gray-400" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Story Side */}
            <div className="md:col-span-3">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 text-gray-300 rounded-full text-sm font-medium mb-6 border border-gray-700">
                <span>👋</span>
                <span>Meet the Founder</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                I Built This Because I Needed It
              </h2>

              <div className="space-y-4 text-gray-400 leading-relaxed">
                <p>
                  <span className="text-white font-medium">I&apos;ve been in the trenches.</span> Built multiple startups. 
                  Hired SEO agencies that charged $5,000/month and delivered PowerPoint decks. 
                  Tried DIY with every tool under the sun. Spent countless hours on content that nobody read.
                </p>
                
                <p>
                  The SEO industry is broken. It&apos;s expensive, slow, opaque, and designed to keep you dependent 
                  on agencies forever. I knew there had to be a better way.
                </p>

                <p>
                  <span className="text-white font-medium">So I built Anthroly.</span> An AI-native growth engine that does 
                  what a $10,000/month agency does — but faster, cheaper, and with complete transparency. 
                  Every backlink tracked. Every blog published. Every ranking monitored. All for less than 
                  what you&apos;d pay for a single strategy call elsewhere.
                </p>

                <p className="text-emerald-400 font-medium">
                  This isn&apos;t just a product for me. It&apos;s the solution I wish I had 5 years ago.
                </p>
              </div>

              {/* Credentials */}
              <div className="mt-8 flex flex-wrap gap-3">
                <div className="px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-sm">
                  <span className="text-gray-500">Previously:</span> <span className="text-white">Neural Network Labs</span>
                </div>
                <div className="px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-sm">
                  <span className="text-gray-500">Built:</span> <span className="text-white">3 SaaS Products</span>
                </div>
                <div className="px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-sm">
                  <span className="text-gray-500">Focus:</span> <span className="text-white">AI + Growth</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
