import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { CityGrid, PageHero, SectionHead, ServiceGrid } from '@/components/Cards';
import { Article } from '@/components/Article';
import { ContactForm } from '@/components/Forms';
import { WhatsAppIcon } from '@/components/Icon';
import { serviceUrl, waLink } from '@/lib/site';
import { getSite } from '@/lib/cms';
import { pageMeta } from '@/lib/meta';
import { breadcrumbSchema, faqSchema, JsonLd, serviceSchema, speakable } from '@/lib/schema';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = true;
export async function generateStaticParams() {
  return Object.keys((await getSite()).services).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const svc = (await getSite()).services[slug];
  if (!svc) return {};
  return pageMeta(
    svc.metaTitle || `${svc.name} Services in Pakistan | MrSEO.pk`,
    svc.metaDescription || `How ${svc.name} is actually done for Pakistani businesses: what the work involves, what it costs to run properly and realistic timelines. Free audit within 24 hours.`,
    serviceUrl(slug),
  );
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const { settings: st, services, cities } = await getSite();
  const svc = services[slug];
  if (!svc) notFound();
  const sn = svc.name;
  const content = svc.content;
  const url = serviceUrl(slug);

  return (
    <main id="main-content">
      <JsonLd items={[
        breadcrumbSchema([['Services', '/services/'], [`${sn} Services in Pakistan`, url]]),
        faqSchema(content?.faqs ?? []),
        serviceSchema(`${sn} services in Pakistan`, sn, `How ${sn} is delivered for Pakistani businesses by ${st.ownerName}.`, url, { '@type': 'Country', name: 'Pakistan' }),
        speakable(url),
      ]} />

      <PageHero
        crumbs={[['Services', '/services/'], [sn]]}
        icon={svc.icon}
        eyebrow="Service"
        sub={svc.sub}
        title={<><span className="g">{sn}</span> services in Pakistan</>}
        desc={<>{svc.desc} Below is how this work is actually done, what it costs to run properly, and what a realistic timeline looks like. Delivered directly by {st.ownerName}, working on Pakistani search since 2010.</>}
        actions={<>
          <Link href="/contact/" className="btn btn-g">Get a free audit <ArrowRight size={18} /></Link>
          <a href={waLink(st.whatsapp, `Hi, I would like to discuss ${sn} for my business.`)} className="btn btn-o" target="_blank" rel="noopener"><WhatsAppIcon /> WhatsApp us</a>
        </>}
        facts={[[st.yearsExperience, 'Years experience', 'g'], [st.websitesRanked, 'Websites ranked', 'b'], [String(Object.keys(cities).length), 'Cities covered'], ['Monthly', 'No lock-in terms', 'g']]}
      />

      {content && (
        <section className="section">
          <div className="container">
            <Article content={content} question={`Short answer: what does ${sn} involve?`} owner={st.ownerName} />
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
