import Link from 'next/link';
import { ArrowRight, ChevronRight, Mail } from 'lucide-react';
import { cities, cityUrl, type Course, courseUrl, EMAIL, entries, industries, industryUrl, PHONE, services, serviceUrl, waLink } from '@/lib/site';
import Icon, { includeIcon, WhatsAppIcon } from './Icon';

export function SectionHead({ eyebrow, title, sub, left }: { eyebrow?: string; title: React.ReactNode; sub?: React.ReactNode; left?: boolean }) {
  return (
    <div className={'sec-head' + (left ? ' left' : '')}>
      {eyebrow && <div className="eyebrow">{eyebrow}</div>}
      <h2 className="sec-t">{title}</h2>
      {sub && <p className="sec-sub">{sub}</p>}
    </div>
  );
}

export function Breadcrumb({ items }: { items: [string, string?][] }) {
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <Link href="/">Home</Link>
      {items.map(([label, href], i) => (
        <span key={i} style={{ display: 'contents' }}>
          <ChevronRight size={14} className="sep" aria-hidden="true" />
          {href ? <Link href={href}>{label}</Link> : <span aria-current="page">{label}</span>}
        </span>
      ))}
    </nav>
  );
}

export function ServiceGrid({ exclude, foot = 'Learn more', title = (n: string) => n, headingLevel = 3 }: { exclude?: string; foot?: string; title?: (n: string) => string; headingLevel?: 2 | 3 }) {
  const H = headingLevel === 2 ? 'h2' : 'h3';
  return (
    <div className="grid grid-3">
      {entries(services).filter(([s]) => s !== exclude).map(([slug, svc]) => (
        <Link key={slug} href={serviceUrl(slug)} className="card">
          <span className="ico-badge"><Icon name={`svc:${slug}`} /></span>
          <H className="card-t">{title(svc.name)}</H>
          <p className="card-d">{svc.desc}</p>
          <div className="card-foot"><span className="link-arrow">{foot} <ArrowRight size={16} /></span></div>
        </Link>
      ))}
    </div>
  );
}

export function IndustryGrid({ exclude, suffix = '', showStats = false, compact = false }: { exclude?: string; suffix?: string; showStats?: boolean; compact?: boolean }) {
  return (
    <div className={'grid grid-4' + (compact ? ' m-compact' : '')}>
      {entries(industries).filter(([s]) => s !== exclude).map(([slug, ind]) => (
        <Link key={slug} href={industryUrl(slug)} className="card card-sm">
          <span className="ico-badge"><Icon name={`ind:${slug}`} /></span>
          <h3 className="card-t">{ind.name}{suffix}</h3>
          <div className="card-urdu" lang="ur">{ind.urdu}</div>
          <p className="card-d">{ind.desc}</p>
          {showStats && <div className="tag-row">{ind.stats.map((s) => <span className="tag" key={s}>{s}</span>)}</div>}
          <div className="card-foot"><span className="link-arrow">Read the strategy <ArrowRight size={16} /></span></div>
        </Link>
      ))}
    </div>
  );
}

/** City grid. The card leads with the city name; `prefix` is the small label above it ("SEO Expert", "SEO in"). */
export function CityGrid({ exclude, prefix = 'SEO Expert', sub = 'note' }: { exclude?: string; prefix?: string; sub?: 'note' | 'comp' | 'note+comp' }) {
  return (
    <div className="grid grid-4 city-grid">
      {entries(cities).filter(([s]) => s !== exclude).map(([slug, city]) => (
        <Link key={slug} href={cityUrl(slug)} className="card city-card">
          <span className="city-top">
            <span className="ico-badge blue"><Icon name={`city:${slug}`} /></span>
            <span className="city-urdu" lang="ur" dir="rtl">{city.urdu}</span>
          </span>
          <span className="city-kicker" aria-hidden="true">{prefix}</span>
          <h3 className="card-t"><span className="screen-reader-text">{prefix} </span>{city.name}</h3>
          <span className="city-line">{sub === 'comp' ? `Competition: ${city.comp}` : city.note}</span>
          {sub === 'note+comp' && <span className="tag-row"><span className="tag">Competition: {city.comp}</span></span>}
        </Link>
      ))}
    </div>
  );
}

