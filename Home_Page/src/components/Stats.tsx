import { useCountUp } from '../hooks/useCountUp';

const statData = [
  { value: 1000000, suffix: '+', label: 'Active patients monthly', prefix: '' },
  { value: 200, suffix: '+', label: 'Labs & Collection Centers', prefix: '' },
  { value: 100, suffix: '+', label: 'Doctors across India', prefix: '' },
  { value: 100, suffix: '+', label: 'Pharmacy & Clinics connected', prefix: '' },
];

function StatItem({ stat }: { stat: typeof statData[0] }) {
  const { ref, formattedCount } = useCountUp(stat.value);

  return (
    <div className="p-8 lg:p-12 relative flex flex-col items-center justify-center text-center group">
      <div className="w-full flex justify-center mb-6">
        <div className="h-[3px] w-12 bg-orange-burnt/40 group-hover:bg-orange-burnt transition-colors rounded-full shadow-[0_0_10px_rgba(194,65,12,0)] group-hover:shadow-[0_0_15px_rgba(194,65,12,0.6)]" />
      </div>
      <div 
        ref={ref}
        className="font-mono text-4xl lg:text-stat text-orange-burnt mb-3 [text-shadow:0_0_32px_rgba(194,65,12,0.5)] font-bold tracking-tight flex items-baseline justify-center"
      >
        {stat.prefix}{formattedCount}{stat.suffix}
      </div>
      <p className="text-sand/80 text-sm md:text-base font-semibold max-w-[160px] mx-auto leading-snug">
        {stat.label}
      </p>
    </div>
  );
}

export function Stats() {
  return (
    <section className="relative z-10 border-y border-sand/5 bg-transparent">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-sand/10 reveal-block">
          {statData.map((stat, i) => (
            <StatItem key={i} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
