import type { CollectionConfig, Field } from 'payload';
import { iconField, longContentFields, orderField, revalidateHooks, seoFields, slugField, textList } from '../fields';

const SITE = process.env.NEXT_PUBLIC_SITE_URL || '';
const publicRead = { read: () => true };

/** Details tab, page-content tab and SEO tab, the same layout for every business collection. */
const tabs = (details: Field[]): Field[] => [
  {
    type: 'tabs',
    tabs: [
      { label: 'Details', fields: details },
      { label: 'Page content', fields: longContentFields },
      { label: 'SEO', fields: seoFields },
    ],
  },
  slugField(),
  orderField,
];

export const Services: CollectionConfig = {
  slug: 'services',
  labels: { singular: 'Service', plural: 'Services' },
  admin: { group: 'Website', useAsTitle: 'name', defaultColumns: ['name', 'sub', 'order'], preview: (d) => `${SITE}/services/${d.slug}/` },
  defaultSort: 'order',
  access: publicRead,
  hooks: revalidateHooks,
  fields: tabs([
    { name: 'name', type: 'text', required: true },
    { name: 'sub', type: 'text', label: 'Short subtitle', admin: { description: 'Shown under the name in menus.' } },
    { name: 'desc', type: 'textarea', label: 'Card description', required: true },
    iconField(),
  ]),
};

export const Courses: CollectionConfig = {
  slug: 'courses',
  labels: { singular: 'Course', plural: 'Courses' },
  admin: { group: 'Website', useAsTitle: 'name', defaultColumns: ['name', 'tier', 'duration', 'fee', 'order'], preview: (d) => `${SITE}/courses/${d.slug}/` },
  defaultSort: 'order',
  access: publicRead,
  hooks: revalidateHooks,
  fields: tabs([
    {
      type: 'row',
      fields: [
        { name: 'name', type: 'text', required: true, admin: { width: '60%' } },
        { name: 'tier', type: 'select', required: true, defaultValue: 'pro', options: [{ label: 'Professional (with internship)', value: 'pro' }, { label: 'Short course', value: 'short' }], admin: { width: '40%' } },
      ],
    },
    { type: 'row', fields: [{ name: 'sub', type: 'text', label: 'Subtitle' }, { name: 'short', type: 'text', label: 'Short name' }] },
    { name: 'desc', type: 'textarea', label: 'Card description', required: true },
    {
      type: 'row',
      fields: [
        { name: 'duration', type: 'text', required: true, admin: { description: 'e.g. 16 weeks' } },
        { name: 'hours', type: 'text', label: 'Class time', admin: { description: 'e.g. 96 hours' } },
        { name: 'level', type: 'text' },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'fee', type: 'text', required: true, label: 'Fee (PKR)', admin: { description: 'Number only, e.g. 15,000' } },
        { name: 'fee_note', type: 'text', label: 'Fee note', admin: { description: 'e.g. One-time fee' } },
        { name: 'seats', type: 'text', label: 'Seats per batch' },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'mode', type: 'text' },
        { name: 'intern', type: 'text', label: 'Internship', admin: { description: 'e.g. 8 weeks. Leave empty for none.' } },
        { name: 'schedule', type: 'text', label: 'Timings' },
      ],
    },
    textList('outcomes', 'What students can do afterwards'),
    textList('tools', 'Tools taught'),
    iconField(),
  ]),
};

export const Cities: CollectionConfig = {
  slug: 'cities',
  labels: { singular: 'Location', plural: 'Locations' },
  admin: { group: 'Website', useAsTitle: 'name', defaultColumns: ['name', 'note', 'comp', 'order'], preview: (d) => `${SITE}/seo-expert/seo-expert-${d.slug}/` },
  defaultSort: 'order',
  access: publicRead,
  hooks: revalidateHooks,
  fields: tabs([
    { type: 'row', fields: [{ name: 'name', type: 'text', required: true }, { name: 'urdu', type: 'text', label: 'Name in Urdu' }] },
    { name: 'note', type: 'text', label: 'One-line description', admin: { description: 'e.g. Commercial capital' } },
    {
      type: 'row',
      fields: [
        { name: 'clients', type: 'text', label: 'Clients served', admin: { description: 'e.g. 120+' } },
        { name: 'comp', type: 'text', label: 'Competition level', admin: { description: 'e.g. Very high' } },
        { name: 'pop', type: 'text', label: 'Population' },
      ],
    },
    iconField(),
  ]),
};

export const Industries: CollectionConfig = {
  slug: 'industries',
  labels: { singular: 'Industry', plural: 'Industries' },
  admin: { group: 'Website', useAsTitle: 'name', defaultColumns: ['name', 'desc', 'order'], preview: (d) => `${SITE}/seo-for/seo-for-${d.slug}/` },
  defaultSort: 'order',
  access: publicRead,
  hooks: revalidateHooks,
  fields: tabs([
    { type: 'row', fields: [{ name: 'name', type: 'text', required: true }, { name: 'urdu', type: 'text', label: 'Name in Urdu' }] },
    { name: 'desc', type: 'textarea', label: 'Card description', required: true },
    textList('kws', 'Example keywords'),
    textList('stats', 'Highlights', 'Short phrases. The first two appear as stats at the top of the page.'),
    iconField(),
  ]),
};

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  labels: { singular: 'Testimonial', plural: 'Testimonials' },
  admin: { group: 'Website', useAsTitle: 'name', defaultColumns: ['name', 'role', 'city', 'order'], description: 'Real, attributable client feedback only. The homepage section appears once at least one is added.' },
  defaultSort: 'order',
  access: publicRead,
  hooks: revalidateHooks,
  fields: [
    { type: 'row', fields: [{ name: 'name', type: 'text', required: true }, { name: 'role', type: 'text', label: 'Role and company' }, { name: 'city', type: 'text' }] },
    { name: 'text', type: 'textarea', required: true, label: 'What they said' },
    orderField,
  ],
};
