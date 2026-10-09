import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, Field, GlobalAfterChangeHook } from 'payload';
import { revalidatePath } from 'next/cache';
import { SITE_ICON_NAMES } from '@/lib/icons';

/* Shared field definitions for the admin. Pages are statically cached, so every
   save clears the cache and the change is live on the next page view. */

function revalidateSite(context: Record<string, unknown>) {
  if (context?.skipRevalidate) return;
  try {
    revalidatePath('/', 'layout');
  } catch {
    // Outside a Next.js request (seed and CLI scripts) there is no cache to clear.
  }
}

export const afterChangeRevalidate: CollectionAfterChangeHook = ({ doc, req }) => {
  revalidateSite(req.context);
  return doc;
};
export const afterDeleteRevalidate: CollectionAfterDeleteHook = ({ doc, req }) => {
  revalidateSite(req.context);
  return doc;
};
export const globalRevalidate: GlobalAfterChangeHook = ({ doc, req }) => {
  revalidateSite(req.context);
  return doc;
};
export const revalidateHooks = { afterChange: [afterChangeRevalidate], afterDelete: [afterDeleteRevalidate] };

export const HIGHLIGHT_HELP = 'Wrap words in *asterisks* to show them in green, for example: Get found on Google *across Pakistan*';
export const INLINE_HELP = 'Use **double asterisks** for bold and [link text](/page-url/) for links.';

export const slugField = (description = 'Used in the page address. Lowercase letters, numbers and hyphens only. Changing it changes the URL.'): Field => ({
  name: 'slug',
  type: 'text',
  required: true,
  unique: true,
  index: true,
  admin: { position: 'sidebar', description },
  validate: (v: unknown) => (typeof v === 'string' && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(v)) || 'Use lowercase letters, numbers and single hyphens only.',
});

export const orderField: Field = {
  name: 'order',
  type: 'number',
  defaultValue: 100,
  admin: { position: 'sidebar', description: 'Lower numbers appear first in menus and grids.' },
};

export const iconField = (description = 'Leave empty to use the default icon for this item.'): Field => ({
  name: 'icon',
  type: 'select',
  options: SITE_ICON_NAMES.map((v) => ({ label: v, value: v })),
  admin: { position: 'sidebar', description },
});

export const textList = (name: string, label: string, description?: string): Field => ({
  name,
  type: 'array',
  label,
  labels: { singular: 'Item', plural: 'Items' },
  admin: { description, initCollapsed: false },
  fields: [{ name: 'text', type: 'textarea', admin: { rows: 2 } }],
});

export const faqsField = (name = 'faqs', label = 'FAQs'): Field => ({
  name,
  type: 'array',
  label,
  labels: { singular: 'Question', plural: 'Questions' },
  admin: { description: 'Shown as an FAQ list and added to the page as FAQ structured data.', initCollapsed: true },
  fields: [
    { name: 'q', type: 'text', label: 'Question', required: true },
    { name: 'a', type: 'textarea', label: 'Answer', required: true },
  ],
});

/** Long-form page body: short answer, sections and FAQs. */
export const longContentFields: Field[] = [
  { name: 'quick', type: 'textarea', label: 'Short answer', admin: { description: 'One paragraph shown in the "In short" box near the top. Written as a direct answer for Google and AI assistants.' } },
  {
    name: 'sections',
    type: 'array',
    labels: { singular: 'Section', plural: 'Sections' },
    admin: { description: 'Each section gets an H2 heading and appears in the table of contents.', initCollapsed: true },
    fields: [
      { name: 'heading', type: 'text', required: true },
      { name: 'content', type: 'richText' },
    ],
  },
  faqsField(),
];

export const seoFields: Field[] = [
  { name: 'metaTitle', type: 'text', label: 'SEO title', admin: { description: 'Leave empty to use the automatic title. About 50 to 60 characters.' } },
  { name: 'metaDescription', type: 'textarea', label: 'Meta description', maxLength: 300, admin: { description: 'Leave empty to use the automatic description. About 150 to 160 characters.' } },
];

export const sectionHead = (name: string, label: string, withSub = true): Field => ({
  name,
  type: 'group',
  label,
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'eyebrow', type: 'text', admin: { width: '35%' } },
        { name: 'title', type: 'text', admin: { width: '65%', description: HIGHLIGHT_HELP } },
      ],
    },
    ...(withSub ? [{ name: 'sub', type: 'textarea', label: 'Intro text' } as Field] : []),
  ],
});

export const heroFields = (withMeta = true): Field[] => [
  ...(withMeta ? seoFields : []),
  { name: 'eyebrow', type: 'text' },
  { name: 'title', type: 'text', admin: { description: HIGHLIGHT_HELP } },
  { name: 'desc', type: 'textarea', label: 'Intro text' },
];

export const ctaGroup = (name = 'cta', label = 'Call to action panel'): Field => ({
  name,
  type: 'group',
  label,
  fields: [
    { name: 'title', type: 'text', admin: { description: HIGHLIGHT_HELP } },
    { name: 'text', type: 'textarea' },
    { name: 'note', type: 'text', label: 'Small note under the buttons' },
  ],
});

export const statsField = (name = 'stats', label = 'Stats'): Field => ({
  name,
  type: 'array',
  label,
  labels: { singular: 'Stat', plural: 'Stats' },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'value', type: 'text', required: true, admin: { width: '35%' } },
        { name: 'label', type: 'text', required: true, admin: { width: '65%' } },
      ],
    },
  ],
});

export const cardsField = (name: string, label: string): Field => ({
  name,
  type: 'array',
  label,
  labels: { singular: 'Card', plural: 'Cards' },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'icon', type: 'select', options: SITE_ICON_NAMES.map((v) => ({ label: v, value: v })), admin: { width: '30%' } },
        { name: 'title', type: 'text', required: true, admin: { width: '70%' } },
      ],
    },
    { name: 'text', type: 'textarea', required: true },
  ],
});

export const stepsField = (name: string, label: string): Field => ({
  name,
  type: 'array',
  label,
  labels: { singular: 'Step', plural: 'Steps' },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'text', type: 'textarea', required: true },
  ],
});
