/**
 * Feature 83 — light animated SVG category icons. The steam/sparkle
 * strokes animate via the shared .cc-steam keyframes when active.
 */
export function CategoryIcon({
  category,
  active,
}: {
  category: string;
  active: boolean;
}) {
  const steamClass = active ? "cc-steam" : "opacity-0";
  const common = {
    width: 16,
    height: 16,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (category) {
    case "momos":
      return (
        <svg {...common}>
          <path d="M4 16c0-4.4 3.6-8 8-8s8 3.6 8 8" />
          <line x1="3" y1="16" x2="21" y2="16" />
          <path className={steamClass} d="M9 6c-1-1.4 1-2 0-3.5" />
          <path className={steamClass} d="M15 6c-1-1.4 1-2 0-3.5" style={{ animationDelay: ".3s" }} />
        </svg>
      );
    case "chaat-snacks":
      return (
        <svg {...common}>
          <path d="M4 11h16l-2 7a2 2 0 0 1-2 1.5H8A2 2 0 0 1 6 18z" />
          <path className={steamClass} d="M12 8c-1-1.4 1-2 0-3.5" />
          <circle cx="9" cy="11" r="0.5" />
          <circle cx="14" cy="11" r="0.5" />
        </svg>
      );
    case "fried-loaded":
      return (
        <svg {...common}>
          <path d="M3 12h18l-1.5 3a3 3 0 0 1-2.7 1.8H7.2A3 3 0 0 1 4.5 15z" />
          <path d="M7 12V9m5 3V8m5 4V9" />
          <path className={steamClass} d="M12 5c-1-1.2 1-1.8 0-3" />
        </svg>
      );
    case "combos":
      return (
        <svg {...common}>
          <rect x="4" y="8" width="16" height="12" rx="2" />
          <path d="M4 12h16M12 8v12" />
          <path className={steamClass} d="M12 5c-1-1.2 1-1.8 0-3" />
        </svg>
      );
    case "beverages":
      return (
        <svg {...common}>
          <path d="M6 9h11v7a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4z" />
          <path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17" />
          <path className={steamClass} d="M10 6c-1-1.3 1-2 0-3.5" />
          <path className={steamClass} d="M13.5 6c-1-1.3 1-2 0-3.5" style={{ animationDelay: ".25s" }} />
        </svg>
      );
    default:
      return null;
  }
}
