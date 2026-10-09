import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PageHero } from '@/components/Cards';
import { Faqs, Sections } from '@/components/Article';
import { cms, getPage } from '@/lib/cms';
import { pageMeta } from '@/lib/meta';
import { breadcrumbSchema, faqSchema, JsonLd } from '@/lib/schema';

/* Extra pages from the admin (Privacy Policy, Terms and anything else added
   under "Extra pages"), served at /their-slug/. Any other unknown URL gets the 404 page. */

type Props = { params: Promise<{ slug: string[] }> };

export const dynamicParams = true;
export async function generateStaticParams() {
  const res = await (await cms()).find({ collection: 'pages', where: { published: { equals: true } }, limit: 200, depth: 0, pagination: false });
  return res.docs.map((d) => ({ slug: [d.slug as string] }));
}

const load = async (slug: string[]) => (slug.length === 1 ? getPage(slug[0]) : null);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await load((await params).slug);
  if (!p) return { robots: { index: false } };
  const meta = pageMeta(p.metaTitle || `${p.title} | MrSEO.pk`, p.metaDescription || p.intro || p.title, `/${p.slug}/`);
  return p.noindex ? { ...meta, robots: { index: false, follow: true } } : meta;
}

export default async function ExtraPage({ params }: Props) {
  const p = await load((await params).slug);
  if (!p) notFound();
  return (
    <main id="main-content">
      <JsonLd items={[breadcrumbSchema([[p.title, `/${p.slug}/`]]), faqSchema(p.content.faqs)]} />
      <PageHero crumbs={[[p.title]]} title={p.title} desc={p.intro || undefined} />
      <section className="section">
        <div className="container container-narrow">
          <div className="mrseo-article">
            {p.content.quick && <div className="answer-box"><p className="answer-text">{p.content.quick}</p></div>}
            <Sections sections={p.content.sections} />
            <Faqs faqs={p.content.faqs} />
          </div>
        </div>
      </section>
    </main>
  );
}
