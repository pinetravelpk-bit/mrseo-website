/* One-time import of the site's existing content into the admin database.
   Run with: npm run seed   (add SEED_FORCE=1 to wipe and re-import content)
   Creates the first admin user if none exists and prints its password once. */
import { randomBytes } from 'node:crypto';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { getPayload } from 'payload';
import config from '../src/payload.config';
import { POSTS } from './seed-data/blog/index';
import { htmlToLexical, paragraphs } from '../src/cms/lexical';

type Faq = { q: string; a: string };
type Long = { quick?: string; sections: { h2: string; html: string }[]; faqs: Faq[] };
type AnyBlock = Record<string, any> & { type: string };

const json = (f: string) => JSON.parse(readFileSync(path.resolve(process.cwd(), 'scripts/seed-data/generated', f), 'utf8'));
const cities = json('cities.json'), industries = json('industries.json'), services = json('services.json'), courses = json('courses.json');
const cityContent = json('city-content.json'), industryContent = json('industry-content.json'), serviceContent = json('service-content.json'), courseContent = json('course-content.json');
const faqs = json('faqs.json'), includes = json('course-includes.json');

const SCHEDULE_START = '2026-10-09T01:00:00+05:00';
const GAP_HOURS = 2;
const ctx = { skipRevalidate: true };

const t = (s: string) => ({ text: s });
const long = (c?: Long) => ({
  quick: c?.quick ?? '',
  sections: (c?.sections ?? []).map((s) => ({ heading: s.h2, content: htmlToLexical(s.html) })),
  faqs: c?.faqs ?? [],
});

function toBlock(b: AnyBlock) {
  switch (b.type) {
    case 'p': return { blockType: 'paragraph', text: b.text };
    case 'h2': return { blockType: 'heading2', text: b.text };
    case 'h3': return { blockType: 'heading3', text: b.text };
    case 'list': return { blockType: 'list', ordered: !!b.ordered, items: b.items.map(t) };
    case 'callout': return { blockType: 'callout', tone: b.tone, title: b.title, text: b.text };
    case 'slides': return { blockType: 'slides', title: b.title, slides: b.slides.map((s: any) => ({ title: s.title, points: s.points.map(t) })) };
    case 'video': return { blockType: 'video', title: b.title, steps: b.steps };
    case 'stats': return { blockType: 'stats', title: b.title, items: b.items };
    case 'bars': return { blockType: 'bars', title: b.title, items: b.items, note: b.note };
    case 'process': return { blockType: 'process', title: b.title, steps: b.steps };
    case 'compare': return { blockType: 'compare', title: b.title, leftLabel: b.left.label, rightLabel: b.right.label, leftItems: b.left.items.map(t), rightItems: b.right.items.map(t) };
    case 'checklist': return { blockType: 'checklist', title: b.title, items: b.items.map(t) };
    case 'table': return { blockType: 'table', caption: b.caption, head: b.head.map(t), rows: b.rows.map((r: string[]) => ({ cells: r.map(t) })) };
    case 'quote': return { blockType: 'quote', text: b.text, cite: b.cite };
    case 'sources': return { blockType: 'sources', items: b.items };
    default: throw new Error('Unknown block type ' + b.type);
  }
}

const INCLUDE_ICONS: Record<string, string> = {
  'Free internship': 'briefcase', 'Free certificate': 'award', 'Portfolio you keep': 'folder', 'Written reference': 'file',
  'Session recordings': 'video', 'Small batches': 'users', 'Low fee, one payment': 'wallet', 'Two to three weeks': 'clock',
  'Work on your own project': 'hammer', 'Credit towards a full course': 'upgrade',
};
const includeCards = (list: { t: string; d: string }[]) => list.map((i) => ({ icon: INCLUDE_ICONS[i.t] ?? 'award', title: i.t, text: i.d }));
const stats = (pairs: [string, string][]) => pairs.map(([value, label]) => ({ value, label }));
const head = (eyebrow: string, title: string, sub?: string) => ({ eyebrow, title, sub });
const AUDIT_SUB = 'Send us your URL. You get a written breakdown within 24 hours, with problems ranked by what they are costing you. No obligation.';
const DEFAULT_DESC = 'Syed Mudassir Shah has worked on Pakistani search since 2010. SEO, local visibility and paid search for businesses in Karachi, Lahore, Islamabad and across the country. Free audit within 24 hours.';

