"use client";

import { Check, Mail } from "lucide-react";
import { useState } from "react";

/**
 * Feature 58 — newsletter capture. Emails queue into localStorage until
 * the Supabase table goes live behind NEXT_PUBLIC_ENABLE_AUTH (the switch
 * point is documented in AUTH_TODO.md); the form contract won't change.
 */
export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("That email looks undercooked — one more try?");
      return;
    }
    try {
      const queue: string[] = JSON.parse(localStorage.getItem("cc-newsletter-queue") ?? "[]");
      if (!queue.includes(email)) queue.push(email);
      localStorage.setItem("cc-newsletter-queue", JSON.stringify(queue));
    } catch {
      /* private mode — still show success, nothing else to do */
    }
    setError(null);
    setDone(true);
  };

  if (done) {
    return (
      <p className="flex items-center gap-2 text-sm text-leaf" role="status">
        <Check size={15} aria-hidden />
        You&apos;re on the list — steam news incoming.
      </p>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-2">
      <label htmlFor="newsletter-email" className="block text-sm text-foreground/80">
        Momo drops & festival specials — no spam, we&apos;re busy steaming.
      </label>
      <div className="flex gap-2">
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="h-11 min-w-0 flex-1 rounded-full border border-line bg-background px-4 text-sm outline-none placeholder:text-soft focus:border-momo-gold"
        />
        <button
          type="submit"
          aria-label="Subscribe"
          className="tap-target inline-flex shrink-0 items-center justify-center rounded-full bg-momo-gold px-4 text-charcoal transition-colors hover:bg-momo-gold/90"
        >
          <Mail size={16} aria-hidden />
        </button>
      </div>
      {error && (
        <p className="text-xs text-chili" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
