import type { Metadata } from "next";

import { MenuExplorer } from "@/components/menu/MenuExplorer";
import { PrintMenu } from "@/components/menu/PrintMenu";
import { combos, menuItems } from "@/data/menu";

export const metadata: Metadata = {
  title: "Menu — Momos, Chaat & the ₹20 Belgian Coffee",
  description:
    "The full Calcutta Classics menu: steam and peri peri momos, bhetki fish fry, chaat, combos and the legendary ₹20 Belgian Coffee in Shyambazar.",
};

export default function MenuPage() {
  return (
    <>
      <header className="mx-auto max-w-6xl px-4 pb-6 pt-12 md:px-8">
        <p className="text-xs uppercase tracking-[0.3em] text-soft">
          Thirteen classics, zero filler
        </p>
        <h1 className="mt-2 font-display text-4xl font-semibold md:text-5xl">
          The Menu
        </h1>
        <p className="mt-3 max-w-xl text-sm text-soft md:text-base">
          Steamed, fried, loaded and poured — everything below is made to
          order. Filter by mood, search by craving, or just scroll hungry.
        </p>
      </header>

      <MenuExplorer items={menuItems} combos={combos} />
      <PrintMenu />
    </>
  );
}
