"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";

import { ComboCard } from "@/components/menu/ComboCard";
import type { Combo } from "@/data/types";

/**
 * Feature 75 — horizontally pinned Signature Combos section (desktop):
 * the section pins while the combo rail scrubs sideways. Mobile and
 * reduced-motion keep the native snap rail.
 */
export function CombosPinned({ combos }: { combos: Combo[] }) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(min-width: 1024px)").matches) return;

    let ctx: { revert: () => void } | undefined;
    let cancelled = false;

    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        if (cancelled || !section.isConnected) return;
        gsap.registerPlugin(ScrollTrigger);
        ctx = gsap.context(() => {
          const distance = () => track.scrollWidth - section.clientWidth + 96;
          gsap.to(track, {
            x: () => -distance(),
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top+=64",
              end: () => `+=${distance()}`,
              pin: true,
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          });
        }, section);
      },
    );

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  return (
    // Stable boundary div: ScrollTrigger's pin wraps the <section> in a
    // pin-spacer (re-parenting it). React unmounts the route by removing
    // ITS top-level children — if that were the section itself, its parent
    // would no longer match and removeChild would throw, killing every
    // soft navigation away from home. The wrapper keeps GSAP's DOM surgery
    // out of React's removal path.
    <div>
    <section
      ref={sectionRef}
      aria-labelledby="combos-heading"
      className="relative overflow-hidden border-y border-line bg-surface/60 py-16"
    >
      {/* A5.5 — vignette strips so scrubbing cards fade at the viewport
          edge instead of hard-clipping mid-text. Overlays, not mask-image:
          an ancestor mask would break the cards' backdrop-filter. */}
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-16 bg-gradient-to-r from-background to-transparent lg:block" />
      <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-16 bg-gradient-to-l from-background to-transparent lg:block" />
      <div className="mx-auto mb-8 flex max-w-6xl items-end justify-between gap-4 px-4 md:px-8">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-soft">
            More food, fewer rupees
          </p>
          <h2 id="combos-heading" className="mt-2 font-display text-3xl font-semibold md:text-4xl">
            Signature Combos
          </h2>
        </div>
        <Link
          href="/combos"
          className="hidden shrink-0 items-center gap-1 text-sm font-medium text-momo-gold hover:underline sm:inline-flex"
        >
          All combos <ArrowRight size={14} aria-hidden />
        </Link>
      </div>

      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <ul
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 lg:snap-none lg:overflow-visible lg:pb-0 [&>li]:w-[78vw] [&>li]:max-w-xs [&>li]:shrink-0 [&>li]:snap-center lg:[&>li]:w-[320px] lg:[&>li]:max-w-none"
        >
          {combos.map((combo) => (
            <li key={combo.slug}>
              <ComboCard combo={combo} />
            </li>
          ))}
        </ul>
      </div>
    </section>
    </div>
  );
}
