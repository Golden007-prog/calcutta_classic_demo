/**
 * Feature 82 — particle burst micro-interaction via the Web Animations
 * API (zero deps, transform/opacity only). No-ops under reduced motion.
 */
export function burst(
  origin: HTMLElement,
  options?: { emojis?: string[]; count?: number },
) {
  if (typeof window === "undefined") return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const { emojis = ["✨"], count = 10 } = options ?? {};
  const rect = origin.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;

  for (let i = 0; i < count; i++) {
    const particle = document.createElement("span");
    particle.textContent = emojis[i % emojis.length];
    particle.setAttribute("aria-hidden", "true");
    Object.assign(particle.style, {
      position: "fixed",
      left: `${cx}px`,
      top: `${cy}px`,
      fontSize: `${10 + Math.random() * 10}px`,
      pointerEvents: "none",
      zIndex: "96",
      willChange: "transform, opacity",
    });
    document.body.appendChild(particle);

    const angle = (i / count) * Math.PI * 2 + Math.random() * 0.7;
    const distance = 40 + Math.random() * 55;

    particle
      .animate(
        [
          { transform: "translate(-50%,-50%) scale(0.6)", opacity: 1 },
          {
            transform: `translate(${Math.cos(angle) * distance - 50}%, ${Math.sin(angle) * distance - 120}%) scale(1.15) rotate(${Math.random() * 180 - 90}deg)`,
            opacity: 0,
          },
        ],
        { duration: 620 + Math.random() * 260, easing: "cubic-bezier(0.22,1,0.36,1)" },
      )
      .finished.finally(() => particle.remove());
  }
}
