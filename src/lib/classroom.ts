import { createHmac, randomUUID } from 'crypto';

/* MrSEO Classroom: our own Jitsi server (class.mrseo.pk) that only accepts
   people the website signs in. The website issues a short-lived token per person;
   the server rejects anyone without one. */

export const CLASSROOM_DOMAIN = (process.env.CLASSROOM_DOMAIN || '').replace(/^https?:\/\//, '').replace(/\/$/, '');
const APP_ID = process.env.CLASSROOM_APP_ID || 'mrseo';
const SECRET = process.env.CLASSROOM_APP_SECRET || '';

export const classroomReady = () => Boolean(CLASSROOM_DOMAIN && SECRET);

const b64 = (v: string | Buffer) => Buffer.from(v).toString('base64url');

type Person = { name: string; id?: string; email?: string; teacher: boolean; room: string; expiresAt: number };

/** Signs the HS256 token the Jitsi server checks (room-bound, expires after the class). */
export function classToken(p: Person): string {
  const now = Math.floor(Date.now() / 1000);
  const body = {
    aud: 'jitsi',
    iss: APP_ID,
    sub: CLASSROOM_DOMAIN,
    room: p.room.toLowerCase(),
    nbf: now - 60,
    exp: Math.floor(p.expiresAt / 1000),
    context: {
      user: {
        id: p.id || randomUUID(),
        name: p.name,
        email: p.email,
        moderator: p.teacher,
        affiliation: p.teacher ? 'owner' : 'member',
      },
    },
  };
  const unsigned = `${b64(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))}.${b64(JSON.stringify(body))}`;
  return `${unsigned}.${createHmac('sha256', SECRET).update(unsigned).digest('base64url')}`;
}

/** Small in-memory guard against guessing access codes. */
const attempts = new Map<string, { n: number; until: number }>();
export function tooManyAttempts(ip: string): boolean {
  const a = attempts.get(ip);
  return Boolean(a && a.until > Date.now() && a.n >= 8);
}
export function noteFailedAttempt(ip: string) {
  const now = Date.now();
  const a = attempts.get(ip);
  if (!a || a.until < now) attempts.set(ip, { n: 1, until: now + 15 * 60_000 });
  else a.n += 1;
  if (attempts.size > 5000) for (const [k, v] of attempts) if (v.until < now) attempts.delete(k);
}

/** Every class runs at least 2 hours, whatever duration is set in admin. */
export const MIN_CLASS_MINUTES = 120;
export function classWindow(startsAt: string, durationMins?: number | null) {
  const start = new Date(startsAt).getTime();
  const mins = Math.max(durationMins || 0, MIN_CLASS_MINUTES);
  const end = start + mins * 60_000;
  return { start, mins, end, opens: start - 30 * 60_000, closes: end + 60 * 60_000 };
}
