"use client";

import { useEffect, useRef } from "react";

import { DishImage } from "@/components/ui/DishImage";

/**
 * Feature 72 — multi-layer parallax food imagery between sections.
 * Two texture layers scrub at different speeds via GSAP ScrollTrigger;
 * static composition under reduced motion.
 */
export function ParallaxBand() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ctx: { revert: () => void } | undefined;
    let cancelled = false;

    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        if (cancelled || !el.isConnected) return;
        gsap.registerPlugin(ScrollTrigger);
        ctx = gsap.context(() => {
          const scrub = {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          };
          gsap.fromTo("[data-layer='back']", { yPercent: -14 }, { yPercent: 14, ease: "none", scrollTrigger: scrub });
          gsap.fromTo("[data-layer='front']", { yPercent: 18 }, { yPercent: -18, ease: "none", scrollTrigger: scrub });
        }, el);
      },
    );

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  return (
    <div ref={ref} aria-hidden className="relative h-56 overflow-hidden md:h-72">
      <div data-layer="back" className="absolute inset-x-0 -top-1/4 h-[150%]">
        <DishImage
          src="/images/textures/chutney-swirl.jpg"
          alt=""
          label=""
          className="h-full w-full opacity-60"
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-background" />
      <div data-layer="front" className="absolute right-[8%] top-1/2 w-40 -translate-y-1/2 rotate-3 md:w-56">
        <DishImage
          src="/images/textures/cheese-pull.jpg"
          alt=""
          label=""
          className="aspect-square w-full rounded-3xl border border-line shadow-2xl"
          sizes="224px"
        />
      </div>
      <div className="absolute left-[6%] top-1/2 -translate-y-1/2 md:left-[12%]">
        <p className="max-w-[240px] font-display text-2xl font-semibold md:text-3xl">
          Made fresh. Photographed dangerously close.
        </p>
      </div>
    </div>
  );
}
