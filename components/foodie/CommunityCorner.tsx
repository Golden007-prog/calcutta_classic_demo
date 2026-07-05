"use client";

import { Award, Check, Download } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { Glass } from "@/components/ui/Glass";
import { pollOptions, seededVotes, type PollOptionId } from "@/data/community";
import { menuItems } from "@/data/menu";
import { site } from "@/data/site";
import { useMounted } from "@/lib/use-mounted";
import { pluralize } from "@/lib/utils";
import { create } from "zustand";
import { persist } from "zustand/middleware";

/* ── Feature 56: Combo Explorer badge system ────────────────────── */

interface TriedState {
  tried: string[];
  toggle: (slug: string) => void;
}

const useTried = create<TriedState>()(
  persist(
    (set) => ({
      tried: [],
      toggle: (slug) =>
        set((s) => ({
          tried: s.tried.includes(slug) ? s.tried.filter((x) => x !== slug) : [...s.tried, slug],
        })),
    }),
    { name: "cc-tried" },
  ),
);

const BADGES = [
  { need: 1, name: "First Steam", emoji: "🥟" },
  { need: 5, name: "Para Regular", emoji: "🏘️" },
  { need: 9, name: "Menu Scholar", emoji: "📜" },
  { need: 13, name: "Full Menu Legend", emoji: "👑" },
];

export function BadgeBoard() {
  const mounted = useMounted();
  const tried = useTried((s) => s.tried);
  const toggle = useTried((s) => s.toggle);

  const count = mounted ? tried.length : 0;

  return (
    <Glass variant="panel" className="p-6 md:p-8" id="badges">
      <p className="text-xs uppercase tracking-[0.3em] text-soft">Honor system, obviously</p>
      <h3 className="mt-1 font-display text-2xl font-semibold md:text-3xl">
        Combo Explorer badges
      </h3>
      <p className="mt-2 text-sm text-soft">
        Tick off what you&apos;ve tried ({count}/{menuItems.length}). We can&apos;t verify any of
        this and we choose to trust you.
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {menuItems.map((item) => {
          const done = mounted && tried.includes(item.slug);
          return (
            <button
              key={item.slug}
              type="button"
              onClick={() => toggle(item.slug)}
              aria-pressed={done}
              className={`tap-target inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
                done
                  ? "border-leaf bg-leaf/20 text-leaf-soft"
                  : "border-line text-foreground/75 hover:border-momo-gold/50"
              }`}
            >
              {done && <Check size={13} aria-hidden />}
              {item.name}
            </button>
          );
        })}
      </div>

      <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {BADGES.map((badge) => {
          const earned = count >= badge.need;
          return (
            <li
              key={badge.name}
              className={`rounded-2xl border p-3 text-center ${
                earned ? "border-momo-gold bg-momo-gold/10" : "border-line grayscale"
              }`}
              aria-label={`${badge.name}: ${earned ? "earned" : `try ${pluralize(badge.need, "dish", "dishes")}`}`}
            >
              <p className="text-2xl" aria-hidden>{badge.emoji}</p>
              <p className="mt-1 text-xs font-semibold">{badge.name}</p>
              <p className="text-[10px] text-soft">
                {earned ? "earned!" : `${badge.need} ${pluralize(badge.need, "dish", "dishes")}`}
              </p>
            </li>
          );
        })}
      </ul>
    </Glass>
  );
}

/* ── Feature 64: vote the next menu item ────────────────────────── */

