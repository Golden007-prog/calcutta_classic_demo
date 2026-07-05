# CLAUDE CODE PROMPT — "Calcutta Classics" Foodie Website

> Copy everything below the line into Claude Code as your first message.

---

You are building a production-grade website for **The Calcutta Classics** — a beloved street-food joint in Shyambazar, Kolkata (opposite Deshbandhu Park). Instagram: **@the_calcutta_classics**. This is a **showcase/foodie experience site, NOT an ordering site**. Work autonomously; plan first, then build in the phases listed at the end. Ask me only for the items marked `TBD`.

## 1. Mission

A modern, minimalistic, mobile-first foodie website that makes people crave the food and walk into the shop. Cinematic food visuals, glassmorphism, buttery animations, and instant page loads. Think Awwwards-level polish on a street-food budget menu.

## 2. Tech Stack (strict)

- **Next.js 15+ (App Router, TypeScript, React 19, React Compiler enabled)** — RSC-first, minimal `"use client"`.
- **Tailwind CSS v4** for styling; CSS variables for design tokens.
- **GSAP + ScrollTrigger** for scroll-driven scenes, **Lenis** for smooth scrolling, **Framer Motion** for micro-interactions/page elements.
- **React Three Fiber + drei** (Three.js) for the hero 3D scene — dynamically imported, never in the critical path.
- **lucide-react** icons, **next-themes** for dark/light, **zustand** (persisted) for favorites/local state.
- **Supabase**: install `@supabase/supabase-js`, scaffold `lib/supabase.ts` + an `/auth` route group, but gate ALL auth UI behind `NEXT_PUBLIC_ENABLE_AUTH=false`. **Login is ON HOLD — scaffold only, nothing visible in the UI.**
- **No cart, no checkout, no payments, no online ordering. Ever.** "Order" CTAs = `tel:` call button, WhatsApp deep link, and external Zomato/Swiggy links (`TBD` URLs).
- Package manager: pnpm. All content in typed data files (`data/menu.ts`, `data/site.ts`) — no CMS.

## 3. Real Menu Data (use EXACTLY this — it's short, keep it accurate)

À la carte:

| Item | Price |
|---|---|
| Steam Momo | ₹60 |
| Fried Momo | ₹70 |
| Peri Peri Momo | ₹80 |
| Sweet Corn Chaat | ₹50 |
| Chips Chaat | ₹50 |
| Momo Burger | ₹90 |
| French Fries | ₹50 |
| Maggi (Veg / Egg) | ₹50 / ₹60 |
| Royal Chicken Bucket | ₹150 |
| Cheese Chicken Bombs | ₹120 |
| Bhetki Fish Fry (2 pcs) | ₹150 |
| Belgian Coffee | ₹20 |

Signature Combos:

| Combo | Contents | Price |
|---|---|---|
| Bhetki Fish Fry Combo | 2 pcs Bhetki Fish Fry, French Fries, 4 pcs Momo, Belgian Coffee | ₹249 |
| Crispy Chicken Combo | 3 pcs Chicken Strips, 2 pcs Chicken Bombs, French Fries, 4 pcs Momo, Belgian Coffee | ₹299 |
| Burger Combo | 2 pcs Momo Burger, Fried Chips, 2 cups Belgian Coffee | ₹159 |
| Signature Meal Box | 2 pcs Fish Fry, French Fries, 2 pcs Chicken Strips, 2 pcs Chicken Bombs, 2 pcs Momo, 2 cups Belgian Coffee | ₹349 |

Special: **Crispy Chicken Pizza** (shredded chicken, mozzarella, red chilli flakes, oregano, garlic, corn, crispy herbs) — price `TBD`.

Brand lines to reuse in copy: "Made with Love & Spices", "Bite into happiness", "Comfort food at its best". Opening hours: `TBD`. Phone/WhatsApp: `TBD`.

Extend each menu item in `data/menu.ts` with: slug, category, veg/non-veg, spice level (0–3), tags (crispy/cheesy/saucy/steamed), short crave-copy (write it yourself, Kolkata personality, no lorem ipsum), pairing suggestion, bestseller flag, image path + blurDataURL.

