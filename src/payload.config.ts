import path from 'path';
import { fileURLToPath } from 'url';
import { buildConfig } from 'payload';
import { sqliteAdapter } from '@payloadcms/db-sqlite';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import sharp from 'sharp';

import { Media, Queries, Users } from './cms/collections/system';
import { Cities, Courses, Industries, Services, Testimonials } from './cms/collections/business';
import { CaseStudies, Pages, Posts } from './cms/collections/content';
import { GLOBALS } from './cms/globals';
import { migrations } from './migrations';

const dirname = path.dirname(fileURLToPath(import.meta.url));

if (process.env.NODE_ENV === 'production' && !process.env.PAYLOAD_SECRET) {
  throw new Error('PAYLOAD_SECRET must be set in production.');
}

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    meta: { titleSuffix: ' · MrSEO.pk admin' },
    dateFormat: 'd MMM yyyy, h:mm a',
  },
  collections: [Queries, Posts, Pages, CaseStudies, Media, Services, Courses, Cities, Industries, Testimonials, Users],
  globals: GLOBALS,
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'local-development-secret-change-me',
  // The database file lives outside the release folder on the server (see README).
  db: sqliteAdapter({
    client: { url: process.env.DATABASE_URL || 'file:./data/mrseo.db' },
    push: false,
    prodMigrations: migrations,
  }),
  graphQL: { disable: true },
  telemetry: false,
  sharp,
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
});
