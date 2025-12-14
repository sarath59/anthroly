"use client"

import React from 'react';
import { XCircle, CheckCircle2 } from 'lucide-react';

export const ProblemSolution = () => {
  return (
    <section className="py-24 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-black">
            The Old Way vs. The Anthroly Way
          </h2>
          <p className="text-xl text-gray-600">
            Stop overpaying for agencies or wasting time with AI tools.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
          {/* The Old Way */}
          <div className="bg-white p-6 md:p-10 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-red-500"></div>
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                <XCircle className="text-red-500" />
                Others
              </h3>
            </div>
            <ul className="space-y-6">
              <li className="flex gap-4 opacity-70">
                <XCircle className="text-red-400 flex-shrink-0 mt-1" size={20} />
                <div>
                  <p className="font-semibold">Expensive Agencies</p>
                  <p className="text-sm text-gray-600">Charging $2,000+ for just 4 blogs a month.</p>
                </div>
              </li>
              <li className="flex gap-4 opacity-70">
                <XCircle className="text-red-400 flex-shrink-0 mt-1" size={20} />
                <div>
                  <p className="font-semibold">Pure AI Tools</p>
                  <p className="text-sm text-gray-600">Generic, robotic content that Google penalizes.</p>
                </div>
              </li>
              <li className="flex gap-4 opacity-70">
                <XCircle className="text-red-400 flex-shrink-0 mt-1" size={20} />
                <div>
                  <p className="font-semibold">Manual Outreach</p>
                  <p className="text-sm text-gray-600">Spending hours begging for backlinks with no results.</p>
                </div>
              </li>
              <li className="flex gap-4 opacity-70">
                <XCircle className="text-red-400 flex-shrink-0 mt-1" size={20} />
                <div>
                  <p className="font-semibold">Inconsistent Quality</p>
                  <p className="text-sm text-gray-600">Freelancers who flake or deliver poor work.</p>
                </div>
              </li>
            </ul>
          </div>

          {/* The Anthroly Way */}
          <div className="bg-black text-white p-6 md:p-10 rounded-3xl shadow-2xl relative overflow-hidden transform md:-translate-y-4">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
            <div className="mb-8">
              <h3 className="text-2xl font-bold flex items-center gap-3">
                <CheckCircle2 className="text-green-500" />
                Anthroly
              </h3>
            </div>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <CheckCircle2 className="text-green-400 flex-shrink-0 mt-1" size={20} />
                <div>
                  <p className="font-semibold text-lg">High-Volume Human Content</p>
                  <p className="text-sm text-gray-400">30 professionally written articles every month.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <CheckCircle2 className="text-green-400 flex-shrink-0 mt-1" size={20} />
                <div>
                  <p className="font-semibold text-lg">AI Backlink Agent</p>
                  <p className="text-sm text-gray-400">Automated link building running 24/7/365.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <CheckCircle2 className="text-green-400 flex-shrink-0 mt-1" size={20} />
                <div>
                  <p className="font-semibold text-lg">Unbeatable Price</p>
                  <p className="text-sm text-gray-400">Agency quality at a software price point ($99).</p>
                </div>
              </li>
              <li className="flex gap-4">
                <CheckCircle2 className="text-green-400 flex-shrink-0 mt-1" size={20} />
                <div>
                  <p className="font-semibold text-lg">Guaranteed Growth</p>
                  <p className="text-sm text-gray-400">The perfect mix of quality content and authority building.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
