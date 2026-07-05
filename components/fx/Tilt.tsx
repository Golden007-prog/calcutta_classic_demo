"use client";

import { motion, useReducedMotion, useSpring } from "motion/react";
import { useRef } from "react";

/**
 * Feature 76 — springy pointer-tracked 3D perspective tilt.
 * Mouse-only; inert on touch and under reduced motion.
 */
export function Tilt({
  children,
  max = 7,
  className,
}: {
  children: React.ReactNode;
  max?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();
  const rx = useSpring(0, { stiffness: 220, damping: 20 });
  const ry = useSpring(0, { stiffness: 220, damping: 20 });

  const onMove = (e: React.PointerEvent) => {
    if (reduced || e.pointerType !== "mouse") return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    ry.set(px * max * 2);
    rx.set(-py * max * 2);
  };

  const reset = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      className={className ?? "h-full"}
    >
      {children}
    </motion.div>
  );
}
