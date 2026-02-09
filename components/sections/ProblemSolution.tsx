"use client"

import React, { useEffect, useRef, useState } from 'react';
import { XCircle, CheckCircle2, TrendingUp, Zap, DollarSign, Clock } from 'lucide-react';

export const ProblemSolution = () => {
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
    <section ref={sectionRef} className="py-24 md:py-32 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 text-black">
            Why Most SEO Efforts Fail
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
              (And How We're Different)
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
            You've probably tried SEO before. Maybe you hired an agency, bought some tools, or attempted to do it yourself. Let us guess how it went...
          </p>
        </div>

        <div className={`grid md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* The Old Way */}
          <div className="bg-white p-6 md:p-10 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-red-500 to-orange-500"></div>
            <div className="mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-3">
                <XCircle className="text-red-500" />
                The Old Way
              </h3>
              <p className="text-gray-500 mt-2">What you've been dealing with</p>
            </div>
            <ul className="space-y-6">
              <li className="flex gap-4 opacity-80">
                <XCircle className="text-red-400 flex-shrink-0 mt-1" size={22} />
                <div>
                  <p className="font-bold text-lg text-gray-800">Expensive Agencies</p>
                  <p className="text-gray-600">$2,000-$10,000/month for a few blog posts and "strategy calls" that go nowhere. Where does the money even go?</p>
                </div>
              </li>
              <li className="flex gap-4 opacity-80">
                <XCircle className="text-red-400 flex-shrink-0 mt-1" size={22} />
                <div>
                  <p className="font-bold text-lg text-gray-800">Black Box Results</p>
                  <p className="text-gray-600">"Trust us, it's working." Months pass. Rankings don't move. No clear explanation of what they're actually doing.</p>
                </div>
              </li>
              <li className="flex gap-4 opacity-80">
                <XCircle className="text-red-400 flex-shrink-0 mt-1" size={22} />
                <div>
                  <p className="font-bold text-lg text-gray-800">Spammy Backlinks</p>
                  <p className="text-gray-600">Cheap agencies buy links from shady sites. Google catches on. Your rankings tank. You're worse off than before.</p>
                </div>
              </li>
              <li className="flex gap-4 opacity-80">
                <XCircle className="text-red-400 flex-shrink-0 mt-1" size={22} />
                <div>
                  <p className="font-bold text-lg text-gray-800">DIY Time Sink</p>
                  <p className="text-gray-600">Tried doing it yourself? That's 20+ hours/week you don't have, with a steep learning curve and slow results.</p>
                </div>
              </li>
              <li className="flex gap-4 opacity-80">
                <XCircle className="text-red-400 flex-shrink-0 mt-1" size={22} />
                <div>
                  <p className="font-bold text-lg text-gray-800">AI Tools Without Strategy</p>
                  <p className="text-gray-600">ChatGPT can write content, but without SEO expertise it's just words on a page that no one will ever find.</p>
                </div>
              </li>
            </ul>
          </div>

          {/* The Anthroly Way */}
          <div className="bg-black text-white p-6 md:p-10 rounded-3xl shadow-2xl relative overflow-hidden transform md:-translate-y-4">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500"></div>
            <div className="mb-8">
              <h3 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
                <CheckCircle2 className="text-emerald-500" />
                The Anthroly Way
              </h3>
              <p className="text-gray-400 mt-2">AI-native, results-driven, transparent</p>
            </div>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <CheckCircle2 className="text-emerald-400 flex-shrink-0 mt-1" size={22} />
                <div>
                  <p className="font-bold text-lg">$99/Month. Everything Included.</p>
                  <p className="text-gray-400">No hidden fees, no scope creep, no "that's an add-on." One price, maximum value. The math just works.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <CheckCircle2 className="text-emerald-400 flex-shrink-0 mt-1" size={22} />
                <div>
                  <p className="font-bold text-lg">Weekly Transparent Reports</p>
                  <p className="text-gray-400">See exactly what we did, what changed, and what's coming. Every backlink. Every ranking. Every action item.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <CheckCircle2 className="text-emerald-400 flex-shrink-0 mt-1" size={22} />
                <div>
                  <p className="font-bold text-lg">Only DR 70-90 Backlinks</p>
                  <p className="text-gray-400">No spam. No PBNs. No risk. Only high-authority editorial links from real, trusted websites that Google loves.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <CheckCircle2 className="text-emerald-400 flex-shrink-0 mt-1" size={22} />
                <div>
                  <p className="font-bold text-lg">AI Automation, Human Quality</p>
                  <p className="text-gray-400">Our AI handles the scale. Humans ensure the quality. You get the best of both worlds without lifting a finger.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <CheckCircle2 className="text-emerald-400 flex-shrink-0 mt-1" size={22} />
                <div>
                  <p className="font-bold text-lg">Results-Backed Guarantee</p>
                  <p className="text-gray-400">20-30 backlinks/month or your money back plus a free month. We've never had to honor this. But it's there.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className={`mt-20 max-w-5xl mx-auto transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-white rounded-2xl border border-gray-100">
              <TrendingUp className="text-emerald-500 mx-auto mb-3" size={32} />
              <div className="text-2xl font-bold text-black mb-1">95%</div>
              <div className="text-sm text-gray-500">Cost Savings vs Agencies</div>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl border border-gray-100">
              <Clock className="text-blue-500 mx-auto mb-3" size={32} />
              <div className="text-2xl font-bold text-black mb-1">100+</div>
              <div className="text-sm text-gray-500">Hours Saved/Month</div>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl border border-gray-100">
              <Zap className="text-purple-500 mx-auto mb-3" size={32} />
              <div className="text-2xl font-bold text-black mb-1">24/7</div>
              <div className="text-sm text-gray-500">AI Agents Working</div>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl border border-gray-100">
              <DollarSign className="text-orange-500 mx-auto mb-3" size={32} />
              <div className="text-2xl font-bold text-black mb-1">$99</div>
              <div className="text-sm text-gray-500">Flat Monthly Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
