export interface Author {
  name: string;
  credentials?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface TocHeading {
  id: string;
  text: string;
  level: number;
}

export interface PostFrontmatter {
  title: string;
  description: string;
  tags: string[];
  author: Author;
  publishedAt: string;
  updatedAt: string;
  canonical?: string;
  ogImage?: string;
  faq?: FaqItem[];
  draft: boolean;
  readingTime: number;
}

export interface Post extends PostFrontmatter {
  slug: string;
  body: string;
  html: string;
  toc: TocHeading[];
}

export interface PostSummary {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  author: Author;
  publishedAt: string;
  updatedAt: string;
  draft: boolean;
  readingTime: number;
}
