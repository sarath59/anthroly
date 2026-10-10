"use client";

import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { CAL_BOOKING_URL, CONTACT_EMAIL } from '@/lib/site';
import { DATAFAST_GOALS, trackGoal } from '@/lib/datafast';

export type Side = 'seller' | 'lab';

const SELLER_SYSTEMS = [
  'Slack / Teams',
  'Email',
  'Support tickets',
  'CRM',
  'Call recordings',
  'Code / GitHub',
  'Docs / wikis',
  'ERP / accounting',
  'Field records',
  'Design files',
];

const LAB_NEEDS = [
  'RL environments',
  'Agent trajectories',
  'Held-out evals',
  'Preference / SFT',
  'Licensed corpora',
  'Custom sourcing',
];

const HISTORY = ['Under 1 year', '1–3 years', '3–5 years', '5–10 years', '10+ years'];
const HEADCOUNT = ['1–10', '11–50', '51–200', '201–1,000', '1,000+'];
const TIMELINE = ['This month', 'This quarter', 'Next two quarters', 'Exploring'];

function Chips({
  options,
  selected,
  onToggle,
}: {
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {options.map((opt) => {
        const on = selected.includes(opt);
        return (
          <button
            type="button"
            key={opt}
            onClick={() => onToggle(opt)}
            aria-pressed={on}
            className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-[14px] transition-all duration-200 ${
              on ? 'border-ink bg-ink text-paper' : 'border-ink/20 text-ink-soft hover:border-ink/50'
            }`}
          >
            {on && <Check size={13} />}
            {opt}
          </button>
        );
      })}
    </div>
  );
}

function Select({
  name,
  options,
  value,
  onChange,
}: {
  name: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <select
      name={name}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="field cursor-pointer appearance-none bg-[length:12px] bg-[right_2px_center] bg-no-repeat"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%2315140F' fill='none' stroke-width='1.4'/%3E%3C/svg%3E\")",
      }}
    >
      <option value="">Select</option>
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}

function Label({ children, hint }: { children: React.ReactNode; hint?: string }) {
  return (
    <span className="flex items-baseline justify-between gap-4">
      <span className="eyebrow !text-ink-soft">{children}</span>
      {hint && <span className="font-mono text-[10.5px] text-ink-faint">{hint}</span>}
    </span>
  );
}

export function IntakeForm({ initialSide }: { initialSide: Side }) {
  const [side, setSide] = useState<Side>(initialSide);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [website, setWebsite] = useState('');
  const [usBased, setUsBased] = useState<'' | 'yes' | 'no'>('');
  const [systems, setSystems] = useState<string[]>([]);
  const [history, setHistory] = useState('');
  const [headcount, setHeadcount] = useState('');
  const [industry, setIndustry] = useState('');
  const [needs, setNeeds] = useState<string[]>([]);
  const [domain, setDomain] = useState('');
  const [timeline, setTimeline] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);

  const toggle = (list: string[], set: (v: string[]) => void) => (value: string) =>
    set(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);

  const blockedNonUS = side === 'seller' && usBased === 'no';

  function buildSummary(): string {
    const lines =
      side === 'seller'
        ? [
            'SELLER INTAKE',
            `Company: ${company}${website ? ` (${website})` : ''}`,
            `US-based: ${usBased || 'not answered'}`,
            `Industry: ${industry || '-'}`,
            `Headcount: ${headcount || '-'}`,
            `History: ${history || '-'}`,
            `Systems: ${systems.join(', ') || '-'}`,
          ]
        : [
            'AI LAB REQUEST',
            `Lab / team: ${company}${website ? ` (${website})` : ''}`,
            `Needs: ${needs.join(', ') || '-'}`,
            `Domain: ${domain || '-'}`,
            `Timeline: ${timeline || '-'}`,
          ];
    if (notes.trim()) lines.push('', `Notes: ${notes.trim()}`);
    return lines.join('\n');
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');

    if (!name.trim() || !email.trim() || !company.trim()) {
      setError('Name, work email and company are required.');
      return;
    }
    if (side === 'seller') {
      if (!usBased) {
        setError('Let us know whether your company is headquartered in the US.');
        return;
      }
      if (blockedNonUS) return;
      if (!systems.length) {
        setError('Pick at least one system your company uses.');
        return;
      }
    }
    if (side === 'lab' && !needs.length) {
      setError('Pick at least one kind of data you need.');
      return;
    }

    const params = new URLSearchParams({
      name: name.trim(),
      email: email.trim(),
      notes: buildSummary(),
    });
    const meta: Record<string, string> = {
      side,
      company: company.trim(),
      website: website.trim(),
      ...(side === 'seller'
        ? { us_based: usBased, industry, headcount, history, systems: systems.join(', ') }
        : { needs: needs.join(', '), domain, timeline }),
    };
    Object.entries(meta).forEach(([k, v]) => {
      if (v) params.set(`metadata[${k}]`, v.slice(0, 450));
    });

    trackGoal(DATAFAST_GOALS.intakeSubmit, { side, systems: String(systems.length || needs.length) });
    setSending(true);
    window.location.href = `${CAL_BOOKING_URL}?${params.toString()}`;
  }

  return (
    <form id="intake" onSubmit={onSubmit} noValidate className="space-y-12">
      <div>
        <Label>I am</Label>
        <div role="radiogroup" className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-[6px] border border-ink bg-ink">
          {(
            [
              ['seller', 'A US company', 'with data to license'],
              ['lab', 'An AI lab', 'looking to source data'],
            ] as const
          ).map(([value, title, sub]) => (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={side === value}
              onClick={() => {
                setSide(value);
                setError('');
              }}
              className={`px-5 py-5 text-left transition-colors duration-300 ${
                side === value ? 'bg-ink text-paper' : 'bg-paper text-ink hover:bg-paper-card'
              }`}
            >
              <span className="block font-serif text-[1.6rem] leading-none">{title}</span>
              <span className={`mt-2 block text-[13px] ${side === value ? 'text-paper/60' : 'text-ink-muted'}`}>
                {sub}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-10 sm:grid-cols-2">
        <label className="block">
          <Label>Your name</Label>
          <input className="field" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" placeholder="Jordan Ellis" />
        </label>
        <label className="block">
          <Label>Work email</Label>
          <input
            className="field"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            placeholder="jordan@company.com"
          />
        </label>
        <label className="block">
          <Label>{side === 'seller' ? 'Company' : 'Lab or team'}</Label>
          <input
            className="field"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            autoComplete="organization"
            placeholder={side === 'seller' ? 'Harlow Supply Co.' : 'Post-training, Agents'}
          />
        </label>
        <label className="block">
          <Label hint="optional">Website</Label>
          <input className="field" value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="company.com" />
        </label>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {side === 'seller' ? (
          <motion.div
            key="seller"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="space-y-12"
          >
            <div>
              <Label>Is your company headquartered in the United States?</Label>
              <div className="mt-4 flex gap-2">
                {(['yes', 'no'] as const).map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setUsBased(v)}
                    aria-pressed={usBased === v}
                    className={`rounded-full border px-6 py-2 text-[14px] capitalize transition-all ${
                      usBased === v ? 'border-ink bg-ink text-paper' : 'border-ink/20 text-ink-soft hover:border-ink/50'
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
              {blockedNonUS && (
                <p className="mt-5 border-l-2 border-signal pl-4 text-[15px] leading-[1.6] text-ink-soft">
                  Thank you for your interest. We only buy data from companies headquartered in the
                  United States, so we&apos;re not the right buyer for you right now.
                </p>
              )}
            </div>

            {!blockedNonUS && (
              <>
                <div>
                  <Label hint="pick all that apply">Which systems does your company use?</Label>
                  <Chips options={SELLER_SYSTEMS} selected={systems} onToggle={toggle(systems, setSystems)} />
                </div>
                <div className="grid gap-10 sm:grid-cols-3">
                  <label className="block">
                    <Label>History</Label>
                    <Select name="history" options={HISTORY} value={history} onChange={setHistory} />
                  </label>
                  <label className="block">
                    <Label>Headcount</Label>
                    <Select name="headcount" options={HEADCOUNT} value={headcount} onChange={setHeadcount} />
                  </label>
                  <label className="block">
                    <Label>Industry</Label>
                    <input className="field" value={industry} onChange={(e) => setIndustry(e.target.value)} placeholder="Freight brokerage" />
                  </label>
                </div>
              </>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="lab"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="space-y-12"
          >
            <div>
              <Label hint="pick all that apply">What do you need?</Label>
              <Chips options={LAB_NEEDS} selected={needs} onToggle={toggle(needs, setNeeds)} />
            </div>
            <div className="grid gap-10 sm:grid-cols-2">
              <label className="block">
                <Label>Domain or capability gap</Label>
                <input className="field" value={domain} onChange={(e) => setDomain(e.target.value)} placeholder="Insurance claims, multi-day agents" />
              </label>
              <label className="block">
                <Label>Timeline</Label>
                <Select name="timeline" options={TIMELINE} value={timeline} onChange={setTimeline} />
              </label>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!blockedNonUS && (
        <label className="block">
          <Label hint="optional">Anything else we should know?</Label>
          <textarea
            className="field min-h-[110px] resize-y"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder={
              side === 'seller'
                ? 'e.g. eight years of dispatch tickets, support moved from Freshdesk to Zendesk in 2021'
                : 'e.g. format, volume, contamination constraints, exclusivity'
            }
          />
        </label>
      )}

      {error && <p className="text-[14px] text-signal-deep">{error}</p>}

      <div className="flex flex-col items-start gap-5 border-t border-rule pt-8 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" disabled={blockedNonUS || sending} className="btn-ink disabled:cursor-not-allowed disabled:opacity-40">
          {sending ? 'Opening calendar…' : 'Continue to book a call'}
          <ArrowRight size={16} />
        </button>
        <p className="max-w-xs text-[13px] leading-[1.5] text-ink-muted">
          Your answers are attached to the booking so the call starts where it should. Prefer email?{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-ink underline decoration-signal underline-offset-4">
            {CONTACT_EMAIL}
          </a>
        </p>
      </div>
    </form>
  );
}
