import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import { ServiceGrid, PageHero, SectionHead } from '@/components/Cards';
import { ContactForm } from '@/components/Forms';
import { WhatsAppIcon } from '@/components/Icon';
import { waLink } from '@/lib/site';
import { getGlobal, getSite } from '@/lib/cms';
import { DEFAULT_DESC, pageMeta } from '@/lib/meta';
import { breadcrumbSchema, JsonLd } from '@/lib/schema';

const PATH = '/services/';

export async function generateMetadata(): Promise<Metadata> {
  const h = (await getGlobal('hub-pages')).services ?? {};
  return pageMeta(h.metaTitle || 'Services | MrSEO.pk', h.metaDescription || DEFAULT_DESC, PATH);
}

export default async function Hub() {
  const [hubs, { settings: s }] = await Promise.all([getGlobal('hub-pages'), getSite()]);
  const h = hubs.services ?? {};
  const audit = hubs.auditHead ?? {};
  return (
    <main id="main-content">
      <JsonLd items={[breadcrumbSchema([['Services', PATH]])]} />
      <PageHero
        crumbs={[['Services']]}
        eyebrow={h.eyebrow}
        title={h.title ?? ''}
        desc={h.desc}
        actions={<>
          <Link href="/contact/" className="btn btn-g">Get a free audit <ArrowRight size={18} /></Link>
          <a href={waLink(s.whatsapp)} className="btn btn-o" target="_blank" rel="noopener"><WhatsAppIcon /> WhatsApp us</a>
        </>}
      />
      <section className="section">
        <div className="container"><ServiceGrid foot="Free audit first" headingLevel={2} /></div>
      </section>
      <section id="contact-section" className="section section-alt">
        <div className="container">
          <SectionHead eyebrow={audit.eyebrow} title={audit.title ?? ''} sub={audit.sub} />
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
