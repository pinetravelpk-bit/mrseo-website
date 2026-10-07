import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { CityGrid, PageHero, SectionHead, ServiceGrid } from '@/components/Cards';
import { Article } from '@/components/Article';
import ContactForm from '@/components/ContactForm';
import { WhatsAppIcon } from '@/components/Icon';
import { cities, serviceContent, services, serviceUrl, SITES, waLink } from '@/lib/site';
import { pageMeta } from '@/lib/meta';
import { breadcrumbSchema, faqSchema, JsonLd, serviceSchema, speakable } from '@/lib/schema';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return Object.keys(services).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const svc = services[slug];
  if (!svc) return {};
  return pageMeta(
    `${svc.name} Services in Pakistan | MrSEO.pk`,
    `How ${svc.name} is actually done for Pakistani businesses: what the work involves, what it costs to run properly and realistic timelines. Free audit within 24 hours.`,
    serviceUrl(slug),
  );
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const svc = services[slug];
  if (!svc) notFound();
  const sn = svc.name;
  const content = serviceContent[slug];
  const url = serviceUrl(slug);

  return (
    <main id="main-content">
      <JsonLd items={[
        breadcrumbSchema([['Services', '/services/'], [`${sn} Services in Pakistan`, url]]),
        faqSchema(content?.faqs ?? []),
        serviceSchema(`${sn} services in Pakistan`, sn, `How ${sn} is delivered for Pakistani businesses by Syed Mudassir Shah.`, url, { '@type': 'Country', name: 'Pakistan' }),
        speakable(url),
      ]} />

      <PageHero
        crumbs={[['Services', '/services/'], [sn]]}
        icon={`svc:${slug}`}
        eyebrow="Service"
        sub={svc.sub}
        title={<><span className="g">{sn}</span> services in Pakistan</>}
        desc={<>{svc.desc} Below is how this work is actually done, what it costs to run properly, and what a realistic timeline looks like. Delivered directly by Syed Mudassir Shah, working on Pakistani search since 2010.</>}
        actions={<>
          <Link href="/contact/" className="btn btn-g">Get a free audit <ArrowRight size={18} /></Link>
          <a href={waLink(`Hi, I would like to discuss ${sn} for my business.`)} className="btn btn-o" target="_blank" rel="noopener"><WhatsAppIcon /> WhatsApp us</a>
        </>}
        facts={[['14+', 'Years experience', 'g'], [SITES, 'Websites ranked', 'b'], [String(Object.keys(cities).length), 'Cities covered'], ['Monthly', 'No lock-in terms', 'g']]}
      />

      {content && (
        <section className="section">
          <div className="container">
            <Article content={content} question={`Short answer: what does ${sn} involve?`} />
          </div>
        </section>
      )}

      <section className="section section-alt">
        <div className="container">
          <SectionHead title={<>{sn} by <span className="g">city</span></>} sub="Competition, language and seasonality change from one city to the next, so the plan changes with them." />
          <CityGrid prefix={`${sn} in`} sub="comp" />
        </div>
      </section>

      <section id="contact-section" className="section">
        <div className="container">
          <SectionHead eyebrow="Free audit" title={<>Find out whether <span className="g">{sn}</span> is the right spend</>} sub="Send us the URL. You get a written breakdown within 24 hours, and if this is not the service you need, we will say so." />
          <ContactForm />
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <SectionHead title={<>Our <span className="g">other services</span></>} />
          <ServiceGrid exclude={slug} foot="Free audit first" />
        </div>
      </section>
    </main>
  );
}
