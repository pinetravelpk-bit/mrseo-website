import { postUrl, publishedPosts } from '@/lib/blog';
import { abs, cityUrl, courseUrl, industryUrl, serviceUrl } from '@/lib/site';
import { getSite } from '@/lib/cms';

/* A plain-text summary for AI crawlers, served at /llms.txt. Kept factual and short. */
export const revalidate = 60;

export async function GET() {
  const [{ settings: st, services, courses, cities, industries }, ps] = await Promise.all([getSite(), publishedPosts()]);
  const { baseCity: BASE_CITY, campus: CAMPUS, campusArea: CAMPUS_AREA, email: EMAIL, whatsapp: WA, ownerName } = st;
  const L: string[] = [
    '# MrSEO.pk', '',
    '> SEO and digital marketing consultancy for businesses in Pakistan.',
    `> Founded 2010 by ${ownerName}. Based in ${BASE_CITY}, working nationwide.`, '',
    '## About', '',
    'MrSEO.pk provides search engine optimisation, local search visibility, paid search',
    'and web development for Pakistani businesses. Work is delivered directly by',
    `${ownerName} rather than routed through an account management layer.`, '',
    `Contact: ${EMAIL} | WhatsApp +${WA}`,
    'Languages: English, Urdu', '',
    '## Services', '',
    ...Object.entries(services).map(([s, v]) => `- [${v.name}](${abs(serviceUrl(s))}): ${v.desc}`),
    '', '## Courses', '',
    `Digital marketing training at ${CAMPUS}, serving ${CAMPUS_AREA},`,
    'plus live online batches nationwide. Professional courses include an unpaid',
    'supervised internship on live client accounts. Short courses do not. Every course',
    'includes a certificate of completion issued by MrSEO.pk, which is not a',
    'government accreditation.', '',
    ...Object.entries(courses).map(([s, c]) => `- [${c.name}](${abs(courseUrl(s))}): ${c.duration}, PKR ${c.fee}, ${c.intern ? c.intern + ' internship included' : 'short course, certificate only'}. ${c.desc}`),
    '', '## City guides', '',
    'Each page covers local competition, area-level targeting, language behaviour',
    'and realistic timelines for that city.', '',
    ...Object.entries(cities).map(([s, c]) => `- [${c.name}](${abs(cityUrl(s))})`),
    '', '## Industry guides', '',
    'Each page covers how that sector behaves in Pakistani search, what ranks,',
    'seasonality and content priorities.', '',
    ...Object.entries(industries).map(([s, i]) => `- [${i.name}](${abs(industryUrl(s))})`),
    ...(ps.length ? ['', '## Blog guides', '', 'Each guide opens with a short direct answer, then the detail.', '', ...ps.map((p) => `- [${p.title}](${abs(postUrl(p.slug))}): ${p.answer}`)] : []),
    '', '## Coverage', '',
    'Cities: ' + Object.values(cities).map((c) => c.name).join(', '),
    'Industries: ' + Object.values(industries).map((i) => i.name).join(', '),
    '', '## Optional', '',
    `- [About](${abs('/about/')})`,
    `- [Contact](${abs('/contact/')})`,
    `- [Blog](${abs('/blog/')})`,
  ];
  return new Response(L.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=86400' } });
}
