import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowRight, Award, Check, GraduationCap, MapPin, Users, Wallet } from 'lucide-react';
import { IncludeGrid, PageHero, SectionHead } from '@/components/Cards';
import { Article } from '@/components/Article';
import { EnrollForm } from '@/components/Forms';
import Icon, { WhatsAppIcon } from '@/components/Icon';
import { courseUrl, entries, numWord, waLink } from '@/lib/site';
import { getGlobal, getSite } from '@/lib/cms';
import { pageMeta } from '@/lib/meta';
import { breadcrumbSchema, courseSchema, faqSchema, JsonLd, speakable } from '@/lib/schema';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = true;
export async function generateStaticParams() {
  return Object.keys((await getSite()).courses).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { settings: st, courses } = await getSite();
  const c = courses[slug];
  if (!c) return {};
  const { ownerName, campus: CAMPUS, campusCity: CAMPUS_CITY } = st;
  const isShort = c.tier === 'short';
  const title = isShort
    ? `${c.name} Course in ${CAMPUS_CITY} | PKR ${c.fee} | MrSEO.pk`
    : `${c.name} in ${CAMPUS_CITY} with Free Internship | MrSEO.pk`;
  const desc = isShort
    ? `${c.duration} ${c.name} course in ${CAMPUS}, and live online. PKR ${c.fee} with a free certificate of completion. Evening and weekend batches.`
    : `${c.duration} ${c.name} course in ${CAMPUS}, and live online. Free internship on live client accounts and a certificate of completion. Taught by ${ownerName}.`;
  return pageMeta(c.metaTitle || title, c.metaDescription || desc, courseUrl(slug));
}

