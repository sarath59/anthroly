"use client";

import { useEffect } from 'react';
import {
  currentPageParam,
  DATAFAST_GOALS,
  trackGoal,
} from '@/lib/datafast';

function goalFromCalNotes(notes: string): string {
  const text = notes.toLowerCase();
  if (text.includes('citation neighborhood')) return DATAFAST_GOALS.citationNeighborhood;
  if (text.includes('ai visibility audit')) return DATAFAST_GOALS.aiVisibilityAudit;
  if (text.includes('aeo report')) return DATAFAST_GOALS.aeoReport;
  if (text.includes('try an agent')) return DATAFAST_GOALS.tryAgent;
  return DATAFAST_GOALS.bookCall;
}

function trackFromAnchor(anchor: HTMLAnchorElement): void {
  const href = anchor.getAttribute('href');
  if (!href) return;

  const page = currentPageParam();

  if (href.toLowerCase().startsWith('mailto:sharatth@anthroly.com')) {
    trackGoal(DATAFAST_GOALS.emailContact, { page });
    return;
  }

  const isCal =
    href.includes('cal.com/sarath-kavuru') ||
    href.includes('cal.com/sarath');
  if (!isCal) return;

  try {
    const url = new URL(href, window.location.origin);
    const notes = url.searchParams.get('notes') || '';
    trackGoal(goalFromCalNotes(notes), {
      page,
      intent: notes.slice(0, 255) || 'connect_with_us',
    });
  } catch {
    trackGoal(DATAFAST_GOALS.bookCall, { page });
  }
}

/**
 * Fires DataFast goals on conversion clicks (book a call, email).
 * Form submits that open Cal.com should call trackGoal() directly.
 */
export function DataFastGoals() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest('a');
      if (!(anchor instanceof HTMLAnchorElement)) return;
      trackFromAnchor(anchor);
    };

    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return null;
}
