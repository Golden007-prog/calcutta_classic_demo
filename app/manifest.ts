import type { MetadataRoute } from "next";

/** Feature 101 — installable PWA manifest. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "The Calcutta Classics",
    short_name: "Calcutta Classics",
    description:
      "Steam momos, bhetki fish fry and the ₹20 Belgian Coffee — Shyambazar, Kolkata. Menu works even on Metro Wi-Fi.",
    start_url: "/",
    display: "standalone",
    background_color: "#0F0F10",
    theme_color: "#0F0F10",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
