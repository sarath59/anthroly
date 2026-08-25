import type { Metadata } from 'next';
import { Suspense } from 'react';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import { DiagnosticThanksTracker } from '@/components/analytics/DiagnosticThanksTracker';
import { CONNECT_FEE_LABEL, DIAGNOSTIC_NAME } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Diagnostic booked — Anthroly',
  robots: { index: false, follow: false },
};

export default function DiagnosticThanksPage() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center px-4 py-24 text-white">
      <Suspense fallback={null}>
        <DiagnosticThanksTracker />
      </Suspense>
      <div className="max-w-xl text-center">
        <CheckCircle2 className="mx-auto mb-6 text-emerald-400" size={48} />
        <h1 className="text-4xl font-bold mb-4">Payment received</h1>
        <p className="text-lg text-gray-400 mb-8 leading-relaxed">
          Your {CONNECT_FEE_LABEL} {DIAGNOSTIC_NAME} is confirmed. We will email you to schedule
          the 90-minute audit. Check the inbox you used at checkout — including spam.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 px-8 py-3 font-semibold text-black"
        >
          Back to home
        </Link>
      </div>
    </section>
  );
}
