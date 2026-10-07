'use client';
import { useState, type FormEvent } from 'react';
import { CircleCheck, TriangleAlert } from 'lucide-react';
import { cities, EMAIL, PHONE, services, waLink, WA } from '@/lib/site';
import Icon, { WhatsAppIcon } from './Icon';

export async function submitForm(url: string, form: HTMLFormElement) {
  const body = Object.fromEntries(new FormData(form).entries());
  try {
    const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    return (await res.json()) as { success: boolean; data: string };
  } catch {
    return { success: false, data: `Network error. Please WhatsApp us on +${WA} instead.` };
  }
}

export function FormMessage({ msg, id }: { msg: { ok: boolean; text: string } | null; id: string }) {
  return (
    <div id={id} className={'cf-msg' + (msg ? (msg.ok ? ' success' : ' error') : '')} role="status" aria-live="polite">
      {msg && (msg.ok ? <CircleCheck size={20} aria-hidden="true" style={{ flexShrink: 0 }} /> : <TriangleAlert size={20} aria-hidden="true" style={{ flexShrink: 0 }} />)}
      <span>{msg?.text}</span>
    </div>
  );
}

export function useFormSubmit(url: string) {
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) { form.reportValidity(); return; }
    setBusy(true);
    setMsg(null);
    const json = await submitForm(url, form);
    setMsg({ ok: json.success, text: json.data });
    if (json.success) form.reset();
    setBusy(false);
  }
  return { busy, msg, onSubmit };
}

export default function ContactForm() {
  const { busy, msg, onSubmit } = useFormSubmit('/api/contact');

  return (
    <div className="contact-wrap">
      <div className="cf-box">
        <h2 className="cf-title">Request your <span className="g">free SEO audit</span></h2>
        <p className="cf-sub">Send the details below and you will get a written review of your site back within 24 hours.</p>

        <form id="mrseo-contact-form" noValidate onSubmit={onSubmit}>
          <div className="cf-grid">
            <div className="cf-group">
              <label className="cf-label" htmlFor="cf_name">Your name <span className="req">*</span></label>
              <input className="cf-input" type="text" id="cf_name" name="cf_name" placeholder="Muhammad Ali" autoComplete="name" required />
            </div>
            <div className="cf-group">
              <label className="cf-label" htmlFor="cf_email">Email address <span className="req">*</span></label>
              <input className="cf-input" type="email" id="cf_email" name="cf_email" placeholder="you@company.com" autoComplete="email" required />
            </div>
            <div className="cf-group">
              <label className="cf-label" htmlFor="cf_phone">Phone or WhatsApp <span className="opt">(optional)</span></label>
              <input className="cf-input" type="tel" id="cf_phone" name="cf_phone" placeholder="+92 300 1234567" autoComplete="tel" inputMode="tel" />
            </div>
            <div className="cf-group">
              <label className="cf-label" htmlFor="cf_website">Your website <span className="opt">(optional)</span></label>
              <input className="cf-input" type="url" id="cf_website" name="cf_website" placeholder="https://yourwebsite.com" autoComplete="url" inputMode="url" />
            </div>
            <div className="cf-group">
              <label className="cf-label" htmlFor="cf_city">Your city</label>
              <select className="cf-select" id="cf_city" name="cf_city" defaultValue="">
                <option value="">Select a city</option>
                {Object.values(cities).map((c) => <option key={c.name} value={c.name}>{c.name}</option>)}
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="cf-group">
              <label className="cf-label" htmlFor="cf_service">What do you need help with</label>
              <select className="cf-select" id="cf_service" name="cf_service" defaultValue="">
                <option value="">Select a service</option>
                {Object.values(services).map((s) => <option key={s.name} value={s.name}>{s.name}</option>)}
                <option value="Full Digital Marketing">Not sure yet</option>
                <option value="Course enquiry">Course enquiry (student)</option>
              </select>
            </div>
            <div className="cf-group cf-full">
              <label className="cf-label" htmlFor="cf_message">What are you trying to achieve <span className="req">*</span></label>
              <textarea className="cf-textarea" id="cf_message" name="cf_message" placeholder="For example: we want to rank for dental keywords in Karachi, we get around 300 visitors a month, and we want more appointment calls." required></textarea>
            </div>
          </div>

          {/* Honeypot spam protection */}
          <input type="text" name="cf_hp" className="hp" tabIndex={-1} autoComplete="off" aria-hidden="true" />

          <button type="submit" className="btn btn-g btn-lg btn-block" disabled={busy}>
            {busy ? 'Sending…' : 'Send and request the audit'}
          </button>
          <FormMessage msg={msg} id="cf-message" />
          <p className="cf-note">Your details are only used to reply to this enquiry. Replies usually go out within two hours during working hours.</p>
        </form>
      </div>

      <div className="side-stack">
        <div className="owner-mini">
          <div className="pc-top">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-mark.png" alt="" width={54} height={54} className="pc-av" />
            <div>
              <div className="pc-name">Syed Mudassir Shah</div>
              <div className="pc-role">SEO consultant and founder</div>
            </div>
          </div>
          <p>SEO consultant working on Pakistani search since 2010. Islamabad based, working with businesses nationwide.</p>
          <div className="mini-stats">
            <div><b>14+</b><span>Years</span></div>
            <div><b>50+</b><span>Websites</span></div>
            <div><b>400+</b><span>Clients</span></div>
          </div>
        </div>

        <div className="side-card">
          <span className="ico-badge"><WhatsAppIcon /></span>
          <div>
            <div className="side-t">WhatsApp, fastest</div>
            <div className="side-v"><a href={waLink('Hi, I would like a free SEO audit.')} target="_blank" rel="noopener">{PHONE}</a><small>Usually replies within an hour</small></div>
          </div>
        </div>
        <div className="side-card">
          <span className="ico-badge blue"><Icon name="mail" /></span>
          <div>
            <div className="side-t">Email</div>
            <div className="side-v"><a href={`mailto:${EMAIL}`}>{EMAIL}</a><small>Usually replies the same day</small></div>
          </div>
        </div>
        <div className="side-card">
          <span className="ico-badge blue"><Icon name="pin" /></span>
          <div>
            <div className="side-t">Working across Pakistan</div>
            <div className="side-p">{Object.values(cities).map((c) => c.name).join(', ')}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
