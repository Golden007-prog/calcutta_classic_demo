"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Feature 77 — kinetic hero headline: per-word stagger with the Bengali
 * accent word. Falls back to a plain fade under reduced motion.
 */
const WORDS: Array<{ text: string; bengali?: boolean }> = [
  { text: "Bite" },
  { text: "into" },
  { text: "happiness," },
  { text: "কলকাতা", bengali: true },
  { text: "style." },
];

export function KineticHeadline() {
  const reduced = useReducedMotion();

  return (
    <h1 className="max-w-3xl text-balance font-display text-5xl font-semibold leading-[1.05] text-cream md:text-7xl">
      <span className="sr-only">Bite into happiness, Kolkata style.</span>
      <span aria-hidden className="inline">
        {WORDS.map((word, i) => (
          <motion.span
            key={i}
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reduced ? 0.4 : 0.7,
              delay: 0.15 + i * (reduced ? 0 : 0.09),
              ease: [0.22, 1, 0.36, 1],
            }}
            className={
              word.bengali
                ? "inline-block font-bengali font-bold text-momo-gold"
                : "inline-block"
            }
          >
            {word.text}
            {i < WORDS.length - 1 && " "}
          </motion.span>
        ))}
      </span>
    </h1>
  );
}
