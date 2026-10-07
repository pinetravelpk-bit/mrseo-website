import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import { IndustryGrid, PageHero, SectionHead } from '@/components/Cards';
import ContactForm from '@/components/ContactForm';
import { WhatsAppIcon } from '@/components/Icon';
import { waLink } from '@/lib/site';
import { pageMeta } from '@/lib/meta';
import { breadcrumbSchema, JsonLd } from '@/lib/schema';

export const metadata: Metadata = pageMeta(
  'SEO by Industry in Pakistan | MrSEO.pk',
  'SEO strategy for travel, e-commerce, beauty, healthcare, schools, hotels, clinics and real estate businesses in Pakistan. Seasonality, content and realistic timelines.',
  '/seo-for/',
);

export default function IndustriesHub() {
  return (
    <main id="main-content">
      <JsonLd items={[breadcrumbSchema([['SEO by Industry', '/seo-for/']])]} />
      <PageHero
        crumbs={[['SEO by Industry']]}
        eyebrow="Industry experience"
        title={<>SEO for <span className="g">specific sectors</span></>}
        desc="Every sector has its own season, its own search behaviour and its own quality bar. Generic SEO advice ignores all three."
        actions={<>
          <Link href="/contact/" className="btn btn-g">Get a free audit <ArrowRight size={18} /></Link>
          <a href={waLink()} className="btn btn-o" target="_blank" rel="noopener"><WhatsAppIcon /> WhatsApp us</a>
        </>}
      />
      <section className="section">
        <div className="container"><IndustryGrid showStats /></div>
      </section>
      <section id="contact-section" className="section section-alt">
        <div className="container">
          <SectionHead eyebrow="Free audit" title={<>Find out where you <span className="g">actually stand</span></>} sub="Send us your URL. You get a written breakdown within 24 hours, with problems ranked by what they are costing you. No obligation." />
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
