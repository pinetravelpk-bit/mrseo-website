import { ArrowRight, BookOpen, CircleCheck, Info, Lightbulb, TriangleAlert, X } from 'lucide-react';
import { anchor } from '@/lib/anchor';
import type { Block } from '@/lib/blog';
import Inline from './Inline';
import Slides from './Slides';
import VideoGuide from './VideoGuide';

const TONE = {
  tip: { icon: Lightbulb, label: 'Tip' },
  warn: { icon: TriangleAlert, label: 'Watch out' },
  note: { icon: Info, label: 'Note' },
};

/* Renders a post body. Infographics carry the `anim` class and animate in
   when they scroll into view (see SiteEffects); content is in the HTML either way. */
export default function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((b, k) => {
        switch (b.type) {
          case 'p': return <p key={k}><Inline text={b.text} /></p>;
          case 'h2': return <h2 key={k} id={anchor(b.text)}>{b.text}</h2>;
          case 'h3': return <h3 key={k}>{b.text}</h3>;
          case 'list': {
            const L = b.ordered ? 'ol' : 'ul';
            return <L key={k}>{b.items.map((t, n) => <li key={n}><Inline text={t} /></li>)}</L>;
          }
          case 'callout': {
            const T = TONE[b.tone];
            return (
              <aside key={k} className={'bk-callout ' + b.tone}>
                <T.icon size={20} aria-hidden="true" />
                <div><strong>{b.title ?? T.label}</strong><p><Inline text={b.text} /></p></div>
              </aside>
            );
          }
          case 'quote':
            return <blockquote key={k} className="bk-quote"><p><Inline text={b.text} /></p>{b.cite && <cite>{b.cite}</cite>}</blockquote>;
          case 'slides': return <Slides key={k} title={b.title} slides={b.slides} />;
          case 'video': return <VideoGuide key={k} title={b.title} steps={b.steps} />;
          case 'stats':
            return (
              <figure key={k} className="bk-info anim">
                <figcaption className="bk-head">{b.title}</figcaption>
                <div className="ig-stats">
                  {b.items.map((s, n) => <div className="ig-stat" key={n} style={{ ['--d' as string]: `${n * 90}ms` }}><span className="ig-val">{s.value}</span><span className="ig-lbl">{s.label}</span></div>)}
                </div>
              </figure>
            );
          case 'bars': {
            const max = Math.max(...b.items.map((x) => x.value));
            return (
              <figure key={k} className="bk-info anim">
                <figcaption className="bk-head">{b.title}</figcaption>
                <div className="ig-bars">
                  {b.items.map((x, n) => (
                    <div className="ig-row" key={n}>
                      <span className="ig-row-l">{x.label}</span>
                      <span className="ig-track"><span className="ig-fill" style={{ ['--w' as string]: `${(x.value / max) * 100}%`, ['--d' as string]: `${n * 110}ms` }} /></span>
                      <span className="ig-row-v">{x.display ?? x.value}</span>
                    </div>
                  ))}
                </div>
                {b.note && <p className="ig-note">{b.note}</p>}
              </figure>
            );
          }
          case 'process':
            return (
              <figure key={k} className="bk-info anim">
                <figcaption className="bk-head">{b.title}</figcaption>
                <ol className="ig-flow">
                  {b.steps.map((s, n) => (
                    <li key={n} style={{ ['--d' as string]: `${n * 120}ms` }}>
                      <span className="ig-node">{n + 1}</span>
                      <span className="ig-flow-t">{s.title}</span>
                      {s.text && <span className="ig-flow-d">{s.text}</span>}
                      {n < b.steps.length - 1 && <ArrowRight className="ig-arrow" size={18} aria-hidden="true" />}
                    </li>
                  ))}
                </ol>
              </figure>
            );
          case 'compare':
            return (
              <figure key={k} className="bk-info anim">
                <figcaption className="bk-head">{b.title}</figcaption>
                <div className="ig-compare">
                  {[b.left, b.right].map((side, n) => (
                    <div className={'ig-col' + (n ? ' r' : '')} key={n} style={{ ['--d' as string]: `${n * 150}ms` }}>
                      <p className="ig-col-t">{side.label}</p>
                      <ul>{side.items.map((t) => <li key={t}>{n ? <CircleCheck size={16} aria-hidden="true" /> : <X size={16} aria-hidden="true" />}<span><Inline text={t} /></span></li>)}</ul>
                    </div>
                  ))}
                </div>
              </figure>
            );
          case 'checklist':
            return (
              <figure key={k} className="bk-info anim">
                <figcaption className="bk-head">{b.title}</figcaption>
                <ul className="ig-check">
                  {b.items.map((t, n) => <li key={n} style={{ ['--d' as string]: `${n * 70}ms` }}><CircleCheck size={18} aria-hidden="true" /><span><Inline text={t} /></span></li>)}
                </ul>
              </figure>
            );
          case 'table':
            return (
              <div key={k} className="bk-table" role="region" aria-label={b.caption ?? 'Table'} tabIndex={0}>
                <table>
                  {b.caption && <caption>{b.caption}</caption>}
                  <thead><tr>{b.head.map((h) => <th key={h} scope="col">{h}</th>)}</tr></thead>
                  <tbody>{b.rows.map((r, n) => <tr key={n}>{r.map((c, m) => <td key={m}><Inline text={c} /></td>)}</tr>)}</tbody>
                </table>
              </div>
            );
          case 'sources':
            return (
              <aside key={k} className="bk-sources">
                <p className="bk-head"><BookOpen size={16} aria-hidden="true" /> Sources and further reading</p>
                <ul>{b.items.map((s) => <li key={s.href}><a href={s.href} target="_blank" rel="noopener">{s.label}</a></li>)}</ul>
              </aside>
            );
        }
      })}
    </>
  );
}
