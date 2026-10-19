import matter from 'gray-matter';
import type { Post, Author, FaqItem } from './types';

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
  };
}

export function serializePost(post: Post): string {
  const { slug: _slug, body, readingTime: _rt, ...fm } = post;
  const clean = Object.fromEntries(Object.entries(fm).filter(([, v]) => v !== undefined));
  return matter.stringify(`\n${body.trim()}\n`, clean);
}
