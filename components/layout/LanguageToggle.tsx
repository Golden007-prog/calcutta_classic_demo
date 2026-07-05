"use client";

import { useEffect } from "react";

import { useLang } from "@/stores/lang";
import { cn } from "@/lib/utils";

/** Feature 39 — EN/বাং switch. */
export function LanguageToggle() {
  const { lang, hydrated, setLang, hydrate } = useLang();

  useEffect(() => {
    if (!hydrated) hydrate();
  }, [hydrated, hydrate]);

  return (
    <button
      type="button"
      onClick={() => setLang(lang === "en" ? "bn" : "en")}
      title={lang === "en" ? "বাংলায় দেখুন" : "Switch to English"}
      className="tap-target inline-flex items-center gap-1 rounded-full px-2 text-sm font-medium text-foreground/80 transition-colors hover:text-momo-gold"
    >
      <span className={cn(lang === "en" && "text-momo-gold")}>EN</span>
      <span aria-hidden className="text-soft">/</span>
      <span className={cn("font-bengali", lang === "bn" && "text-momo-gold")}>বাং</span>
    </button>
  );
}
