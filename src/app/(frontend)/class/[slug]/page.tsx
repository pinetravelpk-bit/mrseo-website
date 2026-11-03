import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CalendarDays, Clock, Video } from 'lucide-react';
import ClassJoin from '@/components/ClassJoin';
import { cms } from '@/lib/cms';

/* Private join page for one online class. Not indexed; the link is sent to students. */

type Props = { params: Promise<{ slug: string }> };

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Join online class | MrSEO.pk', robots: { index: false, follow: false } };

const fmt = (iso: string, opts: Intl.DateTimeFormatOptions) => new Date(iso).toLocaleString('en-GB', { timeZone: 'Asia/Karachi', ...opts });

export default async function ClassPage({ params }: Props) {
  const { slug } = await params;
  const payload = await cms();
  const res = await payload.find({ collection: 'online-classes', where: { slug: { equals: slug } }, limit: 1, depth: 1, overrideAccess: true });
  const c = res.docs[0];
  if (!c) notFound();

  const startsAt = c.startsAt as string;
  const course = c.course && typeof c.course === 'object' ? (c.course as { name?: string }).name : undefined;
  const mins = (c.durationMins as number) || 120;

  return (
    <main id="main-content">
      <section className="section" style={{ paddingTop: 120 }}>
        <div className="container container-narrow">
          <div className="cf-box">
            <div className="eyebrow"><Video size={15} aria-hidden="true" /> Online class{course ? ` · ${course}` : ''}</div>
            <h1 className="cf-title" style={{ fontSize: 'clamp(26px, 3.4vw, 36px)' }}>{c.title as string}</h1>
            <p className="post-facts" style={{ display: 'flex', gap: 18, flexWrap: 'wrap', margin: '10px 0 18px' }}>
              <span><CalendarDays size={15} aria-hidden="true" /> {fmt(startsAt, { weekday: 'long', day: 'numeric', month: 'long' })}</span>
              <span><Clock size={15} aria-hidden="true" /> {fmt(startsAt, { hour: 'numeric', minute: '2-digit' })} Pakistan time · {mins} minutes</span>
            </p>
            {c.notes ? <p className="cf-sub" style={{ whiteSpace: 'pre-line' }}>{c.notes as string}</p> : null}
            {c.status === 'cancelled' ? (
              <p className="cf-msg error" role="status">This class has been cancelled. Please check WhatsApp for the new time.</p>
            ) : (
              <ClassJoin slug={slug} title={c.title as string} startsAt={startsAt} durationMins={mins} />
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
