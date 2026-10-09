import type { CollectionConfig } from 'payload';
import { ICON_NODES } from '@/components/blog/iconNodes';
import { POST_BLOCKS } from '../blocks';
import { faqsField, longContentFields, orderField, revalidateHooks, seoFields, slugField, statsField, textList } from '../fields';

const SITE = process.env.NEXT_PUBLIC_SITE_URL || '';

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: { singular: 'Blog post', plural: 'Blog posts' },
  admin: {
    group: 'Content',
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'publishAt', 'hideFromSite'],
    listSearchableFields: ['title', 'keyword', 'slug'],
    description: 'Posts go live automatically at their publish time. Set a future time to schedule a post.',
    preview: (d) => `${SITE}/blog/${d.slug}/`,
  },
  defaultSort: '-publishAt',
  access: { read: () => true },
  hooks: revalidateHooks,
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Article',
          fields: [
            { name: 'title', type: 'text', required: true },
            { name: 'description', type: 'textarea', required: true, label: 'Intro', admin: { description: 'Shown under the title and on blog cards.' } },
            {
              name: 'answer', type: 'textarea', required: true, label: 'Quick answer',
              admin: { description: 'A 40 to 60 word direct answer, shown first. This is what Google snippets and AI assistants quote.' },
            },
            textList('takeaways', 'Key takeaways'),
            {
              name: 'body', type: 'blocks', label: 'Article body', blocks: POST_BLOCKS,
              admin: { description: 'Add paragraphs, headings, slides, infographics and guides. Drag to reorder.', initCollapsed: true },
            },
            faqsField(),
            {
              name: 'related', type: 'array', label: 'Related links', labels: { singular: 'Link', plural: 'Links' },
              fields: [{ type: 'row', fields: [{ name: 'label', type: 'text', required: true }, { name: 'href', type: 'text', required: true, label: 'URL', admin: { description: 'e.g. /services/seo/' } }] }],
            },
          ],
        },
        {
          label: 'SEO',
          fields: [
            { name: 'keyword', type: 'text', required: true, label: 'Focus keyword' },
            { name: 'metaDescription', type: 'textarea', maxLength: 300, label: 'Meta description', admin: { description: 'Leave empty to use the intro. About 150 to 160 characters.' } },
          ],
        },
      ],
    },
    slugField(),
    {
      name: 'publishAt', type: 'date', required: true, index: true, label: 'Publish time',
      admin: { position: 'sidebar', date: { pickerAppearance: 'dayAndTime', displayFormat: 'd MMM yyyy, h:mm a' }, description: 'The post appears on the site at this time.' },
    },
    {
      name: 'contentUpdatedAt', type: 'date', label: 'Content last updated',
      admin: { position: 'sidebar', date: { pickerAppearance: 'dayAndTime', displayFormat: 'd MMM yyyy, h:mm a' }, description: 'Set when you substantially update the article. Used as the "modified" date for Google.' },
    },
    { name: 'hideFromSite', type: 'checkbox', label: 'Hide from the site', admin: { position: 'sidebar' } },
    { name: 'category', type: 'text', required: true, admin: { position: 'sidebar' } },
    {
      name: 'accent', type: 'select', required: true, defaultValue: 'green', label: 'Accent colour', admin: { position: 'sidebar' },
      options: ['green', 'blue', 'teal', 'amber', 'violet', 'rose'].map((v) => ({ label: v, value: v })),
    },
    {
      name: 'icon', type: 'select', required: true, defaultValue: 'search', admin: { position: 'sidebar', description: 'Drawn on the generated feature image and post card.' },
      options: Object.keys(ICON_NODES).sort().map((v) => ({ label: v, value: v })),
    },
    {
      name: 'featureImage', type: 'upload', relationTo: 'media', label: 'Custom feature image',
      admin: { position: 'sidebar', description: 'Optional. Leave empty to use the automatically designed image (1200 x 630).' },
    },
  ],
};

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: { singular: 'Extra page', plural: 'Extra pages' },
  admin: {
    group: 'Content',
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'published'],
    description: 'Simple pages such as Privacy Policy and Terms, served at mrseo.pk/your-slug/. The main pages are edited under Page settings.',
    preview: (d) => `${SITE}/${d.slug}/`,
  },
  access: { read: () => true },
  hooks: revalidateHooks,
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'intro', type: 'textarea' },
    ...longContentFields,
    ...seoFields,
    slugField(),
    { name: 'published', type: 'checkbox', defaultValue: true, admin: { position: 'sidebar', description: 'Untick to hide the page (it returns 404).' } },
    { name: 'noindex', type: 'checkbox', label: 'Hide from Google', admin: { position: 'sidebar' } },
  ],
};

export const CaseStudies: CollectionConfig = {
  slug: 'case-studies',
  labels: { singular: 'Case study', plural: 'Case studies' },
  admin: {
    group: 'Content',
    useAsTitle: 'title',
    defaultColumns: ['title', 'client', 'published', 'order'],
    description: 'Real client results. The case studies page is hidden from Google until at least one is published.',
    preview: (d) => `${SITE}/case-studies/${d.slug}/`,
  },
  defaultSort: 'order',
  access: { read: () => true },
  hooks: revalidateHooks,
  fields: [
    { name: 'title', type: 'text', required: true },
    { type: 'row', fields: [{ name: 'client', type: 'text', label: 'Client or business type' }, { name: 'industry', type: 'text' }, { name: 'city', type: 'text' }] },
    { name: 'summary', type: 'textarea', required: true, label: 'Summary', admin: { description: 'Shown on the case studies list and at the top of the page.' } },
    statsField('results', 'Headline results'),
    { name: 'image', type: 'upload', relationTo: 'media' },
    ...longContentFields,
    ...seoFields,
    slugField(),
    orderField,
    { name: 'published', type: 'checkbox', defaultValue: false, admin: { position: 'sidebar' } },
  ],
};
