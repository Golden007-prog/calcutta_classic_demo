import { ChevronDown } from "lucide-react";
import Link from "next/link";

import { FavoriteButton } from "@/components/menu/FavoriteButton";
import { ShareButton } from "@/components/menu/ShareButton";
import { DishImage } from "@/components/ui/DishImage";
import { Glass } from "@/components/ui/Glass";
import { SpiceLevel } from "@/components/ui/SpiceLevel";
import { VegDot } from "@/components/ui/VegDot";
import { getItem } from "@/data/menu";
import type { MenuItem } from "@/data/types";
import { formatINR } from "@/lib/utils";

/**
 * Feature 2 — dish detail: photo, crave-copy, price, spice, tags, pairing.
 * Plus 12 (pairs-well-with), 13 (allergen accordion), 14 (ingredient chips).
 * Shared by the intercepted modal and the full /menu/[slug] page.
 */
export function DishDetail({ item, inModal = false }: { item: MenuItem; inModal?: boolean }) {
  const pairing = getItem(item.pairing.slug);

  return (
    <article className={inModal ? "" : "mx-auto max-w-4xl px-4 py-10 md:px-8"}>
      <div className={`grid gap-6 ${inModal ? "" : "md:grid-cols-2 md:gap-10"}`}>
        <div className="relative">
          <DishImage
            src={item.image}
            alt={`${item.name} — ${item.description}`}
            label={item.name}
            className={`w-full rounded-2xl ${inModal ? "aspect-[4/3]" : "aspect-[4/5]"}`}
            sizes="(max-width: 768px) 92vw, 480px"
            priority={!inModal}
            transitionName={inModal ? undefined : `dish-${item.slug}`}
          />
          <FavoriteButton slug={item.slug} name={item.name} className="absolute right-3 top-3" />
          <div className="absolute left-3 top-3 flex gap-2">
            {item.bestseller && (
              <span className="rounded-full bg-momo-gold px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-charcoal">
                Bestseller
              </span>
            )}
            {item.chefsPick && (
              <span className="rounded-full bg-chili px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-cream">
                Chef&apos;s Pick
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2.5">
                <VegDot veg={item.veg} />
                <h1 className="font-display text-3xl font-semibold leading-tight md:text-4xl">
                  {item.name}
                </h1>
              </div>
              {item.bengaliName && (
                <p className="mt-1 font-bengali text-lg text-momo-gold">{item.bengaliName}</p>
              )}
            </div>
            <SpiceLevel level={item.spice} className="mt-2 shrink-0" />
          </div>

          <p className="font-display text-2xl font-semibold text-momo-gold">
            {item.price !== null ? formatINR(item.price) : "Ask in store"}
            {item.priceNote && (
              <span className="ml-2 text-sm font-normal text-soft">{item.priceNote}</span>
            )}
          </p>

          {item.variants && (
            <ul className="flex flex-wrap gap-2">
              {item.variants.map((variant) => (
                <li
                  key={variant.label}
                  className="inline-flex items-center gap-2 rounded-full border border-line px-3.5 py-1.5 text-sm"
                >
                  <VegDot veg={variant.veg} className="scale-90" />
                  {variant.label} · {formatINR(variant.price)}
                </li>
              ))}
            </ul>
          )}

          <p className="text-pretty text-base text-foreground/85">{item.description}</p>

          {item.tags.length > 0 && (
            <p className="text-xs uppercase tracking-[0.25em] text-soft">
              {item.tags.join(" · ")}
            </p>
          )}

          {/* What's inside — ingredient chips (feature 14) */}
          <div>
            <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-soft">
              What&apos;s inside
            </h2>
            <ul className="flex flex-wrap gap-2">
              {item.ingredients.map((ingredient) => (
                <li
                  key={ingredient}
                  className="rounded-full bg-surface px-3 py-1.5 text-sm text-foreground/80 ring-1 ring-line"
                >
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>

          {/* Allergen accordion (feature 13) */}
          <details className="group rounded-xl border border-line px-4 py-3">
            <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium [&::-webkit-details-marker]:hidden">
              Allergens & good-to-know
              <ChevronDown size={16} aria-hidden className="transition-transform group-open:rotate-180" />
            </summary>
            <div className="pt-3 text-sm text-soft">
              {item.allergens.length > 0 ? (
                <ul className="list-inside list-disc space-y-1">
                  {item.allergens.map((allergen) => (
                    <li key={allergen} className="capitalize">{allergen}</li>
                  ))}
                </ul>
              ) : (
                <p>No common allergens — just potatoes, spices and intent.</p>
              )}
              <p className="mt-2">
                Everything is cooked fresh in a small street kitchen — cross-contact
                is possible. Ask at the counter if you&apos;re strict about it.
              </p>
            </div>
          </details>

          {/* Pairs well with (feature 12) */}
          {pairing && (
            <Glass as={Link} href={`/menu/${pairing.slug}`} className="group flex items-center gap-4 p-3">
              <DishImage
                src={pairing.image}
                alt={pairing.name}
                label={pairing.name}
                className="size-16 shrink-0 rounded-xl"
                sizes="64px"
              />
              <div className="min-w-0">
                <p className="text-[11px] uppercase tracking-[0.25em] text-soft">
                  Pairs well with
                </p>
                <p className="truncate font-display text-base font-semibold group-hover:text-momo-gold">
                  {pairing.name}
                  {pairing.price !== null && (
                    <span className="ml-2 text-sm font-normal text-momo-gold">
                      {formatINR(pairing.price)}
                    </span>
                  )}
                </p>
                <p className="truncate text-xs text-soft">{item.pairing.note}</p>
              </div>
            </Glass>
          )}

          <div className="mt-1 flex flex-wrap gap-3">
            <ShareButton
              title={`${item.name} · The Calcutta Classics`}
              text={item.description}
              path={`/menu/${item.slug}`}
            />
            {!inModal && (
              <Link
                href="/menu"
                className="tap-target inline-flex items-center rounded-full px-5 py-2.5 text-sm font-medium text-foreground/70 transition-colors hover:text-momo-gold"
              >
                ← Full menu
              </Link>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
