import { combos, menuItems } from "@/data/menu";
import type { Combo, MenuItem } from "@/data/types";

/**
 * Shared trait engine for the Foodie Zone (features 16, 18, 19, 20).
 * Every dish gets a 0–1 trait vector derived from its real data.
 */
export interface Traits {
  cheesy: number;
  spicy: number;
  crunchy: number;
  saucy: number;
  comfort: number;
}

export function traitsOf(item: MenuItem): Traits {
  return {
    cheesy: item.tags.includes("cheesy") ? 1 : item.ingredients.some((i) => /cheese|mozzarella/.test(i)) ? 0.7 : 0,
    spicy: item.spice / 3,
    crunchy: item.tags.includes("crispy") ? 1 : 0,
    saucy: item.tags.includes("saucy") ? 1 : 0.15,
    comfort: ["maggi", "belgian-coffee", "steam-momo", "french-fries"].includes(item.slug) ? 1 : 0.35,
  };
}

/** Weighted affinity between a desired trait profile and a dish. */
export function scoreItem(item: MenuItem, want: Traits): number {
  const t = traitsOf(item);
  let score = 0;
  for (const key of Object.keys(want) as Array<keyof Traits>) {
    // Reward matches proportional to how much the user wants the trait,
    // lightly punish strong traits the user explicitly zeroed.
    score += t[key] * want[key] * 2 - t[key] * (want[key] < 0.15 ? 0.4 : 0);
  }
  if (item.bestseller) score += 0.25;
  if (item.chefsPick) score += 0.15;
  return score;
}

export function rankItems(want: Traits, limit = 3): MenuItem[] {
  return [...menuItems]
    .sort((a, b) => scoreItem(b, want) - scoreItem(a, want))
    .slice(0, limit);
}

/* ── Feature 19: Budget Bite Finder ─────────────────────────────── */

export interface BudgetPick {
  label: string;
  qty: number;
  price: number;
  slug?: string;
  isCombo?: boolean;
}

export interface BudgetPlan {
  picks: BudgetPick[];
  total: number;
  remaining: number;
}

interface Option {
  label: string;
  price: number;
  value: number;
  slug?: string;
  isCombo?: boolean;
  maxQty: number;
}

/**
 * Greedy value-per-rupee packing (13 items — DP would be showing off).
 * Combos carry their à-la-carte worth as value; bestsellers get a nudge.
 */
export function planBudget(budget: number): BudgetPlan {
  const options: Option[] = [
    ...menuItems
      .filter((i): i is MenuItem & { price: number } => i.price !== null)
      .map((i) => ({
        label: i.name,
        price: i.price,
        value: i.price * (i.bestseller ? 1.3 : 1.1),
        slug: i.slug,
        maxQty: i.slug === "belgian-coffee" ? 4 : 2,
      })),
    ...combos.map((c: Combo) => ({
      label: c.name,
      price: c.price,
      value: c.price * 1.45, // combos always beat à la carte
      slug: c.slug,
      isCombo: true,
      maxQty: 1,
    })),
  ].sort((a, b) => b.value / b.price - a.value / a.price);

  const picks: BudgetPick[] = [];
  let remaining = budget;

  for (const option of options) {
    let qty = 0;
    while (qty < option.maxQty && option.price <= remaining) {
      remaining -= option.price;
      qty++;
    }
    if (qty > 0) {
      picks.push({ label: option.label, qty, price: option.price, slug: option.slug, isCombo: option.isCombo });
    }
    if (remaining < 20) break; // nothing on the menu is cheaper than the coffee
  }

  return { picks, total: budget - remaining, remaining };
}

/* ── Features 20 + 30: group calculator & hunger portions ───────── */

export type Hunger = "peckish" | "hungry" | "famished";

export interface GroupSuggestion {
  lines: string[];
  total: number;
  note: string;
}

const HUNGER_FACTOR: Record<Hunger, number> = {
  peckish: 0.7,
  hungry: 1,
  famished: 1.5,
};

export function groupOrder(people: number, hunger: Hunger): GroupSuggestion {
  const factor = HUNGER_FACTOR[hunger];
  const lines: string[] = [];
  let total = 0;

  const add = (qty: number, label: string, price: number) => {
    if (qty <= 0) return;
    lines.push(`${qty} × ${label}`);
    total += qty * price;
  };

  const mealBoxes = Math.floor((people * factor) / 2.2);
  add(mealBoxes, "Signature Meal Box (₹349)", 349);

  const servedByBoxes = mealBoxes * 2;
  const rest = Math.max(0, Math.ceil(people * factor - servedByBoxes));

  add(Math.ceil(rest * 0.8), "Steam Momo plate (₹60)", 60);
  add(Math.ceil(rest / 2), "Bhetki Fish Fry, 2 pcs (₹150)", 150);
  if (people >= 3 && factor >= 1) add(1, "Royal Chicken Bucket (₹150)", 150);
  add(people, "Belgian Coffee (₹20)", 20);

  const note =
    hunger === "famished"
      ? `${people === 1 ? "2 plates. Trust us." : "Yes, it looks like a lot. No, there won't be leftovers."}`
      : hunger === "peckish"
        ? "Light, but the coffee is non-negotiable."
        : "The para-approved standard order.";

  return { lines, total, note };
}
