import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, Mail, MapPin } from 'lucide-react';
import { Breadcrumb, CtaPanel, IndustryGrid, SectionHead, StatStrip } from '@/components/Cards';
import { WhatsAppIcon } from '@/components/Icon';
import { EMAIL, PHONE, SITES, waLink } from '@/lib/site';
import { DEFAULT_DESC, pageMeta } from '@/lib/meta';
import { breadcrumbSchema, JsonLd } from '@/lib/schema';

export const metadata: Metadata = pageMeta('About Syed Mudassir Shah | MrSEO.pk', DEFAULT_DESC, '/about/');

export default function About() {
  return (
    <main id="main-content">
      <JsonLd items={[breadcrumbSchema([['About Syed Mudassir Shah', '/about/']])]} />

      <div className="page-hero">
        <div className="container">
          <Breadcrumb items={[['About']]} />
          <div className="about-grid">
            <div>
              <div className="eyebrow">About MrSEO.pk</div>
              <h1 className="about-h1">Syed Mudassir Shah, <span className="g">SEO consultant</span></h1>
              <p className="about-lead">
                I have worked on Pakistani search since 2010, back when most local businesses had no website at all and
                the agencies that existed were mostly reselling directory submissions. MrSEO.pk is the consultancy I built
                out of that work. Around <strong>{SITES} websites</strong> have gone through it across eight industries and eight cities.
              </p>
              <p className="about-lead">
                What I actually sell is judgement about where a business should spend its effort. Sometimes that is SEO.
                Sometimes it is fixing a site that loads in eleven seconds, or a Google Business Profile nobody has touched
                in three years, or admitting that paid search will get you further this quarter. I would rather say that
                up front than sign a retainer that will not work.
              </p>
              <div className="loc-acts" style={{ marginTop: 28, marginBottom: 0 }}>
                <Link href="/contact/" className="btn btn-g">Start a conversation <ArrowRight size={18} /></Link>
                <a href={waLink('Hi Syed, I would like to discuss my site.')} className="btn btn-o" target="_blank" rel="noopener"><WhatsAppIcon /> WhatsApp</a>
              </div>
            </div>

            <div className="about-card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo-mark.png" alt="Syed Mudassir Shah" width={112} height={112} className="about-av" />
              <div className="about-av-name">Syed Mudassir Shah</div>
              <div className="about-av-role">SEO consultant and founder, MrSEO.pk</div>
              <div className="pc-loc"><MapPin size={15} aria-hidden="true" /> Based in Islamabad, working nationwide</div>
              <p style={{ fontSize: 15, marginTop: 10 }}>Search, paid media, content and development.</p>
              <StatStrip stats={[['14+', 'Years', 'g'], ['50+', 'Websites', 'b'], ['400+', 'Clients', 'g'], ['8', 'Industries', 'b']]} />
              <div className="about-contacts">
                <a href={`mailto:${EMAIL}`} style={{ display: 'inline-flex', gap: 8, justifyContent: 'center', alignItems: 'center' }}><Mail size={16} /> {EMAIL}</a>
                <a href={waLink()} target="_blank" rel="noopener" style={{ display: 'inline-flex', gap: 8, justifyContent: 'center', alignItems: 'center', color: 'var(--wa)' }}><WhatsAppIcon size={16} /> {PHONE}</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container container-narrow">
          <div className="mrseo-article">
            <div className="answer-box">
              <p className="answer-label">In short</p>
              <p className="answer-text">Syed Mudassir Shah is an Islamabad-based SEO consultant who has worked on Pakistani search since 2010. MrSEO.pk covers technical SEO, local visibility, content and paid search for businesses in eight cities and eight industries, on monthly terms with no lock-in contract.</p>
            </div>

            <section className="art-block">
              <h2 id="sec-how-i-work">How I work</h2>
              <p>Every engagement starts with an audit, and the audit is genuinely free because it is also how I decide whether I want the work. If your site has a structural problem I cannot fix, or your market is one where paid search will simply serve you better, the audit will say that. Roughly one in five audits ends with me recommending something other than a retainer.</p>
              <p>When we do proceed, the first ninety days are planned in writing before anything starts. You get a named list of priorities, an explanation of why each one is on the list, and an honest estimate of when it should start showing. Weekly rank tracking runs from day one. Monthly reports connect movement to actual enquiries rather than sessions, because traffic that does not turn into business is not a result.</p>
              <p>There is no lock-in contract. Work is billed monthly and you can stop at the end of any month. I have found that removing the contract removes a lot of bad incentives on both sides.</p>
            </section>

            <section className="art-block">
              <h2 id="sec-what-i-do-not-do">What I do not do</h2>
              <p>Being clear about this saves everyone time.</p>
              <ul>
                <li><strong>No ranking guarantees.</strong> Google does not sell positions and nobody can promise them. Any agency offering a guaranteed number one is either targeting keywords nobody searches or planning to use tactics that will eventually cost you the site.</li>
                <li><strong>No bought links or private blog networks.</strong> They work until they do not, and the recovery is worse than never having ranked. Link acquisition here means directories, associations, partnerships and earned coverage.</li>
                <li><strong>No fake reviews.</strong> Not on Google, not on the site, not in structured data. Review manipulation gets profiles suspended, and for a business that depends on the map pack that is close to fatal.</li>
                <li><strong>No mass-produced doorway pages.</strong> Fifty near-identical area pages with the location name swapped in used to work. Google filters them out now, and they make a site look cheap to human visitors too.</li>
                <li><strong>No vanity reporting.</strong> Impressions and keyword counts are easy to inflate. The report shows positions on the terms that matter and the enquiries they produced.</li>
              </ul>
            </section>

            <section className="art-block">
              <h2 id="sec-experience">Where the experience comes from</h2>
              <p>The industries listed on this site are not a marketing menu. They are the sectors I have spent enough time in to have opinions worth paying for.</p>
              <p><strong>Healthcare and clinics</strong> taught me most about quality assessment, because medical content is where Google is strictest. Getting a clinic to rank means getting doctor credentials, authorship and clinical accuracy right, and those lessons transfer to every other category.</p>
              <p><strong>Travel</strong> taught me about seasonality. Publishing a Naran package page in June is the single most common mistake in Pakistani travel marketing, and it costs operators an entire season every year.</p>
              <p><strong>E-commerce</strong> taught me that category pages carry more weight than blogs, and that faceted navigation quietly destroys more Pakistani stores than any competitor does.</p>
              <p><strong>Property</strong> taught me about overseas buyers, who behave nothing like domestic ones and are almost entirely ignored by the businesses trying to sell to them.</p>
              <p><strong>Education</strong> taught me that publishing your fee structure, which almost no Pakistani school does, is worth more than a year of content marketing.</p>
            </section>

            <section className="art-block">
              <h2 id="sec-coverage">Cities and coverage</h2>
              <p>Search in Pakistan is not one market. Karachi is fragmented by area and needs neighbourhood-level targeting. Lahore still rewards city-wide pages. Islamabad has low volume and very high lead value. Quetta and Peshawar have so little competition that basic professional work reaches page one within a quarter. Faisalabad&apos;s real opportunity is not local at all, it is export buyers searching in English from Europe and North America.</p>
              <p>Running the same template across all of those would waste budget in the easy markets and underinvest in the hard ones. Each city guide on this site explains how that particular market behaves, which areas convert, and what a realistic timeline looks like there.</p>
            </section>

            <section className="art-block">
              <h2 id="sec-contact">Getting in touch</h2>
              <p>WhatsApp is fastest and usually gets a reply within an hour during working hours. Email works too and gets a reply the same day. The contact form goes to the same inbox.</p>
              <p>If you are sending a site for an audit, the URL is enough to start. Access to Search Console and Analytics makes the audit considerably more useful, but that can wait until we have spoken.</p>
            </section>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <SectionHead eyebrow="Sectors" title={<>Eight industries, <span className="g">in depth</span></>} />
          <IndustryGrid />
        </div>
      </section>

      <CtaPanel
        title={<>Want a look at <span className="g">your site?</span></>}
        text="Send the URL and you will get a written breakdown within 24 hours, including the parts you will not enjoy reading."
        note="Reviewed personally, not by a template"
      >
        <Link href="/contact/" className="btn btn-g btn-lg">Request the free audit</Link>
      </CtaPanel>
    </main>
  );
}
