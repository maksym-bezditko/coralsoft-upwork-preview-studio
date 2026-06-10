import type { NextConfig } from "next";

// Served from "/<repo>" on GitHub Pages; empty for local dev / root deploys.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Static HTML export — GitHub Pages serves the generated `out/` directory.
  output: "export",
  basePath: basePath || undefined,
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
