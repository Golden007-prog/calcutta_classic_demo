import type { Metadata } from "next";
import Link from "next/link";

import { DishImage } from "@/components/ui/DishImage";
import { Glass } from "@/components/ui/Glass";
import { blogPosts } from "@/data/blog";

export const metadata: Metadata = {
  title: "Blog — Kolkata street-food culture, briefly",
  description:
    "Short reads on momos, fish fry lore and the economics of a ₹20 coffee — from the counter of The Calcutta Classics, Shyambazar.",
};

export default function BlogIndexPage() {
  return (
    <>
      <header className="mx-auto max-w-6xl px-4 pb-6 pt-12 md:px-8">
        <p className="text-xs uppercase tracking-[0.3em] text-soft">Reading material for the queue</p>
        <h1 className="mt-2 font-display text-4xl font-semibold md:text-5xl">The Blog</h1>
        <p className="mt-3 max-w-xl text-sm text-soft md:text-base">
          Street-food culture, in servings small enough to finish before your
          momos steam.
        </p>
      </header>

      <div className="mx-auto max-w-6xl px-4 pb-16 md:px-8">
        <ul className="grid gap-4 md:grid-cols-3">
          {blogPosts.map((post) => (
            <li key={post.slug}>
              <Glass as="article" className="group h-full overflow-hidden">
                <Link href={`/blog/${post.slug}`} className="flex h-full flex-col">
                  <DishImage
                    src={post.image}
                    alt=""
                    label={post.title}
                    className="aspect-[16/10] w-full transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none"
                    sizes="(max-width: 768px) 92vw, 380px"
                  />
                  <div className="flex flex-1 flex-col gap-2 p-5">
                    <p className="text-xs text-soft">
                      {new Date(post.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}{" "}
                      · {post.readMinutes} min read
                    </p>
                    <h2 className="font-display text-xl font-semibold leading-snug group-hover:text-momo-gold">
                      {post.title}
                    </h2>
                    <p className="flex-1 text-sm text-soft">{post.excerpt}</p>
                    <p className="text-sm font-semibold text-momo-gold">Read →</p>
                  </div>
                </Link>
              </Glass>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
