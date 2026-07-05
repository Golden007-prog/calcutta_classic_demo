"use client";

import { motion, useReducedMotion } from "motion/react";

import { Glass } from "@/components/ui/Glass";
import { pressMentions } from "@/data/community";

/** Shared scroll-reveal wrapper for the story page. */
export function Reveal({ children, className }: { children: React.ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12%" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Feature 45: North Kolkata street-food history timeline ─────── */

const TIMELINE = [
  {
    era: "1900s",
    title: "Telebhaja raj",
    copy: "North Kolkata perfects the art of frying anything worth frying. Evening telebhaja with muri becomes the para's daily parliament.",
  },
  {
    era: "1930s",
    title: "The roll is born",
    copy: "Nizam's wraps a kabab in a paratha for hurried babus, and Kolkata street food gets its first superstar.",
  },
  {
    era: "1960s",
    title: "মোমো arrives",
    copy: "Tibetan settlers bring the momo to the city. It takes about one winter for Kolkata to claim it as its own.",
  },
  {
    era: "1980s–90s",
    title: "Cart golden age",
    copy: "Chowmein, egg roll, phuchka arms races on every corner. Shyambazar's five-point crossing becomes a food destination disguised as a traffic problem.",
  },
  {
    era: "Now",
    title: "The Calcutta Classics",
    copy: "A small stall opposite Deshbandhu Park steams its first basket — and decides a proper coffee should still cost ₹20.",
  },
];

export function HistoryTimeline() {
  return (
    <section aria-labelledby="timeline-heading">
      <p className="text-xs uppercase tracking-[0.3em] text-soft">A very short history</p>
      <h2 id="timeline-heading" className="mt-1 font-display text-2xl font-semibold md:text-3xl">
        How North Kolkata learned to snack
      </h2>

      <ol className="relative mt-8 space-y-10 border-l border-line pl-8">
        {TIMELINE.map((entry) => (
          <Reveal key={entry.era} className="relative">
            <li>
              <span
                aria-hidden
                className="absolute -left-[37px] top-1 size-4 rounded-full border-2 border-momo-gold bg-background"
              />
              <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-momo-gold">
                {entry.era}
              </p>
              <h3 className="mt-1 font-display text-xl font-semibold">{entry.title}</h3>
              <p className="mt-1 max-w-xl text-sm text-soft md:text-base">{entry.copy}</p>
            </li>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}

/* ── Feature 49: press & creator mentions wall ──────────────────── */

export function PressWall() {
  return (
    <section aria-labelledby="press-heading">
      <p className="text-xs uppercase tracking-[0.3em] text-soft">Kind words, loud mouths</p>
      <h2 id="press-heading" className="mt-1 font-display text-2xl font-semibold md:text-3xl">
        Creators & press
      </h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {pressMentions.map((mention) => (
          <Reveal key={mention.outlet}>
            <Glass as="figure" className="h-full p-5">
              <blockquote className="text-sm text-foreground/85 md:text-base">{mention.line}</blockquote>
              <figcaption className="mt-3 text-xs text-soft">
                <span className="font-semibold text-momo-gold">{mention.outlet}</span>
                {" · "}
                {mention.type === "creator" ? "food creator" : "local press"}
              </figcaption>
            </Glass>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
