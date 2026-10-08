import type { Block } from '@/lib/blog';
import type { Faq } from '@/lib/site';
import { DEEP_A } from './deep-a';
import { DEEP_B } from './deep-b';
import { DEEP_B2 } from './deep-b2';
import { DEEP_B3 } from './deep-b3';
import { DEEP_C } from './deep-c';
import { DEEP_C2 } from './deep-c2';
import { DEEP_C3 } from './deep-c3';
import { DEEP_C4 } from './deep-c4';
import { DEEP_D } from './deep-d';
import { DEEP_D2 } from './deep-d2';
import { DEEP_D3 } from './deep-d3';
import { DEEP_D4 } from './deep-d4';
import { DEEP_E } from './deep-e';
import { DEEP_E2 } from './deep-e2';
import { DEEP_E3 } from './deep-e3';
import { DEEP_E4 } from './deep-e4';

export type Deep = { blocks: Block[]; faqs?: Faq[]; updatedAt?: string };

/* Deep-dive sections that take every post past 2,000 words. Batches can add
   to the same post; their blocks and FAQs are combined in order. */
function merge(...sets: Record<string, Deep>[]): Record<string, Deep> {
  const out: Record<string, Deep> = {};
  for (const set of sets) {
    for (const [slug, d] of Object.entries(set)) {
      const prev = out[slug];
      out[slug] = prev
        ? { blocks: [...prev.blocks, ...d.blocks], faqs: [...(prev.faqs ?? []), ...(d.faqs ?? [])], updatedAt: d.updatedAt ?? prev.updatedAt }
        : d;
    }
  }
  return out;
}

export const DEEP: Record<string, Deep> = merge(DEEP_A, DEEP_B, DEEP_B2, DEEP_B3, DEEP_C, DEEP_C2, DEEP_C3, DEEP_C4, DEEP_D, DEEP_D2, DEEP_D3, DEEP_D4, DEEP_E, DEEP_E2, DEEP_E3, DEEP_E4);
