"use client";

import { motion, useReducedMotion } from "motion/react";
import { useTheme } from "next-themes";

import { useMounted } from "@/lib/use-mounted";

/**
 * Feature 80 — animated sun ⇄ steam theme toggle (dark default).
 * Sun rays retract and steam curls rise when switching to dark.
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();
  const reduced = useReducedMotion();

  const isDark = mounted ? resolvedTheme === "dark" : true;
  const t = (delay = 0) =>
    reduced
      ? { duration: 0 }
      : { type: "spring" as const, stiffness: 300, damping: 20, delay };

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="tap-target inline-flex items-center justify-center rounded-full text-foreground/80 transition-colors hover:text-momo-gold"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
        {/* core: sun disc ⇄ momo-ish dome. Geometry attrs stay static —
            animating cy/r writes transient "undefined" to the DOM (console
            errors); transform scale/translate reads the same. */}
        <motion.circle
          cx="12"
          cy="12"
          r="4.5"
          initial={false}
          animate={{ scale: isDark ? 1.12 : 0.9, y: isDark ? 2 : 0 }}
          transition={t()}
          style={{ transformOrigin: "12px 12px" }}
        />
        {/* sun rays — visible in light mode */}
        <motion.g
          initial={false}
          animate={{ opacity: isDark ? 0 : 1, scale: isDark ? 0.5 : 1 }}
          transition={t()}
          style={{ transformOrigin: "12px 12px" }}
        >
          <line x1="12" y1="2.5" x2="12" y2="5" />
          <line x1="12" y1="19" x2="12" y2="21.5" />
          <line x1="2.5" y1="12" x2="5" y2="12" />
          <line x1="19" y1="12" x2="21.5" y2="12" />
          <line x1="5.2" y1="5.2" x2="7" y2="7" />
          <line x1="17" y1="17" x2="18.8" y2="18.8" />
          <line x1="5.2" y1="18.8" x2="7" y2="17" />
          <line x1="17" y1="7" x2="18.8" y2="5.2" />
        </motion.g>
        {/* steam curls — visible in dark mode */}
        <motion.g
          initial={false}
          animate={{ opacity: isDark ? 1 : 0, y: isDark ? 0 : 4 }}
          transition={t(reduced ? 0 : 0.08)}
        >
          <path d="M9 8c-1-1.6 1-2.4 0-4" />
          <path d="M12 7.4c-1-1.6 1-2.4 0-4" />
          <path d="M15 8c-1-1.6 1-2.4 0-4" />
        </motion.g>
      </svg>
    </button>
  );
}
