/**
 * A1 — fixed ambient background: large soft momo-gold/chili radial blobs
 * drifting slowly behind every section (+ faint grain). Glass only reads
 * as glass when color and light pass behind it. Pure CSS (globals.css),
 * transform-only animation, disabled under prefers-reduced-motion.
 */
export function AmbientGlow() {
  return (
    <div aria-hidden className="cc-ambient">
      <i />
      <i />
      <i />
    </div>
  );
}
