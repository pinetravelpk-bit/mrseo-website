import Link from 'next/link';
import type { Metadata } from 'next';
import { ChartColumn } from 'lucide-react';
import { PageHero } from '@/components/Cards';
import { DEFAULT_DESC, pageMeta } from '@/lib/meta';

export const metadata: Metadata = {
  ...pageMeta('SEO Case Studies from Pakistan | MrSEO.pk', DEFAULT_DESC, '/case-studies/'),
  // Kept out of the index until real case studies are published.
  robots: { index: false, follow: true },
};

export default function CaseStudies() {
  return (
    <main id="main-content">
      <PageHero crumbs={[['Case studies']]} eyebrow="Results" title={<>SEO case studies <span className="g">from Pakistan</span></>} />
      <section className="section">
        <div className="container container-narrow">
          <div className="empty-state">
            <span className="ico-badge"><ChartColumn size={22} /></span>
            <h2>Case studies are on the way</h2>
            <p>Want to know what results look like for a business like yours? Ask for the free audit and we will walk you through comparable work.</p>
            <div className="loc-acts" style={{ justifyContent: 'center', margin: '22px 0 0' }}>
              <Link href="/contact/" className="btn btn-g">Get a free SEO audit</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
