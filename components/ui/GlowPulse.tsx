import type { CSSProperties } from 'react';

const COLOR_CLASS: Record<string, string> = {
  emerald: 'bg-emerald-500/30',
  cyan: 'bg-cyan-500/30',
  purple: 'bg-purple-500/30',
  blue: 'bg-blue-500/30',
  orange: 'bg-orange-500/30',
  amber: 'bg-amber-500/30',
};

type GlowPulseProps = {
  className?: string;
  color?: string;
  size?: number;
};

/** CSS-only ambient glow — no Framer Motion, no hydration. */
export function GlowPulse({ className = '', color = 'emerald', size = 400 }: GlowPulseProps) {
  const style: CSSProperties = { width: size, height: size };
  return (
    <div
      className={`absolute rounded-full blur-3xl pointer-events-none animate-glow-pulse ${COLOR_CLASS[color] || COLOR_CLASS.emerald} ${className}`}
      style={style}
      aria-hidden
    />
  );
}
