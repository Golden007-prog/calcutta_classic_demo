/**
 * Feature 101 — offline support: "Menu works even on Metro Wi-Fi."
 * Network-first navigations with cache fallback (then /offline), plus
 * stale-while-revalidate for images and static assets. Base-path aware
 * (works at / on Vercel and under /calcutta_classic_demo on github.io).
 */
const CACHE = "cc-v2";
const BASE = new URL(self.registration.scope).pathname.replace(/\/$/, "");
const CORE = [`${BASE}/`, `${BASE}/menu/`, `${BASE}/combos/`, `${BASE}/offline/`, `${BASE}/menu`, `${BASE}/combos`, `${BASE}/offline`];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      // Individual adds: a 308/404 on one path must not break install.
      .then((cache) => Promise.allSettled(CORE.map((url) => cache.add(url))))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Page navigations: network-first → cache → /offline
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(async () => {
          const cached = await caches.match(request);
          if (cached) return cached;
          return (
            (await caches.match(`${BASE}/offline/`)) ??
            (await caches.match(`${BASE}/offline`))
          );
        }),
    );
    return;
  }

  // Images + static assets: stale-while-revalidate
  if (
    url.pathname.startsWith(`${BASE}/images/`) ||
    url.pathname.startsWith(`${BASE}/_next/static/`) ||
    url.pathname.startsWith(`${BASE}/icons/`)
  ) {
    event.respondWith(
      caches.match(request).then((cached) => {
        const network = fetch(request)
          .then((response) => {
            const copy = response.clone();
            caches.open(CACHE).then((cache) => cache.put(request, copy));
            return response;
          })
          .catch(() => cached);
        return cached ?? network;
      }),
    );
  }
});
