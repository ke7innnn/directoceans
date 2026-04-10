import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    turbopack: {
      resolveAlias: {},
      resolveFallback: {},
    },
  },
};

export default nextConfig;
