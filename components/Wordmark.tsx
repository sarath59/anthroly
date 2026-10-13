import Link from 'next/link';
import { Mark } from './Mark';

export function Wordmark({ className = '' }: { className?: string }) {
  return (
    <Link href="/" className={`group inline-flex items-center gap-3 ${className}`} aria-label="Datary Labs home">
      <Mark className="h-[26px] transition-[color,transform] duration-700 ease-out group-hover:rotate-[-24deg] group-hover:text-signal" />
      <span className="flex items-baseline gap-2 leading-none">
        <span className="font-serif text-[26px] tracking-[-0.01em]">Datary</span>
        <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink-muted">Labs</span>
      </span>
    </Link>
  );
}
