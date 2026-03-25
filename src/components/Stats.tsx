import { useCountUp } from '../hooks/useCountUp';

interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

const STATS: StatItem[] = [
  { value: 1000000, suffix: '+', label: 'Active patients monthly' },
  { value: 200,     suffix: '+', label: 'Labs & Collection Centers' },
  { value: 100,     suffix: '+', label: 'Doctors across India' },
  { value: 100,     suffix: '+', label: 'Pharmacy & Clinics connected' },
];

function StatBlock({ value, suffix, label }: StatItem) {
  const numRef = useCountUp(value, suffix);

  return (
    <div className="flex flex-col items-center border-b md:border-b-0 md:border-r border-sand/10
                    last:border-r-0 last:border-b-0 px-8 py-12" data-stat-chip>
      <div className="w-10 h-[3px] bg-orange-burnt mb-6 rounded-full" />
      <span
        ref={numRef}
        className="font-mono text-stat text-orange-burnt
                   [text-shadow:0_0_32px_rgba(194,65,12,0.5)]"
      >
        0{suffix}
      </span>
      <span className="font-body text-body text-sand mt-3 text-center">
        {label}
      </span>
    </div>
  );
}

export function Stats() {
  return (
    <section className="bg-coffee-deep py-24 relative overflow-hidden" data-stats-container>
      {/* Subtle ambient gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[400px] bg-orange-burnt/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border border-sand/10 rounded-card bg-coffee-black/40 backdrop-blur-sm">
        {STATS.map((s, i) => <StatBlock key={i} {...s} />)}
      </div>
    </section>
  );
}
