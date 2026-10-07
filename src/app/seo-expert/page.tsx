import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import { CityGrid, PageHero, SectionHead } from '@/components/Cards';
import ContactForm from '@/components/ContactForm';
import { WhatsAppIcon } from '@/components/Icon';
import { waLink } from '@/lib/site';
import { pageMeta } from '@/lib/meta';
import { breadcrumbSchema, JsonLd } from '@/lib/schema';

export const metadata: Metadata = pageMeta(
  'SEO by City in Pakistan | MrSEO.pk',
  'City-by-city SEO guides for Karachi, Lahore, Islamabad, Rawalpindi, Peshawar, Quetta, Faisalabad and Multan: competition, areas that convert and realistic timelines.',
  '/seo-expert/',
);

export default function CitiesHub() {
  return (
    <main id="main-content">
      <JsonLd items={[breadcrumbSchema([['SEO by City', '/seo-expert/']])]} />
      <PageHero
        crumbs={[['SEO by City']]}
        eyebrow="Coverage"
        title={<>SEO across <span className="g">Pakistan</span></>}
        desc="Competition, language behaviour and seasonality change from city to city. Each guide below explains how that market actually works."
        actions={<>
          <Link href="/contact/" className="btn btn-g">Get a free audit <ArrowRight size={18} /></Link>
          <a href={waLink()} className="btn btn-o" target="_blank" rel="noopener"><WhatsAppIcon /> WhatsApp us</a>
        </>}
      />
      <section className="section">
        <div className="container"><CityGrid sub="note+comp" /></div>
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
