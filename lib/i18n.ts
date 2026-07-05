import type { Lang } from "@/stores/lang";

/** Feature 39 — lightweight dictionary: [english, bengali]. */
export const STRINGS = {
  "nav.menu": ["Menu", "মেনু"],
  "nav.combos": ["Combos", "কম্বো"],
  "nav.story": ["Our Story", "আমাদের গল্প"],
  "nav.foodie": ["Foodie Zone", "ফুডি জোন"],
  "nav.visit": ["Visit", "আসুন"],
  "nav.contact": ["Contact", "যোগাযোগ"],
  "nav.blog": ["Blog", "ব্লগ"],
  "nav.gallery": ["Gallery", "গ্যালারি"],
  "tab.home": ["Home", "হোম"],
  "tab.menu": ["Menu", "মেনু"],
  "tab.combos": ["Combos", "কম্বো"],
  "tab.visit": ["Visit", "আসুন"],
  "cat.momos": ["Momos", "মোমো"],
  "cat.chaat-snacks": ["Chaat & Snacks", "চাট ও স্ন্যাকস"],
  "cat.fried-loaded": ["Fried & Loaded", "ভাজা ও লোডেড"],
  "cat.combos": ["Combos", "কম্বো"],
  "cat.beverages": ["Beverages", "পানীয়"],
  "cta.call": ["Call us", "ফোন করুন"],
  "cta.directions": ["Get directions", "পথ দেখুন"],
  "cta.menu": ["Explore the menu", "মেনু দেখুন"],
} as const;

export type StringKey = keyof typeof STRINGS;

export function translate(key: StringKey, lang: Lang): string {
  return STRINGS[key][lang === "bn" ? 1 : 0];
}
