'use client';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/* Counts headline numbers up when they scroll into view. Anchor offsets
   under the fixed header are handled in CSS with scroll-padding-top. */
export default function SiteEffects() {
  const pathname = usePathname();

  // Infographics animate in once when they scroll into view.
  useEffect(() => {
    // Only elements still below the fold are hidden for the animation, so content is never blank without JS.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const els = Array.from(document.querySelectorAll('.anim')).filter((el) => el.getBoundingClientRect().top > window.innerHeight);
    els.forEach((el) => el.classList.add('pending'));
    const io = new IntersectionObserver((list) => {
      list.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.1 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    function counter(el: Element) {
      const node = Array.from(el.childNodes).find((n) => n.nodeType === Node.TEXT_NODE && /\d/.test(n.textContent || ''));
      if (!node) return;
      const text = node.textContent || '';
      const m = /^(\d+)(\D*)$/.exec(text.trim());
      if (!m || m[1].length > 3) return; // skip years like 2010 and figures with commas
      const target = Number(m[1]), suffix = m[2];
      const dur = 1200, start = performance.now();
      const tick = (now: number) => {
        const t = Math.min((now - start) / dur, 1);
        node.textContent = Math.round(target * (1 - Math.pow(1 - t, 3))) + suffix;
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }

    const io = new IntersectionObserver((list) => {
      list.forEach((e) => { if (e.isIntersecting) { counter(e.target); io.unobserve(e.target); } });
    }, { threshold: 0.6 });
    document.querySelectorAll('.hs-val,.stat-v').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
