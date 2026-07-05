import Link from "next/link";

import { CallButton } from "@/components/layout/CallButton";
import { LanguageToggle } from "@/components/layout/LanguageToggle";
import { NavLinks } from "@/components/layout/NavLinks";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Glass } from "@/components/ui/Glass";

/**
 * Glass navbar. Scroll-condensing behaviour is feature 69 (Phase 8);
 * this stays a server component until then.
 */
export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <Glass as="nav" variant="bar" aria-label="Main" className="flex h-16 items-center justify-between gap-4 px-4 md:px-8">
        <Link
          href="/"
          className="font-display text-lg font-semibold tracking-tight"
        >
          The <span className="text-momo-gold">Calcutta</span> Classics
        </Link>

        <div className="hidden items-center gap-5 text-sm text-foreground/80 lg:flex">
          <NavLinks />
        </div>

        <div className="flex items-center gap-1.5">
          <LanguageToggle />
          <ThemeToggle />
          <CallButton className="hidden sm:inline-flex" />
        </div>
      </Glass>
    </header>
  );
}
