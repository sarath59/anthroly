import { Reveal } from './Reveal';

export function PullQuote() {
  return (
    <section aria-label="Why operating data" className="dot-grid border-y border-rule bg-paper-deep">
      <div className="page-x py-28 lg:py-40">
        <Reveal>
          <blockquote className="mx-auto max-w-5xl text-center">
            <p className="font-serif text-display-md text-balance">
              &ldquo;Finished work hides the reasoning. The record of how it got finished is the part the
              internet never saw, and the part <em className="text-signal">models are missing.</em>&rdquo;
            </p>
            <footer className="eyebrow mt-10">The thesis behind Anthroly</footer>
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}
