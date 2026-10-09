import { highlightParts } from '@/lib/site';

/** Renders admin text where *starred words* are shown in the green accent. */
export default function Hl({ text }: { text?: string | null }) {
  return <>{highlightParts(text).map((p, i) => (p.hl ? <span className="g" key={i}>{p.text}</span> : p.text))}</>;
}
