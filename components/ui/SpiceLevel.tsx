import { Flame } from "lucide-react";

import type { SpiceLevel as Level } from "@/data/types";
import { cn } from "@/lib/utils";

const labels: Record<Level, string> = {
  0: "No spice",
  1: "Mild",
  2: "Medium",
  3: "Fiery",
};

/** Chili-icon spice indicator, 0–3 (spec §4). */
export function SpiceLevel({ level, className }: { level: Level; className?: string }) {
  if (level === 0) return null;

  return (
    <span
      role="img"
      aria-label={`Spice level: ${labels[level]}`}
      title={labels[level]}
      className={cn("inline-flex items-center gap-0.5", className)}
    >
      {Array.from({ length: level }).map((_, i) => (
        <Flame key={i} size={13} aria-hidden className="fill-chili/20 text-chili" />
      ))}
    </span>
  );
}
