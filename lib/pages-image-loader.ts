/**
 * next/image loader for the GitHub Pages static export (no optimizer
 * there). Maps /images/<group>/<name>.jpg to the pre-generated WebP
 * variants from scripts/generate-static-variants.mjs, choosing the
 * smallest width ≥ the requested one. Anything outside public/images
 * (icons, og) falls through unchanged.
 */
const WIDTHS = [384, 640, 828, 1080, 1440, 1920];
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function pagesImageLoader({ src, width }: { src: string; width: number; quality?: number }): string {
  // Callers pass withBase()-prefixed paths — normalize before matching,
  // and re-attach the prefix exactly once on the way out.
  const bare = BASE && src.startsWith(BASE) ? src.slice(BASE.length) : src;
  const m = bare.match(/^\/images\/(dishes|combos|hero|mood|textures)\/(.+)\.jpe?g$/i);
  if (!m) return `${BASE}${bare}`;
  const w = WIDTHS.find((candidate) => candidate >= width) ?? WIDTHS[WIDTHS.length - 1];
  return `${BASE}/images/opt/${m[1]}/${m[2]}-${w}.avif`;
}
