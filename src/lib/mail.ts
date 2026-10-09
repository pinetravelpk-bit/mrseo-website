import nodemailer from 'nodemailer';
import { cms, getSite } from './cms';

export type FormResult = { success: boolean; data: string };

const clean = (v: unknown, max = 500) => String(v ?? '').replace(/[\r\n]+/g, ' ').trim().slice(0, max);
const cleanText = (v: unknown, max = 5000) => String(v ?? '').trim().slice(0, max);
export { clean, cleanText };

export const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);

export function clientIp(req: Request) {
  return clean(req.headers.get('x-forwarded-for')?.split(',')[0] || req.headers.get('x-real-ip') || 'unknown', 64);
}

/** Sends a plain-text email to the site owner. Requires SMTP_* env vars. */
export async function sendMail(to: string, subject: string, text: string, replyTo: string): Promise<boolean> {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, MAIL_TO } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.error('Form mail not sent: SMTP_HOST, SMTP_USER and SMTP_PASS must be set.');
    return false;
  }
  const port = Number(SMTP_PORT || 465);
  const transport = nodemailer.createTransport({ host: SMTP_HOST, port, secure: port === 465, auth: { user: SMTP_USER, pass: SMTP_PASS } });
  try {
    await transport.sendMail({ from: `MrSEO.pk <${SMTP_USER}>`, to: MAIL_TO || to, replyTo, subject, text });
    return true;
  } catch (err) {
    console.error('Form mail failed:', err);
    return false;
  }
}

type Query = { kind: 'contact' | 'enroll'; name: string; email: string } & Record<string, string>;

/** Saves a form submission to Queries in the admin, then emails it. Succeeds if either works. */
export async function saveQuery(req: Request, q: Query, subject: string, body: string) {
  const { settings } = await getSite();
  let saved = false;
  let id: number | string | undefined;
  try {
    const payload = await cms();
    const doc = await payload.create({
      collection: 'queries',
      data: { ...q, status: 'new', ip: clientIp(req), page: clean(req.headers.get('referer'), 300) },
    });
    id = doc.id;
    saved = true;
  } catch (err) {
    console.error('Query not saved:', err);
  }

  const emailed = await sendMail(settings.email, subject, body, `${q.name} <${q.email}>`);
  if (saved && emailed && id !== undefined) {
    try {
      await (await cms()).update({ collection: 'queries', id, data: { emailed: true } });
    } catch { /* the query itself is saved */ }
  }
  return { ok: saved || emailed, wa: settings.whatsapp };
}
