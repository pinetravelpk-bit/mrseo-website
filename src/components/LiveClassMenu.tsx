'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { CalendarClock, Chrome, KeyRound, Mic, Radio, X } from 'lucide-react';

/* "Join Live Class" in the menu: opens a window listing the upcoming online classes,
   with the time, a countdown and the join link. Data loads only when it is opened. */

type LiveClass = { title: string; course: string | null; courseSlug: string | null; startsAt: string; durationMins: number; url: string; live: boolean };
const OPEN_EVENT = 'mrseo:open-live-class';

const pk = (iso: string | number, o: Intl.DateTimeFormatOptions) => new Date(iso).toLocaleString('en-GB', { timeZone: 'Asia/Karachi', ...o });
const time = (ms: number) => pk(ms, { hour: 'numeric', minute: '2-digit', hour12: true }).toUpperCase();

function countdown(start: number, now: number) {
  let s = Math.max(0, Math.round((start - now) / 60_000));
  const d = Math.floor(s / 1440); s -= d * 1440;
  const h = Math.floor(s / 60); const m = s - h * 60;
  if (d > 0) return `Starts in ${d} day${d > 1 ? 's' : ''}${h ? ` ${h} hr${h > 1 ? 's' : ''}` : ''}`;
  if (h > 0) return `Starts in ${h} hr${h > 1 ? 's' : ''}${m ? ` ${m} min` : ''}`;
  return `Starts in ${m} min`;
}

/** Opens the live class window from anywhere (used by the mobile menu). */
export function LiveClassLink({ className, children }: { className?: string; children: React.ReactNode }) {
  return <button type="button" className={className} onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}>{children}</button>;
}

