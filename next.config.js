/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/sitemaps/index',
      },
      {
        source: '/sitemap-core.xml',
        destination: '/sitemaps/core',
      },
      {
        source: '/sitemap-apac-twoway.xml',
        destination: '/sitemaps/twoway-apac',
      },
      {
        source: '/sitemap-twoway.xml',
        destination: '/sitemaps/twoway',
      },
      {
        source: '/sitemap-threeway.xml',
        destination: '/sitemaps/threeway',
      },
      {
        source: '/sitemap-aeo.xml',
        destination: '/sitemaps/aeo',
      },
    ];
  },
  async redirects() {
    // Dead glossary relatedTerms Google already crawled → closest real pages
    return [
      {
        source: '/glossary/position-zero',
        destination: '/glossary/featured-snippets',
        permanent: true,
      },
      {
        source: '/glossary/rich-snippets',
        destination: '/glossary/schema-markup',
        permanent: true,
      },
      {
        source: '/glossary/geotargeting',
        destination: '/glossary/local-seo',
        permanent: true,
      },
      {
        source: '/glossary/generative-engine-optimization',
        destination: '/glossary/generative-engine-optimization-geo',
        permanent: true,
      },
      {
        source: '/glossary/serp-features',
        destination: '/glossary/featured-snippets',
        permanent: true,
      },
      {
        source: '/glossary/knowledge-graph',
        destination: '/glossary/knowledge-panel',
        permanent: true,
      },
      {
        source: '/glossary/crawlability',
        destination: '/glossary/crawl-budget',
        permanent: true,
      },
      {
        source: '/glossary/semantic-seo',
        destination: '/glossary/nlp-content-optimization',
        permanent: true,
      },
      {
        source: '/glossary/entity-seo',
        destination: '/glossary/topical-authority',
        permanent: true,
      },
      {
        source: '/glossary/competitive-analysis',
        destination: '/glossary/competitor-analysis-seo',
        permanent: true,
      },
      {
        source: '/glossary/zero-click-searches',
        destination: '/glossary/featured-snippets',
        permanent: true,
      },
      {
        source: '/glossary/helpful-content-update',
        destination: '/glossary/e-e-a-t-experience-expertise-authoritativeness-trustworthiness',
        permanent: true,
      },
      {
        source: '/glossary/dofollow',
        destination: '/glossary/dofollow-nofollow-links',
        permanent: true,
      },
      {
        source: '/glossary/pillar-pages',
        destination: '/glossary/content-clusters',
        permanent: true,
      },
      {
        source: '/glossary/page-experience',
        destination: '/glossary/core-web-vitals',
        permanent: true,
      },
      {
        source: '/glossary/noindex',
        destination: '/glossary/robots-txt',
        permanent: true,
      },
      {
        source: '/glossary/content-audit',
        destination: '/glossary/seo-audit',
        permanent: true,
      },
      {
        source: '/glossary/content-quality',
        destination: '/glossary/e-e-a-t-experience-expertise-authoritativeness-trustworthiness',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
