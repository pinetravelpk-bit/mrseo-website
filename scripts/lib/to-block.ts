/* Converts a post body block from the TypeScript content format into an admin (Payload) block. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyBlock = Record<string, any> & { type: string };
const t = (s: string) => ({ text: s });

export function toBlock(b: AnyBlock) {
  switch (b.type) {
    case 'p': return { blockType: 'paragraph', text: b.text };
    case 'h2': return { blockType: 'heading2', text: b.text };
    case 'h3': return { blockType: 'heading3', text: b.text };
    case 'list': return { blockType: 'list', ordered: !!b.ordered, items: b.items.map(t) };
    case 'callout': return { blockType: 'callout', tone: b.tone, title: b.title, text: b.text };
    case 'slides': return { blockType: 'slides', title: b.title, slides: b.slides.map((s: any) => ({ title: s.title, points: s.points.map(t) })) };
    case 'video': return { blockType: 'video', title: b.title, steps: b.steps };
    case 'stats': return { blockType: 'stats', title: b.title, items: b.items };
    case 'bars': return { blockType: 'bars', title: b.title, items: b.items, note: b.note };
    case 'process': return { blockType: 'process', title: b.title, steps: b.steps };
    case 'compare': return { blockType: 'compare', title: b.title, leftLabel: b.left.label, rightLabel: b.right.label, leftItems: b.left.items.map(t), rightItems: b.right.items.map(t) };
    case 'checklist': return { blockType: 'checklist', title: b.title, items: b.items.map(t) };
    case 'table': return { blockType: 'table', caption: b.caption, head: b.head.map(t), rows: b.rows.map((r: string[]) => ({ cells: r.map(t) })) };
    case 'quote': return { blockType: 'quote', text: b.text, cite: b.cite };
    case 'sources': return { blockType: 'sources', items: b.items };
    default: throw new Error('Unknown block type ' + b.type);
  }
}
