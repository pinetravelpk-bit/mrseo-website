'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ArrowRight, ChevronDown, Menu, X } from 'lucide-react';
import { cities, coursesByTier, courseUrl, cityUrl, entries, industries, industryUrl, services, serviceUrl, waLink } from '@/lib/site';
import Icon, { WhatsAppIcon } from './Icon';

const WA_TEXT = 'Hi MrSEO.pk! I need SEO services.';

export function Brand() {
  return (
    <Link href="/" className="brand" rel="home" aria-label="MrSEO.pk home">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo-mark.png" alt="" width={40} height={40} className="brand-mark" />
      <span>
        <span className="brand-word">MrSE<span>O.pk</span></span>
        <span className="brand-tag">SEO consultancy since 2010</span>
      </span>
    </Link>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the drawer on navigation, lock page scroll while it is open.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const active = (prefix: string) => (pathname.startsWith(prefix) ? 'nav-link active' : 'nav-link');
  const pro = coursesByTier('pro');
  const short = coursesByTier('short');
  const chevron = <ChevronDown size={15} aria-hidden="true" />;

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>

      <header id="site-header" className={scrolled || open ? 'scrolled' : undefined}>
        <div className="container hdr-inner">
          <Brand />

          <nav className="main-nav" aria-label="Primary">
            <ul>
              <li>
                <Link href="/services/" className={active('/services')}>Services {chevron}</Link>
                <div className="mega-menu" style={{ width: 640 }}>
                  <div className="mega-body">
                    <div className="mega-inner">
                      <div className="mega-head">Services</div>
                      {entries(services).map(([slug, svc]) => (
                        <Link key={slug} className="mega-item" href={serviceUrl(slug)}>
                          <span className="mi-ico"><Icon name={`svc:${slug}`} size={18} /></span>
                          <span><span className="mi-name">{svc.name}</span><span className="mi-sub">{svc.sub}</span></span>
                        </Link>
                      ))}
                    </div>
                    <div className="mega-feature">
                      <div className="mega-feat-t">Free SEO audit</div>
                      <p className="mega-feat-d">A written breakdown of where your site stands, delivered within 24 hours. No obligation.</p>
                      <Link href="/contact/" className="btn btn-g btn-sm">Request audit</Link>
                    </div>
                  </div>
                </div>
              </li>

              <li>
                <Link href="/courses/" className={active('/courses')}>Courses {chevron}</Link>
                <div className="mega-menu" style={{ width: 780 }}>
                  <div className="mega-body">
                    <div className="mega-inner mega-grid-2">
                      <div className="mega-head">Professional courses · free internship</div>
                      {pro.map(([slug, c]) => (
                        <Link key={slug} className="mega-item" href={courseUrl(slug)}>
                          <span className="mi-ico"><Icon name={`course:${slug}`} size={18} /></span>
                          <span><span className="mi-name">{c.name}</span><span className="mi-sub">{c.duration} · PKR {c.fee}</span></span>
                        </Link>
                      ))}
                      <div className="mega-head" style={{ marginTop: 6 }}>Short courses · from PKR 2,000</div>
                      {short.map(([slug, c]) => (
                        <Link key={slug} className="mega-item" href={courseUrl(slug)}>
                          <span className="mi-ico"><Icon name={`course:${slug}`} size={18} /></span>
                          <span><span className="mi-name">{c.name}</span><span className="mi-sub">{c.duration} · PKR {c.fee}</span></span>
                        </Link>
                      ))}
                    </div>
                    <div className="mega-feature">
                      <div className="mega-feat-t">Scheme 3, Rawalpindi</div>
                      <p className="mega-feat-d">On-site classes in Pindi, easy from Islamabad, plus live online batches. Free internship with every professional course.</p>
                      <Link href="/courses/" className="btn btn-g btn-sm">All courses and fees</Link>
                    </div>
                  </div>
                </div>
              </li>

              <li>
                <Link href="/seo-expert/" className={active('/seo-expert')}>Locations {chevron}</Link>
                <div className="mega-menu" style={{ width: 560 }}>
                  <div className="mega-inner mega-grid-2">
                    <div className="mega-head">SEO by city</div>
                    {entries(cities).map(([slug, city]) => (
                      <Link key={slug} className="mega-item" href={cityUrl(slug)}>
                        <span className="mi-ico"><Icon name={`city:${slug}`} size={18} /></span>
                        <span><span className="mi-name">SEO Expert {city.name}</span><span className="mi-sub">{city.note}</span></span>
                      </Link>
                    ))}
                  </div>
                </div>
              </li>

              <li>
                <Link href="/seo-for/" className={active('/seo-for')}>Industries {chevron}</Link>
                <div className="mega-menu" style={{ width: 580 }}>
                  <div className="mega-inner mega-grid-2">
                    <div className="mega-head">SEO by industry</div>
                    {entries(industries).map(([slug, ind]) => (
                      <Link key={slug} className="mega-item" href={industryUrl(slug)}>
                        <span className="mi-ico"><Icon name={`ind:${slug}`} size={18} /></span>
                        <span><span className="mi-name">{ind.name}</span><span className="mi-sub">{ind.stats[0]}</span></span>
                      </Link>
                    ))}
                  </div>
                </div>
              </li>

              <li><Link href="/about/" className={active('/about')}>About</Link></li>
              <li><Link href="/contact/" className={active('/contact')}>Contact</Link></li>
            </ul>
          </nav>

          <div className="hdr-acts">
            <a href={waLink(WA_TEXT)} className="icon-btn hide-md" target="_blank" rel="noopener" aria-label="Chat on WhatsApp"><WhatsAppIcon /></a>
            <Link href="/contact/" className="btn btn-g btn-sm">Free audit</Link>
            <button className="icon-btn mob-toggle" aria-controls="mob-drawer" aria-expanded={open} aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen((o) => !o)}>
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer: grouped so the 40+ links stay scannable */}
      <nav id="mob-drawer" className={'mob-drawer' + (open ? ' open' : '')} aria-label="Mobile" aria-hidden={!open}>
        <details className="mob-group">
          <summary>Services {chevron}</summary>
          <div className="mob-links">
            <Link href="/services/">All services <small><ArrowRight size={15} /></small></Link>
            {entries(services).map(([slug, s]) => (
              <Link key={slug} href={serviceUrl(slug)}><span className="mi-ico"><Icon name={`svc:${slug}`} size={16} /></span>{s.name}</Link>
            ))}
          </div>
        </details>
        <details className="mob-group">
          <summary>Courses {chevron}</summary>
          <div className="mob-links">
            <Link href="/courses/">All courses and fees <small><ArrowRight size={15} /></small></Link>
            {[...pro, ...short].map(([slug, c]) => (
              <Link key={slug} href={courseUrl(slug)}><span className="mi-ico"><Icon name={`course:${slug}`} size={16} /></span>{c.name}<small>PKR {c.fee}</small></Link>
            ))}
          </div>
        </details>
        <details className="mob-group">
          <summary>Locations {chevron}</summary>
          <div className="mob-links">
            {entries(cities).map(([slug, c]) => (
              <Link key={slug} href={cityUrl(slug)}><span className="mi-ico"><Icon name={`city:${slug}`} size={16} /></span>SEO Expert {c.name}</Link>
            ))}
          </div>
        </details>
        <details className="mob-group">
          <summary>Industries {chevron}</summary>
          <div className="mob-links">
            {entries(industries).map(([slug, i]) => (
              <Link key={slug} href={industryUrl(slug)}><span className="mi-ico"><Icon name={`ind:${slug}`} size={16} /></span>{i.name}</Link>
            ))}
          </div>
        </details>
        <Link className="mob-plain" href="/about/">About Syed Mudassir Shah</Link>
        <Link className="mob-plain" href="/contact/">Contact</Link>
        <div className="mob-cta">
          <Link href="/contact/" className="btn btn-g btn-lg">Get a free SEO audit</Link>
          <a href={waLink(WA_TEXT)} className="btn btn-wa btn-lg" target="_blank" rel="noopener"><WhatsAppIcon /> WhatsApp</a>
        </div>
      </nav>

      {/* Desktop floating WhatsApp, and a thumb-friendly action bar on phones */}
      <a href={waLink(WA_TEXT)} className="wa-float" target="_blank" rel="noopener" aria-label="Chat on WhatsApp"><WhatsAppIcon size={28} /></a>
      <div className="mobile-bar">
        <a href={waLink(WA_TEXT)} className="btn btn-wa" target="_blank" rel="noopener"><WhatsAppIcon /> WhatsApp</a>
        <Link href="/contact/" className="btn btn-g">Free audit</Link>
      </div>
    </>
  );
}
