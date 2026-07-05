"use client";

import { Printer, Search, X } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";

import { ComboCard } from "@/components/menu/ComboCard";
import { DishCard } from "@/components/menu/DishCard";
import { Glass } from "@/components/ui/Glass";
import { VegDot } from "@/components/ui/VegDot";
import type { Combo, MenuItem, SpiceLevel } from "@/data/types";
import { CATEGORY_LABELS } from "@/data/types";
import { fuzzyMatch } from "@/lib/fuzzy";
import { cn } from "@/lib/utils";

/**
 * The interactive menu system — features 1, 3, 4, 5, 6, 10, 11, 15.
 * Browse mode: category sections + sticky glass mini-nav with scroll-spy
 * and animated active pill; mobile sections are swipeable snap rails.
 * Filter mode (any search/filter active): one filtered, sortable grid.
 */

const SECTIONS = ["momos", "chaat-snacks", "fried-loaded", "combos", "beverages"] as const;
type SectionId = (typeof SECTIONS)[number];

type VegFilter = "all" | "veg" | "nonveg";
type PriceSort = "none" | "asc" | "desc";

const PRICE_CAPS = [50, 100, 150] as const;

export function MenuExplorer({ items, combos }: { items: MenuItem[]; combos: Combo[] }) {
  const [query, setQuery] = useState("");
  const [veg, setVeg] = useState<VegFilter>("all");
  const [spice, setSpice] = useState<SpiceLevel | null>(null);
  const [sort, setSort] = useState<PriceSort>("none");
  const [priceCap, setPriceCap] = useState<number | null>(null);
  const [active, setActive] = useState<SectionId>("momos");
  const sectionRefs = useRef<Partial<Record<SectionId, HTMLElement | null>>>({});

  const filtering =
    query.trim() !== "" || veg !== "all" || spice !== null || sort !== "none" || priceCap !== null;

  // Scroll-spy for the sticky mini-nav (feature 11).
  useEffect(() => {
    if (filtering) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id as SectionId);
          }
        }
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    for (const id of SECTIONS) {
      const el = sectionRefs.current[id];
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [filtering]);

  const results = useMemo(() => {
    if (!filtering) return null;

    let matched = items
      .map((item) => {
        const nameMatch = fuzzyMatch(query, item.name);
        const tagMatch =
          nameMatch === null
            ? fuzzyMatch(query, [...item.tags, ...item.ingredients].join(" "))
            : null;
        const match = nameMatch ?? tagMatch;
        return match === null
          ? null
          : { item, score: match.score, ranges: nameMatch?.ranges ?? [] };
      })
      .filter((r): r is NonNullable<typeof r> => r !== null);

    if (veg !== "all") matched = matched.filter(({ item }) => item.veg === (veg === "veg"));
    if (spice !== null) matched = matched.filter(({ item }) => item.spice === spice);
    if (priceCap !== null)
      matched = matched.filter(({ item }) => item.price !== null && item.price <= priceCap);

    if (sort !== "none") {
      matched.sort((a, b) => {
        const pa = a.item.price ?? Number.MAX_SAFE_INTEGER;
        const pb = b.item.price ?? Number.MAX_SAFE_INTEGER;
        return sort === "asc" ? pa - pb : pb - pa;
      });
    } else if (query.trim()) {
      matched.sort((a, b) => b.score - a.score);
    }

    return matched;
  }, [filtering, items, query, veg, spice, sort, priceCap]);

  const jumpTo = (id: SectionId) => {
    setActive(id);
    sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const clearAll = () => {
    setQuery("");
    setVeg("all");
    setSpice(null);
    setSort("none");
    setPriceCap(null);
  };

  const chip = (selected: boolean) =>
    cn(
      "tap-target inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm transition-colors",
      selected
        ? "border-momo-gold bg-momo-gold/15 text-momo-gold"
        : "border-line text-foreground/75 hover:border-momo-gold/50",
    );

  return (
    <div className="print:hidden">
      {/* Search + filters */}
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <div className="relative">
          <Search
            size={16}
            aria-hidden
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-soft"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search momos, bhetki, cheesy things…"
            aria-label="Search the menu"
            className="h-12 w-full rounded-full border border-line bg-surface pl-11 pr-4 text-sm outline-none transition-colors placeholder:text-soft focus:border-momo-gold"
          />
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2" role="group" aria-label="Menu filters">
          <button type="button" onClick={() => setVeg(veg === "veg" ? "all" : "veg")} className={chip(veg === "veg")} aria-pressed={veg === "veg"}>
            <VegDot veg className="scale-90" /> Veg
          </button>
          <button type="button" onClick={() => setVeg(veg === "nonveg" ? "all" : "nonveg")} className={chip(veg === "nonveg")} aria-pressed={veg === "nonveg"}>
            <VegDot veg={false} className="scale-90" /> Non-veg
          </button>

          <span aria-hidden className="mx-1 h-5 w-px bg-line" />

          {([0, 1, 2, 3] as const).map((level) => (
            <button
              key={level}
              type="button"
              onClick={() => setSpice(spice === level ? null : level)}
              className={chip(spice === level)}
              aria-pressed={spice === level}
              aria-label={`Spice level ${level}`}
            >
              {level === 0 ? "No spice" : "🌶".repeat(level)}
            </button>
          ))}

          <span aria-hidden className="mx-1 h-5 w-px bg-line" />

          {PRICE_CAPS.map((cap) => (
            <button
              key={cap}
              type="button"
              onClick={() => setPriceCap(priceCap === cap ? null : cap)}
              className={chip(priceCap === cap)}
              aria-pressed={priceCap === cap}
            >
              under ₹{cap}
            </button>
          ))}

          <button
            type="button"
            onClick={() => setSort(sort === "asc" ? "desc" : sort === "desc" ? "none" : "asc")}
            className={chip(sort !== "none")}
            aria-pressed={sort !== "none"}
          >
            Price {sort === "asc" ? "↑" : sort === "desc" ? "↓" : "sort"}
          </button>

          {filtering && (
            <button type="button" onClick={clearAll} className={cn(chip(false), "text-chili hover:border-chili/60")}>
              <X size={13} aria-hidden /> Clear
            </button>
          )}

          <button
            type="button"
            onClick={() => window.print()}
            className={cn(chip(false), "ml-auto hidden sm:inline-flex")}
            aria-label="Print or download the menu"
          >
            <Printer size={14} aria-hidden /> Download menu
          </button>
        </div>
      </div>

      {filtering ? (
        /* ── Filter mode: one grid ─────────────────────────────── */
        <div className="mx-auto max-w-6xl px-4 py-8 md:px-8">
          <p className="mb-4 text-sm text-soft" role="status">
            {results!.length} {results!.length === 1 ? "dish" : "dishes"} found
          </p>
          {results!.length === 0 ? (
            <Glass className="px-6 py-12 text-center">
              <p className="font-display text-xl">Nothing in the steamer for that.</p>
              <p className="mt-2 text-sm text-soft">
                Try “momo”, “cheesy”, or clear the filters — the Belgian Coffee never judges.
              </p>
            </Glass>
          ) : (
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {results!.map(({ item, ranges }) => (
                <li key={item.slug}>
                  <DishCard item={item} nameRanges={ranges} />
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        /* ── Browse mode: sections + sticky mini-nav ───────────── */
        <>
          <nav
            aria-label="Menu categories"
            className="sticky top-16 z-40 mt-6 border-y border-line/50"
          >
            <Glass variant="bar" className="border-x-0">
              <div className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 py-2 md:px-8">
                {SECTIONS.map((id) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => jumpTo(id)}
                    aria-current={active === id ? "true" : undefined}
                    className={cn(
                      "tap-target relative shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                      active === id ? "text-charcoal" : "text-foreground/75 hover:text-momo-gold",
                    )}
                  >
                    {active === id && (
                      <motion.span
                        layoutId="menu-tab-pill"
                        className="absolute inset-0 rounded-full bg-momo-gold"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative">{CATEGORY_LABELS[id]}</span>
                  </button>
                ))}
              </div>
            </Glass>
          </nav>

          <div className="mx-auto max-w-6xl px-4 md:px-8">
            {SECTIONS.map((id) => {
              const sectionItems =
                id === "combos" ? [] : items.filter((item) => item.category === id);
              return (
                <section
                  key={id}
                  id={id}
                  ref={(el) => {
                    sectionRefs.current[id] = el;
                  }}
                  aria-labelledby={`${id}-heading`}
                  className="scroll-mt-36 py-10"
                >
                  <h2 id={`${id}-heading`} className="mb-6 font-display text-2xl font-semibold md:text-3xl">
                    {CATEGORY_LABELS[id]}
                  </h2>

                  {id === "combos" ? (
                    <ul className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0">
                      {combos.map((combo) => (
                        <li key={combo.slug} className="w-[86vw] max-w-sm shrink-0 snap-center md:w-auto md:max-w-none">
                          <ComboCard combo={combo} />
                        </li>
                      ))}
                    </ul>
                  ) : (
                    /* Swipeable snap rail on mobile, grid on md+ (feature 10) */
                    <ul className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0 md:pb-0">
                      {sectionItems.map((item) => (
                        <li key={item.slug} className="w-[74vw] max-w-xs shrink-0 snap-center md:w-auto md:max-w-none">
                          <DishCard item={item} />
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
