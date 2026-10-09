import 'server-only';
import { cache } from 'react';
import { getPayload } from 'payload';
import { convertLexicalToHTML } from '@payloadcms/richtext-lexical/html';
import config from '@payload-config';
import type { City, Course, Faq, Industry, LongContent, Service } from './site';
import type { Block, PostInput } from './blog';

/* Data layer: everything the frontend shows comes from the admin (Payload CMS)
   through these functions, converted into the shapes the components expect. */

export const cms = cache(() => getPayload({ config }));

/* eslint-disable @typescript-eslint/no-explicit-any */
type Doc = Record<string, any>;

export const texts = (list?: { text?: string | null }[] | null) => (list ?? []).map((i) => i.text ?? '');
export const faqs = (list?: Doc[] | null): Faq[] => (list ?? []).map((f) => ({ q: f.q, a: f.a }));
export const richHtml = (data: any) => {
  if (!data?.root) return '';
  try {
    // Drop the empty attributes the converter adds so the markup matches hand-written HTML.
    return convertLexicalToHTML({ data, disableContainer: true })
      .replace(/\s+(class|style)=""/g, '')
      .replace(/(<li)\s+value="\d+"/g, '$1')
      .replace(/<li\s*>/g, '<li>');
  } catch {
    return '';
  }
};

const longContent = (d: Doc): LongContent => ({
  quick: d.quick || undefined,
  sections: (d.sections ?? []).map((s: Doc) => ({ h2: s.heading, html: richHtml(s.content) })),
  faqs: faqs(d.faqs),
});

const seo = (d: Doc) => ({ metaTitle: d.metaTitle || undefined, metaDescription: d.metaDescription || undefined });

async function all(collection: 'services' | 'courses' | 'cities' | 'industries' | 'testimonials') {
  const payload = await cms();
  const res = await payload.find({ collection, limit: 500, sort: 'order', depth: 0, pagination: false });
  return res.docs as Doc[];
}

export type Settings = {
  ownerName: string; brandTagline: string; email: string; whatsapp: string; phone: string;
  baseCity: string; baseRegion: string; campus: string; campusCity: string; campusArea: string; officeHours: string;
  yearsExperience: string; websitesRanked: string; clientsServed: string;
  footerText: string; authorBio: string; whatsappMessage: string; defaultMetaDescription: string;
  socials: { platform: string; url: string }[]; founderSameAs: string[];
};

export type SiteData = {
  settings: Settings;
  services: Record<string, Service>;
  courses: Record<string, Course>;
  cities: Record<string, City>;
  industries: Record<string, Industry>;
};

const keyed = <T,>(docs: Doc[], map: (d: Doc) => T) => Object.fromEntries(docs.map((d) => [d.slug as string, map(d)])) as Record<string, T>;

/** Settings plus the four business collections. Cached per request. */
export const getSite = cache(async (): Promise<SiteData> => {
  const payload = await cms();
  const [s, services, courses, cities, industries] = await Promise.all([
    payload.findGlobal({ slug: 'settings', depth: 0 }) as Promise<Doc>,
    all('services'), all('courses'), all('cities'), all('industries'),
  ]);
  const settings: Settings = {
    ownerName: s.ownerName || 'Syed Mudassir Shah', brandTagline: s.brandTagline || '', email: s.email || '', whatsapp: (s.whatsapp || '').replace(/\D/g, ''),
    phone: s.phone || '', baseCity: s.baseCity || 'Islamabad', baseRegion: s.baseRegion || '', campus: s.campus || '', campusCity: s.campusCity || '',
    campusArea: s.campusArea || '', officeHours: s.officeHours || '', yearsExperience: s.yearsExperience || '', websitesRanked: s.websitesRanked || '',
    clientsServed: s.clientsServed || '', footerText: s.footerText || '', authorBio: s.authorBio || '', whatsappMessage: s.whatsappMessage || '',
    defaultMetaDescription: s.defaultMetaDescription || '', socials: (s.socials ?? []).map((x: Doc) => ({ platform: x.platform, url: x.url })),
    founderSameAs: (s.founderSameAs ?? []).map((x: Doc) => x.url),
  };
  return {
    settings,
    services: keyed(services, (d) => ({ slug: d.slug, name: d.name, icon: d.icon || `svc:${d.slug}`, sub: d.sub || '', desc: d.desc || '', content: longContent(d), ...seo(d) })),
    courses: keyed(courses, (d) => ({
      slug: d.slug, name: d.name, icon: d.icon || `course:${d.slug}`, tier: d.tier || 'pro', sub: d.sub || '', short: d.short || '', desc: d.desc || '',
      duration: d.duration || '', hours: d.hours || '', level: d.level || '', mode: d.mode || '', fee: d.fee || '', fee_note: d.fee_note || '',
      seats: d.seats || '', intern: d.intern || '', schedule: d.schedule || '', tools: texts(d.tools), outcomes: texts(d.outcomes),
      content: longContent(d), ...seo(d),
    })),
    cities: keyed(cities, (d) => ({
      slug: d.slug, name: d.name, icon: d.icon || `city:${d.slug}`, urdu: d.urdu || '', note: d.note || '', pop: d.pop || '', clients: d.clients || '',
      comp: d.comp || '', content: longContent(d), ...seo(d),
    })),
    industries: keyed(industries, (d) => ({
      slug: d.slug, name: d.name, icon: d.icon || `ind:${d.slug}`, urdu: d.urdu || '', desc: d.desc || '', kws: texts(d.kws), stats: texts(d.stats),
      content: longContent(d), ...seo(d),
    })),
  };
});

