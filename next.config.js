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
    const toHome = [
      '/markets', '/ai-seo-agency', '/for', '/compare', '/anthroly-vs-anthropic',
      '/customers', '/industries', '/author', '/tools', '/integrations', '/pricing',
    ];
    const toLearn = ['/blog', '/glossary', '/resources', '/guides', '/aeo', '/reports', '/use-cases'];
    const toContact = ['/diagnostic', '/book'];

    return [
      { source: '/sitemap-:name.xml', destination: '/sitemap.xml', permanent: true },
      { source: '/sitemap/:id', destination: '/sitemap.xml', permanent: true },
      { source: '/faq', destination: '/#faq', permanent: true },
      { source: '/faq.json', destination: '/', permanent: true },
      ...toHome.flatMap((p) => [
        { source: p, destination: '/', permanent: true },
        { source: `${p}/:path*`, destination: '/', permanent: true },
      ]),
      ...toLearn.flatMap((p) => [
        { source: p, destination: '/learn', permanent: true },
        { source: `${p}/:path*`, destination: '/learn', permanent: true },
      ]),
      ...toContact.flatMap((p) => [
        { source: p, destination: '/contact', permanent: true },
        { source: `${p}/:path*`, destination: '/contact', permanent: true },
      ]),
    ];
  },
};

module.exports = nextConfig;
