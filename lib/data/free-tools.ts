/**
 * Free SEO & Marketing Tools - used on /tools and landing page
 */

export type FreeToolCategory = 'meta-seo' | 'content' | 'technical' | 'copy' | 'analytics' | 'schema' | 'generators';

export interface FreeTool {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: FreeToolCategory;
  icon: string; // Lucide icon name
  metaTitle: string;
  metaDescription: string;
}

export const FREE_TOOL_CATEGORIES: { id: FreeToolCategory; name: string }[] = [
  { id: 'meta-seo', name: 'Meta & SEO' },
  { id: 'content', name: 'Content & Copy' },
  { id: 'technical', name: 'Technical SEO' },
  { id: 'copy', name: 'Copy & CTAs' },
  { id: 'analytics', name: 'Analytics & Counters' },
  { id: 'schema', name: 'Schema & Structured Data' },
  { id: 'generators', name: 'Generators' },
];

export const FREE_TOOLS: FreeTool[] = [
  {
    id: 'meta-tag-generator',
    name: 'Meta Tag Generator',
    slug: 'meta-tag-generator',
    description: 'Generate title and meta description tags optimized for search and character limits.',
    category: 'meta-seo',
    icon: 'Tag',
    metaTitle: 'Free Meta Tag Generator | SEO Title & Description | Anthroly',
    metaDescription: 'Generate SEO-optimized meta title and description tags. Free tool with character count and SERP preview.',
  },
  {
    id: 'serp-preview',
    name: 'SERP Preview',
    slug: 'serp-preview',
    description: 'See how your title and snippet will look in Google search results.',
    category: 'meta-seo',
    icon: 'Search',
    metaTitle: 'Free SERP Preview Tool | Google Search Snippet Preview | Anthroly',
    metaDescription: 'Preview how your page will appear in Google SERPs. Test title length and meta description before publishing.',
  },
  {
    id: 'meta-description-generator',
    name: 'Meta Description Generator',
    slug: 'meta-description-generator',
    description: 'Create compelling meta descriptions that stay within 155 characters.',
    category: 'meta-seo',
    icon: 'FileText',
    metaTitle: 'Free Meta Description Generator | Anthroly',
    metaDescription: 'Generate meta descriptions for your pages. Free tool with character counter and best practices.',
  },
  {
    id: 'title-tag-optimizer',
    name: 'Title Tag Optimizer',
    slug: 'title-tag-optimizer',
    description: 'Optimize title tags for length, keywords, and click-through.',
    category: 'meta-seo',
    icon: 'Type',
    metaTitle: 'Free Title Tag Optimizer | SEO Title Checker | Anthroly',
    metaDescription: 'Check and optimize your title tags for Google. Stay under 60 characters and improve CTR.',
  },
  {
    id: 'word-counter',
    name: 'Word Counter',
    slug: 'word-counter',
    description: 'Count words, characters, sentences, and reading time for any text.',
    category: 'content',
    icon: 'FileText',
    metaTitle: 'Free Word Counter | Word & Character Count | Anthroly',
    metaDescription: 'Count words, characters, paragraphs, and estimate reading time. Free online word counter for content.',
  },
  {
    id: 'keyword-density',
    name: 'Keyword Density Analyzer',
    slug: 'keyword-density',
    description: 'Analyze keyword density and distribution in your content.',
    category: 'content',
    icon: 'BarChart3',
    metaTitle: 'Free Keyword Density Checker | SEO Content Analysis | Anthroly',
    metaDescription: 'Check keyword density and distribution. Free tool for on-page SEO and content optimization.',
  },
  {
    id: 'reading-time',
    name: 'Reading Time Calculator',
    slug: 'reading-time',
    description: 'Estimate how long it takes to read your article or blog post.',
    category: 'content',
    icon: 'Clock',
    metaTitle: 'Free Reading Time Calculator | Anthroly',
    metaDescription: 'Calculate reading time for your content. Free tool for bloggers and content creators.',
  },
  {
    id: 'character-counter',
    name: 'Character Counter',
    slug: 'character-counter',
    description: 'Count characters for meta descriptions, titles, tweets, and more.',
    category: 'content',
    icon: 'Hash',
    metaTitle: 'Free Character Counter | Meta, Twitter, SMS | Anthroly',
    metaDescription: 'Count characters for meta tags, social posts, and SMS. Free character counter with limits.',
  },
  {
    id: 'heading-checker',
    name: 'Heading Structure Checker',
    slug: 'heading-checker',
    description: 'Validate H1–H6 structure and hierarchy in your content.',
    category: 'technical',
    icon: 'Heading',
    metaTitle: 'Free Heading Structure Checker | SEO Hierarchy | Anthroly',
    metaDescription: 'Check heading hierarchy and structure for SEO. Ensure proper H1–H6 order and accessibility.',
  },
  {
    id: 'canonical-checker',
    name: 'Canonical URL Checker',
    slug: 'canonical-checker',
    description: 'Validate canonical tags and avoid duplicate content issues.',
    category: 'technical',
    icon: 'Link',
    metaTitle: 'Free Canonical URL Checker | Anthroly',
    metaDescription: 'Check canonical tags and URL consistency. Free tool to prevent duplicate content.',
  },
  {
    id: 'slug-generator',
    name: 'URL Slug Generator',
    slug: 'slug-generator',
    description: 'Convert titles to SEO-friendly URL slugs.',
    category: 'technical',
    icon: 'Link2',
    metaTitle: 'Free URL Slug Generator | SEO-Friendly Slugs | Anthroly',
    metaDescription: 'Generate clean, SEO-friendly URL slugs from any title. Lowercase, hyphenated, no special chars.',
  },
  {
    id: 'robots-txt-generator',
    name: 'Robots.txt Generator',
    slug: 'robots-txt-generator',
    description: 'Generate a robots.txt file for your site.',
    category: 'technical',
    icon: 'Bot',
    metaTitle: 'Free Robots.txt Generator | Anthroly',
    metaDescription: 'Create a robots.txt file for your website. Control crawler access with our free generator.',
  },
  {
    id: 'html-encoder',
    name: 'HTML Entity Encoder / Decoder',
    slug: 'html-encoder',
    description: 'Encode or decode HTML entities for safe embedding.',
    category: 'technical',
    icon: 'Code',
    metaTitle: 'Free HTML Entity Encoder Decoder | Anthroly',
    metaDescription: 'Encode and decode HTML entities. Free tool for safe HTML and preventing XSS.',
  },
  {
    id: 'redirect-checker',
    name: 'Redirect Chain Checker',
    slug: 'redirect-checker',
    description: 'Analyze redirect chains from a list of URLs.',
    category: 'technical',
    icon: 'Redirect',
    metaTitle: 'Free Redirect Chain Checker | Anthroly',
    metaDescription: 'Check redirect chains and recommend direct redirects. Free SEO tool.',
  },
  {
    id: 'open-graph-generator',
    name: 'Open Graph Tag Generator',
    slug: 'open-graph-generator',
    description: 'Generate Open Graph meta tags for social sharing.',
    category: 'schema',
    icon: 'Share2',
    metaTitle: 'Free Open Graph Tag Generator | Social Meta Tags | Anthroly',
    metaDescription: 'Generate Open Graph and Twitter Card meta tags for Facebook, LinkedIn, and Twitter.',
  },
  {
    id: 'faq-schema-generator',
    name: 'FAQ Schema Generator',
    slug: 'faq-schema-generator',
    description: 'Create FAQ schema (JSON-LD) for rich results.',
    category: 'schema',
    icon: 'HelpCircle',
    metaTitle: 'Free FAQ Schema Generator | JSON-LD | Anthroly',
    metaDescription: 'Generate FAQ schema markup for Google rich results. Free JSON-LD generator.',
  },
  {
    id: 'json-ld-generator',
    name: 'JSON-LD Snippet Generator',
    slug: 'json-ld-generator',
    description: 'Build simple JSON-LD structured data snippets.',
    category: 'schema',
    icon: 'Braces',
    metaTitle: 'Free JSON-LD Generator | Structured Data | Anthroly',
    metaDescription: 'Create JSON-LD structured data for Organization, Product, or Article. Free schema generator.',
  },
  {
    id: 'blog-title-generator',
    name: 'Blog Title Generator',
    slug: 'blog-title-generator',
    description: 'Generate catchy blog title ideas from a topic or keyword.',
    category: 'copy',
    icon: 'PenLine',
    metaTitle: 'Free Blog Title Generator | Headline Ideas | Anthroly',
    metaDescription: 'Generate blog title and headline ideas. Free tool for content creators and marketers.',
  },
  {
    id: 'cta-copy-generator',
    name: 'CTA Copy Generator',
    slug: 'cta-copy-generator',
    description: 'Get call-to-action button and link copy ideas.',
    category: 'copy',
    icon: 'MousePointerClick',
    metaTitle: 'Free CTA Copy Generator | Button Text Ideas | Anthroly',
    metaDescription: 'Generate CTA button and link copy. Free tool for landing pages and emails.',
  },
  {
    id: 'lsi-keywords',
    name: 'LSI Keyword Suggester',
    slug: 'lsi-keywords',
    description: 'Get related and LSI keyword ideas for your topic.',
    category: 'generators',
    icon: 'Lightbulb',
    metaTitle: 'Free LSI Keyword Suggester | Related Keywords | Anthroly',
    metaDescription: 'Find LSI and related keywords for your content. Free keyword expansion tool.',
  },
  {
    id: 'content-brief-generator',
    name: 'Content Brief Template Generator',
    slug: 'content-brief-generator',
    description: 'Generate a content brief template for writers.',
    category: 'generators',
    icon: 'ClipboardList',
    metaTitle: 'Free Content Brief Generator | Anthroly',
    metaDescription: 'Create content brief templates for blog posts and articles. Free for content teams.',
  },
  {
    id: 'backlink-calculator',
    name: 'Backlink ROI Calculator',
    slug: 'backlink-calculator',
    description: 'Estimate value and ROI of backlink campaigns.',
    category: 'analytics',
    icon: 'TrendingUp',
    metaTitle: 'Free Backlink ROI Calculator | Anthroly',
    metaDescription: 'Calculate potential ROI from backlinks. Free calculator for link building planning.',
  },
];

export function getFreeToolBySlug(slug: string): FreeTool | undefined {
  return FREE_TOOLS.find((t) => t.slug === slug);
}

export function getAllFreeToolSlugs(): string[] {
  return FREE_TOOLS.map((t) => t.slug);
}
