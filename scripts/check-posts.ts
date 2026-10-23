/* Quality checks for the course blog series before import.
   Run: npx tsx scripts/check-posts.ts */
import { readFileSync } from 'node:fs';
import { COURSE_POSTS } from './seed-data/courses-blog/index';
import { ICON_NODES } from '../src/components/blog/iconNodes';
import type { PostInput } from '../src/lib/blog';

const COURSE_SLUGS = Object.keys(JSON.parse(readFileSync('scripts/seed-data/generated/courses.json', 'utf8')));
const OLD_POSTS = ['how-to-become-seo-expert-pakistan', 'seo-expert-salary-pakistan', 'ai-seo-expert', 'seo-for-chatgpt-and-google-ai-search', 'best-seo-expert-in-islamabad', 'local-seo-expert-islamabad', 'wordpress-seo-expert', 'seo-expert-vs-digital-marketing-expert'];
const routes = new Set<string>([
  '/', '/about/', '/contact/', '/services/', '/courses/', '/seo-expert/', '/seo-for/', '/blog/', '/case-studies/',
  ...COURSE_SLUGS.map((s) => `/courses/${s}/`), ...['seo', 'ppc', 'social-media', 'web-design', 'local-seo', 'content'].map((s) => `/services/${s}/`),
  ...OLD_POSTS.map((s) => `/blog/${s}/`), ...COURSE_POSTS.map((p) => `/blog/${p.slug}/`),
]);

function words(p: PostInput) {
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

const problems: string[] = [];
const slugs = new Set<string>(), kws = new Set<string>(), titles = new Set<string>();
let total = 0, min = Infinity;
for (const [i, p] of COURSE_POSTS.entries()) {
  const tag = `#${i + 1} ${p.slug}`;
  if (slugs.has(p.slug)) problems.push(`${tag}: duplicate slug`); slugs.add(p.slug);
  if (kws.has(p.keyword.toLowerCase())) problems.push(`${tag}: duplicate keyword`); kws.add(p.keyword.toLowerCase());
  if (titles.has(p.title)) problems.push(`${tag}: duplicate title`); titles.add(p.title);
  if (OLD_POSTS.includes(p.slug)) problems.push(`${tag}: slug already used by an older post`);
  if (!ICON_NODES[p.icon]) problems.push(`${tag}: unknown icon ${p.icon}`);
  const types = new Set(p.body.map((b) => b.type));
  for (const t of ['slides', 'video', 'sources']) if (!types.has(t as never)) problems.push(`${tag}: missing ${t}`);
  if (!['stats', 'bars', 'process', 'compare', 'checklist', 'table'].some((t) => types.has(t as never))) problems.push(`${tag}: no infographic`);
  if (p.body.filter((b) => b.type === 'h2').length < 4) problems.push(`${tag}: fewer than 4 H2 sections`);
  if (p.faqs.length < 4) problems.push(`${tag}: fewer than 4 FAQs`);
  const aw = p.answer.split(/\s+/).length;
  if (aw < 35 || aw > 75) problems.push(`${tag}: quick answer is ${aw} words`);
  const md = p.metaDescription ?? p.description;
  if (md.length > 160) problems.push(`${tag}: meta description ${md.length} chars`);
  if (p.title.length > 70) problems.push(`${tag}: title ${p.title.length} chars`);
  if (!p.title.toLowerCase().includes(p.keyword.toLowerCase().split(' ').slice(0, 2).join(' '))) problems.push(`${tag}: title may not contain keyword`);
  const text = JSON.stringify(p);
  for (const m of text.matchAll(/\]\((\/[^)]*)\)/g)) if (!routes.has(m[1])) problems.push(`${tag}: broken inline link ${m[1]}`);
  for (const r of p.related ?? []) if (r.href.startsWith('/') && !routes.has(r.href)) problems.push(`${tag}: broken related link ${r.href}`);
  if (/Karachi based|based in Karachi/i.test(text)) problems.push(`${tag}: says Karachi based`);
  const w = words(p);
  total += w; min = Math.min(min, w);
  if (w < 1000) problems.push(`${tag}: only ${w} words`);
  console.log(`${String(i + 1).padStart(2)} ${String(w).padStart(5)}w  ${p.slug}`);
}
console.log(`\n${COURSE_POSTS.length} posts, ${total} words, shortest ${min}`);
console.log(problems.length ? `\n${problems.length} problem(s):\n` + problems.join('\n') : '\nAll checks passed.');
process.exit(problems.length ? 1 : 0);
