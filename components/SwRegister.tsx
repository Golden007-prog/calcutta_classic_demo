"use client";

import { useEffect } from "react";

/** Feature 101 — registers the offline service worker (production only). */
export function SwRegister() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (!("serviceWorker" in navigator)) return;
    navigator.serviceWorker.register("/sw.js").catch(() => {
      /* offline support is progressive enhancement */
    });
  }, []);

  return null;
}
