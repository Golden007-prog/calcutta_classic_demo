"use client";

import { Volume2, VolumeX } from "lucide-react";

import { useMounted } from "@/lib/use-mounted";
import { playPop, useSound } from "@/stores/sound";

/** Feature 85 — footer toggle for the (off-by-default) UI sounds. */
export function SoundToggle() {
  const mounted = useMounted();
  const enabled = useSound((s) => s.enabled);
  const toggle = useSound((s) => s.toggle);

  const on = mounted && enabled;

  return (
    <button
      type="button"
      onClick={() => {
        toggle();
        if (!on) window.setTimeout(playPop, 50); // demo the pop when enabling
      }}
      aria-pressed={on}
      className="flex items-center gap-2 text-sm text-foreground/80 transition-colors hover:text-momo-gold"
    >
      {on ? <Volume2 size={16} aria-hidden className="text-momo-gold" /> : <VolumeX size={16} aria-hidden className="text-momo-gold" />}
      UI sounds: {on ? "on (sizzle responsibly)" : "off"}
    </button>
  );
}
