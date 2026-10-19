import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkRehype from 'remark-rehype';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';

const katexSchema = {
  ...defaultSchema,
  tagNames: [
    ...(defaultSchema.tagNames ?? []),
    'math',
    'mi',
    'mo',
    'mn',
    'ms',
    'mtext',
    'mspace',
    'mrow',
    'mfrac',
    'msqrt',
    'mroot',
    'msub',
    'msup',
    'msubsup',
    'munder',
    'mover',
    'munderover',
    'mtable',
    'mtr',
    'mtd',
    'semantics',
    'annotation',
    'span',
  ],
  attributes: {
    ...defaultSchema.attributes,
    '*': [...(defaultSchema.attributes?.['*'] ?? []), 'className', 'style'],
    math: ['xmlns', 'display'],
    span: ['className', 'style', 'aria-hidden'],
    annotation: ['encoding'],
  },
};

export interface TocHeading {
  id: string;
  text: string;
  level: number;
}

export function extractTableOfContents(markdown: string): TocHeading[] {
  const headings: TocHeading[] = [];
  const lines = markdown.split('\n');

  for (const line of lines) {
    const match = line.match(/^(#{2,3})\s+(.+)$/);
    if (match) {
      const level = match[1].length;
      const text = match[2].trim();
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
      headings.push({ id, text, level });
    }
  }

  return headings;
}

export async function renderMarkdown(md: string): Promise<string> {
  const file = await remark()
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkRehype, { allowDangerousHtml: false })
    .use(rehypeKatex)
    .use(rehypeRaw)
    .use(rehypeSanitize, katexSchema)
    .use(rehypeStringify)
    .process(md);

  return String(file);
}
