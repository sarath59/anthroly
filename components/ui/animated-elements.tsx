'use client';

import { useEffect, useState, useRef, ReactNode } from 'react';
import { motion, useScroll, useTransform, useInView, useSpring } from 'framer-motion';

// ============================================================================
// SCROLL REVEAL - Smooth reveal as elements enter viewport (Linear-style)
// ============================================================================
interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  duration?: number;
  once?: boolean;
}

export const ScrollReveal = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  duration = 0.7,
  once = true,
}: ScrollRevealProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: '-80px' });

  const directionMap = {
    up: { y: 40 },
    down: { y: -40 },
    left: { x: 60 },
    right: { x: -60 },
    none: {},
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, ...directionMap[direction] }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
    >
      {children}
    </motion.div>
  );
};

// ============================================================================
// STAGGER CONTAINER - Stagger children reveal (Stripe-style)
// ============================================================================
interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  delayStart?: number;
}

export const StaggerContainer = ({
  children,
  className = '',
  staggerDelay = 0.08,
  delayStart = 0,
}: StaggerContainerProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: delayStart,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem = ({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) => (
  <motion.div
    className={className}
    variants={{
      hidden: { opacity: 0, y: 24, filter: 'blur(4px)' },
      visible: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] },
      },
    }}
  >
    {children}
  </motion.div>
);

// ============================================================================
// ANIMATED COUNTER - Numbers count up when visible
// ============================================================================
interface AnimatedCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}

export const AnimatedCounter = ({
  value,
  prefix = '',
  suffix = '',
  duration = 2,
  className = '',
}: AnimatedCounterProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let startTime: number;
    let frame: number;

    const animate = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setDisplayValue(Math.floor(eased * value));
      if (progress < 1) frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {displayValue.toLocaleString()}
      {suffix}
    </span>
  );
};

// ============================================================================
// GRADIENT LIGHT BEAM - Stripe/Linear style moving light across card
// ============================================================================
interface GradientBeamProps {
  className?: string;
  color?: string;
}

