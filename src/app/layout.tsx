import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import './blog.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SiteEffects from '@/components/SiteEffects';
import { DEFAULT_DESC } from "@/lib/meta";
import { SITE_URL } from "@/lib/site";


const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['600', '700', '800'], variable: '--font-jakarta', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'SEO Expert in Pakistan | MrSEO.pk',
  description: DEFAULT_DESC,
  robots: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  openGraph: { siteName: 'MrSEO.pk', locale: 'en_PK', type: 'website', images: [{ url: '/logo.png', width: 1200, height: 630 }] },
  twitter: { card: 'summary_large_image' },
  icons: {
    icon: [{ url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' }, { url: '/favicon.png', type: 'image/png' }],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
    shortcut: '/favicon.png',
  },
  verification: {
    google: 'SO9407YPOQYn5WrxBjV5c3z89WLvD_MMCGc-OicDmI4',
    other: { 'p:domain_verify': 'a0332ce94dad348bff2c9d232b7ba895' },
  },
  other: {
    'msapplication-TileImage': '/favicon.png',
    'msapplication-TileColor': '#080E1A',
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'format-detection': 'telephone=yes',
  },
};

export const viewport: Viewport = { width: 'device-width', initialScale: 1, viewportFit: 'cover', themeColor: '#070d18' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-PK" className={`${inter.variable} ${jakarta.variable}`}>
      
      <body>
        {/* Google tag (gtag.js) and the Google Ads lead-form conversion event, as in the original theme */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-L8M3D1L9PB" strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-L8M3D1L9PB');
          gtag('event', 'conversion', { 'send_to': 'AW-18304128353/zuUVCMqMvM0cEOGqi5hE', 'value': 1.0, 'currency': 'PKR' });
        `}</Script>
        <Header />
        {children}
        <Footer />
        <SiteEffects />
      </body>
    </html>
  );
}
