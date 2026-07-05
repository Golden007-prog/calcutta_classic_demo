"use client";

import { create } from "zustand";

/**
 * Feature 39 — English/বাংলা toggle. Persists a raw "cc-lang" key (the
 * preloader reads the same key for Bengali numerals, feature 89).
 */
export type Lang = "en" | "bn";

interface LangState {
  lang: Lang;
  hydrated: boolean;
  setLang: (lang: Lang) => void;
  hydrate: () => void;
}

export const useLang = create<LangState>((set) => ({
  lang: "en",
  hydrated: false,
  setLang: (lang) => {
    try {
      localStorage.setItem("cc-lang", lang);
    } catch {
      /* private mode */
    }
    document.documentElement.lang = lang === "bn" ? "bn" : "en";
    set({ lang });
  },
  hydrate: () => {
    let lang: Lang = "en";
    try {
      if (localStorage.getItem("cc-lang") === "bn") lang = "bn";
    } catch {
      /* ignore */
    }
    set({ lang, hydrated: true });
  },
}));
