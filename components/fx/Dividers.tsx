import { menuItems } from "@/data/menu";

/**
 * Feature 78 — dish-name marquee divider strip.
 * Feature 81 — animated SVG steam-curve section divider.
 * Both are decorative (aria-hidden) and transform-only.
 */

export function DishMarquee() {
  const names = menuItems.map((item) => item.name);
  const doubled = [...names, ...names];

  return (
    <div aria-hidden className="overflow-hidden border-y border-line/60 py-4">
      <div className="cc-marquee flex w-max gap-8 whitespace-nowrap motion-reduce:animate-none">
        {doubled.map((name, i) => (
          <span
            key={i}
            className="font-display text-2xl font-semibold uppercase tracking-wide text-transparent md:text-3xl"
            style={{ WebkitTextStroke: "1px var(--color-momo-gold)" }}
          >
            {name} <span className="ml-8 text-momo-gold" style={{ WebkitTextStroke: "0" }}>·</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function SteamDivider({ flip = false }: { flip?: boolean }) {
  return (
    <div aria-hidden className={`relative -my-px overflow-hidden ${flip ? "rotate-180" : ""}`}>
      <svg
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
        className="block h-14 w-full md:h-20"
      >
        <path
          d="M0,58 C180,20 320,86 520,52 C720,18 860,80 1080,48 C1240,26 1360,60 1440,44 L1440,90 L0,90 Z"
          className="fill-surface"
        />
        <g className="cc-steam-drift" opacity="0.55">
          <path d="M240,44 c-8,-14 8,-18 0,-32" stroke="var(--color-momo-gold)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M720,38 c-8,-14 8,-18 0,-32" stroke="var(--color-momo-gold)" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.7" />
          <path d="M1180,42 c-8,-14 8,-18 0,-32" stroke="var(--color-momo-gold)" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.5" />
        </g>
      </svg>
    </div>
  );
}
