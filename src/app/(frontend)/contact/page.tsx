import type { Metadata } from 'next';
import { PageHero, SectionHead } from '@/components/Cards';
import { Faqs } from '@/components/Article';
import { ContactForm } from '@/components/Forms';
import { faqs, getGlobal } from '@/lib/cms';
import { DEFAULT_DESC, pageMeta } from '@/lib/meta';
import { breadcrumbSchema, faqSchema, JsonLd } from '@/lib/schema';

export async function generateMetadata(): Promise<Metadata> {
  const c = await getGlobal('contact-page');
  return pageMeta(c.metaTitle || 'Contact MrSEO.pk | MrSEO.pk', c.metaDescription || DEFAULT_DESC, '/contact/');
}

export default async function Contact() {
  const c = await getGlobal('contact-page');
  const contactFaqs = faqs(c.faqs);

  return (
    <main id="main-content">
      <JsonLd items={[breadcrumbSchema([['Contact MrSEO.pk', '/contact/']]), faqSchema(contactFaqs)]} />

      <PageHero center crumbs={[['Contact']]} eyebrow={c.eyebrow} title={c.title ?? ''} desc={c.desc} />

      <section id="contact-section" className="section">
        <div className="container">
          <ContactForm />
        </div>
      </section>

      {contactFaqs.length > 0 && (
        <section className="section section-alt">
          <div className="container container-narrow">
            <SectionHead eyebrow={c.faqHead?.eyebrow} title={c.faqHead?.title ?? ''} />
            <div className="mrseo-article">
              <Faqs faqs={contactFaqs} heading="Frequently asked questions" hideHeading />
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
