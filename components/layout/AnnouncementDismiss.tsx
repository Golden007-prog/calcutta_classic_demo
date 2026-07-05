"use client";

import { X } from "lucide-react";

/** Dismiss button for the server-rendered announcement bar (feature 48). */
export function AnnouncementDismiss({ id }: { id: string }) {
  return (
    <button
      type="button"
      onClick={() => {
        try {
          localStorage.setItem(`cc-announce-${id}`, "dismissed");
        } catch {
          /* ignore */
        }
        // User-initiated hide — excluded from CLS by definition.
        document.documentElement.setAttribute("data-announce-hidden", "1");
      }}
      aria-label="Dismiss announcement"
      className="tap-target -mr-2 inline-flex shrink-0 items-center justify-center rounded-full text-foreground/60 hover:text-chili"
    >
      <X size={15} aria-hidden />
    </button>
  );
}
