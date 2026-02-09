"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';

/**
 * Elite Scroll Animation System
 * - Smooth flowing gradient orbs that follow scroll
 * - Subtle section reveal animations
 * - Professional, non-distracting aesthetic
 */

// ============================================================================
// FLOWING GRADIENT BACKGROUND
// Creates smooth, organic gradient orbs that move with scroll
// ============================================================================

export const FlowingGradientBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const scrollRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Track scroll position
    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Track mouse position (subtle interaction)
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Gradient orbs configuration - Light grey tones for black background
    const orbs = [
      { 
        x: 0.2, y: 0.3, 
        baseRadius: 500, 
        color: 'rgba(255, 255, 255, 0.03)', // Light grey
        speedX: 0.0003, speedY: 0.0002,
        scrollInfluence: 0.15
      },
      { 
        x: 0.8, y: 0.5, 
        baseRadius: 450, 
        color: 'rgba(255, 255, 255, 0.025)', // Slightly lighter
        speedX: -0.0002, speedY: 0.0003,
        scrollInfluence: 0.1
      },
      { 
        x: 0.5, y: 0.7, 
        baseRadius: 550, 
        color: 'rgba(255, 255, 255, 0.02)', // Very subtle
        speedX: 0.0002, speedY: -0.0002,
        scrollInfluence: 0.2
      },
      { 
        x: 0.1, y: 0.8, 
        baseRadius: 400, 
        color: 'rgba(255, 255, 255, 0.035)', // Slightly more visible
        speedX: 0.0003, speedY: 0.0001,
        scrollInfluence: 0.12
      },
      { 
        x: 0.9, y: 0.2, 
        baseRadius: 350, 
        color: 'rgba(255, 255, 255, 0.02)', // Very subtle top right
        speedX: -0.0001, speedY: 0.0002,
        scrollInfluence: 0.08
      },
    ];

    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 1;

      const scroll = scrollRef.current;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = maxScroll > 0 ? scroll / maxScroll : 0;

      orbs.forEach((orb, index) => {
        // Calculate position with scroll influence
        const scrollOffset = scroll * orb.scrollInfluence * 0.1;
        
        // Organic movement using sin/cos
        const wobbleX = Math.sin(time * orb.speedX + index) * 50;
        const wobbleY = Math.cos(time * orb.speedY + index * 0.5) * 50;
        
        // Calculate final position
        const x = orb.x * canvas.width + wobbleX;
        const y = (orb.y * canvas.height + scrollOffset + wobbleY) % (canvas.height * 1.5);
        
        // Subtle mouse influence
        const mouseInfluenceX = (mouseRef.current.x - canvas.width / 2) * 0.02;
        const mouseInfluenceY = (mouseRef.current.y - canvas.height / 2) * 0.02;
        
        // Dynamic radius based on scroll
        const radiusModifier = 1 + Math.sin(scrollProgress * Math.PI * 2) * 0.1;
        const radius = orb.baseRadius * radiusModifier;

        // Create gradient
        const gradient = ctx.createRadialGradient(
          x + mouseInfluenceX, y + mouseInfluenceY, 0,
          x + mouseInfluenceX, y + mouseInfluenceY, radius
        );
        gradient.addColorStop(0, orb.color);
        gradient.addColorStop(1, 'transparent');

        ctx.beginPath();
        ctx.arc(x + mouseInfluenceX, y + mouseInfluenceY, radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 1 }}
    />
  );
};

// ============================================================================
// SCROLL PROGRESS INDICATOR
// Elegant line that shows scroll progress
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
// SECTION REVEAL ANIMATION WRAPPER
// Animates sections as they enter the viewport
// ============================================================================

interface RevealOnScrollProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
}

export const RevealOnScroll: React.FC<RevealOnScrollProps> = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const getTransform = () => {
    switch (direction) {
      case 'up': return 'translateY(40px)';
      case 'down': return 'translateY(-40px)';
      case 'left': return 'translateX(40px)';
      case 'right': return 'translateX(-40px)';
      case 'none': return 'none';
      default: return 'translateY(40px)';
    }
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'none' : getTransform(),
        transition: `opacity 0.8s ease-out ${delay}ms, transform 0.8s ease-out ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

// ============================================================================
// PARALLAX SECTION WRAPPER
// Creates subtle depth effect on scroll
// ============================================================================

interface ParallaxSectionProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

export const ParallaxSection: React.FC<ParallaxSectionProps> = ({
  children,
  speed = 0.1,
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      
      const rect = ref.current.getBoundingClientRect();
      const scrollProgress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
      const clampedProgress = Math.max(0, Math.min(1, scrollProgress));
      
      setOffset((clampedProgress - 0.5) * 100 * speed);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: `translateY(${offset}px)`,
        transition: 'transform 0.1s ease-out',
      }}
    >
      {children}
    </div>
  );
};

// ============================================================================
// FLOATING PARTICLES (Very Subtle)
// Creates ethereal floating elements
// ============================================================================

export const FloatingParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Create particles
    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedY: number;
      opacity: number;
      fadeDirection: number;
    }> = [];

    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speedY: Math.random() * 0.3 + 0.1,
        opacity: Math.random() * 0.3 + 0.1,
        fadeDirection: Math.random() > 0.5 ? 1 : -1,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        // Update position
        particle.y -= particle.speedY;
        
        // Reset if off screen
        if (particle.y < -10) {
          particle.y = canvas.height + 10;
          particle.x = Math.random() * canvas.width;
        }

        // Fade effect
        particle.opacity += particle.fadeDirection * 0.005;
        if (particle.opacity >= 0.4 || particle.opacity <= 0.1) {
          particle.fadeDirection *= -1;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(16, 185, 129, ${particle.opacity})`;
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  );
};

// ============================================================================
// GLOW CURSOR EFFECT (Optional - for premium feel)
// Creates a subtle glow following the cursor
// ============================================================================

export const GlowCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      className="fixed pointer-events-none z-50 transition-opacity duration-300"
      style={{
        left: position.x,
        top: position.y,
        opacity: isVisible ? 1 : 0,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <div
        className="w-[300px] h-[300px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.08) 0%, transparent 70%)',
        }}
      />
    </div>
  );
};

// ============================================================================
// COMBINED SCROLL ANIMATION PROVIDER
// Wraps the entire page with all animation effects
// ============================================================================

interface ScrollAnimationProviderProps {
  children: React.ReactNode;
  enableGradient?: boolean;
  enableParticles?: boolean;
  enableProgress?: boolean;
  enableCursor?: boolean;
}

export const ScrollAnimationProvider: React.FC<ScrollAnimationProviderProps> = ({
  children,
  enableGradient = true,
  enableParticles = false, // Disabled by default to keep it subtle
  enableProgress = true,
  enableCursor = false, // Disabled by default
}) => {
  return (
    <>
      {enableGradient && <FlowingGradientBackground />}
      {enableParticles && <FloatingParticles />}
      {enableProgress && <ScrollProgressBar />}
      {enableCursor && <GlowCursor />}
      <div className="relative z-10">
        {children}
      </div>
    </>
  );
};

export default ScrollAnimationProvider;
