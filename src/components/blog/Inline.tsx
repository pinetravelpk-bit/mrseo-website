import Link from 'next/link';
import { Fragment } from 'react';

/* Tiny, safe inline formatter for post copy: **bold** and [label](href).
   Internal links use next/link; external links open in a new tab. */
export default function Inline({ text }: { text: string }) {
  const out: React.ReactNode[] = [];
  const re = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)\s]+)\)/g;
  let last = 0, m: RegExpExecArray | null, k = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(<Fragment key={k++}>{text.slice(last, m.index)}</Fragment>);
    if (m[1]) out.push(<strong key={k++}>{m[1]}</strong>);
    else {
      const href = m[3];
      out.push(href.startsWith('/')
        ? <Link key={k++} href={href}>{m[2]}</Link>
        : <a key={k++} href={href} target="_blank" rel="noopener">{m[2]}</a>);
    }
    last = re.lastIndex;
  }
  if (last < text.length) out.push(<Fragment key={k++}>{text.slice(last)}</Fragment>);
  return <>{out}</>;
}

export const plain = (text: string) => text.replace(/\*\*(.+?)\*\*/g, '$1').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
