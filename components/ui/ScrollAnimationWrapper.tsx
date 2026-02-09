"use client";

import React from 'react';
import { ScrollAnimationProvider } from './ScrollAnimations';

/**
 * Client-side wrapper for scroll animations
 */

interface ScrollAnimationWrapperProps {
  children: React.ReactNode;
}

export const ScrollAnimationWrapper: React.FC<ScrollAnimationWrapperProps> = ({ children }) => {
  return (
    <ScrollAnimationProvider
      enableGradient={true}
      enableProgress={true}
    >
      {children}
    </ScrollAnimationProvider>
  );
};

export default ScrollAnimationWrapper;
