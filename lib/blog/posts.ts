import type { Post, PostSummary } from './types';

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const showDrafts = process.env.NODE_ENV !== 'production' || process.env.SHOW_DRAFTS === 'true';

let cachedPosts: Post[] | null = null;

function readAll(): Post[] {
  if (cachedPosts) return cachedPosts;
  
  // Dynamic imports to avoid bundling heavy remark/rehype in the page
  const fs = require('node:fs') as typeof import('node:fs');
  const path = require('node:path') as typeof import('node:path');
  const { parsePost } = require('./parse') as typeof import('./parse');
  const { BLOG_DIR } = require('@/lib/site') as typeof import('@/lib/site');
  
  const dir = path.join(process.cwd(), BLOG_DIR);
  if (!fs.existsSync(dir)) {
    cachedPosts = [];
    return cachedPosts;
  }
  
  cachedPosts = fs
    .readdirSync(dir)
    .filter((f: string) => /\.mdx?$/.test(f))
    .map((f: string) => ({ f, slug: f.replace(/\.mdx?$/, '') }))
    .filter(({ slug }: { slug: string }) => SLUG_RE.test(slug))
    .map(({ f, slug }: { f: string; slug: string }) => 
      parsePost(slug, fs.readFileSync(path.join(dir, f), 'utf8'))
    );
  
  return cachedPosts;
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
