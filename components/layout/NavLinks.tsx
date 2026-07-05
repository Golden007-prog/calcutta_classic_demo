"use client";

import Link from "next/link";

import { translate, type StringKey } from "@/lib/i18n";
import { useLang } from "@/stores/lang";

const links: Array<{ href: string; key: StringKey }> = [
  { href: "/menu", key: "nav.menu" },
  { href: "/combos", key: "nav.combos" },
  { href: "/our-story", key: "nav.story" },
  { href: "/foodie-zone", key: "nav.foodie" },
  { href: "/blog", key: "nav.blog" },
  { href: "/visit", key: "nav.visit" },
  { href: "/contact", key: "nav.contact" },
];

/** Desktop nav links, language-aware (feature 39). */
export function NavLinks() {
  const lang = useLang((s) => s.lang);

  return (
    <>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`transition-colors hover:text-momo-gold ${lang === "bn" ? "font-bengali" : ""}`}
        >
          {translate(link.key, lang)}
        </Link>
      ))}
    </>
  );
}
