import type { Combo, ComboContent } from "@/data/types";

/**
 * Feature 9 — combo vs à la carte savings math.
 *
 * Per-unit values derived from the real menu, with documented assumptions
 * where an item is only sold by the plate:
 * - Steam Momo ₹60/plate of 6 → ₹10/pc
 * - Bhetki Fish Fry ₹150/2 pcs → ₹75/pc
 * - Cheese Chicken Bombs ₹120/plate of 4 → ₹30/pc
 * - Chicken Strips (not sold à la carte) → valued at ₹50/pc via the
 *   ₹150 Royal Chicken Bucket ≈ 3 strip-equivalents
 * - French Fries / Fried Chips ₹50/plate · Belgian Coffee ₹20/cup ·
 *   Momo Burger ₹90/pc
 */
const UNIT_VALUES: Record<string, number> = {
  "steam-momo:pcs": 10,
  "bhetki-fish-fry:pcs": 75,
  "cheese-chicken-bombs:pcs": 30,
  "french-fries:plate": 50,
  "belgian-coffee:cups": 20,
  "momo-burger:pcs": 90,
};

const LABEL_VALUES: Record<string, number> = {
  "chicken strips:pcs": 50,
};

function contentValue(content: ComboContent): number | null {
  const bySlug = content.itemSlug
    ? UNIT_VALUES[`${content.itemSlug}:${content.unit ?? "pcs"}`]
    : undefined;
  const byLabel = LABEL_VALUES[`${content.label.toLowerCase()}:${content.unit ?? "pcs"}`];
  const unit = bySlug ?? byLabel;
  return unit === undefined ? null : unit * content.qty;
}

export interface ComboSavings {
  /** À la carte worth in ₹ (null if any line item can't be valued). */
  worth: number | null;
  savings: number | null;
  percent: number | null;
}

export function comboSavings(combo: Combo): ComboSavings {
  let worth = 0;
  for (const content of combo.contents) {
    const value = contentValue(content);
    if (value === null) return { worth: null, savings: null, percent: null };
    worth += value;
  }
  const savings = worth - combo.price;
  return {
    worth,
    savings,
    percent: Math.round((savings / worth) * 100),
  };
}
