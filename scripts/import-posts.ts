/* Imports a series of blog posts into the admin database and schedules them.
   Posts that already exist (same slug) are left alone, so it is safe to run again.

     npx tsx --env-file=.env scripts/import-posts.ts [--start=2026-10-24T18:00:00+05:00] [--gap=2] [--dry]

   Without --start, scheduling continues 2 hours after the latest scheduled post,
   or from the next full hour if that is later. */
import { getPayload } from 'payload';
import config from '../src/payload.config';
import { COURSE_POSTS } from './seed-data/courses-blog/index';
import { toBlock, type AnyBlock } from './lib/to-block';

const arg = (name: string) => process.argv.find((a) => a.startsWith(`--${name}=`))?.split('=').slice(1).join('=');
const dry = process.argv.includes('--dry');
const gapHours = Number(arg('gap') ?? 2);

async function main() {
  const payload = await getPayload({ config });
  const existing = await payload.find({ collection: 'posts', limit: 2000, depth: 0, pagination: false, sort: 'publishAt' });
  const slugs = new Set(existing.docs.map((d) => d.slug as string));

  let next: number;
  if (arg('start')) {
    next = new Date(arg('start')!).getTime();
  } else {
    const last = existing.docs.length ? new Date(existing.docs[existing.docs.length - 1].publishAt as string).getTime() : 0;
    const nextHour = Math.ceil(Date.now() / 3600_000) * 3600_000;
    next = Math.max(last + gapHours * 3600_000, nextHour);
  }

  let created = 0;
  for (const p of COURSE_POSTS) {
    if (slugs.has(p.slug)) {
      console.log(`skip (exists)  ${p.slug}`);
      continue;
    }
    const publishAt = new Date(next).toISOString();
    next += gapHours * 3600_000;
    console.log(`${dry ? 'would add' : 'add'}  ${publishAt}  ${p.slug}`);
    if (dry) { created++; continue; }
    await payload.create({
      collection: 'posts',
      context: { skipRevalidate: true },
      data: {
        slug: p.slug, title: p.title, keyword: p.keyword, description: p.description, metaDescription: p.metaDescription,
        category: p.category, icon: p.icon, accent: p.accent, answer: p.answer, takeaways: p.takeaways.map((text) => ({ text })),
        body: p.body.map((b) => toBlock(b as AnyBlock)), faqs: p.faqs, related: p.related ?? [], publishAt,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any,
    });
    created++;
  }
  console.log(`\n${dry ? 'Dry run' : 'Done'}: ${created} new, ${COURSE_POSTS.length - created} skipped.`);
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
