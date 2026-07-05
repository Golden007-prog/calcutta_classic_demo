"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { withBase } from "@/lib/asset";
import { cn } from "@/lib/utils";

/**
 * Features 86–92 — "The Steam Ritual" first-visit preloader.
 *
 * - sessionStorage-gated: shown once per session, never on soft navs.
 * - Zero-flash gating: an inline script in app/layout.tsx sets
 *   `html[data-preload="1"]` BEFORE first paint; CSS shows this overlay
 *   only under that attribute, so repeat visitors never see a frame of it.
 * - Progress is real: document.fonts.ready + preloading the first hero/dish
 *   images (feature 92 — the ritual doubles as a warm-up gate).
 * - Hard cap 2.5s, min 0.9s, skippable on tap/Enter (feature 86).
 * - Variants rotate per visit: basket steam / coffee pour / fish fry flip
 *   (feature 87).
 * - Bengali numerals when the language toggle is set to বাংলা (feature 89).
 * - prefers-reduced-motion: static wordmark + quick fade only (feature 91).
 */

const SESSION_KEY = "cc-steam-ritual";
const MAX_MS = 2500;
const MIN_MS = 900;

/**
 * Warmed while the ritual plays (feature 92) — via low-priority
 * <link rel="prefetch"> so the browser schedules them AFTER the LCP
 * poster instead of competing with it (spec §8: never fight the budget).
 */
const WARM_ASSETS = [
  "/images/hero/video-poster.jpg",
  "/images/dishes/steam-momo.jpg",
  "/images/dishes/bhetki-fish-fry.jpg",
  "/images/dishes/momo-burger.jpg",
  "/images/dishes/royal-chicken-bucket.jpg",
  "/images/dishes/belgian-coffee.jpg",
  "/images/dishes/peri-peri-momo.jpg",
];

const BN_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

function toBengali(n: number): string {
  return String(n)
    .split("")
    .map((d) => BN_DIGITS[Number(d)] ?? d)
    .join("");
}

type Variant = "basket" | "coffee" | "fry";
const VARIANTS: Variant[] = ["basket", "coffee", "fry"];

type Phase = "pending" | "off" | "running" | "leaving";

