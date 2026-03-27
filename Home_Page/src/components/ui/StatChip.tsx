import React from 'react';

interface StatChipProps {
  icon: string | React.ReactNode;
  text: string;
  className?: string;
  delay?: number;
}

export function StatChip({ icon, text, className = '', delay, ...props }: StatChipProps) {
  return (
    <div 
      className={`absolute flex items-center gap-3 px-4 py-3 bg-sand rounded-chip shadow-card text-coffee-deep font-body text-sm font-bold z-20 transition-transform duration-500 hover:scale-105 ${className}`}
      {...props}
    >
      <span className="text-xl flex-shrink-0 drop-shadow-sm">{icon}</span>
      <span className="whitespace-nowrap leading-none">{text}</span>
    </div>
  );
}
