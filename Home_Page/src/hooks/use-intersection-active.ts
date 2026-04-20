import { useEffect, useRef, useState } from 'react';

/** True once the element has been ~15% visible — for starting count-ups. */
export function useIntersectionActive(threshold = 0.15): [React.RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setActive(true);
      return;
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          obs.disconnect();
        }
      },
      { threshold },
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, active];
}
