'use client';
import { useEffect, useState, type FormEvent } from 'react';
import { FormMessage } from './ContactForm';
import ClassRoom, { type RoomPass } from './ClassRoom';
import ClassRecording from './ClassRecording';

/* Student join form: name, phone and access code, then the class opens inside the site. */
export default function ClassJoin({ slug, title, startsAt, durationMins, hasRecording = false }: { slug: string; title: string; startsAt: string; durationMins: number; hasRecording?: boolean }) {
  const [busy, setBusy] = useState(false);
  const [pass, setPass] = useState<RoomPass | null>(null);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [saved, setSaved] = useState({ name: '', phone: '' });

  useEffect(() => {
    try { setSaved(JSON.parse(localStorage.getItem('mrseo-student') || '{}')); } catch { /* storage unavailable */ }
  }, []);

  const opensAt = new Date(startsAt).getTime() - 30 * 60_000;
  const endsAt = new Date(startsAt).getTime() + (durationMins + 60) * 60_000;
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => { setNow(Date.now()); const t = setInterval(() => setNow(Date.now()), 30_000); return () => clearInterval(t); }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) { form.reportValidity(); return; }
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    setBusy(true);
    setMsg(null);
    try {
      const res = await fetch('/api/class-join/', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...data, slug }) });
      const json = (await res.json()) as { success: boolean; data: string; room?: RoomPass };
      if (json.success && json.room) {
        try { localStorage.setItem('mrseo-student', JSON.stringify({ name: data.name, phone: data.phone })); } catch { /* ignore */ }
        setMsg(null);
        setBusy(false);
        setPass(json.room);
        return;
      }
      setMsg({ ok: false, text: json.data });
    } catch {
      setMsg({ ok: false, text: 'Network error. Please check your internet and try again.' });
    }
    setBusy(false);
  }

  if (pass) return <ClassRoom pass={pass} title={title} onLeave={() => setPass(null)} />;
  if (now !== null && now > endsAt && hasRecording) return <ClassRecording slug={slug} />;
  if (now !== null && now > endsAt) return <p className="cf-msg error" role="status">This class has ended. Please ask on WhatsApp for the recording or the next class link.</p>;
  const early = now !== null && now < opensAt;

  return (
    <form noValidate onSubmit={onSubmit} key={saved.name}>
      <div className="cf-grid">
        <div className="cf-group">
          <label className="cf-label" htmlFor="name">Your name <span className="req">*</span></label>
          <input className="cf-input" id="name" name="name" required maxLength={80} autoComplete="name" defaultValue={saved.name} />
        </div>
        <div className="cf-group">
          <label className="cf-label" htmlFor="phone">WhatsApp number <span className="req">*</span></label>
          <input className="cf-input" id="phone" name="phone" type="tel" inputMode="tel" required maxLength={30} autoComplete="tel" defaultValue={saved.phone} />
        </div>
        <div className="cf-group cf-full">
          <label className="cf-label" htmlFor="code">Access code <span className="req">*</span></label>
          <input className="cf-input" id="code" name="code" required inputMode="numeric" maxLength={20} autoComplete="off" placeholder="The code sent with your class link" />
        </div>
      </div>
      <button type="submit" className="btn btn-g btn-lg btn-block" disabled={busy || early}>
        {early ? 'Joining opens 30 minutes before class' : busy ? 'Checking…' : 'Join the class'}
      </button>
      <FormMessage msg={msg} id="class-msg" />
      <p className="cf-note">
        The class opens right here on MrSEO.pk, with nothing to install: you will hear the teacher, see their screen and can chat. Use Chrome on a laptop or phone for the best experience.
        Allow the microphone when asked, and keep it muted unless you are speaking.
      </p>
    </form>
  );
}
