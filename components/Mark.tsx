import type { CSSProperties } from 'react';

const MASK: CSSProperties = {
  WebkitMaskImage: 'url(/brand/mark.png)',
  maskImage: 'url(/brand/mark.png)',
  WebkitMaskSize: 'contain',
  maskSize: 'contain',
  WebkitMaskRepeat: 'no-repeat',
  maskRepeat: 'no-repeat',
  WebkitMaskPosition: 'center',
  maskPosition: 'center',
};

/** The Anthroly mark, rendered in currentColor so it adapts to light and dark surfaces. */
export function Mark({ className = '', label }: { className?: string; label?: string }) {
  return (
    <span
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={`inline-block aspect-[492/512] shrink-0 bg-current ${className}`}
      style={MASK}
    />
  );
}
