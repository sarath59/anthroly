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
  async redirects() {
    return [
      { source: '/sitemap-core.xml', destination: '/sitemap.xml', permanent: true },
      { source: '/sitemap-apac-twoway.xml', destination: '/sitemap.xml', permanent: true },
      { source: '/sitemap-twoway.xml', destination: '/sitemap.xml', permanent: true },
      { source: '/sitemap-threeway.xml', destination: '/sitemap.xml', permanent: true },
      { source: '/sitemap-aeo.xml', destination: '/sitemap.xml', permanent: true },
      { source: '/blog', destination: '/guides/ai-citations', permanent: true },
      { source: '/blog/:path*', destination: '/guides/ai-citations', permanent: true },
      { source: '/glossary', destination: '/faq', permanent: true },
      { source: '/glossary/:path*', destination: '/faq', permanent: true },
      { source: '/resources', destination: '/guides/ai-citations', permanent: true },
      { source: '/markets', destination: '/', permanent: true },
      { source: '/markets/:path*', destination: '/', permanent: true },
      { source: '/ai-seo-agency', destination: '/', permanent: true },
      { source: '/ai-seo-agency/:path*', destination: '/', permanent: true },
      { source: '/industries', destination: '/customers', permanent: true },
      { source: '/industries/:path*', destination: '/customers', permanent: true },
      { source: '/use-cases', destination: '/faq', permanent: true },
      { source: '/use-cases/:path*', destination: '/faq', permanent: true },
      { source: '/for', destination: '/', permanent: true },
      { source: '/for/:path*', destination: '/', permanent: true },
      { source: '/integrations', destination: '/tools', permanent: true },
      { source: '/integrations/:path*', destination: '/tools', permanent: true },
      { source: '/compare', destination: '/anthroly-vs-anthropic', permanent: true },
      { source: '/compare/:path*', destination: '/anthroly-vs-anthropic', permanent: true },
      { source: '/aeo/engine/:path*', destination: '/aeo', permanent: true },
      { source: '/aeo/topic/:path*', destination: '/aeo', permanent: true },
    ];
  },
};

module.exports = nextConfig;
