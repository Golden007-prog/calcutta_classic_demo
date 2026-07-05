"use client";

import { useEffect, useState } from "react";

import { openStatus, type OpenStatus } from "@/lib/hours";
import { cn } from "@/lib/utils";

/** Feature 41 — live open/closed badge in IST; ticks every minute. */
export function OpenBadge({ className }: { className?: string }) {
  const [status, setStatus] = useState<OpenStatus | null>(null);

  useEffect(() => {
    const update = () => setStatus(openStatus());
    update();
    const id = window.setInterval(update, 60_000);
    return () => window.clearInterval(id);
  }, []);

  if (!status) return null;

  return (
    <p
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm",
        status.open
          ? "border-leaf/50 text-leaf dark:text-leaf-soft"
          : "border-chili/50 text-chili dark:text-chili-soft",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          "size-2 rounded-full",
          status.open ? "animate-pulse bg-leaf motion-reduce:animate-none" : "bg-chili",
        )}
      />
      {status.open ? "Open now" : "Closed"} · {status.detail}
    </p>
  );
}
