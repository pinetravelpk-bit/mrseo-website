import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, CircleCheck, MapPin } from 'lucide-react';
import { CityGrid, CourseCard, CtaPanel, IndustryGrid, SectionHead, ServiceGrid, Steps } from '@/components/Cards';
import { Faqs } from '@/components/Article';
import { ContactForm } from '@/components/Forms';
import Hl from '@/components/Hl';
import Icon, { WhatsAppIcon } from '@/components/Icon';
import { coursesByTier, courseUrl, numWord, waLink } from '@/lib/site';
import { faqs, getGlobal, getSite, getTestimonials, texts } from '@/lib/cms';
import { DEFAULT_DESC, pageMeta } from '@/lib/meta';
import { faqSchema, JsonLd, speakable } from '@/lib/schema';

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function generateMetadata(): Promise<Metadata> {
  const h = await getGlobal('home');
  return pageMeta(h.metaTitle || 'SEO Expert in Pakistan | MrSEO.pk', h.metaDescription || DEFAULT_DESC, '/', 'website');
}

export default async function Home() {
  const [h, { settings: s, courses, cities }, testimonials] = await Promise.all([getGlobal('home'), getSite(), getTestimonials()]);
  const homeFaqs = faqs(h.faqs);
  const head = (x: any) => ({ eyebrow: x?.eyebrow, title: x?.title ?? '', sub: x?.sub });
  const short = coursesByTier(courses, 'short');

  return (
    <main id="main-content">
      <JsonLd items={[faqSchema(homeFaqs), speakable('/')]} />

      {/* HERO */}
      <section id="hero">
        <div className="container hero-wrap">
          <div className="hero-copy">
            <div className="eyebrow">{h.heroEyebrow}</div>
            <h1 className="hero-h1"><Hl text={h.heroTitle} /></h1>
            <p className="hero-desc">{h.heroDesc}</p>

            <div className="hero-acts">
              <Link href="/contact/" className="btn btn-g btn-lg">Get a free SEO audit <ArrowRight size={18} /></Link>
              <a href={waLink(s.whatsapp, 'Hi, I would like to talk about SEO for my business.')} className="btn btn-o btn-lg" target="_blank" rel="noopener"><WhatsAppIcon /> Message on WhatsApp</a>
            </div>

            <ul className="hero-points">
              {texts(h.heroPoints).map((p) => <li key={p}><CircleCheck size={18} /> {p}</li>)}
            </ul>

            <div className="hero-stats">
              {(h.heroStats ?? []).map((x: any) => <div key={x.label}><span className="hs-val">{x.value}</span><span className="hs-lbl">{x.label}</span></div>)}
            </div>
          </div>

          <aside className="profile-card" aria-label={`About ${s.ownerName}`}>
            <div className="pc-top">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo-mark.png" alt="" width={64} height={64} className="pc-av" />
              <div>
                <div className="pc-name">{s.ownerName}</div>
                <div className="pc-role">{h.cardRole}</div>
                <div className="pc-loc"><MapPin size={15} aria-hidden="true" /> {h.cardLocation}</div>
              </div>
            </div>
            <div className="pc-body">
              <p className="pc-label">{h.cardLabel}</p>
              <ul className="pc-list">
                {texts(h.cardPoints).map((p) => <li key={p}><CircleCheck size={18} />{p}</li>)}
              </ul>
              <div className="pc-chips">
                {Object.values(cities).map((c) => <span className="chip" key={c.slug}>{c.name}</span>)}
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* DIRECT ANSWER */}
      {h.answerText && (
        <section className="section-sm" style={{ paddingTop: 0 }}>
          <div className="container container-narrow">
            <div className="answer-box" style={{ margin: 0 }}>
              <p className="answer-label">{h.answerLabel}</p>
              <p className="answer-text">{h.answerText}</p>
            </div>
          </div>
        </section>
      )}

      {/* SERVICES */}
      <section id="services" className="section">
        <div className="container">
          <SectionHead {...head(h.servicesHead)} />
          <ServiceGrid />
        </div>
      </section>

      {/* COURSES */}
      <section id="courses" className="section section-alt">
        <div className="container">
          <SectionHead {...head(h.coursesHead)} />
          <div className="course-grid m-scroll">
            {coursesByTier(courses, 'pro').map(([slug, c]) => <CourseCard key={slug} slug={slug} c={c} variant="home" />)}
          </div>
          <p className="swipe-hint">Swipe for all {numWord(coursesByTier(courses, 'pro').length)} courses</p>

          {short.length > 0 && (
            <div className="short-strip">
              <div className="ss-head">
                <div>
                  <h3 className="ss-t"><Hl text={h.shortTitle} /></h3>
                  <p className="ss-d">{h.shortText}</p>
                </div>
                <Link href="/courses/#short-courses" className="btn btn-o btn-sm">See all {numWord(short.length)} <ArrowRight size={16} /></Link>
              </div>
              <div className="ss-grid">
                {short.map(([slug, c]) => (
                  <Link key={slug} href={courseUrl(slug)} className="ss-item">
                    <span className="mi-ico"><Icon name={c.icon} size={20} /></span>
                    <span><span className="ss-name">{c.name}</span><span className="ss-meta">{c.duration} · PKR {c.fee}</span></span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div style={{ textAlign: 'center', marginTop: 36 }}>
            <Link href="/courses/" className="btn btn-g">All courses, fees and batch dates <ArrowRight size={18} /></Link>
          </div>
        </div>
      </section>

      {/* CITIES */}
      <section className="section">
        <div className="container">
          <SectionHead {...head(h.citiesHead)} />
          <CityGrid sub="note+comp" />
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="section section-alt">
        <div className="container">
          <SectionHead {...head(h.industriesHead)} />
          <IndustryGrid showStats compact />
        </div>
      </section>

      {/* PROCESS */}
      <section className="section">
        <div className="container">
          <SectionHead {...head(h.processHead)} />
          <Steps steps={h.steps ?? []} />
        </div>
      </section>

      {/* WHY */}
      <section className="section section-alt">
        <div className="container">
          <SectionHead {...head(h.whyHead)} />
          <div className="grid grid-3 m-scroll">
            {(h.whys ?? []).map((w: any) => (
              <div className="card" key={w.title}>
                <span className="ico-badge"><Icon name={w.icon || 'award'} /></span>
                <h3 className="card-t">{w.title}</h3>
                <p className="card-d">{w.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS: shown only once real, attributable feedback is added in the admin */}
      {testimonials.length > 0 && (
        <section className="section">
          <div className="container">
            <SectionHead {...head(h.testimonialsHead)} />
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
          <SectionHead {...head(h.faqHead)} />
          <div className="mrseo-article">
            <Faqs faqs={homeFaqs} heading="SEO in Pakistan: frequently asked questions" hideHeading />
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact-section" className="section section-alt">
        <div className="container">
          <SectionHead {...head(h.contactHead)} />
          <ContactForm />
        </div>
      </section>

      <CtaPanel title={h.cta?.title ?? ''} text={h.cta?.text} note={h.cta?.note}>
        <a href="#contact-section" className="btn btn-g btn-lg">Start the free audit</a>
        <a href={waLink(s.whatsapp)} className="btn btn-wa btn-lg" target="_blank" rel="noopener"><WhatsAppIcon /> WhatsApp now</a>
      </CtaPanel>
    </main>
  );
}
