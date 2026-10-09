import type { PostInput } from '@/lib/blog';
import { EXTRAS, META } from './extras';
import { DEEP } from './deep';
import { PART1 } from './part1';
import { PART2 } from './part2';
import { PART3 } from './part3';
import { PART4 } from './part4';
import { PART5 } from './part5';
import { PART6 } from './part6';
import { PART7 } from './part7';
import { PART8 } from './part8';
import { PART9 } from './part9';

/* Extra and deep-dive sections go in before each post's closing paragraph and sources. */
function withExtras(p: PostInput): PostInput {
  const extra = [...(EXTRAS[p.slug] ?? []), ...(DEEP[p.slug]?.blocks ?? [])];
  const body = extra.length ? [...p.body.slice(0, -2), ...extra, ...p.body.slice(-2)] : p.body;
  const faqs = [...p.faqs, ...(DEEP[p.slug]?.faqs ?? [])];
  return { ...p, body, faqs, metaDescription: META[p.slug] ?? p.metaDescription, updatedAt: DEEP[p.slug]?.updatedAt ?? p.updatedAt };
}

/* Posts publish in this order, one every SCHEDULE_GAP_HOURS from SCHEDULE_START (src/lib/blog.ts). */
export const POSTS: PostInput[] = [...PART1, ...PART2, ...PART3, ...PART4, ...PART5, ...PART6, ...PART7, ...PART8, ...PART9].map(withExtras);
