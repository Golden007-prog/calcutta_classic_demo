/**
 * Single source of truth for shop facts and copy.
 * TBD items (fill these when confirmed — the UI degrades gracefully):
 *  - contact.phone / contact.whatsapp  → 10-digit number as "+91XXXXXXXXXX"
 *  - ordering.googleReviews            → Google Maps review link
 *  - Crispy Chicken Pizza price        → data/menu.ts (price: null)
 * Zomato/Swiggy are intentionally null forever — the shop is not on delivery apps.
 */
export const site = {
  name: "The Calcutta Classics",
  shortName: "Calcutta Classics",
  tagline: "Made with Love & Spices",
  brandLines: [
    "Made with Love & Spices",
    "Bite into happiness",
    "Comfort food at its best",
  ] as const,
  description:
    "Steam momos, crackling bhetki fish fry and the legendary ₹20 Belgian Coffee — street food made with love & spices in Shyambazar, North Kolkata, opposite Deshbandhu Park.",
  instagram: {
    handle: "@the_calcutta_classics",
    url: "https://www.instagram.com/the_calcutta_classics/",
  },
  hashtag: "#CalcuttaClassics",
  location: {
    addressLine: "Opposite Deshbandhu Park, Shyambazar",
    area: "Shyambazar",
    city: "Kolkata",
    state: "West Bengal",
    country: "IN",
    landmark: "Deshbandhu Park",
    nearestMetro: "Shyambazar Metro",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=The%20Calcutta%20Classics%2C%20opposite%20Deshbandhu%20Park%2C%20Shyambazar%2C%20Kolkata",
  },
  contact: {
    /** TBD — set to "+91XXXXXXXXXX" when confirmed. */
    phone: null as string | null,
    /** TBD — usually same as phone. */
    whatsapp: null as string | null,
  },
  hours: {
    timezone: "Asia/Kolkata",
    /** Every day, 12:00 PM – 10:00 PM IST. */
    weekly: [{ days: [0, 1, 2, 3, 4, 5, 6], open: "12:00", close: "22:00" }],
    label: "12 PM – 10 PM, every day",
  },
  ordering: {
    dineIn: true,
    /** Not on delivery apps — keep these null and the buttons hidden. */
    zomato: null,
    swiggy: null,
    showDeliveryApps: false,
    /** TBD — Google Maps review link. */
    googleReviews: null as string | null,
  },
} as const;

export type Site = typeof site;
