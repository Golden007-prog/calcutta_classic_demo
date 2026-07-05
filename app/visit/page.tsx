import type { Metadata } from "next";

import { ComingSoon } from "@/components/ComingSoon";

export const metadata: Metadata = { title: "Visit Us" };

export default function VisitPage() {
  return (
    <ComingSoon
      title="Visit Us"
      note="Map, landmarks, metro directions and the live open/closed badge land in Phase 7. Meanwhile: opposite Deshbandhu Park, Shyambazar — 12 PM to 10 PM, every day."
    />
  );
}
