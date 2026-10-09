import type { MetadataRoute } from 'next';
import { postImage, postUrl, publishedPosts } from '@/lib/blog';
import { abs, cityUrl, courseUrl, industryUrl, serviceUrl } from '@/lib/site';
import { getCaseStudies, getSite, cms } from '@/lib/cms';

// Rebuilt every minute so scheduled blog posts are listed as soon as they publish.
export const revalidate = 60;

/* Priorities mirror the theme's Rank Math sitemap settings. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const [posts, { services, courses, cities, industries }, studies, pages] = await Promise.all([
    publishedPosts(), getSite(), getCaseStudies(),
    cms().then((p) => p.find({ collection: 'pages', where: { published: { equals: true }, noindex: { not_equals: true } }, limit: 200, depth: 0, pagination: false })),
  ]);
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
    ...(posts.length ? [page('/blog/', 0.7, 'weekly')] : []),
    ...posts.map((p) => ({ url: abs(postUrl(p.slug)), lastModified: new Date(p.publishAt), priority: 0.7, changeFrequency: 'monthly' as const, images: [abs(postImage(p))] })),
    ...(studies.length ? [page('/case-studies/', 0.6), ...studies.map((s) => page(`/case-studies/${s.slug}/`, 0.6))] : []),
    ...pages.docs.map((d) => page(`/${d.slug}/`, 0.3)),
  ];
}
