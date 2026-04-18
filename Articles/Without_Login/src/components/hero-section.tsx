import { useMemo, useState } from 'react';
import { getHomePageOrigin } from '@/config';
import { Beaker, Footprints, HeartPulse, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIntersectionActive } from '@/hooks/use-intersection-active';
import { useCountUp } from '@/hooks/use-count-up';

const pills = [
  { label: 'Lab Result Ready', Icon: Beaker, delay: '0s' },
  { label: '98 bpm', Icon: HeartPulse, delay: '0.5s' },
  { label: '2,340 steps', Icon: Footprints, delay: '1s' },
  { label: 'Sleep: 7h 42m', Icon: Moon, delay: '1.5s' },
] as const;

const categories = [
  'All',
  'Nutrition',
  'Fitness',
  'Mental Health',
  'Sleep',
  'Diabetes',
  'Immunity',
] as const;

function StatBlock({
  active,
  display,
  rawTarget,
  label,
}: {
  active: boolean;
  display: 'millions' | 'decimal' | 'int';
  rawTarget: number;
  label: string;
}) {
  const n = useCountUp(rawTarget, active, {
    durationMs: 1400,
    decimals: display === 'decimal' ? 1 : 0,
  });

  const text = useMemo(() => {
    if (display === 'millions') return `${n}M+`;
    if (display === 'decimal') return `${n}★`;
    return `${n}s`;
  }, [display, n]);

  return (
    <div className="text-center">
      <p className="font-articles-serif text-2xl font-semibold text-article-fg sm:text-3xl">{text}</p>
      <p className="mt-1 text-xs text-article-fg-muted sm:text-sm">{label}</p>
    </div>
  );
}

export function HeroSection() {
  const [sectionRef, statsActive] = useIntersectionActive(0.2);
  const [activeCat, setActiveCat] = useState<(typeof categories)[number]>('All');
  const home = getHomePageOrigin();

  return (
    <section ref={sectionRef} className="relative overflow-hidden border-b border-article-border/40">
      <div className="mesh-bg absolute inset-0" aria-hidden />
      <div className="grain absolute inset-0" aria-hidden />

      {/* floating pills */}
      <div className="pointer-events-none absolute inset-0 hidden md:block" aria-hidden>
        {pills.map((p, i) => (
          <div
            key={p.label}
            className={cn(
              'absolute flex items-center gap-2 rounded-full border border-article-border bg-article-card/70 px-3 py-1.5 text-xs font-medium text-article-fg/90 shadow-sm animate-float',
            )}
            style={{
              animationDelay: p.delay,
              top: `${18 + i * 12}%`,
              left: i % 2 === 0 ? '8%' : '82%',
              transform: 'translateY(0)',
            }}
          >
            <p.Icon className="h-3.5 w-3.5 text-article-primary" strokeWidth={2} />
            {p.label}
          </div>
        ))}
      </div>

      <div className="relative mx-auto max-w-5xl px-4 pb-20 pt-16 text-center sm:px-6 lg:px-8 lg:pb-28 lg:pt-24">
        <p className="mb-6 inline-flex items-center rounded-full border border-article-border px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-article-fg-muted">
          AI-Powered Health Platform
        </p>

        <h1 className="font-articles-serif text-balance text-4xl font-semibold leading-tight text-transparent sm:text-5xl lg:text-6xl">
          <span className="bg-gradient-to-br from-article-fg via-article-fg to-article-primary bg-clip-text">
            Your health, tracked.
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-article-fg-muted sm:text-lg">
          Evidence-grounded articles, calm design, and tools that respect your time — built for real routines,
          not perfection.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#latest-articles"
            className="shimmer-btn inline-flex items-center justify-center rounded-full bg-article-primary px-8 py-3.5 text-sm font-semibold text-article-primary-fg shadow-lg transition-[transform,box-shadow] duration-300 hover:-translate-y-px hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-article-primary focus-visible:ring-offset-2 focus-visible:ring-offset-article-bg"
          >
            Explore Articles
          </a>
          <a
            href={`${home}/`}
            className="inline-flex items-center justify-center rounded-full border border-article-border bg-transparent px-8 py-3.5 text-sm font-semibold text-article-fg transition-[background-color,color] duration-300 hover:bg-article-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-article-primary focus-visible:ring-offset-2 focus-visible:ring-offset-article-bg"
          >
            Browse Doctors
          </a>
        </div>

        <div className="mx-auto mt-14 grid max-w-3xl grid-cols-1 gap-8 border-t border-article-border/50 pt-10 sm:grid-cols-3">
          <StatBlock active={statsActive} display="millions" rawTarget={12} label="articles read" />
          <StatBlock active={statsActive} display="decimal" rawTarget={4.9} label="avg rating" />
          <StatBlock active={statsActive} display="int" rawTarget={30} label="avg read" />
        </div>

        <div className="mx-auto mt-12 flex max-w-4xl flex-wrap justify-center gap-2">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setActiveCat(c)}
              className={cn(
                'rounded-full px-4 py-2 text-sm font-medium transition-[background-color,color,transform] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-article-primary focus-visible:ring-offset-2 focus-visible:ring-offset-article-bg',
                activeCat === c
                  ? 'bg-article-primary text-article-primary-fg shadow-md'
                  : 'bg-article-muted text-article-fg/85 hover:bg-article-secondary hover:text-article-secondary-fg',
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
