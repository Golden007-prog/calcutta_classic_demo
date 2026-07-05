import { ArrowRight, Clock, MapPin } from "lucide-react";
import Link from "next/link";

import { Glass } from "@/components/ui/Glass";
import { InstagramIcon } from "@/components/ui/icons";
import { SpiceLevel } from "@/components/ui/SpiceLevel";
import { VegDot } from "@/components/ui/VegDot";
import { bestsellers, combos } from "@/data/menu";
import { site } from "@/data/site";
import { formatINR } from "@/lib/utils";

/**
 * Phase-1 home. The cinematic hero (video + R3F momo + steam particles)
 * replaces the top section in Phase 4 — everything here is already real
 * data and real copy.
 */
export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="grain relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 left-1/2 h-[28rem] w-[44rem] -translate-x-1/2 rounded-full bg-momo-gold/15 blur-3xl"
        />
        <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center gap-8 px-4 pb-24 pt-20 text-center md:pt-32">
          <Glass variant="pill" className="flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-[0.25em] text-soft">
            <MapPin size={12} aria-hidden className="text-momo-gold" />
            Opposite Deshbandhu Park · Shyambazar
          </Glass>

          <h1 className="max-w-3xl text-balance font-display text-5xl font-semibold leading-[1.05] md:text-7xl">
            Bite into happiness,{" "}
            <span className="font-bengali font-bold text-momo-gold">কলকাতা</span>{" "}
            style.
          </h1>

          <p className="max-w-xl text-pretty text-base text-soft md:text-lg">
            Steam momos, crackling bhetki fish fry and the legendary{" "}
            <span className="font-semibold text-foreground">₹20 Belgian Coffee</span>{" "}
            — {site.tagline.toLowerCase()}, since the first steamer hissed in
            Shyambazar.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/menu"
              className="tap-target inline-flex items-center gap-2 rounded-full bg-momo-gold px-6 py-3 text-sm font-semibold text-charcoal transition-colors hover:bg-momo-gold/90"
            >
              Explore the menu
              <ArrowRight size={16} aria-hidden />
            </Link>
            <Glass
              as={Link}
              href="/visit"
              variant="pill"
              className="tap-target inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold transition-colors hover:text-momo-gold"
            >
              Find the shop
            </Glass>
          </div>

          <p className="text-xs uppercase tracking-[0.3em] text-soft">
            {site.brandLines.join("  ·  ")}
          </p>
        </div>
      </section>

      {/* Bestsellers preview */}
      <section aria-labelledby="bestsellers-heading" className="mx-auto max-w-6xl px-4 py-16 md:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-soft">
              The regulars&apos; shortlist
            </p>
            <h2 id="bestsellers-heading" className="mt-2 font-display text-3xl font-semibold md:text-4xl">
              Bestsellers
            </h2>
          </div>
          <Link
            href="/menu"
            className="hidden items-center gap-1 text-sm font-medium text-momo-gold hover:underline sm:inline-flex"
          >
            Full menu <ArrowRight size={14} aria-hidden />
          </Link>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {bestsellers.map((item) => (
            <li key={item.slug}>
              <Glass as="article" className="flex h-full flex-col gap-3 p-5">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <VegDot veg={item.veg} />
                    <h3 className="font-display text-lg font-semibold">
                      {item.name}
                    </h3>
                  </div>
                  <SpiceLevel level={item.spice} />
                </div>
                <p className="flex-1 text-sm text-soft">{item.description}</p>
                <p className="font-display text-xl font-semibold text-momo-gold">
                  {item.price !== null ? formatINR(item.price) : "Ask in store"}
                  {item.priceNote && item.price !== null && (
                    <span className="ml-2 text-xs font-normal text-soft">
                      {item.priceNote}
                    </span>
                  )}
                </p>
              </Glass>
            </li>
          ))}
        </ul>
      </section>

      {/* Signature combos */}
      <section aria-labelledby="combos-heading" className="border-y border-line bg-surface/60">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-8">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-[0.3em] text-soft">
              More food, fewer rupees
            </p>
            <h2 id="combos-heading" className="mt-2 font-display text-3xl font-semibold md:text-4xl">
              Signature Combos
            </h2>
          </div>

          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {combos.map((combo) => (
              <li key={combo.slug}>
                <Glass as="article" className="flex h-full flex-col gap-3 p-5">
                  <h3 className="font-display text-lg font-semibold">
                    {combo.name}
                  </h3>
                  <ul className="flex-1 space-y-1 text-sm text-soft">
                    {combo.contents.map((c) => (
                      <li key={c.label}>
                        {c.qty > 1 || c.unit === "pcs" || c.unit === "cups"
                          ? `${c.qty} ${c.unit ?? "×"} `
                          : ""}
                        {c.label}
                      </li>
                    ))}
                  </ul>
                  <p className="font-display text-xl font-semibold text-momo-gold">
                    {formatINR(combo.price)}
                  </p>
                </Glass>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Visit block */}
      <section aria-labelledby="visit-heading" className="mx-auto max-w-6xl px-4 py-16 md:px-8">
        <Glass variant="panel" className="grain relative overflow-hidden px-6 py-12 text-center md:px-12">
          <h2 id="visit-heading" className="font-display text-3xl font-semibold md:text-4xl">
            Steam first. Questions later.
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-soft md:text-base">
            {site.location.addressLine}, {site.location.city} · {site.hours.label}
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a
              href={site.location.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="tap-target inline-flex items-center gap-2 rounded-full bg-momo-gold px-6 py-3 text-sm font-semibold text-charcoal transition-colors hover:bg-momo-gold/90"
            >
              <MapPin size={16} aria-hidden />
              Get directions
            </a>
            <a
              href={site.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="tap-target inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-foreground/80 transition-colors hover:text-momo-gold"
            >
              <InstagramIcon size={16} />
              {site.instagram.handle}
            </a>
          </div>
          <p className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-soft">
            <Clock size={12} aria-hidden />
            Open every day
          </p>
        </Glass>
      </section>
    </>
  );
}
