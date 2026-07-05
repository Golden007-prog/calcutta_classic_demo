"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";

/**
 * Feature 70 — tiny chili companion cursor, desktop only (fine pointer +
 * hover). The native cursor stays (accessibility); the chili trails it
 * with a spring and perks up over interactive elements.
 */
export function ChiliCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hoveringAction, setHoveringAction] = useState(false);
  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);
  const x = useSpring(mx, { stiffness: 420, damping: 32, mass: 0.5 });
  const y = useSpring(my, { stiffness: 420, damping: 32, mass: 0.5 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine) and (hover: hover)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    setEnabled(true);

    const onMove = (e: PointerEvent) => {
      mx.set(e.clientX + 14);
      my.set(e.clientY + 10);
      const target = e.target as HTMLElement;
      setHoveringAction(Boolean(target.closest("a, button, [role='button'], input, select, textarea")));
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      style={{ x, y }}
      className="pointer-events-none fixed left-0 top-0 z-[95] select-none"
    >
      <motion.span
        animate={{ scale: hoveringAction ? 1.45 : 1, rotate: hoveringAction ? -18 : 0 }}
        transition={{ type: "spring", stiffness: 380, damping: 22 }}
        className="block text-base drop-shadow"
      >
        🌶️
      </motion.span>
    </motion.div>
  );
}