## 4. Design Language

- **Minimal foodie editorial**: generous whitespace, oversized display type, photography does the talking.
- Palette (CSS vars, dark-mode default): charcoal `#0F0F10`, cream `#F6F1E7`, momo-gold `#E8A13A`, chili `#D64533`, leaf-green `#4F7A4F`. Subtle film-grain overlay on hero sections.
- Type: **Fraunces** (display, via `next/font`) + **Inter** (body). **Noto Serif Bengali** for accent words (e.g. কলকাতা) — subset loaded.
- **Glassmorphism system**: one `Glass` component — `backdrop-blur-xl`, white 8–12% fill, 1px translucent border, soft inner highlight. Used for: navbar, mobile bottom tab bar, menu cards over imagery, hero overlay panel, modals. Never stack blur on blur.
- Indian-standard veg (green) / non-veg (red) dot markers; chili icons for spice level.
- **Mobile-first is the top priority**: design at 390px first; glass bottom tab bar (Home / Menu / Combos / Visit); swipeable menu cards; 44px+ tap targets; thumb-zone CTAs; test every feature at 360–430px before desktop.
- Custom cursor (tiny chili) on desktop only; magnetic buttons; respect `prefers-reduced-motion` everywhere (disable heavy motion, keep opacity fades).

## 5. Images & Video — Higgsfield MCP workflow

1. Check for a connected **Higgsfield MCP** (tools like `generate_image`, `generate_video`, `upscale_image`). If available, generate every asset in the manifest below, download to `public/images/`, then convert with `sharp` to AVIF/WebP at 640/1080/1920 widths and generate blur placeholders.
2. **If Higgsfield MCP is NOT available**, write all prompts to `IMAGE_PROMPTS.md`, build with elegant gradient+grain placeholder components, and leave a `TODO(images)` list. The site must look intentional even with placeholders.

**Global style suffix for every image prompt**: "professional food photography, 45-degree overhead angle, dark slate surface, warm amber rim light, visible steam, shallow depth of field, minimal props, moody Kolkata street-food energy, rich texture, no text, no hands, 4:5".

Manifest (one per dish using its description, plus): hero shot of steaming momo basket with chutney; all 4 combos plated as spreads; Crispy Chicken Pizza; Belgian Coffee pour; kitchen action shot (tossing peri peri momos); storefront-at-dusk mood shot; 3 texture close-ups (cheese pull, fry crunch, chutney swirl) for section backgrounds.

**Video backgrounds**: hero = 6–8s seamless loop (steam rising over a momo basket, slow camera drift). Generate via Higgsfield `generate_video` if available; otherwise implement a layered fallback: still image + canvas steam-particle shader + slow Ken Burns. Video rules: `<video autoplay muted loop playsinline preload="none" poster=...>`, WebM+MP4, ≤2MB, mounted only after LCP, paused when off-screen, static poster on `prefers-reduced-motion` and Save-Data.

## 6. Site Structure

- `/` — hero (video bg + glass panel + 3D floating momo), signature combos rail, menu preview, momo-meter, foodie-zone teaser, Instagram wall, visit-us block.
- `/menu` — the interactive menu system (see features). `/menu/[slug]` — dish detail as an intercepted parallel route (modal on soft nav, full page on direct load/share).
- `/combos` — combo showcase with savings math and horizontal scroll gallery.
- `/our-story` — scrollytelling brand story (Shyambazar, the first steamer, the ₹20 Belgian Coffee legend).
- `/visit` — map, directions, landmarks, transport, hours with live open/closed badge.
- `/foodie-zone` — quiz, wheel, craving matcher, glossary, polls, wall.
- `/gallery` — masonry lightbox gallery.
- `/contact` — call/WhatsApp/feedback/catering inquiry.
- Route-level `loading.tsx` everywhere, custom `not-found.tsx` (dropped momo illustration: "This page rolled away"), `error.tsx` ("A small kitchen mishap").

## 7. The 110 Features (build ALL — track in FEATURES.md with checkboxes)

