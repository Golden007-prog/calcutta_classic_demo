"use client";

import { animate, useReducedMotion } from "motion/react";
import { useRef, useState } from "react";
import Link from "next/link";

import { Glass } from "@/components/ui/Glass";
import { menuItems } from "@/data/menu";
import type { MenuItem } from "@/data/types";
import { burst } from "@/lib/burst";
import { formatINR } from "@/lib/utils";
import { playSizzle } from "@/stores/sound";

/**
 * Feature 17 — Spin-the-Momo wheel with physics easing.
 * SVG wheel, 4–6 turns with a long friction tail; the pointer at 12
 * o'clock decides dinner. Fully keyboard operable, result in aria-live.
 */

const SEGMENT_COLORS = ["#E8A13A", "#D64533", "#4F7A4F", "#8a6d3b"];

export function MomoWheel() {
  const wheelRef = useRef<SVGGElement | null>(null);
  const rotationRef = useRef(0);
  const [spinning, setSpinning] = useState(false);
  const [winner, setWinner] = useState<MenuItem | null>(null);
  const reduced = useReducedMotion();

  const count = menuItems.length;
  const segmentAngle = 360 / count;

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    setWinner(null);
    playSizzle(); // feature 85 — off unless enabled in the footer

    const targetIndex = Math.floor(Math.random() * count);
    // Land the middle of the target segment under the top pointer.
    const finalAngle =
      360 * (reduced ? 1 : 4 + Math.floor(Math.random() * 3)) +
      (360 - (targetIndex * segmentAngle + segmentAngle / 2));

    const from = rotationRef.current % 360;
    const controls = animate(from, finalAngle, {
      duration: reduced ? 0.6 : 4.2,
      ease: [0.12, 0.65, 0.08, 1], // fast launch, long friction tail
      onUpdate: (v) => {
        rotationRef.current = v;
        if (wheelRef.current) {
          wheelRef.current.style.transform = `rotate(${v}deg)`;
        }
      },
      onComplete: () => {
        setSpinning(false);
        setWinner(menuItems[targetIndex]);
        if (wheelRef.current) {
          burst(wheelRef.current.closest("svg") as unknown as HTMLElement, {
            emojis: ["🥟", "✨", "🌶️"],
            count: 14,
          });
        }
      },
    });
    return () => controls.stop();
  };

  return (
    <Glass variant="panel" className="flex flex-col items-center p-6 text-center md:p-8" id="wheel">
      <p className="text-xs uppercase tracking-[0.3em] text-soft">Dinner by destiny</p>
      <h3 className="mt-1 font-display text-2xl font-semibold md:text-3xl">Spin the Momo</h3>

      <div className="relative mt-6 w-full max-w-[300px]">
        {/* pointer */}
        <div
          aria-hidden
          className="absolute -top-1 left-1/2 z-10 -translate-x-1/2 border-x-[10px] border-t-[16px] border-x-transparent border-t-chili"
        />
        <svg viewBox="-105 -105 210 210" className="w-full drop-shadow-lg" aria-hidden>
          <g ref={wheelRef} style={{ transformOrigin: "0 0" }}>
            {menuItems.map((item, i) => {
              const start = (i * segmentAngle - 90) * (Math.PI / 180);
              const end = ((i + 1) * segmentAngle - 90) * (Math.PI / 180);
              const largeArc = segmentAngle > 180 ? 1 : 0;
              const x1 = Math.cos(start) * 100;
              const y1 = Math.sin(start) * 100;
              const x2 = Math.cos(end) * 100;
              const y2 = Math.sin(end) * 100;
              const mid = (start + end) / 2;
              return (
                <g key={item.slug}>
                  <path
                    d={`M0 0 L${x1} ${y1} A100 100 0 ${largeArc} 1 ${x2} ${y2} Z`}
                    fill={SEGMENT_COLORS[i % SEGMENT_COLORS.length]}
                    stroke="#0f0f10"
                    strokeWidth="1.5"
                    opacity={0.92}
                  />
                  <text
                    x={Math.cos(mid) * 62}
                    y={Math.sin(mid) * 62}
                    fontSize="7"
                    fill="#0f0f10"
                    fontWeight="700"
                    textAnchor="middle"
                    transform={`rotate(${(mid * 180) / Math.PI + 90} ${Math.cos(mid) * 62} ${Math.sin(mid) * 62})`}
                  >
                    {item.name.length > 14 ? item.name.slice(0, 13) + "…" : item.name}
                  </text>
                </g>
              );
            })}
            <circle r="14" fill="#0f0f10" stroke="#E8A13A" strokeWidth="3" />
            <text y="4" fontSize="11" textAnchor="middle" aria-hidden>🥟</text>
          </g>
        </svg>
      </div>

      <button
        type="button"
        onClick={spin}
        disabled={spinning}
        className="tap-target mt-6 inline-flex items-center gap-2 rounded-full bg-momo-gold px-8 py-3 text-sm font-semibold text-charcoal transition-colors hover:bg-momo-gold/90 disabled:cursor-wait disabled:opacity-60"
      >
        {spinning ? "Steaming the odds…" : winner ? "Spin again" : "Spin the wheel"}
      </button>

      <div aria-live="polite" className="mt-4 min-h-12">
        {winner && (
          <p className="text-sm">
            The wheel has spoken:{" "}
            <Link href={`/menu/${winner.slug}`} className="font-display font-semibold text-momo-gold underline-offset-4 hover:underline">
              {winner.name}
            </Link>{" "}
            {winner.price !== null && <span className="text-soft">· {formatINR(winner.price)}</span>}
            <span className="block text-xs text-soft">No re-spins on an empty stomach. (Fine, one.)</span>
          </p>
        )}
      </div>
    </Glass>
  );
}
