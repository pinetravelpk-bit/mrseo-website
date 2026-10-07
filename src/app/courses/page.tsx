import type { Metadata } from 'next';
import { ArrowRight, Award, GraduationCap, MapPin, Users, Wallet } from 'lucide-react';
import { CourseCard, IncludeGrid, PageHero, SectionHead, Steps } from '@/components/Cards';
import { AnswerBox, Faqs } from '@/components/Article';
import EnrollForm from '@/components/EnrollForm';
import { WhatsAppIcon } from '@/components/Icon';
import { CAMPUS, courseIncludes, courses, coursesByTier, coursesFaqs, waLink } from '@/lib/site';
import { pageMeta } from '@/lib/meta';
import { breadcrumbSchema, faqSchema, JsonLd } from '@/lib/schema';

export const metadata: Metadata = pageMeta(
  'Digital Marketing Courses in Rawalpindi with Free Internship | MrSEO.pk',
  'Twelve digital marketing courses at Scheme 3, Rawalpindi, and live online. Professional courses with a free internship, short courses from PKR 2,000. Taught by Syed Mudassir Shah.',
  '/courses/',
);

const howItRuns: [string, string][] = [
  ['Apply and talk', 'Send the form or a WhatsApp message. We ask what you want out of it and tell you honestly whether the course delivers that.'],
  ['Classes', 'Two or three evenings a week at Scheme 3, Rawalpindi, or live online. Every session is recorded. Every module ends in a piece of work that gets reviewed.'],
  ['Internship', 'Six to eight weeks on live client accounts under supervision, at roughly twelve to fifteen hours a week. Unpaid, real work with real deadlines, and part of the professional courses only.'],
  ['Certificate and reference', 'A certificate of completion, a written reference describing the accounts you handled, and help preparing a portfolio and a CV that match what agencies here look for.'],
];

export default function Courses() {
  return (
    <main id="main-content">
      <JsonLd items={[breadcrumbSchema([['Courses', '/courses/']]), faqSchema(coursesFaqs)]} />

      <PageHero
        crumbs={[['Courses']]}
        eyebrow="Admissions open"
        title={<>Digital marketing <span className="g">courses in Rawalpindi</span></>}
        desc={`Twelve courses taught at our office in ${CAMPUS}, ten minutes from Saddar and an easy drive from most of Islamabad, or live online from anywhere. Six professional programmes that include a free internship on live client accounts, and six short courses from PKR 2,000 for students who want one employable skill in two or three weeks without a big fee. Taught by Syed Mudassir Shah from work he is doing that week, not from a curriculum bought abroad.`}
        actions={<>
          <a href="#enroll" className="btn btn-g">Apply for a batch <ArrowRight size={18} /></a>
          <a href={waLink('Hi, I want details about the digital marketing courses.')} className="btn btn-o" target="_blank" rel="noopener"><WhatsAppIcon /> Ask on WhatsApp</a>
        </>}
        facts={[[String(Object.keys(courses).length), 'Courses', 'g'], ['PKR 2,000', 'Short courses from'], ['14+', 'Years of client work', 'b'], ['Live', 'Client accounts, not demos', 'g']]}
      >
        <div className="course-badges">
          <span className="cbadge cbadge-g"><GraduationCap size={16} /> Free internship with every professional course</span>
          <span className="cbadge cbadge-g"><Award size={16} /> Free certificate of completion</span>
          <span className="cbadge"><MapPin size={16} /> Scheme 3, Rawalpindi · or live online</span>
          <span className="cbadge"><Wallet size={16} /> Short courses from PKR 2,000</span>
          <span className="cbadge"><Users size={16} /> 15 to 18 seats per batch</span>
        </div>
      </PageHero>

      <section className="section-sm">
        <div className="container container-narrow">
          <AnswerBox
            question="What do the MrSEO.pk courses include?"
            answer="Classes run at our Scheme 3 office in Rawalpindi or live online. The six professional courses run six to sixteen weeks at PKR 6,000 to PKR 15,000 and include a free supervised internship on real client accounts. The six short courses run two to three weeks at PKR 2,000 to PKR 4,000 and include the certificate but not the internship."
          />
        </div>
      </section>

      <section id="professional" className="section section-alt">
        <div className="container">
          <SectionHead eyebrow="Professional courses" title={<>Six to sixteen weeks, <span className="g">internship included</span></>} sub="These are the career programmes. Every one ends with supervised work on live client accounts, a written reference and a portfolio." />
          <div className="course-grid">
            {coursesByTier('pro').map(([slug, c]) => <CourseCard key={slug} slug={slug} c={c} variant="pro" />)}
          </div>
        </div>
      </section>

      <section id="short-courses" className="section">
        <div className="container">
          <SectionHead eyebrow="Short courses · from PKR 2,000" title={<>One skill, <span className="g">two or three weeks</span></>} sub="Built for students and first-time freelancers. PKR 2,000 to PKR 4,000, evening and weekend slots, a certificate at the end, and your fee credited towards a professional course if you upgrade within three months." />
          <div className="course-grid">
            {coursesByTier('short').map(([slug, c]) => <CourseCard key={slug} slug={slug} c={c} variant="short" />)}
          </div>
          <p className="note">Short courses do not include the internship. That stays with the professional programmes, because supervising someone on a live client account takes more of our time than a two-week course can cover.</p>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <SectionHead eyebrow="Included in the professional courses" title={<>Internship, certificate and <span className="g">a portfolio you keep</span></>} sub="Nothing here is an upsell added at the end. The limits are stated on the cards rather than buried." />
          <IncludeGrid items={courseIncludes('pro')} />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="How it runs" title={<>From application to <span className="g">reference letter</span></>} />
          <Steps steps={howItRuns} four />
        </div>
      </section>

      <section className="section section-alt">
        <div className="container container-narrow">
          <SectionHead eyebrow="Questions" title={<>Before you <span className="g">apply</span></>} />
          <Faqs faqs={coursesFaqs} heading="Course questions we get asked most" hideHeading />
        </div>
      </section>

      <section className="section-sm">
        <div className="container">
          <div className="spec-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
            <div className="cspec"><span className="cspec-l">Campus</span><span className="cspec-v">{CAMPUS}</span></div>
            <div className="cspec"><span className="cspec-l">Easy for</span><span className="cspec-v">Satellite Town, Saddar, Chaklala, Bahria, DHA and most of Islamabad</span></div>
            <div className="cspec"><span className="cspec-l">Online batches</span><span className="cspec-v">Live, recorded, open to every city</span></div>
            <div className="cspec"><span className="cspec-l">Office hours</span><span className="cspec-v">Monday to Saturday, 9am to 10pm</span></div>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <SectionHead eyebrow="Admissions" title={<>Apply for the <span className="g">next batch</span></>} sub="Applying costs nothing and commits you to nothing. We will tell you if a different course suits you better." />
          <EnrollForm />
        </div>
      </section>
    </main>
  );
}
