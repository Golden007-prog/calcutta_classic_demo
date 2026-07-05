import type { ComponentPropsWithoutRef, ElementType } from "react";

import { cn } from "@/lib/utils";

/**
 * The single glassmorphism primitive — spec §4.
 * The visual recipe lives in globals.css (`.cc-glass`): smoked dark glass in
 * BOTH themes (light text on dark surfaces only), with -webkit prefix and a
 * solid @supports fallback. One blur layer only: never nest Glass in Glass.
 */
const variants = {
  /** Full-width bars (navbar): square edges, bottom hairline. */
  bar: "cc-glass-bar rounded-none border-x-0 border-t-0",
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
  /**
   * Interactive cards (links/buttons) share ONE hover + focus-visible
   * treatment: gold border, slight lift, soft glow (feature parity, bug A5.2).
   */
  interactive?: boolean;
  className?: string;
};

type GlassProps<T extends ElementType> = GlassOwnProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof GlassOwnProps<T>>;

export function Glass<T extends ElementType = "div">(props: GlassProps<T>) {
  // TS can't resolve ComponentPropsWithoutRef over an unresolved generic —
  // cast internally; the caller-facing signature stays fully typed.
  const {
    as,
    variant = "card",
    interactive = false,
    className,
    ...rest
  } = props as {
    as?: ElementType;
    variant?: keyof typeof variants;
    interactive?: boolean;
    className?: string;
  } & Record<string, unknown>;
  const Component = (as ?? "div") as ElementType<
    { className?: string } & Record<string, unknown>
  >;

  return (
    <Component
      className={cn(
        "cc-glass border",
        interactive && "cc-glass-interactive",
        variants[variant],
        className,
      )}
      {...rest}
    />
  );
}
