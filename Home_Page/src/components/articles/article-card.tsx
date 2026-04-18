import { useState, type CSSProperties } from 'react';
import { Clock, Heart } from 'lucide-react';
import type { Article } from '@/lib/articles-data';
import { categoryMeta } from '@/lib/category-meta';
import { cn } from '@/lib/utils';
import { useReveal } from '@/hooks/use-reveal';
import { useMagneticTilt } from '@/hooks/use-magnetic-tilt';

type Props = { article: Article; index: number; imageLoading?: 'lazy' | 'eager' };

export function ArticleCard({ article, index, imageLoading = 'lazy' }: Props) {
  const ref = useReveal<HTMLDivElement>();
  const tiltRef = useMagneticTilt<HTMLDivElement>();
  const [imgLoaded, setImgLoaded] = useState(false);
  const [likes, setLikes] = useState(article.likes);
  const [liked, setLiked] = useState(false);
  const [heartPop, setHeartPop] = useState(false);

  const meta = categoryMeta[article.category];

  const toggleLike = () => {
    setLiked((wasLiked) => {
      setLikes((likesCount) => likesCount + (wasLiked ? -1 : 1));
      return !wasLiked;
    });
    setHeartPop(true);
    window.setTimeout(() => setHeartPop(false), 450);
  };

  return (
    <article
      ref={ref}
      className="reveal group"
      style={{ '--reveal-delay': `${index * 80}ms` } as CSSProperties}
    >
      <div
        ref={tiltRef}
        className="card-tilt flex h-full flex-col overflow-hidden rounded-2xl border border-article-border bg-article-card shadow-lg transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-2xl hover:ring-1 hover:ring-article-primary/40"
      >
        <a
          href={`#article-${article.slug}`}
          className="relative block aspect-[16/10] overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-article-primary"
        >
          {!imgLoaded && (
            <div
              className="absolute inset-0 bg-gradient-to-r from-article-muted via-article-border/40 to-article-muted animate-shimmer bg-[length:200%_100%]"
              aria-hidden
            />
          )}
          <img
            src={article.image}
            alt=""
            width={640}
            height={400}
            loading={imageLoading}
            decoding="async"
            onLoad={() => setImgLoaded(true)}
            className={cn(
              'h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105',
              !imgLoaded && 'opacity-0',
            )}
          />
          <span
            className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-article-primary/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            aria-hidden
          />
          <span
            className={cn(
              'absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold',
              meta.chipClass,
            )}
          >
            <meta.Icon className="h-3 w-3" aria-hidden />
            {article.category}
          </span>
        </a>

        <div className="flex flex-1 flex-col p-5">
          <h3 className="font-articles-serif line-clamp-2 text-lg font-semibold leading-snug text-article-fg transition-colors duration-300 group-hover:text-article-primary">
            <a href={`#article-${article.slug}`} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-article-primary focus-visible:ring-offset-2 focus-visible:ring-offset-article-card">
              {article.title}
            </a>
          </h3>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-article-fg-muted">{article.excerpt}</p>

          <div className="mt-auto flex items-center justify-between pt-5">
            <div className="flex items-center gap-2">
              <img
                src={article.author.avatar}
                alt=""
                width={32}
                height={32}
                className="h-8 w-8 rounded-full object-cover ring-1 ring-article-border"
              />
              <span className="text-xs font-medium text-article-fg/90">{article.author.name}</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-article-fg-muted">
              <button
                type="button"
                onClick={toggleLike}
                className={cn(
                  'inline-flex items-center gap-1 rounded-md transition-[transform,color] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-article-primary focus-visible:ring-offset-2 focus-visible:ring-offset-article-card',
                  liked && 'text-article-primary',
                  heartPop && 'animate-heart-pop',
                )}
                aria-pressed={liked}
              >
                <Heart className={cn('h-4 w-4', liked && 'fill-article-primary stroke-article-primary')} aria-hidden />
                {likes}
              </button>
              <span className="inline-flex items-center gap-1">
                <Clock className="h-4 w-4" aria-hidden />
                {article.readMinutes} min
              </span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
