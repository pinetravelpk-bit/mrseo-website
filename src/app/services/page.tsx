import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import { PageHero, SectionHead, ServiceGrid } from '@/components/Cards';
import ContactForm from '@/components/ContactForm';
import { WhatsAppIcon } from '@/components/Icon';
import { waLink } from '@/lib/site';
import { pageMeta } from '@/lib/meta';
import { breadcrumbSchema, JsonLd } from '@/lib/schema';

export const metadata: Metadata = pageMeta(
  'SEO and Digital Marketing Services in Pakistan | MrSEO.pk',
  'SEO, Google Ads, social media, web design, local SEO and content marketing for Pakistani businesses, run as one plan. Free audit within 24 hours.',
  '/services/',
);

export default function Services() {
  return (
    <main id="main-content">
      <JsonLd items={[breadcrumbSchema([['Services', '/services/']])]} />
      <PageHero
        crumbs={[['Services']]}
        eyebrow="Services"
        title={<>What we <span className="g">actually do</span></>}
        desc="Six services, run as one plan rather than six separate invoices. Most clients start with SEO or local search and add the rest once it is working. Each page below explains how the work is actually done, what it costs to run properly, and what a realistic timeline looks like."
        actions={<>
          <Link href="/contact/" className="btn btn-g">Get a free audit <ArrowRight size={18} /></Link>
          <a href={waLink()} className="btn btn-o" target="_blank" rel="noopener"><WhatsAppIcon /> WhatsApp us</a>
        </>}
      />

      <section className="section">
        <div className="container">
          <ServiceGrid foot="Free audit first" headingLevel={2} />
        </div>
      </section>

      <section id="contact-section" className="section section-alt">
        <div className="container">
          <SectionHead eyebrow="Free audit" title={<>Not sure which one you <span className="g">actually need?</span></>} sub="Send your URL and we will tell you where the money is best spent right now, even when the answer is none of the above." />
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
