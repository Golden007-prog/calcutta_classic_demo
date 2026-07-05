"use client";

import { Check, Share2 } from "lucide-react";
import { useState } from "react";

/**
 * Feature 55 groundwork — Web Share API with clipboard fallback.
 * WhatsApp/X deep links join the dish card in Phase 7.
 */
export function ShareButton({ title, text, path }: { title: string; text: string; path: string }) {
  const [copied, setCopied] = useState(false);

  const share = async () => {
    const url = `${window.location.origin}${path}`;
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
        return;
      } catch {
        /* dismissed — fall through to clipboard */
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <button
      type="button"
      onClick={share}
      className="tap-target inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-medium text-foreground/80 transition-colors hover:border-momo-gold hover:text-momo-gold"
    >
      {copied ? <Check size={15} aria-hidden className="text-leaf" /> : <Share2 size={15} aria-hidden />}
      {copied ? "Link copied" : "Share this dish"}
    </button>
  );
}
