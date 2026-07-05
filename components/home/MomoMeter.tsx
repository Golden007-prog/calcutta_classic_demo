"use client";

import { animate, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { momoMeter } from "@/lib/momoMeter";

/**
 * Feature 21 — animated live-ish counter of momos steamed today.
 * Computed client-side after mount (deterministic formula, no hydration
 * mismatch), counts up when scrolled into view, then ticks along.
 */
export function MomoMeter() {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState<string>("—");
  const [steaming, setSteaming] = useState(false);

  useEffect(() => {
    if (!inView) return;

    const reading = momoMeter();
    setSteaming(reading.isSteaming);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setDisplay(reading.count.toLocaleString("en-IN"));
    } else {
      const controls = animate(0, reading.count, {
        duration: 1.8,
        ease: [0.22, 1, 0.36, 1],
        onUpdate: (v) => setDisplay(Math.floor(v).toLocaleString("en-IN")),
      });
      return () => controls.stop();
    }
  }, [inView]);

  // Keep it "live": refresh the figure every 30s while steaming.
  useEffect(() => {
    if (!steaming) return;
    const id = window.setInterval(() => {
      setDisplay(momoMeter().count.toLocaleString("en-IN"));
    }, 30_000);
    return () => window.clearInterval(id);
  }, [steaming]);

  return (
    <p className="flex flex-col items-center gap-1">
      <span
        ref={ref}
        className="font-display text-5xl font-semibold tabular-nums text-momo-gold md:text-6xl"
        aria-live="off"
      >
        {display}
      </span>
      <span className="text-xs uppercase tracking-[0.3em] text-soft">
        momos steamed today{" "}
        {steaming ? (
          <span className="text-leaf dark:text-leaf-soft">· steamer on</span>
        ) : (
          <span className="text-chili dark:text-chili-soft">· closed, counting since noon</span>
        )}
      </span>
    </p>
  );
}
