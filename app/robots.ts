import { MetadataRoute } from 'next';
import { absoluteUrl } from '@/lib/site';

/**
 * robots.txt — maximum AI + search crawl permission
 *
 * Policy: ALLOW all major search and AI bots (training, retrieval, and
 * user-triggered fetchers). Only block non-content internals.
 *
 * See also: /llms.txt and /llms-full.txt for AI content guidance.
 */

const AI_AND_SEARCH_BOTS = [
  // Google (search + AI)
  'Googlebot',
  'Googlebot-Image',
  'Googlebot-News',
  'Googlebot-Video',
  'Google-Extended', // Gemini / Google AI training opt-in when Allowed
  'GoogleOther',
  'Storebot-Google',
  'AdsBot-Google',
  // Microsoft / Bing
  'Bingbot',
  'BingPreview',
  'msnbot',
  // OpenAI (training + retrieval + user fetch)
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  // Anthropic / Claude
  'ClaudeBot',
  'Claude-Web',
  'anthropic-ai',
  'Claude-SearchBot',
  'Claude-User',
  // Perplexity
  'PerplexityBot',
  'Perplexity-User',
  // Meta AI
  'Meta-ExternalAgent',
  'Meta-ExternalFetcher',
  'FacebookBot',
  'facebookexternalhit',
  // Apple Intelligence / Applebot
  'Applebot',
  'Applebot-Extended',
  // Amazon
  'Amazonbot',
  // ByteDance
  'Bytespider',
  // Common Crawl / open training corpora
  'CCBot',
  // Other AI / answer engines
  'cohere-ai',
  'YouBot',
  'Diffbot',
  'DuckAssistBot',
  'AI2Bot',
  'Ai2Bot-Dolma',
  'omgili',
  'omgilibot',
  'Webzio-Extended',
  'Timpibot',
  'PetalBot',
  'YandexBot',
  'DuckDuckBot',
  'Baiduspider',
  'Sogou',
  'Slurp', // Yahoo
  'LinkedInBot',
  'Twitterbot',
  'Slackbot',
  'Discordbot',
  'TelegramBot',
  'WhatsApp',
  'SemrushBot',
  'AhrefsBot',
  'DotBot',
  'Rogerbot',
  'MJ12bot',
] as const;

// Do NOT blanket-block *.json — AI systems prefer structured feeds like /faq.json
const DISALLOW_NON_CONTENT = [
  '/api/',
  '/_next/',
  '/private/',
  '/admin/',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Default: open site to every crawler
      {
        userAgent: '*',
        allow: '/',
        disallow: DISALLOW_NON_CONTENT,
      },
      // Explicit allow for every major AI + search agent
      ...AI_AND_SEARCH_BOTS.map((userAgent) => ({
        userAgent,
        allow: '/' as const,
        // Mirror the same internal blocks so bots do not waste crawl on app internals
        disallow: DISALLOW_NON_CONTENT,
      })),
    ],
    sitemap: [
      absoluteUrl('/sitemap.xml'),
      absoluteUrl('/sitemap-core.xml'),
      absoluteUrl('/sitemap-apac-twoway.xml'),
      absoluteUrl('/sitemap-twoway.xml'),
      absoluteUrl('/sitemap-threeway.xml'),
      absoluteUrl('/sitemap-aeo.xml'),
    ],
    host: 'www.anthroly.com',
  };
}
