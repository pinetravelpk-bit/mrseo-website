import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';
import { ACCENTS, fmtDate, postImage, postUrl, type Post } from '@/lib/blog';

export default function PostCard({ post, featured }: { post: Post; featured?: boolean }) {
  return (
    <Link href={postUrl(post.slug)} className={'card post-card' + (featured ? ' featured' : '')} style={{ ['--acc' as string]: ACCENTS[post.accent].hex }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={postImage(post)} alt="" width={1200} height={630} loading={featured ? 'eager' : 'lazy'} className="post-thumb" />
      <div className="post-body">
        <div className="post-meta">
          <span className="post-cat">{post.category}</span>
          <span><Clock size={14} aria-hidden="true" /> {post.readMins} min read</span>
        </div>
        {featured ? <h2 className="card-t">{post.title}</h2> : <h3 className="card-t">{post.title}</h3>}
        <p className="card-d">{post.description}</p>
        <div className="card-foot">
          <span className="card-meta"><time dateTime={post.publishAt}>{fmtDate(post.publishAt)}</time></span>
          <span className="link-arrow">Read <ArrowRight size={16} /></span>
        </div>
      </div>
    </Link>
  );
}
