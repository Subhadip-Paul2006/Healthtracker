import { useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useParallax() {
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(min-width: 768px)', () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const elements = document.querySelectorAll<HTMLElement>('[data-parallax-speed]');
      const triggers: ScrollTrigger[] = [];

      elements.forEach(el => {
        const speed = parseFloat(el.getAttribute('data-parallax-speed') || '0');
        const tl = gsap.to(el, {
          y: () => window.innerHeight * speed,
          ease: 'none',
          scrollTrigger: {
            trigger: document.body,
            start: 'top top',
            end: 'bottom bottom',
            scrub: true,
            invalidateOnRefresh: true,
          }
        });
        if (tl.scrollTrigger) triggers.push(tl.scrollTrigger);
      });

      return () => {
        triggers.forEach(t => t.kill());
      };
    });

    return () => mm.revert();
  }, []);
}
