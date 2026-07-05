"use client";

import Link from "next/link";

import { Tilt } from "@/components/fx/Tilt";
import { FavoriteButton } from "@/components/menu/FavoriteButton";
import { DishImage } from "@/components/ui/DishImage";
import { Glass } from "@/components/ui/Glass";
import { SpiceLevel } from "@/components/ui/SpiceLevel";
import { VegDot } from "@/components/ui/VegDot";
import type { MenuItem } from "@/data/types";
import { segmentByRanges } from "@/lib/fuzzy";
import { cn, formatINR } from "@/lib/utils";
import { useLang } from "@/stores/lang";

interface DishCardProps {
  item: MenuItem;
  /** Fuzzy-match ranges into item.name for <mark> highlighting (feature 6). */
  nameRanges?: Array<[number, number]>;
  className?: string;
}

export function DishCard({ item, nameRanges, className }: DishCardProps) {
  const segments = segmentByRanges(item.name, nameRanges ?? []);
  const lang = useLang((s) => s.lang);

  return (
    <Tilt>
    <Glass
      as="article"
      className={cn("group relative flex h-full flex-col overflow-hidden", className)}
    >
      <Link
        href={`/menu/${item.slug}`}
        className="flex h-full flex-col focus-visible:outline-none"
      >
        <div className="relative">
          <DishImage
            src={item.image}
            alt={`${item.name} — ${item.description}`}
            label={item.name}
            className="aspect-[4/3] w-full transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none"
            sizes="(max-width: 640px) 74vw, (max-width: 1024px) 45vw, 340px"
            transitionName={`dish-${item.slug}`}
          />
          <div className="absolute left-3 top-3 flex gap-2">
            {item.bestseller && (
              <span className="rounded-full bg-momo-gold px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-charcoal">
                Bestseller
              </span>
            )}
            {item.chefsPick && (
              <span className="rounded-full bg-chili-deep px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-cream">
                Chef&apos;s Pick
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-2 p-4">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2">
              <VegDot veg={item.veg} />
              <h3 className="font-display text-lg font-semibold leading-tight">
                {lang === "bn" && item.bengaliName ? (
                  <span className="font-bengali">{item.bengaliName}</span>
                ) : (
                  segments.map((seg, i) =>
                    seg.hit ? (
                      <mark key={i} className="rounded bg-momo-gold/30 px-0.5 text-inherit">
                        {seg.text}
                      </mark>
                    ) : (
                      <span key={i}>{seg.text}</span>
                    ),
                  )
                )}
              </h3>
            </div>
            <SpiceLevel level={item.spice} className="mt-1 shrink-0" />
          </div>

          <p className="line-clamp-2 flex-1 text-sm text-soft">{item.description}</p>

          <div className="flex items-center justify-between">
            <p className="font-display text-lg font-semibold text-momo-gold">
              {item.price !== null ? formatINR(item.price) : "Ask in store"}
              {item.priceNote && item.price !== null && (
                <span className="ml-2 text-xs font-normal text-soft">{item.priceNote}</span>
              )}
            </p>
            {item.tags.length > 0 && (
              <p className="hidden gap-1 text-[11px] uppercase tracking-wide text-soft sm:flex">
                {item.tags.join(" · ")}
              </p>
            )}
          </div>
        </div>
      </Link>

      <FavoriteButton
        slug={item.slug}
        name={item.name}
        className="absolute right-3 top-3"
      />
    </Glass>
    </Tilt>
  );
}