export const getGlobal = cache(async (slug: 'home' | 'about' | 'contact-page' | 'courses-page' | 'hub-pages'): Promise<Doc> => {
  const payload = await cms();
  return (await payload.findGlobal({ slug, depth: 1 })) as unknown as Doc;
});

export const getTestimonials = cache(async () => (await all('testimonials')).map((t) => ({ name: t.name, text: t.text, role: t.role, city: t.city })));

/* ---------- Blog ---------- */

function fromBlock(b: Doc): Block {
  switch (b.blockType) {
    case 'paragraph': return { type: 'p', text: b.text ?? '' };
    case 'heading2': return { type: 'h2', text: b.text ?? '' };
    case 'heading3': return { type: 'h3', text: b.text ?? '' };
    case 'list': return { type: 'list', ordered: !!b.ordered, items: texts(b.items) };
    case 'callout': return { type: 'callout', tone: b.tone ?? 'note', title: b.title || undefined, text: b.text ?? '' };
    case 'slides': return { type: 'slides', title: b.title ?? '', slides: (b.slides ?? []).map((s: Doc) => ({ title: s.title, points: texts(s.points) })) };
    case 'video': return { type: 'video', title: b.title ?? '', steps: (b.steps ?? []).map((s: Doc) => ({ title: s.title, text: s.text ?? '' })) };
    case 'stats': return { type: 'stats', title: b.title ?? '', items: (b.items ?? []).map((s: Doc) => ({ value: s.value, label: s.label })) };
    case 'bars': return { type: 'bars', title: b.title ?? '', note: b.note || undefined, items: (b.items ?? []).map((s: Doc) => ({ label: s.label, value: Number(s.value) || 0, display: s.display || undefined })) };
    case 'process': return { type: 'process', title: b.title ?? '', steps: (b.steps ?? []).map((s: Doc) => ({ title: s.title, text: s.text || undefined })) };
    case 'compare': return { type: 'compare', title: b.title ?? '', left: { label: b.leftLabel ?? '', items: texts(b.leftItems) }, right: { label: b.rightLabel ?? '', items: texts(b.rightItems) } };
    case 'checklist': return { type: 'checklist', title: b.title ?? '', items: texts(b.items) };
    case 'table': return { type: 'table', caption: b.caption || undefined, head: texts(b.head), rows: (b.rows ?? []).map((r: Doc) => texts(r.cells)) };
    case 'quote': return { type: 'quote', text: b.text ?? '', cite: b.cite || undefined };
    case 'sources': return { type: 'sources', items: (b.items ?? []).map((s: Doc) => ({ label: s.label, href: s.href })) };
    default: return { type: 'p', text: '' };
  }
}

export type PostRecord = PostInput & { publishAt: string; hidden: boolean; image?: { url: string; width?: number; height?: number; alt?: string } };

/** Every post, oldest first (the order they were scheduled in). */
export const getPostRecords = cache(async (): Promise<PostRecord[]> => {
  const payload = await cms();
  const res = await payload.find({ collection: 'posts', limit: 1000, sort: 'publishAt', depth: 1, pagination: false });
  return (res.docs as Doc[]).map((d) => ({
    slug: d.slug, title: d.title, keyword: d.keyword, description: d.description, metaDescription: d.metaDescription || undefined,
    category: d.category, icon: d.icon, accent: d.accent, answer: d.answer, takeaways: texts(d.takeaways),
    body: (d.body ?? []).map(fromBlock), faqs: faqs(d.faqs), related: (d.related ?? []).map((r: Doc) => ({ label: r.label, href: r.href })),
    updatedAt: d.contentUpdatedAt || undefined, publishAt: new Date(d.publishAt).toISOString(), hidden: !!d.hideFromSite,
    image: d.featureImage && typeof d.featureImage === 'object' && d.featureImage.url
      ? { url: d.featureImage.url, width: d.featureImage.width, height: d.featureImage.height, alt: d.featureImage.alt }
      : undefined,
  }));
});

/* ---------- Extra pages and case studies ---------- */

export const getPage = cache(async (slug: string) => {
  const payload = await cms();
  const res = await payload.find({ collection: 'pages', where: { slug: { equals: slug }, published: { equals: true } }, limit: 1, depth: 1 });
  const d = res.docs[0] as Doc | undefined;
  return d ? { slug: d.slug, title: d.title, intro: d.intro || '', noindex: !!d.noindex, content: longContent(d), ...seo(d) } : null;
});

export const getCaseStudies = cache(async () => {
  const payload = await cms();
  const res = await payload.find({ collection: 'case-studies', where: { published: { equals: true } }, sort: 'order', limit: 200, depth: 1, pagination: false });
  return (res.docs as Doc[]).map((d) => ({
    slug: d.slug as string, title: d.title as string, client: d.client || '', industry: d.industry || '', city: d.city || '', summary: d.summary || '',
    results: (d.results ?? []).map((r: Doc) => ({ value: r.value, label: r.label })) as { value: string; label: string }[],
    image: d.image && typeof d.image === 'object' && d.image.url ? { url: d.image.url as string, alt: (d.image.alt as string) || '' } : undefined,
    content: longContent(d), ...seo(d),
  }));
});
