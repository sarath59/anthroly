import fs from 'node:fs';
import path from 'node:path';
import { BLOG_DIR } from '@/lib/site';
import { parsePost } from './parse';
import type { Post, PostSummary } from './types';

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const dir = path.join(process.cwd(), BLOG_DIR);
const showDrafts = process.env.NODE_ENV !== 'production' || process.env.SHOW_DRAFTS === 'true';

function readAll(): Post[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => /\.mdx?$/.test(f))
    .map((f) => ({ f, slug: f.replace(/\.mdx?$/, '') }))
    .filter(({ slug }) => SLUG_RE.test(slug))
    .map(({ f, slug }) => parsePost(slug, fs.readFileSync(path.join(dir, f), 'utf8')));
}

export function getAllPosts(): Post[] {
  return readAll()
    .filter((p) => showDrafts || !p.draft)
    .sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt));
}

export function getPostBySlug(slug: string): Post | null {
  if (!SLUG_RE.test(slug)) return null;
  return getAllPosts().find((p) => p.slug === slug) ?? null;
}

export function getPostSummaries(): PostSummary[] {
  return getAllPosts().map(({ slug, title, description, tags, author, publishedAt, updatedAt, draft, readingTime }) => ({
    slug,
    title,
    description,
    tags,
    author,
    publishedAt,
    updatedAt,
    draft,
    readingTime,
  }));
}
