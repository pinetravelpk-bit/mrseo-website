import type { PostInput } from '@/lib/blog';
import { EXTRAS, META } from './extras';
import { PART1 } from './part1';
import { PART2 } from './part2';
import { PART3 } from './part3';
import { PART4 } from './part4';
import { PART5 } from './part5';
import { PART6 } from './part6';
import { PART7 } from './part7';
import { PART8 } from './part8';
import { PART9 } from './part9';

/* Extra sections go in before each post's closing paragraph and sources. */
function withExtras(p: PostInput): PostInput {
  const extra = EXTRAS[p.slug];
  const body = extra ? [...p.body.slice(0, -2), ...extra, ...p.body.slice(-2)] : p.body;
  return { ...p, body, metaDescription: META[p.slug] ?? p.metaDescription };
}

/* Posts publish in this order, one every SCHEDULE_GAP_HOURS from SCHEDULE_START (src/lib/blog.ts). */
export const POSTS: PostInput[] = [...PART1, ...PART2, ...PART3, ...PART4, ...PART5, ...PART6, ...PART7, ...PART8, ...PART9].map(withExtras);