export function CourseCard({ slug, c, variant }: { slug: string; c: Course; variant: 'home' | 'pro' | 'short' }) {
  const short = variant === 'short';
  return (
    <Link href={courseUrl(slug)} className="card">
      <div className="cc-top">
        <span className={'ico-badge' + (short ? ' blue' : '')}><Icon name={`course:${slug}`} /></span>
        <span className={'cc-dur' + (short ? ' cc-dur-b' : '')}>{c.duration}</span>
      </div>
      <h3 className="card-t">{c.name}</h3>
      <div className="cc-sub">{c.sub}</div>
      <p className="card-d">{c.desc}</p>
      <div className="card-foot">
        <span className="cc-fee"><small>PKR</small>{c.fee}</span>
        {variant === 'home' && <span className="tag tag-g">+ free internship</span>}
        {variant === 'pro' && <span className="tag tag-g">+ {c.intern} free internship</span>}
        {short && <span className="tag">Certificate included</span>}
      </div>
    </Link>
  );
}

export function IncludeGrid({ items }: { items: { icon: string; t: string; d: string }[] }) {
  return (
    <div className="grid grid-3">
      {items.map((inc) => (
        <div className="card" key={inc.t}>
          <span className="ico-badge"><Icon name={includeIcon(inc.t)} /></span>
          <h3 className="card-t">{inc.t}</h3>
          <p className="card-d">{inc.d}</p>
        </div>
      ))}
    </div>
  );
}

export function Steps({ steps, four }: { steps: [string, string][]; four?: boolean }) {
  return (
    <>
    <ol className={'steps m-scroll' + (four ? ' four' : '')}>
      {steps.map(([t, d], i) => (
        <li className="step" key={t}>
          <span className="step-n">{i + 1}</span>
          <h3 className="step-t">{t}</h3>
          <p className="step-d">{d}</p>
        </li>
      ))}
    </ol>
    <p className="swipe-hint">Swipe to see every step</p>
    </>
  );
}

export function StatStrip({ stats }: { stats: [string, string, ('g' | 'b' | '')?][] }) {
  return (
    <div className="stat-strip">
      {stats.map(([v, l, tone]) => (
        <div className="stat" key={l}><span className={'stat-v' + (tone ? ' ' + tone : '')}>{v}</span><span className="stat-l">{l}</span></div>
      ))}
    </div>
  );
}

export function CtaContacts() {
  return (
    <div className="cta-contact">
      <a href={waLink()} target="_blank" rel="noopener"><WhatsAppIcon size={17} /> {PHONE}</a>
      <a href={`mailto:${EMAIL}`}><Mail size={17} aria-hidden="true" /> {EMAIL}</a>
    </div>
  );
}

export function CtaPanel({ title, text, children, note }: { title: React.ReactNode; text: string; children: React.ReactNode; note?: string }) {
  return (
    <section id="cta-section" className="section-sm">
      <div className="container">
        <div className="cta-panel">
          <div>
            <h2 className="cta-t">{title}</h2>
            <p className="cta-s">{text}</p>
            <CtaContacts />
          </div>
          <div className="cta-right">
            {children}
            {note && <p className="cta-note">{note}</p>}
          </div>
        </div>
      </div>
    </section>
  );
}

/** Hero block for every inner page: breadcrumb, optional icon and eyebrow, title, intro, extras, actions, facts. */
export function PageHero({ crumbs, icon, eyebrow, sub, title, desc, children, actions, facts, center }: {
  crumbs: [string, string?][]; icon?: string; eyebrow?: string; sub?: string; title: React.ReactNode; desc?: React.ReactNode;
  children?: React.ReactNode; actions?: React.ReactNode; facts?: [string, string, ('g' | 'b' | '')?][]; center?: boolean;
}) {
  return (
    <div className={'page-hero' + (center ? ' center' : '')}>
      <div className="container">
        <Breadcrumb items={crumbs} />
        {(icon || eyebrow) && (
          <div className="loc-head" style={center ? { justifyContent: 'center' } : undefined}>
            {icon && <span className="ico-badge"><Icon name={icon} size={26} /></span>}
            <div>
              {eyebrow && <div className="eyebrow">{eyebrow}</div>}
              {sub && <div className="loc-sub">{sub}</div>}
            </div>
          </div>
        )}
        <h1 className="loc-h1" style={center ? { marginLeft: 'auto', marginRight: 'auto' } : undefined}>{title}</h1>
        {desc && <p className="loc-desc">{desc}</p>}
        {children}
        {actions && <div className="loc-acts" style={center ? { justifyContent: 'center' } : undefined}>{actions}</div>}
        {facts && <StatStrip stats={facts} />}
      </div>
    </div>
  );
}
