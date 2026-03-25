import gsap from 'gsap';

export function runPageLoadSequence(): void {
  // Respect reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    gsap.set(['nav', '[data-hero-label]', '[data-hero-word]', '[data-hero-body]', '[data-search-card]', '[data-hero-back-card]', '[data-hero-phone]', '[data-stat-chip]'], { opacity: 1, y: 0, x: 0, scale: 1 });
    return;
  }

  const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

  tl.fromTo('nav',
    { opacity: 0, y: -12 },
    { opacity: 1, y: 0, duration: 0.5 }
  )
  .fromTo('[data-hero-label]',
    { opacity: 0, y: 8 },
    { opacity: 1, y: 0, duration: 0.4 },
    0.2
  )
  .fromTo('[data-hero-word]',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.5, stagger: 0.06 },
    0.35
  )
  .fromTo('[data-hero-body]',
    { opacity: 0, y: 12 },
    { opacity: 1, y: 0, duration: 0.5 },
    0.65
  )
  .fromTo('[data-search-card]',
    { opacity: 0, scale: 0.96 },
    { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.4)' },
    0.8
  )
  .fromTo('[data-hero-back-card]',
    { opacity: 0, x: 60 },
    { opacity: 1, x: 0, duration: 0.6 },
    0.4
  )
  .fromTo('[data-hero-phone]',
    { opacity: 0, x: 40 },
    { opacity: 1, x: 0, duration: 0.6 },
    0.6
  )
  .fromTo('[data-stat-chip]',
    { opacity: 0, scale: 0.8 },
    { opacity: 1, scale: 1, duration: 0.4, stagger: 0.2, ease: 'back.out(2)' },
    0.8
  );
}
