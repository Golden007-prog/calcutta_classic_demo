"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

/**
 * Basic dark/light switch. The animated sun→steam version is feature 80
 * (Phase 8) and will replace the icon swap here.
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="tap-target inline-flex items-center justify-center rounded-full text-foreground/80 transition-colors hover:text-momo-gold"
    >
      {/* Render a stable icon slot before mount to avoid hydration mismatch */}
      {mounted ? (
        isDark ? (
          <Sun size={18} aria-hidden />
        ) : (
          <Moon size={18} aria-hidden />
        )
      ) : (
        <Sun size={18} aria-hidden className="opacity-0" />
      )}
    </button>
  );
}
