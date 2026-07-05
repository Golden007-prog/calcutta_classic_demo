import type { Metadata } from "next";
import { Clock } from "lucide-react";

import { Testimonials, RatingStrip } from "@/components/community/Testimonials";
import { OpenBadge } from "@/components/OpenBadge";
import { DishImage } from "@/components/ui/DishImage";
import {
  DistanceCheck,
  GettingThere,
  LandmarkGuide,
  MapEmbed,
} from "@/components/visit/VisitSections";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Visit Us — opposite Deshbandhu Park, Shyambazar",
  description:
    "Find The Calcutta Classics: opposite Deshbandhu Park, Shyambazar, Kolkata. Open 12 PM–10 PM every day. Metro, bus and tram directions inside.",
};

/** Vintage-toned neighbourhood strip (feature 46). */
function NeighbourhoodStrip() {
  const strip = [
    { src: "/images/mood/storefront-dusk.jpg", alt: "The stall glowing at dusk" },
    { src: "/images/mood/kitchen-action.jpg", alt: "Momos mid-toss in the kitchen" },
    { src: "/images/hero/momo-basket.jpg", alt: "Steam rising off the first basket" },
    { src: "/images/mood/coffee-pour.jpg", alt: "The ₹20 Belgian Coffee mid-pour" },
  ];
  return (
    <section aria-labelledby="para-heading">
      <p className="text-xs uppercase tracking-[0.3em] text-soft">পাড়ার আড্ডা</p>
      <h3 id="para-heading" className="mt-1 font-display text-2xl font-semibold md:text-3xl">
        The para, in amber
      </h3>
      <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
        {strip.map((photo) => (
          <DishImage
            key={photo.src}
            src={photo.src}
            alt={photo.alt}
            label="Shyambazar"
            className="aspect-[4/5] w-full rounded-2xl sepia-[0.35] saturate-[0.85] transition-all duration-500 hover:sepia-0 hover:saturate-100 motion-reduce:transition-none"
            sizes="(max-width: 768px) 45vw, 280px"
          />
        ))}
      </div>
    </section>
  );
}

export default function VisitPage() {
  return (
    <>
      <header className="mx-auto max-w-6xl px-4 pb-6 pt-12 md:px-8">
        <p className="text-xs uppercase tracking-[0.3em] text-soft">Follow the steam</p>
        <h1 className="mt-2 font-display text-4xl font-semibold md:text-5xl">Visit us</h1>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <OpenBadge />
          <p className="inline-flex items-center gap-2 text-sm text-soft">
            <Clock size={14} aria-hidden className="text-momo-gold" />
            {site.hours.label}
          </p>
        </div>
        <p className="mt-3 max-w-xl text-sm text-soft md:text-base">
          {site.location.addressLine}, {site.location.city}. No delivery apps,
          no compromises — the momos are worth the walk.
        </p>
      </header>

      <div className="mx-auto max-w-6xl space-y-12 px-4 pb-16 md:px-8">
        <MapEmbed />

        <div className="grid gap-6 md:grid-cols-2">
          <LandmarkGuide />
          <div className="flex flex-col gap-6">
            <DistanceCheck />
            <RatingStrip />
          </div>
        </div>

        <section aria-labelledby="getting-there-heading">
          <p className="text-xs uppercase tracking-[0.3em] text-soft">Trains, buses & trams</p>
          <h2 id="getting-there-heading" className="mt-1 font-display text-2xl font-semibold md:text-3xl">
            Getting here
          </h2>
          <div className="mt-5">
            <GettingThere />
          </div>
        </section>

        <Testimonials />
        <NeighbourhoodStrip />
      </div>
    </>
  );
}
