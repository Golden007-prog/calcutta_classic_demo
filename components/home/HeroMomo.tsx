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

    let timerId: number | undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        // Idle + a settle delay so the three.js chunk never contends
        // with the LCP/critical path (feature 98).
        timerId = window.setTimeout(() => setReady(true), 2500);
      },
      { rootMargin: "200px" },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      window.clearTimeout(timerId);
    };
  }, []);

  return (
    <div ref={ref} aria-hidden className={className}>
      {ready && <MomoScene />}
    </div>
  );
}
