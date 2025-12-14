"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { LogoWithImage } from './LogoWithImage';
import { Button } from './ui/button';
import { Menu, X } from 'lucide-react';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-sm shadow-md py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex-shrink-0">
            <LogoWithImage variant={isScrolled ? 'black' : 'white'} />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/#features"
              className={`text-sm font-medium transition-colors duration-200 ${
                isScrolled ? 'text-gray-700 hover:text-black' : 'text-gray-300 hover:text-white'
              }`}
            >
              Services
            </Link>
            <Link
              href="/#pricing"
              className={`text-sm font-medium transition-colors duration-200 ${
                isScrolled ? 'text-gray-700 hover:text-black' : 'text-gray-300 hover:text-white'
              }`}
            >
              Pricing
            </Link>
            <Link
              href="/blog"
              className={`text-sm font-medium transition-colors duration-200 ${
                isScrolled ? 'text-gray-700 hover:text-black' : 'text-gray-300 hover:text-white'
              }`}
            >
              Blog
            </Link>
            <Link href="/#pricing">
              <Button 
                size="lg" 
                className={`ml-4 ${
                  isScrolled 
                    ? 'bg-black text-white hover:bg-gray-800' 
                    : 'bg-white text-black hover:bg-gray-200'
                }`}
              >
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden p-2 ${isScrolled ? 'text-black' : 'text-white'}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4 animate-fade-in bg-white rounded-xl p-4 shadow-xl">
            <Link
              href="/#features"
              className="block text-sm font-medium text-gray-700 hover:text-black transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              href="/#pricing"
              className="block text-sm font-medium text-gray-700 hover:text-black transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              href="/blog"
              className="block text-sm font-medium text-gray-700 hover:text-black transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Blog
            </Link>
            <Link href="/#pricing" onClick={() => setIsMobileMenuOpen(false)}>
              <Button size="lg" className="w-full">
                Get Started
              </Button>
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};
