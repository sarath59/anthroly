import Link from 'next/link';
import type { ReactNode } from 'react';

function inline(text: string, keyBase: string): ReactNode[] {
  const parts: ReactNode[] = [];
  const pattern = /\*\*(.+?)\*\*|\[(.+?)\]\((.+?)\)|\*(.+?)\*/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let i = 0;
  while ((match = pattern.exec(text))) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    const key = `${keyBase}-${i++}`;
    if (match[1]) {
      parts.push(<strong key={key}>{match[1]}</strong>);
    } else if (match[2] && match[3]) {
      const href = match[3];
      parts.push(
        href.startsWith('/') ? (
          <Link key={key} href={href}>
            {match[2]}
          </Link>
        ) : (
          <a key={key} href={href} target="_blank" rel="noopener noreferrer">
            {match[2]}
          </a>
        )
      );
    } else if (match[4]) {
      parts.push(<em key={key}>{match[4]}</em>);
    }
    last = pattern.lastIndex;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

export function extractHeadings(body: string): { id: string; text: string }[] {
  return body
    .split('\n')
    .filter((line) => line.startsWith('## '))
    .map((line) => {
      const text = line.slice(3).trim();
      return { id: slugifyHeading(text), text };
    });
}

export function ArticleBody({ body }: { body: string }) {
  const blocks = body.trim().split(/\n\s*\n/);
  const out: ReactNode[] = [];

  blocks.forEach((block, b) => {
    const lines = block.split('\n').map((l) => l.trim()).filter(Boolean);
    const first = lines[0];
    const key = `b${b}`;

    if (first.startsWith('## ')) {
      const text = first.slice(3);
      out.push(
        <h2 key={key} id={slugifyHeading(text)} className="scroll-mt-28">
          {text}
        </h2>
      );
    } else if (first.startsWith('### ')) {
      out.push(<h3 key={key}>{inline(first.slice(4), key)}</h3>);
    } else if (lines.every((l) => l.startsWith('- '))) {
      out.push(
        <ul key={key}>
          {lines.map((l, i) => (
            <li key={i}>{inline(l.slice(2), `${key}-${i}`)}</li>
          ))}
        </ul>
      );
    } else if (lines.every((l) => /^\d+\.\s/.test(l))) {
      out.push(
        <ol key={key}>
          {lines.map((l, i) => (
            <li key={i}>{inline(l.replace(/^\d+\.\s/, ''), `${key}-${i}`)}</li>
          ))}
        </ol>
      );
    } else if (first.startsWith('> ')) {
      const text = lines.map((l) => l.replace(/^>\s?/, '')).join(' ');
      out.push(
        <blockquote
          key={key}
          className="my-12 border-l-2 border-signal pl-7 font-serif text-[1.85rem] leading-[1.25] text-ink not-italic"
        >
          {inline(text, key)}
        </blockquote>
      );
    } else {
      out.push(<p key={key}>{inline(lines.join(' '), key)}</p>);
    }
  });

  return <div className="prose-editorial">{out}</div>;
}
