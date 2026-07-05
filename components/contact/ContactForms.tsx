"use client";

import { Check, Copy, MessageCircle, PartyPopper, Send } from "lucide-react";
import { useState } from "react";

import { Glass } from "@/components/ui/Glass";
import { site } from "@/data/site";

/**
 * Features 61 + 62 + 63 — visit composer, catering inquiry, feedback.
 * No backend: everything composes a WhatsApp deep link when the number
 * exists, else copies the composed message to the clipboard.
 */

function useComposer() {
  const [copied, setCopied] = useState(false);

  const send = async (message: string) => {
    const number = site.contact.whatsapp?.replace(/\D/g, "");
    if (number) {
      window.open(`https://wa.me/${number}?text=${encodeURIComponent(message)}`, "_blank", "noopener");
      return;
    }
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      /* clipboard unavailable */
    }
  };

  return { send, copied, hasWhatsApp: Boolean(site.contact.whatsapp) };
}

/* ── Feature 61: table/visit request composer ───────────────────── */

export function VisitComposer() {
  const { send, copied, hasWhatsApp } = useComposer();
  const [people, setPeople] = useState(2);
  const [when, setWhen] = useState("this evening");

  const message = `Hi Calcutta Classics! 🥟 We're ${people} people planning to drop by ${when}. Keep the steamer ready?`;

  return (
    <Glass variant="panel" className="p-6">
      <p className="flex items-center gap-2 font-display text-xl font-semibold">
        <MessageCircle size={18} aria-hidden className="text-momo-gold" />
        Coming over?
      </p>
      <p className="mt-1 text-sm text-soft">
        Compose a heads-up — nice for groups of 4+, essential for groups of 8+.
      </p>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <label className="text-sm">
          How many of you?
          <input
            type="number"
            min={1}
            max={20}
            value={people}
            onChange={(e) => setPeople(Number(e.target.value))}
            className="mt-1 h-11 w-full rounded-full border border-line bg-background px-4 outline-none focus:border-momo-gold"
          />
        </label>
        <label className="text-sm">
          When?
          <select
            value={when}
            onChange={(e) => setWhen(e.target.value)}
            className="mt-1 h-11 w-full rounded-full border border-line bg-background px-4 outline-none focus:border-momo-gold"
          >
            <option>this afternoon</option>
            <option>this evening</option>
            <option>tomorrow evening</option>
            <option>this weekend</option>
          </select>
        </label>
      </div>

      <p className="mt-3 rounded-2xl bg-surface px-4 py-3 text-sm italic text-soft">“{message}”</p>

      <button
        type="button"
        onClick={() => send(message)}
        className="tap-target mt-4 inline-flex items-center gap-2 rounded-full bg-momo-gold px-6 py-3 text-sm font-semibold text-on-gold hover:bg-momo-gold/90"
      >
        {copied ? <Check size={15} aria-hidden /> : <Send size={15} aria-hidden />}
        {hasWhatsApp ? "Send on WhatsApp" : copied ? "Copied — paste it when we get WhatsApp!" : "Copy message"}
      </button>
      {!hasWhatsApp && (
        <p className="mt-2 text-xs text-soft">
          WhatsApp number coming soon — until then the fastest RSVP is walking in.
        </p>
      )}
    </Glass>
  );
}

/* ── Feature 62: catering / party inquiry ───────────────────────── */

export function CateringInquiry() {
  const { send, copied, hasWhatsApp } = useComposer();
  const [event, setEvent] = useState("birthday adda");
  const [guests, setGuests] = useState(20);
  const [notes, setNotes] = useState("");

  const message = `Hi Calcutta Classics! 🎉 Catering inquiry: ${event}, ~${guests} guests.${notes ? ` Notes: ${notes}` : ""} What can you steam up for us?`;

  return (
    <Glass variant="panel" className="p-6">
      <p className="flex items-center gap-2 font-display text-xl font-semibold">
        <PartyPopper size={18} aria-hidden className="text-momo-gold" />
        Catering & party boxes
      </p>
      <p className="mt-1 text-sm text-soft">
        Momo towers for birthdays, fish fry for the in-laws — tell us the occasion.
      </p>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <label className="text-sm">
          Occasion
          <select
            value={event}
            onChange={(e) => setEvent(e.target.value)}
            className="mt-1 h-11 w-full rounded-full border border-line bg-background px-4 outline-none focus:border-momo-gold"
          >
            <option>birthday adda</option>
            <option>office party</option>
            <option>para function</option>
            <option>wedding side-counter</option>
            <option>something else entirely</option>
          </select>
        </label>
        <label className="text-sm">
          Guests (approx.)
          <input
            type="number"
            min={5}
            max={500}
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="mt-1 h-11 w-full rounded-full border border-line bg-background px-4 outline-none focus:border-momo-gold"
          />
        </label>
      </div>
      <label className="mt-3 block text-sm">
        Anything else?
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={2}
          placeholder="veg-heavy, extra chutney, momo tower non-negotiable…"
          className="mt-1 w-full rounded-2xl border border-line bg-background px-4 py-3 outline-none placeholder:text-soft focus:border-momo-gold"
        />
      </label>

      <button
        type="button"
        onClick={() => send(message)}
        className="tap-target mt-4 inline-flex items-center gap-2 rounded-full bg-momo-gold px-6 py-3 text-sm font-semibold text-on-gold hover:bg-momo-gold/90"
      >
        {copied ? <Check size={15} aria-hidden /> : <Send size={15} aria-hidden />}
        {hasWhatsApp ? "Send inquiry" : copied ? "Copied!" : "Copy inquiry"}
      </button>
    </Glass>
  );
}

