import type { Block, Field } from 'payload';
import { INLINE_HELP, textList } from './fields';

/* Building blocks for blog post bodies. Each one maps to a Block type in
   src/lib/blog.ts and renders through src/components/blog/Blocks.tsx. */

const text = (name = 'text', required = true): Field => ({ name, type: 'textarea', required, admin: { description: INLINE_HELP } });
const title = (required = true): Field => ({ name: 'title', type: 'text', required });

export const POST_BLOCKS: Block[] = [
  { slug: 'paragraph', labels: { singular: 'Paragraph', plural: 'Paragraphs' }, fields: [text()] },
  { slug: 'heading2', labels: { singular: 'Heading (H2)', plural: 'Headings (H2)' }, admin: { disableBlockName: true }, fields: [{ name: 'text', type: 'text', required: true, admin: { description: 'Main section heading. Appears in the table of contents.' } }] },
  { slug: 'heading3', labels: { singular: 'Sub-heading (H3)', plural: 'Sub-headings (H3)' }, fields: [{ name: 'text', type: 'text', required: true }] },
  {
    slug: 'list',
    labels: { singular: 'Bullet list', plural: 'Bullet lists' },
    fields: [{ name: 'ordered', type: 'checkbox', label: 'Numbered list' }, textList('items', 'Items', INLINE_HELP)],
  },
  {
    slug: 'callout',
    labels: { singular: 'Callout box', plural: 'Callout boxes' },
    fields: [
      { name: 'tone', type: 'select', required: true, defaultValue: 'tip', options: [{ label: 'Tip', value: 'tip' }, { label: 'Warning', value: 'warn' }, { label: 'Note', value: 'note' }] },
      title(false),
      text(),
    ],
  },
  {
    slug: 'slides',
    labels: { singular: 'Slide deck', plural: 'Slide decks' },
    fields: [
      title(),
      {
        name: 'slides',
        type: 'array',
        labels: { singular: 'Slide', plural: 'Slides' },
        fields: [title(), textList('points', 'Points')],
      },
    ],
  },
  {
    slug: 'video',
    labels: { singular: 'Video-style guide', plural: 'Video-style guides' },
    fields: [
      title(),
      { name: 'steps', type: 'array', labels: { singular: 'Step', plural: 'Steps' }, fields: [title(), text()] },
    ],
  },
  {
    slug: 'stats',
    labels: { singular: 'Stats infographic', plural: 'Stats infographics' },
    fields: [
      title(),
      { name: 'items', type: 'array', fields: [{ type: 'row', fields: [{ name: 'value', type: 'text', required: true }, { name: 'label', type: 'text', required: true }] }] },
    ],
  },
  {
    slug: 'bars',
    labels: { singular: 'Bar chart', plural: 'Bar charts' },
    fields: [
      title(),
      {
        name: 'items',
        type: 'array',
        fields: [{
          type: 'row',
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'value', type: 'number', required: true, admin: { description: 'Bar length, 0 to 100' } },
            { name: 'display', type: 'text', admin: { description: 'Text shown on the bar (optional)' } },
          ],
        }],
      },
      { name: 'note', type: 'text' },
    ],
  },
  {
    slug: 'process',
    labels: { singular: 'Process steps', plural: 'Process steps' },
    fields: [
      title(),
      { name: 'steps', type: 'array', fields: [title(), text('text', false)] },
    ],
  },
  {
    slug: 'compare',
    labels: { singular: 'Comparison', plural: 'Comparisons' },
    fields: [
      title(),
      { type: 'row', fields: [{ name: 'leftLabel', type: 'text', required: true }, { name: 'rightLabel', type: 'text', required: true }] },
      textList('leftItems', 'Left column'),
      textList('rightItems', 'Right column'),
    ],
  },
  { slug: 'checklist', labels: { singular: 'Checklist', plural: 'Checklists' }, fields: [title(), textList('items', 'Items')] },
  {
    slug: 'table',
    labels: { singular: 'Table', plural: 'Tables' },
    fields: [
      { name: 'caption', type: 'text' },
      textList('head', 'Column headings'),
      { name: 'rows', type: 'array', fields: [textList('cells', 'Cells')] },
    ],
  },
  { slug: 'quote', labels: { singular: 'Quote', plural: 'Quotes' }, fields: [text(), { name: 'cite', type: 'text', label: 'Source' }] },
  {
    slug: 'sources',
    labels: { singular: 'Sources list', plural: 'Sources lists' },
    fields: [{ name: 'items', type: 'array', fields: [{ type: 'row', fields: [{ name: 'label', type: 'text', required: true }, { name: 'href', type: 'text', required: true, label: 'URL' }] }] }],
  },
];
