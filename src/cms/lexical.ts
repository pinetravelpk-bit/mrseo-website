/* Minimal HTML to Lexical conversion for the imported page content, which only
   uses <p>, <ul>/<li> and <strong>. Used once by the seed script. */

type Node = Record<string, unknown>;

const decode = (s: string) =>
  s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#0?39;/g, "'").replace(/&nbsp;/g, ' ');

function inline(html: string): Node[] {
  const out: Node[] = [];
  const re = /<strong>([\s\S]*?)<\/strong>/g;
  let last = 0, m: RegExpExecArray | null;
  const push = (text: string, bold: boolean) => {
    const t = decode(text.replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ');
    if (t) out.push({ type: 'text', text: t, format: bold ? 1 : 0, style: '', mode: 'normal', detail: 0, version: 1 });
  };
  while ((m = re.exec(html))) {
    push(html.slice(last, m.index), false);
    push(m[1], true);
    last = re.lastIndex;
  }
  push(html.slice(last), false);
  return out;
}

const block = (type: string, children: Node[], extra: Node = {}): Node => ({ type, format: '', indent: 0, version: 1, direction: 'ltr', children, ...extra });

export function htmlToLexical(html: string) {
  const children: Node[] = [];
  const re = /<p>([\s\S]*?)<\/p>|<ul>([\s\S]*?)<\/ul>/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html))) {
    if (m[1] !== undefined) {
      children.push(block('paragraph', inline(m[1]), { textFormat: 0, textStyle: '' }));
    } else {
      const items = [...m[2].matchAll(/<li>([\s\S]*?)<\/li>/g)].map((li, i) => block('listitem', inline(li[1]), { value: i + 1 }));
      children.push(block('list', items, { listType: 'bullet', start: 1, tag: 'ul' }));
    }
  }
  if (!children.length && html.trim()) children.push(block('paragraph', inline(html), { textFormat: 0, textStyle: '' }));
  return { root: { type: 'root', format: '', indent: 0, version: 1, direction: 'ltr', children } };
}

/** Plain paragraphs to Lexical. */
export const paragraphs = (...ps: string[]) => htmlToLexical(ps.map((p) => `<p>${p}</p>`).join(''));
