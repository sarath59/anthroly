import { SectionHead } from './SectionHead';
import { Reveal } from './Reveal';

const SAFEGUARDS = [
  {
    title: 'Licensed, not sold',
    body: 'A license grants defined rights over defined material for a defined term. You keep the business, the data and the right to license it again.',
  },
  {
    title: 'Identifiers out first',
    body: 'Names, emails, phone numbers, account numbers and addresses are removed or replaced before anyone downstream sees a record. Roles, timing and the work itself stay.',
  },
  {
    title: 'Chain of title, verified',
    body: 'We confirm you have the right to license what you are licensing. Data you hold on behalf of your own clients stays out unless your contracts allow it.',
  },
  {
    title: 'Confidential on both sides',
    body: 'Sellers are never named to buyers. Buyer terms are never shared with sellers. Nothing is listed, auctioned or made public.',
  },
  {
    title: 'Bounded use',
    body: 'Every license specifies how the data may be used. Training and evaluation, yes. Re-identification, resale outside the license or targeting your customers, never.',
  },
  {
    title: 'Small circle of access',
    body: 'Only a handful of named people at Datary Labs ever see a company identity alongside its data. Everyone else works with de-identified records.',
  },
];

export function Safeguards() {
  return (
    <section id="safeguards" className="border-t border-rule bg-paper-card">
      <div className="page-x py-24 lg:py-36">
        <SectionHead
          index="04"
          label="Safeguards"
          title={
            <>
              Built to be the buyer <em className="text-ink-muted">you&apos;d trust with your own records.</em>
            </>
          }
        />

        <Reveal>
          <div className="mt-20 grid overflow-hidden rounded-[6px] border border-ink bg-ink text-paper lg:grid-cols-12">
            <div className="relative p-10 sm:p-14 lg:col-span-7">
              <p className="eyebrow !text-paper/50">Sourcing policy</p>
              <p className="mt-8 font-serif text-display-md">
                We buy only from companies in the <em className="text-signal">United States.</em>
              </p>
              <p className="mt-8 max-w-lg text-[17px] leading-[1.65] text-paper/65">
                No exceptions. One legal framework means a clean, auditable chain of title for every
                record, and American operating data is what the labs ask us for most. If your company
                is headquartered outside the US, we&apos;re not the right buyer, and we&apos;ll tell you
                so on the first call.
              </p>
            </div>
            <div className="relative flex items-center justify-center border-t border-paper/15 p-10 lg:col-span-5 lg:border-l lg:border-t-0">
              <USMap />
            </div>
          </div>
        </Reveal>

        <div className="mt-px grid gap-px overflow-hidden bg-rule sm:grid-cols-2 lg:grid-cols-3">
          {SAFEGUARDS.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 0.05} className="h-full">
              <div className="h-full bg-paper-card p-8 lg:p-10">
                <span className="font-mono text-[11px] text-signal">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-5 font-serif text-[1.75rem] leading-tight">{s.title}</h3>
                <p className="mt-3 text-[15px] leading-[1.65] text-ink-muted">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Dot-matrix rendering of the contiguous US, drawn from a coarse bitmap. */
const US_ROWS = [
  '..##...............................#####.',
  '.#######.......................#########',
  '.##########################....########.',
  '.#############################.#######..',
  '.###################################....',
  '..##################################....',
  '..################################......',
  '...##############################.......',
  '....############################........',
  '.....#######################.###........',
  '.......######.......######....##........',
  '...............................#........',
];

function USMap() {
  const dot = 9;
  const width = US_ROWS[0].length * dot;
  const height = US_ROWS.length * dot;
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full max-w-md" role="img" aria-label="Map of the United States">
      {US_ROWS.flatMap((row, y) =>
        row.split('').map((c, x) =>
          c === '#' ? (
            <circle
              key={`${x}-${y}`}
              cx={x * dot + dot / 2}
              cy={y * dot + dot / 2}
              r={(x * 7 + y * 13) % 11 === 0 ? 2.6 : 1.9}
              fill={(x * 7 + y * 13) % 11 === 0 ? '#E5582B' : 'rgba(245,241,232,0.55)'}
            />
          ) : null
        )
      )}
    </svg>
  );
}
