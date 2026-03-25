import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useCountUp(
  targetValue: number,
  suffix = '+'
) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    
    // respect reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      ref.current.textContent = Math.round(targetValue).toLocaleString('en-IN') + suffix;
      return;
    }

    const obj = { val: 0 };

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: ref.current,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(obj, {
            val: targetValue,
            duration: 1.8,
            ease: 'power2.out',
            onUpdate: () => {
              if (ref.current) {
                ref.current.textContent =
                  Math.round(obj.val).toLocaleString('en-IN') + suffix;
              }
            },
          });
        },
      });
    }, ref);

    return () => ctx.revert();
  }, [targetValue, suffix]);

  return ref;
}
