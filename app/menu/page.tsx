import type { Metadata } from "next";

import { ComingSoon } from "@/components/ComingSoon";

export const metadata: Metadata = { title: "Menu" };

export default function MenuPage() {
  return (
    <ComingSoon
      title="The Menu"
      note="All 13 classics with filters, fuzzy search, spice meters and swipeable cards are being plated in Phase 5. The steamer is already on."
    />
  );
}
