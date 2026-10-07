import { NextResponse } from 'next/server';
import { clean, cleanText, clientIp, isEmail, sendMail } from '@/lib/mail';
import { WA } from '@/lib/site';

const reply = (success: boolean, data: string) => NextResponse.json({ success, data });

export async function POST(req: Request) {
  let b: Record<string, unknown>;
  try { b = await req.json(); } catch { return reply(false, 'Security check failed. Please refresh the page and try again.'); }

  if (clean(b.cf_hp)) return reply(false, 'Spam detected.');

  const name = clean(b.cf_name, 120);
  const email = clean(b.cf_email, 200);
  const phone = clean(b.cf_phone, 60);
  const city = clean(b.cf_city, 60);
  const service = clean(b.cf_service, 80);
  const website = clean(b.cf_website, 300);
  const message = cleanText(b.cf_message);

  if (!name || !email || !message) return reply(false, 'Please fill in your name, email and message.');
  if (!isEmail(email)) return reply(false, 'That email address does not look right. Please check it.');

  const subject = `New enquiry from ${name} via MrSEO.pk`;
  const body = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nCity: ${city}\nService: ${service}\nWebsite: ${website}\n\nMessage:\n${message}\n\n---\nSubmitted from the MrSEO.pk contact form\nIP: ${clientIp(req)}`;

  if (await sendMail(subject, body, `${name} <${email}>`)) {
    return reply(true, 'Thanks, your message is through. Syed will get back to you within a couple of hours.');
  }
  return reply(false, `The message could not be sent. Please WhatsApp us on +${WA} instead.`);
}
