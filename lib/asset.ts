/**
 * Base-path helper for raw asset URLs (video, prefetch links, manifest
 * icons, SW). next/link handles basePath automatically; plain URLs don't.
 * Empty string everywhere except GitHub Pages builds.
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function withBase(path: string): string {
  return `${BASE_PATH}${path}`;
}
