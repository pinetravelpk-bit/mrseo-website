import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { CityGrid, IndustryGrid, PageHero, SectionHead } from '@/components/Cards';
import { Article } from '@/components/Article';
import { ContactForm } from '@/components/Forms';
import Icon, { WhatsAppIcon } from '@/components/Icon';
import { industryUrl, waLink } from '@/lib/site';
import { getSite } from '@/lib/cms';
import { pageMeta } from '@/lib/meta';
import { breadcrumbSchema, faqSchema, JsonLd, serviceSchema, speakable } from '@/lib/schema';

type Props = { params: Promise<{ slug: string }> };
const PREFIX = 'seo-for-';
const indSlug = (s: string) => (s.startsWith(PREFIX) ? s.slice(PREFIX.length) : '');

export const dynamicParams = true;
export async function generateStaticParams() {
  return Object.keys((await getSite()).industries).map((s) => ({ slug: PREFIX + s }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const ind = (await getSite()).industries[indSlug((await params).slug)];
  if (!ind) return {};
  return pageMeta(
    ind.metaTitle || `SEO for ${ind.name} in Pakistan | MrSEO.pk`,
    ind.metaDescription || `What ranks and what does not for ${ind.name} businesses in Pakistan. Seasonality, content, local visibility and realistic timelines.`,
    industryUrl(ind.slug),
  );
}

export default async function IndustryPage({ params }: Props) {
  const slug = indSlug((await params).slug);
  const { settings: st, cities, industries } = await getSite();
  const ind = industries[slug];
  if (!ind) notFound();
  const name = ind.name;
  const lower = name.toLowerCase();
  const content = ind.content;
  const url = industryUrl(slug);

  const workstreams: [string, string, string][] = [
    ['search', 'Keyword and intent mapping', `We map the exact phrases ${lower} buyers use, including Roman Urdu variants that keyword tools miss, then match each one to a page.`],
    ['pin', 'Local and map visibility', 'Google Business Profile setup, category selection, service listings and a review process your team can realistically sustain.'],
    ['pen', 'Content that answers', `Service pages, comparison pages, pricing explanations and FAQs written for ${lower} buyers rather than for a keyword counter.`],
    ['link', 'Authority building', 'Relevant directories, trade associations, industry publications and genuine partnerships. No paid link networks.'],
    ['coins', 'Paid search where it fits', 'Google and Meta campaigns to cover the keywords organic cannot reach quickly, with tracked cost per enquiry.'],
    ['chart', 'Measurement and reporting', 'Rank tracking, call and WhatsApp tracking, and monthly reporting that connects positions to actual enquiries.'],
  ];

  return (
    <main id="main-content">
      <JsonLd items={[
        breadcrumbSchema([['SEO by Industry', '/seo-for/'], [`SEO for ${name} in Pakistan`, url]]),
        faqSchema(content?.faqs ?? []),
        serviceSchema(`SEO for ${name} businesses in Pakistan`, `${name} SEO`, `Sector-specific search strategy for ${name} businesses in Pakistan.`, url, { '@type': 'Country', name: 'Pakistan' }),
        speakable(url),
      ]} />

      <PageHero
        crumbs={[['SEO by Industry', '/seo-for/'], [`SEO for ${name}`]]}
        icon={ind.icon}
        eyebrow="Industry SEO"
        sub={ind.urdu}
        title={<>SEO for <span className="g">{name}</span> in Pakistan</>}
        desc={`${ind.desc} Below is how this sector actually behaves in Pakistani search, what ranks, what does not, and where the money usually is. Written from ${st.yearsExperience.replace(/\+$/, '')} years of work with ${lower} businesses across the country.`}
        actions={<>
          <Link href="/contact/" className="btn btn-g">Free {name} SEO audit <ArrowRight size={18} /></Link>
          <a href={waLink(st.whatsapp, `Hi, I need SEO help for a ${name} business.`)} className="btn btn-o" target="_blank" rel="noopener"><WhatsAppIcon /> WhatsApp us</a>
        </>}
        facts={[
          ...ind.stats.slice(0, 2).map((s): [string, string, 'g'] => {
            const i = s.indexOf(' ');
            return i < 0 ? [s, '', 'g'] : [s.slice(0, i), s.slice(i + 1), 'g'];
          }),
          [st.yearsExperience, 'Years experience'],
          [String(Object.keys(cities).length), 'Cities covered', 'b'],
        ]}
      >
        {ind.kws.length > 0 && <div className="kw-strip">{ind.kws.map((kw) => <span className="kw-pill" key={kw}>{kw}</span>)}</div>}
      </PageHero>

      {content && (
        <section className="section">
          <div className="container">
            <Article content={content} question={`Short answer: what does ${name} SEO involve in Pakistan?`} owner={st.ownerName} />
          </div>
        </section>
      )}

      <section className="section section-alt">
        <div className="container">
          <SectionHead title={<>How we rank <span className="g">{name}</span> businesses</>} sub="Six workstreams that run in parallel rather than one after another." />
          <div className="grid grid-3">
            {workstreams.map(([ico, t, d]) => (
              <div className="card" key={t}>
                <span className="ico-badge"><Icon name={ico} /></span>
                <h3 className="card-t">{t}</h3>
                <p className="card-d">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead title={<>{name} SEO by <span className="g">city</span></>} sub="Competition, language and seasonality change from one city to the next, so the plan changes with them." />
          <CityGrid prefix={`${name} SEO in`} />
        </div>
      </section>

      <section id="contact-section" className="section section-alt">
        <div className="container">
          <SectionHead eyebrow="Free audit" title={<>Find out where your <span className="g">{name}</span> site stands</>} sub="Send us the URL. You get a written breakdown within 24 hours, with the issues ranked by what they are actually costing you." />
          <ContactForm />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead title={<>SEO for <span className="g">other industries</span></>} />
          <IndustryGrid exclude={slug} />
        </div>
      </section>
    </main>
  );
}
