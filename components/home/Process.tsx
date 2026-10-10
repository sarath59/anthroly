"use client";

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SectionHead } from './SectionHead';

const TRACKS = {
  seller: {
    label: "If you're selling",
    steps: [
      {
        title: 'Intake',
        body: 'Tell us which systems you run and how far back the record goes. We ask for counts and date ranges, not files. Nothing leaves your systems.',
      },
      {
        title: 'Sample review',
        body: 'A small, de-identified sample is read by a person on our team. We never price a record we have not seen.',
      },
      {
        title: 'Offer and license',
        body: 'You get a firm offer and a bounded license: defined material, defined term, defined use. You keep ownership and keep operating as before.',
      },
      {
        title: 'Scrub and transfer',
        body: 'Names, contact details, account numbers and other identifiers are removed before anything moves. Transfer runs over encrypted channels.',
      },
      {
        title: 'Get paid',
        body: 'Payment follows delivery and approval. Money moves one way, from us to you. No listing, no auction, no fee to you.',
      },
    ],
  },
  lab: {
    label: "If you're buying",
    steps: [
      {
        title: 'Scope',
        body: 'Share the capability, domain and format you need, along with any contamination constraints. We map it to records we hold or can source.',
      },
      {
        title: 'Sample pack',
        body: 'A small de-identified pack in your target format, so your team can judge quality before anything is committed.',
      },
      {
        title: 'Pilot',
        body: 'A scoped first delivery with agreed acceptance criteria. If it misses, we fix it or walk away.',
      },
      {
        title: 'Build and deliver',
        body: 'Corpora, environments, trajectories or evals, built and documented with provenance for every record.',
      },
      {
        title: 'Scale',
        body: 'Recurring sourcing against your roadmap, with exclusivity windows available on request.',
      },
    ],
  },
} as const;

type Track = keyof typeof TRACKS;

export function Process() {
  const [track, setTrack] = useState<Track>('seller');
  const steps = TRACKS[track].steps;

  return (
    <section id="process" className="page-x py-24 lg:py-36">
      <SectionHead
        index="03"
        label="How a deal works"
        title={
          <>
            Weeks, not quarters. <em className="text-ink-muted">One counterparty the whole way.</em>
          </>
        }
        intro="Going direct to a frontier lab can mean a procurement cycle measured in quarters. Selling to a data lab that already supplies them collapses that, and keeps you dealing with one team from first call to final payment."
      />

      <div className="mt-16 flex lg:ml-[25%]">
        <div role="tablist" className="inline-flex rounded-full border border-rule bg-paper-card p-1">
          {(Object.keys(TRACKS) as Track[]).map((key) => (
            <button
              key={key}
              role="tab"
              aria-selected={track === key}
              onClick={() => setTrack(key)}
              className={`relative rounded-full px-5 py-2.5 text-[14px] font-medium transition-colors ${
                track === key ? 'text-paper' : 'text-ink-muted hover:text-ink'
              }`}
            >
              {track === key && (
                <motion.span
                  layoutId="process-pill"
                  className="absolute inset-0 rounded-full bg-ink"
                  transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
                />
              )}
              <span className="relative">{TRACKS[key].label}</span>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.ol
          key={track}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35 }}
          className="mt-12 grid border-t border-ink md:grid-cols-5"
        >
          {steps.map((step, i) => (
            <li
              key={step.title}
              className="group relative border-b border-rule py-8 md:border-b-0 md:border-r md:px-6 md:py-10 md:first:pl-0 md:last:border-r-0"
            >
              <span className="absolute -top-[5px] left-0 h-[9px] w-[9px] rounded-full border border-ink bg-paper transition-colors duration-300 group-hover:bg-signal md:left-auto md:first:left-0" />
              <span className="font-mono text-[11px] text-signal">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-4 font-serif text-[1.85rem] leading-tight">{step.title}</h3>
              <p className="mt-3 text-[15px] leading-[1.6] text-ink-muted">{step.body}</p>
            </li>
          ))}
        </motion.ol>
      </AnimatePresence>
    </section>
  );
}
