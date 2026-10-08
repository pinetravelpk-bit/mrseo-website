import { ICON_NODES } from './iconNodes';

/* Post icon drawn from the same shapes as the feature images. */
export default function PostIcon({ name, size = 22 }: { name: string; size?: number }) {
  const nodes = ICON_NODES[name] ?? ICON_NODES.search;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {nodes.map(([tag, attrs], i) => {
        const T = tag as 'path';
        return <T key={i} {...attrs} />;
      })}
    </svg>
  );
}
