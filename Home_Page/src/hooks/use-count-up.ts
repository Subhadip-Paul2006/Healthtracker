import { useEffect, useRef, useState } from 'react';

function easeOutQuart(t: number): number {
  return 1 - Math.pow(1 - t, 4);
}

export function useCountUp(
  target: number,
  active: boolean,
  options?: { durationMs?: number; decimals?: number },
): string {
  const durationMs = options?.durationMs ?? 1400;
  const decimals = options?.decimals ?? 0;
  const [value, setValue] = useState(0);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    if (!active) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(target);
      return;
    }

    const tick = (now: number) => {
      if (startRef.current === null) startRef.current = now;
      const elapsed = now - startRef.current;
      const t = Math.min(1, elapsed / durationMs);
      const eased = easeOutQuart(t);
      setValue(target * eased);
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafRef.current);
      startRef.current = null;
    };
  }, [active, target, durationMs]);

  return decimals > 0 ? value.toFixed(decimals) : Math.round(value).toString();
}
