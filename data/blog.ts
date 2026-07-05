/** Feature 38 — blog index (posts live as MDX in app/blog/<slug>/page.mdx). */
export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readMinutes: number;
  image: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "momo-comes-to-kolkata",
    title: "How the momo conquered the para",
    excerpt:
      "It arrived from the mountains in the 1960s, met Kolkata's chutney, and never looked back. A short history of the city's favourite adopted child.",
    date: "2026-06-12",
    readMinutes: 4,
    image: "/images/dishes/steam-momo.jpg",
  },
  {
    slug: "the-fish-fry-canon",
    title: "The fish fry canon: a field guide",
    excerpt:
      "Bhetki or nothing. Kashundi within reach. Crumb that cracks like a monsoon thunderclap. The unwritten rules of Kolkata's crispiest institution, written down.",
    date: "2026-06-24",
    readMinutes: 5,
    image: "/images/dishes/bhetki-fish-fry.jpg",
  },
  {
    slug: "twenty-rupee-economics",
    title: "₹20 economics: the coffee that refuses inflation",
    excerpt:
      "Every economist who visits asks the same question. Every answer involves the word 'principle'. On pricing a legend like it's still 2019.",
    date: "2026-07-01",
    readMinutes: 3,
    image: "/images/dishes/belgian-coffee.jpg",
  },
];
