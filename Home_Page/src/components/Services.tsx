import { SectionLabel } from './ui/SectionLabel';

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
          <a href="#" className="text-orange-burnt font-semibold hover:text-orange-light transition-colors mt-6 md:mt-0 inline-flex items-center gap-2 group">
            View all 
            <span className="transform group-hover:translate-x-1 transition-transform">→</span>
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
              <div className="text-orange-burnt font-semibold text-sm flex items-center gap-2">
                {service.cta}
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
