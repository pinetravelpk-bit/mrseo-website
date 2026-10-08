// Sanity checks for blog content. Run: npx tsx scripts/check-blog.ts
import { ALL_POSTS } from '../src/lib/blog';
import { ICON_NODES } from '../src/components/blog/iconNodes';
import { cities, courses, industries, services } from '../src/lib/site';

const routes = new Set<string>(['/', '/about/', '/contact/', '/services/', '/courses/', '/seo-expert/', '/seo-for/', '/blog/', '/case-studies/',
  ...Object.keys(services).map((s) => `/services/${s}/`), ...Object.keys(courses).map((s) => `/courses/${s}/`),
  ...Object.keys(cities).map((s) => `/seo-expert/seo-expert-${s}/`), ...Object.keys(industries).map((s) => `/seo-for/seo-for-${s}/`)]);

const problems: string[] = [];
const slugs = new Set<string>();
const kw = new Set<string>();
for (const p of ALL_POSTS) {
  const tag = `#${p.index + 1} ${p.slug}`;
  if (slugs.has(p.slug)) problems.push(`${tag}: duplicate slug`); slugs.add(p.slug);
  if (kw.has(p.keyword.toLowerCase())) problems.push(`${tag}: duplicate keyword`); kw.add(p.keyword.toLowerCase());
  if (!ICON_NODES[p.icon]) problems.push(`${tag}: unknown icon ${p.icon}`);
  const types = new Set(p.body.map((b) => b.type));
  for (const t of ['slides', 'video', 'sources']) if (!types.has(t as never)) problems.push(`${tag}: missing ${t}`);
  if (!['stats', 'bars', 'process', 'compare', 'checklist'].some((t) => types.has(t as never))) problems.push(`${tag}: no infographic`);
  const aw = p.answer.split(/\s+/).length; if (aw < 35 || aw > 75) problems.push(`${tag}: answer ${aw} words`);
  const md = p.metaDescription ?? p.description; if (md.length > 158) problems.push(`${tag}: meta description ${md.length} chars`);
  if (p.title.length > 70) problems.push(`${tag}: title ${p.title.length} chars`);
  if (p.words < 2000) problems.push(`${tag}: only ${p.words} words`);
  if (p.faqs.length < 4) problems.push(`${tag}: only ${p.faqs.length} faqs`);
  const text = JSON.stringify(p);
  for (const m of text.matchAll(/\]\((\/[^)]*)\)|"href":"(\/[^"]*)"/g)) { const h = (m[1] ?? m[2]).split('#')[0]; if (!routes.has(h)) problems.push(`${tag}: broken internal link ${h}`); }
}
console.log('posts', ALL_POSTS.length, 'words total', ALL_POSTS.reduce((a, p) => a + p.words, 0));
console.log(ALL_POSTS.map((p) => `${String(p.index + 1).padStart(2)} ${p.words}w ${p.readMins}m ${p.publishAt} ${p.slug}`).join('\n'));
console.log(problems.length ? 'PROBLEMS:\n' + problems.join('\n') : 'No problems found');
