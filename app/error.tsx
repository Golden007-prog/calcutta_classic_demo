"use client";

import { RotateCcw } from "lucide-react";

import { Glass } from "@/components/ui/Glass";

/** Feature 109 — the kitchen-mishap illustration joins in Phase 8. */
export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="mx-auto flex max-w-3xl flex-col items-center px-4 py-24 text-center">
      <Glass variant="panel" className="grain relative w-full space-y-5 overflow-hidden px-6 py-16">
        <p aria-hidden className="font-display text-7xl">
          🍳
        </p>
        <h1 className="font-display text-4xl font-semibold">
          A small kitchen mishap
        </h1>
        <p className="mx-auto max-w-md text-sm text-soft md:text-base">
          Something slipped off the tawa. Give it another go — the stove is
          still hot.
        </p>
        <button
          type="button"
          onClick={reset}
          className="tap-target inline-flex items-center gap-2 rounded-full bg-momo-gold px-6 py-3 text-sm font-semibold text-on-gold transition-colors hover:bg-momo-gold/90"
        >
          <RotateCcw size={16} aria-hidden />
          Try again
        </button>
      </Glass>
    </section>
  );
}
