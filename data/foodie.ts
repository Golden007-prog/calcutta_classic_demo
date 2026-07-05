/** Content for the Foodie Zone — glossary, facts, specials, teasers. */

export interface GlossaryEntry {
  term: string;
  bengali?: string;
  definition: string;
}

/** Feature 26 — foodie glossary. */
export const glossary: GlossaryEntry[] = [
  {
    term: "Bhetki",
    bengali: "ভেটকি",
    definition:
      "Kolkata's beloved barramundi — the only fish a true Bengali trusts inside a fish fry. Sweet white flesh, no fuss, holds a crumb coat like it was born in one.",
  },
  {
    term: "Fish Fry",
    definition:
      "Not 'fried fish'. A specific North Kolkata institution: marinated bhetki fillet, breadcrumbed into a neat leaf shape, fried to a shatter, served with kashundi. Wedding-buffet royalty.",
  },
  {
    term: "Kashundi",
    bengali: "কাসুন্দি",
    definition:
      "Fermented Bengali mustard sauce with a wasabi-grade sinus kick. Applied to fish fry in quantities that reveal your character.",
  },
  {
    term: "Chaat",
    definition:
      "A whole food philosophy: something crunchy, something tangy, something spicy, something sweet — all arguing deliciously in one bowl.",
  },
  {
    term: "Peri Peri",
    definition:
      "African bird's eye chili spice blend that reached Kolkata street food via a long detour through Portugal and a certain chicken chain. We use it with less corporate restraint.",
  },
  {
    term: "Momo",
    bengali: "মোমো",
    definition:
      "Steamed dumpling that travelled from Tibet and Nepal, settled in Kolkata's para corners, and never left. The reason half of Shyambazar queues at 5 PM.",
  },
  {
    term: "Belgian Coffee",
    definition:
      "Thick, chocolatey, whipped coffee that costs ₹20 at our counter. Historians disagree on what's Belgian about it. Nobody stops drinking it long enough to investigate.",
  },
  {
    term: "Para",
    bengali: "পাড়া",
    definition:
      "Your neighbourhood — but with feelings. The para decides which stall is 'ours'. We're honoured to be Shyambazar's.",
  },
];

/** Feature 29 — rotating food-facts ticker. */
export const foodFacts: string[] = [
  "Momos reached Kolkata with Tibetan settlers in the 1960s — the city never recovered.",
  "Bhetki fish fry was standard issue at Bengali weddings before it hit street corners.",
  "Kashundi mustard is fermented for days — that's why it fights back.",
  "Our Belgian Coffee has cost ₹20 since day one. Inflation fears us.",
  "The momo steamer runs for nearly 10 hours a day at peak season.",
  "Sweet corn chaat is the only 'health food' we'll admit to serving.",
  "Peri peri arrived in India via Goa and Portugal — ours arrives via a very heavy shaker.",
  "A proper fish fry should audibly crack. Ask the para uncles — they'll demonstrate.",
];

/** Feature 23 — daily special highlight, keyed by IST day-of-week (0=Sun). */
export const dailySpecials: Record<number, { slug: string; line: string }> = {
  0: { slug: "signature-meal-box", line: "Sunday is family day — the Meal Box feeds the whole adda." },
  1: { slug: "steam-momo", line: "Monday blues respond well to steam therapy." },
  2: { slug: "momo-burger", line: "Tuesday: two street legends, one bun." },
  3: { slug: "cheese-chicken-bombs", line: "Midweek calls for controlled cheese explosions." },
  4: { slug: "peri-peri-momo", line: "Thursday heat check — peri peri edition." },
  5: { slug: "bhetki-fish-fry", line: "Friday fish fry is basically a Kolkata commandment." },
  6: { slug: "royal-chicken-bucket", line: "Saturday = bucket night. Bring friends or don't, we won't judge." },
};

export interface Festival {
  name: string;
  bengali?: string;
  /** [month, day] inclusive ranges (IST). */
  start: [number, number];
  end: [number, number];
  line: string;
  slug: string;
}

/** Features 35 + 44 — festival/seasonal specials with date ranges. */
export const festivals: Festival[] = [
  {
    name: "Poila Boishakh",
    bengali: "পয়লা বৈশাখ",
    start: [4, 13],
    end: [4, 16],
    line: "শুভ নববর্ষ! New year, same ₹20 coffee. Fish fry on every second table.",
    slug: "bhetki-fish-fry",
  },
  {
    name: "Durga Puja",
    bengali: "দুর্গা পূজা",
    start: [9, 25],
    end: [10, 15],
    line: "Pandal-hopping fuel: momos at midnight, coffee till the dhaak stops.",
    slug: "steam-momo",
  },
  {
    name: "Winter Picnic Season",
    start: [12, 15],
    end: [1, 31],
    line: "Kolkata winter = chicken bucket weather. Scientifically proven (by us).",
    slug: "royal-chicken-bucket",
  },
  {
    name: "Monsoon Specials",
    start: [6, 10],
    end: [9, 10],
    line: "Rain on the tin roof, steam on the basket. Monsoon does our marketing.",
    slug: "maggi",
  },
];

export interface RecipeTeaser {
  title: string;
  vibe: string;
  ingredients: string[];
  note: string;
  image: string;
}

/** Feature 28 — recipe-teaser cards styled like the shop's IG posts. */
export const recipeTeasers: RecipeTeaser[] = [
  {
    title: "Mozzarella Pasta",
    vibe: "creamy, cheesy, dreamy ♡",
    ingredients: ["pasta (any shape!)", "mozzarella — lots of it", "butter", "milk", "garlic", "parm on top"],
    note: "Says hi on the feed. Golden, bubbly, perfect.",
    image: "/images/textures/cheese-pull.jpg",
  },
  {
    title: "Crispy Chicken Pizza",
    vibe: "crispy, cheesy, spicy & totally irresistible!",
    ingredients: ["shredded chicken", "mozzarella", "red chilli flakes", "oregano", "garlic", "corn", "crispy herbs", "love ♡"],
    note: "Baked to perfection with lots of flavour & crunch. Price? Ask in store.",
    image: "/images/dishes/crispy-chicken-pizza.jpg",
  },
];
