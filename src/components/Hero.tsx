import React from 'react';
import { HeroScene } from './HeroScene';
import { Button } from './Button';
import { Search } from 'lucide-react';
import { useParallax } from '../hooks/useParallax';

function StatChip({ label, style, delay, className = '' }: { label: string; style: React.CSSProperties; delay: number; className?: string }) {
  return (
    <div
      data-stat-chip
      className={`absolute px-4 py-2 bg-coffee-black/80 backdrop-blur-md border border-sand/20 rounded-chip shadow-card text-ivory text-sm font-body whitespace-nowrap z-20 ${className}`}
      style={{ ...style, animationDelay: `${delay}s` }}
    >
      {label}
    </div>
  );
}

function MiniDashboardUI() {
  return (
    <div className="w-full h-full p-4 flex flex-col gap-3 opacity-60">
      <div className="flex gap-2 items-center">
        <div className="w-8 h-8 rounded-full bg-sand/20" />
        <div className="flex-1 space-y-1">
          <div className="w-1/2 h-2 bg-sand/30 rounded" />
          <div className="w-1/3 h-2 bg-sand/10 rounded" />
        </div>
      </div>
      <div className="flex gap-2">
        <div className="w-full h-16 bg-orange-burnt/20 rounded-lg flex items-end p-2 gap-1">
          {[40, 70, 45, 90, 65].map((h, i) => (
            <div key={i} className="flex-1 bg-orange-burnt/60 rounded-sm" style={{ height: `${h}%` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function PhoneMockup() {
  return (
    <div className="w-full aspect-[1/2.1] bg-coffee-black border-[6px] border-[#3A3A3A] rounded-[2.5rem] overflow-hidden relative shadow-inner">
      <div className="absolute top-0 inset-x-0 h-6 bg-[#3A3A3A] rounded-b-xl w-1/2 mx-auto" />
      <div className="p-4 pt-10 h-full bg-gradient-to-b from-coffee-mid to-coffee-deep flex flex-col gap-4">
        <div className="flex justify-between items-center text-ivory">
          <div className="font-display font-bold">HealthTrack</div>
          <div className="w-6 h-6 rounded-full bg-orange-burnt/20 flex items-center justify-center">
            <div className="w-3 h-3 bg-orange-burnt rounded-sm" />
          </div>
        </div>
        <div className="w-full h-32 bg-graphite rounded-xl p-3 border border-sand/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-orange-burnt/10 rounded-full blur-xl" />
          <div className="text-sand text-xs mb-1">Heart Rate</div>
          <div className="text-ivory text-2xl font-mono font-bold">98 <span className="text-sm font-body font-normal text-sand">bpm</span></div>
          {/* subtle line */}
          <svg className="absolute bottom-2 left-0 w-full h-8" preserveAspectRatio="none" viewBox="0 0 100 100">
            <path d="M0,50 Q25,10 50,50 T100,50" fill="none" stroke="#C2410C" strokeWidth="2" />
          </svg>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-graphite h-20 rounded-xl border border-sand/10 p-2">
            <div className="w-4 h-4 bg-orange-burnt/20 rounded mb-4" />
            <div className="w-full h-1.5 bg-sand/20 rounded mb-1" />
            <div className="w-2/3 h-1.5 bg-sand/10 rounded" />
          </div>
          <div className="bg-graphite h-20 rounded-xl border border-sand/10 p-2">
            <div className="w-4 h-4 bg-sand/20 rounded mb-4" />
            <div className="w-full h-1.5 bg-sand/20 rounded mb-1" />
            <div className="w-1/2 h-1.5 bg-sand/10 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  useParallax([
    { selector: '[data-hero-h1]', speed: 0.15 },
    { selector: '[data-hero-back-card]', speed: 0.35 },
    { selector: '[data-hero-phone]', speed: 0.15 },
  ]);

  return (
    <section className="relative min-h-screen pt-24 pb-12 bg-hero-gradient overflow-hidden flex items-center">
      <HeroScene />
      
      {/* SVG Grain Overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none mix-blend-overlay"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
      />

      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center min-h-[620px]">
        {/* Left Content */}
        <div className="lg:col-span-7 pt-10 text-center lg:text-left">
          <div data-hero-label className="inline-block px-4 py-1.5 rounded-chip border border-sand/20 bg-graphite/40 backdrop-blur-md text-orange-light text-xs font-bold tracking-widest mb-6">
            INDIA'S #1 HEALTH PLATFORM
          </div>
          
          <h1 data-hero-h1 className="font-display text-h2 md:text-h1 text-ivory min-h-[140px]">
            {'Your health, tracked smarter.'.split(' ').map((word, i) => (
              <span key={i} data-hero-word className="inline-block mr-3">{word}</span>
            ))}
          </h1>
          
          <p data-hero-body className="font-body text-body md:text-body-lg text-sand-dark mt-4 mb-10 max-w-lg mx-auto lg:mx-0">
            Find doctors, book lab tests, and track your vitals — all in one seamlessly designed experience.
          </p>
          
          <div data-search-card className="bg-graphite/80 backdrop-blur-md border border-sand/10 p-2 pr-2 pl-6 rounded-chip shadow-card flex items-center max-w-md mx-auto lg:mx-0">
            <Search className="text-sand/50" size={20} />
            <input 
              type="text" 
              placeholder="Search doctors, specialties..." 
              className="flex-1 bg-transparent border-none outline-none text-ivory px-4 py-3 placeholder:text-sand/40 font-body"
            />
            <Button variant="cta" className="hidden sm:block">Search</Button>
          </div>
          <Button variant="cta" className="w-full mt-4 sm:hidden">Search</Button>
        </div>

        {/* Right 2.5D Visual Stack */}
        <div className="lg:col-span-5 relative h-[500px] lg:h-[600px] mt-12 lg:mt-0 flex justify-center items-center perspective-1000">
          
          {/* Layer 0: Glow orb */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-burnt/10 blur-[80px] w-[300px] h-[300px] md:w-[400px] md:h-[400px] animate-pulse-orb pointer-events-none" />

          {/* Layer 1: Back dashboard card */}
          <div 
            data-hero-back-card
            className="absolute top-20 left-10 lg:top-16 lg:left-0 w-56 h-36 md:w-64 md:h-40 bg-graphite rounded-card shadow-phone border border-sand/10 hidden md:block"
            style={{ transform: 'perspective(1000px) rotateY(-14deg) rotateX(5deg)' }}
          >
            <MiniDashboardUI />
          </div>

          {/* Layer 2: Phone mockup */}
          <div 
            data-hero-phone
            className="relative z-10 w-48 md:w-56 shadow-phone animate-float-slow"
            style={{ transform: 'perspective(1000px) rotateY(-6deg) rotateX(2deg)' }}
          >
            <PhoneMockup />
          </div>

          {/* Layer 3: Floating stat chips */}
          <StatChip label="❤️ 98 bpm" className="hidden sm:block" style={{ top: '15%', right: '0%', rotate: '8deg' }} delay={0} />
          <StatChip label="✅ Dr. Available" className="hidden sm:block" style={{ top: '45%', left: '-10%', rotate: '-6deg' }} delay={0.3} />
          <StatChip label="📊 +12% this week" className="hidden sm:block" style={{ bottom: '15%', right: '5%', rotate: '4deg' }} delay={0.6} />
          <StatChip label="🧪 Lab Result Ready" className="hidden md:block" style={{ top: '5%', left: '10%', rotate: '-10deg' }} delay={0.9} />

          {/* Layer 4: Ground glow */}
          <div className="absolute bottom-10 left-0 right-0 h-[2px] w-3/4 mx-auto bg-[linear-gradient(90deg,transparent,rgba(194,65,12,0.6),transparent)] blur-sm" />
        </div>
      </div>
    </section>
  );
}
