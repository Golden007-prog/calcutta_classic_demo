export type Category =
  | "momos"
  | "chaat-snacks"
  | "fried-loaded"
  | "beverages";

export const CATEGORY_LABELS: Record<Category | "combos", string> = {
  momos: "Momos",
  "chaat-snacks": "Chaat & Snacks",
  "fried-loaded": "Fried & Loaded",
  combos: "Combos",
  beverages: "Beverages",
};

/** 0 = none · 1 = mild · 2 = medium · 3 = fiery */
export type SpiceLevel = 0 | 1 | 2 | 3;

export type Tag = "crispy" | "cheesy" | "saucy" | "steamed";

export interface MenuVariant {
  label: string;
  price: number;
  veg: boolean;
}

export interface Pairing {
  slug: string;
  note: string;
}

export interface MenuItem {
  slug: string;
  name: string;
  /** Bengali display name for the language toggle / accent typography. */
  bengaliName?: string;
  category: Category;
  veg: boolean;
  spice: SpiceLevel;
  tags: Tag[];
  /** null = price TBD → UI shows "Ask in store". */
  price: number | null;
  /** e.g. "2 pcs" or "Veg ₹50 / Egg ₹60" */
  priceNote?: string;
  variants?: MenuVariant[];
  /** Crave-copy: short, warm, Kolkata personality. */
  description: string;
  ingredients: string[];
  allergens: string[];
  pairing: Pairing;
  bestseller?: boolean;
  chefsPick?: boolean;
  image: string;
  blurDataURL?: string;
}

export interface ComboContent {
  label: string;
  qty: number;
  unit?: "pcs" | "cups" | "plate";
  /** Links back to an à la carte item when one exists (savings math). */
  itemSlug?: string;
}

export interface Combo {
  slug: string;
  name: string;
  price: number;
  contents: ComboContent[];
  description: string;
  serves?: string;
  bestseller?: boolean;
  image: string;
  blurDataURL?: string;
}
