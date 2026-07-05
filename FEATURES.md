# The Calcutta Classics — Feature Checklist (110)

Tick a box only when the feature is fully built, keyboard-accessible, and has
a reduced-motion path. Phases in parentheses show where each lands.

## Menu & dishes (1–15) — Phase 5

- [x] 1. Interactive menu with animated category tabs (Momos / Chaat & Snacks / Fried & Loaded / Combos / Beverages)
- [x] 2. Dish detail view: photo, crave-copy, price, spice, tags, pairing
- [x] 3. Veg/non-veg filter with green/red dot markers
- [x] 4. Spice-level filter (chili icons, 0–3)
- [x] 5. Price sort + under-₹X quick filters
- [x] 6. Instant fuzzy search with highlighted matches
- [x] 7. Bestseller / Chef's Pick badges
- [x] 8. Combo contents visualizer (each item animates into the box)
- [x] 9. Combo savings calculator (combo vs à la carte, animated counter)
- [x] 10. Swipeable dish cards on mobile (snap scroll)
- [x] 11. Sticky glass mini-nav of categories with scroll-spy
- [x] 12. "Pairs well with" suggestions (everything pairs with ₹20 Belgian Coffee)
- [x] 13. Allergen/ingredient accordion per dish
- [x] 14. Ingredient chips ("what's inside") on dish pages
- [x] 15. Print-optimized menu + "Download menu" (generated PDF or print CSS)

## Foodie experience (16–35) — Phase 6

- [x] 16. "What Should I Eat?" mood quiz → dish recommendation card
- [x] 17. Spin-the-Momo wheel — random dish picker with physics easing
- [x] 18. Craving matcher: cheesy/spicy/crunchy/saucy sliders → ranked matches
- [x] 19. Budget Bite Finder: "I have ₹___" slider → best combinations
- [x] 20. Group snack calculator: people + hunger level → suggested order (for walk-in)
- [x] 21. Momo-Meter: animated live-ish counter of momos steamed (seeded formula)
- [x] 22. Shareable "My Foodie Personality" result card (canvas-generated image)
- [x] 23. Daily special highlight driven by day-of-week data
- [x] 24. Weather-aware suggestion banner (rainy Kolkata → hot momos + coffee) via free weather API, graceful fallback
- [x] 25. Time-of-day menu mode (evening = snack hour hero copy)
- [x] 26. Foodie glossary (Bhetki, chaat, peri peri, momo origins…)
- [x] 27. Behind-the-scenes kitchen story section with hover video snippets
- [x] 28. Recipe-teaser cards styled like their Instagram posts (mozzarella pasta, pizza)
- [x] 29. Rotating food-facts ticker marquee
- [x] 30. Hunger-level selector → portion suggestion ("2 plates. Trust us.")
- [x] 31. Guided "Menu Tour" — scroll-driven storytelling walk through the menu
- [x] 32. Emoji craving reactions per dish (stored locally, animated burst)
- [x] 33. Favorites/wishlist with heart animation (zustand + localStorage)
- [x] 34. Compare-two-dishes side-by-side drawer
- [x] 35. Seasonal/festival specials section (data-driven)

## Kolkata local (36–50) — Phase 7

- [x] 36. Embedded map with custom glass pin + "Get Directions" deep link
- [x] 37. Landmark walking guide: "Opposite Deshbandhu Park" with mini illustrated map
- [x] 38. Kolkata street-food culture mini-blog (3 seeded MDX posts)
- [x] 39. English / বাংলা language toggle (menu names + key UI)
- [x] 40. External Zomato/Swiggy/Google links block — NOTE: shop is not on delivery apps; Zomato/Swiggy permanently hidden, Google review link TBD
- [x] 41. Live open/closed badge computed from hours (12 PM–10 PM daily) in IST
- [x] 42. "How far am I?" geolocation distance + walk time (permission-gated, graceful denial)
- [x] 43. Getting-there guide: Shyambazar metro, bus, tram heritage note
- [x] 44. Festival banner system (Durga Puja, Poila Boishakh) with date ranges
- [x] 45. North Kolkata street-food history timeline (animated vertical scroll)
- [x] 46. Neighbourhood charm section: vintage-toned photo strip of Shyambazar
- [x] 47. Weather widget in footer tied to feature #24
- [x] 48. Announcements/pop-up events bar (dismissible, localStorage)
- [x] 49. Press & creator mentions wall
- [x] 50. "Foodie Wall" — curated local customer photo grid

## Social & community (51–65) — Phase 7

