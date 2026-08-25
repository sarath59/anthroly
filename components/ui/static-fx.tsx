import type { ReactNode } from 'react';
import { GlowPulse } from './GlowPulse';

export { GlowPulse };

type BoxProps = {
  children?: ReactNode;
  className?: string;
  delay?: number;
  direction?: string;
  duration?: number;
  once?: boolean;
  staggerDelay?: number;
  delayStart?: number;
  intensity?: number;
  spotlightColor?: string;
  color?: string;
  size?: number;
  progress?: number;
};

/** Static stand-ins for former Framer Motion wrappers. Content is visible immediately (LCP / INP). */

export function ScrollReveal({ children, className = '' }: BoxProps) {
  return <div className={className}>{children}</div>;
}

export function StaggerContainer({ children, className = '' }: BoxProps) {
  return <div className={className}>{children}</div>;
}

export function StaggerItem({ children, className = '' }: BoxProps) {
  return <div className={className}>{children}</div>;
}

export function SpotlightCard({ children, className = '' }: BoxProps) {
  return <div className={`relative ${className}`}>{children}</div>;
}

export function HoverTilt({ children, className = '' }: BoxProps) {
  return <div className={className}>{children}</div>;
}

export function ScaleOnScroll({ children, className = '' }: BoxProps) {
  return <div className={className}>{children}</div>;
}

export function GradientBeam({ className = '' }: BoxProps) {
  return <div className={`pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit] ${className}`} aria-hidden />;
}
