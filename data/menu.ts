import type { Combo, MenuItem } from "./types";

/**
 * The real Calcutta Classics menu — keep prices EXACT.
 * Images land in Phase 3 (Higgsfield pipeline); paths are stable now.
 */
export const menuItems: MenuItem[] = [
  {
    slug: "steam-momo",
    name: "Steam Momo",
    bengaliName: "স্টিম মোমো",
    category: "momos",
    veg: false,
    spice: 1,
    tags: ["steamed", "saucy"],
    price: 60,
    description:
      "Pillow-soft skins, juicy chicken hearts, and a red chutney that doesn't believe in warnings. Shyambazar's five-minute vanishing act.",
    ingredients: ["flour wrapper", "chicken keema", "onion", "ginger-garlic", "house masala"],
    allergens: ["gluten"],
    pairing: {
      slug: "belgian-coffee",
      note: "Hot steam + hot coffee = monsoon insurance for ₹80 total.",
    },
    bestseller: true,
    image: "/images/dishes/steam-momo.jpg",
  },
  {
    slug: "fried-momo",
    name: "Fried Momo",
    bengaliName: "ফ্রায়েড মোমো",
    category: "momos",
    veg: false,
    spice: 1,
    tags: ["crispy", "saucy"],
    price: 70,
    description:
      "Same soul as the steamed one, but it went and got itself a golden jacket. Crunch first, juice second, chutney always.",
    ingredients: ["flour wrapper", "chicken keema", "onion", "ginger-garlic", "house masala"],
    allergens: ["gluten"],
    pairing: {
      slug: "sweet-corn-chaat",
      note: "Crunch on crunch — the corn chaat keeps the palate honest.",
    },
    image: "/images/dishes/fried-momo.jpg",
  },
  {
    slug: "peri-peri-momo",
    name: "Peri Peri Momo",
    bengaliName: "পেরি পেরি মোমো",
    category: "momos",
    veg: false,
    spice: 3,
    tags: ["crispy", "saucy"],
    price: 80,
    description:
      "Dusted head to toe in peri peri that means business. For the friend who says \"ঝাল কম\" — order them the steam one.",
    ingredients: ["flour wrapper", "chicken keema", "peri peri rub", "onion", "house masala"],
    allergens: ["gluten"],
    pairing: {
      slug: "belgian-coffee",
      note: "Something sweet to negotiate a ceasefire with the peri peri.",
    },
    chefsPick: true,
    image: "/images/dishes/peri-peri-momo.jpg",
  },
  {
    slug: "sweet-corn-chaat",
    name: "Sweet Corn Chaat",
    bengaliName: "সুইট কর্ন চাট",
    category: "chaat-snacks",
    veg: true,
    spice: 1,
    tags: ["saucy"],
    price: 50,
    description:
      "Buttered corn, chaat masala, a squeeze of lime and a little drama. Sweet, tangy, and gone before the momos arrive.",
    ingredients: ["sweet corn", "butter", "chaat masala", "onion", "lime", "coriander"],
    allergens: ["dairy"],
    pairing: {
      slug: "peri-peri-momo",
      note: "Sweet corn plays peacemaker to the peri peri's fire.",
    },
    image: "/images/dishes/sweet-corn-chaat.jpg",
  },
  {
    slug: "chips-chaat",
    name: "Chips Chaat",
    bengaliName: "চিপস চাট",
    category: "chaat-snacks",
    veg: true,
    spice: 2,
    tags: ["crispy", "saucy"],
    price: 50,
    description:
      "Crisp chips lovingly drowned in masala, onion and chutney. The crunch fights the sauce; everybody wins.",
    ingredients: ["potato chips", "onion", "tomato", "chutneys", "chaat masala", "coriander"],
    allergens: [],
    pairing: {
      slug: "belgian-coffee",
      note: "Salty-spicy chips, sweet coffee — the classic seesaw.",
    },
    image: "/images/dishes/chips-chaat.jpg",
  },
  {
    slug: "maggi",
    name: "Maggi (Veg / Egg)",
    bengaliName: "ম্যাগি",
    category: "chaat-snacks",
    veg: true,
    spice: 1,
    tags: ["saucy"],
    price: 50,
    priceNote: "Veg ₹50 / Egg ₹60",
    variants: [
      { label: "Veg", price: 50, veg: true },
      { label: "Egg", price: 60, veg: false },
    ],
    description:
      "Two-minute noodles that take eight and are worth eleven. Add an egg — this is a democracy, but we know how you'll vote.",
    ingredients: ["maggi noodles", "vegetables", "house masala", "optional egg"],
    allergens: ["gluten", "egg (egg variant)"],
    pairing: {
      slug: "belgian-coffee",
      note: "Hostel dinner, upgraded: steaming Maggi and a ₹20 coffee.",
    },
    image: "/images/dishes/maggi.jpg",
  },
  {
    slug: "momo-burger",
    name: "Momo Burger",
    bengaliName: "মোমো বার্গার",
    category: "fried-loaded",
    veg: false,
    spice: 2,
    tags: ["crispy", "saucy"],
    price: 90,
    description:
      "A crispy momo patty in a soft bun with slaw and house sauce. Two street legends, one bite — fusion nobody asked for, everybody orders.",
    ingredients: ["bun", "fried momo patty", "slaw", "house sauce", "cheese slice"],
    allergens: ["gluten", "dairy"],
    pairing: {
      slug: "french-fries",
      note: "A burger without fries is just a sandwich with ambition.",
    },
    bestseller: true,
    image: "/images/dishes/momo-burger.jpg",
  },
  {
    slug: "french-fries",
    name: "French Fries",
    bengaliName: "ফ্রেঞ্চ ফ্রাই",
    category: "fried-loaded",
    veg: true,
    spice: 0,
    tags: ["crispy"],
    price: 50,
    description:
      "Golden, salted, ruthlessly hot. The supporting actor that keeps stealing the scene.",
    ingredients: ["potato", "salt", "peri peri sprinkle on request"],
    allergens: [],
    pairing: {
      slug: "momo-burger",
      note: "See: every great duo in history.",
    },
    image: "/images/dishes/french-fries.jpg",
  },
  {
    slug: "royal-chicken-bucket",
    name: "Royal Chicken Bucket",
    bengaliName: "রয়্যাল চিকেন বাকেট",
    category: "fried-loaded",
    veg: false,
    spice: 2,
    tags: ["crispy", "saucy"],
    price: 150,
    description:
      "A bucket of crisp, spice-rubbed chicken that turns strangers at the counter into people sharing napkins. Royalty at street prices.",
    ingredients: ["chicken", "spice rub", "flour crust", "house dip"],
    allergens: ["gluten"],
    pairing: {
      slug: "belgian-coffee",
      note: "Crown the bucket with a ₹20 coffee and call it a feast.",
    },
    bestseller: true,
    image: "/images/dishes/royal-chicken-bucket.jpg",
  },
  {
    slug: "cheese-chicken-bombs",
    name: "Cheese Chicken Bombs",
    bengaliName: "চিজ চিকেন বম্বস",
    category: "fried-loaded",
    veg: false,
    spice: 2,
    tags: ["crispy", "cheesy"],
    price: 120,
    description:
      "Crackly outside, molten cheese-and-chicken inside. Handle with care — the first bite has a fuse.",
    ingredients: ["chicken", "mozzarella", "breadcrumb shell", "garlic", "herbs"],
    allergens: ["gluten", "dairy"],
    pairing: {
      slug: "french-fries",
      note: "Fries to catch the cheese-pull fallout.",
    },
    chefsPick: true,
    image: "/images/dishes/cheese-chicken-bombs.jpg",
  },
  {
    slug: "bhetki-fish-fry",
    name: "Bhetki Fish Fry",
    bengaliName: "ভেটকি মাছ ভাজা",
    category: "fried-loaded",
    veg: false,
    spice: 1,
    tags: ["crispy"],
    price: 150,
    priceNote: "2 pcs",
    description:
      "Proper Kolkata bhetki in a crumb coat that shatters. Kashundi optional; devotion mandatory.",
    ingredients: ["bhetki fillet", "breadcrumb coat", "ginger-garlic marinade", "kashundi"],
    allergens: ["fish", "gluten", "mustard"],
    pairing: {
      slug: "belgian-coffee",
      note: "The most North Kolkata combination we know.",
    },
    bestseller: true,
    image: "/images/dishes/bhetki-fish-fry.jpg",
  },
  {
    slug: "belgian-coffee",
    name: "Belgian Coffee",
    bengaliName: "বেলজিয়ান কফি",
    category: "beverages",
    veg: true,
    spice: 0,
    tags: [],
    price: 20,
    description:
      "The ₹20 legend. Thick, chocolatey, and criminally underpriced — pairs with everything on this menu, including itself.",
    ingredients: ["coffee", "cocoa", "milk", "sugar"],
    allergens: ["dairy"],
    pairing: {
      slug: "steam-momo",
      note: "Pairs with everything — start with a plate of steam momos.",
    },
    bestseller: true,
    image: "/images/dishes/belgian-coffee.jpg",
  },
  {
    slug: "crispy-chicken-pizza",
    name: "Crispy Chicken Pizza",
    bengaliName: "ক্রিসপি চিকেন পিৎজা",
    category: "fried-loaded",
    veg: false,
    spice: 2,
    tags: ["crispy", "cheesy"],
    price: null, // TBD — confirm in store
    priceNote: "Ask in store",
    description:
      "Shredded chicken, molten mozzarella, corn and a confetti of chilli flakes on a crackling base. Hot, crispy & oh-so good.",
    ingredients: ["shredded chicken", "mozzarella", "red chilli flakes", "oregano", "garlic", "corn", "crispy herbs"],
    allergens: ["gluten", "dairy"],
    pairing: {
      slug: "belgian-coffee",
      note: "Movie-night maths: one pizza, two coffees, zero regrets.",
    },
    chefsPick: true,
    image: "/images/dishes/crispy-chicken-pizza.jpg",
  },
];

