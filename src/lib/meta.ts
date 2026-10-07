import type { Metadata } from 'next';

export const DEFAULT_DESC = 'Syed Mudassir Shah has worked on Pakistani search since 2010. SEO, local visibility and paid search for businesses in Karachi, Lahore, Islamabad and across the country. Free audit within 24 hours.';

/** Title, description, canonical and social tags for one page. */
export function pageMeta(title: string, description: string, path: string, type: 'website' | 'article' = 'article'): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path, type, siteName: 'MrSEO.pk', locale: 'en_PK', images: [{ url: '/logo.png', width: 1200, height: 630 }] },
    twitter: { card: 'summary_large_image', title, description, images: ['/logo.png'] },
  };
}
