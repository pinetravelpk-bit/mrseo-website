import Link from 'next/link';
import { BASE_CITY, CAMPUS, cities, cityUrl, coursesByTier, courseUrl, EMAIL, entries, industries, industryUrl, PHONE, services, serviceUrl, waLink } from '@/lib/site';
import { Brand } from './Header';
import { WhatsAppIcon } from './Icon';

const SOCIALS: [string, string, React.ReactNode][] = [
  ['Facebook', 'https://facebook.com/mrseopk', <svg key="f" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 10-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0022 12z" /></svg>],
  ['Instagram', 'https://instagram.com/mrseopk', <svg key="i" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>],
  ['X (Twitter)', 'https://twitter.com/mrseopk', <svg key="t" viewBox="0 0 24 24" fill="currentColor"><path d="M18.2 2H21l-6.6 7.5L22 22h-6.2l-4.8-6.3L5.4 22H2.6l7-8L2 2h6.3l4.4 5.8zM17 20.2h1.6L7.1 3.7H5.4z" /></svg>],
  ['LinkedIn', 'https://linkedin.com/company/mrseopk', <svg key="l" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 11-.02 5 2.5 2.5 0 01.02-5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05C21.4 8.65 22 11 22 14.2V21h-4v-6c0-1.4-.03-3.3-2-3.3-2 0-2.3 1.5-2.3 3.1V21h-4z" /></svg>],
  ['YouTube', 'https://youtube.com/@mrseopk', <svg key="y" viewBox="0 0 24 24" fill="currentColor"><path d="M23 12s0-3.4-.4-5a2.6 2.6 0 00-1.8-1.8C19.2 4.8 12 4.8 12 4.8s-7.2 0-8.8.4A2.6 2.6 0 001.4 7C1 8.6 1 12 1 12s0 3.4.4 5a2.6 2.6 0 001.8 1.8c1.6.4 8.8.4 8.8.4s7.2 0 8.8-.4A2.6 2.6 0 0022.6 17c.4-1.6.4-5 .4-5zM9.8 15.2V8.8l6 3.2z" /></svg>],
];

export default function Footer() {
  return (
    <footer id="site-footer">
      <div className="container">
        <div className="ftr-grid">
          <div className="ftr-brand">
            <Brand />
            <p className="ftr-desc">SEO and digital marketing for Pakistani businesses, run by <strong>Syed Mudassir Shah</strong> since 2010. Covering eight cities and eight industries, plus digital marketing courses taught at our Scheme 3 office in Rawalpindi, with a free internship.</p>
            <div className="ftr-socs">
              {SOCIALS.map(([label, href, svg]) => <a key={label} href={href} className="fsoc" aria-label={label} target="_blank" rel="noopener">{svg}</a>)}
              <a href={waLink()} className="fsoc" aria-label="WhatsApp" target="_blank" rel="noopener"><WhatsAppIcon size={17} /></a>
            </div>
          </div>
          <div>
            <div className="ftr-col-t">Services</div>
            <div className="ftr-links">
              {entries(services).map(([slug, svc]) => <Link key={slug} href={serviceUrl(slug)}>{svc.name}</Link>)}
            </div>
          </div>
          <div>
            <div className="ftr-col-t">Courses</div>
            <div className="ftr-links">
              {coursesByTier('pro').map(([slug, c]) => <Link key={slug} href={courseUrl(slug)}>{c.name}</Link>)}
              <Link href="/courses/#short-courses">Short courses from PKR 2,000</Link>
            </div>
          </div>
          <div>
            <div className="ftr-col-t">SEO by city</div>
            <div className="ftr-links">
              {entries(cities).map(([slug, city]) => <Link key={slug} href={cityUrl(slug)}>SEO Expert {city.name}</Link>)}
            </div>
          </div>
          <div>
            <div className="ftr-col-t">SEO by industry</div>
            <div className="ftr-links">
              {entries(industries).map(([slug, ind]) => <Link key={slug} href={industryUrl(slug)}>{ind.name}</Link>)}
            </div>
          </div>
          <div>
            <div className="ftr-col-t">Contact</div>
            <div className="ftr-links">
              <a href={waLink('Hi MrSEO.pk!')} target="_blank" rel="noopener">{PHONE}</a>
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              <Link href="/contact/">Book a free audit</Link>
              <Link href="/about/">About Syed Mudassir Shah</Link>
              <Link href="/courses/">Courses, {CAMPUS}</Link>
              <Link href="/case-studies/">Case studies</Link>
              <Link href="/blog/">SEO blog</Link>
            </div>
          </div>
        </div>
        <div className="ftr-bot">
          <span>© {new Date().getFullYear()} MrSEO.pk. Owned and operated by Syed Mudassir Shah. Built in {BASE_CITY}, Pakistan.</span>
          <div className="ftr-bot-links">
            <Link href="/privacy-policy/">Privacy Policy</Link>
            <Link href="/terms/">Terms</Link>
            <a href="/sitemap.xml">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
