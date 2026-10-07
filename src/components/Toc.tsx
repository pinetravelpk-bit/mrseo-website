'use client';
import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';

export type TocItem = { id: string; label: string };

/* Sticky contents list (desktop) and a collapsible one (tablet and phone).
   Highlights the section currently being read. */
export default function Toc({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-90px 0px -65% 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);

  const list = (
    <ol className="toc-list">
      {items.map((i) => (
        <li key={i.id}><a href={'#' + i.id} className={active === i.id ? 'active' : undefined}>{i.label}</a></li>
      ))}
    </ol>
  );

  return (
    <>
      <aside className="toc-side" aria-label="On this page">
        <p className="toc-title">On this page</p>
        {list}
      </aside>
      <details className="toc-inline">
        <summary>On this page <ChevronDown size={18} aria-hidden="true" /></summary>
        {list}
      </details>
    </>
  );
}
