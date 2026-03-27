import { useState, useEffect } from 'react';

const testimonials = [
  {
    text: "HealthTrack completely changed how I manage my health. The continuous vital monitoring caught an anomaly early, and the immediate video consultation allowed me to address it before it became serious.",
    name: "Priya Sharma",
    role: "Daily Active User",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80"
  },
  {
    text: "As a frequent traveler, having my entire medical history and lab results in one secure place is invaluable. Booking tests in new cities is seamless and reliable.",
    name: "Rahul Desai",
    role: "Premium Member",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&q=80"
  },
  {
    text: "The personalized trackers keep me accountable. The UI is gorgeous, and the insights are genuinely helpful rather than just raw data. Highly recommended.",
    name: "Ananya Patel",
    role: "Fitness Enthusiast",
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&q=80"
  }
];

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 bg-coffee-deep relative z-10 overflow-hidden">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-h2 text-ivory text-center font-display mb-16 reveal-block">What our users have to say</h2>
        
        <div className="relative max-w-2xl mx-auto h-[360px] md:h-[280px]">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              data-testimonial-card
              className={`absolute top-0 inset-x-0 bg-ivory rounded-modal shadow-[0_8px_32px_rgba(0,0,0,0.8)] p-8 md:p-10 transition-all duration-700 ease-in-out origin-center
                ${index === activeIndex ? 'opacity-100 scale-100 z-20 pointer-events-auto shadow-[0_20px_60px_rgba(0,0,0,0.9)]' : 
                  'opacity-0 scale-95 z-0 pointer-events-none'}`}
            >
              <div className="absolute top-6 right-8 text-6xl font-display text-orange-burnt/20 leading-none select-none">❝</div>
              <div className="flex gap-1 text-orange-burnt mb-6 text-sm">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
              <blockquote className="font-body text-body-lg text-coffee-black leading-relaxed relative z-10 font-medium">
                "{testimonial.text}"
              </blockquote>
              <div className="flex items-center gap-4 mt-8">
                <img src={testimonial.avatar} className="w-12 h-12 rounded-full border-2 border-orange-burnt/20 object-cover" alt={testimonial.name} loading="lazy" />
                <div>
                  <div className="font-bold text-coffee-black tracking-wide">{testimonial.name}</div>
                  <div className="text-caption text-graphite font-semibold">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-3 mt-10 relative z-20">
          {testimonials.map((_, index) => (
            <button 
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 outline-none focus-visible:ring-2 ring-offset-2 ring-offset-coffee-deep ring-orange-burnt ${index === activeIndex ? 'w-8 bg-orange-burnt' : 'bg-sand/30 hover:bg-sand/50'}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
