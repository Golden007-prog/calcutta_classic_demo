"use client";

import { useEffect } from "react";

import { withBase } from "@/lib/asset";

/**
 * Perf: Noto Serif Bengali (187KB variable face) is deliberately NOT in
 * next/font — as an @font-face it downloads at VeryHigh priority on every
 * page (the nav toggle renders বাং) and starves the LCP image on slow
 * connections. Instead the self-hosted face loads via the FontFace API
 * after window load + idle; Bengali text renders in the system serif
 * first and swaps in — same visual contract as font-display: swap,
 * without the head-of-line bandwidth cost.
 */
export function BengaliFontLoader() {
  useEffect(() => {
    let cancelled = false;

    const load = () => {
      if (cancelled || document.fonts.check("16px 'Noto Serif Bengali'")) return;
      const face = new FontFace(
        "Noto Serif Bengali",
        `url(${withBase("/fonts/noto-serif-bengali-var.woff2")}) format('woff2')`,
        { weight: "100 900", display: "swap" },
      );
      document.fonts.add(face);
      face.load().catch(() => {
        /* fallback serif stays — no failure state needed */
      });
    };

    const idle = () => {
      if ("requestIdleCallback" in window) requestIdleCallback(load, { timeout: 3000 });
      else setTimeout(load, 1500);
    };

    if (document.readyState === "complete") idle();
    else window.addEventListener("load", idle, { once: true });

    return () => {
      cancelled = true;
      window.removeEventListener("load", idle);
    };
  }, []);

  return null;
}
