"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

/** Feature 32 — emoji craving reactions per dish (local, honor system). */
export const REACTION_EMOJIS = ["😍", "🔥", "🤤", "🫠"] as const;
export type ReactionEmoji = (typeof REACTION_EMOJIS)[number];

interface ReactionsState {
  /** dish slug → emoji → my taps */
  mine: Record<string, Partial<Record<ReactionEmoji, number>>>;
  react: (slug: string, emoji: ReactionEmoji) => void;
}

export const useReactions = create<ReactionsState>()(
  persist(
    (set) => ({
      mine: {},
      react: (slug, emoji) =>
        set((state) => ({
          mine: {
            ...state.mine,
            [slug]: {
              ...state.mine[slug],
              [emoji]: (state.mine[slug]?.[emoji] ?? 0) + 1,
            },
          },
        })),
    }),
    { name: "cc-reactions" },
  ),
);

/** Seeded base counts so dishes don't look unloved on first visit. */
export function seededCount(slug: string, emoji: ReactionEmoji): number {
  let h = 0;
  const key = slug + emoji;
  for (let i = 0; i < key.length; i++) h = (h * 33 + key.charCodeAt(i)) % 4093;
  return 12 + (h % 87);
}
