import type { MetadataRoute } from 'next';
import { abs, cities, cityUrl, courses, courseUrl, industries, industryUrl, services, serviceUrl } from '@/lib/site';

/* Priorities mirror the theme's Rank Math sitemap settings. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const page = (url: string, priority: number, changeFrequency: 'weekly' | 'monthly' = 'monthly') => ({ url: abs(url), lastModified: now, priority, changeFrequency });
  return [
    page('/', 1, 'weekly'),
    page('/services/', 0.8),
    page('/courses/', 0.9, 'weekly'),
    page('/seo-expert/', 0.8),
    page('/seo-for/', 0.8),
    page('/about/', 0.6),
    page('/contact/', 0.6),
    ...Object.keys(services).map((s) => page(serviceUrl(s), 0.9)),
    ...Object.keys(courses).map((s) => page(courseUrl(s), 0.9, 'weekly')),
    ...Object.keys(cities).map((s) => page(cityUrl(s), 0.9)),
    ...Object.keys(industries).map((s) => page(industryUrl(s), 0.8)),
  ];
}
