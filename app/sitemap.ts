import type { MetadataRoute } from "next";

import { blogPosts } from "@/data/blog";
import { menuItems } from "@/data/menu";
import { SITE_URL } from "@/lib/site-url";

export const dynamic = "force-static";

/** Feature 104 — sitemap over every static route, dish and post. */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/menu",
    "/combos",
    "/our-story",
    "/visit",
    "/foodie-zone",
    "/gallery",
    "/contact",
    "/blog",
  ].map((route) => ({
    url: `${SITE_URL}${route}`,
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const dishes = menuItems.map((item) => ({
    url: `${SITE_URL}/menu/${item.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const posts = blogPosts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...dishes, ...posts];
}
