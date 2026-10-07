import { NextResponse } from 'next/server';
import { clean, cleanText, clientIp, isEmail, sendMail } from '@/lib/mail';
import { WA } from '@/lib/site';

const reply = (success: boolean, data: string) => NextResponse.json({ success, data });

export async function POST(req: Request) {
  let b: Record<string, unknown>;
  try { b = await req.json(); } catch { return reply(false, 'Security check failed. Please refresh the page and try again.'); }

  if (clean(b.en_hp)) return reply(false, 'Spam detected.');

  const name = clean(b.en_name, 120);
  const email = clean(b.en_email, 200);
  const phone = clean(b.en_phone, 60);
  const city = clean(b.en_city, 60);
  const course = clean(b.en_course, 120);
  const mode = clean(b.en_mode, 60);
  const edu = clean(b.en_edu, 300);
  const message = cleanText(b.en_message);

  if (!name || !email || !phone || !course) return reply(false, 'Please fill in your name, email, phone number and the course you want.');
  if (!isEmail(email)) return reply(false, 'That email address does not look right. Please check it.');

  const subject = `Course application: ${course} from ${name}`;
  const body = `COURSE APPLICATION\n\nCourse: ${course}\nPreferred mode: ${mode}\n\nName: ${name}\nEmail: ${email}\nPhone/WhatsApp: ${phone}\nCity: ${city}\nEducation or background: ${edu}\n\nWhy they want to join:\n${message}\n\n---\nSubmitted from the MrSEO.pk course page\nIP: ${clientIp(req)}`;

  if (await sendMail(subject, body, `${name} <${email}>`)) {
    return reply(true, 'Application received. We will WhatsApp you about the next batch, usually within a day.');
  }
  return reply(false, `The application could not be sent. Please WhatsApp us on +${WA} instead.`);
}
