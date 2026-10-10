const INDUSTRIES = [
  'Logistics',
  'Healthcare administration',
  'Insurance',
  'Construction',
  'Legal operations',
  'Accounting',
  'Software',
  'Manufacturing',
  'Field services',
  'Real estate',
  'Financial services',
  'Retail',
  'Hospitality',
  'Staffing',
  'Energy',
];

export function Industries() {
  const row = [...INDUSTRIES, ...INDUSTRIES];
  return (
    <section aria-label="Industries we buy from" className="overflow-hidden border-y border-rule py-10">
      <div className="mask-fade-x flex">
        <ul className="flex shrink-0 animate-marquee items-center gap-10 pr-10 hover:[animation-play-state:paused]">
          {row.map((name, i) => (
            <li key={i} className="flex items-center gap-10 whitespace-nowrap">
              <span className="font-serif text-[2.4rem] italic text-ink-soft">{name}</span>
              <span className="h-1.5 w-1.5 rounded-full bg-signal" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
