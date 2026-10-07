'use client';
import { useId, useState } from 'react';
import { Plus } from 'lucide-react';
import type { Faq } from '@/lib/site';

/* FAQ accordion. Answers stay in the DOM and are only collapsed visually,
   so search engines and screen readers still get the full text. */
export default function FaqList({ faqs }: { faqs: Faq[] }) {
  const [open, setOpen] = useState<Record<number, boolean>>({});
  const uid = useId();
  return (
    <div className="faq-list">
      {faqs.map((f, i) => {
        const id = `${uid}-a${i}`;
        return (
          <div className={'faq-item' + (open[i] ? ' open' : '')} key={i}>
            <h3 style={{ margin: 0 }}>
              <button type="button" className="faq-q" aria-expanded={!!open[i]} aria-controls={id} onClick={() => setOpen((o) => ({ ...o, [i]: !o[i] }))}>
                <span>{f.q}</span>
                <span className="faq-ico" aria-hidden="true"><Plus size={18} /></span>
              </button>
            </h3>
            <div className="faq-a" id={id} role="region">
              <div><p>{f.a}</p></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