async function main() {
  const payload = await getPayload({ config });
  const force = process.env.SEED_FORCE === '1';

  const existing = await payload.count({ collection: 'posts' });
  if (existing.totalDocs > 0 && !force) {
    payload.logger.info('Content already imported. Set SEED_FORCE=1 to wipe and re-import.');
  } else {
    for (const c of ['posts', 'services', 'courses', 'cities', 'industries', 'pages'] as const) {
      await payload.delete({ collection: c, where: { id: { exists: true } }, context: ctx });
    }

    let order = 0;
    for (const [slug, s] of Object.entries<any>(services)) {
      await payload.create({ collection: 'services', context: ctx, data: { slug, order: ++order * 10, name: s.name, sub: s.sub, desc: s.desc, icon: `svc:${slug}`, ...long(serviceContent[slug]) } as any });
    }
    order = 0;
    for (const [slug, c] of Object.entries<any>(courses)) {
      await payload.create({
        collection: 'courses', context: ctx,
        data: {
          slug, order: ++order * 10, icon: `course:${slug}`, name: c.name, tier: c.tier ?? 'pro', sub: c.sub, short: c.short, desc: c.desc,
          duration: c.duration, hours: c.hours, level: c.level, mode: c.mode, fee: c.fee, fee_note: c.fee_note, seats: c.seats,
          intern: c.intern, schedule: c.schedule, tools: c.tools.map(t), outcomes: c.outcomes.map(t), ...long(courseContent[slug]),
        } as any,
      });
    }
    order = 0;
    for (const [slug, c] of Object.entries<any>(cities)) {
      await payload.create({ collection: 'cities', context: ctx, data: { slug, order: ++order * 10, icon: `city:${slug}`, name: c.name, urdu: c.urdu, note: c.note, pop: c.pop, clients: c.clients, comp: c.comp, ...long(cityContent[slug]) } as any });
    }
    order = 0;
    for (const [slug, i] of Object.entries<any>(industries)) {
      await payload.create({ collection: 'industries', context: ctx, data: { slug, order: ++order * 10, icon: `ind:${slug}`, name: i.name, urdu: i.urdu, desc: i.desc, kws: i.kws.map(t), stats: i.stats.map(t), ...long(industryContent[slug]) } as any });
    }

    const start = new Date(SCHEDULE_START).getTime();
    for (const [i, p] of POSTS.entries()) {
      await payload.create({
        collection: 'posts', context: ctx,
        data: {
          slug: p.slug, title: p.title, keyword: p.keyword, description: p.description, metaDescription: p.metaDescription,
          category: p.category, icon: p.icon, accent: p.accent, answer: p.answer, takeaways: p.takeaways.map(t),
          body: p.body.map((b) => toBlock(b as AnyBlock)), faqs: p.faqs, related: p.related ?? [],
          publishAt: p.publishAt ?? new Date(start + i * GAP_HOURS * 3600_000).toISOString(),
          contentUpdatedAt: p.updatedAt,
        } as any,
      });
      payload.logger.info(`Imported post ${i + 1}/${POSTS.length}: ${p.slug}`);
    }

    await seedPages(payload);
  }

  await seedGlobals(payload, force);
  await ensureAdmin(payload);
  process.exit(0);
}

