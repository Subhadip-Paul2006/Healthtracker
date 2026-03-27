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
      <button className="w-14 h-14 rounded-full bg-orange-burnt hover:bg-orange-light text-ivory flex items-center justify-center transition-colors shadow-orange-glow focus-visible:ring-2 focus-visible:ring-ivory focus-visible:outline-none group">
        <svg className="w-6 h-6 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </button>
    </div>
  );
}
