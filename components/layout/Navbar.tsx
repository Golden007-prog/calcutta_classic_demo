"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { CallButton } from "@/components/layout/CallButton";
import { LanguageToggle } from "@/components/layout/LanguageToggle";
import { NavLinks } from "@/components/layout/NavLinks";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Glass } from "@/components/ui/Glass";
import { cn } from "@/lib/utils";

/** Feature 69 — glass navbar that condenses after the first scroll. */
export function Navbar() {
  const [condensed, setCondensed] = useState(false);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setCondensed(window.scrollY > 28));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <Glass
        as="nav"
        variant="bar"
        aria-label="Main"
        className={cn(
          "flex items-center justify-between gap-4 px-4 transition-[height] duration-300 md:px-8 motion-reduce:transition-none",
          condensed ? "h-12" : "h-16",
        )}
      >
        <Link
          href="/"
          className={cn(
            "font-display font-semibold tracking-tight transition-[font-size] duration-300 motion-reduce:transition-none",
            condensed ? "text-base" : "text-lg",
          )}
        >
          The <span className="text-momo-gold">Calcutta</span> Classics
        </Link>

        <div className="hidden items-center gap-5 text-sm text-foreground/80 lg:flex">
          <NavLinks />
        </div>

        <div className="flex items-center gap-1.5">
          <LanguageToggle />
          <ThemeToggle />
          <CallButton className={cn("hidden sm:inline-flex", condensed && "!min-h-9 py-1.5")} />
        </div>
      </Glass>
    </header>
  );
}
