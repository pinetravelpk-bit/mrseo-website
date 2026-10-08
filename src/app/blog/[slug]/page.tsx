import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowRight, CalendarDays, Clock, ListChecks } from 'lucide-react';
import { Breadcrumb, CtaPanel, SectionHead } from '@/components/Cards';
import { AnswerBox, Faqs } from '@/components/Article';
import Toc from '@/components/Toc';
import Blocks from '@/components/blog/Blocks';
import Inline, { plain } from '@/components/blog/Inline';
import PostCard from '@/components/blog/PostCard';
import { WhatsAppIcon } from '@/components/Icon';
import { ACCENTS, ALL_POSTS, fmtDate, isPublished, modifiedAt, postBySlug, postImage, postUrl, relatedPosts } from '@/lib/blog';
import { abs, waLink } from '@/lib/site';
import { pageMeta } from '@/lib/meta';
import { breadcrumbSchema, faqSchema, JsonLd } from '@/lib/schema';

type Props = { params: Promise<{ slug: string }> };

// Scheduled posts: every slug is pre-built, but a post only renders once its time has passed.
export const revalidate = 60;
export const dynamicParams = false;
export function generateStaticParams() {
  return ALL_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = postBySlug((await params).slug);
  if (!post || !isPublished(post)) return { robots: { index: false } };
  const desc = post.metaDescription ?? post.description;
  const base = pageMeta(`${post.title} | MrSEO.pk`, desc, postUrl(post.slug), 'article');
  const img = [{ url: postImage(post.slug), width: 1200, height: 630, alt: post.title }];
  return {
    ...base,
    keywords: [post.keyword],
    authors: [{ name: 'Syed Mudassir Shah', url: abs('/about/') }],
    openGraph: {
      type: 'article', title: post.title, description: desc, url: postUrl(post.slug), siteName: 'MrSEO.pk', locale: 'en_PK',
      images: img, publishedTime: post.publishAt, modifiedTime: modifiedAt(post), authors: [abs('/about/')], section: post.category, tags: [post.keyword],
    },
    twitter: { card: 'summary_large_image', title: post.title, description: desc, images: [postImage(post.slug)] },
  };
}

export default async function PostPage({ params }: Props) {
  const post = postBySlug((await params).slug);
  if (!post || !isPublished(post)) notFound();

  const url = postUrl(post.slug);
  const video = post.body.find((b) => b.type === 'video');
  const related = relatedPosts(post);
  const accent = ACCENTS[post.accent];
  const toc = [{ id: 'quick-answer', label: 'Quick answer' }, ...post.toc, ...(post.faqs.length ? [{ id: 'faq', label: 'Frequently asked questions' }] : [])];

  return (
    <main id="main-content" style={{ ['--acc' as string]: accent.hex, ['--acc-soft' as string]: accent.soft }}>
      <JsonLd items={[
        breadcrumbSchema([['Blog', '/blog/'], [post.title, url]]),
        {
          '@type': 'BlogPosting', '@id': abs(url) + '#article', headline: post.title, description: post.description,
          image: { '@type': 'ImageObject', url: abs(postImage(post.slug)), width: 1200, height: 630 },
          datePublished: post.publishAt, dateModified: modifiedAt(post),
          author: { '@id': abs('/#owner') }, publisher: { '@id': abs('/#business') },
          mainEntityOfPage: abs(url), url: abs(url), inLanguage: 'en-PK',
          articleSection: post.category, keywords: post.keyword, wordCount: post.words,
          abstract: post.answer,
          speakable: { '@type': 'SpeakableSpecification', cssSelector: ['.loc-h1', '.answer-text', '.takeaways'] },
          about: [{ '@type': 'Thing', name: post.keyword }],
        },
        faqSchema(post.faqs),
        video && video.type === 'video' ? {
          '@type': 'HowTo', name: video.title, description: post.description, image: abs(postImage(post.slug)),
          step: video.steps.map((s, i) => ({ '@type': 'HowToStep', position: i + 1, name: s.title, text: plain(s.text) })),
        } : null,
      ]} />

      <div className="page-hero">
        <div className="container">
          <Breadcrumb items={[['Blog', '/blog/'], [post.category]]} />
          <div className="eyebrow post-eyebrow">{post.category}</div>
          <h1 className="loc-h1">{post.title}</h1>
          <p className="loc-desc">{post.description}</p>
          <div className="post-byline">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-mark.png" alt="" width={44} height={44} />
            <div>
              <span className="ab-name">By <Link href="/about/" rel="author">Syed Mudassir Shah</Link></span>
              <span className="post-facts">
                <span><CalendarDays size={15} aria-hidden="true" /> <time dateTime={post.publishAt}>{fmtDate(post.publishAt)}</time></span>
                <span><Clock size={15} aria-hidden="true" /> {post.readMins} min read</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <section className="section" style={{ paddingTop: 40 }}>
        <div className="container">
          <figure className="post-hero-img">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={postImage(post.slug)} alt={`${post.title}: feature image`} width={1200} height={630} fetchPriority="high" />
          </figure>

          <div className="article-layout has-toc">
            <Toc items={toc} />
            <article className="mrseo-article post-article">
              <div id="quick-answer">
                <AnswerBox question={`Quick answer: ${post.keyword}`} answer={post.answer} />
              </div>
              <div className="takeaways">
                <p className="tk-title"><ListChecks size={18} aria-hidden="true" /> Key takeaways</p>
                <ul>{post.takeaways.map((t) => <li key={t}><Inline text={t} /></li>)}</ul>
              </div>

              <Blocks blocks={post.body} />

              <aside className="author-box">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logo-mark.png" alt="Syed Mudassir Shah" width={72} height={72} />
                <div>
                  <p className="author-name">About the author</p>
                  <p><strong>Syed Mudassir Shah</strong> is an Islamabad-based SEO consultant who has worked on Pakistani search since 2010 and founded MrSEO.pk. He runs client accounts across eight cities and teaches digital marketing at the Scheme 3, Rawalpindi campus.</p>
                  <Link href="/about/" className="link-arrow">More about Syed <ArrowRight size={16} /></Link>
                </div>
              </aside>

              <Faqs faqs={post.faqs} />

              {post.related && post.related.length > 0 && (
                <nav className="post-related-links" aria-label="Related pages">
                  <p className="tk-title">Related on MrSEO.pk</p>
                  <ul>{post.related.map((r) => <li key={r.href}><Link href={r.href}>{r.label} <ArrowRight size={15} aria-hidden="true" /></Link></li>)}</ul>
                </nav>
              )}
            </article>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section section-alt">
          <div className="container">
            <SectionHead eyebrow="Keep reading" title={<>Related <span className="g">guides</span></>} />
            <div className="grid grid-3">{related.map((p) => <PostCard key={p.slug} post={p} />)}</div>
          </div>
        </section>
      )}

      <CtaPanel
        title={<>Want this applied to <span className="g">your site?</span></>}
        text="Send your URL and get a written audit within 24 hours: what is working, what is broken and what to fix first. No obligation."
        note="Free, delivered in 24 hours, no commitment"
      >
        <Link href="/contact/" className="btn btn-g btn-lg">Get a free SEO audit</Link>
        <a href={waLink(`Hi Syed, I read your article "${post.title}" and want to discuss my site.`)} className="btn btn-wa btn-lg" target="_blank" rel="noopener"><WhatsAppIcon /> WhatsApp</a>
      </CtaPanel>
    </main>
  );
}