**Menu & dishes (1–15)**
1. Interactive menu with animated category tabs (Momos / Chaat & Snacks / Fried & Loaded / Combos / Beverages)
2. Dish detail view: photo, crave-copy, price, spice, tags, pairing
3. Veg/non-veg filter with green/red dot markers
4. Spice-level filter (chili icons, 0–3)
5. Price sort + under-₹X quick filters
6. Instant fuzzy search with highlighted matches
7. Bestseller / Chef's Pick badges
8. Combo contents visualizer (each item animates into the box)
9. Combo savings calculator (combo vs à la carte, animated counter)
10. Swipeable dish cards on mobile (snap scroll)
11. Sticky glass mini-nav of categories with scroll-spy
12. "Pairs well with" suggestions (everything pairs with ₹20 Belgian Coffee)
13. Allergen/ingredient accordion per dish
14. Ingredient chips ("what's inside") on dish pages
15. Print-optimized menu + "Download menu" (generated PDF or print CSS)

**Foodie experience (16–35)**
16. "What Should I Eat?" mood quiz → dish recommendation card
17. Spin-the-Momo wheel — random dish picker with physics easing
18. Craving matcher: cheesy/spicy/crunchy/saucy sliders → ranked matches
19. Budget Bite Finder: "I have ₹___" slider → best combinations
20. Group snack calculator: people + hunger level → suggested order (for walk-in)
21. Momo-Meter: animated live-ish counter of momos steamed (seeded formula)
22. Shareable "My Foodie Personality" result card (canvas-generated image)
23. Daily special highlight driven by day-of-week data
24. Weather-aware suggestion banner (rainy Kolkata → hot momos + coffee) via free weather API, graceful fallback
25. Time-of-day menu mode (evening = snack hour hero copy)
26. Foodie glossary (Bhetki, chaat, peri peri, momo origins…)
27. Behind-the-scenes kitchen story section with hover video snippets
28. Recipe-teaser cards styled like their Instagram posts (mozzarella pasta, pizza)
29. Rotating food-facts ticker marquee
30. Hunger-level selector → portion suggestion ("2 plates. Trust us.")
31. Guided "Menu Tour" — scroll-driven storytelling walk through the menu
32. Emoji craving reactions per dish (stored locally, animated burst)
33. Favorites/wishlist with heart animation (zustand + localStorage)
34. Compare-two-dishes side-by-side drawer
35. Seasonal/festival specials section (data-driven)

**Kolkata local (36–50)**
36. Embedded map with custom glass pin + "Get Directions" deep link
37. Landmark walking guide: "Opposite Deshbandhu Park" with mini illustrated map
38. Kolkata street-food culture mini-blog (3 seeded MDX posts)
39. English / বাংলা language toggle (next-intl or lightweight dictionary; menu names + key UI)
40. External Zomato/Swiggy/Google links block (`TBD` URLs) — the ONLY ordering path
41. Live open/closed badge computed from hours (`TBD`) in IST
42. "How far am I?" geolocation distance + walk time (permission-gated, graceful denial)
43. Getting-there guide: Shyambazar metro, bus, tram heritage note
44. Festival banner system (Durga Puja, Poila Boishakh) with date ranges
45. North Kolkata street-food history timeline (animated vertical scroll)
46. Neighbourhood charm section: vintage-toned photo strip of Shyambazar
47. Weather widget in footer tied to feature #24
48. Announcements/pop-up events bar (dismissible, localStorage)
49. Press & creator mentions wall
50. "Foodie Wall" — curated local customer photo grid

**Social & community (51–65)**
51. Instagram feed section for @the_calcutta_classics (static curated grid linking out; no API keys required)
52. UGC prompt: "Tag #CalcuttaClassics" with example posts
53. Testimonials carousel with drag physics
54. Google-review style rating strip (seeded data, `TBD` real link)
55. Share any dish card to WhatsApp/X/IG-story (Web Share API + fallback)
56. Combo Explorer badge system — visited/tried dishes checklist (localStorage honor system)
57. Photo contest section with rules + monthly winner slot
58. Newsletter capture form (stores to localStorage queue now; Supabase later — flag-gated)
59. Floating WhatsApp click-to-chat glass button
60. "Call us" `tel:` CTA in nav + footer
61. Table/visit request via prefilled WhatsApp message composer
62. Catering/party inquiry form (mailto/WhatsApp compose — no backend)
63. Feedback form with emoji scale + optional text
64. "Vote the next menu item" poll (localStorage, animated results)
65. Refer-a-friend: generates a shareable invite card image

