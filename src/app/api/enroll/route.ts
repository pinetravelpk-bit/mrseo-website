import { NextResponse } from 'next/server';
import { clean, cleanText, clientIp, isEmail, saveQuery } from '@/lib/mail';

const reply = (success: boolean, data: string) => NextResponse.json({ success, data });

export async function POST(req: Request) {
  let b: Record<string, unknown>;
  try { b = await req.json(); } catch { return reply(false, 'Security check failed. Please refresh the page and try again.'); }

  if (clean(b.en_hp)) return reply(false, 'Spam detected.');

  const q = {
    name: clean(b.en_name, 120),
    email: clean(b.en_email, 200),
    phone: clean(b.en_phone, 60),
    city: clean(b.en_city, 60),
    course: clean(b.en_course, 120),
    mode: clean(b.en_mode, 60),
    education: clean(b.en_edu, 300),
    message: cleanText(b.en_message),
  };

  if (!q.name || !q.email || !q.phone || !q.course) return reply(false, 'Please fill in your name, email, phone number and the course you want.');
  if (!isEmail(q.email)) return reply(false, 'That email address does not look right. Please check it.');

  const subject = `Course application: ${q.course} from ${q.name}`;
  const body = `COURSE APPLICATION\n\nCourse: ${q.course}\nPreferred mode: ${q.mode}\n\nName: ${q.name}\nEmail: ${q.email}\nPhone/WhatsApp: ${q.phone}\nCity: ${q.city}\nEducation or background: ${q.education}\n\nWhy they want to join:\n${q.message}\n\n---\nSubmitted from the MrSEO.pk course page\nIP: ${clientIp(req)}`;

  const res = await saveQuery(req, { kind: 'enroll', ...q }, subject, body);
  if (res.ok) return reply(true, 'Application received. We will WhatsApp you about the next batch, usually within a day.');
  return reply(false, `The application could not be sent. Please WhatsApp us on +${res.wa} instead.`);
}
