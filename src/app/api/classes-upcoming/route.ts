import { NextResponse } from 'next/server';
import { cms } from '@/lib/cms';

/* Upcoming online classes for the "Join Live Class" window in the menu. */

export const dynamic = 'force-dynamic';

export async function GET() {
  const payload = await cms();
  const now = Date.now();
  const res = await payload.find({
    collection: 'online-classes',
    where: {
      and: [
        { status: { equals: 'scheduled' } },
        { startsAt: { greater_than: new Date(now - 6 * 60 * 60_000).toISOString() } },
        { startsAt: { less_than: new Date(now + 45 * 24 * 60 * 60_000).toISOString() } },
      ],
    },
    sort: 'startsAt',
    limit: 12,
    depth: 1,
    overrideAccess: true,
  });

  const classes = res.docs
    .map((c) => {
      const start = new Date(c.startsAt as string).getTime();
      const mins = (c.durationMins as number) || 120;
      const course = c.course && typeof c.course === 'object' ? (c.course as { name?: string; slug?: string }) : null;
      return {
        title: c.title as string,
        course: course?.name ?? null,
        courseSlug: course?.slug ?? null,
        startsAt: c.startsAt as string,
        durationMins: mins,
        url: `/class/${c.slug}/`,
        end: start + mins * 60_000,
        opens: start - 30 * 60_000,
      };
    })
    .filter((c) => c.end > now && !/^test\b/i.test(c.title))
    .slice(0, 6)
    .map(({ end, opens, ...c }) => ({ ...c, live: now >= opens && now < end }));

  return NextResponse.json({ classes, now }, { headers: { 'Cache-Control': 'no-store' } });
}
