"use client";

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { DATAFAST_GOALS, trackGoal } from '@/lib/datafast';

/** DataFast Payment Links also pick up session_id from this URL. */
export function DiagnosticThanksTracker() {
  const params = useSearchParams();

  useEffect(() => {
    const sessionId = params.get('session_id') || '';
    trackGoal(DATAFAST_GOALS.diagnosticPaid, {
      page: '/diagnostic/thanks',
      intent: 'paid',
      session: sessionId.slice(0, 255) || 'unknown',
    });
  }, [params]);

  return null;
}
