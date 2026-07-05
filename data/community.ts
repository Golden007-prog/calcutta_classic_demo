/** Seeded community/social content (features 49, 50, 52, 53, 54, 64). */

export interface Testimonial {
  name: string;
  para: string;
  quote: string;
  rating: number;
}

/** Feature 53 — seeded in the voice of real para regulars. */
export const testimonials: Testimonial[] = [
  {
    name: "Rimi D.",
    para: "Hatibagan",
    quote:
      "Came for the momos, stayed because the coffee costs less than my bus fare. The peri peri ones? Dangerous.",
    rating: 5,
  },
  {
    name: "Sougata B.",
    para: "Shyambazar five-point crossing",
    quote:
      "Fish fry crunch you can hear over the traffic. Kashundi served without asking. These people understand.",
    rating: 5,
  },
  {
    name: "Ankita & the tuition batch",
    para: "Deshbandhu Park side",
    quote:
      "Our entire study group runs on the ₹159 burger combo. Grades improving, no correlation claimed.",
    rating: 4,
  },
  {
    name: "Tanmay G.",
    para: "Bagbazar",
    quote:
      "Ordered the Signature Meal Box for two. Ate most of it myself. The box does not judge and neither do they.",
    rating: 5,
  },
  {
    name: "Mou S.",
    para: "Shobhabazar",
    quote:
      "Cheese bombs are a safety hazard in the best way. Blow on them first. I did not.",
    rating: 4,
  },
];

/** Feature 54 — rating strip (seeded until the Google link is confirmed). */
export const ratingSummary = {
  average: 4.8,
  count: 240,
  source: "Google & walk-in reviews",
};

export interface PressMention {
  outlet: string;
  type: "creator" | "press";
  line: string;
}

/** Feature 49 — press & creator mentions wall (seeded placeholders). */
export const pressMentions: PressMention[] = [
  {
    outlet: "Kolkata Street Bites (YT)",
    type: "creator",
    line: "“The ₹20 Belgian Coffee might be North Kolkata's best-kept secret.”",
  },
  {
    outlet: "@paraFoodieDiaries",
    type: "creator",
    line: "“Momo burger?? Shyambazar really said fusion and meant it.”",
  },
  {
    outlet: "Hatibagan Adda Podcast",
    type: "press",
    line: "“A young stall doing old-school things right — steam, spice, and no shortcuts.”",
  },
  {
    outlet: "@calcutta_cravings",
    type: "creator",
    line: "“Bhetki fish fry that cracks like a papad. Went twice in one week.”",
  },
];

export interface WallPhoto {
  image: string;
  by: string;
  caption: string;
}

/** Feature 50 — curated customer photo grid (stand-ins until real UGC). */
export const foodieWall: WallPhoto[] = [
  { image: "/images/dishes/steam-momo.jpg", by: "@rimi.eats", caption: "5 PM ritual complete 🥟" },
  { image: "/images/textures/chutney-swirl.jpg", by: "@spicehunterkol", caption: "the chutney deserves its own post" },
  { image: "/images/dishes/momo-burger.jpg", by: "@snackdiaries", caption: "fusion done RIGHT" },
  { image: "/images/mood/coffee-pour.jpg", by: "@twentyrupees", caption: "named my account after this coffee" },
  { image: "/images/dishes/royal-chicken-bucket.jpg", by: "@buckethead.kol", caption: "royalty at street prices, confirmed" },
  { image: "/images/textures/fry-crunch.jpg", by: "@parafoodie", caption: "you can HEAR this photo" },
];

/** Feature 64 — vote the next menu item. */
export const pollOptions = [
  { id: "chocolate-momo", label: "Chocolate Momo", emoji: "🍫" },
  { id: "thukpa", label: "Darjeeling Thukpa", emoji: "🍜" },
  { id: "ghugni-chaat", label: "Ghugni Chaat", emoji: "🫘" },
  { id: "kabiraji", label: "Chicken Kabiraji", emoji: "🍗" },
] as const;

export type PollOptionId = (typeof pollOptions)[number]["id"];

/** Seeded base votes so the bars aren't empty on first load. */
export const seededVotes: Record<PollOptionId, number> = {
  "chocolate-momo": 47,
  thukpa: 82,
  "ghugni-chaat": 64,
  kabiraji: 91,
};
