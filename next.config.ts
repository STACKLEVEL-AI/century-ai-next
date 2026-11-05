import type { NextConfig } from "next";

// The Pages workflow only builds and deploys; local builds keep validation.
const deployOnly = process.env.DEPLOY_ONLY === "true";

const nextConfig: NextConfig = {
  output: "export",
  experimental: { globalNotFound: true },
  trailingSlash: true,
  images: { unoptimized: true },
  typescript: { ignoreBuildErrors: deployOnly },
  eslint: { ignoreDuringBuilds: deployOnly },
};

export default nextConfig;
