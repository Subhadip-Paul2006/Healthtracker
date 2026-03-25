import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface ParallaxConfig {
  selector: string;
  speed: number;    // 0.1 = subtle, 0.5 = strong
  direction?: 'y' | 'x';
}

export function useParallax(configs: ParallaxConfig[]): void {
  useEffect(() => {
    // Disable on mobile and respect reduced motion
    const matchesMobile = window.matchMedia('(max-width: 768px)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (matchesMobile || reducedMotion) return;

    let ctx = gsap.context(() => {
      configs.forEach(({ selector, speed, direction = 'y' }) => {
        // Elements need to exist in the DOM
        if (!document.querySelector(selector)) return;
        
        gsap.to(selector, {
          [direction]: () => window.innerHeight * speed * -1,
          ease: 'none',
          scrollTrigger: {
            trigger: 'body',
            start: 'top top',
            end: 'bottom bottom',
            scrub: true,
          },
        });
      });
    });

    return () => ctx.revert();
  }, [configs]);
}
