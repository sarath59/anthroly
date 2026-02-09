"use client";

import React from 'react';
import { useScrollReveal, useParallax } from '@/hooks/useScrollReveal';

/**
 * AnimatedSection - Wraps content with smooth scroll reveal animation
 */

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
  parallax?: boolean;
  parallaxSpeed?: number;
}

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  parallax = false,
  parallaxSpeed = 0.1,
}) => {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();
  const { ref: parallaxRef, offset } = useParallax<HTMLDivElement>(parallaxSpeed);

  const getTransform = () => {
    const baseTransform = parallax ? `translateY(${offset}px)` : '';
    
    if (isVisible) {
      return baseTransform || 'none';
    }

    switch (direction) {
      case 'up':
        return `translateY(50px) ${baseTransform}`;
      case 'down':
        return `translateY(-50px) ${baseTransform}`;
      case 'left':
        return `translateX(50px) ${baseTransform}`;
      case 'right':
        return `translateX(-50px) ${baseTransform}`;
      case 'fade':
        return baseTransform || 'none';
      default:
        return `translateY(50px) ${baseTransform}`;
    }
  };

  // Merge refs
  const mergedRef = (node: HTMLDivElement | null) => {
    (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
    if (parallax) {
      (parallaxRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
    }
  };

  return (
    <div
      ref={mergedRef}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transition: `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
};

/**
 * StaggeredReveal - Reveals children with staggered timing
 */

interface StaggeredRevealProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
}

export const StaggeredReveal: React.FC<StaggeredRevealProps> = ({
  children,
  className = '',
  staggerDelay = 100,
  direction = 'up',
}) => {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  const getInitialTransform = () => {
    switch (direction) {
      case 'up': return 'translateY(30px)';
      case 'down': return 'translateY(-30px)';
      case 'left': return 'translateX(30px)';
      case 'right': return 'translateX(-30px)';
      case 'fade': return 'none';
      default: return 'translateY(30px)';
    }
  };

  return (
    <div ref={ref} className={className}>
      {React.Children.map(children, (child, index) => (
        <div
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'none' : getInitialTransform(),
            transition: `opacity 0.6s ease-out ${index * staggerDelay}ms, transform 0.6s ease-out ${index * staggerDelay}ms`,
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
};

/**
 * TextReveal - Character-by-character text reveal
 */

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  charDelay?: number;
}

export const TextReveal: React.FC<TextRevealProps> = ({
  text,
  className = '',
  delay = 0,
  charDelay = 30,
}) => {
  const { ref, isVisible } = useScrollReveal<HTMLSpanElement>();

  return (
    <span ref={ref} className={className}>
      {text.split('').map((char, index) => (
        <span
          key={index}
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            display: 'inline-block',
            transition: `opacity 0.4s ease-out ${delay + index * charDelay}ms, transform 0.4s ease-out ${delay + index * charDelay}ms`,
            whiteSpace: char === ' ' ? 'pre' : undefined,
          }}
        >
          {char}
        </span>
      ))}
    </span>
  );
};

/**
 * CountUp - Animated number counter
 */

interface CountUpProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export const CountUp: React.FC<CountUpProps> = ({
  end,
  duration = 2000,
  prefix = '',
  suffix = '',
  className = '',
}) => {
  const { ref, isVisible } = useScrollReveal<HTMLSpanElement>();
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing function (ease-out-quart)
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [isVisible, end, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}{count}{suffix}
    </span>
  );
};

/**
 * ParallaxLayer - Creates depth with parallax effect
 */

interface ParallaxLayerProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

export const ParallaxLayer: React.FC<ParallaxLayerProps> = ({
  children,
  speed = 0.5,
  className = '',
}) => {
  const { ref, offset } = useParallax<HTMLDivElement>(speed);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: `translateY(${offset}px)`,
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;
