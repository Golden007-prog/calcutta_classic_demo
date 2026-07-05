"use client";

import { Bus, Footprints, MapPin, Navigation, TrainFront, TramFront } from "lucide-react";
import { useState } from "react";

import { Glass } from "@/components/ui/Glass";
import { site } from "@/data/site";

/** Shop coordinates — opposite Deshbandhu Park, Shyambazar. */
export const SHOP = { lat: 22.6013, lon: 88.3722 };

/* ── Feature 36: embedded map + custom glass pin + directions ───── */

export function MapEmbed() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-line">
      <iframe
        title="Map — The Calcutta Classics, opposite Deshbandhu Park, Shyambazar"
        src={`https://www.google.com/maps?q=${encodeURIComponent("Deshbandhu Park, Shyambazar, Kolkata")}&z=17&output=embed`}
        className="h-[340px] w-full border-0 md:h-[420px]"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
      {/* custom glass pin */}
      <Glass className="pointer-events-none absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-[130%] items-center gap-2 px-4 py-2">
        <MapPin size={16} aria-hidden className="text-chili" />
        <span className="text-sm font-semibold">The Calcutta Classics</span>
      </Glass>
      <a
        href={site.location.mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="tap-target absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full bg-momo-gold px-5 py-2.5 text-sm font-semibold text-charcoal shadow-lg hover:bg-momo-gold/90"
      >
        <Navigation size={15} aria-hidden />
        Get directions
      </a>
    </div>
  );
}

/* ── Feature 37: landmark walking guide + mini illustrated map ──── */

export function LandmarkGuide() {
  return (
    <Glass variant="panel" className="p-6 md:p-8">
      <p className="text-xs uppercase tracking-[0.3em] text-soft">Can&apos;t-miss-it directions</p>
      <h3 className="mt-1 font-display text-2xl font-semibold">Opposite Deshbandhu Park</h3>

      {/* mini illustrated map */}
      <svg viewBox="0 0 320 150" className="mt-5 w-full" role="img" aria-label="Illustrated map: from Shyambazar metro, walk along Bhupen Bose Avenue; the stall is opposite Deshbandhu Park.">
        <rect x="0" y="0" width="320" height="150" rx="12" className="fill-surface" />
        {/* park */}
        <rect x="24" y="22" width="130" height="72" rx="10" fill="#4F7A4F" opacity="0.35" />
        <text x="89" y="60" textAnchor="middle" fontSize="11" className="fill-foreground" opacity="0.9">Deshbandhu</text>
        <text x="89" y="74" textAnchor="middle" fontSize="11" className="fill-foreground" opacity="0.9">Park 🌳</text>
        {/* road */}
        <rect x="0" y="102" width="320" height="18" fill="#8a8a8a" opacity="0.4" />
        <line x1="6" y1="111" x2="314" y2="111" stroke="#f6f1e7" strokeWidth="1.4" strokeDasharray="10 8" opacity="0.7" />
        {/* metro */}
        <circle cx="272" cy="40" r="15" fill="#2f6db3" opacity="0.85" />
        <text x="272" y="44" textAnchor="middle" fontSize="10" fill="#fff">M</text>
        <text x="272" y="70" textAnchor="middle" fontSize="9" className="fill-foreground" opacity="0.8">Shyambazar</text>
        {/* walking dots */}
        <path d="M258 52 C220 90 180 96 130 118" stroke="#E8A13A" strokeWidth="2.4" strokeDasharray="2 7" fill="none" strokeLinecap="round" />
        {/* stall */}
        <circle cx="118" cy="128" r="9" fill="#D64533" />
        <text x="118" y="132" textAnchor="middle" fontSize="9" fill="#fff">🥟</text>
        <text x="180" y="140" fontSize="10" className="fill-foreground" opacity="0.9">us — follow the steam</text>
      </svg>

      <ol className="mt-5 space-y-2.5 text-sm text-foreground/85">
        <li className="flex gap-2.5">
          <span className="font-display font-semibold text-momo-gold">1.</span>
          Exit Shyambazar Metro (gate 1) and face the five-point crossing.
        </li>
        <li className="flex gap-2.5">
          <span className="font-display font-semibold text-momo-gold">2.</span>
          Walk toward Deshbandhu Park — 2 minutes, one puchka stall of temptation.
        </li>
        <li className="flex gap-2.5">
          <span className="font-display font-semibold text-momo-gold">3.</span>
          At the park gate, look directly across the road. See steam? That&apos;s us.
        </li>
      </ol>
    </Glass>
  );
}

