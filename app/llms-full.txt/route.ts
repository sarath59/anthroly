import fs from 'fs';
import path from 'path';
import { HOME_FAQ } from '@/lib/faq';
import { expertDataMarkdown, forAgentsMarkdown } from '@/lib/agent-docs';

export const dynamic = 'force-static';

/** Full-detail fact sheet: same facts as the human pages, in one file. */
export function GET() {
  const base = fs.readFileSync(path.join(process.cwd(), 'content/llms-full-base.txt'), 'utf8').trim();
  const homeFaq = HOME_FAQ.map((f) => `### ${f.question}\n\n${f.answer}`).join('\n\n');
  const body = [
    base,
    '',
    '---',
    '',
    '## Selling and licensing data: FAQ',
    '',
    homeFaq,
    '',
    '---',
    '',
    forAgentsMarkdown().replace(/^# /, '## '),
    '',
    '---',
    '',
    expertDataMarkdown().replace(/^# /, '## '),
    '',
  ].join('\n');
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=3600' },
  });
}