**Visual & interactive layer (66–85)**
66. R3F hero: floating 3D momo (modeled from primitives/lathe — no heavy GLB) with slow idle rotation, mouse parallax
67. GPU steam particles rising through the hero (custom shader or drei Sparkles tuned)
68. Hero video background under a glass info panel
69. Glass navbar that condenses on scroll
70. Chili custom cursor + hover states (desktop only)
71. Magnetic buttons with spring physics
72. Multi-layer parallax food imagery between sections
73. GSAP ScrollTrigger reveals: clip-path unmasks, staggered text, image scale-settle
74. Lenis smooth scroll wired into ScrollTrigger
75. Horizontal pinned scroll section for Signature Combos
76. 3D perspective tilt on dish cards (pointer-tracked, springy)
77. Kinetic typography hero headline (per-word stagger, Bengali accent word)
78. Dish-name marquee divider strips
79. View Transitions API page morphs (dish card → dish page image morph)
80. Dark/light mode with animated sun/steam toggle (dark default)
81. Animated SVG steam-curve section dividers
82. Particle burst micro-interactions (favorite, quiz result, wheel win)
83. Lottie/light SVG animated icons for categories
84. Branded skeleton shimmer for every image while loading
85. Optional subtle UI sounds (sizzle on wheel spin) — OFF by default, toggle in footer

**Signature loading system (86–92)**
86. **First-visit preloader "The Steam Ritual"**: SVG momo basket, lid lifts, steam curls draw the wordmark "Calcutta Classics", basket fill = real asset-load progress. sessionStorage-gated → shown once per session, max 2.5s, skippable on tap
87. Preloader variants rotate per visit: coffee pour filling cup as progress bar / fish fry flip / basket steam — pick randomly
88. Route-level `loading.tsx` = branded glass skeletons (never spinners)
89. Progress counter with optional Bengali numerals (১২৩) tied to language toggle
90. Micro top-bar loader for soft navigations (2px momo-gold bar)
91. `prefers-reduced-motion` variant: static logo + fade, zero animation
92. Preloader doubles as preload gate: warms hero video poster, display font, first 6 dish images via `link rel=preload`

**Performance, PWA, SEO, a11y (93–110)**
93. `next/image` everywhere: AVIF/WebP, correct `sizes`, blur placeholders
94. `priority` + `fetchpriority=high` on the LCP hero image/poster only
95. RSC/SSG for all routes (`export const dynamic = 'force-static'` where possible); ISR (daily) for specials
96. `next/font` self-hosted subsets, `display: swap`, zero layout shift from fonts
97. Route prefetching on viewport links; hover-intent prefetch for dish pages
98. Three.js + GSAP heavy scenes `dynamic(() => import(...), { ssr: false })`, loaded after first paint on idle, rendered only in viewport, DPR capped at 1.5, paused on `visibilitychange`
99. Hero video: poster-first, `preload="none"`, mounted post-LCP, ≤2MB, off-screen pause
100. Performance budget enforced: Lighthouse mobile ≥95, LCP <2.0s, CLS <0.05, INP <200ms — run Lighthouse CI script and fix regressions before finishing
101. PWA: installable, manifest, offline page + cached menu ("Menu works even on Metro Wi-Fi")
102. Structured data: `Restaurant` + `Menu` + `MenuItem` + `LocalBusiness` JSON-LD with geo, hours, priceRange ₹
103. Dynamic OG images per dish via `next/og` (dish photo + price + veg dot)
104. `sitemap.xml`, `robots.txt`, canonical URLs
105. Local SEO metadata: "momos in Shyambazar", "street food North Kolkata" title/description patterns
106. Vercel Analytics + Speed Insights wired (no cookie banners needed)
107. WCAG 2.1 AA: focus-visible rings (momo-gold), semantic landmarks, alt text = dish descriptions, contrast-checked palette, full keyboard nav incl. wheel & quiz
108. Fun 404 with rolling-momo animation + menu shortcut links
109. Error boundary with "kitchen mishap" illustration + retry
110. Supabase auth scaffold behind `NEXT_PUBLIC_ENABLE_AUTH` flag: `lib/supabase.ts`, `(auth)` route group, middleware stub, `AUTH_TODO.md` explaining the 15-min enable path — **no visible UI while flag is false**

