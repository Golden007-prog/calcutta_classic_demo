"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

/** Feature 33 — favorites/wishlist, persisted to localStorage. */
interface FavoritesState {
  slugs: string[];
  toggle: (slug: string) => void;
}

export const useFavorites = create<FavoritesState>()(
  persist(
    (set) => ({
      slugs: [],
      toggle: (slug) =>
        set((state) => ({
          slugs: state.slugs.includes(slug)
            ? state.slugs.filter((s) => s !== slug)
            : [...state.slugs, slug],
        })),
    }),
    { name: "cc-favorites" },
  ),
);
