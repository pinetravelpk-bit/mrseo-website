import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, CircleCheck, MapPin } from 'lucide-react';
import { CityGrid, CourseCard, CtaPanel, IndustryGrid, SectionHead, ServiceGrid, Steps } from '@/components/Cards';
import { Faqs } from '@/components/Article';
import ContactForm from '@/components/ContactForm';
import Icon, { WhatsAppIcon } from '@/components/Icon';
import { cities, coursesByTier, courseUrl, homeFaqs, waLink } from '@/lib/site';
import { DEFAULT_DESC, pageMeta } from '@/lib/meta';
import { faqSchema, JsonLd, speakable } from '@/lib/schema';
import { testimonials } from '@/data/testimonials';

export const metadata: Metadata = pageMeta('SEO Expert in Pakistan | MrSEO.pk', DEFAULT_DESC, '/', 'website');

const steps: [string, string][] = [
  ['Audit', 'We look at what is actually holding the site back and what your competitors are doing that you are not.'],
  ['Plan', 'A 90 day roadmap with named priorities, so you know what is being worked on and why.'],
  ['Build', 'Technical fixes, page architecture, content and local visibility, in the order that matters most.'],
  ['Report', 'Weekly rank tracking and a monthly report that connects positions to enquiries.'],
  ['Expand', 'Once a keyword cluster is working, we widen into adjacent terms, areas or cities.'],
];

const whys: [string, string, string][] = [
  ['trophy', 'A long track record', 'Ranking Pakistani businesses since 2010, before most local agencies existed. That history means fewer experiments at your expense.'],
  ['local', 'Local search knowledge', 'Roman Urdu queries, city-level competition and Pakistani buying behaviour are not things you learn from international SEO courses.'],
  ['chart', 'Reporting you can check', 'Weekly rank tracking and monthly reports tied to enquiries. If a month goes badly, you will hear it from us first.'],
  ['map', 'City-specific plans', 'Karachi and Quetta need completely different strategies. Running the same template in both wastes budget in one and underinvests in the other.'],
  ['layers', 'Sector depth', 'Real working knowledge in healthcare, travel, education, property, hospitality and e-commerce, including where each one sits with Google quality assessment.'],
  ['unlock', 'No lock-in contracts', 'Monthly terms. If the work is not producing, you should be able to stop without a legal argument.'],
];

