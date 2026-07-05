# CLAUDE CODE PROMPT — Fix, Audit & Deploy (Calcutta Classics, Round 2)

> Copy everything below the line into Claude Code inside the project repo.

---

The Calcutta Classics site has serious visual/UX bugs. Your job, in this exact order: **(A)** fix the known bugs below, **(B)** run a full audit to find every remaining bug — researching best practices with WebSearch before fixing anything you're not 100% sure about — and fix them, **(C)** make the site GitHub Pages–compatible, push, and redeploy to github.io. Verify everything in a real browser (Playwright or `next dev` + screenshots), not just by reading code. Track all findings in `BUGS.md` (severity: P0 blocker / P1 major / P2 polish), tick them off as you fix.

## PART A — Known bugs (fix first, in this order)

### A1 (P0) Glassmorphism is broken — cards render as opaque grey slabs

Symptoms: every "glass" card (Signature Combos, Foodie Zone, combo cards, navbar) is a flat light-grey box. No blur, no translucency, fights the dark theme.

Likely root causes — verify each in devtools:
1. White fill opacity far too high (looks like `bg-white/60`+). On a dark theme, glass must be a **dark tint**, not light.
2. `backdrop-filter` silently failing: an ancestor with `transform`, `filter`, `will-change`, or `contain` breaks it; or there's nothing visually interesting behind the card to blur (flat black background → blur is invisible → panel reads as solid grey).
3. Missing `-webkit-backdrop-filter` (check Tailwind output).

Required fix — rebuild the single `Glass` component and use it everywhere (no ad-hoc glass styles):

```css
/* dark glass recipe */
background: rgb(255 255 255 / 0.06);          /* 0.04–0.10 range, never higher */
backdrop-filter: blur(20px) saturate(140%);
border: 1px solid rgb(255 255 255 / 0.12);
box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.08), 0 8px 32px rgb(0 0 0 / 0.35);
border-radius: 1.25rem;
```

And give the blur something to work with: add fixed ambient background layers behind card sections (large soft radial gradient blobs in momo-gold `#E8A13A` at 6–10% opacity + faint grain, slowly drifting). Glass only reads as glass when color/light passes behind it.

Navbar: `bg-zinc-950/55 + backdrop-blur-xl + border-b border-white/10` — never light grey. "Call us" pill: solid momo-gold fill, charcoal `#0F0F10` text, hover brightens. `@supports not (backdrop-filter: blur(1px))` fallback: `bg-zinc-900/90`.

### A2 (P0) Text colors unreadable

Symptoms: card descriptions, combo contents, "1–2 people", "worth ~₹260", "save ₹11" are grey-on-grey, near invisible.

Fix: define text tokens once and sweep every component:
- `--text-strong`: cream `#F6F1E7` (headings, prices)
- `--text-body`: cream at 82% (descriptions)
- `--text-muted`: cream at 62% — **the floor**; nothing below 60% opacity, ever
- Accent numerals/prices: momo-gold `#E8A13A`; "save ₹X" pill: leaf-green `#4F7A4F` fill at 20% + green-200 text, or solid green with cream text — must pass contrast
- Rule: light text on dark surfaces ONLY. There must be zero light-on-light combinations anywhere.
- Verify programmatically: run axe or a contrast script over every page; all body text ≥ 4.5:1, large display text ≥ 3:1. Put the results in `BUGS.md`.

### A3 (P0) Custom chili cursor: frozen in place + native cursor still visible (two cursors at once)

Symptoms: chili sprite stuck near a card corner, doesn't follow the mouse; OS cursor also visible.

Root causes to check: mousemove handler never attached / attached to an unmounted component; position updated via React state + `left/top` (re-render lag) instead of rAF + transform; missing `cursor: none`; z-index/pointer-events wrong.

Required implementation — one global client component in the root layout:
- Element: `position: fixed; top: 0; left: 0; pointer-events: none; z-index: 9999; will-change: transform;`
- Track `pointermove` on `window`; move with `transform: translate3d(x,y,0)` inside a `requestAnimationFrame` loop with lerp (~0.2) for the trailing feel. Never set state per mousemove.
- Hide the native cursor ONLY when the custom one is active: apply `html { cursor: none }` via a class added on mount, removed on unmount/error.
- Gate strictly to `matchMedia('(pointer: fine)')` — never on touch devices; also disable under `prefers-reduced-motion`.
- Hover states: scale up over links/buttons (`[data-cursor="hover"]` targets), tiny squish on mousedown.
- Acceptance: exactly ONE cursor visible at all times on desktop, follows within 1 frame with smooth trail, zero cursors doubled, touch devices completely unaffected.
- If after fixing it still glitches anywhere, prefer shipping WITHOUT the custom cursor over shipping a broken one.

