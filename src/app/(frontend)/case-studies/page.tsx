import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, ChartColumn } from 'lucide-react';
import { PageHero } from '@/components/Cards';
import { getCaseStudies, getGlobal } from '@/lib/cms';
import { DEFAULT_DESC, pageMeta } from '@/lib/meta';
import { breadcrumbSchema, JsonLd } from '@/lib/schema';

export async function generateMetadata(): Promise<Metadata> {
  const [h, studies] = await Promise.all([getGlobal('hub-pages').then((g) => g.caseStudies ?? {}), getCaseStudies()]);
  return {
    ...pageMeta(h.metaTitle || 'SEO Case Studies | MrSEO.pk', h.metaDescription || DEFAULT_DESC, '/case-studies/'),
    // Kept out of the index until real case studies are published.
    robots: { index: studies.length > 0, follow: true },
  };
}

export default async function CaseStudies() {
  const [h, studies] = await Promise.all([getGlobal('hub-pages').then((g) => g.caseStudies ?? {}), getCaseStudies()]);
  return (
    <main id="main-content">
      <JsonLd items={[breadcrumbSchema([['Case studies', '/case-studies/']])]} />
      <PageHero crumbs={[['Case studies']]} eyebrow={h.eyebrow} title={h.title ?? ''} desc={studies.length ? h.desc : undefined} />
      <section className="section">
        <div className="container">
          {studies.length ? (
            <div className="grid grid-3">
              {studies.map((s) => (
                <Link key={s.slug} href={`/case-studies/${s.slug}/`} className="card post-card">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  {s.image && <img src={s.image.url} alt={s.image.alt} className="post-thumb" loading="lazy" />}
                  <div className="post-body">
                    <div className="post-meta"><span className="post-cat">{[s.industry, s.city].filter(Boolean).join(' · ') || 'Case study'}</span></div>
                    <h2 className="card-t">{s.title}</h2>
                    <p className="card-d">{s.summary}</p>
                    {s.results.length > 0 && <div className="tag-row">{s.results.slice(0, 3).map((r) => <span className="tag tag-g" key={r.label}>{r.value} {r.label}</span>)}</div>}
                    <div className="card-foot"><span className="link-arrow">Read the case study <ArrowRight size={16} /></span></div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="empty-state container-narrow">
              <span className="ico-badge"><ChartColumn size={22} /></span>
              <h2>Case studies are on the way</h2>
              <p>Want to know what results look like for a business like yours? Ask for the free audit and we will walk you through comparable work.</p>
              <div className="loc-acts" style={{ justifyContent: 'center', margin: '22px 0 0' }}>
                <Link href="/contact/" className="btn btn-g">Get a free SEO audit</Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