export default async function CoursePage({ params }: Props) {
  const { slug } = await params;
  const [{ settings: st, courses }, page] = await Promise.all([getSite(), getGlobal('courses-page')]);
  const c = courses[slug];
  if (!c) notFound();
  const { campus: CAMPUS, campusCity: CAMPUS_CITY, campusArea: CAMPUS_AREA } = st;
  const cn = c.name;
  const tier = c.tier ?? 'pro';
  const isShort = tier === 'short';
  const content = c.content;
  const url = courseUrl(slug);

  const others = entries(courses).filter(([k]) => k !== slug);
  const related = [...others.filter(([, x]) => x.tier === tier), ...others.filter(([, x]) => x.tier !== tier)].slice(0, 6);

  return (
    <main id="main-content">
      <JsonLd items={[
        breadcrumbSchema([['Courses', '/courses/'], [`${cn} in ${CAMPUS_CITY}`, url]]),
        courseSchema(c, st),
        faqSchema(content?.faqs ?? []),
        speakable(url),
      ]} />

      <PageHero
        crumbs={[['Courses', '/courses/'], [cn]]}
        icon={c.icon}
        eyebrow={isShort ? 'Short course · admissions open' : 'Course · admissions open'}
        sub={c.sub}
        title={<><span className="g">{cn}</span> course in {CAMPUS_CITY} and online</>}
        desc={`${c.desc} Taught on-site at our office in ${CAMPUS}, within easy reach of Islamabad, and live online for everyone else. ${isShort
          ? 'Short, cheap and practical, with a certificate of completion included. The free internship belongs to the longer professional courses.'
          : `A free internship on live client accounts and a certificate of completion are included, delivered by ${st.ownerName} rather than a hired trainer.`}`}
        actions={<>
          <a href="#enroll" className="btn btn-g">Apply for the next batch <ArrowRight size={18} /></a>
          <a href={waLink(st.whatsapp, `Hi, I want details about the ${cn} course.`)} className="btn btn-o" target="_blank" rel="noopener"><WhatsAppIcon /> Ask on WhatsApp</a>
        </>}
        facts={[
          [c.duration, 'Duration', 'g'],
          [c.hours, 'Class time', 'b'],
          [`PKR ${c.fee}`, c.fee_note],
          c.intern ? [c.intern, 'Internship included', 'g'] : ['Free', 'Certificate included', 'g'],
        ]}
      >
        <div className="course-badges">
          {c.intern
            ? <span className="cbadge cbadge-g"><GraduationCap size={16} /> Free internship, {c.intern}</span>
            : <span className="cbadge cbadge-g"><Wallet size={16} /> Only PKR {c.fee}</span>}
          <span className="cbadge cbadge-g"><Award size={16} /> Free certificate</span>
          <span className="cbadge"><MapPin size={16} /> {CAMPUS}</span>
          <span className="cbadge"><Users size={16} /> Only {c.seats} seats per batch</span>
        </div>
      </PageHero>

      {/* AT A GLANCE */}
      <section className="section-sm">
        <div className="container">
          <div className="spec-grid">
            <div className="cspec"><span className="cspec-l">Level</span><span className="cspec-v">{c.level}</span></div>
            <div className="cspec"><span className="cspec-l">Mode</span><span className="cspec-v">{c.mode}</span></div>
            <div className="cspec"><span className="cspec-l">Timings</span><span className="cspec-v">{c.schedule}</span></div>
            <div className="cspec"><span className="cspec-l">Certificate</span><span className="cspec-v">Completion certificate, issued by MrSEO.pk</span></div>
            <div className="cspec"><span className="cspec-l">Campus</span><span className="cspec-v">{CAMPUS}, serving {CAMPUS_AREA}</span></div>
            <div className="cspec"><span className="cspec-l">Internship</span><span className="cspec-v">{c.intern ? `${c.intern}, included free` : 'Not included with short courses'}</span></div>
          </div>
        </div>
      </section>

      {c.outcomes.length > 0 && (
        <section className="section section-alt">
          <div className="container">
            <SectionHead eyebrow="Outcomes" title={<>What you can <span className="g">do afterwards</span></>} sub="Written as tasks rather than topics, because this is what an employer or a client will actually ask you to perform." />
            <ul className="out-grid">
              {c.outcomes.map((o) => (
                <li className="out-item" key={o}><span className="out-tick" aria-hidden="true"><Check size={15} strokeWidth={3} /></span><span>{o}</span></li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {content && (
        <section className="section">
          <div className="container">
            <Article content={content} question={`In short: what is the ${cn} course?`} owner={st.ownerName} />
          </div>
        </section>
      )}

      {c.tools.length > 0 && (
        <section className="section-sm section-alt">
          <div className="container">
            <SectionHead title={<>Tools you will <span className="g">work in</span></>} />
            <div className="kw-strip" style={{ justifyContent: 'center', marginBottom: 0 }}>
              {c.tools.map((t) => <span className="kw-pill" key={t}>{t}</span>)}
            </div>
          </div>
        </section>
      )}

      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="Included in the fee"
            title={<>{isShort ? 'What you get for' : 'Internship and certificate,'} <span className="g">{isShort ? `PKR ${c.fee}` : 'at no extra cost'}</span></>}
            sub="There is no separate charge added later for any of this. The limits are stated plainly on each card."
          />
          <IncludeGrid items={(isShort ? page.includesShort : page.includesPro) ?? []} />
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <SectionHead eyebrow="Admissions" title={<>Apply for the <span className="g">{cn}</span> batch</>} sub="Tell us where you are starting from. If this course is the wrong fit for what you want, we will say so and point you at the right one." />
          <EnrollForm selected={slug} />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead title={<>Our <span className="g">other courses</span></>} sub={<Link href="/courses/">See all {numWord(Object.keys(courses).length)} courses, fees and batch dates</Link>} />
          <div className="grid grid-3">
            {related.map(([oslug, oc]) => (
              <Link key={oslug} href={courseUrl(oslug)} className="card">
                <span className={'ico-badge' + (oc.intern ? '' : ' blue')}><Icon name={oc.icon} /></span>
                <h3 className="card-t">{oc.name}</h3>
                <p className="card-d">{oc.desc}</p>
                <div className="card-foot"><span className="card-meta">{oc.duration} · PKR {oc.fee}{oc.intern ? ' · internship included' : ' · short course'}</span></div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