export function NextItemPoll() {
  const [voted, setVoted] = useState<PollOptionId | null>(null);
  const mounted = useMounted();
  const reduced = useReducedMotion();

  useEffect(() => {
    try {
      const stored = localStorage.getItem("cc-poll-vote") as PollOptionId | null;
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-shot restore of the persisted vote; localStorage only exists on the client
      if (stored) setVoted(stored);
    } catch {
      /* ignore */
    }
  }, []);

  const vote = (id: PollOptionId) => {
    setVoted(id);
    try {
      localStorage.setItem("cc-poll-vote", id);
    } catch {
      /* ignore */
    }
  };

  const totals = pollOptions.map((option) => ({
    ...option,
    votes: seededVotes[option.id] + (voted === option.id ? 1 : 0),
  }));
  const grandTotal = totals.reduce((sum, o) => sum + o.votes, 0);

  return (
    <Glass variant="panel" className="p-6 md:p-8" id="poll">
      <p className="text-xs uppercase tracking-[0.3em] text-soft">Democracy, but delicious</p>
      <h3 className="mt-1 font-display text-2xl font-semibold md:text-3xl">
        Vote the next menu item
      </h3>

      <div className="mt-5 space-y-3" aria-live="polite">
        {totals.map((option) => {
          const pct = Math.round((option.votes / grandTotal) * 100);
          const chosen = voted === option.id;
          return (
            <button
              key={option.id}
              type="button"
              disabled={voted !== null && !chosen}
              onClick={() => vote(option.id)}
              aria-pressed={chosen}
              className={`relative block w-full overflow-hidden rounded-2xl border p-3 text-left transition-colors ${
                chosen ? "border-momo-gold" : "border-line hover:border-momo-gold/50"
              } disabled:cursor-default`}
            >
              {mounted && voted && (
                <motion.span
                  aria-hidden
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: reduced ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-y-0 left-0 bg-momo-gold/15"
                />
              )}
              <span className="relative flex items-center justify-between text-sm">
                <span>
                  <span aria-hidden className="mr-2">{option.emoji}</span>
                  {option.label}
                  {chosen && <span className="ml-2 text-xs text-momo-gold">your vote</span>}
                </span>
                {voted && <span className="tabular-nums text-soft">{pct}%</span>}
              </span>
            </button>
          );
        })}
      </div>
      <p className="mt-3 text-xs text-soft">
        {voted ? "Counted! The kitchen watches this poll nervously." : "One vote per foodie — choose with your stomach."}
      </p>
    </Glass>
  );
}

/* ── Feature 65: refer-a-friend invite card ─────────────────────── */

export function ReferCard() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [name, setName] = useState("");
  const [cardUrl, setCardUrl] = useState<string | null>(null);

  const generate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = (canvas.width = 1080);
    const H = (canvas.height = 1080);

    const bg = ctx.createLinearGradient(0, 0, W, H);
    bg.addColorStop(0, "#0f0f10");
    bg.addColorStop(1, "#241505");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = "#e8a13a";
    ctx.lineWidth = 8;
    ctx.strokeRect(36, 36, W - 72, H - 72);

    ctx.textAlign = "center";
    ctx.font = "150px serif";
    ctx.fillText("🥟", W / 2, 300);

    ctx.fillStyle = "#f6f1e7";
    ctx.font = "48px Georgia, serif";
    ctx.fillText("You've been invited to", W / 2, 420);

    ctx.fillStyle = "#e8a13a";
    ctx.font = "bold 76px Georgia, serif";
    ctx.fillText("The Calcutta Classics", W / 2, 520);

    ctx.fillStyle = "#f6f1e7";
    ctx.font = "44px Georgia, serif";
    ctx.fillText(`by ${name.trim() || "a friend with taste"}`, W / 2, 610);

    ctx.font = "38px Georgia, serif";
    ctx.fillStyle = "#b5aea0";
    ctx.fillText("Momos · Fish Fry · the ₹20 Belgian Coffee", W / 2, 720);
    ctx.fillText("Opposite Deshbandhu Park, Shyambazar", W / 2, 780);

    ctx.fillStyle = "#e8a13a";
    ctx.font = "bold 40px Georgia, serif";
    ctx.fillText(`${site.instagram.handle}`, W / 2, 900);

    setCardUrl(canvas.toDataURL("image/png"));
  };

  return (
    <Glass variant="panel" className="p-6 md:p-8" id="refer">
      <canvas ref={canvasRef} className="hidden" aria-hidden />
      <p className="text-xs uppercase tracking-[0.3em] text-soft">Spread the steam</p>
      <h3 className="mt-1 font-display text-2xl font-semibold md:text-3xl">Refer a friend</h3>
      <p className="mt-2 text-sm text-soft">
        Generate a personal invite card, send it to the hungriest person you
        know, accept their gratitude later.
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name (goes on the card)"
          maxLength={24}
          aria-label="Your name for the invite card"
          className="h-11 min-w-0 flex-1 rounded-full border border-line bg-background px-4 text-sm outline-none placeholder:text-soft focus:border-momo-gold"
        />
        <button
          type="button"
          onClick={generate}
          className="tap-target inline-flex items-center gap-2 rounded-full bg-momo-gold px-5 py-2.5 text-sm font-semibold text-on-gold hover:bg-momo-gold/90"
        >
          <Award size={15} aria-hidden />
          Make my card
        </button>
      </div>

      {cardUrl && (
        <div className="mt-4 flex flex-wrap items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element -- data URL preview of a generated canvas */}
          <img src={cardUrl} alt="Your invite card preview" className="w-40 rounded-xl border border-line" />
          <a
            href={cardUrl}
            download="calcutta-classics-invite.png"
            className="tap-target inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-medium hover:border-momo-gold hover:text-momo-gold"
          >
            <Download size={15} aria-hidden />
            Download & send
          </a>
        </div>
      )}
    </Glass>
  );
}
