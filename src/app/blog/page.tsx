import Link from 'next/link';
import type { Metadata } from 'next';
import { PenLine } from 'lucide-react';
import { PageHero } from '@/components/Cards';
import { pageMeta } from '@/lib/meta';

export const metadata: Metadata = {
  ...pageMeta('SEO Blog | MrSEO.pk', 'Expert SEO tips, case studies and digital marketing insights from Syed Mudassir Shah.', '/blog/'),
  // Empty listing pages are thin content; keep them out of the index until posts exist.
  robots: { index: false, follow: true },
};

export default function Blog() {
  return (
    <main id="main-content">
      <PageHero
        crumbs={[['Blog']]}
        eyebrow="Latest articles"
        title={<>SEO Blog <span className="g">Pakistan</span></>}
        desc="Expert SEO tips, case studies and digital marketing insights from Syed Mudassir Shah."
      />
      <section className="section">
        <div className="container container-narrow">
          <div className="empty-state">
            <span className="ico-badge"><PenLine size={22} /></span>
            <h2>No blog posts yet</h2>
            <p>Check back soon. In the meantime, the city and industry guides cover how search works across Pakistan in depth.</p>
            <div className="loc-acts" style={{ justifyContent: 'center', margin: '22px 0 0' }}>
              <Link href="/seo-expert/" className="btn btn-o">SEO by city</Link>
              <Link href="/seo-for/" className="btn btn-o">SEO by industry</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
