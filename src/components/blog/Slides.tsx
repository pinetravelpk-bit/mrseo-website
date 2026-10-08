'use client';
import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Presentation } from 'lucide-react';

/* Slide deck. Every slide is in the HTML (crawlable); the viewer scrolls between them. */
export default function Slides({ title, slides }: { title: string; slides: { title: string; points: string[] }[] }) {
  const track = useRef<HTMLDivElement>(null);
  const [i, setI] = useState(0);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const onScroll = () => setI(Math.round(el.scrollLeft / el.clientWidth));
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  const go = (n: number) => {
    const el = track.current;
    if (!el) return;
    const next = Math.max(0, Math.min(slides.length - 1, n));
    el.scrollTo({ left: next * el.clientWidth, behavior: 'smooth' });
  };

  return (
    <figure className="bk-slides" aria-roledescription="carousel" aria-label={title}>
      <figcaption className="bk-head"><Presentation size={18} aria-hidden="true" /> {title}<span className="bk-count">{i + 1} / {slides.length}</span></figcaption>
      <div className="sl-track" ref={track} tabIndex={0} onKeyDown={(e) => { if (e.key === 'ArrowRight') go(i + 1); if (e.key === 'ArrowLeft') go(i - 1); }}>
        {slides.map((s, n) => (
          <section className="sl-slide" key={n} aria-roledescription="slide" aria-label={`${n + 1} of ${slides.length}`}>
            <span className="sl-num">{String(n + 1).padStart(2, '0')}</span>
            <h4 className="sl-title">{s.title}</h4>
            <ul className="sl-points">{s.points.map((p) => <li key={p}>{p}</li>)}</ul>
          </section>
        ))}
      </div>
      <div className="sl-nav">
        <button type="button" className="sl-btn" onClick={() => go(i - 1)} disabled={i === 0} aria-label="Previous slide"><ChevronLeft size={20} /></button>
        <div className="sl-dots">
          {slides.map((_, n) => <button type="button" key={n} className={'sl-dot' + (n === i ? ' on' : '')} onClick={() => go(n)} aria-label={`Go to slide ${n + 1}`} />)}
        </div>
        <button type="button" className="sl-btn" onClick={() => go(i + 1)} disabled={i === slides.length - 1} aria-label="Next slide"><ChevronRight size={20} /></button>
      </div>
    </figure>
  );
}