export const GradientBeam = ({ className = '', color = 'emerald' }: GradientBeamProps) => {
  const colorMap: Record<string, string> = {
    emerald: 'from-transparent via-emerald-400/40 to-transparent',
    cyan: 'from-transparent via-cyan-400/40 to-transparent',
    purple: 'from-transparent via-purple-400/40 to-transparent',
    blue: 'from-transparent via-blue-400/40 to-transparent',
    orange: 'from-transparent via-orange-400/40 to-transparent',
    amber: 'from-transparent via-amber-400/40 to-transparent',
  };

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none rounded-[inherit] ${className}`}>
      <motion.div
        className={`absolute -inset-x-full h-full bg-gradient-to-r ${colorMap[color] || colorMap.emerald}`}
        animate={{ x: ['-100%', '200%'] }}
        transition={{ duration: 3, repeat: Infinity, repeatDelay: 2, ease: 'linear' }}
      />
    </div>
  );
};

// ============================================================================
// ANIMATED GRADIENT BORDER - Rotating gradient border (Vercel-style)
// ============================================================================
interface GradientBorderProps {
  children: ReactNode;
  className?: string;
  borderClassName?: string;
  animated?: boolean;
}

export const GradientBorder = ({
  children,
  className = '',
  borderClassName = '',
  animated = true,
}: GradientBorderProps) => (
  <div className={`relative group ${className}`}>
    <motion.div
      className={`absolute -inset-[1px] rounded-[inherit] bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 opacity-40 blur-sm ${borderClassName}`}
      animate={animated ? { rotate: [0, 360] } : undefined}
      transition={animated ? { duration: 8, repeat: Infinity, ease: 'linear' } : undefined}
      style={{ backgroundSize: '200% 200%' }}
    />
    <div className="relative bg-gray-900 rounded-[inherit]">{children}</div>
  </div>
);

// ============================================================================
// HIGHLIGHT TEXT - Animated underline/highlight on scroll (Linear-style)
// ============================================================================
interface HighlightTextProps {
  children: ReactNode;
  className?: string;
  color?: string;
}

export const HighlightText = ({ children, className = '', color = '#10b981' }: HighlightTextProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <span ref={ref} className={`relative inline ${className}`}>
      {children}
      <motion.span
        className="absolute left-0 bottom-0 h-[3px] rounded-full"
        style={{ backgroundColor: color }}
        initial={{ width: '0%' }}
        animate={isInView ? { width: '100%' } : { width: '0%' }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
      />
    </span>
  );
};

// ============================================================================
// PARALLAX SECTION - Subtle depth effect on scroll
// ============================================================================
interface ParallaxProps {
  children: ReactNode;
  className?: string;
  speed?: number;
}

export const Parallax = ({ children, className = '', speed = 0.3 }: ParallaxProps) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [speed * 100, -speed * 100]);
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

  return (
    <motion.div ref={ref} className={className} style={{ y: smoothY }}>
      {children}
    </motion.div>
  );
};

// ============================================================================
// DRAW LINE - SVG line that draws itself on scroll
// ============================================================================
interface DrawLineProps {
  className?: string;
  direction?: 'vertical' | 'horizontal';
  color?: string;
  height?: number;
}

export const DrawLine = ({
  className = '',
  direction = 'vertical',
  color = '#10b981',
  height = 200,
}: DrawLineProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  const isVertical = direction === 'vertical';

  return (
    <svg
      ref={ref}
      className={className}
      width={isVertical ? 2 : height}
      height={isVertical ? height : 2}
      viewBox={`0 0 ${isVertical ? 2 : height} ${isVertical ? height : 2}`}
    >
      <motion.line
        x1={0}
        y1={0}
        x2={isVertical ? 0 : height}
        y2={isVertical ? height : 0}
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={isInView ? { pathLength: 1, opacity: 0.5 } : {}}
        transition={{ duration: 1.2, ease: [0.21, 0.47, 0.32, 0.98] }}
      />
    </svg>
  );
};

// ============================================================================
// HOVER TILT - 3D tilt on hover (Stripe-style card effect)
// ============================================================================
interface HoverTiltProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
}

export const HoverTilt = ({ children, className = '', intensity = 8 }: HoverTiltProps) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setRotateX(-y * intensity);
    setRotateY(x * intensity);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX, rotateY }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{ transformPerspective: 1000, transformStyle: 'preserve-3d' }}
    >
      {children}
    </motion.div>
  );
};

// ============================================================================
// SPOTLIGHT - Cursor-following spotlight glow on hover
// ============================================================================
interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
}

export const SpotlightCard = ({
  children,
  className = '',
  spotlightColor = 'rgba(16,185,129,0.35)',
}: SpotlightCardProps) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Spotlight gradient */}
      <motion.div
        className="absolute pointer-events-none z-0"
        animate={{
          opacity: isHovered ? 1 : 0,
          x: position.x - 200,
          y: position.y - 200,
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 30, opacity: { duration: 0.3 } }}
        style={{
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${spotlightColor} 0%, transparent 65%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

// ============================================================================
// ANIMATED PROGRESS BAR - Fills to target width on scroll
// ============================================================================
interface ProgressBarProps {
  progress: number; // 0-100
  className?: string;
  color?: string;
  height?: number;
}

export const ProgressBar = ({
  progress,
  className = '',
  color = 'from-emerald-500 to-cyan-500',
  height = 4,
}: ProgressBarProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <div ref={ref} className={`w-full bg-gray-800 rounded-full overflow-hidden ${className}`} style={{ height }}>
      <motion.div
        className={`h-full bg-gradient-to-r ${color} rounded-full`}
        initial={{ width: '0%' }}
        animate={isInView ? { width: `${progress}%` } : { width: '0%' }}
        transition={{ duration: 1.5, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
      />
    </div>
  );
};

// ============================================================================
// GLOW PULSE - Soft pulsing glow behind elements
// ============================================================================
interface GlowPulseProps {
  className?: string;
  color?: string;
  size?: number;
}

export const GlowPulse = ({ className = '', color = 'emerald', size = 400 }: GlowPulseProps) => {
  const colorMap: Record<string, string> = {
    emerald: 'bg-emerald-500/40',
    cyan: 'bg-cyan-500/40',
    purple: 'bg-purple-500/40',
    blue: 'bg-blue-500/40',
    orange: 'bg-orange-500/40',
    amber: 'bg-amber-500/40',
  };

  return (
    <motion.div
      className={`absolute rounded-full blur-[100px] pointer-events-none ${colorMap[color] || colorMap.emerald} ${className}`}
      style={{ width: size, height: size }}
      animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
};

// ============================================================================
// ANIMATED LINE CONNECTOR - Lines between process steps
// ============================================================================
interface LineConnectorProps {
  className?: string;
  color?: string;
}

export const LineConnector = ({ className = '', color = '#10b981' }: LineConnectorProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <div ref={ref} className={`flex justify-center ${className}`}>
      <motion.div
        className="w-0.5 rounded-full"
        style={{ backgroundColor: color }}
        initial={{ height: 0, opacity: 0 }}
        animate={isInView ? { height: 32, opacity: 0.3 } : {}}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      />
    </div>
  );
};

// ============================================================================
// FLOATING BADGE - Badge that gently floats
// ============================================================================
interface FloatingBadgeProps {
  children: ReactNode;
  className?: string;
}

export const FloatingBadge = ({ children, className = '' }: FloatingBadgeProps) => (
  <motion.div
    className={className}
    animate={{ y: [-4, 4, -4] }}
    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
  >
    {children}
  </motion.div>
);

// ============================================================================
// SCALE ON SCROLL - Element scales up as it enters
// ============================================================================
interface ScaleOnScrollProps {
  children: ReactNode;
  className?: string;
}

export const ScaleOnScroll = ({ children, className = '' }: ScaleOnScrollProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, scale: 0.85, y: 30 }}
      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </motion.div>
  );
};

// ============================================================================
// TYPING EFFECT - Modern typewriter for headlines
// ============================================================================
interface TypingTextProps {
  text: string;
  className?: string;
  speed?: number;
}

export const TypingText = ({ text, className = '', speed = 40 }: TypingTextProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    if (!isInView) return;
    let i = 0;
    const interval = setInterval(() => {
      setDisplayText(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [isInView, text, speed]);

  return (
    <span ref={ref} className={className}>
      {displayText}
      <span className="inline-block w-[2px] h-[1em] bg-emerald-400 ml-0.5 animate-pulse align-middle" />
    </span>
  );
};