/* ── Feature 42: geolocation distance + walk time ───────────────── */

type GeoState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "denied" }
  | { status: "done"; km: number; walkMin: number };

export function DistanceCheck() {
  const [state, setState] = useState<GeoState>({ status: "idle" });

  const locate = () => {
    if (!navigator.geolocation) {
      setState({ status: "denied" });
      return;
    }
    setState({ status: "loading" });
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const km = haversineKm(
          position.coords.latitude,
          position.coords.longitude,
          SHOP.lat,
          SHOP.lon,
        );
        setState({ status: "done", km, walkMin: Math.round((km / 4.8) * 60) });
      },
      () => setState({ status: "denied" }),
      { timeout: 10_000, maximumAge: 300_000 },
    );
  };

  return (
    <Glass className="flex flex-col gap-3 p-5">
      <p className="flex items-center gap-2 font-display text-lg font-semibold">
        <Footprints size={18} aria-hidden className="text-momo-gold" />
        How far am I?
      </p>

      {state.status === "idle" && (
        <>
          <p className="text-sm text-soft">
            One tap, zero tracking — we compute it on your phone and forget it
            immediately.
          </p>
          <button
            type="button"
            onClick={locate}
            className="tap-target self-start rounded-full bg-momo-gold px-5 py-2.5 text-sm font-semibold text-charcoal hover:bg-momo-gold/90"
          >
            Check my distance
          </button>
        </>
      )}

      {state.status === "loading" && (
        <p className="text-sm text-soft" role="status">Triangulating your hunger…</p>
      )}

      {state.status === "denied" && (
        <p className="text-sm text-soft" role="status">
          No location? No problem — we&apos;re opposite Deshbandhu Park,
          Shyambazar. Your feet know the way.
        </p>
      )}

      {state.status === "done" && (
        <p className="text-sm" role="status">
          You&apos;re <strong className="text-momo-gold">{state.km < 1 ? `${Math.round(state.km * 1000)} m` : `${state.km.toFixed(1)} km`}</strong> away
          {state.km < 8 ? (
            <> — about <strong className="text-momo-gold">{state.walkMin} min</strong> on foot. The momos will still be hot.</>
          ) : (
            <> — worth the trip. People have come from further for less.</>
          )}
        </p>
      )}
    </Glass>
  );
}

function haversineKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

/* ── Feature 43: getting-there guide ────────────────────────────── */

const ROUTES = [
  {
    icon: TrainFront,
    title: "Metro (fastest)",
    copy: "Blue Line to Shyambazar. Gate 1, two-minute walk toward Deshbandhu Park.",
  },
  {
    icon: Bus,
    title: "Bus",
    copy: "Anything that calls Shyambazar 'five-point crossing' works — 3, 32A, 78, S-158. Hop off at the crossing.",
  },
  {
    icon: TramFront,
    title: "Tram (the heritage option)",
    copy: "The Shyambazar tram lines are older than most recipes in this city. If one rolls by, take it — the momos honour slow travel.",
  },
];

export function GettingThere() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {ROUTES.map(({ icon: Icon, title, copy }) => (
        <Glass key={title} className="p-5">
          <Icon size={20} aria-hidden className="text-momo-gold" />
          <h4 className="mt-2 font-display text-base font-semibold">{title}</h4>
          <p className="mt-1 text-sm text-soft">{copy}</p>
        </Glass>
      ))}
    </div>
  );
}
