"use client";

import { useEffect, useState } from 'react';

type Token = string | { raw: string; tag: string };

const THREAD: { who: Token; time: string; text: Token[] }[] = [
  {
    who: { raw: 'Dana Whitfield', tag: 'PERSON_1' },
    time: '9:14',
    text: [
      'Carrier says the pallet for ',
      { raw: 'Harlow Supply', tag: 'ORG_1' },
      ' is stuck in Memphis. They want to reroute through Atlanta, adds two days.',
    ],
  },
  {
    who: { raw: 'Marcus Oyelaran', tag: 'PERSON_2' },
    time: '9:16',
    text: [
      "Don't reroute. Their contract has a late penalty after Thursday. Split the order: ship the 40 units we have from Reno today, backfill the rest.",
    ],
  },
  {
    who: { raw: 'Dana Whitfield', tag: 'PERSON_1' },
    time: '9:21',
    text: [
      'Done. Calling ',
      { raw: '(901) 555-0148', tag: 'PHONE_1' },
      ' to confirm the partial. Logging the exception on ',
      { raw: 'PO #88213', tag: 'ID_1' },
      '.',
    ],
  },
];

function Redactable({ token, scrubbed }: { token: Token; scrubbed: boolean }) {
  if (typeof token === 'string') return <>{token}</>;
  return (
    <span className="relative inline-block align-baseline">
      <span
        className={`transition-opacity duration-500 ${scrubbed ? 'opacity-0' : 'opacity-100'}`}
        aria-hidden={scrubbed}
      >
        {token.raw}
      </span>
      <span
        className={`absolute inset-y-[-1px] left-0 flex items-center whitespace-nowrap rounded-[3px] bg-ink px-1.5 font-mono text-[10.5px] tracking-wide text-paper transition-all duration-500 ${
          scrubbed ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ clipPath: scrubbed ? 'inset(0 0 0 0)' : 'inset(0 100% 0 0)' }}
        aria-hidden={!scrubbed}
      >
        [{token.tag}]
      </span>
    </span>
  );
}

export function RedactionSpecimen() {
  const [scrubbed, setScrubbed] = useState(false);

  useEffect(() => {
    const id = window.setInterval(() => setScrubbed((s) => !s), 3200);
    const first = window.setTimeout(() => setScrubbed(true), 1400);
    return () => {
      window.clearInterval(id);
      window.clearTimeout(first);
    };
  }, []);

  return (
    <figure className="relative">
      <div className="absolute -inset-3 -z-10 rotate-[1.2deg] rounded-[6px] border border-rule bg-paper-deep" />
      <div className="overflow-hidden rounded-[6px] border border-ink/15 bg-paper-card shadow-[0_30px_60px_-30px_rgba(21,20,15,0.35)]">
        <div className="flex items-center justify-between border-b border-rule px-5 py-3">
          <span className="font-mono text-[11px] text-ink-muted">#ops-escalations</span>
          <span className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.12em]">
            <span
              className={`h-1.5 w-1.5 rounded-full transition-colors duration-500 ${
                scrubbed ? 'bg-moss' : 'bg-signal'
              }`}
            />
            <span className={scrubbed ? 'text-moss' : 'text-signal'}>
              {scrubbed ? 'PII scrubbed' : 'Raw record'}
            </span>
          </span>
        </div>

        <div className="ledger-lines space-y-5 px-5 py-6">
          {THREAD.map((msg, i) => (
            <div key={i} className="flex gap-3">
              <div
                className={`mt-0.5 h-7 w-7 shrink-0 rounded-full border border-rule transition-colors duration-500 ${
                  scrubbed ? 'bg-ink/80' : i === 1 ? 'bg-signal-soft' : 'bg-paper-deep'
                }`}
              />
              <div className="min-w-0">
                <p className="text-[13px] font-semibold text-ink">
                  <Redactable token={msg.who} scrubbed={scrubbed} />
                  <span className="ml-2 font-mono text-[10.5px] font-normal text-ink-faint">{msg.time}</span>
                </p>
                <p className="mt-1 text-[14px] leading-[1.55] text-ink-soft">
                  {msg.text.map((t, j) => (
                    <Redactable key={j} token={t} scrubbed={scrubbed} />
                  ))}
                </p>
              </div>
            </div>
          ))}
        </div>

        <dl className="grid grid-cols-3 border-t border-rule font-mono text-[10.5px] uppercase tracking-[0.1em]">
          {[
            ['Source', 'Logistics · US'],
            ['Signal', 'Decision under constraint'],
            ['Kept', 'Roles, timing, reasoning'],
          ].map(([k, v]) => (
            <div key={k} className="border-r border-rule px-4 py-3 last:border-r-0">
              <dt className="text-ink-faint">{k}</dt>
              <dd className="mt-1 normal-case tracking-normal text-ink-soft">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
      <figcaption className="mt-5 font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink-faint">
        Fig. 1 — An illustrative operating record, before and after de-identification
      </figcaption>
    </figure>
  );
}
