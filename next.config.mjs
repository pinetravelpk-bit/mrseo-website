import { withPayload } from '@payloadcms/next/withPayload';
/** @type {import('next').NextConfig} */
const CITIES = 'karachi|lahore|islamabad|rawalpindi|peshawar|quetta|faisalabad|multan';
const INDUSTRIES = 'travel-tourism|ecommerce|cosmetics|medical|schools|hotels|clinics|real-estate';

const nextConfig = {
  // One build worker keeps memory use low on small servers (the VPS shares RAM with other sites).
  experimental: { cpus: 1 },
  // WordPress permalinks ended in a slash; keep them identical.
  trailingSlash: true,
  // Long browser and CDN caching for logos, icons and fonts in /public (rename a file to change it).
  async headers() {
    return [
      // Generated blog feature images are excluded: they change when a post is edited.
      { source: '/:file((?!blog-images/).*\\.(?:png|webp|avif|jpg|jpeg|svg|ico|woff2))', headers: [{ key: 'Cache-Control', value: 'public, max-age=2592000, stale-while-revalidate=86400' }] },
    ];
  },
  async redirects() {
    return [
      { source: '/sitemap_index.xml', destination: '/sitemap.xml', permanent: true },
      // The theme also resolved clean slugs (/seo-expert/karachi/); send them to the canonical URL.
      { source: `/seo-expert/:city(${CITIES})`, destination: '/seo-expert/seo-expert-:city/', permanent: true },
      { source: `/seo-for/:ind(${INDUSTRIES})`, destination: '/seo-for/seo-for-:ind/', permanent: true },
    ];
  },
};
export default withPayload(nextConfig, { devBundleServerPackages: false });