- [x] 51. Instagram feed section for @the_calcutta_classics (static curated grid linking out)
- [x] 52. UGC prompt: "Tag #CalcuttaClassics" with example posts
- [x] 53. Testimonials carousel with drag physics
- [x] 54. Google-review style rating strip (seeded data, real link TBD)
- [x] 55. Share any dish card to WhatsApp/X/IG-story (Web Share API + fallback)
- [x] 56. Combo Explorer badge system — visited/tried dishes checklist (localStorage honor system)
- [x] 57. Photo contest section with rules + monthly winner slot
- [x] 58. Newsletter capture form (localStorage queue now; Supabase later — flag-gated)
- [x] 59. Floating WhatsApp click-to-chat glass button
- [x] 60. "Call us" `tel:` CTA in nav + footer
- [x] 61. Table/visit request via prefilled WhatsApp message composer
- [x] 62. Catering/party inquiry form (mailto/WhatsApp compose — no backend)
- [x] 63. Feedback form with emoji scale + optional text
- [x] 64. "Vote the next menu item" poll (localStorage, animated results)
- [x] 65. Refer-a-friend: generates a shareable invite card image

## Visual & interactive layer (66–85) — Phases 4 & 8

- [x] 66. R3F hero: floating 3D momo (primitives/lathe — no heavy GLB) with slow idle rotation, mouse parallax
- [x] 67. GPU steam particles rising through the hero
- [x] 68. Hero video background under a glass info panel
- [ ] 69. Glass navbar that condenses on scroll
- [ ] 70. Chili custom cursor + hover states (desktop only)
- [ ] 71. Magnetic buttons with spring physics
- [ ] 72. Multi-layer parallax food imagery between sections
- [ ] 73. GSAP ScrollTrigger reveals: clip-path unmasks, staggered text, image scale-settle
- [ ] 74. Lenis smooth scroll wired into ScrollTrigger
- [ ] 75. Horizontal pinned scroll section for Signature Combos
- [ ] 76. 3D perspective tilt on dish cards (pointer-tracked, springy)
- [x] 77. Kinetic typography hero headline (per-word stagger, Bengali accent word)
- [ ] 78. Dish-name marquee divider strips
- [x] 79. View Transitions API page morphs (dish card → dish page image morph)
- [ ] 80. Dark/light mode with animated sun/steam toggle (dark default)
- [ ] 81. Animated SVG steam-curve section dividers
- [ ] 82. Particle burst micro-interactions (favorite, quiz result, wheel win)
- [ ] 83. Lottie/light SVG animated icons for categories
- [ ] 84. Branded skeleton shimmer for every image while loading
- [ ] 85. Optional subtle UI sounds (sizzle on wheel spin) — OFF by default, toggle in footer

## Signature loading system (86–92) — Phase 2

- [x] 86. First-visit preloader "The Steam Ritual" (sessionStorage-gated, max 2.5s, skippable)
- [x] 87. Preloader variants rotate per visit (coffee pour / fish fry flip / basket steam)
- [x] 88. Route-level `loading.tsx` = branded glass skeletons (never spinners)
- [x] 89. Progress counter with optional Bengali numerals (১২৩) tied to language toggle
- [x] 90. Micro top-bar loader for soft navigations (2px momo-gold bar)
- [x] 91. `prefers-reduced-motion` variant: static logo + fade, zero animation
- [x] 92. Preloader doubles as preload gate (hero poster, display font, first 6 dish images)

## Performance, PWA, SEO, a11y (93–110) — Phase 9

- [ ] 93. `next/image` everywhere: AVIF/WebP, correct `sizes`, blur placeholders
- [x] 94. `priority` + `fetchpriority=high` on the LCP hero image/poster only
- [ ] 95. RSC/SSG for all routes; ISR (daily) for specials
- [ ] 96. `next/font` self-hosted subsets, `display: swap`, zero layout shift from fonts
- [ ] 97. Route prefetching on viewport links; hover-intent prefetch for dish pages
- [ ] 98. Three.js + GSAP heavy scenes dynamically imported, idle-loaded, viewport-rendered, DPR ≤1.5, paused on `visibilitychange`
- [x] 99. Hero video: poster-first, `preload="none"`, mounted post-LCP, ≤2MB, off-screen pause
- [ ] 100. Performance budget enforced: Lighthouse mobile ≥95, LCP <2.0s, CLS <0.05, INP <200ms
- [ ] 101. PWA: installable, manifest, offline page + cached menu
- [ ] 102. Structured data: `Restaurant` + `Menu` + `MenuItem` + `LocalBusiness` JSON-LD
- [ ] 103. Dynamic OG images per dish via `next/og`
- [ ] 104. `sitemap.xml`, `robots.txt`, canonical URLs
- [ ] 105. Local SEO metadata patterns ("momos in Shyambazar", "street food North Kolkata")
- [ ] 106. Vercel Analytics + Speed Insights
- [ ] 107. WCAG 2.1 AA: focus-visible rings, semantic landmarks, alt text, contrast, full keyboard nav
- [ ] 108. Fun 404 with rolling-momo animation + menu shortcut links
- [ ] 109. Error boundary with "kitchen mishap" illustration + retry
- [x] 110. Supabase auth scaffold behind `NEXT_PUBLIC_ENABLE_AUTH` flag: `lib/supabase.ts`, `(auth)` route group, proxy (middleware) stub, `AUTH_TODO.md` — no visible UI while flag is false
