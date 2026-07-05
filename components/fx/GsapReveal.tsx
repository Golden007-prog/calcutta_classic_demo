"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

/**
 * Feature 73 — GSAP ScrollTrigger reveals. Variants:
 * - "unmask": clip-path unmask (for imagery/panels)
 * - "stagger": children stagger up (for text/card groups)
 * - "settle": image scale-settles from 1.12 → 1
 * Falls back to instant visibility under reduced motion.
 */
export function GsapReveal({
  children,
  variant = "stagger",
  className,
}: {
  children: React.ReactNode;
  variant?: "unmask" | "stagger" | "settle";
  className?: string;
}) {
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
          const trigger = { trigger: el, start: "top 82%", once: true };

          if (variant === "unmask") {
            gsap.fromTo(
              el,
              { clipPath: "inset(0 0 100% 0)" },
              { clipPath: "inset(0 0 0% 0)", duration: 1, ease: "power3.out", scrollTrigger: trigger },
            );
          } else if (variant === "settle") {
            gsap.fromTo(
              el,
              { scale: 1.12, opacity: 0 },
              { scale: 1, opacity: 1, duration: 1.1, ease: "power2.out", scrollTrigger: trigger },
            );
          } else {
            gsap.fromTo(
              el.children,
              { y: 34, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.75, stagger: 0.09, ease: "power3.out", scrollTrigger: trigger },
            );
          }
        }, el);
      },
    );

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [variant]);

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
