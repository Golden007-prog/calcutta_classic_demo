import type { Metadata } from "next";
import { WifiOff } from "lucide-react";

import { Glass } from "@/components/ui/Glass";
import { VegDot } from "@/components/ui/VegDot";
import { combos, menuItems } from "@/data/menu";
import { site } from "@/data/site";
import { formatINR } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Offline — the menu still works",
  robots: { index: false },
};

/**
 * Feature 101 — offline fallback with the full menu inlined:
 * "Menu works even on Metro Wi-Fi."
 */
export default function OfflinePage() {
  return (
    <section className="mx-auto max-w-2xl px-4 py-16 md:px-0">
      <Glass variant="panel" className="p-6 md:p-8">
        <p className="flex items-center gap-2 text-sm text-soft">
          <WifiOff size={15} aria-hidden className="text-momo-gold" />
          You&apos;re offline — probably Metro Wi-Fi. The menu survives.
        </p>
        <h1 className="mt-3 font-display text-3xl font-semibold">
          The Calcutta Classics
        </h1>
        <p className="mt-1 text-sm text-soft">
          {site.location.addressLine}, {site.location.city} · {site.hours.label}
        </p>

        <ul className="mt-6 divide-y divide-line/60">
          {menuItems.map((item) => (
            <li key={item.slug} className="flex items-center justify-between gap-3 py-2.5 text-sm">
              <span className="flex items-center gap-2">
                <VegDot veg={item.veg} className="scale-90" />
                {item.name}
                {item.priceNote && <span className="text-xs text-soft">({item.priceNote})</span>}
              </span>
              <span className="shrink-0 font-semibold text-momo-gold">
                {item.price !== null ? formatINR(item.price) : "Ask"}
              </span>
            </li>
          ))}
        </ul>

        <h2 className="mt-6 font-display text-xl font-semibold">Signature Combos</h2>
        <ul className="mt-2 divide-y divide-line/60">
          {combos.map((combo) => (
            <li key={combo.slug} className="flex items-center justify-between gap-3 py-2.5 text-sm">
              <span>{combo.name}</span>
              <span className="shrink-0 font-semibold text-momo-gold">{formatINR(combo.price)}</span>
            </li>
          ))}
        </ul>

        <p className="mt-6 text-xs text-soft">
          Everything reconnects when you resurface. The momos will wait. Briefly.
        </p>
      </Glass>
    </section>
  );
}
