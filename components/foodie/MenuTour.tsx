"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

import { DishImage } from "@/components/ui/DishImage";

/**
 * Feature 31 — guided "Menu Tour": a scroll-driven storytelling walk
 * through the menu. Stops reveal as they enter the viewport; a progress
 * spine tracks how deep into the tour you are.
 */

const STOPS = [
  {
    slug: "steam-momo",
    image: "/images/dishes/steam-momo.jpg",
    kicker: "Stop 1 · The beginning",
    title: "Everything starts with steam",
    copy: "Ten pleats, four minutes, one chutney with a temper. This is the dish the whole shop is built around — order it first, argue later.",
  },
  {
    slug: "peri-peri-momo",
    image: "/images/dishes/peri-peri-momo.jpg",
    kicker: "Stop 2 · The plot twist",
    title: "Then someone found the spice shaker",
    copy: "The peri peri momo exists because restraint is boring. It out-sells our expectations weekly.",
  },
  {
    slug: "bhetki-fish-fry",
    image: "/images/dishes/bhetki-fish-fry.jpg",
    kicker: "Stop 3 · The heritage act",
    title: "North Kolkata's crunchiest inheritance",
    copy: "The bhetki fish fry didn't come from a trend. It came from a hundred years of Bengali weddings, and it behaves accordingly.",
  },
  {
    slug: "momo-burger",
    image: "/images/dishes/momo-burger.jpg",
    kicker: "Stop 4 · The rebellion",
    title: "Two legends, one bun",
    copy: "Purists gasped. Then they ordered a second one. The momo burger is what happens when a small kitchen gets ideas.",
  },
  {
    slug: "belgian-coffee",
    image: "/images/dishes/belgian-coffee.jpg",
    kicker: "Final stop · The legend",
    title: "The ₹20 full stop",
    copy: "Every tour ends here. Thick, chocolatey, twenty rupees — the most reviewed item we have and the least likely to change.",
  },
];

export function MenuTour() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const done = Math.min(Math.max(-rect.top, 0), total);
      setProgress(total > 0 ? done / total : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section aria-labelledby="tour-heading" id="menu-tour">
      <p className="text-xs uppercase tracking-[0.3em] text-soft">Scroll the story</p>
      <h3 id="tour-heading" className="mt-1 font-display text-2xl font-semibold md:text-3xl">
        The Menu Tour
      </h3>

      <div ref={containerRef} className="relative mt-6">
        {/* progress spine */}
        <div aria-hidden className="absolute bottom-4 left-4 top-4 w-px bg-line md:left-1/2">
          <div
            className="w-px origin-top bg-momo-gold transition-transform duration-150 ease-out"
            style={{ height: "100%", transform: `scaleY(${progress})` }}
          />
        </div>

        <ol className="space-y-14">
          {STOPS.map((stop, i) => (
            <li key={stop.slug} className="relative">
              <motion.div
                initial={reduced ? { opacity: 0 } : { opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className={`grid items-center gap-5 pl-10 md:grid-cols-2 md:gap-10 md:pl-0 ${
                  i % 2 ? "md:[&>*:first-child]:order-2" : ""
                }`}
              >
                <Link href={`/menu/${stop.slug}`} className="group block">
                  <DishImage
                    src={stop.image}
                    alt={stop.title}
                    label={stop.title}
                    className="aspect-[4/3] w-full rounded-3xl transition-transform duration-500 group-hover:scale-[1.02] motion-reduce:transition-none"
                    sizes="(max-width: 768px) 88vw, 480px"
                  />
                </Link>
                <div className={i % 2 ? "md:pr-10 md:text-right" : "md:pl-10"}>
                  <p className="text-[11px] uppercase tracking-[0.3em] text-momo-gold">{stop.kicker}</p>
                  <h4 className="mt-2 font-display text-xl font-semibold md:text-2xl">{stop.title}</h4>
                  <p className="mt-2 text-sm text-soft md:text-base">{stop.copy}</p>
                </div>
              </motion.div>
              {/* spine node */}
              <span
                aria-hidden
                className="absolute left-2.5 top-1/2 size-3 -translate-y-1/2 rounded-full border-2 border-momo-gold bg-background md:left-1/2 md:-translate-x-1/2"
              />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
