import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { ACCENTS, allPosts, postBySlug } from '@/lib/blog';
import { getSite } from '@/lib/cms';
import { ICON_NODES } from '@/components/blog/iconNodes';

/* Feature image for each post, designed in code: brand navy, the post's accent
   colour and icon, its category and title, and one of three layout variants.
   Rendered once, cached, and regenerated when posts change in the admin. */

export const dynamic = 'force-static';
export const revalidate = 3600;
export const dynamicParams = true;
export async function generateStaticParams() {
  return (await allPosts()).map((p) => ({ slug: `${p.slug}.png` }));
}

const W = 1200, H = 630;

function IconSvg({ name, size, color }: { name: string; size: number; color: string }) {
  const nodes = ICON_NODES[name] ?? ICON_NODES.search;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      {nodes.map(([tag, attrs], i) => {
        const T = tag as 'path';
        return <T key={i} {...(attrs as Record<string, string>)} />;
      })}
    </svg>
  );
}

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [post, { settings: st }] = await Promise.all([postBySlug(slug.replace(/\.png$/, '')), getSite()]);
  if (!post) return new Response('Not found', { status: 404 });

  const accent = ACCENTS[post.accent].hex;
  const variant = post.index % 3;
  const mark = await readFile(path.join(process.cwd(), 'public', 'logo-mark.png'));
  const fontDir = path.join(process.cwd(), 'src', 'assets', 'fonts');
  const [medium, extraBold] = await Promise.all([readFile(path.join(fontDir, 'PlusJakartaSans-Medium.ttf')), readFile(path.join(fontDir, 'PlusJakartaSans-ExtraBold.ttf'))]);
  const markSrc = `data:image/png;base64,${mark.toString('base64')}`;
  const titleSize = post.title.length > 70 ? 50 : post.title.length > 52 ? 56 : 62;

  // Right-hand artwork differs by variant so the grid of posts does not look repetitive.
  const art =
    variant === 0 ? (
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 14, height: 220 }}>
        {[90, 140, 115, 180, 220].map((h, i) => (
          <div key={i} style={{ width: 34, height: h, borderRadius: 10, background: i === 4 ? accent : 'rgba(255,255,255,.10)' }} />
        ))}
      </div>
    ) : variant === 1 ? (
      <div style={{ display: 'flex', position: 'relative', width: 260, height: 260, alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', width: 260, height: 260, borderRadius: 999, border: `2px solid ${accent}55` }} />
        <div style={{ position: 'absolute', width: 190, height: 190, borderRadius: 999, border: `2px solid ${accent}88` }} />
        <div style={{ position: 'absolute', width: 120, height: 120, borderRadius: 999, background: `${accent}33` }} />
      </div>
    ) : (
      <div style={{ display: 'flex', flexWrap: 'wrap', width: 250, gap: 16 }}>
        {Array.from({ length: 16 }).map((_, i) => (
          <div key={i} style={{ width: 46, height: 46, borderRadius: 12, background: [3, 6, 9, 12].includes(i) ? accent : 'rgba(255,255,255,.08)' }} />
        ))}
      </div>
    );

  return new ImageResponse(
    (
      <div style={{ width: W, height: H, display: 'flex', position: 'relative', background: 'linear-gradient(135deg, #0b1628 0%, #070d18 55%, #0b1a14 100%)', color: '#f1f5fb', fontFamily: 'Jakarta' }}>
        {/* glow */}
        <div style={{ position: 'absolute', right: -160, top: -160, width: 640, height: 640, borderRadius: 999, background: `radial-gradient(circle at center, ${accent}38 0%, ${accent}12 40%, transparent 70%)` }} />
        <div style={{ position: 'absolute', left: 0, top: 0, width: 10, height: H, background: accent }} />

        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '64px 0 56px 76px', width: 790 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ display: 'flex', fontSize: 22, fontWeight: 800, color: accent, background: `${accent}22`, border: `2px solid ${accent}55`, borderRadius: 999, padding: '8px 20px' }}>{post.category}</div>
            <div style={{ display: 'flex', fontSize: 22, color: '#8a9db8' }}>{post.readMins} min read</div>
          </div>
          <div style={{ display: 'flex', fontSize: titleSize, fontWeight: 800, lineHeight: 1.08, letterSpacing: -1.5 }}>{post.title}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={markSrc} width={58} height={58} style={{ borderRadius: 999, border: `3px solid ${accent}` }} alt="" />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', fontSize: 24, fontWeight: 800 }}>{st.ownerName}</div>
              <div style={{ display: 'flex', fontSize: 20, color: '#8a9db8' }}>MrSEO.pk · SEO consultant, {st.baseCity}</div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 36, flex: 1, paddingRight: 56 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 150, height: 150, borderRadius: 40, background: `${accent}1f`, border: `2px solid ${accent}66` }}>
            <IconSvg name={post.icon} size={84} color={accent} />
          </div>
          {art}
        </div>
      </div>
    ),
    {
      width: W, height: H,
      fonts: [
        { name: 'Jakarta', data: medium, weight: 500, style: 'normal' },
        { name: 'Jakarta', data: extraBold, weight: 800, style: 'normal' },
      ],
      headers: { 'Cache-Control': 'public, max-age=3600' } },
  );
}
