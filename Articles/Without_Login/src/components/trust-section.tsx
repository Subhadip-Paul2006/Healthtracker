import type { LucideIcon } from 'lucide-react';
import { BookOpen, Building2, Shield, Stethoscope } from 'lucide-react';
import { useIntersectionActive } from '@/hooks/use-intersection-active';
import { useCountUp } from '@/hooks/use-count-up';

function StatTile({
  label,
  raw,
  decimals,
  suffix,
  prefix,
  icon: Icon,
  active,
}: {
  label: string;
  raw: number;
  decimals: number;
  suffix: string;
  prefix?: string;
  icon: LucideIcon;
  active: boolean;
}) {
  const n = useCountUp(raw, active, { durationMs: 1400, decimals });
  const text = `${prefix ?? ''}${n}${suffix}`;
  return (
    <div className="group relative flex flex-col items-center rounded-2xl border border-article-border/60 bg-article-card/50 p-8 text-center transition-[transform] duration-300 hover:-translate-y-0.5">
      <div className="relative mb-4 inline-flex rounded-full border border-article-border bg-article-muted p-3 text-article-primary transition-colors duration-300 after:absolute after:-bottom-2 after:left-1/4 after:right-1/4 after:h-px after:bg-article-primary/0 after:transition-colors after:duration-300 group-hover:after:bg-article-primary/80">
        <Icon className="h-6 w-6" aria-hidden />
      </div>
      <p className="font-articles-serif text-4xl font-semibold text-article-fg sm:text-5xl">{text}</p>
      <p className="mt-3 text-sm text-article-fg-muted">{label}</p>
    </div>
  );
}

export function TrustSection() {
  const [ref, active] = useIntersectionActive(0.2);

  return (
    <section ref={ref} className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8" aria-labelledby="trust-heading">
      <div className="mesh-bg absolute inset-0" aria-hidden />
      <div className="grain absolute inset-0" aria-hidden />

      <div className="relative mx-auto max-w-7xl">
        <h2 id="trust-heading" className="mx-auto max-w-3xl text-center font-articles-serif text-3xl font-semibold text-balance text-article-fg sm:text-4xl">
          Built with clinicians. Trusted by millions.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-pretty leading-relaxed text-article-fg-muted">
          Editorial standards, specialty review, and transparent sourcing — so you can read with confidence.
        </p>

        <div className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          <StatTile icon={Building2} label="Board-certified doctors" raw={500} decimals={0} suffix="+" active={active} />
          <StatTile icon={BookOpen} label="Articles read monthly" raw={2.4} decimals={1} suffix="M" active={active} />
          <StatTile icon={Shield} label="Reader satisfaction" raw={98} decimals={0} suffix="%" active={active} />
          <StatTile icon={Stethoscope} label="Clinically reviewed" raw={12} decimals={0} suffix="yrs" active={active} />
        </div>
      </div>
    </section>
  );
}