### A4 (P1) 3D momo looks colorless, plastic, "tasteless" (currently a beige spinning-top blob)

Fix both geometry and materials — research "react three fiber realistic food material" / "R3F meshPhysicalMaterial subsurface" before coding:
1. **Geometry**: model a real momo silhouette — squashed sphere body (scale y ≈ 0.72), with 10–12 pleats swirling to a top knot (thin twisted cone/torus segments arranged radially, merged). No lathe spinning-top shapes.
2. **Material**: `meshPhysicalMaterial` — warm dough ivory `#EBD9B4`, `roughness 0.55`, `clearcoat 0.12`, `sheen 0.4` with warm sheen color, slight emissive `#3a2a18` at 0.05 to fake subsurface warmth. Add a subtle procedural bump (simplex noise normal) so it reads as dough, not plastic.
3. **Lighting/grade**: `<Environment preset="sunset" />` + warm key light (momo-gold tinted) + cool low-intensity rim; `ACESFilmicToneMapping`, exposure ~1.1; `<ContactShadows>` under it; `<Float>` for slow idle bob; steam particles rising past it.
4. **Alternative (pick whichever looks better, show me a screenshot of both if quick)**: a CC0/free dumpling GLB (Poly Pizza / Sketchfab CC0), draco-compressed, ≤1.5MB — with the same lighting rig.
5. Keep it lazy-loaded, DPR ≤ 1.5, paused off-screen — the perf rules still stand.
6. Acceptance: it should look appetizing — warm, soft, steamed — at first glance on both dark and light themes. If it can't get there, replace it with the steam-only shader over the hero image (better no 3D than bad 3D).

### A5 (P1) Small bugs already spotted — fix all

1. Pluralization: combo contents render "1 cups Belgian Coffee" → write a tiny `pluralize(count, "cup", "cups")` helper and use it for all units (pcs/plate/cups).
2. Inconsistent card hover/focus: one Foodie Zone card shows an orange border while others are flat — hover/focus-visible styles must be identical across all cards (gold border + slight lift + glow, on hover AND focus-visible).
3. The stuck chili sprite overlapping a combo card image (artifact of A3) must be gone.
4. Hero: the 3D momo overlaps the steamer-basket photo awkwardly on the right — reposition/scale per breakpoint so they compose, not collide; on <768px consider hiding the 3D object entirely (perf + layout).
5. Combos rail cards clip text at viewport edge on desktop ("y human", "ering ₹20" fragments visible) — fix slider padding/overflow and card min-widths.

## PART B — Full audit: find everything else, research, fix

Work through this protocol and log every finding in `BUGS.md` before fixing:

1. **Console & hydration sweep**: load every route in dev AND prod build (`pnpm build && pnpm start`); zero console errors/warnings, zero hydration mismatches, zero 404s in the network tab.
2. **Responsive matrix**: 360, 390, 430, 768, 1024, 1440, 1920 — every page. Look for: horizontal scroll, clipped text, overlapping absolutely-positioned elements, unusable tap targets (<44px), bottom tab bar overlapping content, safe-area insets on notched phones.
3. **Interactive features**: exercise every Foodie Zone widget (quiz, wheel, craving matcher, budget finder), filters, search, favorites, language toggle, theme toggle, share buttons, all forms. Each must work with mouse, keyboard, and touch.
4. **Bengali toggle**: verify বাং text renders in Noto Serif Bengali everywhere (no tofu boxes/fallback serif), layout doesn't break with longer Bengali strings.
5. **Theme audit**: every section in dark AND light mode — no invisible text, no hardcoded colors bypassing tokens.
6. **Motion audit**: `prefers-reduced-motion` on → no parallax/3D/video/marquee, but the page is still fully usable and nothing is blank. Lenis + ScrollTrigger disabled cleanly.
7. **A11y**: axe scan per page; keyboard-only full walkthrough (visible gold focus rings, no traps, modal focus management, wheel/quiz operable); alt text on all images; landmarks; `aria-live` for quiz/wheel results.
8. **Performance**: Lighthouse mobile on `/`, `/menu`, one dish page, `/combos` — targets ≥95 perf, LCP <2.0s, CLS <0.05, INP <200ms. Bundle analyzer: flag any client chunk >180KB gzip; verify Three.js/GSAP are NOT in the initial bundle; images all AVIF/WebP with correct `sizes`; fonts subset + swap; preloader ≤2.5s and once per session.
9. **Content pass**: no lorem ipsum, no `TBD` visible to users (TBD values render as graceful omissions, not raw "TBD"), consistent ₹ formatting, veg/non-veg dots correct per item, prices match `data/menu.ts` exactly (source of truth: Steam Momo ₹60, Fried ₹70, Peri Peri ₹80, Sweet Corn Chaat ₹50, Chips Chaat ₹50, Momo Burger ₹90, Fries ₹50, Maggi ₹50/₹60, Royal Chicken Bucket ₹150, Cheese Chicken Bombs ₹120, Bhetki Fish Fry ₹150, Belgian Coffee ₹20; combos ₹249/₹299/₹159/₹349).
10. For any fix where the best approach isn't obvious, WebSearch current best practice first (e.g. "backdrop-filter ancestor transform bug", "next.js static export intercepting routes"), then implement.

