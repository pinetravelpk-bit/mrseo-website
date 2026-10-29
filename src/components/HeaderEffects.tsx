'use client';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/* The only client code behind the header: scroll shadow, mobile drawer and
   the active nav link. The menus themselves are server-rendered markup. */
export default function HeaderEffects() {
  const pathname = usePathname();

  // Shadow once the page scrolls.
  useEffect(() => {
    const header = document.getElementById('site-header');
    const onScroll = () => header?.classList.toggle('scrolled', window.scrollY > 8 || document.body.classList.contains('drawer-open'));
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Mobile drawer: toggle button, Escape key, page scroll lock.
  useEffect(() => {
    const button = document.querySelector<HTMLButtonElement>('.mob-toggle');
    const drawer = document.getElementById('mob-drawer');
    const header = document.getElementById('site-header');
    if (!button || !drawer) return;
    const setOpen = (open: boolean) => {
      drawer.classList.toggle('open', open);
      drawer.setAttribute('aria-hidden', String(!open));
      button.setAttribute('aria-expanded', String(open));
      button.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      document.body.classList.toggle('drawer-open', open);
      document.body.style.overflow = open ? 'hidden' : '';
      header?.classList.toggle('scrolled', open || window.scrollY > 8);
    };
    const onClick = () => setOpen(!drawer.classList.contains('open'));
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    button.addEventListener('click', onClick);
    window.addEventListener('keydown', onKey);
    return () => {
      button.removeEventListener('click', onClick);
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  // On navigation: close the drawer and mark the current section in the nav.
  useEffect(() => {
    const drawer = document.getElementById('mob-drawer');
    if (drawer?.classList.contains('open')) document.querySelector<HTMLButtonElement>('.mob-toggle')?.click();
    document.querySelectorAll<HTMLElement>('.nav-link[data-prefix]').forEach((a) => {
      a.classList.toggle('active', pathname.startsWith(a.dataset.prefix || '~'));
    });
  }, [pathname]);

  return null;
}
