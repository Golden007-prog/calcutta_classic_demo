"use client";

import { Scale, X } from "lucide-react";
import { useState } from "react";

import { DishImage } from "@/components/ui/DishImage";
import { Glass } from "@/components/ui/Glass";
import { SpiceLevel } from "@/components/ui/SpiceLevel";
import { VegDot } from "@/components/ui/VegDot";
import { menuItems } from "@/data/menu";
import { formatINR } from "@/lib/utils";

/** Feature 34 — compare two dishes side-by-side in a bottom drawer. */
export function CompareDrawer() {
  const [open, setOpen] = useState(false);
  const [left, setLeft] = useState("steam-momo");
  const [right, setRight] = useState("bhetki-fish-fry");

  const itemLeft = menuItems.find((i) => i.slug === left)!;
  const itemRight = menuItems.find((i) => i.slug === right)!;

  const select = (value: string, onChange: (v: string) => void, label: string) => (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label={label}
      className="w-full rounded-full border border-line bg-surface px-4 py-2.5 text-sm outline-none focus:border-momo-gold"
    >
      {menuItems.map((item) => (
        <option key={item.slug} value={item.slug}>
          {item.name}
        </option>
      ))}
    </select>
  );

  const row = (label: string, a: React.ReactNode, b: React.ReactNode) => (
    <tr className="border-b border-line/60">
      <th scope="row" className="py-2.5 pr-3 text-left text-xs font-medium uppercase tracking-wider text-soft">
        {label}
      </th>
      <td className="py-2.5 pr-3 text-sm">{a}</td>
      <td className="py-2.5 text-sm">{b}</td>
    </tr>
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="tap-target inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-medium transition-colors hover:border-momo-gold hover:text-momo-gold"
      >
        <Scale size={15} aria-hidden />
        Compare two dishes
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Compare two dishes"
          className="fixed inset-0 z-[80] flex items-end justify-center bg-charcoal/60 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <Glass
            variant="panel"
            className="max-h-[85vh] w-full max-w-3xl overflow-y-auto !rounded-b-none bg-background p-5 md:p-7 dark:!bg-charcoal/95"
          >
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-display text-xl font-semibold">Dish vs dish</h3>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close comparison"
                className="tap-target inline-flex items-center justify-center rounded-full text-foreground/70 hover:text-chili"
              >
                <X size={18} aria-hidden />
              </button>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              {select(left, setLeft, "First dish")}
              {select(right, setRight, "Second dish")}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              {[itemLeft, itemRight].map((item) => (
                <DishImage
                  key={item.slug}
                  src={item.image}
                  alt={item.name}
                  label={item.name}
                  className="aspect-[4/3] w-full rounded-2xl"
                  sizes="(max-width: 768px) 45vw, 340px"
                />
              ))}
            </div>

            <table className="mt-4 w-full table-fixed">
              <caption className="sr-only">Side-by-side comparison</caption>
              <tbody>
                {row(
                  "Price",
                  <strong className="text-momo-gold">{itemLeft.price !== null ? formatINR(itemLeft.price) : "Ask"}</strong>,
                  <strong className="text-momo-gold">{itemRight.price !== null ? formatINR(itemRight.price) : "Ask"}</strong>,
                )}
                {row("Veg", <VegDot veg={itemLeft.veg} />, <VegDot veg={itemRight.veg} />)}
                {row(
                  "Spice",
                  itemLeft.spice === 0 ? "None" : <SpiceLevel level={itemLeft.spice} />,
                  itemRight.spice === 0 ? "None" : <SpiceLevel level={itemRight.spice} />,
                )}
                {row("Mood", itemLeft.tags.join(", ") || "comfort", itemRight.tags.join(", ") || "comfort")}
                {row(
                  "Inside",
                  <span className="text-soft">{itemLeft.ingredients.slice(0, 3).join(", ")}</span>,
                  <span className="text-soft">{itemRight.ingredients.slice(0, 3).join(", ")}</span>,
                )}
                {row(
                  "Verdict",
                  <span className="italic text-soft">“{itemLeft.description.split(".")[0]}.”</span>,
                  <span className="italic text-soft">“{itemRight.description.split(".")[0]}.”</span>,
                )}
              </tbody>
            </table>

            <p className="mt-4 text-center text-xs text-soft">
              Correct answer: both. Get the combo.
            </p>
          </Glass>
        </div>
      )}
    </>
  );
}
