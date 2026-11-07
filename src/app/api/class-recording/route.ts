import { NextResponse } from 'next/server';
import { cms } from '@/lib/cms';
import { clean, clientIp } from '@/lib/mail';
import { noteFailedAttempt, tooManyAttempts } from '@/lib/classroom';

/* Gives the class recording link to students who have the class access code. */

const fail = (data: string) => NextResponse.json({ success: false, data });

/** Turns a YouTube or Google Drive link into an embeddable player URL, when possible. */
function embedUrl(url: string): string | null {
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\.|^m\./, '');
    let id = '';
    if (host === 'youtu.be') id = u.pathname.slice(1);
    else if (host === 'youtube.com') id = u.searchParams.get('v') || u.pathname.match(/^\/(?:live|embed|shorts)\/([\w-]+)/)?.[1] || '';
    if (/^[\w-]{6,}$/.test(id)) return `https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1`;
    const drive = host === 'drive.google.com' && u.pathname.match(/\/file\/d\/([\w-]+)/)?.[1];
    if (drive) return `https://drive.google.com/file/d/${drive}/preview`;
  } catch { /* not a URL */ }
  return null;
}

export async function POST(req: Request) {
  let b: Record<string, unknown>;
  try { b = await req.json(); } catch { return fail('Please refresh the page and try again.'); }

  const ip = clientIp(req);
  if (tooManyAttempts(ip)) return fail('Too many attempts. Please wait 15 minutes, or ask on WhatsApp for help.');

  const slug = clean(b.slug, 40), code = clean(b.code, 20).replace(/\s/g, '');
  if (!code) return fail('Please enter the access code for this class.');

  const payload = await cms();
  const c = (await payload.find({ collection: 'online-classes', where: { slug: { equals: slug } }, limit: 1, depth: 0, overrideAccess: true })).docs[0];
  if (!c) return fail('This class link is not active.');
  if (String(c.accessCode ?? '').trim() !== code) {
    noteFailedAttempt(ip);
    return fail('That access code is not correct. Please check the message you received.');
  }
  const url = String(c.recordingUrl ?? '').trim();
  if (!url) return fail('The recording is not ready yet. It is usually shared within a day of the class.');

  return NextResponse.json({ success: true, data: 'Recording ready', url, embed: embedUrl(url) });
}
