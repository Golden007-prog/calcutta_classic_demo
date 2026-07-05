/**
 * Static-export image variants (GitHub Pages has no next/image optimizer):
 *   public/images/<group>/<name>.jpg
 *     → public/images/opt/<group>/<name>-<w>.webp  (widths ≤ source, q70)
 *
 * The Pages build (GITHUB_PAGES=true) swaps next/image to the custom
 * loader in lib/pages-image-loader.ts, which serves these files. The
 * variants are COMMITTED — CI has no raw masters to regenerate from.
 *
 * Run after changing any image: node scripts/generate-static-variants.mjs
 */
import { mkdir, readdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const BASE = path.join(ROOT, "public", "images");
const GROUPS = ["dishes", "combos", "hero", "mood", "textures"];
export const WIDTHS = [384, 640, 960, 1280, 1920];
const QUALITY = 70;

let made = 0;
for (const group of GROUPS) {
  const dir = path.join(BASE, group);
  const files = (await readdir(dir).catch(() => [])).filter((f) => /\.jpe?g$/i.test(f));
  for (const file of files) {
    const src = path.join(dir, file);
    const stem = file.replace(/\.jpe?g$/i, "");
    const outDir = path.join(BASE, "opt", group);
    await mkdir(outDir, { recursive: true });
    const meta = await sharp(src).metadata();
    for (const w of WIDTHS) {
      // Buckets above the source width still get a file (capped at the
      // source, never upscaled) so the loader can never 404.
      const out = path.join(outDir, `${stem}-${w}.webp`);
      const exists = await stat(out).catch(() => null);
      const srcStat = await stat(src);
      if (exists && exists.mtimeMs >= srcStat.mtimeMs) continue;
      await sharp(src)
        .resize({ width: Math.min(w, meta.width ?? w) })
        .webp({ quality: QUALITY })
        .toFile(out);
      made++;
    }
  }
}
console.log(`generated ${made} variants under public/images/opt/`);
