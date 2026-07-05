"use client";

import { MessageCircle } from "lucide-react";
import { usePathname } from "next/navigation";

import { site } from "@/data/site";

/**
 * Feature 59 — floating WhatsApp click-to-chat glass button.
 * Renders disabled-with-hint while the number is TBD; hidden on routes
 * where it would fight the bottom tab bar's Visit CTA is fine — kept
 * above the tab bar on mobile.
 */
export function WhatsAppFloat() {
  const pathname = usePathname();
  if (pathname.startsWith("/auth")) return null;

  const message = encodeURIComponent(
    "Hi Calcutta Classics! 🥟 I found you through the website —",
  );

  if (!site.contact.whatsapp) {
    return (
      <div
        title="WhatsApp number coming soon"
        className="fixed bottom-24 right-4 z-40 hidden select-none items-center justify-center rounded-full border border-line bg-surface/80 p-3.5 text-soft opacity-70 backdrop-blur-xl md:bottom-6 md:flex"
        aria-hidden
      >
        <MessageCircle size={22} />
      </div>
    );
  }

  return (
    <a
      href={`https://wa.me/${site.contact.whatsapp.replace(/\D/g, "")}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-24 right-4 z-40 flex items-center justify-center rounded-full border border-leaf/40 bg-leaf/90 p-3.5 text-cream shadow-lg backdrop-blur-xl transition-transform hover:scale-105 motion-reduce:transition-none md:bottom-6"
    >
      <MessageCircle size={22} aria-hidden />
    </a>
  );
}
