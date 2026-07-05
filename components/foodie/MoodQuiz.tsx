"use client";

import { Download, RotateCcw, Share2 } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useRef, useState } from "react";

import { DishImage } from "@/components/ui/DishImage";
import { Glass } from "@/components/ui/Glass";
import { site } from "@/data/site";
import type { MenuItem } from "@/data/types";
import { burst } from "@/lib/burst";
import { rankItems, type Traits } from "@/lib/recommend";
import { formatINR } from "@/lib/utils";

/**
 * Feature 16 — "What Should I Eat?" mood quiz → dish recommendation.
 * Feature 22 — shareable "My Foodie Personality" canvas card.
 */

interface Question {
  prompt: string;
  options: Array<{ label: string; traits: Partial<Traits> }>;
}

const QUESTIONS: Question[] = [
  {
    prompt: "How's the day going?",
    options: [
      { label: "Monday, existentially", traits: { comfort: 1, saucy: 0.4 } },
      { label: "Won a small argument", traits: { spicy: 0.7, crunchy: 0.5 } },
      { label: "Rain outside, nowhere to be", traits: { comfort: 0.8, saucy: 0.6 } },
      { label: "Payday energy", traits: { cheesy: 0.8, crunchy: 0.6 } },
    ],
  },
  {
    prompt: "Pick a texture love language:",
    options: [
      { label: "Soft & steamy", traits: { comfort: 0.7, saucy: 0.5 } },
      { label: "Crack-on-first-bite", traits: { crunchy: 1 } },
      { label: "Molten & stretchy", traits: { cheesy: 1 } },
      { label: "Drenched in sauce", traits: { saucy: 1 } },
    ],
  },
  {
    prompt: "Spice honesty check:",
    options: [
      { label: "ঝাল কম please", traits: { spicy: 0 } },
      { label: "Medium is a personality", traits: { spicy: 0.5 } },
      { label: "Peri peri me", traits: { spicy: 1 } },
    ],
  },
  {
    prompt: "Who's eating?",
    options: [
      { label: "Just me & my thoughts", traits: { comfort: 0.6 } },
      { label: "Me + the adda", traits: { crunchy: 0.5, cheesy: 0.4 } },
      { label: "Impressing someone", traits: { cheesy: 0.6, crunchy: 0.4 } },
    ],
  },
];

const PERSONALITIES: Array<{ key: keyof Traits; title: string; emoji: string; line: string }> = [
  { key: "cheesy", title: "The Cheese Romantic", emoji: "🧀", line: "believes every problem melts at the right temperature" },
  { key: "spicy", title: "The Fire Walker", emoji: "🌶️", line: "orders peri peri, asks for extra, blames the weather for tears" },
  { key: "crunchy", title: "The Crunch Commander", emoji: "✨", line: "judges food by decibels, correctly" },
  { key: "saucy", title: "The Chutney Loyalist", emoji: "🥣", line: "knows the dip is the main character" },
  { key: "comfort", title: "The Steam Seeker", emoji: "🥟", line: "has a personal relationship with the 5 PM basket" },
];

