import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { DishImage } from "@/components/ui/DishImage";
import { Glass } from "@/components/ui/Glass";
import { combos } from "@/data/menu";
import { formatINR } from "@/lib/utils";

/**
 * Signature combos rail — horizontal snap scroll on mobile (feature 10
 * pattern), grid on desktop. The pinned GSAP version lands in Phase 8.
 */
export function CombosRail() {
  return (
    <section aria-labelledby="combos-heading" className="border-y border-line bg-surface/60 py-16">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-soft">
              More food, fewer rupees
            </p>
            <h2 id="combos-heading" className="mt-2 font-display text-3xl font-semibold md:text-4xl">
              Signature Combos
            </h2>
          </div>
          <Link
            href="/combos"
            className="hidden shrink-0 items-center gap-1 text-sm font-medium text-momo-gold hover:underline sm:inline-flex"
          >
            All combos <ArrowRight size={14} aria-hidden />
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <ul className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 md:mx-0 md:grid md:grid-cols-4 md:overflow-visible md:px-0 md:pb-0">
          {combos.map((combo) => (
            <li key={combo.slug} className="w-[78vw] max-w-xs shrink-0 snap-center md:w-auto md:max-w-none">
              <Glass as="article" className="flex h-full flex-col overflow-hidden">
                <DishImage
                  src={combo.image}
                  alt={`${combo.name} — ${combo.description}`}
                  label={combo.name}
                  className="aspect-[4/3] w-full"
                  sizes="(max-width: 768px) 78vw, 280px"
                />
                <div className="flex flex-1 flex-col gap-2 p-5">
                  <h3 className="font-display text-lg font-semibold">{combo.name}</h3>
                  <p className="flex-1 text-sm text-soft">{combo.description}</p>
                  <div className="flex items-baseline justify-between">
                    <p className="font-display text-xl font-semibold text-momo-gold">
                      {formatINR(combo.price)}
                    </p>
                    {combo.serves && (
                      <p className="text-xs text-soft">{combo.serves}</p>
                    )}
                  </div>
                </div>
              </Glass>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
