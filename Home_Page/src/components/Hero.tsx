import { SectionLabel } from './ui/SectionLabel';
import { SearchCard } from './ui/SearchCard';
import { StatChip } from './ui/StatChip';
import { HeroScene } from './HeroScene';

export function Hero() {
  return (
    <section className="relative min-h-[620px] pt-[72px] lg:pt-0 lg:min-h-screen bg-hero-gradient flex items-center overflow-hidden" data-parallax-speed="0.35">
      {/* Texture overlay */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none z-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
      
      <div data-parallax-speed="0.55" className="absolute inset-0">
        <HeroScene />
      </div>

      <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center py-16 lg:py-0">
        
        {/* Left Column */}
        <div className="col-span-1 lg:col-span-7">
          <div data-hero-label>
            <SectionLabel className="mb-8">AI-Powered Health Platform</SectionLabel>
          </div>
          <h1 className="font-display text-h2 lg:text-h1 text-ivory mb-6 max-w-2xl" data-parallax-speed="0.15">
            <span data-hero-word className="inline-block mr-3">Your</span>
            <span data-hero-word className="inline-block mr-3">health,</span>
            <span data-hero-word className="inline-block mr-3">tracked</span>
            <span data-hero-word className="inline-block text-orange-burnt">smarter.</span>
          </h1>
          <p className="text-body-lg text-sand/90 max-w-xl mb-10" data-hero-body>
            Find top-rated doctors, book lab tests at home, and monitor your vitals securely with India's most trusted healthcare platform.
          </p>
          <div data-hero-search>
            <SearchCard />
          </div>
        </div>

        {/* Right Column - 2.5D Stack */}
        <div className="col-span-1 lg:col-span-5 relative h-[500px] hidden md:block">
          {/* Layer 0: Glow Orb */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-orange-burnt/20 blur-[80px] rounded-full animate-pulse-orb" />
          
          {/* Layer 1: Back dashboard card */}
          <div data-hero-dashboard className="absolute top-10 right-4 w-72 h-80 bg-graphite/80 backdrop-blur-xl border border-sand/10 rounded-card shadow-card transform [transform:perspective(1000px)_rotateY(-14deg)_rotateX(5deg)] z-0 p-6 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-sand/20" />
              <div className="w-24 h-4 rounded bg-sand/20" />
            </div>
            <div className="space-y-4 flex-1">
              <div className="h-2 rounded bg-sand/10 w-full" />
              <div className="h-2 rounded bg-sand/10 w-5/6" />
              <div className="h-2 rounded bg-sand/10 w-4/6" />
            </div>
          </div>

          {/* Layer 2: Phone Mockup */}
          <div data-hero-phone className="absolute top-1/2 left-1/2 -translate-x-[60%] -translate-y-1/2 w-[260px] h-[520px] bg-coffee-black border-[6px] border-graphite-dark rounded-[40px] shadow-phone transform [transform:perspective(1000px)_rotateY(-6deg)_rotateX(2deg)] z-10 overflow-hidden flex flex-col relative">
            <div className="absolute top-0 inset-x-0 h-6 bg-graphite-dark rounded-b-2xl mx-16 z-20"></div>
            <div className="flex-1 bg-gradient-to-b from-coffee-mid to-coffee-black p-4 pt-10 flex flex-col">
              <div className="w-full h-32 rounded-2xl bg-orange-burnt/10 border border-orange-burnt/20 mb-4 flex items-center justify-center shrink-0">
                <div className="text-orange-burnt font-display text-2xl font-bold">HealthTrack</div>
              </div>
              <div className="space-y-3 flex-1">
                <div className="h-16 rounded-xl bg-graphite-dark/80" />
                <div className="h-16 rounded-xl bg-graphite-dark/80" />
                <div className="h-16 rounded-xl bg-graphite-dark/80" />
              </div>
            </div>
          </div>

          {/* Layer 3: StatChips */}
          <div data-hero-stat data-parallax-speed="0.25" className="absolute top-[10%] right-[5%] z-20">
            <StatChip icon="❤️" text="98 bpm" className="transform rotate-[8deg]" />
          </div>
          <div data-hero-stat data-parallax-speed="0.35" className="absolute top-[35%] -left-[10%] z-20">
            <StatChip icon="✅" text="Dr. Available" className="transform -rotate-[6deg]" />
          </div>
          <div data-hero-stat data-parallax-speed="0.45" className="absolute bottom-[20%] right-[-5%] z-20">
            <StatChip icon="📊" text="+12% this week" className="transform rotate-[4deg]" />
          </div>
          <div data-hero-stat data-parallax-speed="0.28" className="absolute top-[5%] left-[5%] z-20">
            <StatChip icon="🧪" text="Lab Result Ready" className="transform -rotate-[10deg]" />
          </div>

          {/* Layer 4: Transition glow */}
          <div className="absolute -bottom-14 left-1/2 h-20 w-[85%] -translate-x-1/2 rounded-full bg-orange-burnt/12 blur-3xl z-0" />
        </div>
      </div>
    </section>
  );
}