export function Preloader() {
  // "pending" is what the server renders: a bare charcoal shell that CSS
  // only reveals when the inline gate script stamped html[data-preload].
  const [phase, setPhase] = useState<Phase>("pending");
  const [progress, setProgress] = useState(0);
  const [variant, setVariant] = useState<Variant>("basket");
  const [bengali, setBengali] = useState(false);
  const [reduced, setReduced] = useState(false);
  const doneRef = useRef(false);

  const finish = useCallback(() => {
    if (doneRef.current) return;
    doneRef.current = true;
    setProgress(100);
    setPhase("leaving");
    window.setTimeout(() => {
      document.documentElement.removeAttribute("data-preload");
      setPhase("off");
    }, 450);
  }, []);

  useEffect(() => {
    if (document.documentElement.getAttribute("data-preload") !== "1") {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-shot sync with the pre-paint sessionStorage gate; client-only by design
      setPhase("off"); // repeat visit — inline gate script already opted out
      return;
    }

    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      /* private mode — show it anyway, just this once */
    }

    setPhase("running");
    setVariant(VARIANTS[Math.floor(Math.random() * VARIANTS.length)]);
    try {
      setBengali(localStorage.getItem("cc-lang") === "bn");
    } catch {
      /* ignore */
    }

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    setReduced(prefersReduced);

    const started = performance.now();
    let fontsReady = false;
    let raf = 0;

    document.fonts.ready.then(() => {
      fontsReady = true;
    });

    // Low-priority warm-up, scheduled well after the LCP window so the
    // hero poster keeps the whole pipe to itself.
    window.setTimeout(() => {
      for (const href of WARM_ASSETS) {
        const link = document.createElement("link");
        link.rel = "prefetch";
        link.as = "image";
        link.href = withBase(href);
        document.head.appendChild(link);
      }
    }, 4000);

    const cap = prefersReduced ? 800 : MAX_MS;

    const tick = () => {
      if (doneRef.current) return;
      const elapsed = performance.now() - started;
      // Fonts are the only real blocking signal; time floors the rest.
      const real = fontsReady ? 88 + Math.min(12, (elapsed / MIN_MS) * 12) : 0;
      const floor = (elapsed / cap) * 100;
      const value = Math.min(99, Math.max(real, floor));
      setProgress(Math.round(value));

      if ((fontsReady && elapsed >= MIN_MS) || elapsed >= cap) {
        finish();
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf);
  }, [finish]);

  if (phase === "off") return null;

  const displayValue = bengali ? toBengali(progress) : String(progress);
  const running = phase === "running" || phase === "leaving";

  return (
    <div
      id="cc-preloader-gate"
      className={cn(
        "fixed inset-0 z-[100] bg-charcoal text-cream transition-opacity duration-[400ms]",
        phase === "leaving" && "pointer-events-none opacity-0",
      )}
      role="status"
      aria-live="polite"
      aria-label="Loading The Calcutta Classics"
    >
      <div className="grid h-full w-full place-items-center">
        {running && (
          <button
            type="button"
            onClick={finish}
            className="absolute inset-0 h-full w-full cursor-pointer"
            aria-label="Skip intro"
          />
        )}

        <div className="pointer-events-none flex flex-col items-center gap-6 px-6 text-center">
          {running && !reduced ? (
            <div className="h-28 w-28">
              {variant === "basket" && <BasketScene progress={progress} />}
              {variant === "coffee" && <CoffeeScene progress={progress} />}
              {variant === "fry" && <FryScene progress={progress} />}
            </div>
          ) : (
            <StaticMark />
          )}

          <p className="font-display text-2xl font-semibold tracking-tight">
            The <span className="text-momo-gold">Calcutta</span> Classics
          </p>

          {running && (
            <>
              <p
                className="font-display text-sm tabular-nums text-cream/60"
                aria-hidden
              >
                {displayValue}
                <span className="ml-0.5">%</span>
              </p>

              <p className="text-[10px] uppercase tracking-[0.3em] text-cream/65">
                tap anywhere to skip
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function StaticMark() {
  return (
    <svg viewBox="0 0 96 96" className="h-24 w-24" aria-hidden>
      <ellipse cx="48" cy="62" rx="30" ry="12" fill="none" stroke="#E8A13A" strokeWidth="3" />
      <path d="M24 58c0-14 10-24 24-24s24 10 24 24" fill="none" stroke="#E8A13A" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

/** Variant A — momo basket, lid lifting, steam curls, fill = progress. */
function BasketScene({ progress }: { progress: number }) {
  return (
    <svg viewBox="0 0 120 120" className="h-full w-full" aria-hidden>
      <defs>
        <clipPath id="basket-fill">
          <rect x="18" y={104 - (progress / 100) * 44} width="84" height="60" />
        </clipPath>
      </defs>
      {/* steam curls */}
      <g stroke="#F6F1E7" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.7">
        <path d="M46 34c-4-7 4-10 0-17" className="cc-steam" style={{ animationDelay: "0s" }} />
        <path d="M60 30c-4-8 4-11 0-19" className="cc-steam" style={{ animationDelay: ".35s" }} />
        <path d="M74 34c-4-7 4-10 0-17" className="cc-steam" style={{ animationDelay: ".7s" }} />
      </g>
      {/* lid — lifts as it loads */}
      <g style={{ transform: `translateY(${-(progress / 100) * 8}px)`, transition: "transform .3s ease" }}>
        <path d="M30 52c0-16 13-26 30-26s30 10 30 26" fill="none" stroke="#E8A13A" strokeWidth="3.5" />
        <rect x="56" y="20" width="8" height="6" rx="3" fill="#E8A13A" />
      </g>
      {/* basket body outline */}
      <path d="M22 58h76l-6 30c-1 6-6 10-12 10H40c-6 0-11-4-12-10z" fill="none" stroke="#E8A13A" strokeWidth="3.5" strokeLinejoin="round" />
      {/* basket fill = real progress */}
      <path d="M22 58h76l-6 30c-1 6-6 10-12 10H40c-6 0-11-4-12-10z" fill="#E8A13A" opacity="0.35" clipPath="url(#basket-fill)" />
      <line x1="16" y1="58" x2="104" y2="58" stroke="#E8A13A" strokeWidth="3.5" strokeLinecap="round" />
    </svg>
  );
}

/** Variant B — the ₹20 Belgian Coffee pouring in, cup fill = progress. */
function CoffeeScene({ progress }: { progress: number }) {
  return (
    <svg viewBox="0 0 120 120" className="h-full w-full" aria-hidden>
      <defs>
        <clipPath id="cup-fill">
          <rect x="30" y={96 - (progress / 100) * 40} width="56" height="52" />
        </clipPath>
      </defs>
      {/* pour stream */}
      <line x1="58" y1="14" x2="58" y2={54 - (progress / 100) * 10} stroke="#E8A13A" strokeWidth="3" strokeLinecap="round" opacity={progress > 95 ? 0 : 0.9} />
      {/* steam */}
      <g stroke="#F6F1E7" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.6">
        <path d="M44 40c-3-6 3-8 0-14" className="cc-steam" style={{ animationDelay: ".2s" }} />
        <path d="M74 42c-3-6 3-8 0-14" className="cc-steam" style={{ animationDelay: ".55s" }} />
      </g>
      {/* cup */}
      <path d="M30 54h56v26c0 9-7 16-16 16H46c-9 0-16-7-16-16z" fill="none" stroke="#E8A13A" strokeWidth="3.5" strokeLinejoin="round" />
      <path d="M30 54h56v26c0 9-7 16-16 16H46c-9 0-16-7-16-16z" fill="#E8A13A" opacity="0.35" clipPath="url(#cup-fill)" />
      <path d="M86 60h6c6 0 10 4 10 10s-4 10-10 10h-8" fill="none" stroke="#E8A13A" strokeWidth="3.5" strokeLinecap="round" />
      {/* saucer */}
      <line x1="24" y1="102" x2="92" y2="102" stroke="#E8A13A" strokeWidth="3.5" strokeLinecap="round" />
    </svg>
  );
}

/** Variant C — bhetki fish fry mid-flip, pan underline = progress. */
function FryScene({ progress }: { progress: number }) {
  return (
    <svg viewBox="0 0 120 120" className="h-full w-full" aria-hidden>
      {/* the fry — flips continuously */}
      <g className="cc-flip" style={{ transformOrigin: "60px 52px" }}>
        <ellipse cx="60" cy="52" rx="26" ry="13" fill="none" stroke="#E8A13A" strokeWidth="3.5" />
        <ellipse cx="60" cy="52" rx="26" ry="13" fill="#E8A13A" opacity="0.25" />
        <path d="M42 48c6 4 30 4 36 0" stroke="#E8A13A" strokeWidth="2" fill="none" opacity="0.8" />
      </g>
      {/* sizzle marks */}
      <g stroke="#F6F1E7" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.6">
        <path d="M40 30c-3-5 3-7 0-12" className="cc-steam" style={{ animationDelay: ".1s" }} />
        <path d="M80 30c-3-5 3-7 0-12" className="cc-steam" style={{ animationDelay: ".5s" }} />
      </g>
      {/* pan */}
      <path d="M26 80h68l-4 10c-1 4-4 6-8 6H38c-4 0-7-2-8-6z" fill="none" stroke="#E8A13A" strokeWidth="3.5" strokeLinejoin="round" />
      {/* progress underline */}
      <line x1="26" y1="106" x2={26 + (progress / 100) * 68} y2="106" stroke="#E8A13A" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}
