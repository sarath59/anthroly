/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  transpilePackages: [
    'remark',
    'remark-gfm',
    'remark-math',
    'remark-rehype',
    'rehype-katex',
    'rehype-raw',
    'rehype-sanitize',
    'rehype-stringify',
  ],
  experimental: {
    optimizePackageImports: ['lucide-react'],
    outputFileTracingExcludes: {
      '*': [
        'node_modules/@swc/core*/**',
        'node_modules/@next/swc*/**',
        'node_modules/@esbuild/**',
        'node_modules/typescript/**',
        'node_modules/webpack/**',
        'node_modules/terser/**',
        '.next/cache/**',
        '.git/**',
      ],
    },
  },
};

module.exports = nextConfig;
