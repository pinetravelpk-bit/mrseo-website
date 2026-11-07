'use client';
import { useState, type FormEvent } from 'react';
import { ExternalLink, PlayCircle } from 'lucide-react';
import { FormMessage } from './ContactForm';

/* After a class: students enter the access code to watch the recording. */
export default function ClassRecording({ slug }: { slug: string }) {
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [rec, setRec] = useState<{ url: string; embed: string | null } | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const code = String(new FormData(e.currentTarget).get('code') || '');
    setBusy(true);
    setMsg(null);
    try {
      const r = await fetch('/api/class-recording/', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ slug, code }) });
      const j = (await r.json()) as { success: boolean; data: string; url?: string; embed?: string | null };
      if (j.success && j.url) setRec({ url: j.url, embed: j.embed ?? null });
      else setMsg({ ok: false, text: j.data });
    } catch {
      setMsg({ ok: false, text: 'Network error. Please check your internet and try again.' });
    }
    setBusy(false);
  }

  if (rec) {
    return (
      <div className="rec-box">
        {rec.embed ? (
          <div className="rec-player">
            <iframe src={rec.embed} title="Class recording" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen />
          </div>
        ) : null}
        <a href={rec.url} target="_blank" rel="noopener" className={`btn ${rec.embed ? 'btn-o' : 'btn-g'} btn-block`}>
          <ExternalLink size={18} aria-hidden="true" /> {rec.embed ? 'Open in a new tab' : 'Watch the recording'}
        </a>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} className="rec-box">
      <div className="rec-head"><PlayCircle size={22} aria-hidden="true" /> <strong>Watch the class recording</strong></div>
      <div className="cf-group">
        <label className="cf-label" htmlFor="rec-code">Access code <span className="req">*</span></label>
        <input className="cf-input" id="rec-code" name="code" required inputMode="numeric" maxLength={20} autoComplete="off" placeholder="The code sent with your class link" />
      </div>
      <button type="submit" className="btn btn-g btn-lg btn-block" disabled={busy}>{busy ? 'Checking…' : 'Show the recording'}</button>
      <FormMessage msg={msg} id="rec-msg" />
    </form>
  );
}
