import { SectionLabel } from './ui/SectionLabel';
import { Button } from './ui/Button';

export function CTA() {
  return (
    <section className="py-24 bg-cta-gradient relative z-10 overflow-hidden border-t border-sand/5">
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-center">
        
        {/* Left - Phone Mockup (5/12) */}
        <div className="col-span-1 lg:col-span-5 relative h-[500px] md:h-[600px] flex justify-center items-center">
          {/* Floating Vitals Chip */}
          <div className="absolute top-10 right-4 lg:-right-4 z-30 bg-graphite/90 backdrop-blur-xl border border-sand/20 rounded-chip shadow-card p-3 flex items-center gap-3 animate-float pointer-events-none">
            <span className="w-8 h-8 rounded-full bg-orange-burnt/20 text-orange-burnt flex items-center justify-center text-sm">✓</span>
            <span className="text-ivory font-bold text-sm tracking-wide">Your Vitals Are Great</span>
          </div>

          <div data-cta-phone className="relative w-[260px] md:w-[280px] h-[540px] md:h-[580px] bg-coffee-black border-[6px] border-graphite rounded-[40px] shadow-phone transform [transform:perspective(1200px)_rotateY(12deg)_rotateX(4deg)] z-20 overflow-hidden flex flex-col">
            {/* Notch */}
            <div className="absolute top-0 inset-x-0 h-6 bg-graphite rounded-b-[16px] mx-[60px] md:mx-[72px] z-30"></div>
            
            {/* Screen Content Mockup */}
            <div className="flex-1 bg-coffee-black pt-12 p-5 flex flex-col">
              <div className="text-ivory font-display text-xl mb-6">Good morning, Rahul</div>
              
              <div className="bg-graphite-dark border border-sand/10 rounded-xl p-4 mb-4">
                <div className="flex justify-between items-end mb-2">
                  <div className="text-sand/70 text-xs font-bold uppercase tracking-wider">Heart Rate</div>
                  <div className="text-orange-burnt text-[10px] font-bold tracking-widest px-2 py-0.5 rounded-full bg-orange-burnt/10 border border-orange-burnt/20">LIVE</div>
                </div>
                <div className="text-ivory text-3xl font-mono font-bold">72 <span className="text-xs font-sans text-sand/60">bpm</span></div>
                {/* Minimal line chart purely css */}
                <div className="mt-4 h-8 w-full border-b border-sand/10 relative flex items-end justify-between">
                  <div className="w-[10%] h-[40%] bg-orange-burnt/40 rounded-t-sm" />
                  <div className="w-[10%] h-[60%] bg-orange-burnt/60 rounded-t-sm" />
                  <div className="w-[10%] h-[30%] bg-orange-burnt/40 rounded-t-sm" />
                  <div className="w-[10%] h-[80%] bg-orange-burnt/80 rounded-t-sm" />
                  <div className="w-[10%] h-[50%] bg-orange-burnt/60 rounded-t-sm" />
                  <div className="w-[10%] h-[90%] bg-orange-burnt rounded-t-sm relative">
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-ivory shadow-orange-glow animate-pulse"></div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-1 bg-graphite-dark border border-sand/10 rounded-xl p-4">
                  <div className="text-sand/70 text-[10px] font-bold uppercase tracking-wider mb-1">Steps</div>
                  <div className="text-ivory font-mono font-bold text-lg">4.2k</div>
                </div>
                <div className="flex-1 bg-graphite-dark border border-sand/10 rounded-xl p-4">
                  <div className="text-sand/70 text-[10px] font-bold uppercase tracking-wider mb-1">Sleep</div>
                  <div className="text-ivory font-mono font-bold text-lg">7h</div>
                </div>
              </div>
              
              <div className="mt-auto mb-2 w-full h-12 bg-orange-burnt rounded-xl flex items-center justify-center text-ivory font-bold text-sm shadow-orange-glow">
                Book Consultation
              </div>
            </div>
          </div>
          {/* Background glow behind phone */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] bg-orange-burnt/20 blur-[100px] rounded-full z-0 pointer-events-none" />
        </div>

        {/* Right - Text + Form (7/12) */}
        <div className="col-span-1 lg:col-span-7 reveal-block">
          <SectionLabel>Notifications</SectionLabel>
          <h2 className="text-4xl md:text-h1 text-ivory mt-2 font-display mb-6">Only mobile required</h2>
          <p className="text-body-lg text-sand/90 max-w-lg mb-10 leading-relaxed font-medium">
            Get real-time health alerts, track vitals on the go, and consult doctors from anywhere. Optimised for iOS and Android — completely seamless.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mb-12">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="flex-1 bg-graphite-dark border border-sand/20 rounded-chip px-6 py-4 outline-none text-ivory placeholder-sand/50 focus:border-orange-burnt border-transparent ring-0 transition-all font-body text-sm shadow-inner"
            />
            <Button className="whitespace-nowrap shadow-[0_4px_20px_rgba(194,65,12,0.4)]">Get Link</Button>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
              <img className="w-10 h-10 rounded-full border-2 border-coffee-black object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80" alt="User 1" />
              <img className="w-10 h-10 rounded-full border-2 border-coffee-black object-cover" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&q=80" alt="User 2" />
              <img className="w-10 h-10 rounded-full border-2 border-coffee-black object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80" alt="User 3" />
            </div>
            <div className="text-sm font-semibold text-sand/80">
              Join <span className="text-ivory font-bold">1,00,000+</span> partners in the sanctuary
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
