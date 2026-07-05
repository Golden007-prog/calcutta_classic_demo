"use client";

import { useEffect, useState } from "react";

/**
 * Feature 70 / bug A3 — a fork IS the cursor on desktop, angled 45° so
 * the tines point to the upper-left like a classic pointer.
 *
 * - `pointermove` on window updates a plain target vector (never React
 *   state); a single rAF loop lerps (~0.2) the rendered position and
 *   writes `translate3d` directly — smooth trail, zero re-renders.
 * - The native cursor is hidden via `html.cc-cursor-none` ONLY while this
 *   component is mounted and active; the class is removed on unmount or
 *   error, so there is never a cursorless (or double-cursor) state.
 * - Strictly gated to `(pointer: fine) and (hover: hover)` and disabled
 *   under `prefers-reduced-motion` — touch devices are never affected.
 * - Scales up over interactive targets, squishes on press. The hotspot
 *   (scale origin + pointer anchor) is the tine tip at viewBox (3,3).
 */

const INTERACTIVE =
  "a, button, [role='button'], input, select, textarea, label, summary, [data-cursor='hover']";

/** Tip of the tines inside the 32×32 viewBox — the pointer hotspot. */
const HOTSPOT = 3;

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

    const el = document.getElementById("cc-fork-cursor");
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
      targetScale = t?.closest?.(INTERACTIVE) ? 1.35 : 1;
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
      if (sprite) sprite.style.transform = `scale(${scale})`;
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
      id="cc-fork-cursor"
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
      {/* Fork drawn pointing up (tip at 16,3), then rotated -45° about the
          tip and shifted so the tip lands at viewBox (3,3) = the hotspot.
          Dark under-stroke keeps it visible on gold fills and cream. */}
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        style={{
          display: "block",
          position: "absolute",
          left: -HOTSPOT,
          top: -HOTSPOT,
          transformOrigin: `${HOTSPOT}px ${HOTSPOT}px`,
          filter: "drop-shadow(0 1px 2px rgb(0 0 0 / 0.45))",
        }}
      >
        <g transform={`translate(-13 0) rotate(-45 16 3)`}>
          {/* outline pass */}
          <g stroke="#0f0f10" strokeWidth="4.4" strokeLinecap="round" fill="none">
            <path d="M11 3 V11" />
            <path d="M16 3 V11" />
            <path d="M21 3 V11" />
            <path d="M11 11 C11 15.5 13 16.5 16 17 C19 16.5 21 15.5 21 11" />
            <path d="M16 17 V29" />
          </g>
          {/* gold fork */}
          <g stroke="#e8a13a" strokeWidth="2.2" strokeLinecap="round" fill="none">
            <path d="M11 3 V11" />
            <path d="M16 3 V11" />
            <path d="M21 3 V11" />
            <path d="M11 11 C11 15.5 13 16.5 16 17 C19 16.5 21 15.5 21 11" />
            <path d="M16 17 V29" />
          </g>
        </g>
      </svg>
    </div>
  );
}
