"use client";

import { CloudRain, Sun, ThermometerSun, Wind } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";

import { Glass } from "@/components/ui/Glass";

/**
 * Features 24 + 47 — weather-aware suggestion via Open-Meteo (free, no
 * key) for Shyambazar, Kolkata. Fails silently: no data → no banner.
 */

interface Weather {
  temp: number;
  code: number;
}

const KOLKATA = { lat: 22.6011, lon: 88.3731 };
let cached: Weather | null | undefined;

export function useKolkataWeather(): Weather | null {
  const [weather, setWeather] = useState<Weather | null>(cached ?? null);

  useEffect(() => {
    if (cached !== undefined) return;
    cached = null;
    const controller = new AbortController();
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${KOLKATA.lat}&longitude=${KOLKATA.lon}&current=temperature_2m,weather_code&timezone=Asia%2FKolkata`,
      { signal: controller.signal },
    )
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.current) {
          cached = { temp: data.current.temperature_2m, code: data.current.weather_code };
          setWeather(cached);
        }
      })
      .catch(() => {
        /* graceful fallback — banner simply doesn't render */
      });
    return () => controller.abort();
  }, []);

  return weather;
}

function suggestion(weather: Weather): { icon: typeof Sun; text: string; slug: string; cta: string } | null {
  const rainy = [51, 53, 55, 61, 63, 65, 80, 81, 82, 95, 96, 99].includes(weather.code);
  if (rainy) {
    return {
      icon: CloudRain,
      text: "It's raining in Kolkata — this is steam momo weather, legally speaking.",
      slug: "steam-momo",
      cta: "Steam Momos + hot coffee",
    };
  }
  if (weather.temp >= 34) {
    return {
      icon: ThermometerSun,
      text: `${Math.round(weather.temp)}°C outside — corn chaat and cold-ish thoughts recommended.`,
      slug: "sweet-corn-chaat",
      cta: "Something lighter",
    };
  }
  if (weather.temp <= 18) {
    return {
      icon: Wind,
      text: `${Math.round(weather.temp)}°C — Kolkata "winter"! Bucket weather has officially arrived.`,
      slug: "royal-chicken-bucket",
      cta: "Royal Chicken Bucket",
    };
  }
  return {
    icon: Sun,
    text: `${Math.round(weather.temp)}°C and pleasant — perfect fish fry conditions.`,
    slug: "bhetki-fish-fry",
    cta: "Bhetki Fish Fry",
  };
}

export function WeatherBanner() {
  const weather = useKolkataWeather();
  if (!weather) return null;

  const s = suggestion(weather);
  if (!s) return null;
  const Icon = s.icon;

  return (
    <Glass className="flex flex-wrap items-center gap-3 px-5 py-4">
      <Icon size={20} aria-hidden className="shrink-0 text-momo-gold" />
      <p className="min-w-0 flex-1 text-sm">{s.text}</p>
      <Link
        href={`/menu/${s.slug}`}
        className="tap-target inline-flex shrink-0 items-center rounded-full bg-momo-gold px-4 py-2 text-xs font-semibold text-charcoal hover:bg-momo-gold/90"
      >
        {s.cta} →
      </Link>
    </Glass>
  );
}

/** Compact footer widget (feature 47). */
export function WeatherWidget() {
  const weather = useKolkataWeather();
  if (!weather) return null;
  const rainy = [51, 53, 55, 61, 63, 65, 80, 81, 82, 95, 96, 99].includes(weather.code);
  return (
    <p className="flex items-center gap-2 text-sm text-foreground/80">
      {rainy ? <CloudRain size={16} aria-hidden className="text-momo-gold" /> : <Sun size={16} aria-hidden className="text-momo-gold" />}
      Kolkata: {Math.round(weather.temp)}°C {rainy ? "· rain = momo weather" : ""}
    </p>
  );
}
