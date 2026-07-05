"use client";

import { Star } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useRef } from "react";

import { Glass } from "@/components/ui/Glass";
import { ratingSummary, testimonials } from "@/data/community";
import { site } from "@/data/site";

/* ── Feature 53: testimonials carousel with drag physics ────────── */

export function Testimonials() {
  const constraintsRef = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  return (
    <section aria-labelledby="testimonials-heading">
      <p className="text-xs uppercase tracking-[0.3em] text-soft">The para has spoken</p>
      <h3 id="testimonials-heading" className="mt-1 font-display text-2xl font-semibold md:text-3xl">
        Regulars on record
      </h3>

      <div ref={constraintsRef} className="mt-5 overflow-hidden">
        <motion.ul
          drag={reduced ? false : "x"}
          dragConstraints={constraintsRef}
          dragElastic={0.08}
          dragTransition={{ power: 0.4, timeConstant: 220 }}
          className={`flex w-max cursor-grab gap-4 active:cursor-grabbing ${reduced ? "max-w-full flex-wrap" : ""}`}
        >
          {testimonials.map((t) => (
            <li key={t.name} className="w-[300px] shrink-0">
              <Glass as="figure" className="flex h-full flex-col gap-3 p-5">
                <div className="flex gap-0.5" aria-label={`${t.rating} out of 5 stars`}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      aria-hidden
                      className={i < t.rating ? "fill-momo-gold text-momo-gold" : "text-line"}
                    />
                  ))}
                </div>
                <blockquote className="flex-1 text-sm text-foreground/85">“{t.quote}”</blockquote>
                <figcaption className="text-xs text-soft">
                  <span className="font-semibold text-foreground/80">{t.name}</span> · {t.para}
                </figcaption>
              </Glass>
            </li>
          ))}
        </motion.ul>
      </div>
      {!reduced && (
        <p className="mt-2 text-xs text-soft" aria-hidden>
          ← drag to read more →
        </p>
      )}
    </section>
  );
}

/* ── Feature 54: rating strip ───────────────────────────────────── */

export function RatingStrip() {
  const googleHref = site.ordering.googleReviews;

  return (
    <Glass className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
      <div className="flex items-center gap-3">
        <p className="font-display text-3xl font-semibold text-momo-gold">
          {ratingSummary.average}
        </p>
        <div>
          <div className="flex gap-0.5" aria-label={`${ratingSummary.average} out of 5 stars average`}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={14}
                aria-hidden
                className={i < Math.round(ratingSummary.average) ? "fill-momo-gold text-momo-gold" : "text-line"}
              />
            ))}
          </div>
          <p className="text-xs text-soft">
            {ratingSummary.count}+ happy stomachs · {ratingSummary.source}
          </p>
        </div>
      </div>
      {googleHref ? (
        <a
          href={googleHref}
          target="_blank"
          rel="noopener noreferrer"
          className="tap-target inline-flex items-center rounded-full border border-line px-5 py-2.5 text-sm font-medium hover:border-momo-gold hover:text-momo-gold"
        >
          Review us on Google
        </a>
      ) : (
        <p className="text-xs text-soft">Google review link coming soon — for now, tell a friend.</p>
      )}
    </Glass>
  );
}
