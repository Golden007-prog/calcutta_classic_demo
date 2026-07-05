"use client";

import { useEffect } from "react";

/**
 * Feature 74 — Lenis smooth scrolling wired into GSAP ScrollTrigger.
 * Loaded after hydration; skipped entirely for prefers-reduced-motion and
 * coarse pointers (native momentum scrolling is better on touch).
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let cleanup: (() => void) | undefined;
    let cancelled = false;

    Promise.all([
      import("lenis"),
      import("gsap"),
      import("gsap/ScrollTrigger"),
    ]).then(([{ default: Lenis }, { gsap }, { ScrollTrigger }]) => {
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({ autoRaf: false, lerp: 0.12 });
      lenis.on("scroll", ScrollTrigger.update);

      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      cleanup = () => {
        gsap.ticker.remove(tick);
        lenis.destroy();
      };
    });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return null;
}
