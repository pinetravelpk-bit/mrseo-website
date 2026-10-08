import Link from 'next/link';
import type { Metadata } from 'next';
import { PenLine } from 'lucide-react';
import { PageHero } from '@/components/Cards';
import PostCard from '@/components/blog/PostCard';
import { postImage, postUrl, publishedPosts } from '@/lib/blog';
import { abs } from '@/lib/site';
import { pageMeta } from '@/lib/meta';
import { breadcrumbSchema, JsonLd } from '@/lib/schema';

// Re-render every minute so scheduled posts appear on time without a deploy.
export const revalidate = 60;

const TITLE = 'SEO Blog: Guides on Hiring, Pricing and Ranking in Pakistan | MrSEO.pk';
const DESC = 'Practical SEO guides from Syed Mudassir Shah: hiring an SEO expert in Islamabad, pricing, local SEO, technical SEO, AI search and industry playbooks for Pakistani businesses.';

export async function generateMetadata(): Promise<Metadata> {
  const has = publishedPosts().length > 0;
  return { ...pageMeta(TITLE, DESC, '/blog/', 'website'), robots: { index: has, follow: true } };
}

export default function Blog() {
  const posts = publishedPosts();
  const [first, ...rest] = posts;

  return (
    <main id="main-content">
      <JsonLd items={[
        breadcrumbSchema([['Blog', '/blog/']]),
        posts.length ? {
          '@type': 'Blog', '@id': abs('/blog/#blog'), name: 'MrSEO.pk SEO Blog', url: abs('/blog/'), description: DESC,
          publisher: { '@id': abs('/#business') }, inLanguage: 'en-PK',
          blogPost: posts.slice(0, 20).map((p) => ({ '@type': 'BlogPosting', headline: p.title, url: abs(postUrl(p.slug)), datePublished: p.publishAt, image: abs(postImage(p.slug)) })),
        } : null,
      ]} />

      <PageHero
        crumbs={[['Blog']]}
        eyebrow="Latest articles"
        title={<>SEO Blog <span className="g">Pakistan</span></>}
        desc="Straight answers about hiring, pricing and ranking, written from client work in Islamabad, Rawalpindi and across Pakistan. New guides are published regularly."
      />

      <section className="section">
        <div className="container">
          {first ? (
            <>
              <PostCard post={first} featured />
              {rest.length > 0 && <div className="grid grid-3" style={{ marginTop: 24 }}>{rest.map((p) => <PostCard key={p.slug} post={p} />)}</div>}
            </>
          ) : (
            <div className="empty-state container-narrow">
              <span className="ico-badge"><PenLine size={22} /></span>
              <h2>The first guides are on their way</h2>
              <p>Check back soon. In the meantime, the city and industry guides cover how search works across Pakistan in depth.</p>
              <div className="loc-acts" style={{ justifyContent: 'center', margin: '22px 0 0' }}>
                <Link href="/seo-expert/" className="btn btn-o">SEO by city</Link>
                <Link href="/seo-for/" className="btn btn-o">SEO by industry</Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
