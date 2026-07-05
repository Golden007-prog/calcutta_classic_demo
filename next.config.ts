import createMDX from "@next/mdx";
import type { NextConfig } from "next";

/**
 * GITHUB_PAGES=true builds a static export for github.io project hosting:
 * no image optimizer / middleware there, and the site lives under
 * /calcutta_classic_demo, so every route and asset gets the basePath.
 */
const isGitHubPages = process.env.GITHUB_PAGES === "true";
const basePath = isGitHubPages ? "/calcutta_classic_demo" : "";

const nextConfig: NextConfig = {
  reactCompiler: true,
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  images: {
    formats: ["image/avif", "image/webp"],
    ...(isGitHubPages && { unoptimized: true }),
  },
  ...(isGitHubPages && {
    output: "export" as const,
    basePath,
    trailingSlash: true,
  }),
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
