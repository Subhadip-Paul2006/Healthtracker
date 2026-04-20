import { ArrowRight } from 'lucide-react';

interface FlowButtonProps {
  text?: string;
  variant?: 'primary' | 'outline' | 'sand' | 'dark';
  fullWidth?: boolean;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export function FlowButton({ 
  text = "Modern Button", 
  variant = 'primary',
  fullWidth = false,
  onClick,
  className = '',
  type = 'button'
}: FlowButtonProps) {
  
  // Color palette:
  // - Dark coffee brown: #3D2314 (coffee-dark)
  // - Burnt orange: #C2410C (orange-burnt)
  // - Mint sand: #C9A87C (sand)
  // - Cloudy white: #FAF3E0 (ivory)
  
  const variantStyles = {
    primary: {
      border: 'border-[#C2410C]/40',
      text: 'text-[#FAF3E0]',
      stroke: 'stroke-[#FAF3E0]',
      bg: 'bg-[#C2410C]',
      hoverBorder: 'hover:border-transparent',
      hoverText: 'hover:text-[#3D2314]',
      hoverStroke: 'group-hover:stroke-[#3D2314]',
      circleBg: 'bg-[#FAF3E0]',
    },
    outline: {
      border: 'border-[#C9A87C]/40',
      text: 'text-[#C9A87C]',
      stroke: 'stroke-[#C9A87C]',
      bg: 'bg-transparent',
      hoverBorder: 'hover:border-transparent',
      hoverText: 'hover:text-[#3D2314]',
      hoverStroke: 'group-hover:stroke-[#3D2314]',
      circleBg: 'bg-[#C9A87C]',
    },
    sand: {
      border: 'border-[#FAF3E0]/40',
      text: 'text-[#FAF3E0]',
      stroke: 'stroke-[#FAF3E0]',
      bg: 'bg-transparent',
      hoverBorder: 'hover:border-transparent',
      hoverText: 'hover:text-[#3D2314]',
      hoverStroke: 'group-hover:stroke-[#3D2314]',
      circleBg: 'bg-[#C9A87C]',
    },
    dark: {
      border: 'border-[#3D2314]/40',
      text: 'text-[#FAF3E0]',
      stroke: 'stroke-[#FAF3E0]',
      bg: 'bg-[#3D2314]',
      hoverBorder: 'hover:border-transparent',
      hoverText: 'hover:text-[#3D2314]',
      hoverStroke: 'group-hover:stroke-[#3D2314]',
      circleBg: 'bg-[#C9A87C]',
    },
  };
  
  const styles = variantStyles[variant];
  const widthClass = fullWidth ? 'w-full' : '';
  
  return (
    <button 
      type={type}
      onClick={onClick}
      className={`group relative flex items-center justify-center gap-1 overflow-hidden rounded-[100px] border-[1.5px] ${styles.border} ${styles.bg} ${widthClass} ${className} px-8 py-3 text-sm font-semibold ${styles.text} cursor-pointer transition-all duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] ${styles.hoverBorder} ${styles.hoverText} hover:rounded-[12px] active:scale-[0.95]`}
    >
      {/* Left arrow (arr-2) */}
      <ArrowRight 
        className={`absolute w-4 h-4 left-[-25%] ${styles.stroke} fill-none z-[9] group-hover:left-4 ${styles.hoverStroke} transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]`}
      />

      {/* Text */}
      <span className="relative z-[1] -translate-x-3 group-hover:translate-x-3 transition-all duration-[800ms] ease-out">
        {text}
      </span>

      {/* Circle */}
      <span className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 ${styles.circleBg} rounded-[50%] opacity-0 group-hover:w-[220px] group-hover:h-[220px] group-hover:opacity-100 transition-all duration-[800ms] ease-[cubic-bezier(0.19,1,0.22,1)]`}></span>

      {/* Right arrow (arr-1) */}
      <ArrowRight 
        className={`absolute w-4 h-4 right-4 ${styles.stroke} fill-none z-[9] group-hover:right-[-25%] group-hover:stroke-white transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]`}
      />
    </button>
  );
}
