/* Shared types and URL helpers. All content and contact details are managed in
   the admin (/admin) and loaded through src/lib/cms.ts. */

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://mrseo.pk').replace(/\/$/, '');

export type Faq = { q: string; a: string };
export type Section = { h2: string; html: string };
export type LongContent = { quick?: string; sections: Section[]; faqs: Faq[] };
export type Include = { icon: string; t: string; d: string };
type Seo = { metaTitle?: string; metaDescription?: string };

export type City = { slug: string; name: string; icon: string; urdu: string; note: string; pop: string; clients: string; comp: string; content: LongContent } & Seo;
export type Industry = { slug: string; name: string; icon: string; urdu: string; desc: string; kws: string[]; stats: string[]; content: LongContent } & Seo;
export type Service = { slug: string; name: string; icon: string; sub: string; desc: string; content: LongContent } & Seo;
export type Course = {
  slug: string; name: string; icon: string; tier: 'pro' | 'short'; sub: string; short: string; desc: string;
  duration: string; hours: string; level: string; mode: string; fee: string; fee_note: string; seats: string;
  intern: string; schedule: string; tools: string[]; outcomes: string[]; content: LongContent;
} & Seo;

export const entries = <T,>(o: Record<string, T>) => Object.entries(o) as [string, T][];

export function coursesByTier(courses: Record<string, Course>, tier: 'pro' | 'short') {
  return entries(courses).filter(([, c]) => (c.tier ?? 'pro') === tier);
}

/* URLs match the WordPress permalinks so existing rankings carry over. */
export const cityUrl = (slug: string) => `/seo-expert/seo-expert-${slug}/`;
export const industryUrl = (slug: string) => `/seo-for/seo-for-${slug}/`;
export const serviceUrl = (slug: string) => `/services/${slug}/`;
export const courseUrl = (slug: string) => `/courses/${slug}/`;

/** WhatsApp chat link for a number in international format without "+". */
export const waLink = (wa: string, text?: string) => `https://wa.me/${wa}` + (text ? `?text=${encodeURIComponent(text)}` : '');
export const abs = (p: string) => SITE_URL + (p.startsWith('/') ? p : '/' + p);

/** Splits "Get found on Google *across Pakistan*" into plain and highlighted parts. */
export function highlightParts(s: string | null | undefined): { text: string; hl: boolean }[] {
  return (s ?? '').split(/\*([^*]+)\*/g).map((text, i) => ({ text, hl: i % 2 === 1 })).filter((p) => p.text);
}

const WORDS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty'];
/** 6 -> "six", for counts written into copy. */
export const numWord = (n: number) => WORDS[n] ?? String(n);
