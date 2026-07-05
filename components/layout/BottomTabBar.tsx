"use client";

import { Home, MapPin, Package, UtensilsCrossed } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Glass } from "@/components/ui/Glass";
import { translate, type StringKey } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { useLang } from "@/stores/lang";

const tabs: Array<{ href: string; key: StringKey; icon: typeof Home }> = [
  { href: "/", key: "tab.home", icon: Home },
  { href: "/menu", key: "tab.menu", icon: UtensilsCrossed },
  { href: "/combos", key: "tab.combos", icon: Package },
  { href: "/visit", key: "tab.visit", icon: MapPin },
];

/** Mobile-only floating glass tab bar — spec §4, thumb-zone first. */
export function BottomTabBar() {
  const pathname = usePathname();
  const lang = useLang((s) => s.lang);

  return (
    <div className="fixed inset-x-3 bottom-3 z-50 pb-[env(safe-area-inset-bottom)] md:hidden">
      <Glass as="nav" variant="pill" aria-label="Quick navigation" className="flex h-16 items-stretch justify-around px-2">
        {tabs.map(({ href, key, icon: Icon }) => {
          const active =
            href === "/" ? pathname === "/" : pathname.startsWith(href);

          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "tap-target flex min-w-16 flex-col items-center justify-center gap-0.5 rounded-full text-[11px] font-medium transition-colors",
                lang === "bn" && "font-bengali",
                active ? "text-momo-gold" : "text-foreground/70 hover:text-foreground",
              )}
            >
              <Icon size={20} strokeWidth={active ? 2.4 : 2} aria-hidden />
              {translate(key, lang)}
            </Link>
          );
        })}
      </Glass>
    </div>
  );
}
