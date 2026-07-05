"use client";

import { Heart } from "lucide-react";
import { useRef, useState } from "react";

import { DishImage } from "@/components/ui/DishImage";
import { Glass } from "@/components/ui/Glass";
import { recipeTeasers } from "@/data/foodie";
import { site } from "@/data/site";
import { withBase } from "@/lib/asset";

/* ── Feature 27: behind-the-scenes kitchen story w/ hover video ─── */

const KITCHEN_BEATS = [
  {
    image: "/images/hero/momo-basket.jpg",
    video: "/video/hero-steam.mp4",
    title: "The 11:40 AM ritual",
    copy: "Twenty minutes before opening, the first basket goes on. The street smells it before we announce it.",
  },
  {
    image: "/images/mood/kitchen-action.jpg",
    title: "The peri peri toss",
    copy: "Fried momos meet the spice shaker mid-air. There is technique. There is also showing off.",
  },
  {
    image: "/images/mood/coffee-pour.jpg",
    title: "The ₹20 pour",
    copy: "Whipped, poured, repeat — a few hundred times a day. The kettle has seniority over most of the staff.",
  },
];

function KitchenCard({ beat }: { beat: (typeof KITCHEN_BEATS)[number] }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [hovering, setHovering] = useState(false);

  const start = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setHovering(true);
    videoRef.current?.play().catch(() => {});
  };
  const stop = () => {
    setHovering(false);
    videoRef.current?.pause();
  };

  return (
    <Glass
      as="article"
      className="group relative overflow-hidden"
      onMouseEnter={start}
      onMouseLeave={stop}
      onFocus={start}
      onBlur={stop}
      tabIndex={0}
    >
      <div className="relative aspect-[4/3]">
        <DishImage
          src={beat.image}
          alt={beat.title}
          label={beat.title}
          className="absolute inset-0 h-full w-full transition-transform duration-700 group-hover:scale-[1.05] motion-reduce:transition-none"
          sizes="(max-width: 768px) 92vw, 380px"
        />
        {beat.video && (
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            preload="none"
            src={withBase(beat.video)}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${hovering ? "opacity-100" : "opacity-0"}`}
            aria-hidden
          />
        )}
      </div>
      <div className="p-5">
        <h4 className="font-display text-lg font-semibold">{beat.title}</h4>
        <p className="mt-1 text-sm text-soft">{beat.copy}</p>
      </div>
    </Glass>
  );
}

export function KitchenStory() {
  return (
    <section aria-labelledby="kitchen-heading" id="kitchen">
      <p className="text-xs uppercase tracking-[0.3em] text-soft">Behind the counter</p>
      <h3 id="kitchen-heading" className="mt-1 font-display text-2xl font-semibold md:text-3xl">
        A day in the steam
      </h3>
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {KITCHEN_BEATS.map((beat) => (
          <KitchenCard key={beat.title} beat={beat} />
        ))}
      </div>
    </section>
  );
}

/* ── Feature 28: recipe-teaser cards (IG-post style) ────────────── */

export function RecipeTeasers() {
  return (
    <section aria-labelledby="recipes-heading" id="recipes">
      <p className="text-xs uppercase tracking-[0.3em] text-soft">From the feed</p>
      <h3 id="recipes-heading" className="mt-1 font-display text-2xl font-semibold md:text-3xl">
        Recipe teasers
      </h3>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {recipeTeasers.map((teaser) => (
          <Glass as="article" key={teaser.title} className="overflow-hidden">
            <div className="flex items-center gap-2 border-b border-line/60 px-4 py-2.5 text-sm">
              <span className="grid size-7 place-items-center rounded-full bg-momo-gold/20 text-xs" aria-hidden>🥟</span>
              <span className="font-semibold">the_calcutta_classics</span>
            </div>
            <DishImage
              src={teaser.image}
              alt={teaser.title}
              label={teaser.title}
              className="aspect-square w-full"
              sizes="(max-width: 768px) 92vw, 440px"
            />
            <div className="p-4">
              <p className="flex items-center gap-2 text-sm">
                <Heart size={15} aria-hidden className="fill-chili text-chili" />
                <span className="font-semibold">{teaser.title}</span>
                <span className="text-soft">— {teaser.vibe}</span>
              </p>
              <p className="mt-2 text-xs text-soft">
                {teaser.ingredients.join(" · ")}
              </p>
              <p className="mt-2 text-sm text-soft">{teaser.note}</p>
              <a
                href={site.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-sm font-semibold text-momo-gold underline-offset-4 hover:underline"
              >
                Full drop on Instagram →
              </a>
            </div>
          </Glass>
        ))}
      </div>
    </section>
  );
}