export default function Home() {
  return (
    <main id="main-content">
      <JsonLd items={[faqSchema(homeFaqs), speakable('/')]} />

      {/* HERO */}
      <section id="hero">
        <div className="container hero-wrap">
          <div className="hero-copy">
            <div className="eyebrow">SEO consultant, Pakistan</div>
            <h1 className="hero-h1">Get found on Google <span className="g">across Pakistan</span></h1>
            <p className="hero-desc">Syed Mudassir Shah has been ranking Pakistani businesses since 2010. Straight answers, honest timelines and reporting that connects rankings to enquiries.</p>

            <div className="hero-acts">
              <Link href="/contact/" className="btn btn-g btn-lg">Get a free SEO audit <ArrowRight size={18} /></Link>
              <a href={waLink('Hi, I would like to talk about SEO for my business.')} className="btn btn-o btn-lg" target="_blank" rel="noopener"><WhatsAppIcon /> Message on WhatsApp</a>
            </div>

            <ul className="hero-points">
              <li><CircleCheck size={18} /> Written audit in 24 hours</li>
              <li><CircleCheck size={18} /> Monthly terms, no lock-in</li>
              <li><CircleCheck size={18} /> No ranking guarantees, no fake reviews</li>
            </ul>

            <div className="hero-stats">
              <div><span className="hs-val">400+</span><span className="hs-lbl">Clients served</span></div>
              <div><span className="hs-val">14+</span><span className="hs-lbl">Years experience</span></div>
              <div><span className="hs-val">50+</span><span className="hs-lbl">Websites ranked</span></div>
              <div><span className="hs-val">8</span><span className="hs-lbl">Cities and industries</span></div>
            </div>
          </div>

          <aside className="profile-card" aria-label="About Syed Mudassir Shah">
            <div className="pc-top">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo-mark.png" alt="" width={64} height={64} className="pc-av" />
              <div>
                <div className="pc-name">Syed Mudassir Shah</div>
                <div className="pc-role">SEO consultant and founder, MrSEO.pk</div>
                <div className="pc-loc"><MapPin size={15} aria-hidden="true" /> Islamabad based, working nationwide</div>
              </div>
            </div>
            <div className="pc-body">
              <p className="pc-label">How every engagement works</p>
              <ul className="pc-list">
                <li><CircleCheck size={18} />A free written audit within 24 hours</li>
                <li><CircleCheck size={18} />A 90 day roadmap with named priorities</li>
                <li><CircleCheck size={18} />Weekly rank tracking from day one</li>
                <li><CircleCheck size={18} />Monthly reports tied to enquiries, not traffic</li>
              </ul>
              <div className="pc-chips">
                {Object.values(cities).map((c) => <span className="chip" key={c.slug}>{c.name}</span>)}
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* DIRECT ANSWER */}
      <section className="section-sm" style={{ paddingTop: 0 }}>
        <div className="container container-narrow">
          <div className="answer-box" style={{ margin: 0 }}>
            <p className="answer-label">In short: what does MrSEO.pk do?</p>
            <p className="answer-text">MrSEO.pk is an SEO consultancy run by Syed Mudassir Shah from Islamabad, working with businesses across Pakistan since 2010. The work covers technical SEO, local search visibility, content and paid search, with weekly rank tracking and monthly reporting tied to enquiries rather than traffic alone.</p>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="section">
        <div className="container">
          <SectionHead eyebrow="Services" title={<>What we <span className="g">actually do</span></>} sub="Six services, run as one plan. Most clients start with SEO and add the rest once it is working." />
          <ServiceGrid />
        </div>
      </section>

      {/* COURSES */}
      <section id="courses" className="section section-alt">
        <div className="container">
          <SectionHead
            eyebrow="Training · Scheme 3, Rawalpindi"
            title={<>Digital marketing <span className="g">courses</span></>}
            sub="Taught at our Rawalpindi office or live online. Professional courses run PKR 6,000 to PKR 15,000 and include a free internship on live client accounts. Short courses start at PKR 2,000."
          />
          <div className="course-grid m-scroll">
            {coursesByTier('pro').map(([slug, c]) => <CourseCard key={slug} slug={slug} c={c} variant="home" />)}
          </div>
          <p className="swipe-hint">Swipe for all six courses</p>

          <div className="short-strip">
            <div className="ss-head">
              <div>
                <h3 className="ss-t">Short courses for students <span className="g">from PKR 2,000</span></h3>
                <p className="ss-d">Two to three weeks, one skill, evenings and weekends. PKR 2,000 to PKR 4,000, certificate included, internship not.</p>
              </div>
              <Link href="/courses/#short-courses" className="btn btn-o btn-sm">See all six <ArrowRight size={16} /></Link>
            </div>
            <div className="ss-grid">
              {coursesByTier('short').map(([slug, c]) => (
                <Link key={slug} href={courseUrl(slug)} className="ss-item">
                  <span className="mi-ico"><Icon name={`course:${slug}`} size={20} /></span>
                  <span><span className="ss-name">{c.name}</span><span className="ss-meta">{c.duration} · PKR {c.fee}</span></span>
                </Link>
              ))}
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: 36 }}>
            <Link href="/courses/" className="btn btn-g">All courses, fees and batch dates <ArrowRight size={18} /></Link>
          </div>
        </div>
      </section>

      {/* CITIES */}
      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Coverage" title={<>SEO across <span className="g">Pakistan</span></>} sub="Competition, language behaviour and seasonality change from city to city. Each guide below explains how that market actually works." />
          <CityGrid sub="note+comp" />
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="section section-alt">
        <div className="container">
          <SectionHead eyebrow="Industry experience" title={<>SEO for <span className="g">specific sectors</span></>} sub="Every sector has its own season, its own search behaviour and its own quality bar. Generic SEO advice ignores all three." />
          <IndustryGrid showStats compact />
        </div>
      </section>

      {/* PROCESS */}
      <section className="section">
        <div className="container">
          <SectionHead eyebrow="How it works" title={<>Five stages, <span className="g">no mystery</span></>} />
          <Steps steps={steps} />
        </div>
      </section>

      {/* WHY */}
      <section className="section section-alt">
        <div className="container">
          <SectionHead eyebrow="Why work with us" title={<>What makes this <span className="g">different</span></>} />
          <div className="grid grid-3 m-scroll">
            {whys.map(([ico, t, d]) => (
              <div className="card" key={t}>
                <span className="ico-badge"><Icon name={ico} /></span>
                <h3 className="card-t">{t}</h3>
                <p className="card-d">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS: shown only once real, attributable feedback is added */}
      {testimonials.length > 0 && (
        <section className="section">
          <div className="container">
            <SectionHead eyebrow="Client feedback" title={<>What clients <span className="g">have said</span></>} />
            <div className="grid grid-3">
              {testimonials.slice(0, 6).map((t) => (
                <figure className="card" key={t.name}>
                  <blockquote className="ttxt">{t.text}</blockquote>
                  <figcaption className="tauth">
                    <span className="tavt" aria-hidden="true">{t.name.slice(0, 2).toUpperCase()}</span>
                    <span>
                      <span className="taname">{t.name}</span>
                      {t.role && <span className="tarole" style={{ display: 'block' }}>{t.role}</span>}
                      {t.city && <span className="tacity" style={{ display: 'block' }}>{t.city}</span>}
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="section">
        <div className="container container-narrow">
          <SectionHead eyebrow="Common questions" title={<>Questions we get <span className="g">every week</span></>} />
          <div className="mrseo-article">
            <Faqs faqs={homeFaqs} heading="SEO in Pakistan: frequently asked questions" hideHeading />
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact-section" className="section section-alt">
        <div className="container">
          <SectionHead eyebrow="Free audit" title={<>Find out where you <span className="g">actually stand</span></>} sub="Send us your URL. You get a written breakdown within 24 hours, with problems ranked by what they are costing you. No obligation." />
          <ContactForm />
        </div>
      </section>

      <CtaPanel
        title={<>Ready to talk about <span className="g">your site?</span></>}
        text="A short conversation is usually enough to tell whether SEO is the right spend for your business right now. If it is not, we will say so."
        note="Free, delivered in 24 hours, no commitment"
      >
        <a href="#contact-section" className="btn btn-g btn-lg">Start the free audit</a>
        <a href={waLink()} className="btn btn-wa btn-lg" target="_blank" rel="noopener"><WhatsAppIcon /> WhatsApp now</a>
      </CtaPanel>
    </main>
  );
}
