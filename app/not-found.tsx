import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <section className="grain flex min-h-[80vh] items-center pt-[68px]">
      <div className="page-x py-24">
        <p className="eyebrow">404 · Record not found</p>
        <h1 className="mt-8 max-w-4xl font-serif text-display-lg">
          This page was <span className="rounded-[4px] bg-ink px-3 text-paper">[REDACTED]</span>
        </h1>
        <p className="mt-8 max-w-md text-[18px] leading-[1.6] text-ink-muted">
          Or it never existed. Either way, here are better places to go.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/" className="btn-ink">
            Home
            <ArrowRight size={16} />
          </Link>
          <Link href="/learn" className="btn-ghost">Field notes</Link>
        </div>
      </div>
    </section>
  );
}