async function seedPages(payload: any) {
  const updated = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  const page = (slug: string, title: string, intro: string, sections: [string, string][]) =>
    payload.create({
      collection: 'pages', context: ctx,
      data: { slug, title, intro, published: false, sections: sections.map(([heading, html]) => ({ heading, content: htmlToLexical(html) })) },
    });

  await page('privacy-policy', 'Privacy Policy', `How MrSEO.pk collects, uses and protects your information. Last updated ${updated}.`, [
    ['Who we are', '<p>MrSEO.pk is an SEO consultancy and training provider run by Syed Mudassir Shah, based in Islamabad, Pakistan. You can contact us at seosyed77@gmail.com or on WhatsApp at +92 343 5853835.</p>'],
    ['What we collect', '<p>When you use the contact form or the course application form we collect the details you enter: your name, email address, phone or WhatsApp number, city, website address, the service or course you are interested in and your message.</p><p>Like most websites, we also collect anonymous usage data through Google Analytics and Google Ads, such as pages visited, device type and approximate location.</p>'],
    ['How we use it', '<ul><li>To reply to your enquiry or course application.</li><li>To prepare the website audit or course information you asked for.</li><li>To understand which pages are useful and improve the website.</li></ul><p>We do not sell or rent your information, and we do not add you to a mailing list without your permission.</p>'],
    ['How long we keep it', '<p>Form submissions are kept for as long as needed to deal with your enquiry and for our business records, and are deleted on request.</p>'],
    ['Your choices', '<p>You can ask us to show, correct or delete the information we hold about you by emailing seosyed77@gmail.com. You can block analytics cookies in your browser settings.</p>'],
  ]);
  await page('terms', 'Terms', `The terms that apply when you use this website or work with MrSEO.pk. Last updated ${updated}.`, [
    ['Using this website', '<p>The guides on this website are general information about search and digital marketing in Pakistan. They are not a promise of any particular result for your business.</p>'],
    ['SEO services', '<p>Services are agreed in writing before work starts and billed monthly, with no lock-in contract. Nobody can guarantee rankings on Google, and we do not offer ranking guarantees.</p>'],
    ['Courses', '<p>Course fees, durations and what is included are shown on each course page. The certificate of completion is issued by MrSEO.pk and is not a government accreditation. Internships with professional courses are unpaid.</p>'],
    ['Contact', '<p>Questions about these terms can be sent to seosyed77@gmail.com.</p>'],
  ]);
}

