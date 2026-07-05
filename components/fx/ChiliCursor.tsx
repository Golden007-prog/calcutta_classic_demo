"use client";

import { useEffect, useState } from "react";

/**
 * Feature 70 / bug A3 — the chili IS the cursor on desktop.
 *
 * - `pointermove` on window updates a plain target vector (never React
 *   state); a single rAF loop lerps (~0.2) the rendered position and
 *   writes `translate3d` directly — smooth trail, zero re-renders.
 * - The native cursor is hidden via `html.cc-cursor-none` ONLY while this
 *   component is mounted and active; the class is removed on unmount or
 *   error, so there is never a cursorless (or double-cursor) state.
 * - Strictly gated to `(pointer: fine) and (hover: hover)` and disabled
 *   under `prefers-reduced-motion` — touch devices are never affected.
 * - Scales up over interactive targets, squishes on press.
 */

const INTERACTIVE =
  "a, button, [role='button'], input, select, textarea, label, summary, [data-cursor='hover']";

export function ChiliCursor() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine) and (hover: hover)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const decide = () => setActive(fine.matches && !reduced.matches);
    decide();
    fine.addEventListener("change", decide);
    reduced.addEventListener("change", decide);
    return () => {
      fine.removeEventListener("change", decide);
      reduced.removeEventListener("change", decide);
    };
  }, []);

  useEffect(() => {
    if (!active) return;

    const el = document.getElementById("cc-chili-cursor");
    if (!el) return;
    const sprite = el.firstElementChild as HTMLElement | null;

    const pos = { x: -100, y: -100 };
    const target = { x: -100, y: -100 };
    let scale = 1;
    let targetScale = 1;
    let pressed = false;
    let hidden = true;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (hidden) {
        // First contact: snap instead of flying in from off-screen.
        pos.x = target.x;
        pos.y = target.y;
        hidden = false;
        el.style.opacity = "1";
      }
      const t = e.target as HTMLElement | null;
      targetScale = t?.closest?.(INTERACTIVE) ? 1.5 : 1;
    };
    const onDown = () => {
      pressed = true;
    };
    const onUp = () => {
      pressed = false;
    };
    const onLeave = () => {
      hidden = true;
      el.style.opacity = "0";
    };

    const loop = () => {
      pos.x += (target.x - pos.x) * 0.2;
      pos.y += (target.y - pos.y) * 0.2;
      scale += ((pressed ? targetScale * 0.82 : targetScale) - scale) * 0.25;
      el.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      if (sprite) sprite.style.transform = `translate(-50%, -50%) scale(${scale})`;
      raf = requestAnimationFrame(loop);
    };

    try {
      document.documentElement.classList.add("cc-cursor-none");
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("pointerdown", onDown, { passive: true });
      window.addEventListener("pointerup", onUp, { passive: true });
      document.documentElement.addEventListener("pointerleave", onLeave);
      raf = requestAnimationFrame(loop);
    } catch {
      document.documentElement.classList.remove("cc-cursor-none");
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      document.documentElement.classList.remove("cc-cursor-none");
    };
  }, [active]);

  if (!active) return null;

  return (
    <div
      id="cc-chili-cursor"
      aria-hidden
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        opacity: 0,
        pointerEvents: "none",
        zIndex: 9999,
        willChange: "transform",
      }}
    >
      <span
        className="block text-xl drop-shadow"
        style={{ display: "block", transform: "translate(-50%, -50%)" }}
      >
        🌶️
      </span>
    </div>
  );
}
