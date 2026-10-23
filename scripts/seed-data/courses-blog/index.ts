import type { PostInput } from '@/lib/blog';
import { C01 } from './c01';
import { C02 } from './c02';
import { C03 } from './c03';
import { C04 } from './c04';
import { C05 } from './c05';
import { C06 } from './c06';
import { C07 } from './c07';
import { C08 } from './c08';
import { C09 } from './c09';
import { C10 } from './c10';

/* Course and training blog series, in publishing order. */
export const COURSE_POSTS: PostInput[] = [...C01, ...C02, ...C03, ...C04, ...C05, ...C06, ...C07, ...C08, ...C09, ...C10];
