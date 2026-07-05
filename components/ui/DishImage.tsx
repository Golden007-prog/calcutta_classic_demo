"use client";

import Image from "next/image";
import { useState } from "react";

import { generatedImages } from "@/data/images.generated";
import { cn } from "@/lib/utils";

/**
 * Single image entry-point for dishes/combos/mood shots (feature 93).
 * Renders next/image (AVIF/WebP via the optimizer, blur placeholder from
 * the sharp pipeline) when the asset exists in the generated manifest,
 * and an intentional gradient+grain placeholder otherwise — the site must
 * look designed even with zero photos (spec §5).
 */

const PLACEHOLDER_GRADIENTS = [
  "from-momo-gold/40 via-chili/25 to-charcoal",
  "from-chili/35 via-momo-gold/20 to-charcoal",
  "from-leaf/35 via-momo-gold/20 to-charcoal",
];

function hashIndex(text: string, mod: number): number {
  let h = 0;
  for (let i = 0; i < text.length; i++) h = (h * 31 + text.charCodeAt(i)) % 997;
  return h % mod;
}

interface DishImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Placeholder label (dish name); first letter becomes the monogram. */
  label?: string;
  /** view-transition-name for card→page image morphs (feature 79). */
  transitionName?: string;
}

export function DishImage({
  src,
  alt,
  className,
  sizes = "(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 400px",
  priority = false,
  label,
  transitionName,
}: DishImageProps) {
  const entry = generatedImages[src];
  // Feature 84 — branded shimmer behind every image until it paints.
  const [loaded, setLoaded] = useState(false);

  const style = transitionName
    ? ({ viewTransitionName: transitionName } as React.CSSProperties)
    : undefined;

  if (!entry) {
    const gradient =
      PLACEHOLDER_GRADIENTS[hashIndex(src, PLACEHOLDER_GRADIENTS.length)];
    return (
      <div
        role="img"
        aria-label={alt}
        style={style}
        className={cn(
          "grain relative flex items-center justify-center overflow-hidden bg-gradient-to-br",
          gradient,
          className,
        )}
      >
        {label && (
          <span
            aria-hidden
            className="font-display text-5xl font-semibold text-cream/25"
          >
            {label.charAt(0)}
          </span>
        )}
      </div>
    );
  }

  return (
    <div
      style={style}
      className={cn(
        "relative overflow-hidden",
        !loaded && "shimmer bg-foreground/[0.06]",
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        fetchPriority={priority ? "high" : undefined}
        quality={70}
        placeholder="blur"
        blurDataURL={entry.blurDataURL}
        onLoad={() => setLoaded(true)}
        className="object-cover"
      />
    </div>
  );
}
