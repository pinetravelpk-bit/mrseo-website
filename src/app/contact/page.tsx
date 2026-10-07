import type { Metadata } from 'next';
import { PageHero, SectionHead } from '@/components/Cards';
import { Faqs } from '@/components/Article';
import ContactForm from '@/components/ContactForm';
import { contactFaqs } from '@/lib/site';
import { DEFAULT_DESC, pageMeta } from '@/lib/meta';
import { breadcrumbSchema, faqSchema, JsonLd } from '@/lib/schema';

export const metadata: Metadata = pageMeta('Contact MrSEO.pk | MrSEO.pk', DEFAULT_DESC, '/contact/');

export default function Contact() {
  return (
    <main id="main-content">
      <JsonLd items={[breadcrumbSchema([['Contact MrSEO.pk', '/contact/']]), faqSchema(contactFaqs)]} />

      <PageHero
        center
        crumbs={[['Contact']]}
        eyebrow="Free SEO audit"
        title={<>Talk to <span className="g">Syed Mudassir Shah</span></>}
        desc="Send your website URL and you will get a written audit back within 24 hours. It covers what is working, what is broken and what is worth fixing first. No obligation and no sales call unless you ask for one."
      />

      <section id="contact-section" className="section">
        <div className="container">
          <ContactForm />
        </div>
      </section>

      <section className="section section-alt">
        <div className="container container-narrow">
          <SectionHead eyebrow="Before you write" title={<>Questions people ask <span className="g">first</span></>} />
          <div className="mrseo-article">
            <Faqs faqs={contactFaqs} heading="Frequently asked questions" hideHeading />
          </div>
        </div>
      </section>
    </main>
  );
}
