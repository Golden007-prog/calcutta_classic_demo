import { ArrowLeft, UtensilsCrossed } from "lucide-react";
import Link from "next/link";

import { Glass } from "@/components/ui/Glass";

/** Feature 108 — the rolling-momo animation joins in Phase 8. */
export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-3xl flex-col items-center px-4 py-24 text-center">
      <Glass variant="panel" className="grain relative w-full space-y-5 overflow-hidden px-6 py-16">
        <p aria-hidden className="overflow-hidden font-display text-7xl">
          <span className="cc-roll">🥟</span>
        </p>
        <h1 className="font-display text-4xl font-semibold">
          This page rolled away
        </h1>
        <p className="mx-auto max-w-md text-sm text-soft md:text-base">
          Someone tilted the steamer and this page rolled straight off the
          counter. The momos, thankfully, are all safe.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="tap-target inline-flex items-center gap-2 rounded-full bg-momo-gold px-6 py-3 text-sm font-semibold text-on-gold transition-colors hover:bg-momo-gold/90"
          >
            <ArrowLeft size={16} aria-hidden />
            Back to home
          </Link>
          <Link
            href="/menu"
            className="tap-target inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-foreground/80 transition-colors hover:text-momo-gold"
          >
            <UtensilsCrossed size={16} aria-hidden />
            See the menu
          </Link>
        </div>
      </Glass>
    </section>
  );
}