/* ── Feature 63: feedback with emoji scale ──────────────────────── */

const MOODS = [
  { emoji: "😞", label: "Not great" },
  { emoji: "😐", label: "Okay" },
  { emoji: "🙂", label: "Good" },
  { emoji: "😋", label: "Great" },
  { emoji: "🤯", label: "Life-changing" },
] as const;

export function FeedbackForm() {
  const [mood, setMood] = useState<number | null>(null);
  const [text, setText] = useState("");
  const [sent, setSent] = useState(false);
  const { send, hasWhatsApp } = useComposer();

  const submit = () => {
    if (mood === null) return;
    try {
      const log = JSON.parse(localStorage.getItem("cc-feedback") ?? "[]");
      log.push({ mood: MOODS[mood].label, text, at: new Date().toISOString() });
      localStorage.setItem("cc-feedback", JSON.stringify(log));
    } catch {
      /* ignore */
    }
    if (hasWhatsApp && (mood <= 1 || text)) {
      send(`Feedback for Calcutta Classics: ${MOODS[mood].emoji} ${MOODS[mood].label}. ${text}`);
    }
    setSent(true);
  };

  if (sent) {
    return (
      <Glass variant="panel" className="p-6 text-center">
        <p className="text-3xl" aria-hidden>🙏</p>
        <p className="mt-2 font-display text-xl font-semibold">Thank you!</p>
        <p className="mt-1 text-sm text-soft">
          Feedback logged. If it was the spice — we did warn you (lovingly).
        </p>
      </Glass>
    );
  }

  return (
    <Glass variant="panel" className="p-6">
      <p className="font-display text-xl font-semibold">How was your last visit?</p>
      <div role="radiogroup" aria-label="Rate your visit" className="mt-4 flex justify-between gap-1 sm:justify-start sm:gap-3">
        {MOODS.map((m, i) => (
          <button
            key={m.label}
            type="button"
            role="radio"
            aria-checked={mood === i}
            aria-label={m.label}
            onClick={() => setMood(i)}
            className={`tap-target rounded-2xl border px-3 py-2 text-2xl transition-all ${
              mood === i ? "scale-110 border-momo-gold bg-momo-gold/15" : "border-line hover:border-momo-gold/50"
            }`}
          >
            {m.emoji}
          </button>
        ))}
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={3}
        placeholder="Optional: what should we steam, fix, or never ever change?"
        className="mt-4 w-full rounded-2xl border border-line bg-background px-4 py-3 text-sm outline-none placeholder:text-soft focus:border-momo-gold"
      />
      <button
        type="button"
        onClick={submit}
        disabled={mood === null}
        className="tap-target mt-3 inline-flex items-center gap-2 rounded-full bg-momo-gold px-6 py-3 text-sm font-semibold text-on-gold hover:bg-momo-gold/90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Send size={15} aria-hidden />
        Send feedback
      </button>
    </Glass>
  );
}

/* Small copy-caption helper reused by the gallery UGC block. */
export function CopyLine({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          window.setTimeout(() => setCopied(false), 2000);
        } catch {
          /* ignore */
        }
      }}
      className="tap-target inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm hover:border-momo-gold hover:text-momo-gold"
    >
      {copied ? <Check size={14} aria-hidden className="text-leaf" /> : <Copy size={14} aria-hidden />}
      {copied ? "Copied!" : label}
    </button>
  );
}
