import { NextResponse } from 'next/server';
import { clean, cleanText, clientIp, isEmail, saveQuery } from '@/lib/mail';

const reply = (success: boolean, data: string) => NextResponse.json({ success, data });

export async function POST(req: Request) {
  let b: Record<string, unknown>;
  try { b = await req.json(); } catch { return reply(false, 'Security check failed. Please refresh the page and try again.'); }

  if (clean(b.cf_hp)) return reply(false, 'Spam detected.');

  const q = {
    name: clean(b.cf_name, 120),
    email: clean(b.cf_email, 200),
    phone: clean(b.cf_phone, 60),
    city: clean(b.cf_city, 60),
    service: clean(b.cf_service, 80),
    website: clean(b.cf_website, 300),
    message: cleanText(b.cf_message),
  };

  if (!q.name || !q.email || !q.message) return reply(false, 'Please fill in your name, email and message.');
  if (!isEmail(q.email)) return reply(false, 'That email address does not look right. Please check it.');

  const subject = `New enquiry from ${q.name} via MrSEO.pk`;
  const body = `Name: ${q.name}\nEmail: ${q.email}\nPhone: ${q.phone}\nCity: ${q.city}\nService: ${q.service}\nWebsite: ${q.website}\n\nMessage:\n${q.message}\n\n---\nSubmitted from the MrSEO.pk contact form\nIP: ${clientIp(req)}`;

  const res = await saveQuery(req, { kind: 'contact', ...q }, subject, body);
  if (res.ok) return reply(true, 'Thanks, your message is through. We will get back to you within a couple of hours.');
  return reply(false, `The message could not be sent. Please WhatsApp us on +${res.wa} instead.`);
}