Fix order: all P0s → P1s → P2s. Re-verify each fix in the browser. `pnpm build` must stay green throughout.

## PART C — Deploy to GitHub Pages (github.io)

GitHub Pages serves static files only — convert the app to a clean static export:

1. **`next.config.ts`**:
   ```ts
   const repo = 'REPO_NAME'; // detect from `git remote -v`; empty basePath if repo is <user>.github.io
   export default {
     output: 'export',
     images: { unoptimized: true },
     basePath: process.env.NODE_ENV === 'production' ? `/${repo}` : '',
     assetPrefix: process.env.NODE_ENV === 'production' ? `/${repo}/` : '',
     trailingSlash: true,
   };
   ```
   If the site lives at `<username>.github.io` root, omit basePath/assetPrefix.
2. **Static-export compatibility sweep** (this WILL break things — find and fix all of them):
   - No ISR/`revalidate`, no server actions, no API routes, no `headers()`/`cookies()` — remove or convert to client-side.
   - Weather suggestion + any fetches → client-side `useEffect` with graceful fallback.
   - Dynamic OG images (`next/og` route handlers) don't run on Pages → pre-generate OG PNGs at build time with a script into `public/og/`, reference statically.
   - Intercepted/parallel routes: verify they survive `output: 'export'`; if not, fall back to a client-side modal over `/menu` + normal `/menu/[slug]` pages (with `generateStaticParams` for every dish).
   - All internal links/images must respect basePath (use `next/link` and `next/image` only — audit any raw `<img src="/...">` or `url(/...)` in CSS; those need the prefix).
   - Add `public/.nojekyll`.
3. **Workflow** — create `.github/workflows/deploy.yml`:
   ```yaml
   name: Deploy to GitHub Pages
   on:
     push: { branches: [main] }
     workflow_dispatch:
   permissions: { contents: read, pages: write, id-token: write }
   concurrency: { group: pages, cancel-in-progress: true }
   jobs:
     build:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
         - uses: pnpm/action-setup@v4
           with: { version: 9 }
         - uses: actions/setup-node@v4
           with: { node-version: 22, cache: pnpm }
         - run: pnpm install --frozen-lockfile
         - uses: actions/configure-pages@v5
         - run: pnpm build
         - uses: actions/upload-pages-artifact@v3
           with: { path: ./out }
     deploy:
       needs: build
       runs-on: ubuntu-latest
       environment: { name: github-pages, url: ${{ steps.deployment.outputs.page_url }} }
       steps:
         - id: deployment
           uses: actions/deploy-pages@v4
   ```
4. **Verify locally BEFORE pushing**: `pnpm build`, then serve the `out/` dir (`npx serve out`) and click through every page — with basePath simulated if applicable. Broken asset paths show up here, not after deploy.
5. **Ship**: commit all fixes with clear messages (one commit per part: A-fixes, B-audit-fixes, C-deploy-config). Push to `main`. If the repo/remote doesn't exist yet, create it with `gh repo create` and ask me only for the repo name/visibility. Ensure Pages is set to "GitHub Actions" source (`gh api` or tell me the one toggle to click). Watch the Actions run to green (`gh run watch`).
6. **Post-deploy verification**: open the live github.io URL — test 5+ pages, hard-refresh a deep link (e.g. `/menu/steam-momo/`) to confirm static routing works, run Lighthouse against the LIVE URL, confirm no 404 assets. Paste the live URL + Lighthouse scores in your final summary.

## Definition of Done

- `BUGS.md`: every found issue listed with severity and marked fixed; zero open P0/P1.
- Glass actually looks like glass; every string readable (axe contrast clean); one smooth cursor; a momo you'd want to eat.
- Zero console errors on all routes, prod build.
- Lighthouse mobile ≥95 on the live github.io site.
- Live URL working end-to-end, deep links included, deployed via the Actions workflow (green run).
