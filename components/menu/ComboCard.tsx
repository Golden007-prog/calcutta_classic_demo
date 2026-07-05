"use client";

import { animate, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { DishImage } from "@/components/ui/DishImage";
import { Glass } from "@/components/ui/Glass";
import type { Combo } from "@/data/types";
import { comboSavings } from "@/lib/pricing";
import { formatINR } from "@/lib/utils";

/**
 * Features 8 + 9 — combo card with contents visualizer (each line animates
 * into the box on scroll) and the animated savings counter.
 */
export function ComboCard({ combo }: { combo: Combo }) {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduced = useReducedMotion();
  const { worth, savings } = comboSavings(combo);
  const [savedDisplay, setSavedDisplay] = useState(0);

  useEffect(() => {
    if (!inView || savings === null) return;
    if (reduced) {
      setSavedDisplay(savings);
      return;
    }
    const controls = animate(0, savings, {
      duration: 1.2,
      delay: 0.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setSavedDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, savings, reduced]);

  return (
    <article ref={ref} className="h-full">
    <Glass className="flex h-full flex-col overflow-hidden">
      <DishImage
        src={combo.image}
        alt={`${combo.name} — ${combo.description}`}
        label={combo.name}
        className="aspect-[4/3] w-full"
        sizes="(max-width: 640px) 86vw, (max-width: 1024px) 45vw, 420px"
      />

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-display text-xl font-semibold">{combo.name}</h3>
          {combo.serves && <p className="shrink-0 text-xs text-soft">{combo.serves}</p>}
        </div>

        <p className="text-sm text-soft">{combo.description}</p>

        {/* Contents visualizer — items drop into the box (feature 8) */}
        <ul className="space-y-1.5 border-l-2 border-momo-gold/40 pl-3 text-sm">
          {combo.contents.map((content, i) => (
            <motion.li
              key={content.label + i}
              initial={reduced ? { opacity: 0 } : { opacity: 0, x: -18 }}
              animate={inView ? { opacity: 1, x: 0 } : undefined}
              transition={{ delay: 0.15 + i * 0.1, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="text-foreground/85"
            >
              <span className="font-semibold text-momo-gold">{content.qty}</span>{" "}
              {content.unit === "plate" && content.qty === 1 ? "plate " : content.unit ? `${content.unit} ` : ""}
              {content.label}
            </motion.li>
          ))}
        </ul>

        <div className="mt-auto flex items-end justify-between gap-3 pt-2">
          <div>
            <p className="font-display text-2xl font-semibold text-momo-gold">
              {formatINR(combo.price)}
            </p>
            {worth !== null && (
              <p className="text-xs text-soft">
                worth ~{formatINR(worth)} à la carte
              </p>
            )}
          </div>
          {savings !== null && savings > 0 && (
            <p
              className="rounded-full bg-leaf/15 px-3 py-1.5 text-sm font-semibold text-leaf"
              aria-label={`You save ${formatINR(savings)}`}
            >
              save {formatINR(savedDisplay)}
            </p>
          )}
        </div>
      </div>
    </Glass>
    </article>
  );
}
