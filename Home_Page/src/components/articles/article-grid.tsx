import { useRef, useState, type MouseEvent } from 'react';
import { Plus } from 'lucide-react';
import { articles, articlesLoadMore, type Article } from '@/lib/articles-data';
import { ArticleCard } from './article-card';

export function ArticleGrid() {
  const [extra, setExtra] = useState<Article[]>([]);
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);
  const idRef = useRef(0);

  const loadMore = (e: MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const id = ++idRef.current;
    setRipples((r) => [...r, { x: e.clientX - rect.left, y: e.clientY - rect.top, id }]);
    window.setTimeout(() => setRipples((r) => r.filter((x) => x.id !== id)), 800);

    setExtra(articlesLoadMore);
  };

  const all: Article[] = [...articles, ...extra];
  const canLoadMore = extra.length === 0 && articlesLoadMore.length > 0;

  return (
    <section id="latest-articles" className="scroll-mt-24 px-4 py-16 sm:px-6 lg:px-8" aria-labelledby="latest-articles-heading">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 id="latest-articles-heading" className="font-articles-serif text-3xl font-semibold text-article-fg sm:text-4xl">
              Latest articles
            </h2>
            <p className="mt-2 max-w-xl text-pretty text-article-fg-muted">
              Fresh, clinician-reviewed stories you can apply this week — no noise, no fad language.
            </p>
          </div>
          <label className="flex items-center gap-2 text-sm text-article-fg-muted">
            Sort by
            <select className="rounded-full border border-article-border bg-article-muted px-3 py-2 text-sm text-article-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-article-primary focus-visible:ring-offset-2 focus-visible:ring-offset-article-bg">
              <option>Newest</option>
              <option>Most read</option>
              <option>Short reads</option>
            </select>
          </label>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {all.map((a, i) => (
            <ArticleCard key={`${a.id}-${i}`} article={a} index={i} imageLoading={i < 6 ? 'eager' : 'lazy'} />
          ))}
        </div>

        {canLoadMore ? (
          <div className="mt-12 flex justify-center">
            <button
              type="button"
              onClick={loadMore}
              className="group relative overflow-hidden rounded-full border border-article-border bg-article-card px-8 py-3 text-sm font-semibold text-article-fg transition-[transform,background-color] duration-300 hover:bg-article-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-article-primary focus-visible:ring-offset-2 focus-visible:ring-offset-article-bg"
            >
              {ripples.map((r) => (
                <span
                  key={r.id}
                  className="pointer-events-none absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-article-primary/40 animate-ripple"
                  style={{ left: r.x, top: r.y }}
                  aria-hidden
                />
              ))}
              <span className="inline-flex items-center gap-2">
                <Plus className="h-4 w-4 transition-transform duration-300 group-hover:rotate-90" aria-hidden />
                Load more
              </span>
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
