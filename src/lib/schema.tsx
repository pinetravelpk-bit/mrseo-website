import { abs, type Course, courseUrl, type Faq } from './site';
import { getSite, type SiteData } from './cms';

/* Structured data, ported from the theme's fallback graph and Rank Math additions.
   No aggregateRating or review markup: self-serving reviews break Google's policy. */

const WIKIDATA: Record<string, string> = {
  Karachi: 'Q8660', Lahore: 'Q1143', Islamabad: 'Q1362', Rawalpindi: 'Q156240',
  Peshawar: 'Q5785', Quetta: 'Q188348', Faisalabad: 'Q156145', Multan: 'Q152662',
};

export function baseGraph({ settings: st, services, cities }: SiteData) {
  const home = abs('/');
  const { ownerName: OWNER, email: EMAIL, baseCity: BASE_CITY, baseRegion: BASE_REGION, campus: CAMPUS, campusCity: CAMPUS_CITY, campusArea: CAMPUS_AREA } = st;
  const tel = '+' + st.whatsapp.replace(/^(\d{2})(\d{3})(\d+)$/, '$1-$2-$3');
  return [
    {
      '@type': 'WebSite', '@id': home + '#website', url: home, name: 'MrSEO.pk', inLanguage: 'en-PK',
      description: 'SEO and digital marketing for Pakistani businesses.',
      publisher: { '@id': home + '#business' },
    },
    {
      '@type': ['LocalBusiness', 'ProfessionalService'], '@id': home + '#business', name: 'MrSEO.pk', url: home,
      logo: { '@type': 'ImageObject', url: abs('/logo.png'), width: 240, height: 60 },
      image: abs('/logo.png'),
      description: `SEO, local search and paid media for businesses across Pakistan. Founded by ${OWNER} in 2010.`,
      slogan: 'Straight answers about search in Pakistan',
      telephone: tel, email: EMAIL,
      address: { '@type': 'PostalAddress', addressCountry: 'PK', addressLocality: BASE_CITY, addressRegion: BASE_REGION },
      foundingDate: '2010', priceRange: '$$', currenciesAccepted: 'PKR', knowsLanguage: ['en', 'ur'],
      areaServed: Object.values(cities).map(({ name }) => ({ '@type': 'City', name, ...(WIKIDATA[name] ? { sameAs: 'https://www.wikidata.org/wiki/' + WIKIDATA[name] } : {}) })),
      hasOfferCatalog: {
        '@type': 'OfferCatalog', name: 'Services',
        itemListElement: Object.values(services).map((s) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: s.name, description: s.desc } })),
      },
      openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], opens: '09:00', closes: '22:00' }],
      founder: { '@id': home + '#owner' },
      department: [{ '@id': home + '#campus' }],
    },
    {
      '@type': ['EducationalOrganization', 'LocalBusiness'], '@id': home + '#campus',
      name: 'MrSEO.pk Digital Marketing Institute', url: abs('/courses/'),
      parentOrganization: { '@id': home + '#business' },
      description: `Digital marketing courses in ${CAMPUS}, serving students across ${CAMPUS_AREA}, plus live online batches nationwide.`,
      telephone: tel, email: EMAIL,
      address: { '@type': 'PostalAddress', streetAddress: CAMPUS, addressLocality: CAMPUS_CITY, addressRegion: 'Punjab', addressCountry: 'PK' },
      areaServed: [{ '@type': 'City', name: CAMPUS_CITY }, ...(CAMPUS_CITY === BASE_CITY ? [] : [{ '@type': 'City', name: BASE_CITY }]), { '@type': 'Country', name: 'Pakistan' }],
      knowsLanguage: ['en', 'ur'],
    },
    {
      '@type': 'Person', '@id': home + '#owner', name: OWNER, alternateName: 'Mudassir Shah', jobTitle: 'SEO consultant',
      worksFor: { '@id': home + '#business' }, url: abs('/about/'), image: abs('/logo.png'), knowsLanguage: ['en', 'ur'],
      homeLocation: { '@type': 'City', name: BASE_CITY },
      knowsAbout: ['Search engine optimisation', 'Technical SEO', 'Local SEO', 'Google Business Profile', 'Google Ads', 'Content marketing', 'E-commerce SEO', 'Web development', 'Digital marketing training'],
      description: `SEO consultant working on Pakistani search since 2010. Founder of MrSEO.pk, based in ${BASE_CITY} and working with businesses across Pakistan.`,
      sameAs: st.founderSameAs,
    },
  ];
}

export function faqSchema(faqs: Faq[]) {
  return faqs.length ? {
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  } : null;
}

export function breadcrumbSchema(items: [string, string][]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: [['Home', '/'] as [string, string], ...items].map(([name, url], i) => ({ '@type': 'ListItem', position: i + 1, name, item: abs(url) })),
  };
}

export function serviceSchema(name: string, serviceType: string, description: string, url: string, area: object) {
  return { '@type': 'Service', name, provider: { '@id': abs('/#business') }, areaServed: area, serviceType, description, url: abs(url) };
}

export function courseSchema(c: Course, campus: { campus: string; campusCity: string }) {
  const { campus: CAMPUS, campusCity: CAMPUS_CITY } = campus;
  const url = abs(courseUrl(c.slug));
  const weeks = Math.max(parseInt(c.duration, 10) || 1, 1);
  return {
    '@type': 'Course', '@id': url + '#course', name: `${c.name} in ${CAMPUS_CITY}`, description: c.desc, url,
    inLanguage: 'en-PK', provider: { '@id': abs('/#campus') }, educationalLevel: c.level, teaches: c.outcomes,
    educationalCredentialAwarded: { '@type': 'EducationalOccupationalCredential', name: 'Certificate of completion', credentialCategory: 'Certificate', recognizedBy: { '@id': abs('/#business') } },
    offers: { '@type': 'Offer', category: 'Paid', price: Number(c.fee.replace(/[^d.]/g, '')) || 0, priceCurrency: 'PKR', availability: 'https://schema.org/InStock', url: url + '#enroll' },
    hasCourseInstance: [
      {
        '@type': 'CourseInstance', courseMode: 'Onsite', courseWorkload: `P${weeks}W`,
        location: { '@type': 'Place', name: 'MrSEO.pk, ' + CAMPUS, address: { '@type': 'PostalAddress', streetAddress: CAMPUS, addressLocality: CAMPUS_CITY, addressRegion: 'Punjab', addressCountry: 'PK' } },
        instructor: { '@id': abs('/#owner') },
      },
      { '@type': 'CourseInstance', courseMode: 'Online', courseWorkload: `P${weeks}W`, instructor: { '@id': abs('/#owner') } },
    ],
  };
}

/** Speakable markup so voice assistants and AI summarisers find the answer block. */
export function speakable(url: string) {
  return { '@type': 'WebPage', url: abs(url), speakable: { '@type': 'SpeakableSpecification', cssSelector: ['.hero-h1', '.loc-h1', '.answer-text', '.hero-desc'] } };
}

export async function JsonLd({ items }: { items: (object | null | undefined)[] }) {
  const graph = [...baseGraph(await getSite()), ...items.filter(Boolean)];
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c') }}
    />
  );
}

