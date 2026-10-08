/** @type {import('next').NextConfig} */
const CITIES = 'karachi|lahore|islamabad|rawalpindi|peshawar|quetta|faisalabad|multan';
const INDUSTRIES = 'travel-tourism|ecommerce|cosmetics|medical|schools|hotels|clinics|real-estate';

const nextConfig = {
  // One build worker keeps memory use low on small servers (the VPS shares RAM with other sites).
  experimental: { cpus: 1 },
  // WordPress permalinks ended in a slash; keep them identical.
  trailingSlash: true,
  async redirects() {
    return [
      { source: '/sitemap_index.xml', destination: '/sitemap.xml', permanent: true },
      // The theme also resolved clean slugs (/seo-expert/karachi/); send them to the canonical URL.
      { source: `/seo-expert/:city(${CITIES})`, destination: '/seo-expert/seo-expert-:city/', permanent: true },
      { source: `/seo-for/:ind(${INDUSTRIES})`, destination: '/seo-for/seo-for-:ind/', permanent: true },
    ];
  },
};
export default nextConfig;
