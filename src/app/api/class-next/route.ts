import { NextResponse } from 'next/server';
import { cms } from '@/lib/cms';

/* Next scheduled online class for a course, for the "Join course online" button. */

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const slug = new URL(req.url).searchParams.get('course')?.slice(0, 80) || '';
  const none = NextResponse.json({ found: false }, { headers: { 'Cache-Control': 'no-store' } });
  if (!slug) return none;

  const payload = await cms();
  const course = (await payload.find({ collection: 'courses', where: { slug: { equals: slug } }, limit: 1, depth: 0, overrideAccess: true })).docs[0];
  if (!course) return none;

  // Classes that have not ended yet (assume at most 4 hours long for the search window).
  const from = new Date(Date.now() - 4 * 60 * 60_000).toISOString();
  const res = await payload.find({
    collection: 'online-classes',
    where: { and: [{ course: { equals: course.id } }, { status: { equals: 'scheduled' } }, { startsAt: { greater_than: from } }] },
    sort: 'startsAt',
    limit: 5,
    depth: 0,
    overrideAccess: true,
  });
  const now = Date.now();
  const next = res.docs.find((c) => new Date(c.startsAt as string).getTime() + ((c.durationMins as number) || 120) * 60_000 > now);
  if (!next) return none;

  const start = new Date(next.startsAt as string).getTime();
  return NextResponse.json(
    { found: true, url: `/class/${next.slug}/`, title: next.title, startsAt: next.startsAt, live: now >= start - 30 * 60_000 },
    { headers: { 'Cache-Control': 'no-store' } },
  );
}
