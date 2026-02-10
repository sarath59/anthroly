import { MetadataRoute } from 'next';

/**
 * ROBOTS.TXT - Google & AI Bot Configuration
 * 
 * This file tells search engines and AI crawlers:
 * 1. What they can and cannot crawl
 * 2. Where to find the sitemap index
 * 
 * Google Best Practices:
 * ✅ Allow Googlebot full access
 * ✅ Point to sitemap index (not individual sitemaps)
 * ✅ Block non-content paths
 * ✅ Allow AI bots for GEO (Generative Engine Optimization)
 */

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Main rule for all crawlers
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',           // API routes
          '/_next/',         // Next.js internal
          '/private/',       // Private pages
          '/*.json$',        // JSON files
          '/admin/',         // Admin area
        ],
      },
      // Googlebot - full access (most important)
      {
        userAgent: 'Googlebot',
        allow: '/',
      },
      // Google Image bot
      {
        userAgent: 'Googlebot-Image',
        allow: '/',
      },
      // Bing
      {
        userAgent: 'Bingbot',
        allow: '/',
      },
      // OpenAI's GPTBot (for ChatGPT)
      {
        userAgent: 'GPTBot',
        allow: '/',
      },
      // ChatGPT user agent
      {
        userAgent: 'ChatGPT-User',
        allow: '/',
      },
      // Anthropic's Claude
      {
        userAgent: 'Claude-Web',
        allow: '/',
      },
      {
        userAgent: 'anthropic-ai',
        allow: '/',
      },
      // Perplexity AI
      {
        userAgent: 'PerplexityBot',
        allow: '/',
      },
      // Google SGE / AI Overview
      {
        userAgent: 'Google-Extended',
        allow: '/',
      },
    ],
    // Sitemap index pointing to 6 individual sitemaps
    // Split to stay under Google's 50K URL / 50MB limits
    sitemap: 'https://www.anthroly.com/sitemap.xml',
  };
}
