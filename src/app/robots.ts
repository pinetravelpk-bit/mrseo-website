import type { MetadataRoute } from 'next';
import { abs } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  return { rules: [{ userAgent: '*', allow: ['/', '/api/media/'], disallow: ['/api/', '/admin/', '/class/'] }], sitemap: abs('/sitemap.xml') };
}
