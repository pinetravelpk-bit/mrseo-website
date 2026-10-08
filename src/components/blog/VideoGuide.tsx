'use client';
import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play, RotateCcw } from 'lucide-react';

const STEP_MS = 6000;

/* Video-style walkthrough: an animated, auto-playing step player with a
   progress bar, plus a full transcript in the HTML for search and screen readers. */
export default function VideoGuide({ title, steps }: { title: string; steps: { title: string; text: string }[] }) {
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const done = i === steps.length - 1 && !playing && started;

  // Start playing when the player scrolls into view (unless the reader prefers reduced motion).
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started) { setPlaying(true); setStarted(true); }
    }, { threshold: 0.6 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [started]);

  useEffect(() => {
    if (!playing) return;
    const t = setTimeout(() => {
      if (i < steps.length - 1) setI(i + 1);
      else setPlaying(false);
    }, STEP_MS);
    return () => clearTimeout(t);
  }, [i, playing, steps.length]);

  const jump = (n: number) => { setI(Math.max(0, Math.min(steps.length - 1, n))); setStarted(true); };
  const s = steps[i];

  return (
    <figure className="bk-video" ref={ref}>
      <figcaption className="bk-head"><Play size={16} aria-hidden="true" /> Video guide: {title}<span className="bk-count">Step {i + 1} of {steps.length}</span></figcaption>
      <div className="vg-screen">
        <div className="vg-bars" aria-hidden="true">
          {steps.map((_, n) => (
            <span key={n} className="vg-bar">
              <span className={'vg-fill' + (n < i ? ' full' : n === i && playing ? ' run' : n === i ? ' half' : '')} style={n === i && playing ? { animationDuration: `${STEP_MS}ms` } : undefined} />
            </span>
          ))}
        </div>
        <div className="vg-frame" key={i} aria-live="polite">
          <span className="vg-step">Step {i + 1}</span>
          <h4 className="vg-title">{s.title}</h4>
          <p className="vg-text">{s.text}</p>
        </div>
        <div className="vg-controls">
          <button type="button" className="sl-btn" onClick={() => jump(i - 1)} disabled={i === 0} aria-label="Previous step"><ChevronLeft size={20} /></button>
          <button
            type="button" className="vg-play"
            onClick={() => { if (done) { setI(0); setPlaying(true); } else { setPlaying((p) => !p); setStarted(true); } }}
            aria-label={done ? 'Replay' : playing ? 'Pause' : 'Play'}
          >
            {done ? <RotateCcw size={20} /> : playing ? <Pause size={20} /> : <Play size={20} />}
          </button>
          <button type="button" className="sl-btn" onClick={() => jump(i + 1)} disabled={i === steps.length - 1} aria-label="Next step"><ChevronRight size={20} /></button>
        </div>
      </div>
      <details className="vg-transcript">
        <summary>Read the full transcript</summary>
        <ol>{steps.map((st) => <li key={st.title}><strong>{st.title}.</strong> {st.text}</li>)}</ol>
      </details>
    </figure>
  );
}