export function MoodQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Array<Partial<Traits>>>([]);
  const [result, setResult] = useState<{ item: MenuItem; personality: (typeof PERSONALITIES)[number] } | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [cardUrl, setCardUrl] = useState<string | null>(null);
  const reduced = useReducedMotion();

  const answer = (traits: Partial<Traits>) => {
    const next = [...answers, traits];
    if (next.length < QUESTIONS.length) {
      setAnswers(next);
      setStep(step + 1);
      return;
    }

    // Aggregate the trait profile.
    const want: Traits = { cheesy: 0, spicy: 0, crunchy: 0, saucy: 0, comfort: 0 };
    for (const a of next) {
      for (const [k, v] of Object.entries(a) as Array<[keyof Traits, number]>) {
        want[k] = Math.min(1, want[k] + v / 2);
      }
    }

    const [top] = rankItems(want, 1);
    const dominant = (Object.entries(want) as Array<[keyof Traits, number]>).sort((a, b) => b[1] - a[1])[0][0];
    const personality = PERSONALITIES.find((p) => p.key === dominant) ?? PERSONALITIES[4];

    setAnswers(next);
    setResult({ item: top, personality });
    drawCard(personality, top);
    if (canvasRef.current?.parentElement) {
      burst(canvasRef.current.parentElement, {
        emojis: [personality.emoji, "✨"],
        count: 12,
      });
    }
  };

  /** Feature 22 — canvas-generated shareable card. */
  const drawCard = (personality: (typeof PERSONALITIES)[number], item: MenuItem) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = (canvas.width = 1080);
    const H = (canvas.height = 1350);

    const bg = ctx.createLinearGradient(0, 0, W, H);
    bg.addColorStop(0, "#0f0f10");
    bg.addColorStop(1, "#1f1408");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    ctx.strokeStyle = "#e8a13a";
    ctx.lineWidth = 10;
    ctx.strokeRect(40, 40, W - 80, H - 80);

    ctx.textAlign = "center";
    ctx.fillStyle = "#f6f1e7";
    ctx.font = "56px Georgia, serif";
    ctx.fillText("My Foodie Personality", W / 2, 220);

    ctx.font = "220px serif";
    ctx.fillText(personality.emoji, W / 2, 560);

    ctx.fillStyle = "#e8a13a";
    ctx.font = "bold 88px Georgia, serif";
    ctx.fillText(personality.title, W / 2, 730);

    ctx.fillStyle = "#f6f1e7";
    ctx.font = "42px Georgia, serif";
    wrapText(ctx, `…${personality.line}`, W / 2, 820, 840, 56);

    ctx.fillStyle = "#e8a13a";
    ctx.font = "bold 52px Georgia, serif";
    ctx.fillText(`Destiny dish: ${item.name}`, W / 2, 1060);

    ctx.fillStyle = "#f6f1e7";
    ctx.font = "40px Georgia, serif";
    ctx.fillText(`${site.instagram.handle} · ${site.hashtag}`, W / 2, 1200);

    setCardUrl(canvas.toDataURL("image/png"));
  };

  const shareCard = async () => {
    if (!cardUrl || !result) return;
    const blob = await (await fetch(cardUrl)).blob();
    const file = new File([blob], "my-foodie-personality.png", { type: "image/png" });
    if (navigator.canShare?.({ files: [file] })) {
      try {
        await navigator.share({
          files: [file],
          title: result.personality.title,
          text: `I'm ${result.personality.title} — destiny dish: ${result.item.name} 🥟 ${site.hashtag}`,
        });
      } catch {
        /* dismissed */
      }
    }
  };

  const reset = () => {
    setStep(0);
    setAnswers([]);
    setResult(null);
    setCardUrl(null);
  };

  return (
    <Glass variant="panel" className="p-6 md:p-8" id="quiz">
      <canvas ref={canvasRef} className="hidden" aria-hidden />
      <p className="text-xs uppercase tracking-[0.3em] text-soft">Feature attraction</p>
      <h3 className="mt-1 font-display text-2xl font-semibold md:text-3xl">
        What should I eat?
      </h3>

      {!result ? (
        <div aria-live="polite">
          <div className="mt-4 flex items-center gap-2" aria-hidden>
            {QUESTIONS.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 flex-1 rounded-full ${i <= step ? "bg-momo-gold" : "bg-line"}`}
              />
            ))}
          </div>

          <motion.div
            key={step}
            initial={reduced ? { opacity: 0 } : { opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="mt-5 font-medium">{QUESTIONS[step].prompt}</p>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {QUESTIONS[step].options.map((option) => (
                <button
                  key={option.label}
                  type="button"
                  onClick={() => answer(option.traits)}
                  className="tap-target rounded-2xl border border-line px-4 py-3 text-left text-sm transition-colors hover:border-momo-gold hover:text-momo-gold"
                >
                  {option.label}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      ) : (
        <motion.div
          initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5"
          aria-live="polite"
        >
          <div className="flex flex-col gap-5 sm:flex-row">
            <DishImage
              src={result.item.image}
              alt={result.item.name}
              label={result.item.name}
              className="aspect-[4/3] w-full rounded-2xl sm:w-56"
              sizes="(max-width: 640px) 90vw, 224px"
            />
            <div>
              <p className="text-4xl" aria-hidden>{result.personality.emoji}</p>
              <p className="mt-1 font-display text-xl font-semibold text-momo-gold">
                {result.personality.title}
              </p>
              <p className="text-sm text-soft">…{result.personality.line}.</p>
              <p className="mt-3 text-sm">
                Destiny dish:{" "}
                <a href={`/menu/${result.item.slug}`} className="font-semibold text-momo-gold underline-offset-4 hover:underline">
                  {result.item.name}
                </a>{" "}
                {result.item.price !== null && <span className="text-soft">· {formatINR(result.item.price)}</span>}
              </p>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {cardUrl && (
              <>
                <a
                  href={cardUrl}
                  download="my-foodie-personality.png"
                  className="tap-target inline-flex items-center gap-2 rounded-full bg-momo-gold px-5 py-2.5 text-sm font-semibold text-on-gold hover:bg-momo-gold/90"
                >
                  <Download size={15} aria-hidden /> Save my card
                </a>
                <button
                  type="button"
                  onClick={shareCard}
                  className="tap-target inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-medium hover:border-momo-gold hover:text-momo-gold"
                >
                  <Share2 size={15} aria-hidden /> Share
                </button>
              </>
            )}
            <button
              type="button"
              onClick={reset}
              className="tap-target inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm text-foreground/70 hover:text-momo-gold"
            >
              <RotateCcw size={15} aria-hidden /> Retake
            </button>
          </div>
        </motion.div>
      )}
    </Glass>
  );
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
) {
  const words = text.split(" ");
  let line = "";
  let cy = y;
  for (const word of words) {
    const test = line + word + " ";
    if (ctx.measureText(test).width > maxWidth && line) {
      ctx.fillText(line.trim(), x, cy);
      line = word + " ";
      cy += lineHeight;
    } else {
      line = test;
    }
  }
  ctx.fillText(line.trim(), x, cy);
}
