import Link from 'next/link';
import { Mark } from './Mark';

export function Wordmark({ className = '' }: { className?: string }) {
  return (
    <Link href="/" className={`group inline-flex items-center gap-3 ${className}`} aria-label="Anthroly home">
      <Mark className="h-[26px] transition-[color,transform] duration-700 ease-out group-hover:rotate-[-24deg] group-hover:text-signal" />
      <span className="font-serif text-[26px] leading-none tracking-[-0.01em]">Anthroly</span>
    </Link>
  );
}
