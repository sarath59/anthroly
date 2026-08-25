"use client";

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import {
  currentPageParam,
  DATAFAST_GOALS,
  trackGoal,
} from '@/lib/datafast';

const SCROLL_MARKS = [25, 50, 75, 90, 100] as const;
const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], input[type="submit"], input[type="button"], summary, label, select';

function slug(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9_-]+/g, '_').replace(/^_+|_+$/g, '').slice(0, 64);
}

function timeBucket(seconds: number): string {
  if (seconds < 5) return '0-5s';
  if (seconds < 15) return '5-15s';
  if (seconds < 30) return '15-30s';
  if (seconds < 60) return '30-60s';
  if (seconds < 120) return '1-2m';
  return '2m+';
}

function pagePath(): string {
  return currentPageParam();
}

function destinationFromHref(href: string): string {
  if (!href || href.startsWith('javascript:')) return '';
  try {
    const url = new URL(href, window.location.origin);
    if (url.origin === window.location.origin) {
      return `${url.pathname}${url.hash}`.slice(0, 255) || '/';
    }
    return url.hostname.slice(0, 255);
  } catch {
    return href.slice(0, 255);
  }
}

function labelFrom(el: HTMLElement): string {
  const labelled = el.getAttribute('aria-label') || el.getAttribute('title');
  if (labelled) return labelled.slice(0, 80);
  const text = (el.innerText || el.textContent || '').replace(/\s+/g, ' ').trim();
  if (text) return text.slice(0, 80);
  if (el instanceof HTMLInputElement) return (el.value || el.name || el.type).slice(0, 80);
  return el.tagName.toLowerCase();
}

function kindFrom(el: HTMLElement): string {
  if (el instanceof HTMLAnchorElement) return 'link';
  if (el instanceof HTMLButtonElement || el.getAttribute('role') === 'button') return 'button';
  if (el instanceof HTMLInputElement) return el.type || 'input';
  if (el.tagName === 'SUMMARY') return 'accordion';
  if (el.tagName === 'SELECT') return 'select';
  if (el.tagName === 'LABEL') return 'label';
  return 'control';
}

function regionFrom(el: Element | null): string {
  if (!el) return 'unknown';
  const tagged = el.closest('[data-fast-section]');
  if (tagged instanceof HTMLElement) {
    return slug(tagged.getAttribute('data-fast-section') || 'unknown') || 'unknown';
  }
  const withId = el.closest('section[id], header[id], footer[id], nav[id], [id]');
  if (withId instanceof HTMLElement && withId.id) {
    const id = slug(withId.id);
    if (id && !id.startsWith('_next')) return id;
  }
  if (el.closest('header')) return 'header';
  if (el.closest('footer')) return 'footer';
  if (el.closest('nav')) return 'nav';
  return 'page';
}

function conversionGoalForHref(href: string): string | null {
  const lower = href.toLowerCase();
  if (lower.startsWith('mailto:')) return DATAFAST_GOALS.emailContact;
  if (lower.includes('buy.stripe.com') || lower.includes('/api/create-checkout')) {
    return DATAFAST_GOALS.diagnostic;
  }
  return null;
}

function observeSections(
  onEnter: (id: string) => void,
  onLeave: (id: string) => void
): () => void {
  const nodes = Array.from(
    document.querySelectorAll<HTMLElement>(
      'main section[id], header[id], footer[id], [data-fast-section]'
    )
  );
  if (!nodes.length) return () => undefined;

  const visible = new Set<string>();
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const el = entry.target as HTMLElement;
        const id = slug(el.getAttribute('data-fast-section') || el.id);
        if (!id) continue;
        const nowVisible = entry.isIntersecting && entry.intersectionRatio >= 0.25;
        if (nowVisible && !visible.has(id)) {
          visible.add(id);
          onEnter(id);
        } else if (!nowVisible && visible.has(id)) {
          visible.delete(id);
          onLeave(id);
        }
      }
    },
    { threshold: [0.25, 0.5], rootMargin: '-12% 0px -12% 0px' }
  );

  nodes.forEach((node) => observer.observe(node));
  return () => observer.disconnect();
}

/**
 * Sitewide DataFast goals: clicks, section views, time-in-section, scroll depth, and from→to paths.
 * Uses a small set of goal names + custom params (not a unique goal per button) so billing stays sane.
 */
