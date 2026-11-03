import { NextResponse } from 'next/server';
import { cms } from '@/lib/cms';
import { clean, clientIp } from '@/lib/mail';
import { CLASSROOM_DOMAIN, classToken, classroomReady, noteFailedAttempt, tooManyAttempts } from '@/lib/classroom';

/* Checks a student's access code, records attendance and returns a classroom pass. */

type Reply = { success: boolean; data: string; room?: { domain: string; name: string; token: string; displayName: string } };
const reply = (r: Reply) => NextResponse.json(r);
const fail = (data: string) => reply({ success: false, data });

export async function POST(req: Request) {
  let b: Record<string, unknown>;
  try { b = await req.json(); } catch { return fail('Please refresh the page and try again.'); }

  const ip = clientIp(req);
  if (tooManyAttempts(ip)) return fail('Too many attempts. Please wait 15 minutes, or ask on WhatsApp for help.');

  const slug = clean(b.slug, 40), name = clean(b.name, 80), phone = clean(b.phone, 30), code = clean(b.code, 20).replace(/\s/g, '');
  if (!name || !phone || !code) return fail('Please enter your name, WhatsApp number and the access code.');
  if (!classroomReady()) return fail('The classroom is not available right now. Please contact us on WhatsApp.');

  const payload = await cms();
  const res = await payload.find({ collection: 'online-classes', where: { slug: { equals: slug } }, limit: 1, depth: 0, overrideAccess: true });
  const c = res.docs[0];
  if (!c || c.status === 'cancelled') return fail('This class link is not active. Please check WhatsApp for the latest link.');
  if (String(c.accessCode ?? '').trim() !== code) {
    noteFailedAttempt(ip);
    return fail('That access code is not correct. Please check the message you received.');
  }

  const start = new Date(c.startsAt as string).getTime();
  const mins = (c.durationMins as number) || 120;
  const closes = start + (mins + 60) * 60_000;
  const now = Date.now();
  if (now < start - 30 * 60_000) return fail('Joining opens 30 minutes before the class starts.');
  if (now > closes) return fail('This class has ended.');

  let attendanceId: string | undefined;
  try {
    const a = await payload.create({ collection: 'class-attendance', data: { onlineClass: c.id, name, phone, ip }, overrideAccess: true });
    attendanceId = `student-${a.id}`;
  } catch (err) {
    console.error('Attendance not saved:', err);
  }

  const room = String(c.room);
  const token = classToken({ name, id: attendanceId, teacher: false, room, expiresAt: closes });
  return reply({ success: true, data: 'Opening the class…', room: { domain: CLASSROOM_DOMAIN, name: room, token, displayName: name } });
}
