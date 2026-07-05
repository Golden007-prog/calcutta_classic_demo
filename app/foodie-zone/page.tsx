import type { Metadata } from "next";

import { ComingSoon } from "@/components/ComingSoon";

export const metadata: Metadata = { title: "Foodie Zone" };

export default function FoodieZonePage() {
  return (
    <ComingSoon
      title="Foodie Zone"
      note="The mood quiz, Spin-the-Momo wheel, craving matcher and Budget Bite Finder are all in Phase 6. Bring your appetite and ₹100."
    />
  );
}
