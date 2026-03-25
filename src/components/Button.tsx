import React from 'react';

type ButtonVariant = 'primary' | 'outline' | 'ghost' | 'cta';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: ButtonVariant;
  children: React.ReactNode;
  pulse?: boolean;
}

const variants: Record<ButtonVariant, string> = {
  primary: `bg-orange-burnt text-ivory rounded-chip px-6 py-2.5
            hover:bg-orange-light hover:scale-[1.02] active:scale-95
            transition-all duration-200 shadow-orange-glow`,
  outline: `border border-orange-burnt text-orange-burnt rounded-xl
            px-6 py-2.5 hover:bg-orange-burnt hover:text-ivory active:scale-95
            transition-all duration-200`,
  ghost:   `border border-sand/30 text-sand rounded-chip px-5 py-2
            hover:border-ivory hover:text-ivory active:scale-95 transition-all duration-200`,
  cta:     `bg-cta-gradient text-ivory rounded-xl px-8 py-3
            hover:scale-[1.02] active:scale-95 transition-all duration-200 cursor-pointer shadow-orange-glow`,
};

export const Button: React.FC<ButtonProps> = ({ variant, children, pulse, className = '', ...props }) => {
  const baseClasses = variants[variant];
  const pulseClass = pulse ? 'animate-cta-pulse' : '';
  const combinedClasses = `${baseClasses} ${pulseClass} ${className}`.replace(/\s+/g, ' ').trim();

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
};
