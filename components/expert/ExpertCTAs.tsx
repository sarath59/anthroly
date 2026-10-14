import { ArrowUpRight, Mail } from 'lucide-react';
import { EXPERT_APPLY_MAILTO, PILOT_BOOKING_URL } from '@/lib/expert-data';

export function ExpertCTAs({ dark = false, className = '' }: { dark?: boolean; className?: string }) {
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      <a
        href={PILOT_BOOKING_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={dark ? 'btn-paper' : 'btn-ink'}
      >
        Request a pilot
        <ArrowUpRight size={16} />
      </a>
      <a
        href={EXPERT_APPLY_MAILTO}
        className={
          dark
            ? 'inline-flex items-center gap-2 rounded-full border border-paper/25 px-6 py-3.5 text-[15px] font-medium text-paper transition-all duration-300 hover:gap-3 hover:border-paper'
            : 'btn-ghost'
        }
      >
        Join as an expert
        <Mail size={15} />
      </a>
    </div>
  );
}
