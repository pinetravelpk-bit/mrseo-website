import type { Block } from '@/lib/blog';
import type { Faq } from '@/lib/site';
import { DEEP_A } from './deep-a';

export type Deep = { blocks: Block[]; faqs?: Faq[]; updatedAt?: string };

/* Deep-dive sections that take every post past 2,000 words. One file per batch. */
export const DEEP: Record<string, Deep> = { ...DEEP_A };
