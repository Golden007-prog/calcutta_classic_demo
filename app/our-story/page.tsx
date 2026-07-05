import type { Metadata } from "next";

import { ComingSoon } from "@/components/ComingSoon";

export const metadata: Metadata = { title: "Our Story" };

export default function OurStoryPage() {
  return (
    <ComingSoon
      title="Our Story"
      note="Shyambazar, the first steamer, and the ₹20 Belgian Coffee legend — the scrollytelling version is being written. It involves a lot of steam."
    />
  );
}
