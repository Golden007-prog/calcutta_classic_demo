"use client";

import { Check, MessageCircle, Share2 } from "lucide-react";
import { useState } from "react";

/**
 * Feature 55 — share a dish to WhatsApp / X / IG-story with Web Share API
 * and clipboard fallbacks. Instagram has no web share intent, so we copy a
 * ready-made caption for the story instead.
 */
export function ShareRow({ title, text, path }: { title: string; text: string; path: string }) {
  const [copied, setCopied] = useState(false);
  const caption = `${title} 🥟 ${text} #CalcuttaClassics`;

  const url = () => `${window.location.origin}${path}`;

  return (
    <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Share this dish">
      <a
        href="#wa"
        onClick={(e) => {
          e.preventDefault();
          window.open(`https://wa.me/?text=${encodeURIComponent(`${caption} ${url()}`)}`, "_blank", "noopener");
        }}
        className="tap-target inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-xs font-medium hover:border-leaf hover:text-leaf"
      >
        <MessageCircle size={13} aria-hidden /> WhatsApp
      </a>
      <a
        href="#x"
        onClick={(e) => {
          e.preventDefault();
          window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(caption)}&url=${encodeURIComponent(url())}`, "_blank", "noopener");
        }}
        className="tap-target inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-xs font-medium hover:border-momo-gold hover:text-momo-gold"
      >
        𝕏
      </a>
      <button
        type="button"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(`${caption} ${url()}`);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 2000);
          } catch {
            /* ignore */
          }
        }}
        className="tap-target inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-xs font-medium hover:border-momo-gold hover:text-momo-gold"
      >
        {copied ? <Check size={13} aria-hidden className="text-leaf" /> : <Share2 size={13} aria-hidden />}
        {copied ? "Caption copied — paste in your story" : "IG story caption"}
      </button>
    </div>
  );
}

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
