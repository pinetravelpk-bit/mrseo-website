import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CtaPanel, PageHero } from '@/components/Cards';
import { Article } from '@/components/Article';
import { getCaseStudies, getSite } from '@/lib/cms';
import { pageMeta } from '@/lib/meta';
import { breadcrumbSchema, faqSchema, JsonLd } from '@/lib/schema';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = true;
export async function generateStaticParams() {
  return (await getCaseStudies()).map((s) => ({ slug: s.slug }));
}

const find = async (slug: string) => (await getCaseStudies()).find((s) => s.slug === slug);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = await find((await params).slug);
  if (!s) return {};
  return pageMeta(s.metaTitle || `${s.title} | MrSEO.pk`, s.metaDescription || s.summary, `/case-studies/${s.slug}/`);
}

export default async function CaseStudy({ params }: Props) {
  const [s, { settings: st }] = await Promise.all([find((await params).slug), getSite()]);
  if (!s) notFound();
  const url = `/case-studies/${s.slug}/`;

  return (
    <main id="main-content">
      <JsonLd items={[breadcrumbSchema([['Case studies', '/case-studies/'], [s.title, url]]), faqSchema(s.content.faqs)]} />
      <PageHero
        crumbs={[['Case studies', '/case-studies/'], [s.title]]}
        eyebrow={[s.client, s.industry, s.city].filter(Boolean).join(' · ') || 'Case study'}
        title={s.title}
        desc={s.summary}
        facts={s.results.slice(0, 4).map((r, i) => [r.value, r.label, i % 2 ? 'b' : 'g'])}
      />
      {s.image && (
        <section className="section-sm">
          <div className="container">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <figure className="post-hero-img"><img src={s.image.url} alt={s.image.alt} /></figure>
          </div>
        </section>
      )}
      <section className="section">
        <div className="container">
          <Article content={s.content} question="In short" owner={st.ownerName} />
        </div>
      </section>
      <CtaPanel title="Want results like this for *your site?*" text="Send your URL and get a written audit within 24 hours: what is working, what is broken and what to fix first." note="Free, delivered in 24 hours, no commitment">
        <Link href="/contact/" className="btn btn-g btn-lg">Get a free SEO audit</Link>
      </CtaPanel>
    </main>
  );
}
