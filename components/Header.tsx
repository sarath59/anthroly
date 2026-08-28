"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BOOK_CALL_URL, COHORT_SLOTS, PRIMARY_CTA_LABEL } from '@/lib/site';
import { Button } from './ui/button';
import { Menu, X, ArrowRight } from 'lucide-react';

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header id="site-header" className="fixed top-0 left-0 right-0 z-50 px-4 pt-4">
      {/* Glassmorphism nav container */}
      <nav className="mx-auto max-w-6xl rounded-2xl bg-gray-900/80 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
        <div className="flex items-center justify-between px-6 py-3">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-white/10 flex items-center justify-center overflow-hidden group-hover:border-emerald-500/30 transition-all duration-300">
              <Image
                src="/logo.png"
                alt="Anthroly"
                width={32}
                height={32}
                sizes="32px"
                className="object-contain invert opacity-90 group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">
              Anthroly
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            <Link
              href="/#features"
              className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
            >
              Services
            </Link>
            <Link
              href="/#pricing"
              className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
            >
              Pricing
            </Link>
            <Link
              href="/customers"
              className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
            >
              Testimonials
            </Link>
            <Link
              href="/resources"
              className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
            >
              Resources
            </Link>
            <Link
              href="/tools"
              className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
            >
              Free Tools
            </Link>
            
            <div className="w-px h-6 bg-white/10 mx-2"></div>

            <span className="hidden lg:inline text-xs font-semibold text-emerald-400 mr-2">
              Only {COHORT_SLOTS} slots
            </span>
            
            <a href={BOOK_CALL_URL} target="_blank" rel="noopener noreferrer">
              <Button 
                size="sm"
                className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-black font-semibold hover:from-emerald-400 hover:to-cyan-400 rounded-lg px-5 shadow-[0_0_20px_-5px_rgba(16,185,129,0.5)] hover:shadow-[0_0_25px_-5px_rgba(16,185,129,0.7)] transition-all duration-300"
              >
                {PRIMARY_CTA_LABEL}
                <ArrowRight size={16} className="ml-1" />
              </Button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Navigation - Glassmorphism dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-white/10 px-4 py-4 space-y-1 animate-fade-in">
            <Link
              href="/#features"
              className="block px-4 py-3 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-all"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              href="/#pricing"
              className="block px-4 py-3 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-all"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              href="/customers"
              className="block px-4 py-3 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-all"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Testimonials
            </Link>
            <Link
              href="/resources"
              className="block px-4 py-3 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-all"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Resources
            </Link>
            <Link
              href="/tools"
              className="block px-4 py-3 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-all"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Free Tools
            </Link>
            <p className="px-4 py-2 text-xs font-semibold text-emerald-400">Only {COHORT_SLOTS} slots</p>
            <div className="pt-2">
              <a href={BOOK_CALL_URL} target="_blank" rel="noopener noreferrer" onClick={() => setIsMobileMenuOpen(false)}>
                <Button 
                  size="lg" 
                  className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-black font-semibold hover:from-emerald-400 hover:to-cyan-400 rounded-xl"
                >
                  {PRIMARY_CTA_LABEL}
                  <ArrowRight size={18} className="ml-2" />
                </Button>
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