export const combos: Combo[] = [
  {
    slug: "bhetki-fish-fry-combo",
    name: "Bhetki Fish Fry Combo",
    price: 249,
    contents: [
      { label: "Bhetki Fish Fry", qty: 2, unit: "pc", itemSlug: "bhetki-fish-fry" },
      { label: "French Fries", qty: 1, unit: "plate", itemSlug: "french-fries" },
      { label: "Momo", qty: 4, unit: "pc", itemSlug: "steam-momo" },
      { label: "Belgian Coffee", qty: 1, unit: "cup", itemSlug: "belgian-coffee" },
    ],
    description:
      "The North Kolkata power lunch: shattering bhetki, hot fries, four momos and the ₹20 legend to finish.",
    serves: "1 very happy human",
    bestseller: true,
    image: "/images/combos/bhetki-fish-fry-combo.jpg",
  },
  {
    slug: "crispy-chicken-combo",
    name: "Crispy Chicken Combo",
    price: 299,
    contents: [
      { label: "Chicken Strips", qty: 3, unit: "pc" },
      { label: "Chicken Bombs", qty: 2, unit: "pc", itemSlug: "cheese-chicken-bombs" },
      { label: "French Fries", qty: 1, unit: "plate", itemSlug: "french-fries" },
      { label: "Momo", qty: 4, unit: "pc", itemSlug: "steam-momo" },
      { label: "Belgian Coffee", qty: 1, unit: "cup", itemSlug: "belgian-coffee" },
    ],
    description:
      "Strips, bombs, fries, momos, coffee — a full crunch orchestra with a molten cheese solo.",
    serves: "1–2 people",
    image: "/images/combos/crispy-chicken-combo.jpg",
  },
  {
    slug: "burger-combo",
    name: "Burger Combo",
    price: 159,
    contents: [
      { label: "Momo Burger", qty: 2, unit: "pc", itemSlug: "momo-burger" },
      { label: "Fried Chips", qty: 1, unit: "plate", itemSlug: "french-fries" },
      { label: "Belgian Coffee", qty: 2, unit: "cup", itemSlug: "belgian-coffee" },
    ],
    description:
      "Two momo burgers, chips and coffees for two — a date plan that costs less than the auto ride.",
    serves: "2 people",
    image: "/images/combos/burger-combo.jpg",
  },
  {
    slug: "signature-meal-box",
    name: "Signature Meal Box",
    price: 349,
    contents: [
      { label: "Fish Fry", qty: 2, unit: "pc", itemSlug: "bhetki-fish-fry" },
      { label: "French Fries", qty: 1, unit: "plate", itemSlug: "french-fries" },
      { label: "Chicken Strips", qty: 2, unit: "pc" },
      { label: "Chicken Bombs", qty: 2, unit: "pc", itemSlug: "cheese-chicken-bombs" },
      { label: "Momo", qty: 2, unit: "pc", itemSlug: "steam-momo" },
      { label: "Belgian Coffee", qty: 2, unit: "cup", itemSlug: "belgian-coffee" },
    ],
    description:
      "Everything we're known for, packed into one box. Feeds two hungry humans or one absolute legend.",
    serves: "2 hungry humans (or 1 legend)",
    bestseller: true,
    image: "/images/combos/signature-meal-box.jpg",
  },
];

export const bestsellers = menuItems.filter((i) => i.bestseller);

export function getItem(slug: string): MenuItem | undefined {
  return menuItems.find((i) => i.slug === slug);
}

export function getCombo(slug: string): Combo | undefined {
  return combos.find((c) => c.slug === slug);
}
