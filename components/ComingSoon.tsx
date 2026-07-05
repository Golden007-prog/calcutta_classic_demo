import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { Glass } from "@/components/ui/Glass";

/** Temporary stub used while a route's real build phase lands. */
export function ComingSoon({ title, note }: { title: string; note: string }) {
  return (
    <section className="mx-auto flex max-w-3xl flex-col items-center px-4 py-24 text-center">
      <Glass variant="panel" className="grain relative w-full space-y-5 overflow-hidden px-6 py-16">
        <p className="text-xs uppercase tracking-[0.3em] text-soft">
          Still in the steamer
        </p>
        <h1 className="font-display text-4xl font-semibold">{title}</h1>
        <p className="mx-auto max-w-md text-sm text-soft md:text-base">{note}</p>
        <Link
          href="/"
          className="tap-target inline-flex items-center gap-2 rounded-full bg-momo-gold px-6 py-3 text-sm font-semibold text-charcoal transition-colors hover:bg-momo-gold/90"
        >
          <ArrowLeft size={16} aria-hidden />
          Back to home
        </Link>
      </Glass>
    </section>
  );
}
