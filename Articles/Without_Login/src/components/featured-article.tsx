import { useState } from 'react';
import { Bookmark, BookmarkCheck, Calendar, Eye, Heart, Share2 } from 'lucide-react';
import { featuredArticle } from '@/lib/articles-data';
import { useReveal } from '@/hooks/use-reveal';
import { useMagneticTilt } from '@/hooks/use-magnetic-tilt';

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function FeaturedArticle() {
  const revealRef = useReveal<HTMLDivElement>();
  const tiltRef = useMagneticTilt<HTMLDivElement>();
  const [saved, setSaved] = useState(false);

  const toggleSave = () => {
    setSaved((s) => !s);
  };

  const a = featuredArticle;

  return (
    <section className="relative px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="featured-heading">
      <div className="mx-auto max-w-7xl">
        <div ref={revealRef} className="reveal grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div ref={tiltRef} className="card-tilt group relative">
            <div
              className="pointer-events-none absolute -inset-4 -z-10 rounded-[2rem] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              aria-hidden
            >
              <div className="glow-primary absolute inset-0 scale-90 rounded-[2rem] blur-3xl transition-transform duration-700 group-hover:scale-110" />
            </div>

            <div className="relative overflow-hidden rounded-3xl border border-article-border bg-article-card shadow-xl">
              <span className="absolute left-4 top-4 z-20 rounded-full bg-article-primary px-3 py-1 text-xs font-semibold text-article-primary-fg animate-pulse-glow">
                Featured
              </span>

              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={a.image}
                  alt="Stethoscope beside a red anatomical heart model on a warm wooden surface, illustrating heart health."
                  width={960}
                  height={720}
                  loading="eager"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
            </div>
          </div>

          <div className="relative flex flex-col justify-center">
            <button
              type="button"
              onClick={toggleSave}
              className="absolute right-0 top-0 rounded-full border border-article-border bg-article-muted/80 p-2.5 text-article-fg transition-[transform,background-color] duration-300 hover:bg-article-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-article-primary focus-visible:ring-offset-2 focus-visible:ring-offset-article-bg"
              aria-pressed={saved}
              aria-label={saved ? 'Remove bookmark' : 'Save article'}
            >
              {saved ? (
                <BookmarkCheck className="h-5 w-5 text-article-primary" />
              ) : (
                <Bookmark className="h-5 w-5" />
              )}
            </button>

            <p className="mb-3 inline-flex w-fit rounded-full bg-article-primary/15 px-3 py-1 text-xs font-semibold text-article-primary">
              {a.category}
            </p>

            <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-article-fg-muted">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-4 w-4" aria-hidden />
                {formatDate(a.publishedAt)}
              </span>
              <span className="text-article-border">·</span>
              <span>{a.readMinutes} min read</span>
            </div>

            <h2
              id="featured-heading"
              className="font-articles-serif text-balance text-3xl font-semibold leading-tight text-article-fg sm:text-4xl"
            >
              {a.title}
            </h2>

            <p className="mt-4 text-pretty leading-relaxed text-article-fg-muted">{a.excerpt}</p>

            <div className="mt-8 flex items-center gap-4">
              <img
                src={a.author.avatar}
                alt=""
                width={48}
                height={48}
                className="h-12 w-12 rounded-full object-cover ring-2 ring-article-border"
              />
              <div>
                <p className="font-semibold text-article-fg">{a.author.name}</p>
                <p className="text-sm text-article-fg-muted">{a.author.role}</p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-6 border-t border-article-border/60 pt-6 text-sm text-article-fg-muted">
              <span className="inline-flex items-center gap-1.5">
                <Eye className="h-4 w-4 text-article-primary" aria-hidden />
                {(a.views / 1000).toFixed(1)}k views
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Heart className="h-4 w-4 text-article-primary" aria-hidden />
                {a.likes} likes
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Bookmark className="h-4 w-4 text-article-primary" aria-hidden />
                Saved often
              </span>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href={`#article-${a.slug}`}
                className="shimmer-btn inline-flex items-center gap-2 rounded-full bg-article-primary px-6 py-3 text-sm font-semibold text-article-primary-fg transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-article-primary focus-visible:ring-offset-2 focus-visible:ring-offset-article-bg"
              >
                Read full article →
              </a>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full border border-article-border px-5 py-3 text-sm font-medium text-article-fg transition-colors duration-300 hover:bg-article-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-article-primary focus-visible:ring-offset-2 focus-visible:ring-offset-article-bg"
              >
                <Share2 className="h-4 w-4" aria-hidden />
                Share
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
