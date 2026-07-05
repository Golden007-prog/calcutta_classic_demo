# The Calcutta Classics 🥟

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
2. ⏳ Loading system (Steam Ritual preloader)
3. ⏳ Assets (Higgsfield image/video pipeline)
4. ⏳ Home (video hero, R3F momo, steam)
5. ⏳ Menu system
6. ⏳ Foodie Zone
7. ⏳ Local + social
8. ⏳ Polish
9. ⏳ Ship pass (PWA, SEO, a11y, Lighthouse ≥95)

## Pending real-world facts (TBD)

- Crispy Chicken Pizza price → `data/menu.ts` (`price: null`)
- Phone / WhatsApp number → `data/site.ts` (`contact`)
- Google review link → `data/site.ts` (`ordering.googleReviews`)
- Zomato/Swiggy: intentionally absent — the shop is not on delivery apps
