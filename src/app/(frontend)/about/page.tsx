import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, Mail, MapPin } from 'lucide-react';
import { Breadcrumb, CtaPanel, IndustryGrid, SectionHead, StatStrip } from '@/components/Cards';
import { Sections } from '@/components/Article';
import Hl from '@/components/Hl';
import { WhatsAppIcon } from '@/components/Icon';
import { waLink } from '@/lib/site';
import { getGlobal, getSite, richHtml } from '@/lib/cms';
import { DEFAULT_DESC, pageMeta } from '@/lib/meta';
import { breadcrumbSchema, JsonLd } from '@/lib/schema';

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function generateMetadata(): Promise<Metadata> {
  const a = await getGlobal('about');
  return pageMeta(a.metaTitle || 'About | MrSEO.pk', a.metaDescription || DEFAULT_DESC, '/about/');
}

export default async function About() {
  const [a, { settings: s }] = await Promise.all([getGlobal('about'), getSite()]);
  const tones = ['g', 'b'] as const;
  const sections = (a.sections ?? []).map((x: any) => ({ h2: x.heading, html: richHtml(x.content) }));

  return (
    <main id="main-content">
      <JsonLd items={[breadcrumbSchema([[`About ${s.ownerName}`, '/about/']])]} />

      <div className="page-hero">
        <div className="container">
          <Breadcrumb items={[['About']]} />
          <div className="about-grid">
            <div>
              <div className="eyebrow">{a.eyebrow}</div>
              <h1 className="about-h1"><Hl text={a.title} /></h1>
              <div className="about-lead-wrap" dangerouslySetInnerHTML={{ __html: richHtml(a.lead).replace(/<p>/g, '<p class="about-lead">') }} />
              <div className="loc-acts" style={{ marginTop: 28, marginBottom: 0 }}>
                <Link href="/contact/" className="btn btn-g">Start a conversation <ArrowRight size={18} /></Link>
                <a href={waLink(s.whatsapp, `Hi ${s.ownerName.split(' ')[0]}, I would like to discuss my site.`)} className="btn btn-o" target="_blank" rel="noopener"><WhatsAppIcon /> WhatsApp</a>
              </div>
            </div>

            <div className="about-card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo-mark.png" alt={s.ownerName} width={112} height={112} className="about-av" />
              <div className="about-av-name">{s.ownerName}</div>
              <div className="about-av-role">{a.cardRole}</div>
              <div className="pc-loc"><MapPin size={15} aria-hidden="true" /> {a.cardLocation}</div>
              {a.cardSkills && <p style={{ fontSize: 15, marginTop: 10 }}>{a.cardSkills}</p>}
              <StatStrip stats={(a.stats ?? []).map((x: any, i: number) => [x.value, x.label, tones[i % 2]])} />
              <div className="about-contacts">
                <a href={`mailto:${s.email}`} style={{ display: 'inline-flex', gap: 8, justifyContent: 'center', alignItems: 'center' }}><Mail size={16} /> {s.email}</a>
                <a href={waLink(s.whatsapp)} target="_blank" rel="noopener" style={{ display: 'inline-flex', gap: 8, justifyContent: 'center', alignItems: 'center', color: 'var(--wa)' }}><WhatsAppIcon size={16} /> {s.phone}</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container container-narrow">
          <div className="mrseo-article">
            {a.answer && (
              <div className="answer-box">
                <p className="answer-label">In short</p>
                <p className="answer-text">{a.answer}</p>
              </div>
            )}
            <Sections sections={sections} />
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <SectionHead eyebrow={a.industriesHead?.eyebrow} title={a.industriesHead?.title ?? ''} />
          <IndustryGrid />
        </div>
      </section>

      <CtaPanel title={a.cta?.title ?? ''} text={a.cta?.text} note={a.cta?.note}>
        <Link href="/contact/" className="btn btn-g btn-lg">Request the free audit</Link>
      </CtaPanel>
    </main>
  );
}
