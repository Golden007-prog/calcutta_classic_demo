"use client";

import { Heart } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

import { useFavorites } from "@/stores/favorites";
import { cn } from "@/lib/utils";

/**
 * Feature 33 — heart with a spring pop (particle burst joins in Phase 8).
 * Renders neutral until mounted so localStorage state never mismatches SSR.
 */
export function FavoriteButton({
  slug,
  name,
  className,
}: {
  slug: string;
  name: string;
  className?: string;
}) {
  const [mounted, setMounted] = useState(false);
  const slugs = useFavorites((s) => s.slugs);
  const toggle = useFavorites((s) => s.toggle);
  const reduced = useReducedMotion();

  useEffect(() => setMounted(true), []);

  const isFavorite = mounted && slugs.includes(slug);

  return (
    <motion.button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(slug);
      }}
      whileTap={reduced ? undefined : { scale: 0.8 }}
      animate={isFavorite && !reduced ? { scale: [1, 1.35, 1] } : undefined}
      transition={{ duration: 0.35, ease: "easeOut" }}
      aria-pressed={isFavorite}
      aria-label={isFavorite ? `Remove ${name} from favorites` : `Add ${name} to favorites`}
      className={cn(
        "tap-target inline-flex items-center justify-center rounded-full bg-charcoal/40 backdrop-blur-sm transition-colors",
        isFavorite ? "text-chili" : "text-cream/80 hover:text-chili",
        className,
      )}
    >
      <Heart size={18} aria-hidden className={isFavorite ? "fill-chili" : undefined} />
    </motion.button>
  );
}
