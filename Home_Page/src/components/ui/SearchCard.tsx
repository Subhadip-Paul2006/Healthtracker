import { ArrowRight } from 'lucide-react';

export function SearchCard({ className = '' }: { className?: string }) {
  return (
    <div className={`bg-graphite-dark/60 backdrop-blur-2xl border border-sand/10 rounded-card p-2 pl-6 flex items-center max-w-md shadow-card w-full ${className}`}>
      <div className="flex-1 flex flex-col justify-center">
        <label htmlFor="location" className="text-[10px] text-sand/60 font-semibold tracking-wider uppercase mb-0.5">Location</label>
        <input 
          id="location"
          type="text" 
          placeholder="Enter city or zip code" 
          className="bg-transparent border-none outline-none text-ivory placeholder-sand/40 font-body text-body w-full focus:ring-0"
        />
      </div>
      {/* FlowButton styled search button with color palette */}
      <button className="group relative flex items-center justify-center w-14 h-14 overflow-hidden rounded-full border-[1.5px] border-[#C2410C]/40 bg-[#C2410C] cursor-pointer transition-all duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-transparent hover:rounded-[12px] active:scale-[0.95] shadow-orange-glow">
        {/* Left arrow (arr-2) */}
        <ArrowRight 
          className="absolute w-5 h-5 left-[-25%] stroke-[#FAF3E0] fill-none z-[9] group-hover:left-3 group-hover:stroke-[#3D2314] transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]"
        />

        {/* Icon */}
        <span className="relative z-[1] -translate-x-2 group-hover:translate-x-2 transition-all duration-[800ms] ease-out">
          <svg className="w-6 h-6 stroke-[#FAF3E0] group-hover:stroke-[#3D2314] transition-colors duration-[800ms]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </span>

        {/* Circle */}
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#FAF3E0] rounded-[50%] opacity-0 group-hover:w-[60px] group-hover:h-[60px] group-hover:opacity-100 transition-all duration-[800ms] ease-[cubic-bezier(0.19,1,0.22,1)]"></span>

        {/* Right arrow (arr-1) */}
        <ArrowRight 
          className="absolute w-5 h-5 right-3 stroke-[#FAF3E0] fill-none z-[9] group-hover:right-[-25%] group-hover:stroke-white transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]"
        />
      </button>
    </div>
  );
}