function Illustration() {
  return (
    <svg className="lc-art" viewBox="0 0 220 150" aria-hidden="true">
      <defs>
        <linearGradient id="lcScreen" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#173055" /><stop offset="1" stopColor="#0d1a2e" /></linearGradient>
        <linearGradient id="lcGreen" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#5ad65a" /><stop offset="1" stopColor="#2fa82f" /></linearGradient>
      </defs>
      <circle cx="110" cy="72" r="66" fill="rgba(61,196,61,.08)" />
      <rect x="40" y="28" width="140" height="88" rx="10" fill="url(#lcScreen)" stroke="rgba(160,190,235,.35)" />
      <rect x="50" y="38" width="80" height="8" rx="4" fill="rgba(91,155,255,.55)" />
      <rect x="50" y="52" width="60" height="6" rx="3" fill="rgba(160,190,235,.35)" />
      <rect x="50" y="64" width="70" height="6" rx="3" fill="rgba(160,190,235,.25)" />
      <polyline points="52,104 72,90 88,96 108,78 124,84" fill="none" stroke="#5ad65a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="152" cy="80" r="17" fill="url(#lcGreen)" />
      <path d="M147 72 L160 80 L147 88 Z" fill="#06140a" />
      <rect x="96" y="116" width="28" height="10" fill="#132640" />
      <rect x="80" y="126" width="60" height="5" rx="2.5" fill="#1b3354" />
      <g className="lc-waves" fill="none" stroke="#ef5a5a" strokeWidth="2.5" strokeLinecap="round">
        <path d="M178 22 a10 10 0 0 1 0 14" /><path d="M184 16 a18 18 0 0 1 0 26" />
      </g>
      <circle cx="172" cy="29" r="4.5" fill="#ef5a5a" />
    </svg>
  );
}

export default function LiveClassMenu({ wa }: { wa: string }) {
  const dlg = useRef<HTMLDialogElement>(null);
  const [classes, setClasses] = useState<LiveClass[] | null>(null);
  const [error, setError] = useState(false);
  const [now, setNow] = useState(() => Date.now());

  const load = useCallback(() => {
    setError(false);
    fetch('/api/classes-upcoming/')
      .then((r) => r.json())
      .then((d: { classes: LiveClass[] }) => setClasses(d.classes))
      .catch(() => setError(true));
  }, []);

  const open = useCallback(() => {
    setNow(Date.now());
    load();
    dlg.current?.showModal();
    document.body.style.overflow = 'hidden';
  }, [load]);

  useEffect(() => {
    window.addEventListener(OPEN_EVENT, open);
    return () => window.removeEventListener(OPEN_EVENT, open);
  }, [open]);

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 30_000);
    return () => clearInterval(t);
  }, []);

  const close = () => dlg.current?.close();
  const waText = encodeURIComponent('Hi, when is the next live online class?');

  return (
    <>
      <button type="button" className="btn btn-sm lc-btn" onClick={open} aria-haspopup="dialog">
        <span className="lc-dot" aria-hidden="true" /> <span className="lc-btn-long">Join Live Class</span><span className="lc-btn-short">Live Class</span>
      </button>

      <dialog
        ref={dlg}
        className="lc-dialog"
        aria-labelledby="lc-title"
        onClose={() => { document.body.style.overflow = ''; }}
        onClick={(e) => { if (e.target === e.currentTarget) close(); }}
      >
        <div className="lc-panel">
          <button type="button" className="lc-close" onClick={close} aria-label="Close"><X size={20} /></button>

          <div className="lc-head">
            <Illustration />
            <div>
              <div className="eyebrow"><Radio size={14} aria-hidden="true" /> MrSEO Classroom</div>
              <h2 id="lc-title">Live online classes</h2>
              <p>Learn live with Syed Mudassir Shah, right here on MrSEO.pk. Hear the teacher, watch the screen and ask questions in chat. Nothing to install.</p>
            </div>
          </div>

          <div className="lc-body">
            {error ? (
              <div className="lc-empty"><p>Could not load the class schedule. Please check your internet and try again.</p><button type="button" className="btn btn-o btn-sm" onClick={load}>Try again</button></div>
            ) : classes === null ? (
              <div className="lc-loading" role="status">
                <span className="lc-skel" /><span className="lc-skel" />
                <span className="sr-only">Loading the class schedule</span>
              </div>
            ) : classes.length === 0 ? (
              <div className="lc-empty">
                <CalendarClock size={36} aria-hidden="true" />
                <h3>No live class is scheduled right now</h3>
                <p>New online batches are announced on WhatsApp. Message us and we will send you the next class time and your access code.</p>
                <div className="lc-actions">
                  <a href={`https://wa.me/${wa}?text=${waText}`} className="btn btn-wa btn-sm" target="_blank" rel="noopener">Ask on WhatsApp</a>
                  <a href="/courses/" className="btn btn-o btn-sm">See all courses</a>
                </div>
              </div>
            ) : (
              <ul className="lc-list">
                {classes.map((c) => {
                  const start = new Date(c.startsAt).getTime();
                  const end = start + c.durationMins * 60_000;
                  const live = now >= start - 30 * 60_000 && now < end;
                  const started = now >= start;
                  return (
                    <li key={c.url} className={`lc-card${live ? ' is-live' : ''}`}>
                      <div className="lc-date" aria-hidden="true">
                        <span>{pk(start, { weekday: 'short' })}</span>
                        <strong>{pk(start, { day: 'numeric' })}</strong>
                        <span>{pk(start, { month: 'short' })}</span>
                      </div>
                      <div className="lc-info">
                        <div className="lc-tags">
                          {live ? <span className="lc-live">● {started ? 'Live now' : 'Opening now'}</span> : <span className="lc-soon">{countdown(start, now)}</span>}
                          {c.course ? <span className="lc-course">{c.course}</span> : null}
                        </div>
                        <h3>{c.title}</h3>
                        <p className="lc-when">
                          {pk(start, { weekday: 'long', day: 'numeric', month: 'long' })}, {time(start)} to {time(end)} <span>Pakistan time</span>
                        </p>
                        {!live ? (
                          <p className="lc-note">The next {c.course ? `${c.course} ` : ''}class is at <b>{time(start)}</b>. Please join at that time. Joining opens 30 minutes before the class.</p>
                        ) : null}
                      </div>
                      <a href={c.url} className={`btn btn-sm ${live ? 'btn-g btn-live' : 'btn-o'}`}>
                        {live ? 'Join now' : 'Class details'}
                      </a>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          <ul className="lc-tips">
            <li><Chrome size={18} aria-hidden="true" /> Use Chrome on a laptop or phone</li>
            <li><KeyRound size={18} aria-hidden="true" /> Keep the access code from WhatsApp ready</li>
            <li><Mic size={18} aria-hidden="true" /> Allow your microphone when asked</li>
          </ul>
        </div>
      </dialog>
    </>
  );
}
