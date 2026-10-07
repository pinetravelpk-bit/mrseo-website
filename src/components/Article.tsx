import Link from 'next/link';
import type { Faq, LongContent, Section } from '@/lib/site';
import FaqList from './FaqList';
import Toc from './Toc';

/** Same output as WordPress sanitize_title(), prefixed, so jump links match the old site. */
export function anchor(text: string): string {
  const slug = text
    .normalize('NFKD').replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/&[a-z0-9#]+;/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/[\s-]+/g, '-');
  return 'sec-' + (slug || 'section');
}

/* Direct-answer block. Answer engines pull from short, self-contained paragraphs placed high on the page. */
export function AnswerBox({ question, answer }: { question: string; answer?: string }) {
  if (!answer) return null;
  return (
    <div className="answer-box">
      <p className="answer-label">{question}</p>
      <p className="answer-text">{answer}</p>
    </div>
  );
}

/* Article body. Content is trusted, theme-authored HTML. */
export function Sections({ sections }: { sections: Section[] }) {
  return (
    <>
      {sections.map((s) => (
        <section className="art-block" key={s.h2}>
          <h2 id={anchor(s.h2)}>{s.h2}</h2>
          <div dangerouslySetInnerHTML={{ __html: s.html }} />
        </section>
      ))}
    </>
  );
}

/* Visible FAQ list. Answers stay in the HTML at all times. */
export function Faqs({ faqs, heading = 'Frequently Asked Questions', hideHeading }: { faqs: Faq[]; heading?: string; hideHeading?: boolean }) {
  if (!faqs.length) return null;
  return (
    <section className="art-block art-faq" id="faq">
      <h2 className={hideHeading ? 'screen-reader-text' : undefined}>{heading}</h2>
      <FaqList faqs={faqs} />
    </section>
  );
}

export function Byline() {
  return (
    <div className="art-byline">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo-mark.png" alt="" width={46} height={46} />
      <div>
        <span className="ab-name">Written by <Link href="/about/" rel="author">Syed Mudassir Shah</Link></span>
        <span className="ab-role">SEO consultant, MrSEO.pk. Working on Pakistani search since 2010.</span>
      </div>
    </div>
  );
}

export function Article({ content, question }: { content?: LongContent; question: string }) {
  if (!content) return null;
  const sections = content.sections ?? [];
  const faqs = content.faqs ?? [];
  const toc = [...sections.map((s) => ({ id: anchor(s.h2), label: s.h2 })), ...(faqs.length ? [{ id: 'faq', label: 'Frequently asked questions' }] : [])];
  const hasToc = sections.length >= 3;

  return (
    <div className={'article-layout' + (hasToc ? ' has-toc' : '')}>
      {hasToc && <Toc items={toc} />}
      <div className="mrseo-article">
        <Byline />
        <AnswerBox question={question} answer={content.quick} />
        <Sections sections={sections} />
        <Faqs faqs={faqs} />
      </div>
    </div>
  );
}
