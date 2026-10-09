import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { CityGrid, IndustryGrid, PageHero, SectionHead, ServiceGrid } from '@/components/Cards';
import { Article } from '@/components/Article';
import { ContactForm } from '@/components/Forms';
import { WhatsAppIcon } from '@/components/Icon';
import { cityUrl, waLink } from '@/lib/site';
import { getSite } from '@/lib/cms';
import { pageMeta } from '@/lib/meta';
import { breadcrumbSchema, faqSchema, JsonLd, serviceSchema, speakable } from '@/lib/schema';

type Props = { params: Promise<{ slug: string }> };
const PREFIX = 'seo-expert-';
const citySlug = (s: string) => (s.startsWith(PREFIX) ? s.slice(PREFIX.length) : '');

export const dynamicParams = true;
export async function generateStaticParams() {
  return Object.keys((await getSite()).cities).map((s) => ({ slug: PREFIX + s }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const city = (await getSite()).cities[citySlug((await params).slug)];
  if (!city) return {};
  return pageMeta(
    city.metaTitle || `SEO Expert in ${city.name} | MrSEO.pk`,
    city.metaDescription || `How SEO actually works in ${city.name}: areas that convert, local competition, realistic timelines and costs. Free audit within 24 hours.`,
    cityUrl(city.slug),
  );
}

export default async function CityPage({ params }: Props) {
  const slug = citySlug((await params).slug);
  const { settings: st, cities } = await getSite();
  const city = cities[slug];
  if (!city) notFound();
  const cn = city.name;
  const content = city.content;
  const url = cityUrl(slug);

  return (
    <main id="main-content">
      <JsonLd items={[
        breadcrumbSchema([['SEO by City', '/seo-expert/'], [`SEO Expert in ${cn}`, url]]),
        faqSchema(content?.faqs ?? []),
        serviceSchema(`SEO services in ${cn}`, 'Search engine optimisation', `SEO, local visibility and content for businesses in ${cn}, run by ${st.ownerName}.`, url,
          { '@type': 'City', name: cn, containedInPlace: { '@type': 'Country', name: 'Pakistan' } }),
        speakable(url),
      ]} />

      <PageHero
        crumbs={[['SEO by City', '/seo-expert/'], [`SEO Expert ${cn}`]]}
        icon={city.icon}
        eyebrow={`SEO Expert ${cn}`}
        sub={`${city.urdu} · ${city.note}`}
        title={<>SEO Expert in <span className="g">{cn}</span></>}
        desc={`${st.ownerName} has been ranking ${cn} businesses on Google since 2010. This page covers how search actually behaves in ${cn}, which areas and industries convert, and what a realistic campaign looks like. If you would rather skip the reading, the free audit tells you where you stand within 24 hours.`}
        actions={<>
          <Link href="/contact/" className="btn btn-g">Get a free {cn} SEO audit <ArrowRight size={18} /></Link>
          <a href={waLink(st.whatsapp, `Hi, I am looking for an SEO expert in ${cn}.`)} className="btn btn-o" target="_blank" rel="noopener"><WhatsAppIcon /> WhatsApp us</a>
        </>}
        facts={[[city.clients, `${cn} clients`], [st.yearsExperience, 'Years experience', 'g'], [st.websitesRanked, 'Websites ranked', 'b'], [city.comp, 'Competition level']]}
      >
        <div className="kw-strip">
          {['SEO Expert', 'SEO Agency', 'SEO Services', 'Local SEO', 'Google Ranking'].map((k) => <span className="kw-pill" key={k}>{k} {cn}</span>)}
        </div>
      </PageHero>

      {content && (
        <section className="section">
          <div className="container">
            <Article content={content} question={`Short answer: what does SEO in ${cn} involve?`} owner={st.ownerName} />
          </div>
        </section>
      )}

      <section className="section section-alt">
        <div className="container">
          <SectionHead title={<>What we do for <span className="g">{cn}</span> businesses</>} sub="Six services, run as one plan rather than six separate invoices." />
          <ServiceGrid title={(n) => `${n} in ${cn}`} foot="Free audit first" />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead title={<>Industries we work with in <span className="g">{cn}</span></>} sub="Each of these has its own search behaviour, its own season and its own quality bar." />
          <IndustryGrid suffix=" SEO" />
        </div>
      </section>

      <section id="contact-section" className="section section-alt">
        <div className="container">
          <SectionHead eyebrow="Free audit" title={<>Where does your site actually stand in <span className="g">{cn}</span>?</>} sub="Send the URL and we will send back a plain-English breakdown within 24 hours. No obligation and no sales call unless you ask for one." />
          <ContactForm />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead title={<>SEO in <span className="g">other Pakistani cities</span></>} />
          <CityGrid exclude={slug} />
        </div>
      </section>
    </main>
  );
}
