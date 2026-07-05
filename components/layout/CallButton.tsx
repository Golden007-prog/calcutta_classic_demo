import { Phone } from "lucide-react";

import { site } from "@/data/site";
import { cn } from "@/lib/utils";

/**
 * "Order" = walk in or call — never online checkout (spec §2).
 * While the phone number is TBD the button renders disabled with a hint.
 */
export function CallButton({ className }: { className?: string }) {
  const base = cn(
    "tap-target inline-flex items-center gap-2 rounded-full px-4 text-sm font-medium transition-colors",
    className,
  );

  if (!site.contact.phone) {
    return (
      <span
        title="Phone number coming soon"
        aria-disabled="true"
        className={cn(base, "cursor-not-allowed border border-momo-gold/40 bg-momo-gold/15 text-foreground/75")}
      >
        <Phone size={16} aria-hidden />
        Call us
      </span>
    );
  }

  return (
    <a
      href={`tel:${site.contact.phone}`}
      className={cn(base, "bg-momo-gold text-on-gold hover:bg-momo-gold/90")}
    >
      <Phone size={16} aria-hidden />
      Call us
    </a>
  );
}
