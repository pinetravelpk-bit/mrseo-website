import Link from 'next/link';
import { cityUrl, coursesByTier, courseUrl, entries, industryUrl, serviceUrl, waLink } from '@/lib/site';
import { getSite } from '@/lib/cms';
import Inline from './blog/Inline';
import { Brand } from './Header';
import { WhatsAppIcon } from './Icon';

const SOCIAL_ICONS: Record<string, [string, React.ReactNode]> = {
  facebook: ['Facebook', <svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 10-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0022 12z" /></svg>],
  instagram: ['Instagram', <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>],
  x: ['X (Twitter)', <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.2 2H21l-6.6 7.5L22 22h-6.2l-4.8-6.3L5.4 22H2.6l7-8L2 2h6.3l4.4 5.8zM17 20.2h1.6L7.1 3.7H5.4z" /></svg>],
  linkedin: ['LinkedIn', <svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 11-.02 5 2.5 2.5 0 01.02-5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05C21.4 8.65 22 11 22 14.2V21h-4v-6c0-1.4-.03-3.3-2-3.3-2 0-2.3 1.5-2.3 3.1V21h-4z" /></svg>],
  youtube: ['YouTube', <svg viewBox="0 0 24 24" fill="currentColor"><path d="M23 12s0-3.4-.4-5a2.6 2.6 0 00-1.8-1.8C19.2 4.8 12 4.8 12 4.8s-7.2 0-8.8.4A2.6 2.6 0 001.4 7C1 8.6 1 12 1 12s0 3.4.4 5a2.6 2.6 0 001.8 1.8c1.6.4 8.8.4 8.8.4s7.2 0 8.8-.4A2.6 2.6 0 0022.6 17c.4-1.6.4-5 .4-5zM9.8 15.2V8.8l6 3.2z" /></svg>],
  tiktok: ['TikTok', <svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.6 5.8A4.3 4.3 0 0115.5 3h-3.2v12.4a2.6 2.6 0 11-2.6-2.6c.3 0 .5 0 .8.1V9.6a5.8 5.8 0 105 5.8V9a7.4 7.4 0 004.3 1.4V7.2a4.3 4.3 0 01-3.2-1.4z" /></svg>],
};

export default async function Footer() {
  const { settings: st, services, courses, cities, industries } = await getSite();
  return (
    <footer id="site-footer">
      <div className="container">
        <div className="ftr-grid">
          <div className="ftr-brand">
            <Brand tagline={st.brandTagline} />
            <p className="ftr-desc"><Inline text={st.footerText} /></p>
            <div className="ftr-socs">
              {st.socials.filter((x) => SOCIAL_ICONS[x.platform]).map(({ platform, url }) => <a key={url} href={url} className="fsoc" aria-label={SOCIAL_ICONS[platform][0]} target="_blank" rel="noopener">{SOCIAL_ICONS[platform][1]}</a>)}
              <a href={waLink(st.whatsapp)} className="fsoc" aria-label="WhatsApp" target="_blank" rel="noopener"><WhatsAppIcon size={17} /></a>
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
              {coursesByTier(courses, 'pro').map(([slug, c]) => <Link key={slug} href={courseUrl(slug)}>{c.name}</Link>)}
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
              <a href={waLink(st.whatsapp, 'Hi MrSEO.pk!')} target="_blank" rel="noopener">{st.phone}</a>
              <a href={`mailto:${st.email}`}>{st.email}</a>
              <Link href="/contact/">Book a free audit</Link>
              <Link href="/about/">About {st.ownerName}</Link>
              <Link href="/courses/">Courses, {st.campus}</Link>
              <Link href="/case-studies/">Case studies</Link>
              <Link href="/blog/">SEO blog</Link>
            </div>
          </div>
        </div>
        <div className="ftr-bot">
          <span>© {new Date().getFullYear()} MrSEO.pk. Owned and operated by {st.ownerName}. Built in {st.baseCity}, Pakistan.</span>
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
