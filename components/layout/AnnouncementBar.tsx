"use client";

import { X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { festivals } from "@/data/foodie";

/**
 * Features 44 + 48 — festival banner system + dismissible announcements.
 * Shows the active festival line (date-range driven) or a standing
 * announcement; dismissal is remembered per-message in localStorage.
 */

const STANDING_ANNOUNCEMENT: { id: string; text: string; href: string } = {
  id: "pizza-2026",
  text: "NEW: Crispy Chicken Pizza has landed — hot, crispy & oh-so good. Price at the counter!",
  href: "/menu/crispy-chicken-pizza",
};

function activeFestivalBanner(date = new Date()) {
  const ist = new Date(date.getTime() + 330 * 60000);
  const value = (ist.getUTCMonth() + 1) * 100 + ist.getUTCDate();
  const festival = festivals.find((f) => {
    const start = f.start[0] * 100 + f.start[1];
    const end = f.end[0] * 100 + f.end[1];
    return start <= end ? value >= start && value <= end : value >= start || value <= end;
  });
  return festival
    ? {
        id: `festival-${festival.name}`,
        text: `${festival.name}${festival.bengali ? ` · ${festival.bengali}` : ""} — ${festival.line}`,
        href: `/menu/${festival.slug}`,
      }
    : null;
}

export function AnnouncementBar() {
  const [banner, setBanner] = useState<{ id: string; text: string; href: string } | null>(null);

  useEffect(() => {
    const candidate = activeFestivalBanner() ?? STANDING_ANNOUNCEMENT;
    try {
      if (localStorage.getItem(`cc-announce-${candidate.id}`) === "dismissed") return;
    } catch {
      /* ignore */
    }
    setBanner(candidate);
  }, []);

  if (!banner) return null;

  const dismiss = () => {
    try {
      localStorage.setItem(`cc-announce-${banner.id}`, "dismissed");
    } catch {
      /* ignore */
    }
    setBanner(null);
  };

  return (
    <div className="relative z-40 border-b border-momo-gold/30 bg-momo-gold/10 text-sm backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-2 md:px-8">
        <Link href={banner.href} className="min-w-0 flex-1 truncate hover:text-momo-gold">
          <span aria-hidden className="mr-2">📣</span>
          {banner.text}
        </Link>
        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss announcement"
          className="tap-target -mr-2 inline-flex shrink-0 items-center justify-center rounded-full text-foreground/60 hover:text-chili"
        >
          <X size={15} aria-hidden />
        </button>
      </div>
    </div>
  );
}
