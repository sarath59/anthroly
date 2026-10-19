import matter from 'gray-matter';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkRehype from 'remark-rehype';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';
import type { Post, Author, FaqItem, TocHeading } from './types';

const katexSchema = {
  ...defaultSchema,
  tagNames: [
    ...(defaultSchema.tagNames ?? []),
    'math', 'mi', 'mo', 'mn', 'ms', 'mtext', 'mspace', 'mrow', 'mfrac',
    'msqrt', 'mroot', 'msub', 'msup', 'msubsup', 'munder', 'mover',
    'munderover', 'mtable', 'mtr', 'mtd', 'semantics', 'annotation', 'span',
  ],
  attributes: {
    ...defaultSchema.attributes,
    '*': [...(defaultSchema.attributes?.['*'] ?? []), 'className', 'style'],
    math: ['xmlns', 'display'],
    span: ['className', 'style', 'aria-hidden'],
    annotation: ['encoding'],
  },
};

const toIso = (v: unknown): string | undefined => {
  if (v instanceof Date) return v.toISOString();
  if (typeof v === 'string' && v.trim()) return v.trim();
  return undefined;
};

function parseAuthor(data: unknown): Author {
  if (typeof data === 'string') {
    return { name: data };
  }
  if (data && typeof data === 'object' && 'name' in data) {
    const obj = data as Record<string, unknown>;
    return {
      name: String(obj.name),
      credentials: typeof obj.credentials === 'string' ? obj.credentials : undefined,
    };
  }
  return { name: 'Anthroly' };
}

function estimateReadingTime(text: string): number {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

function extractToc(markdown: string): TocHeading[] {
  const headings: TocHeading[] = [];
  for (const line of markdown.split('\n')) {
    const match = line.match(/^(#{2,3})\s+(.+)$/);
    if (match) {
      const level = match[1].length;
      const text = match[2].trim();
      const id = text.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
      headings.push({ id, text, level });
    }
  }
  return headings;
}

function renderMarkdownSync(md: string): string {
  let result = '';
  remark()
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkRehype, { allowDangerousHtml: false })
    .use(rehypeKatex)
    .use(rehypeRaw)
    .use(rehypeSanitize, katexSchema)
    .use(rehypeStringify)
    .process(md, (err, file) => {
      if (err) throw err;
      result = String(file);
    });
  return result;
}

export function parsePost(slug: string, raw: string): Post {
  const { data, content } = matter(raw);
  const publishedAt = toIso(data.publishedAt) || new Date(0).toISOString();
  const body = content.trim();

  return {
    slug,
    title: String(data.title ?? slug),
    description: String(data.description ?? ''),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    author: parseAuthor(data.author),
    publishedAt,
    updatedAt: toIso(data.updatedAt) || publishedAt,
    canonical: typeof data.canonical === 'string' ? data.canonical : undefined,
    ogImage: typeof data.ogImage === 'string' ? data.ogImage : undefined,
    faq: Array.isArray(data.faq)
      ? data.faq
          .filter((f: unknown): f is FaqItem => !!f && typeof f === 'object' && 'question' in f && 'answer' in f)
          .map((f: FaqItem) => ({ question: String(f.question), answer: String(f.answer) }))
      : undefined,
    draft: data.draft === true,
    readingTime: estimateReadingTime(body),
    body,
    html: renderMarkdownSync(body),
    toc: extractToc(body),
  };
}

export function serializePost(post: Post): string {
  const { slug: _slug, body, readingTime: _rt, html: _html, toc: _toc, ...fm } = post;
  const clean = Object.fromEntries(Object.entries(fm).filter(([, v]) => v !== undefined));
  return matter.stringify(`\n${body.trim()}\n`, clean);
}
