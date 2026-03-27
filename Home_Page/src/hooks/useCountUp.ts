import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useCountUp(target: number, duration: number = 1.8) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!ref.current || hasAnimated.current) return;
    
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCount(target);
      return;
    }

    const obj = { val: 0 };
    
    ScrollTrigger.create({
      trigger: ref.current,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        hasAnimated.current = true;
        gsap.to(obj, {
          val: target,
          duration,
          ease: 'power2.out',
          onUpdate: () => {
            setCount(Math.floor(obj.val));
          },
          onComplete: () => {
            setCount(target);
          }
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => {
        if (t.vars.trigger === ref.current) t.kill();
      });
    };
  }, [target, duration]);

  return { ref, formattedCount: count.toLocaleString('en-IN') };
}
