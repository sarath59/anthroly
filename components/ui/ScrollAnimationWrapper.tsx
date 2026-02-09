"use client";

import React from 'react';
import { ScrollAnimationProvider } from './ScrollAnimations';

/**
 * Client-side wrapper for scroll animations
 * This separates the client component from the server layout
 */

interface ScrollAnimationWrapperProps {
  children: React.ReactNode;
}

export const ScrollAnimationWrapper: React.FC<ScrollAnimationWrapperProps> = ({ children }) => {
  return (
    <ScrollAnimationProvider
      enableGradient={true}
      enableParticles={false}
      enableProgress={true}
      enableCursor={false}
    >
      {children}
    </ScrollAnimationProvider>
  );
};

export default ScrollAnimationWrapper;
