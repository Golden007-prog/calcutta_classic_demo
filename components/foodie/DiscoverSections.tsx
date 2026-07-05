"use client";

import { ChevronDown, Moon, Sun, Sunset } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { DishImage } from "@/components/ui/DishImage";
import { Glass } from "@/components/ui/Glass";
import { dailySpecials, festivals, foodFacts, glossary } from "@/data/foodie";
import { getItem } from "@/data/menu";
import { formatINR } from "@/lib/utils";

/* ── Feature 25: time-of-day mode ───────────────────────────────── */

export type Daypart = "morning" | "afternoon" | "evening" | "night";

export function istDaypart(date = new Date()): Daypart {
  const hour = (date.getUTCHours() + 5.5 + (date.getUTCMinutes() >= 30 ? 0.5 : 0)) % 24;
  if (hour < 12) return "morning";
  if (hour < 16.5) return "afternoon";
  if (hour < 21) return "evening";
  return "night";
}

const DAYPART_COPY: Record<Daypart, { icon: typeof Sun; line: string }> = {
  morning: { icon: Sun, line: "Steamer warms up at noon — plan your attack." },
  afternoon: { icon: Sun, line: "Lunch hours. The fish fry queue is forming." },
  evening: { icon: Sunset, line: "Snack hour. This is what the whole day was for." },
  night: { icon: Moon, line: "Last steams before 10 PM — run, don't walk." },
};

export function DaypartBadge() {
  const [daypart, setDaypart] = useState<Daypart | null>(null);
  // eslint-disable-next-line react-hooks/set-state-in-effect -- one-shot: IST time only exists meaningfully on the client; SSR renders nothing
  useEffect(() => setDaypart(istDaypart()), []);
  if (!daypart) return null;
  const { icon: Icon, line } = DAYPART_COPY[daypart];
  return (
    <p className="inline-flex items-center gap-2 text-sm text-soft">
      <Icon size={15} aria-hidden className="text-momo-gold" />
      {line}
    </p>
  );
}

/* ── Feature 23: daily special ──────────────────────────────────── */

export function DailySpecial() {
  const [day, setDay] = useState<number | null>(null);
  useEffect(() => {
    const now = new Date();
    const istDay = new Date(now.getTime() + 330 * 60000).getUTCDay();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-shot: date-driven content computes client-side so the page stays fully static
    setDay(istDay);
  }, []);

  if (day === null) return null;
  const special = dailySpecials[day];
  const item = getItem(special.slug);
  const combo = special.slug === "signature-meal-box";

  return (
    <Glass className="flex items-center gap-4 p-4" id="daily-special">
      <DishImage
        src={item?.image ?? "/images/combos/signature-meal-box.jpg"}
        alt={item?.name ?? "Signature Meal Box"}
        label="Today"
        className="size-20 shrink-0 rounded-2xl"
        sizes="80px"
      />
      <div className="min-w-0">
        <p className="text-[11px] uppercase tracking-[0.25em] text-momo-gold">Today&apos;s pick</p>
        <p className="font-display text-lg font-semibold">
          <Link href={combo ? "/combos" : `/menu/${special.slug}`} className="hover:text-momo-gold">
            {item?.name ?? "Signature Meal Box"}
          </Link>
          {item?.price != null && <span className="ml-2 text-sm font-normal text-soft">{formatINR(item.price)}</span>}
        </p>
        <p className="text-sm text-soft">{special.line}</p>
      </div>
    </Glass>
  );
}

/* ── Feature 35: seasonal / festival specials ───────────────────── */

function activeFestival(date = new Date()) {
  const ist = new Date(date.getTime() + 330 * 60000);
  const m = ist.getUTCMonth() + 1;
  const d = ist.getUTCDate();
  const value = m * 100 + d;
  return festivals.find((f) => {
    const start = f.start[0] * 100 + f.start[1];
    const end = f.end[0] * 100 + f.end[1];
    return start <= end ? value >= start && value <= end : value >= start || value <= end;
  });
}

export function SeasonalSpecial() {
  const [festival, setFestival] = useState<ReturnType<typeof activeFestival> | null>(null);
  // eslint-disable-next-line react-hooks/set-state-in-effect -- one-shot: festival windows are date-driven and compute client-side (page stays static)
  useEffect(() => setFestival(activeFestival() ?? undefined), []);
  if (!festival) return null;
  const item = getItem(festival.slug);

  return (
    <Glass className="flex items-center gap-4 border-momo-gold/40 p-4" id="seasonal">
      <span aria-hidden className="text-3xl">🪔</span>
      <div className="min-w-0">
        <p className="text-[11px] uppercase tracking-[0.25em] text-momo-gold">
          {festival.name} {festival.bengali && <span className="font-bengali normal-case">· {festival.bengali}</span>}
        </p>
        <p className="text-sm">{festival.line}</p>
        {item && (
          <Link href={`/menu/${item.slug}`} className="text-sm font-semibold text-momo-gold underline-offset-4 hover:underline">
            {item.name} →
          </Link>
        )}
      </div>
    </Glass>
  );
}

/* ── Feature 29: food-facts ticker ──────────────────────────────── */

export function FactsTicker() {
  const doubled = [...foodFacts, ...foodFacts];
  return (
    <div
      className="group relative overflow-hidden border-y border-line bg-surface/60 py-3"
      aria-label="Food facts"
    >
      <ul className="cc-marquee flex w-max gap-10 whitespace-nowrap px-4 text-sm text-soft motion-reduce:animate-none group-hover:[animation-play-state:paused]">
        {doubled.map((fact, i) => (
          <li key={i} aria-hidden={i >= foodFacts.length}>
            <span className="mr-3 text-momo-gold" aria-hidden>🥟</span>
            {fact}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── Feature 26: glossary ───────────────────────────────────────── */

export function Glossary() {
  return (
    <Glass variant="panel" className="p-6 md:p-8" id="glossary">
      <p className="text-xs uppercase tracking-[0.3em] text-soft">Speak fluent street food</p>
      <h3 className="mt-1 font-display text-2xl font-semibold md:text-3xl">The foodie glossary</h3>
      <div className="mt-5 divide-y divide-line/70">
        {glossary.map((entry) => (
          <details key={entry.term} className="group py-3">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 [&::-webkit-details-marker]:hidden">
              <span className="font-display text-lg font-semibold">
                {entry.term}
                {entry.bengali && <span className="ml-2 font-bengali text-base font-normal text-momo-gold">{entry.bengali}</span>}
              </span>
              <ChevronDown size={16} aria-hidden className="shrink-0 transition-transform group-open:rotate-180" />
            </summary>
            <p className="pt-2 text-sm text-soft">{entry.definition}</p>
          </details>
        ))}
      </div>
    </Glass>
  );
}
