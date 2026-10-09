import path from 'path';
import type { CollectionConfig } from 'payload';
import { revalidateHooks } from '../fields';

const loggedIn = ({ req }: { req: { user?: unknown } }) => Boolean(req.user);

export const Users: CollectionConfig = {
  slug: 'users',
  labels: { singular: 'Admin user', plural: 'Admin users' },
  admin: { useAsTitle: 'email', group: 'Admin', defaultColumns: ['name', 'email', 'updatedAt'] },
  auth: {
    maxLoginAttempts: 5,
    lockTime: 15 * 60 * 1000,
    tokenExpiration: 7 * 24 * 60 * 60,
    cookies: { sameSite: 'Lax', secure: process.env.NODE_ENV === 'production' },
  },
  access: { read: loggedIn, create: loggedIn, update: loggedIn, delete: loggedIn },
  fields: [{ name: 'name', type: 'text' }],
};

export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Image or file', plural: 'Media library' },
  admin: { group: 'Content', description: 'Images and files for blog posts, case studies and pages.' },
  access: { read: () => true, create: loggedIn, update: loggedIn, delete: loggedIn },
  upload: {
    // Kept outside the release folder on the server so uploads survive deploys.
    staticDir: process.env.MEDIA_DIR || path.resolve(process.cwd(), 'media'),
    mimeTypes: ['image/*', 'application/pdf'],
    imageSizes: [
      { name: 'card', width: 800, withoutEnlargement: true },
      { name: 'large', width: 1600, withoutEnlargement: true },
    ],
    adminThumbnail: 'card',
  },
  hooks: revalidateHooks,
  fields: [
    { name: 'alt', type: 'text', required: true, label: 'Alt text', admin: { description: 'Describe the image for screen readers and Google Images.' } },
    { name: 'caption', type: 'text' },
  ],
};

/** Contact-form and course-application submissions. Saved by /api/contact and /api/enroll. */
export const Queries: CollectionConfig = {
  slug: 'queries',
  labels: { singular: 'Query', plural: 'Queries' },
  admin: {
    group: 'Inbox',
    useAsTitle: 'name',
    defaultColumns: ['name', 'kind', 'phone', 'email', 'status', 'createdAt'],
    listSearchableFields: ['name', 'email', 'phone', 'message', 'website', 'course'],
    description: 'Everything sent through the website forms. Mark each one as you deal with it.',
  },
  defaultSort: '-createdAt',
  access: { read: loggedIn, create: loggedIn, update: loggedIn, delete: loggedIn },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'kind', type: 'select', required: true, defaultValue: 'contact', options: [{ label: 'SEO enquiry', value: 'contact' }, { label: 'Course application', value: 'enroll' }], admin: { width: '50%' } },
        {
          name: 'status', type: 'select', required: true, defaultValue: 'new', admin: { width: '50%' },
          options: [{ label: 'New', value: 'new' }, { label: 'Contacted', value: 'contacted' }, { label: 'Converted', value: 'won' }, { label: 'Closed', value: 'closed' }, { label: 'Spam', value: 'spam' }],
        },
      ],
    },
    { type: 'row', fields: [{ name: 'name', type: 'text', required: true }, { name: 'email', type: 'email' }, { name: 'phone', type: 'text' }] },
    { type: 'row', fields: [{ name: 'city', type: 'text' }, { name: 'service', type: 'text' }, { name: 'website', type: 'text' }] },
    { type: 'row', fields: [{ name: 'course', type: 'text' }, { name: 'mode', type: 'text', label: 'Preferred mode' }, { name: 'education', type: 'text' }] },
    { name: 'message', type: 'textarea' },
    { name: 'notes', type: 'textarea', label: 'Internal notes', admin: { description: 'Only visible in the admin.' } },
    { name: 'page', type: 'text', label: 'Sent from page', admin: { readOnly: true, position: 'sidebar' } },
    { name: 'ip', type: 'text', label: 'IP address', admin: { readOnly: true, position: 'sidebar' } },
    { name: 'emailed', type: 'checkbox', label: 'Email notification sent', admin: { readOnly: true, position: 'sidebar' } },
  ],
};
