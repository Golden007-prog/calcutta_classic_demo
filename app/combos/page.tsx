import type { Metadata } from "next";

import { ComingSoon } from "@/components/ComingSoon";

export const metadata: Metadata = { title: "Signature Combos" };

export default function CombosPage() {
  return (
    <ComingSoon
      title="Signature Combos"
      note="The combo showcase — savings math, horizontal scroll gallery and all — arrives with Phase 5. Until then, the ₹349 Signature Meal Box still feeds two hungry humans."
    />
  );
}
