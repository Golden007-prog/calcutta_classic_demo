import type { Metadata } from "next";

import { ComboCard } from "@/components/menu/ComboCard";
import { combos } from "@/data/menu";

export const metadata: Metadata = {
  title: "Signature Combos — more food, fewer rupees",
  description:
    "Four signature combos from ₹159: fish fry, crispy chicken, momo burgers and the Signature Meal Box — each worth more à la carte than you pay.",
};

/** Combo showcase with savings math + horizontal scroll gallery (spec §6). */
export default function CombosPage() {
  return (
    <>
      <header className="mx-auto max-w-6xl px-4 pb-6 pt-12 md:px-8">
        <p className="text-xs uppercase tracking-[0.3em] text-soft">
          The maths always works out
        </p>
        <h1 className="mt-2 font-display text-4xl font-semibold md:text-5xl">
          Signature Combos
        </h1>
        <p className="mt-3 max-w-xl text-sm text-soft md:text-base">
          Every combo costs less than its parts — we did the arithmetic so you
          can concentrate on the eating. Swipe through, pick a box, walk in.
        </p>
      </header>

      <div className="mx-auto max-w-6xl px-4 pb-16 md:px-8">
        <ul className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 lg:mx-0 lg:grid lg:grid-cols-2 lg:overflow-visible lg:px-0">
          {combos.map((combo) => (
            <li key={combo.slug} className="w-[86vw] max-w-md shrink-0 snap-center lg:w-auto lg:max-w-none">
              <ComboCard combo={combo} />
            </li>
          ))}
        </ul>

        <p className="mt-6 text-sm text-soft">
          À la carte worth is computed from menu prices (momos ₹10/pc via the
          ₹60 six-piece plate; chicken strips valued via the ₹150 Royal
          Bucket). Rounded, honest, occasionally generous — like the shop.
        </p>
      </div>
    </>
  );
}
