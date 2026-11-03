import { randomBytes, randomInt } from 'crypto';
import type { CollectionConfig } from 'payload';

/* Online classes on MrSEO Classroom (our own video server). Each class gets a private
   join page with an access code; the website signs people in and records attendance. */

const SITE = (process.env.NEXT_PUBLIC_SITE_URL || 'https://mrseo.pk').replace(/\/$/, '');
const loggedIn = ({ req }: { req: { user?: unknown } }) => Boolean(req.user);
const randomId = (n: number) => randomBytes(n * 2).toString('base64url').replace(/[-_]/g, '').toLowerCase().slice(0, n);

export const classUrl = (slug: string) => `${SITE}/class/${slug}/`;
export const hostUrl = (slug: string) => `${SITE}/class/${slug}/host/`;

export const OnlineClasses: CollectionConfig = {
  slug: 'online-classes',
  labels: { singular: 'Online class', plural: 'Online classes' },
  admin: {
    group: 'Online classes',
    useAsTitle: 'title',
    defaultColumns: ['title', 'startsAt', 'accessCode', 'studentLink', 'status'],
    description:
      'Create a class, then send students the Student join link and access code on WhatsApp. To teach, open the Teacher link a few minutes early while logged in to this admin. Students wait in the classroom until you join.',
  },
  defaultSort: '-startsAt',
  access: { read: loggedIn, create: loggedIn, update: loggedIn, delete: loggedIn },
  hooks: {
    beforeChange: [
      ({ data, operation }) => {
        if (operation === 'create' || !data.slug) data.slug = data.slug || randomId(10);
        if (operation === 'create' || !data.room) data.room = data.room || `mrseoclass${randomId(14)}`;
        if (!data.accessCode) data.accessCode = String(randomInt(100000, 999999));
        data.studentLink = classUrl(data.slug);
        data.teacherLink = hostUrl(data.slug);
        return data;
      },
    ],
  },
  fields: [
    { name: 'title', type: 'text', required: true, admin: { description: 'e.g. SEO Course, Batch 12, Class 5: Keyword research' } },
    {
      type: 'row',
      fields: [
        { name: 'course', type: 'relationship', relationTo: 'courses', admin: { width: '50%' } },
        { name: 'startsAt', type: 'date', required: true, label: 'Starts at', admin: { width: '50%', date: { pickerAppearance: 'dayAndTime', displayFormat: 'd MMM yyyy, h:mm a' } } },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'durationMins', type: 'number', label: 'Duration (minutes)', defaultValue: 120, admin: { width: '33%' } },
        { name: 'accessCode', type: 'text', label: 'Access code', admin: { width: '33%', description: 'Leave empty to generate a 6-digit code.' } },
        {
          name: 'status', type: 'select', defaultValue: 'scheduled', admin: { width: '33%' },
          options: [{ label: 'Scheduled', value: 'scheduled' }, { label: 'Cancelled', value: 'cancelled' }, { label: 'Finished', value: 'finished' }],
        },
      ],
    },
    { name: 'notes', type: 'textarea', label: 'Note for students', admin: { description: 'Shown on the join page, e.g. what to prepare or bring.' } },
    { name: 'studentLink', type: 'text', label: 'Student join link (send this)', admin: { readOnly: true, position: 'sidebar', description: 'Generated when you save.' } },
    { name: 'teacherLink', type: 'text', label: 'Teacher link (open to teach)', admin: { readOnly: true, position: 'sidebar' } },
    { name: 'slug', type: 'text', unique: true, index: true, admin: { readOnly: true, position: 'sidebar' } },
    { name: 'room', type: 'text', label: 'Room name', admin: { readOnly: true, position: 'sidebar' } },
  ],
};

export const ClassAttendance: CollectionConfig = {
  slug: 'class-attendance',
  labels: { singular: 'Attendance', plural: 'Attendance' },
  admin: {
    group: 'Online classes',
    useAsTitle: 'name',
    defaultColumns: ['name', 'phone', 'onlineClass', 'createdAt'],
    listSearchableFields: ['name', 'phone'],
    description: 'Everyone who joined a class through the website, with the time they joined.',
  },
  defaultSort: '-createdAt',
  access: { read: loggedIn, create: loggedIn, update: loggedIn, delete: loggedIn },
  fields: [
    { name: 'onlineClass', type: 'relationship', relationTo: 'online-classes', required: true, label: 'Class' },
    { type: 'row', fields: [{ name: 'name', type: 'text', required: true }, { name: 'phone', type: 'text' }] },
    { name: 'ip', type: 'text', admin: { readOnly: true, position: 'sidebar' } },
  ],
};
