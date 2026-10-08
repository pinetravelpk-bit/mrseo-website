import type { Faq } from './site';
import { anchor } from './anchor';
import { POSTS } from '@/content/blog';

/* ==========================================================================
   Blog engine
   Posts are structured data (src/content/blog). Each post publishes itself at
   its scheduled time: pages render only posts whose publishAt has passed, and
   the blog routes revalidate every minute, so nothing needs to be deployed
   when a post goes live.
   ========================================================================== */

/** First post goes live at this time; each following post 2 hours later. Pakistan time (UTC+5). */
export const SCHEDULE_START = '2026-10-09T01:00:00+05:00';
export const SCHEDULE_GAP_HOURS = 2;

export type Accent = 'green' | 'blue' | 'teal' | 'amber' | 'violet' | 'rose';

export type Block =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'list'; items: string[]; ordered?: boolean }
  | { type: 'callout'; tone: 'tip' | 'warn' | 'note'; title?: string; text: string }
  | { type: 'slides'; title: string; slides: { title: string; points: string[] }[] }
  | { type: 'video'; title: string; steps: { title: string; text: string }[] }
  | { type: 'stats'; title: string; items: { value: string; label: string }[] }
  | { type: 'bars'; title: string; items: { label: string; value: number; display?: string }[]; note?: string }
  | { type: 'process'; title: string; steps: { title: string; text?: string }[] }
  | { type: 'compare'; title: string; left: { label: string; items: string[] }; right: { label: string; items: string[] } }
  | { type: 'checklist'; title: string; items: string[] }
  | { type: 'table'; caption?: string; head: string[]; rows: string[][] }
  | { type: 'quote'; text: string; cite?: string }
  | { type: 'sources'; items: { label: string; href: string }[] };

export type PostInput = {
  slug: string;
  title: string;
  keyword: string;
  description: string;
  /** Meta description for search results, 155 characters or fewer. Falls back to description. */
  metaDescription?: string;
  category: string;
  icon: string;
  accent: Accent;
  /** 40â€“60 word direct answer, placed first for featured snippets and AI answers. */
  answer: string;
  takeaways: string[];
  body: Block[];
  faqs: Faq[];
  related?: { label: string; href: string }[];
  /** Date the content was last substantially updated (ISO). Used for dateModified once later than publishAt. */
  updatedAt?: string;
  /** Optional manual override of the scheduled time (ISO string). */
  publishAt?: string;
};

export type Post = PostInput & { index: number; publishAt: string; readMins: number; words: number; toc: { id: string; label: string }[] };

function wordsIn(p: PostInput) {
  const parts: string[] = [p.answer, ...p.takeaways, ...p.faqs.flatMap((f) => [f.q, f.a])];
  for (const b of p.body) {
    if ('text' in b) parts.push(b.text);
    if (b.type === 'list' || b.type === 'checklist') parts.push(...b.items);
    if (b.type === 'slides') b.slides.forEach((s) => parts.push(s.title, ...s.points));
    if (b.type === 'video') b.steps.forEach((s) => parts.push(s.title, s.text));
    if (b.type === 'process') b.steps.forEach((s) => parts.push(s.title, s.text ?? ''));
    if (b.type === 'compare') parts.push(b.left.label, b.right.label, ...b.left.items, ...b.right.items);
    if (b.type === 'stats') b.items.forEach((x) => parts.push(x.value, x.label));
    if (b.type === 'bars') b.items.forEach((x) => parts.push(x.label));
    if ('title' in b && typeof b.title === 'string') parts.push(b.title);
    if (b.type === 'table') b.rows.forEach((r) => parts.push(...r));
  }
  return parts.join(' ').split(/\s+/).filter(Boolean).length;
}

const start = new Date(SCHEDULE_START).getTime();

export const ALL_POSTS: Post[] = POSTS.map((p, i) => {
  const words = wordsIn(p);
  return {
    ...p,
    index: i,
    publishAt: p.publishAt ?? new Date(start + i * SCHEDULE_GAP_HOURS * 3600_000).toISOString(),
    words,
    readMins: Math.max(3, Math.round(words / 220)),
    toc: p.body.filter((b): b is { type: 'h2'; text: string } => b.type === 'h2').map((b) => ({ id: anchor(b.text), label: b.text })),
  };
});

/** BLOG_PREVIEW=1 shows every post regardless of schedule (local preview only, never set it in production). */
const PREVIEW = process.env.BLOG_PREVIEW === '1';
/** dateModified: the later of publish time and last update. */
export const modifiedAt = (p: Post) => (p.updatedAt && p.updatedAt > p.publishAt ? p.updatedAt : p.publishAt);

export const isPublished = (p: Post, now = Date.now()) => PREVIEW || new Date(p.publishAt).getTime() <= now;

/** Published posts, newest first. */
export function publishedPosts(now = Date.now()) {
  return ALL_POSTS.filter((p) => isPublished(p, now)).sort((a, b) => b.publishAt.localeCompare(a.publishAt));
}

export const postBySlug = (slug: string) => ALL_POSTS.find((p) => p.slug === slug);
export const postUrl = (slug: string) => `/blog/${slug}/`;
export const postImage = (slug: string) => `/blog-images/${slug}.png`;

export function relatedPosts(post: Post, n = 3, now = Date.now()) {
  const pool = publishedPosts(now).filter((p) => p.slug !== post.slug);
  const same = pool.filter((p) => p.category === post.category);
  return [...same, ...pool.filter((p) => p.category !== post.category)].slice(0, n);
}

export const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Karachi' });

export const ACCENTS: Record<Accent, { hex: string; soft: string }> = {
  green: { hex: '#3dc43d', soft: 'rgba(61,196,61,.14)' },
  blue: { hex: '#5b9bff', soft: 'rgba(91,155,255,.14)' },
  teal: { hex: '#2dd4bf', soft: 'rgba(45,212,191,.14)' },
  amber: { hex: '#f5b84b', soft: 'rgba(245,184,75,.14)' },
  violet: { hex: '#a78bfa', soft: 'rgba(167,139,250,.14)' },
  rose: { hex: '#fb7185', soft: 'rgba(251,113,133,.14)' },
};
