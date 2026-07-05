# AUTH_TODO — the 15-minute enable path

Login is **ON HOLD**. The scaffold exists, nothing is visible in the UI, and
nothing imports Supabase at runtime while the flag is off.

## What already exists

| Piece | Where | Status |
| --- | --- | --- |
| Supabase client (lazy singleton) | `lib/supabase.ts` | ready |
| Env vars (URL + publishable key) | `.env.local` / `.env.example` | ready |
| Feature flag | `NEXT_PUBLIC_ENABLE_AUTH` → `lib/flags.ts` | `false` |
| Auth route group | `app/(auth)/auth/page.tsx` | 404s while flag is off |
| Proxy (middleware) stub | `proxy.ts` | redirects `/auth/*` → `/` while flag is off |
| Supabase project | `vnfbugpjijlxgfwnciwy` (ap-south-1) | live, empty schema |

## To enable (≈15 min)

1. **Flip the flag** — set `NEXT_PUBLIC_ENABLE_AUTH=true` in `.env.local`
   (and in Vercel project env for deploys). Restart dev server.
2. **Turn on providers** in Supabase Dashboard → Authentication → Providers
   (email OTP or Google are the low-friction picks for a foodie site).
3. **Add the UI** in `app/(auth)/auth/page.tsx`: swap the placeholder panel
   for a small client form calling `getSupabase().auth.signInWithOtp(...)`
   into a Glass panel — design tokens already apply.
4. **Session handling**: for anything server-rendered per-user, add
   `@supabase/ssr`, create a server client, and refresh sessions in
   `proxy.ts` (the flag check is already there; add the session refresh
   inside the `=== "true"` branch).
5. **Surface it**: add a small "Sign in" item to `Navbar`/`Footer` gated on
   `AUTH_ENABLED` from `lib/flags.ts` — grep for `AUTH_ENABLED` to find the
   gate points.
6. **RLS first**: before storing anything (favorites, newsletter), create
   tables with RLS enabled and policies scoped to `auth.uid()`.

## Later (flag-gated features waiting on auth)

- Newsletter capture (feature 58) — currently queues to localStorage.
- Cross-device favorites sync (feature 33) — currently zustand + localStorage.
