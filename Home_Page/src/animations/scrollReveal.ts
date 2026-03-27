import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initScrollReveal() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // Default block reveal
  gsap.utils.toArray<HTMLElement>('.reveal-block').forEach((el) => {
    gsap.fromTo(el,
      { opacity: 0, y: 32 },
      {
        opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 85%' }
      }
    );
  });

  // Staggered cards
  gsap.utils.toArray<HTMLElement>('.reveal-stagger').forEach((container) => {
    const cards = container.children;
    gsap.fromTo(cards,
      { opacity: 0, y: 32 },
      {
        opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', stagger: 0.12,
        scrollTrigger: { trigger: container, start: 'top 85%' }
      }
    );
  });

  // Analytics Mirror
  gsap.utils.toArray<HTMLElement>('[data-graph-left]').forEach((el) => {
    gsap.fromTo(el, { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 85%' } });
  });
  gsap.utils.toArray<HTMLElement>('[data-graph-right]').forEach((el) => {
    gsap.fromTo(el, { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 85%' } });
  });

  // Testimonial Spring
  gsap.utils.toArray<HTMLElement>('[data-testimonial-card]').forEach((el) => {
    gsap.fromTo(el, { scale: 0.94, opacity: 0 }, { scale: 1, opacity: 1, duration: 1, ease: 'back.out(1.6)', scrollTrigger: { trigger: el, start: 'top 85%' } });
  });

  // CTA Phone
  const ctaPhone = document.querySelector('[data-cta-phone]');
  if (ctaPhone) {
    gsap.fromTo(ctaPhone, 
      { opacity: 0, rotateY: 20 }, 
      { opacity: 1, rotateY: 12, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: ctaPhone, start: 'top 85%' } }
    );
  }
}

export function killScrollTriggers() {
  ScrollTrigger.getAll().forEach(t => t.kill());
}