## 8. Speed Doctrine (non-negotiable)

The site must FEEL instant despite video, 3D, and animation:

- Critical path = HTML + critical CSS + hero poster image only. Everything cinematic (video, Three.js, GSAP scenes, Lottie) loads progressively after first paint.
- Ship the least JavaScript: server components by default; client islands only for interactive widgets; check with `@next/bundle-analyzer`; no moment/lodash-style heavy deps; import GSAP plugins individually.
- Animations use only `transform`/`opacity` (compositor-friendly); `will-change` applied sparingly and removed after; no layout-thrashing scroll listeners — everything through ScrollTrigger/rAF.
- Test on throttled "Slow 4G + 4x CPU" in devtools — the experience must still feel premium: posters instead of video, instant skeletons, no blank frames.
- If any feature fights the performance budget, degrade the feature, never the budget.

## 9. Build Phases (work in this order, commit per phase)

1. **Foundation** — scaffold Next.js 15 + Tailwind v4, design tokens, fonts, `data/menu.ts` + `data/site.ts`, Glass component, layout, navbar, bottom tab bar, footer.
2. **Loading system** — Steam Ritual preloader + variants, `loading.tsx` skeletons, top-bar loader, reduced-motion paths (features 86–92).
3. **Assets** — Higgsfield MCP image/video generation per §5 manifest (or `IMAGE_PROMPTS.md` + placeholders), sharp pipeline, blur placeholders.
4. **Home** — hero (video + glass + R3F momo + steam), combos rail, menu preview, momo-meter, IG wall, visit block.
5. **Menu system** — `/menu`, filters, search, dish pages with intercepted routes, View Transition morphs (features 1–15).
6. **Foodie Zone** — quiz, wheel, craving matcher, budget finder, glossary, polls (features 16–35).
7. **Local + social** — visit page, maps, language toggle, hours logic, community sections (features 36–65).
8. **Polish** — remaining visual layer (66–85), dark/light, cursor, sounds.
9. **Ship pass** — PWA, SEO/JSON-LD, OG images, a11y sweep, Lighthouse CI ≥95 mobile, `FEATURES.md` checklist fully ticked, `README.md` with run/deploy instructions.

## 10. Rules

- No lorem ipsum anywhere — write real, warm, slightly cheeky Kolkata copy ("Steam first. Questions later.").
- No stock-photo look: only Higgsfield-generated or placeholder-system visuals per §5.
- Small composable components; typed everything; no `any`.
- Every interactive feature must work with keyboard and screen reader, and have a reduced-motion path.
- `pnpm build` must pass clean at the end of every phase. Verify the prod build, not just dev.
- Ask me ONLY about: pizza price, opening hours, phone/WhatsApp number, Zomato/Swiggy/Google links. Placeholder them as `TBD` constants in `data/site.ts` and continue if I'm not around.

## 11. Definition of Done

- All 110 features checked off in `FEATURES.md`.
- Lighthouse mobile ≥95 across Home, Menu, dish page (attach the scores).
- Flawless at 360px, 390px, 768px, 1440px; thumb-reachable primary actions on mobile.
- Preloader appears once per session, never blocks repeat navigation, total blocking ≤2.5s.
- Zero console errors; zero CLS from images/fonts; video never plays before poster paints.
- `README.md` + `IMAGE_PROMPTS.md` (if used) + `AUTH_TODO.md` present.

Start with Phase 1. Show me your plan for the phase, then build it.
