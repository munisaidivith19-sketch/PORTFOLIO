import { useEffect, useRef, useState } from "react";

/** Animates a number from 0 to `end` over `duration` seconds once `start` is true. */
export default function useCountUp(end: number, start: boolean, duration = 2, decimals = 0) {
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!start || started.current) return;
    started.current = true;

    const startTime = performance.now();
    let raf: number;

    const tick = (now: number) => {
      const progress = Math.min(1, (now - startTime) / (duration * 1000));
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = end * eased;
      setValue(Number(current.toFixed(decimals)));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf);
  }, [start, end, duration, decimals]);

  return value;
}