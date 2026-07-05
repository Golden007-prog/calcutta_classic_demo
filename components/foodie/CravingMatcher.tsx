"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import { DishImage } from "@/components/ui/DishImage";
import { Glass } from "@/components/ui/Glass";
import { rankItems, type Traits } from "@/lib/recommend";
import { formatINR } from "@/lib/utils";

/** Feature 18 — cheesy/spicy/crunchy/saucy sliders → ranked matches. */

const SLIDERS: Array<{ key: keyof Traits; label: string; emoji: string }> = [
  { key: "cheesy", label: "Cheesy", emoji: "🧀" },
  { key: "spicy", label: "Spicy", emoji: "🌶️" },
  { key: "crunchy", label: "Crunchy", emoji: "✨" },
  { key: "saucy", label: "Saucy", emoji: "🥣" },
];

export function CravingMatcher() {
  const [values, setValues] = useState<Traits>({
    cheesy: 5,
    spicy: 5,
    crunchy: 5,
    saucy: 5,
    comfort: 5,
  });

  const matches = useMemo(() => {
    const want: Traits = {
      cheesy: values.cheesy / 10,
      spicy: values.spicy / 10,
      crunchy: values.crunchy / 10,
      saucy: values.saucy / 10,
      comfort: 0.3,
    };
    return rankItems(want, 3);
  }, [values]);

  return (
    <Glass variant="panel" className="p-6 md:p-8" id="craving-matcher">
      <p className="text-xs uppercase tracking-[0.3em] text-soft">Precision snacking</p>
      <h3 className="mt-1 font-display text-2xl font-semibold md:text-3xl">Craving matcher</h3>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        {SLIDERS.map(({ key, label, emoji }) => (
          <label key={key} className="block">
            <span className="flex justify-between text-sm">
              <span>
                {emoji} {label}
              </span>
              <span className="tabular-nums text-soft">{values[key]}/10</span>
            </span>
            <input
              type="range"
              min={0}
              max={10}
              value={values[key]}
              onChange={(e) => setValues({ ...values, [key]: Number(e.target.value) })}
              className="mt-2 w-full accent-momo-gold"
              aria-label={`${label} craving level`}
            />
          </label>
        ))}
      </div>

      <ol className="mt-6 space-y-3" aria-live="polite" aria-label="Top matches">
        {matches.map((item, i) => (
          <li key={item.slug}>
            <Link
              href={`/menu/${item.slug}`}
              className="group flex items-center gap-4 rounded-2xl border border-line p-3 transition-colors hover:border-momo-gold/50"
            >
              <span className="font-display text-xl font-semibold text-momo-gold" aria-hidden>
                {i + 1}
              </span>
              <DishImage
                src={item.image}
                alt={item.name}
                label={item.name}
                className="size-14 shrink-0 rounded-xl"
                sizes="56px"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium group-hover:text-momo-gold">{item.name}</p>
                <p className="truncate text-xs text-soft">{item.tags.join(" · ") || "pure comfort"}</p>
              </div>
              <span className="shrink-0 text-sm font-semibold text-momo-gold">
                {item.price !== null ? formatINR(item.price) : "Ask"}
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </Glass>
  );
}
