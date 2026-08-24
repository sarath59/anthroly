"use client";

import React, { useEffect, useState } from 'react';

/**
 * Elite Scroll Animation System
 * - Smooth flowing gradient orbs that follow scroll
 * - CSS-based for reliability
 */

// ============================================================================
// FLOWING GRADIENT BACKGROUND - CSS Version (More Reliable)
// ============================================================================

export const FlowingGradientBackground = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {/* Main gradient orbs */}
      <div 
        className="absolute w-[800px] h-[800px] rounded-full opacity-100"
        style={{
          background: 'radial-gradient(circle, rgba(120,120,120,0.15) 0%, rgba(80,80,80,0.08) 40%, transparent 70%)',
          left: '10%',
          top: `${-200 + scrollY * 0.05}px`,
          transform: `translateY(${Math.sin(scrollY * 0.002) * 30}px)`,
          transition: 'transform 0.3s ease-out',
        }}
      />
      
      <div 
        className="absolute w-[700px] h-[700px] rounded-full opacity-100"
        style={{
          background: 'radial-gradient(circle, rgba(140,140,140,0.12) 0%, rgba(100,100,100,0.06) 40%, transparent 70%)',
          right: '-5%',
          top: `${300 + scrollY * 0.08}px`,
          transform: `translateY(${Math.cos(scrollY * 0.002) * 25}px)`,
          transition: 'transform 0.3s ease-out',
        }}
      />
      
      <div 
        className="absolute w-[900px] h-[900px] rounded-full opacity-100"
        style={{
          background: 'radial-gradient(circle, rgba(100,100,100,0.1) 0%, rgba(70,70,70,0.05) 40%, transparent 70%)',
          left: '30%',
          top: `${600 + scrollY * 0.03}px`,
          transform: `translateX(${Math.sin(scrollY * 0.001) * 40}px)`,
          transition: 'transform 0.3s ease-out',
        }}
      />
      
      <div 
        className="absolute w-[600px] h-[600px] rounded-full opacity-100"
        style={{
          background: 'radial-gradient(circle, rgba(150,150,150,0.1) 0%, rgba(110,110,110,0.05) 40%, transparent 70%)',
          left: '-10%',
          top: `${1000 + scrollY * 0.06}px`,
          transform: `translateY(${Math.cos(scrollY * 0.0015) * 35}px)`,
          transition: 'transform 0.3s ease-out',
        }}
      />

      <div 
        className="absolute w-[750px] h-[750px] rounded-full opacity-100"
        style={{
          background: 'radial-gradient(circle, rgba(130,130,130,0.12) 0%, rgba(90,90,90,0.06) 40%, transparent 70%)',
          right: '15%',
          top: `${1400 + scrollY * 0.04}px`,
          transform: `translateX(${Math.cos(scrollY * 0.0012) * 30}px)`,
          transition: 'transform 0.3s ease-out',
        }}
      />
    </div>
  );
};

// ============================================================================
// SCROLL PROGRESS INDICATOR
// ============================================================================

export const ScrollProgressBar = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(scrollProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] z-50 bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 transition-all duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

// ============================================================================
// COMBINED SCROLL ANIMATION PROVIDER
// ============================================================================

interface ScrollAnimationProviderProps {
  children: React.ReactNode;
  enableGradient?: boolean;
  enableProgress?: boolean;
}

export const ScrollAnimationProvider: React.FC<ScrollAnimationProviderProps> = ({
  children,
  enableGradient = true,
  enableProgress = true,
}) => {
  return (
    <div className="relative min-h-screen bg-black">
      {enableGradient && <FlowingGradientBackground />}
      {enableProgress && <ScrollProgressBar />}
      <div className="relative" style={{ zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
};

export default ScrollAnimationProvider;
