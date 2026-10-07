import citiesJson from '@/data/generated/cities.json';
import industriesJson from '@/data/generated/industries.json';
import servicesJson from '@/data/generated/services.json';
import coursesJson from '@/data/generated/courses.json';
import includesJson from '@/data/generated/course-includes.json';
import cityContentJson from '@/data/generated/city-content.json';
import industryContentJson from '@/data/generated/industry-content.json';
import serviceContentJson from '@/data/generated/service-content.json';
import courseContentJson from '@/data/generated/course-content.json';
import faqsJson from '@/data/generated/faqs.json';

/* Owner and contact details. Change once here. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://mrseo.pk').replace(/\/$/, '');
export const OWNER = 'Syed Mudassir Shah';
export const EMAIL = 'seosyed77@gmail.com';
export const WA = '923435853835';
export const PHONE = '+92 343 5853835';
export const SITES = '50+';

/* Where Syed Mudassir Shah and the consultancy are based. */
export const BASE_CITY = 'Islamabad';
export const BASE_REGION = 'Islamabad Capital Territory';

/* Training campus. The consultancy works nationwide, but classes are
   taught here, so every course page, schema block and form uses these. */
export const CAMPUS = 'Scheme 3, Rawalpindi';
export const CAMPUS_CITY = 'Rawalpindi';
export const CAMPUS_AREA = 'Rawalpindi and Islamabad';

export type City = { name: string; urdu: string; flag: string; note: string; pop: string; clients: string; comp: string; slug: string };
export type Industry = { name: string; urdu: string; icon: string; slug: string; desc: string; kws: string[]; stats: string[] };
export type Service = { name: string; icon: string; sub: string; desc: string };
export type Course = {
  name: string; icon: string; slug: string; tier: 'pro' | 'short'; sub: string; short: string; desc: string;
  duration: string; hours: string; level: string; mode: string; fee: string; fee_note: string; seats: string;
  intern: string; schedule: string; tools: string[]; outcomes: string[];
};
export type Faq = { q: string; a: string };
export type Section = { h2: string; html: string };
export type LongContent = { quick?: string; sections: Section[]; faqs: Faq[] };
export type Include = { icon: string; t: string; d: string };

export const cities = citiesJson as Record<string, City>;
export const industries = industriesJson as Record<string, Industry>;
export const services = servicesJson as Record<string, Service>;
export const courses = coursesJson as Record<string, Course>;
export const cityContent = cityContentJson as Record<string, LongContent>;
export const industryContent = industryContentJson as Record<string, LongContent>;
export const serviceContent = serviceContentJson as Record<string, LongContent>;
export const courseContent = courseContentJson as Record<string, LongContent>;
export const homeFaqs = faqsJson.home as Faq[];
export const contactFaqs = faqsJson.contact as Faq[];
export const coursesFaqs = faqsJson.courses as Faq[];

export const entries = <T,>(o: Record<string, T>) => Object.entries(o) as [string, T][];

export function coursesByTier(tier: 'pro' | 'short') {
  return entries(courses).filter(([, c]) => (c.tier ?? 'pro') === tier);
}
export function courseIncludes(tier: 'pro' | 'short' = 'pro'): Include[] {
  return (includesJson as { pro: Include[]; short: Include[] })[tier];
}

/* URLs match the WordPress permalinks so existing rankings carry over. */
export const cityUrl = (slug: string) => `/seo-expert/seo-expert-${slug}/`;
export const industryUrl = (slug: string) => `/seo-for/seo-for-${slug}/`;
export const serviceUrl = (slug: string) => `/services/${slug}/`;
export const courseUrl = (slug: string) => `/courses/${slug}/`;

export const waLink = (text?: string) => `https://wa.me/${WA}` + (text ? `?text=${encodeURIComponent(text)}` : '');
export const abs = (p: string) => SITE_URL + (p.startsWith('/') ? p : '/' + p);
