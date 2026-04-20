import { useEffect, useRef, useState } from 'react';
import { TrendingUp } from 'lucide-react';
import { trending } from '@/lib/articles-data';
import { categoryMeta } from '@/lib/category-meta';
import { cn } from '@/lib/utils';

const maxReads = Math.max(...trending.map((t) => t.reads));

function TrendingRow({
  item,
  rank,
  widthPct,
  visible,
}: {
  item: (typeof trending)[0];
  rank: string;
  widthPct: number;
  visible: boolean;
}) {
  const [bar, setBar] = useState(0);
  const meta = categoryMeta[item.category];

  useEffect(() => {
    if (!visible) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setBar(widthPct);
      return;
    }
    const t = window.setTimeout(() => setBar(widthPct), 120);
    return () => clearTimeout(t);
  }, [visible, widthPct]);

  return (
    <li className="group rounded-xl px-4 py-4 transition-colors duration-300 hover:bg-article-muted/60">
      <div className="flex gap-4">
        <span className="font-articles-serif text-4xl font-semibold text-article-primary/80 transition-transform duration-300 group-hover:scale-[1.04] sm:text-5xl">
          {rank}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-start gap-3">
            <img
              src={item.author.avatar}
              alt=""
              width={36}
              height={36}
              className="mt-0.5 h-9 w-9 shrink-0 rounded-full object-cover ring-1 ring-article-border"
            />
            <div className="min-w-0">
              <p className="font-articles-serif text-base font-semibold leading-snug text-article-fg sm:text-lg">
                {item.title}
              </p>
              <p className="mt-2 flex flex-wrap items-center gap-2 text-xs text-article-fg-muted">
                <span className={cn('inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold', meta.chipClass)}>
                  <span className="h-1 w-1 rounded-full bg-current" aria-hidden />
                  {item.category}
                </span>
                <span>·</span>
                <span>{(item.reads / 1000).toFixed(1)}k reads</span>
              </p>
              <div className="mt-3 h-0.5 w-full overflow-hidden rounded-full bg-article-muted">
                <div
                  className="h-full bg-article-primary transition-[width] duration-[1.2s] ease-out group-hover:animate-pulse-glow"
                  style={{ width: `${bar}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

export function TrendingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="border-y border-article-border/40 bg-article-deep/40 px-4 py-16 sm:px-6 lg:px-8" aria-labelledby="trending-heading">
      <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-2 lg:gap-16 lg:items-start">
        <div className="mb-12 lg:mb-0">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-article-border px-3 py-1 text-xs font-medium text-article-fg-muted">
            <TrendingUp className="h-3.5 w-3.5 animate-[float_4s_ease-in-out_infinite] text-article-primary" aria-hidden />
            Weekly signal
          </div>
          <h2 id="trending-heading" className="font-articles-serif text-3xl font-semibold text-article-fg sm:text-4xl">
            Trending this week
          </h2>
          <p className="mt-4 max-w-md text-pretty leading-relaxed text-article-fg-muted">
            What readers are finishing, sharing, and returning to — ranked by sustained readership, not clicks alone.
          </p>
        </div>
        <ol className="space-y-2">
          {trending.map((item, i) => (
            <TrendingRow
              key={item.id}
              item={item}
              rank={String(i + 1).padStart(2, '0')}
              widthPct={Math.round((item.reads / maxReads) * 100)}
              visible={visible}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}
