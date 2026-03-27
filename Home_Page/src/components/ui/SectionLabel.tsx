import React from 'react';

export function SectionLabel({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`inline-flex px-4 py-1.5 rounded-chip border items-center gap-2 border-sand/20 text-sand text-caption tracking-[0.15em] uppercase font-semibold mb-6 ${className}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-orange-burnt animate-pulse-orb"></span>
      {children}
    </div>
  );
}
