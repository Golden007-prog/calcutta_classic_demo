import { site } from "./site";

/**
 * Feature 51 — static curated Instagram wall for @the_calcutta_classics.
 * No API keys: every tile links out to the profile. Swap `image` paths for
 * real post exports whenever the shop shares them.
 */
export interface InstagramPost {
  id: string;
  image: string;
  caption: string;
  href: string;
}

export const instagramPosts: InstagramPost[] = [
  {
    id: "steam-basket",
    image: "/images/hero/momo-basket.jpg",
    caption: "The 5 PM ritual. Lid up, queue forms. #CalcuttaClassics",
    href: site.instagram.url,
  },
  {
    id: "cheese-pull",
    image: "/images/textures/cheese-pull.jpg",
    caption: "Cheese bombs doing cheese bomb things 🧀 #BiteIntoHappiness",
    href: site.instagram.url,
  },
  {
    id: "kitchen",
    image: "/images/mood/kitchen-action.jpg",
    caption: "Peri peri toss — do not try this on your maa's kadai.",
    href: site.instagram.url,
  },
  {
    id: "coffee",
    image: "/images/mood/coffee-pour.jpg",
    caption: "₹20. Still. We don't talk about inflation here. ☕",
    href: site.instagram.url,
  },
  {
    id: "fish-fry",
    image: "/images/dishes/bhetki-fish-fry.jpg",
    caption: "Bhetki, breadcrumbed, blessed. Kashundi on the side.",
    href: site.instagram.url,
  },
  {
    id: "storefront",
    image: "/images/mood/storefront-dusk.jpg",
    caption: "Golden hour, opposite Deshbandhu Park. Follow the steam.",
    href: site.instagram.url,
  },
];
