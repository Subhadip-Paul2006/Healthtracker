import { SectionLabel } from './ui/SectionLabel';
import { ArrowRight } from 'lucide-react';

const services = [
  { title: 'Video Consultation', icon: '🎥', cta: 'Learn More' },
  { title: 'Doctors Near You', icon: '📍', cta: 'Search Map' },
  { title: 'Lab Tests', icon: '🧪', cta: 'Book Test' },
  { title: 'Personalized Trackers', icon: '📊', cta: 'Get Started' },
];

export function Services() {
  return (
    <section className="py-24 bg-coffee-black relative z-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 reveal-block">
          <div>
            <SectionLabel>Our Features</SectionLabel>
            <h2 className="text-h3 md:text-h2 text-ivory mt-2 font-display">Services Provided</h2>
          </div>
          {/* FlowButton styled View All link */}
          <a href="#" className="group relative flex items-center justify-center gap-1 overflow-hidden rounded-[100px] border-[1.5px] border-[#C9A87C]/40 bg-transparent px-6 py-2.5 text-sm font-semibold text-[#C9A87C] cursor-pointer transition-all duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-transparent hover:text-[#3D2314] hover:rounded-[12px] active:scale-[0.95] mt-6 md:mt-0">
            {/* Left arrow (arr-2) */}
            <ArrowRight 
              className="absolute w-3.5 h-3.5 left-[-25%] stroke-[#C9A87C] fill-none z-[9] group-hover:left-3 group-hover:stroke-[#3D2314] transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]"
            />
            
            {/* Text */}
            <span className="relative z-[1] -translate-x-2 group-hover:translate-x-2 transition-all duration-[800ms] ease-out">
              View all
            </span>
            
            {/* Circle */}
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-[#C9A87C] rounded-[50%] opacity-0 group-hover:w-[120px] group-hover:h-[120px] group-hover:opacity-100 transition-all duration-[800ms] ease-[cubic-bezier(0.19,1,0.22,1)]"></span>
            
            {/* Right arrow (arr-1) */}
            <ArrowRight 
              className="absolute w-3.5 h-3.5 right-3 stroke-[#C9A87C] fill-none z-[9] group-hover:right-[-25%] group-hover:stroke-white transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]"
            />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 reveal-stagger">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-graphite rounded-card border border-sand/10 shadow-card p-8 transition-all duration-300 hover:shadow-card-hover hover:border-orange-burnt/30 hover:scale-[1.02] flex flex-col items-start cursor-pointer group"
            >
              <div className="w-14 h-14 rounded-full bg-coffee-mid border border-sand/10 flex items-center justify-center text-2xl mb-6 shadow-inner">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-ivory mb-2 font-display group-hover:text-orange-burnt transition-colors">{service.title}</h3>
              <p className="text-sand/70 text-sm mb-8 flex-1 leading-relaxed">Premium healthcare simplified and accessible from your home securely.</p>
              
              {/* FlowButton styled CTA */}
              <div className="group/btn relative flex items-center justify-center gap-1 overflow-hidden rounded-[100px] border-[1.5px] border-[#C2410C]/40 bg-transparent px-5 py-2 text-xs font-semibold text-[#C2410C] cursor-pointer transition-all duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-transparent hover:text-[#3D2314] hover:rounded-[8px] active:scale-[0.95]">
                {/* Left arrow (arr-2) */}
                <ArrowRight 
                  className="absolute w-3 h-3 left-[-25%] stroke-[#C2410C] fill-none z-[9] group-hover/btn:left-2 group-hover/btn:stroke-[#3D2314] transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                />
                
                {/* Text */}
                <span className="relative z-[1] -translate-x-1.5 group-hover/btn:translate-x-1.5 transition-all duration-[800ms] ease-out">
                  {service.cta}
                </span>
                
                {/* Circle */}
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-[#C2410C] rounded-[50%] opacity-0 group-hover/btn:w-[100px] group-hover/btn:h-[100px] group-hover/btn:opacity-100 transition-all duration-[800ms] ease-[cubic-bezier(0.19,1,0.22,1)]"></span>
                
                {/* Right arrow (arr-1) */}
                <ArrowRight 
                  className="absolute w-3 h-3 right-2 stroke-[#C2410C] fill-none z-[9] group-hover/btn:right-[-25%] group-hover/btn:stroke-white transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
