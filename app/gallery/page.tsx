import type { Metadata } from "next";

import { ComingSoon } from "@/components/ComingSoon";

export const metadata: Metadata = { title: "Gallery" };

export default function GalleryPage() {
  return (
    <ComingSoon
      title="Gallery"
      note="A masonry wall of steam, cheese-pulls and fry-crunch is coming once the Phase 3 photo shoot wraps."
    />
  );
}
