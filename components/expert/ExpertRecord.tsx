import { Check } from 'lucide-react';
import { Reveal } from '../home/Reveal';

const PROFILE = [
  ['expert', 'EXP-0417'],
  ['field', 'Internal medicine · MD'],
  ['languages', 'Hindi · Marathi · English'],
] as const;

const CHECKS = [
  ['identity', 'Government ID verified'],
  ['credentials', 'Degree and licence confirmed'],
  ['skills test', 'Paid task · passed senior review'],
  ['agreements', 'NDA · IP assignment signed'],
  ['access', 'Managed account · two-factor on'],
  ['calibration', 'Gold-answer set matched'],
] as const;

export function ExpertRecord() {
  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute -inset-3 -z-10 rotate-[1.4deg] rounded-[10px] border border-rule bg-paper-deep"
      />
      <div className="overflow-hidden rounded-[8px] border border-ink/15 bg-paper-card font-mono text-[12.5px] shadow-[0_30px_60px_-30px_rgba(21,20,15,0.35)]">
        <div className="flex items-center justify-between border-b border-rule px-5 py-3 text-[10.5px] uppercase tracking-[0.14em] text-ink-muted">
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-signal" />
            expert.record
          </span>
          <span>Illustrative</span>
        </div>

        <dl className="border-b border-rule px-5 py-4">
          {PROFILE.map(([k, v]) => (
            <div key={k} className="grid grid-cols-[7.5rem_1fr] gap-3 py-1.5">
              <dt className="text-ink-faint">{k}</dt>
              <dd className="text-ink">{v}</dd>
            </div>
          ))}
        </dl>

        <ul className="divide-y divide-rule">
          {CHECKS.map(([k, v], i) => (
            <li key={k}>
              <Reveal delay={0.15 + i * 0.12} className="grid grid-cols-[7.5rem_1fr_auto] items-center gap-3 px-5 py-3">
                <span className="text-ink-faint">{k}</span>
                <span className="text-ink-soft">{v}</span>
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-moss text-paper">
                  <Check size={12} strokeWidth={3} />
                </span>
              </Reveal>
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between border-t border-ink/15 bg-ink px-5 py-3.5 text-paper">
          <span className="text-paper/55">status</span>
          <span className="flex items-center gap-2 text-[11px] uppercase tracking-[0.14em]">
            <span className="h-2 w-2 animate-blink rounded-full bg-signal" />
            Ready for pilot
          </span>
        </div>
      </div>
    </div>
  );
}