async function seedGlobals(payload: any, force: boolean) {
  const set = async (slug: string, data: Record<string, unknown>) => {
    const cur = await payload.findGlobal({ slug, depth: 0 });
    // A global counts as filled once its main text field has a value (groups and arrays always come back non-null).
    const probe: Record<string, (g: any) => unknown> = { settings: (g) => g.ownerName, home: (g) => g.heroTitle, 'hub-pages': (g) => g.services?.title };
    const filled = Boolean((probe[slug] ?? ((g: any) => g.title))(cur));
    if (filled && !force) return;
    await payload.updateGlobal({ slug, data, context: ctx });
  };

  await set('settings', {
    ownerName: 'Syed Mudassir Shah', brandTagline: 'SEO consultancy since 2010',
    email: 'seosyed77@gmail.com', whatsapp: '923435853835', phone: '+92 343 5853835',
    baseCity: 'Islamabad', baseRegion: 'Islamabad Capital Territory',
    campus: 'Scheme 3, Rawalpindi', campusCity: 'Rawalpindi', campusArea: 'Rawalpindi and Islamabad',
    officeHours: 'Monday to Saturday, 9am to 10pm',
    yearsExperience: '14+', websitesRanked: '50+', clientsServed: '400+',
    footerText: 'SEO and digital marketing for Pakistani businesses, run by **Syed Mudassir Shah** since 2010. Covering eight cities and eight industries, plus digital marketing courses taught at our Scheme 3 office in Rawalpindi, with a free internship.',
    authorBio: '**Syed Mudassir Shah** is an Islamabad-based SEO consultant who has worked on Pakistani search since 2010 and founded MrSEO.pk. He runs client accounts across eight cities and teaches digital marketing at the Scheme 3, Rawalpindi campus.',
    whatsappMessage: 'Hi MrSEO.pk! I need SEO services.',
    socials: [
      { platform: 'facebook', url: 'https://facebook.com/mrseopk' },
      { platform: 'instagram', url: 'https://instagram.com/mrseopk' },
      { platform: 'x', url: 'https://twitter.com/mrseopk' },
      { platform: 'linkedin', url: 'https://linkedin.com/company/mrseopk' },
      { platform: 'youtube', url: 'https://youtube.com/@mrseopk' },
    ],
    defaultMetaDescription: DEFAULT_DESC,
    founderSameAs: [{ url: 'https://facebook.com/mrseopk' }, { url: 'https://linkedin.com/in/syedmudassirshah' }],
  });

  await set('home', {
    metaTitle: 'SEO Expert in Pakistan | MrSEO.pk', metaDescription: DEFAULT_DESC,
    heroEyebrow: 'SEO consultant, Pakistan',
    heroTitle: 'Get found on Google *across Pakistan*',
    heroDesc: 'Syed Mudassir Shah has been ranking Pakistani businesses since 2010. Straight answers, honest timelines and reporting that connects rankings to enquiries.',
    heroPoints: ['Written audit in 24 hours', 'Monthly terms, no lock-in', 'No ranking guarantees, no fake reviews'].map(t),
    heroStats: stats([['400+', 'Clients served'], ['14+', 'Years experience'], ['50+', 'Websites ranked'], ['8', 'Cities and industries']]),
    cardRole: 'SEO consultant and founder, MrSEO.pk', cardLocation: 'Islamabad based, working nationwide',
    cardLabel: 'How every engagement works',
    cardPoints: ['A free written audit within 24 hours', 'A 90 day roadmap with named priorities', 'Weekly rank tracking from day one', 'Monthly reports tied to enquiries, not traffic'].map(t),
    answerLabel: 'In short: what does MrSEO.pk do?',
    answerText: 'MrSEO.pk is an SEO consultancy run by Syed Mudassir Shah from Islamabad, working with businesses across Pakistan since 2010. The work covers technical SEO, local search visibility, content and paid search, with weekly rank tracking and monthly reporting tied to enquiries rather than traffic alone.',
    servicesHead: head('Services', 'What we *actually do*', 'Six services, run as one plan. Most clients start with SEO and add the rest once it is working.'),
    coursesHead: head('Training · Scheme 3, Rawalpindi', 'Digital marketing *courses*', 'Taught at our Rawalpindi office or live online. Professional courses run PKR 6,000 to PKR 15,000 and include a free internship on live client accounts. Short courses start at PKR 2,000.'),
    shortTitle: 'Short courses for students *from PKR 2,000*',
    shortText: 'Two to three weeks, one skill, evenings and weekends. PKR 2,000 to PKR 4,000, certificate included, internship not.',
    citiesHead: head('Coverage', 'SEO across *Pakistan*', 'Competition, language behaviour and seasonality change from city to city. Each guide below explains how that market actually works.'),
    industriesHead: head('Industry experience', 'SEO for *specific sectors*', 'Every sector has its own season, its own search behaviour and its own quality bar. Generic SEO advice ignores all three.'),
    processHead: head('How it works', 'Five stages, *no mystery*'),
    steps: [
      ['Audit', 'We look at what is actually holding the site back and what your competitors are doing that you are not.'],
      ['Plan', 'A 90 day roadmap with named priorities, so you know what is being worked on and why.'],
      ['Build', 'Technical fixes, page architecture, content and local visibility, in the order that matters most.'],
      ['Report', 'Weekly rank tracking and a monthly report that connects positions to enquiries.'],
      ['Expand', 'Once a keyword cluster is working, we widen into adjacent terms, areas or cities.'],
    ].map(([title, text]) => ({ title, text })),
    whyHead: head('Why work with us', 'What makes this *different*'),
    whys: [
      ['trophy', 'A long track record', 'Ranking Pakistani businesses since 2010, before most local agencies existed. That history means fewer experiments at your expense.'],
      ['local', 'Local search knowledge', 'Roman Urdu queries, city-level competition and Pakistani buying behaviour are not things you learn from international SEO courses.'],
      ['chart', 'Reporting you can check', 'Weekly rank tracking and monthly reports tied to enquiries. If a month goes badly, you will hear it from us first.'],
      ['map', 'City-specific plans', 'Karachi and Quetta need completely different strategies. Running the same template in both wastes budget in one and underinvests in the other.'],
      ['layers', 'Sector depth', 'Real working knowledge in healthcare, travel, education, property, hospitality and e-commerce, including where each one sits with Google quality assessment.'],
      ['unlock', 'No lock-in contracts', 'Monthly terms. If the work is not producing, you should be able to stop without a legal argument.'],
    ].map(([icon, title, text]) => ({ icon, title, text })),
    testimonialsHead: head('Client feedback', 'What clients *have said*'),
    faqHead: head('Common questions', 'Questions we get *every week*'),
    faqs: faqs.home,
    contactHead: head('Free audit', 'Find out where you *actually stand*', AUDIT_SUB),
    cta: { title: 'Ready to talk about *your site?*', text: 'A short conversation is usually enough to tell whether SEO is the right spend for your business right now. If it is not, we will say so.', note: 'Free, delivered in 24 hours, no commitment' },
  });

  await set('about', {
    metaTitle: 'About Syed Mudassir Shah | MrSEO.pk', metaDescription: DEFAULT_DESC,
    eyebrow: 'About MrSEO.pk', title: 'Syed Mudassir Shah, *SEO consultant*',
    lead: paragraphs(
      'I have worked on Pakistani search since 2010, back when most local businesses had no website at all and the agencies that existed were mostly reselling directory submissions. MrSEO.pk is the consultancy I built out of that work. Around <strong>50+ websites</strong> have gone through it across eight industries and eight cities.',
      'What I actually sell is judgement about where a business should spend its effort. Sometimes that is SEO. Sometimes it is fixing a site that loads in eleven seconds, or a Google Business Profile nobody has touched in three years, or admitting that paid search will get you further this quarter. I would rather say that up front than sign a retainer that will not work.',
    ),
    cardRole: 'SEO consultant and founder, MrSEO.pk', cardLocation: 'Based in Islamabad, working nationwide',
    cardSkills: 'Search, paid media, content and development.',
    stats: stats([['14+', 'Years'], ['50+', 'Websites'], ['400+', 'Clients'], ['8', 'Industries']]),
    answer: 'Syed Mudassir Shah is an Islamabad-based SEO consultant who has worked on Pakistani search since 2010. MrSEO.pk covers technical SEO, local visibility, content and paid search for businesses in eight cities and eight industries, on monthly terms with no lock-in contract.',
    sections: [
      ['How I work', '<p>Every engagement starts with an audit, and the audit is genuinely free because it is also how I decide whether I want the work. If your site has a structural problem I cannot fix, or your market is one where paid search will simply serve you better, the audit will say that. Roughly one in five audits ends with me recommending something other than a retainer.</p><p>When we do proceed, the first ninety days are planned in writing before anything starts. You get a named list of priorities, an explanation of why each one is on the list, and an honest estimate of when it should start showing. Weekly rank tracking runs from day one. Monthly reports connect movement to actual enquiries rather than sessions, because traffic that does not turn into business is not a result.</p><p>There is no lock-in contract. Work is billed monthly and you can stop at the end of any month. I have found that removing the contract removes a lot of bad incentives on both sides.</p>'],
      ['What I do not do', '<p>Being clear about this saves everyone time.</p><ul><li><strong>No ranking guarantees.</strong> Google does not sell positions and nobody can promise them. Any agency offering a guaranteed number one is either targeting keywords nobody searches or planning to use tactics that will eventually cost you the site.</li><li><strong>No bought links or private blog networks.</strong> They work until they do not, and the recovery is worse than never having ranked. Link acquisition here means directories, associations, partnerships and earned coverage.</li><li><strong>No fake reviews.</strong> Not on Google, not on the site, not in structured data. Review manipulation gets profiles suspended, and for a business that depends on the map pack that is close to fatal.</li><li><strong>No mass-produced doorway pages.</strong> Fifty near-identical area pages with the location name swapped in used to work. Google filters them out now, and they make a site look cheap to human visitors too.</li><li><strong>No vanity reporting.</strong> Impressions and keyword counts are easy to inflate. The report shows positions on the terms that matter and the enquiries they produced.</li></ul>'],
      ['Where the experience comes from', '<p>The industries listed on this site are not a marketing menu. They are the sectors I have spent enough time in to have opinions worth paying for.</p><p><strong>Healthcare and clinics</strong> taught me most about quality assessment, because medical content is where Google is strictest. Getting a clinic to rank means getting doctor credentials, authorship and clinical accuracy right, and those lessons transfer to every other category.</p><p><strong>Travel</strong> taught me about seasonality. Publishing a Naran package page in June is the single most common mistake in Pakistani travel marketing, and it costs operators an entire season every year.</p><p><strong>E-commerce</strong> taught me that category pages carry more weight than blogs, and that faceted navigation quietly destroys more Pakistani stores than any competitor does.</p><p><strong>Property</strong> taught me about overseas buyers, who behave nothing like domestic ones and are almost entirely ignored by the businesses trying to sell to them.</p><p><strong>Education</strong> taught me that publishing your fee structure, which almost no Pakistani school does, is worth more than a year of content marketing.</p>'],
      ['Cities and coverage', "<p>Search in Pakistan is not one market. Karachi is fragmented by area and needs neighbourhood-level targeting. Lahore still rewards city-wide pages. Islamabad has low volume and very high lead value. Quetta and Peshawar have so little competition that basic professional work reaches page one within a quarter. Faisalabad's real opportunity is not local at all, it is export buyers searching in English from Europe and North America.</p><p>Running the same template across all of those would waste budget in the easy markets and underinvest in the hard ones. Each city guide on this site explains how that particular market behaves, which areas convert, and what a realistic timeline looks like there.</p>"],
      ['Getting in touch', '<p>WhatsApp is fastest and usually gets a reply within an hour during working hours. Email works too and gets a reply the same day. The contact form goes to the same inbox.</p><p>If you are sending a site for an audit, the URL is enough to start. Access to Search Console and Analytics makes the audit considerably more useful, but that can wait until we have spoken.</p>'],
    ].map(([heading, html]) => ({ heading, content: htmlToLexical(html) })),
    industriesHead: head('Sectors', 'Eight industries, *in depth*'),
    cta: { title: 'Want a look at *your site?*', text: 'Send the URL and you will get a written breakdown within 24 hours, including the parts you will not enjoy reading.', note: 'Reviewed personally, not by a template' },
  });

  await set('contact-page', {
    metaTitle: 'Contact MrSEO.pk | MrSEO.pk', metaDescription: DEFAULT_DESC,
    eyebrow: 'Free SEO audit', title: 'Talk to *Syed Mudassir Shah*',
    desc: 'Send your website URL and you will get a written audit back within 24 hours. It covers what is working, what is broken and what is worth fixing first. No obligation and no sales call unless you ask for one.',
    faqHead: head('Before you write', 'Questions people ask *first*'),
    faqs: faqs.contact,
  });

  await set('courses-page', {
    metaTitle: 'Digital Marketing Courses in Rawalpindi with Free Internship | MrSEO.pk',
    metaDescription: 'Twelve digital marketing courses at Scheme 3, Rawalpindi, and live online. Professional courses with a free internship, short courses from PKR 2,000. Taught by Syed Mudassir Shah.',
    eyebrow: 'Admissions open', title: 'Digital marketing *courses in Rawalpindi*',
    desc: 'Twelve courses taught at our office in Scheme 3, Rawalpindi, ten minutes from Saddar and an easy drive from most of Islamabad, or live online from anywhere. Six professional programmes that include a free internship on live client accounts, and six short courses from PKR 2,000 for students who want one employable skill in two or three weeks without a big fee. Taught by Syed Mudassir Shah from work he is doing that week, not from a curriculum bought abroad.',
    badges: ['Free internship with every professional course', 'Free certificate of completion', 'Scheme 3, Rawalpindi · or live online', 'Short courses from PKR 2,000', '15 to 18 seats per batch'].map(t),
    answerQuestion: 'What do the MrSEO.pk courses include?',
    answer: 'Classes run at our Scheme 3 office in Rawalpindi or live online. The six professional courses run six to sixteen weeks at PKR 6,000 to PKR 15,000 and include a free supervised internship on real client accounts. The six short courses run two to three weeks at PKR 2,000 to PKR 4,000 and include the certificate but not the internship.',
    proHead: head('Professional courses', 'Six to sixteen weeks, *internship included*', 'These are the career programmes. Every one ends with supervised work on live client accounts, a written reference and a portfolio.'),
    shortHead: head('Short courses · from PKR 2,000', 'One skill, *two or three weeks*', 'Built for students and first-time freelancers. PKR 2,000 to PKR 4,000, evening and weekend slots, a certificate at the end, and your fee credited towards a professional course if you upgrade within three months.'),
    shortNote: 'Short courses do not include the internship. That stays with the professional programmes, because supervising someone on a live client account takes more of our time than a two-week course can cover.',
    includesHead: head('Included in the professional courses', 'Internship, certificate and *a portfolio you keep*', 'Nothing here is an upsell added at the end. The limits are stated on the cards rather than buried.'),
    includesPro: includeCards(includes.pro),
    includesShort: includeCards(includes.short),
    howHead: head('How it runs', 'From application to *reference letter*'),
    howItRuns: [
      ['Apply and talk', 'Send the form or a WhatsApp message. We ask what you want out of it and tell you honestly whether the course delivers that.'],
      ['Classes', 'Two or three evenings a week at Scheme 3, Rawalpindi, or live online. Every session is recorded. Every module ends in a piece of work that gets reviewed.'],
      ['Internship', 'Six to eight weeks on live client accounts under supervision, at roughly twelve to fifteen hours a week. Unpaid, real work with real deadlines, and part of the professional courses only.'],
      ['Certificate and reference', 'A certificate of completion, a written reference describing the accounts you handled, and help preparing a portfolio and a CV that match what agencies here look for.'],
    ].map(([title, text]) => ({ title, text })),
    campusFacts: [
      ['Campus', 'Scheme 3, Rawalpindi'],
      ['Easy for', 'Satellite Town, Saddar, Chaklala, Bahria, DHA and most of Islamabad'],
      ['Online batches', 'Live, recorded, open to every city'],
      ['Office hours', 'Monday to Saturday, 9am to 10pm'],
    ].map(([label, value]) => ({ label, value })),
    applyHead: head('Admissions', 'Apply for the *next batch*', 'Applying costs nothing and commits you to nothing. We will tell you if a different course suits you better.'),
    faqHead: head('Questions', 'Before you *apply*'),
    faqs: faqs.courses,
  });

  await set('hub-pages', {
    services: {
      metaTitle: 'SEO and Digital Marketing Services in Pakistan | MrSEO.pk',
      metaDescription: 'SEO, Google Ads, social media, web design, local SEO and content marketing for Pakistani businesses, run as one plan. Free audit within 24 hours.',
      eyebrow: 'Services', title: 'What we *actually do*',
      desc: 'Six services, run as one plan rather than six separate invoices. Most clients start with SEO or local search and add the rest once it is working. Each page below explains how the work is actually done, what it costs to run properly, and what a realistic timeline looks like.',
    },
    locations: {
      metaTitle: 'SEO by City in Pakistan | MrSEO.pk',
      metaDescription: 'City-by-city SEO guides for Karachi, Lahore, Islamabad, Rawalpindi, Peshawar, Quetta, Faisalabad and Multan: competition, areas that convert and realistic timelines.',
      eyebrow: 'Coverage', title: 'SEO across *Pakistan*',
      desc: 'Competition, language behaviour and seasonality change from city to city. Each guide below explains how that market actually works.',
    },
    industries: {
      metaTitle: 'SEO by Industry in Pakistan | MrSEO.pk',
      metaDescription: 'SEO strategy for travel, e-commerce, beauty, healthcare, schools, hotels, clinics and real estate businesses in Pakistan. Seasonality, content and realistic timelines.',
      eyebrow: 'Industry experience', title: 'SEO for *specific sectors*',
      desc: 'Every sector has its own season, its own search behaviour and its own quality bar. Generic SEO advice ignores all three.',
    },
    blog: {
      metaTitle: 'SEO Blog: Guides on Hiring, Pricing and Ranking in Pakistan | MrSEO.pk',
      metaDescription: 'Practical SEO guides from Syed Mudassir Shah: hiring an SEO expert in Islamabad, pricing, local SEO, technical SEO, AI search and industry playbooks for Pakistani businesses.',
      eyebrow: 'Latest articles', title: 'SEO Blog *Pakistan*',
      desc: 'Straight answers about hiring, pricing and ranking, written from client work in Islamabad, Rawalpindi and across Pakistan. New guides are published regularly.',
    },
    caseStudies: {
      metaTitle: 'SEO Case Studies from Pakistan | MrSEO.pk', metaDescription: DEFAULT_DESC,
      eyebrow: 'Results', title: 'SEO case studies *from Pakistan*',
      desc: 'Real work for Pakistani businesses: what the problem was, what we changed and what happened to rankings and enquiries.',
    },
    auditHead: head('Free audit', 'Find out where you *actually stand*', AUDIT_SUB),
  });
}

async function ensureAdmin(payload: any) {
  const users = await payload.count({ collection: 'users', overrideAccess: true });
  if (users.totalDocs > 0) return;
  const email = process.env.ADMIN_EMAIL || 'seosyed77@gmail.com';
  const password = process.env.ADMIN_PASSWORD || randomBytes(12).toString('base64url');
  await payload.create({ collection: 'users', data: { email, password, name: 'Syed Mudassir Shah' }, overrideAccess: true, context: ctx });
  console.log(`\nADMIN LOGIN\n  email:    ${email}\n  password: ${password}\n  (shown once; change it after first login)\n`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
