import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const isReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Default reveal — used on all section elements
export function revealOnScroll(selector: string, delay = 0): void {
  if (isReducedMotion()) {
    gsap.set(selector, { opacity: 1, y: 0 });
    return;
  }
  
  if (!document.querySelector(selector)) return;

  gsap.fromTo(selector,
    { opacity: 0, y: 32 },
    {
      opacity: 1, y: 0,
      duration: 0.6,
      delay,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: selector,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    }
  );
}

// Staggered card reveal — Services, Stats, Articles
export function revealCards(containerSelector: string, cardSelector: string): void {
  const elements = `${containerSelector} ${cardSelector}`;
  
  if (isReducedMotion()) {
    gsap.set(elements, { opacity: 1, y: 0 });
    return;
  }

  if (!document.querySelector(containerSelector)) return;

  gsap.fromTo(elements,
    { opacity: 0, y: 40 },
    {
      opacity: 1, y: 0,
      duration: 0.6,
      stagger: 0.12,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: containerSelector,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    }
  );
}

// Horizontal mirror reveal — Graph cards
export function revealGraphCards(): void {
  if (isReducedMotion()) {
    gsap.set('[data-graph-left], [data-graph-right]', { opacity: 1, x: 0 });
    return;
  }

  if (document.querySelector('[data-graph-left]')) {
    gsap.fromTo('[data-graph-left]',
      { opacity: 0, x: -40 },
      { opacity: 1, x: 0, duration: 0.7, ease: 'power2.out',
        scrollTrigger: { trigger: '[data-analytics]', start: 'top 80%' } }
    );
  }
  
  if (document.querySelector('[data-graph-right]')) {
    gsap.fromTo('[data-graph-right]',
      { opacity: 0, x: 40 },
      { opacity: 1, x: 0, duration: 0.7, ease: 'power2.out',
        scrollTrigger: { trigger: '[data-analytics]', start: 'top 80%' } }
    );
  }
}

// Testimonial card — spring scale reveal
export function revealTestimonial(): void {
  if (isReducedMotion()) {
    gsap.set('[data-testimonial-card]', { opacity: 1, scale: 1 });
    return;
  }

  if (!document.querySelector('[data-testimonials]')) return;

  gsap.fromTo('[data-testimonial-card]',
    { opacity: 0, scale: 0.94 },
    { opacity: 1, scale: 1, duration: 0.7,
      ease: 'back.out(1.6)',
      scrollTrigger: {
        trigger: '[data-testimonials]',
        start: 'top 75%',
      },
    }
  );
}

// Phone CTA — enter from left with rotation settle
export function revealCTAPhone(): void {
  if (isReducedMotion()) {
    gsap.set('[data-cta-phone]', { opacity: 1, x: 0, rotateY: 12 });
    return;
  }

  if (!document.querySelector('[data-cta]')) return;

  gsap.fromTo('[data-cta-phone]',
    { opacity: 0, x: -40, rotateY: 20 },
    { opacity: 1, x: 0, rotateY: 12,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '[data-cta]',
        start: 'top 80%',
      },
    }
  );
}
