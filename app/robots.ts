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
      // =========================================
      // OpenAI Bots (for ChatGPT, SearchGPT)
      // =========================================
      // GPTBot - Main OpenAI crawler for training & ChatGPT
      {
        userAgent: 'GPTBot',
        allow: '/',
      },
      // ChatGPT-User - When users browse with ChatGPT
      {
        userAgent: 'ChatGPT-User',
        allow: '/',
      },
      // OAI-SearchBot - OpenAI's search/browsing feature
      {
        userAgent: 'OAI-SearchBot',
        allow: '/',
      },
      // =========================================
      // Anthropic Bots (for Claude)
      // =========================================
      {
        userAgent: 'Claude-Web',
        allow: '/',
      },
      {
        userAgent: 'anthropic-ai',
        allow: '/',
      },
      {
        userAgent: 'ClaudeBot',
        allow: '/',
      },
      // =========================================
      // Other AI Bots
      // =========================================
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
      // Cohere AI
      {
        userAgent: 'cohere-ai',
        allow: '/',
      },
      // Meta AI
      {
        userAgent: 'FacebookBot',
        allow: '/',
      },
      {
        userAgent: 'Meta-ExternalAgent',
        allow: '/',
      },
      // Apple's Applebot (for Siri, Spotlight)
      {
        userAgent: 'Applebot',
        allow: '/',
      },
      // You.com AI
      {
        userAgent: 'YouBot',
        allow: '/',
      },
    ],
    // Sitemap index pointing to 10 individual sitemaps
    // Split to stay under Google's 50K URL / 50MB limits
    sitemap: 'https://www.anthroly.com/sitemap.xml',
  };
}
