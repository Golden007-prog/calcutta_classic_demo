import { cn } from "@/lib/utils";

/**
 * Indian-standard veg/non-veg marker: square outline with a filled dot.
 * Green = veg, red = non-veg (spec §4).
 */
export function VegDot({ veg, className }: { veg: boolean; className?: string }) {
  return (
    <span
      role="img"
      aria-label={veg ? "Vegetarian" : "Non-vegetarian"}
      title={veg ? "Veg" : "Non-veg"}
      className={cn(
        "inline-flex size-4 shrink-0 items-center justify-center border-2",
        veg ? "border-leaf" : "border-chili",
        className,
      )}
    >
      <span
        className={cn("size-2 rounded-full", veg ? "bg-leaf" : "bg-chili")}
      />
    </span>
  );
}
