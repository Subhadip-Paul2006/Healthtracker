import type { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline';
  fullWidth?: boolean;
}

export function Button({ variant = 'primary', fullWidth, className = '', children, ...props }: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center rounded-chip font-body font-semibold transition-all duration-300 focus-visible:ring-2 focus-visible:ring-orange-burnt focus-visible:outline-none disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-orange-burnt text-ivory hover:bg-orange-light shadow-orange-glow hover:shadow-[0_0_40px_rgba(234,88,12,0.6)] px-7 py-3.5',
    outline: 'border border-sand/30 text-sand hover:border-orange-burnt/60 hover:text-orange-burnt px-7 py-3.5',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button className={`${baseClasses} ${variants[variant]} ${widthClass} ${className}`} {...props}>
      {children}
    </button>
  );
}
