import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { notFound, redirect } from 'next/navigation';
import ClassRoom from '@/components/ClassRoom';
import { cms } from '@/lib/cms';
import { CLASSROOM_DOMAIN, classToken, classroomReady } from '@/lib/classroom';

/* Teacher entry: only admin users get in, and they join as the class host. */

type Props = { params: Promise<{ slug: string }> };

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Teach online class | MrSEO.pk', robots: { index: false, follow: false } };

export default async function HostPage({ params }: Props) {
  const { slug } = await params;
  const payload = await cms();
  const { user } = await payload.auth({ headers: await headers() });
  if (!user) redirect(`/admin/login/?redirect=${encodeURIComponent(`/class/${slug}/host/`)}`);

  const res = await payload.find({ collection: 'online-classes', where: { slug: { equals: slug } }, limit: 1, depth: 0, overrideAccess: true });
  const c = res.docs[0];
  if (!c) notFound();

  if (!classroomReady()) {
    return (
      <main id="main-content" className="section" style={{ paddingTop: 140, textAlign: 'center' }}>
        <h1>The classroom server is not connected yet</h1>
        <p>Set CLASSROOM_DOMAIN and CLASSROOM_APP_SECRET on the website server.</p>
      </main>
    );
  }

  const u = user as { id: string | number; name?: string; email?: string };
  const end = new Date(c.startsAt as string).getTime() + (((c.durationMins as number) || 120) + 60) * 60_000;
  const expiresAt = Math.max(end, Date.now() + 4 * 60 * 60_000);
  const name = u.name?.trim() || 'Teacher';
  const token = classToken({ name, id: `teacher-${u.id}`, email: u.email, teacher: true, room: String(c.room), expiresAt });

  return (
    <main id="main-content">
      <ClassRoom teacher title={c.title as string} pass={{ domain: CLASSROOM_DOMAIN, name: String(c.room), token, displayName: name }} />
    </main>
  );
}
