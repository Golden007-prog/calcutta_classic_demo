import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/site-url";

export const dynamic = "force-static";

/** Feature 104 — robots + sitemap pointer. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/auth"] },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
