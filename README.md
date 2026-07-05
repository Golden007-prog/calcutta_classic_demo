# The Calcutta Classics 🥟

**Live: <https://golden007-prog.github.io/calcutta_classic_demo/>**

A cinematic, mobile-first foodie showcase for **The Calcutta Classics** —
street food made with love & spices in Shyambazar, Kolkata (opposite
Deshbandhu Park). Instagram: [@the_calcutta_classics](https://www.instagram.com/the_calcutta_classics/).

**Showcase site, not an ordering site** — no cart, no checkout, ever.
"Order" means walk in, call, or WhatsApp.

## Stack

Next.js 16 (App Router, RSC-first, React Compiler) · TypeScript · Tailwind
CSS v4 · GSAP + ScrollTrigger · Lenis · Motion · React Three Fiber ·
Supabase (auth scaffold, flag-gated) · pnpm

## Run it

```bash
pnpm install
cp .env.example .env.local   # fill in Supabase URL + publishable key
pnpm dev                     # http://localhost:3000
pnpm build && pnpm start     # production build
```

## Where things live

- `data/menu.ts` · `data/site.ts` — all content, typed, no CMS
- `app/` — routes (App Router) · `components/` — UI
- `FEATURES.md` — the 110-feature checklist and build status
- `AUTH_TODO.md` — how to switch on the dormant Supabase auth
- `claude-code-prompt.md` — the original build spec

## Build phases

1. ✅ Foundation — scaffold, tokens, fonts, data, Glass, nav, footer
2. ✅ Loading system (Steam Ritual preloader)
3. ✅ Assets (Higgsfield-generated photography + video, sharp pipeline)
4. ✅ Home (video hero, R3F momo, steam shader, momo-meter)
5. ✅ Menu system (filters, fuzzy search, intercepted dish modals)
6. ✅ Foodie Zone (quiz, wheel, matchers, calculators)
7. ✅ Local + social (visit, story, contact, gallery, MDX blog, EN/বাংলা)
8. ✅ Polish (GSAP + Lenis, cursor, magnetic, pinned combos, sounds)
9. ✅ Ship pass (PWA, JSON-LD, OG images, sitemap, a11y, Lighthouse)

## Lighthouse (mobile emulation)

Measured on the production build served locally via `next start`
(HTTP/1.1 — real CDN/h2 deployments score higher on performance):

| Page | Perf | A11y | Best Practices | SEO | LCP | CLS |
| --- | --- | --- | --- | --- | --- | --- |
| Home | 80 | **100** | **100** | **100** | 5.1s¹ | 0.012 |
| Menu | 88 | **100** | **100** | **100** | 3.9s¹ | 0.012 |
| Dish page | 88 | **100** | **100** | **100** | 3.9s¹ | 0.012 |

¹ Lantern-simulated over HTTP/1.1; with applied (devtools) throttling the
home LCP measures **2.7s**. Run it yourself:
`pnpm build && pnpm start`, then
`npx lighthouse http://localhost:3000 --output html`.

## Deployments

- **GitHub Pages** (live): pushed to `main` → `.github/workflows/deploy-pages.yml`
  builds a static export (`GITHUB_PAGES=true`, basePath `/calcutta_classic_demo`).
  Static-host trade-offs: no image optimizer, no dish-modal intercepting
  route (links open the full dish page), no middleware.
- **Vercel** (optional, full-featured): import the repo, set the env vars
  from `.env.example` — image optimizer, dish modals and ISR come back
  automatically, and Analytics/Speed Insights activate.

## Pending real-world facts (TBD)

- Crispy Chicken Pizza price → `data/menu.ts` (`price: null`)
- Phone / WhatsApp number → `data/site.ts` (`contact`)
- Google review link → `data/site.ts` (`ordering.googleReviews`)
- Zomato/Swiggy: intentionally absent — the shop is not on delivery apps
