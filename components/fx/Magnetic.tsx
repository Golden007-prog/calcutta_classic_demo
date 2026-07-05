"use client";

import { motion, useReducedMotion, useSpring } from "motion/react";
import { useRef } from "react";

/**
 * Feature 71 — magnetic wrapper with spring physics. Desktop-feel only;
 * inert on touch and under reduced motion.
 */
export function Magnetic({
  children,
  strength = 0.35,
  className,
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();
  const x = useSpring(0, { stiffness: 260, damping: 18, mass: 0.6 });
  const y = useSpring(0, { stiffness: 260, damping: 18, mass: 0.6 });

  const onMove = (e: React.PointerEvent) => {
    if (reduced || e.pointerType !== "mouse") return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className={className ?? "inline-block"}
    >
      {children}
    </motion.div>
  );
}
