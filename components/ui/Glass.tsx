import type { ComponentPropsWithoutRef, ElementType } from "react";

import { cn } from "@/lib/utils";

/**
 * The single glassmorphism primitive — spec §4.
 * One blur layer only: never nest a Glass inside another Glass.
 */
const variants = {
  /** Full-width bars (navbar): square edges, bottom hairline. */
  bar: "rounded-none border-x-0 border-t-0",
  /** Floating pill (mobile tab bar, chips). */
  pill: "rounded-full",
  /** Content cards over imagery. */
  card: "rounded-2xl",
  /** Large hero/modal panels. */
  panel: "rounded-3xl",
} as const;

type GlassOwnProps<T extends ElementType> = {
  as?: T;
  variant?: keyof typeof variants;
  className?: string;
};

type GlassProps<T extends ElementType> = GlassOwnProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof GlassOwnProps<T>>;

export function Glass<T extends ElementType = "div">({
  as,
  variant = "card",
  className,
  ...rest
}: GlassProps<T>) {
  const Component = (as ?? "div") as ElementType;

  return (
    <Component
      className={cn(
        "border backdrop-blur-xl",
        // light: milky glass over cream · dark: 8–12% white fill over charcoal
        "border-black/10 bg-white/60 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.55),0_8px_28px_-12px_rgba(15,15,16,0.25)]",
        "dark:border-white/15 dark:bg-white/10 dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.10),0_8px_28px_-12px_rgba(0,0,0,0.6)]",
        variants[variant],
        className,
      )}
      {...rest}
    />
  );
}
