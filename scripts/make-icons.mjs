/**
 * PWA/app icons (feature 101) from the steam-momo photo:
 * app/icon.png (512), app/apple-icon.png (180), public/icons/* for the
 * manifest. Run: node scripts/make-icons.mjs
 */
import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const SRC = path.join(ROOT, "public", "images", "dishes", "steam-momo.jpg");

await mkdir(path.join(ROOT, "public", "icons"), { recursive: true });

const square = sharp(SRC).resize(512, 512, { fit: "cover", position: "attention" });
const png = { palette: true, quality: 70, compressionLevel: 9 };

// Favicon must stay tiny — it downloads on every first view.
await square.clone().resize(96, 96).png(png).toFile(path.join(ROOT, "app", "icon.png"));
await square.clone().resize(180, 180).png(png).toFile(path.join(ROOT, "app", "apple-icon.png"));
await square.clone().resize(192, 192).png(png).toFile(path.join(ROOT, "public", "icons", "icon-192.png"));
await square.clone().resize(512, 512).png(png).toFile(path.join(ROOT, "public", "icons", "icon-512.png"));

console.log("Icons written: app/icon.png, app/apple-icon.png, public/icons/icon-{192,512}.png");
