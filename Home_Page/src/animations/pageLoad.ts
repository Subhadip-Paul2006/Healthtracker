import gsap from 'gsap';

export function runPageLoadAnimation() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    gsap.set(['nav', '[data-hero-label]', '[data-hero-word]', '[data-hero-body]', '[data-hero-search]', '[data-hero-dashboard]', '[data-hero-phone]', '[data-hero-stat]'], { autoAlpha: 1 });
    return;
  }

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.fromTo('nav', { y: -12, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8 })
    .fromTo('[data-hero-label]', { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6 }, '-=0.4')
    .fromTo('[data-hero-word]', { y: 24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.06 }, '-=0.4')
    .fromTo('[data-hero-body]', { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8 }, '-=0.6')
    .fromTo('[data-hero-search]', { scale: 0.96, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 1.4, ease: 'back.out(1.4)' }, '-=0.6')
    .fromTo('[data-hero-dashboard]', { x: 60, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 1 }, '-=1')
    .fromTo('[data-hero-phone]', { x: 40, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 1 }, '-=0.8')
    .fromTo('[data-hero-stat]', { scale: 0.8, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 1.2, ease: 'back.out(2)', stagger: 0.2 }, '-=0.8');

  return tl;
}
