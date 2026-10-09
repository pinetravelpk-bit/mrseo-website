import type { Metadata } from 'next';
import { ArrowRight, Award, GraduationCap, MapPin, Users, Wallet } from 'lucide-react';
import { CourseCard, IncludeGrid, PageHero, SectionHead, Steps } from '@/components/Cards';
import { AnswerBox, Faqs } from '@/components/Article';
import { EnrollForm } from '@/components/Forms';
import { WhatsAppIcon } from '@/components/Icon';
import { coursesByTier, waLink } from '@/lib/site';
import { faqs, getGlobal, getSite, texts } from '@/lib/cms';
import { pageMeta } from '@/lib/meta';
import { breadcrumbSchema, faqSchema, JsonLd } from '@/lib/schema';

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function generateMetadata(): Promise<Metadata> {
  const p = await getGlobal('courses-page');
  return pageMeta(p.metaTitle || 'Digital Marketing Courses | MrSEO.pk', p.metaDescription || '', '/courses/');
}

const BADGE_ICONS = [GraduationCap, Award, MapPin, Wallet, Users];

export default async function Courses() {
  const [p, { settings: s, courses }] = await Promise.all([getGlobal('courses-page'), getSite()]);
  const coursesFaqs = faqs(p.faqs);
  const head = (x: any) => ({ eyebrow: x?.eyebrow, title: x?.title ?? '', sub: x?.sub });
  const short = coursesByTier(courses, 'short');
  const cheapest = short.map(([, c]) => c.fee).sort((a, b) => (parseInt(a.replace(/\D/g, ''), 10) || 0) - (parseInt(b.replace(/\D/g, ''), 10) || 0))[0];

  return (
    <main id="main-content">
      <JsonLd items={[breadcrumbSchema([['Courses', '/courses/']]), faqSchema(coursesFaqs)]} />

      <PageHero
        crumbs={[['Courses']]}
        eyebrow={p.eyebrow}
        title={p.title ?? ''}
        desc={p.desc}
        actions={<>
          <a href="#enroll" className="btn btn-g">Apply for a batch <ArrowRight size={18} /></a>
          <a href={waLink(s.whatsapp, 'Hi, I want details about the digital marketing courses.')} className="btn btn-o" target="_blank" rel="noopener"><WhatsAppIcon /> Ask on WhatsApp</a>
        </>}
        facts={[
          [String(Object.keys(courses).length), 'Courses', 'g'],
          ...(cheapest ? [[`PKR ${cheapest}`, 'Short courses from'] as [string, string]] : []),
          [s.yearsExperience, 'Years of client work', 'b'],
          ['Live', 'Client accounts, not demos', 'g'],
        ]}
      >
        <div className="course-badges">
          {texts(p.badges).map((b, i) => {
            const I = BADGE_ICONS[i % BADGE_ICONS.length];
            return <span key={b} className={'cbadge' + (i < 2 ? ' cbadge-g' : '')}><I size={16} /> {b}</span>;
          })}
        </div>
      </PageHero>

      <section className="section-sm">
        <div className="container container-narrow">
          <AnswerBox question={p.answerQuestion ?? ''} answer={p.answer} />
        </div>
      </section>

      <section id="professional" className="section section-alt">
        <div className="container">
          <SectionHead {...head(p.proHead)} />
          <div className="course-grid">
            {coursesByTier(courses, 'pro').map(([slug, c]) => <CourseCard key={slug} slug={slug} c={c} variant="pro" />)}
          </div>
        </div>
      </section>

      {short.length > 0 && (
        <section id="short-courses" className="section">
          <div className="container">
            <SectionHead {...head(p.shortHead)} />
            <div className="course-grid">
              {short.map(([slug, c]) => <CourseCard key={slug} slug={slug} c={c} variant="short" />)}
            </div>
            {p.shortNote && <p className="note">{p.shortNote}</p>}
          </div>
        </section>
      )}

      <section className="section section-alt">
        <div className="container">
          <SectionHead {...head(p.includesHead)} />
          <IncludeGrid items={p.includesPro ?? []} />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead {...head(p.howHead)} />
          <Steps steps={p.howItRuns ?? []} four />
        </div>
      </section>

      {coursesFaqs.length > 0 && (
        <section className="section section-alt">
          <div className="container container-narrow">
            <SectionHead {...head(p.faqHead)} />
            <Faqs faqs={coursesFaqs} heading="Course questions we get asked most" hideHeading />
          </div>
        </section>
      )}

      {(p.campusFacts ?? []).length > 0 && (
        <section className="section-sm">
          <div className="container">
            <div className="spec-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
              {p.campusFacts.map((f: any) => (
                <div className="cspec" key={f.label}><span className="cspec-l">{f.label}</span><span className="cspec-v">{f.value}</span></div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section section-alt">
        <div className="container">
          <SectionHead {...head(p.applyHead)} />
          <EnrollForm />
        </div>
      </section>
    </main>
  );
}
