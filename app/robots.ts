import { MetadataRoute } from 'next';
import { absoluteUrl } from '@/lib/site';

/**
 * robots.txt — one sitemap, open crawl for search + AI bots.
 *
 * Generated pSEO / blog / glossary / markets / location matrices were removed.
 * Those old URLs 301 to remaining pages — do not Disallow them, or crawlers
 * will miss the redirects.
 *
 * See /llms.txt and /llms-full.txt for AI content guidance.
 */

const AI_AND_SEARCH_BOTS = [
  'Googlebot',
  'Googlebot-Image',
  'Googlebot-News',
  'Googlebot-Video',
  'Google-Extended',
  'GoogleOther',
  'Storebot-Google',
  'AdsBot-Google',
  'Bingbot',
  'BingPreview',
  'msnbot',
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-Web',
  'anthropic-ai',
  'Claude-SearchBot',
  'Claude-User',
  'PerplexityBot',
  'Perplexity-User',
  'Meta-ExternalAgent',
  'Meta-ExternalFetcher',
  'FacebookBot',
  'facebookexternalhit',
  'Applebot',
  'Applebot-Extended',
  'Amazonbot',
  'Bytespider',
  'CCBot',
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
  'Slurp',
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

const DISALLOW_NON_CONTENT = ['/api/', '/_next/', '/private/', '/admin/'];

const ALLOW_CONTENT = [
  '/',
  '/sitemap.xml',
  '/llms.txt',
  '/llms-full.txt',
  '/faq',
  '/faq.json',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ALLOW_CONTENT,
        disallow: DISALLOW_NON_CONTENT,
      },
      ...AI_AND_SEARCH_BOTS.map((userAgent) => ({
        userAgent,
        allow: ALLOW_CONTENT,
        disallow: DISALLOW_NON_CONTENT,
      })),
    ],
    sitemap: absoluteUrl('/sitemap.xml'),
    host: 'www.anthroly.com',
  };
}
