"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

import { REACTION_EMOJIS, seededCount, useReactions, type ReactionEmoji } from "@/stores/reactions";

/** Feature 32 — emoji craving reactions with a pop (burst upgrade in P8). */
export function Reactions({ slug }: { slug: string }) {
  const [mounted, setMounted] = useState(false);
  const mine = useReactions((s) => s.mine[slug]);
  const react = useReactions((s) => s.react);
  const [justTapped, setJustTapped] = useState<ReactionEmoji | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => setMounted(true), []);

  return (
    <div role="group" aria-label="React to this dish" className="flex flex-wrap gap-2">
      {REACTION_EMOJIS.map((emoji) => {
        const count = seededCount(slug, emoji) + (mounted ? (mine?.[emoji] ?? 0) : 0);
        return (
          <motion.button
            key={emoji}
            type="button"
            onClick={() => {
              react(slug, emoji);
              setJustTapped(emoji);
              window.setTimeout(() => setJustTapped(null), 350);
            }}
            animate={
              justTapped === emoji && !reduced
                ? { scale: [1, 1.3, 1], rotate: [0, -8, 8, 0] }
                : undefined
            }
            transition={{ duration: 0.35 }}
            className="tap-target inline-flex items-center gap-1.5 rounded-full border border-line px-3.5 py-1.5 text-sm transition-colors hover:border-momo-gold/60"
            aria-label={`React ${emoji}`}
          >
            <span aria-hidden>{emoji}</span>
            <span className="tabular-nums text-soft">{count}</span>
          </motion.button>
        );
      })}
    </div>
  );
}
