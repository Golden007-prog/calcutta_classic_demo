import type { Metadata } from "next";
import { Camera, Trophy } from "lucide-react";

import { CopyLine } from "@/components/contact/ContactForms";
import { GalleryLightbox } from "@/components/gallery/GalleryLightbox";
import { DishImage } from "@/components/ui/DishImage";
import { Glass } from "@/components/ui/Glass";
import { foodieWall } from "@/data/community";
import { combos, menuItems } from "@/data/menu";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Gallery — steam, crunch & cheese-pulls",
  description:
    "The Calcutta Classics in pictures: every dish, every combo, plus the foodie wall from customers who tagged #CalcuttaClassics.",
};

const photos = [
  { src: "/images/hero/momo-basket.jpg", alt: "The steamer basket, lid up, steam everywhere" },
  ...menuItems.map((item) => ({ src: item.image, alt: `${item.name} — ${item.description.split(".")[0]}.` })),
  ...combos.map((combo) => ({ src: combo.image, alt: `${combo.name} — ${combo.serves ?? "combo spread"}` })),
  { src: "/images/mood/kitchen-action.jpg", alt: "Peri peri momos mid-toss over the wok" },
  { src: "/images/mood/coffee-pour.jpg", alt: "The ₹20 Belgian Coffee being poured" },
  { src: "/images/mood/storefront-dusk.jpg", alt: "The stall at dusk, opposite Deshbandhu Park" },
  { src: "/images/textures/cheese-pull.jpg", alt: "Cheese bomb pull, dangerously close up" },
  { src: "/images/textures/fry-crunch.jpg", alt: "Fry crust shattering in macro" },
  { src: "/images/textures/chutney-swirl.jpg", alt: "Red chutney mid-swirl" },
];

export default function GalleryPage() {
  return (
    <>
      <header className="mx-auto max-w-6xl px-4 pb-6 pt-12 md:px-8">
        <p className="text-xs uppercase tracking-[0.3em] text-soft">Look hungry</p>
        <h1 className="mt-2 font-display text-4xl font-semibold md:text-5xl">Gallery</h1>
        <p className="mt-3 max-w-xl text-sm text-soft md:text-base">
          Fair warning: people have walked to Shyambazar because of this page.
        </p>
      </header>

      <div className="mx-auto max-w-6xl space-y-14 px-4 pb-16 md:px-8">
        <GalleryLightbox photos={photos} />

        {/* Feature 50 — the Foodie Wall */}
        <section aria-labelledby="wall-heading">
          <p className="text-xs uppercase tracking-[0.3em] text-soft">Shot by you</p>
          <h2 id="wall-heading" className="mt-1 font-display text-2xl font-semibold md:text-3xl">
            The Foodie Wall
          </h2>
          <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {foodieWall.map((photo) => (
              <li key={photo.by + photo.image}>
                <figure className="overflow-hidden rounded-2xl border border-line">
                  <DishImage
                    src={photo.image}
                    alt={`${photo.caption} — photo by ${photo.by}`}
                    label="@"
                    className="aspect-square w-full"
                    sizes="(max-width: 640px) 45vw, 300px"
                  />
                  <figcaption className="px-3 py-2 text-xs">
                    <span className="font-semibold text-momo-gold">{photo.by}</span>{" "}
                    <span className="text-soft">{photo.caption}</span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </section>

        {/* Feature 52 — UGC prompt */}
        <Glass variant="panel" className="grain relative overflow-hidden p-6 text-center md:p-10">
          <Camera size={22} aria-hidden className="mx-auto text-momo-gold" />
          <h2 className="mt-2 font-display text-2xl font-semibold md:text-3xl">
            Tag {site.hashtag}
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-soft">
            Post your plate, tag the shop, and land on this wall. Steam blur is
            not a flaw — it&apos;s proof of freshness.
          </p>
          <div className="mt-4 flex justify-center">
            <CopyLine text={`${site.hashtag} @the_calcutta_classics`} label="Copy the tags" />
          </div>
        </Glass>

        {/* Feature 57 — photo contest */}
        <Glass variant="panel" className="p-6 md:p-8">
          <div className="flex items-start gap-4">
            <Trophy size={24} aria-hidden className="mt-1 shrink-0 text-momo-gold" />
            <div>
              <h2 className="font-display text-2xl font-semibold">Steam Shot of the Month</h2>
              <ul className="mt-3 space-y-1.5 text-sm text-soft">
                <li>1. Take a photo at the stall (any dish, any chaos level).</li>
                <li>2. Post it with {site.hashtag} and tag {site.instagram.handle}.</li>
                <li>3. One winner each month gets a Signature Meal Box on the house.</li>
              </ul>
              <div className="mt-4 rounded-2xl border border-dashed border-momo-gold/50 px-4 py-6 text-center">
                <p className="text-xs uppercase tracking-[0.3em] text-soft">This month&apos;s winner</p>
                <p className="mt-1 font-display text-lg font-semibold text-momo-gold">
                  Your photo here 📸
                </p>
                <p className="text-xs text-soft">The throne is empty. The steamer is on.</p>
              </div>
            </div>
          </div>
        </Glass>
      </div>
    </>
  );
}