export function DataFastGoals() {
  const pathname = usePathname();
  const lastSection = useRef('entry');
  const enterAt = useRef<Map<string, number>>(new Map());
  const viewed = useRef<Set<string>>(new Set());
  const scrollMarks = useRef<Set<number>>(new Set());
  const lastClickKey = useRef('');
  const lastClickAt = useRef(0);
  const lastPage = useRef('');

  useEffect(() => {
    const page = pagePath();
    if (lastPage.current && lastPage.current !== page) {
      trackGoal(DATAFAST_GOALS.nav, {
        from: lastPage.current,
        to: page,
        via: 'route',
      });
    }
    lastPage.current = page;
    lastSection.current = 'entry';
    enterAt.current = new Map();
    viewed.current = new Set();
    scrollMarks.current = new Set();

    const flushSection = (id: string, reason: string) => {
      const started = enterAt.current.get(id);
      if (!started) return;
      enterAt.current.delete(id);
      const seconds = Math.max(1, Math.round((Date.now() - started) / 1000));
      if (seconds < 2) return;
      trackGoal(DATAFAST_GOALS.sectionTime, {
        page: pagePath(),
        section: id,
        seconds: String(seconds),
        bucket: timeBucket(seconds),
        from: lastSection.current === id ? 'same' : lastSection.current,
        reason,
      });
    };

    const onEnter = (id: string) => {
      const from = lastSection.current;
      enterAt.current.set(id, Date.now());
      if (!viewed.current.has(id)) {
        viewed.current.add(id);
        trackGoal(DATAFAST_GOALS.sectionView, {
          page: pagePath(),
          section: id,
          from,
        });
      }
      lastSection.current = id;
    };

    const onLeave = (id: string) => {
      flushSection(id, 'leave');
    };

    let stopObserving = observeSections(onEnter, onLeave);
    const remount = window.setTimeout(() => {
      stopObserving();
      stopObserving = observeSections(onEnter, onLeave);
    }, 400);

    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const pct = max <= 0 ? 100 : Math.min(100, Math.round((window.scrollY / max) * 100));
      for (const mark of SCROLL_MARKS) {
        if (pct >= mark && !scrollMarks.current.has(mark)) {
          scrollMarks.current.add(mark);
          trackGoal(DATAFAST_GOALS.scrollDepth, {
            page: pagePath(),
            depth: String(mark),
            section: lastSection.current,
          });
        }
      }
    };

    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const interactive = target.closest(INTERACTIVE_SELECTOR);
      if (!(interactive instanceof HTMLElement)) return;
      if (interactive.closest('[data-fast-ignore]')) return;

      const now = Date.now();
      const href =
        interactive instanceof HTMLAnchorElement
          ? interactive.getAttribute('href') || ''
          : interactive.closest('a')?.getAttribute('href') || '';
      const from = regionFrom(interactive);
      const to = href ? destinationFromHref(href) : from;
      const label = labelFrom(interactive);
      const kind = kindFrom(interactive);
      const key = `${kind}|${label}|${href}`;
      if (key === lastClickKey.current && now - lastClickAt.current < 400) return;
      lastClickKey.current = key;
      lastClickAt.current = now;

      const page = pagePath();
      trackGoal(DATAFAST_GOALS.click, {
        page,
        kind,
        label,
        from,
        to: to || from,
        href: href.slice(0, 255) || 'none',
      });

      if (href) {
        trackGoal(DATAFAST_GOALS.nav, {
          page,
          from,
          to: to || href.slice(0, 255),
          via: 'click',
        });
      }

      const conversion = href ? conversionGoalForHref(href) : null;
      if (conversion) {
        trackGoal(conversion, {
          page,
          from,
          to: to || href.slice(0, 255),
          intent: conversion === DATAFAST_GOALS.diagnostic ? 'checkout' : 'email',
        });
      }
    };

    const onSubmit = (event: Event) => {
      const form = event.target;
      if (!(form instanceof HTMLFormElement)) return;
      trackGoal(DATAFAST_GOALS.formSubmit, {
        page: pagePath(),
        from: regionFrom(form),
        name: (form.getAttribute('id') || form.getAttribute('name') || 'form').slice(0, 64),
      });
    };

    const onHide = () => {
      if (document.visibilityState !== 'hidden') return;
      for (const id of [...enterAt.current.keys()]) {
        flushSection(id, 'hidden');
      }
    };

    document.addEventListener('click', onClick, true);
    document.addEventListener('submit', onSubmit, true);
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('visibilitychange', onHide);
    window.addEventListener('pagehide', onHide);
    onScroll();

    return () => {
      window.clearTimeout(remount);
      stopObserving();
      for (const id of [...enterAt.current.keys()]) {
        flushSection(id, 'unmount');
      }
      document.removeEventListener('click', onClick, true);
      document.removeEventListener('submit', onSubmit, true);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('visibilitychange', onHide);
      window.removeEventListener('pagehide', onHide);
    };
  }, [pathname]);

  return null;
}
