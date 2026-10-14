"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { NAV_LINKS } from '@/lib/site';
import { Wordmark } from './Wordmark';

export const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      id="site-header"
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || open ? 'border-b border-rule bg-paper/85 backdrop-blur-md' : 'border-b border-transparent'
      }`}
    >
      <nav className="page-x flex h-[68px] items-center justify-between">
        <Wordmark />

        <div className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-1.5 text-[14px] text-ink-soft transition-colors hover:text-ink"
            >
              {link.label}
              {link.href === '/expert-data' && (
                <span className="h-1.5 w-1.5 -translate-y-1.5 rounded-full bg-signal" aria-hidden />
              )}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-5 lg:flex">
          <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-signal" />
            US sourced
          </span>
          <Link href="/contact" className="btn-ink !px-5 !py-2.5 !text-[14px]">
            Talk to us
            <ArrowUpRight size={15} />
          </Link>
        </div>

        <button
          className="-mr-2 p-2 lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="page-x border-t border-rule pb-8 pt-4 lg:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block border-b border-rule py-4 font-serif text-3xl"
            >
              {link.label}
            </Link>
          ))}
          <Link href="/contact" onClick={() => setOpen(false)} className="btn-ink mt-8 w-full justify-center">
            Talk to us
            <ArrowUpRight size={16} />
          </Link>
        </div>
      )}
    </header>
  );
};
