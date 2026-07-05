"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

/**
 * Lazy shell for the R3F scene (feature 98): never in the critical path —
 * dynamically imported with ssr:false, and only once the browser is idle,
 * the block is near the viewport, and the user is fine with motion.
 */
const MomoScene = dynamic(() => import("./momo-scene/MomoScene"), {
  ssr: false,
});

export function HeroMomo({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const el = ref.current;
    if (!el) return;

    let idleId: number | undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        idleId = (window.requestIdleCallback ?? window.setTimeout)(() =>
          setReady(true),
        ) as unknown as number;
      },
      { rootMargin: "200px" },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      if (idleId !== undefined)
        (window.cancelIdleCallback ?? window.clearTimeout)(idleId);
    };
  }, []);

  return (
    <div ref={ref} aria-hidden className={className}>
      {ready && <MomoScene />}
    </div>
  );
}
