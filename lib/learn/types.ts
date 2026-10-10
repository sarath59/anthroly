export interface Article {
  slug: string;
  title: string;
  /** Used in footer and compact lists */
  shortTitle: string;
  /** Meta description, ~150 characters */
  description: string;
  /** One-line standfirst shown under the headline */
  dek: string;
  category: 'Selling data' | 'Market' | 'Training data' | 'Safeguards';
  readMinutes: number;
  published: string;
  updated: string;
  /** Lightweight markdown: ##, ###, -, 1., >, **bold**, [text](href) */
  body: string;
  faq?: { question: string; answer: string }[];
}
