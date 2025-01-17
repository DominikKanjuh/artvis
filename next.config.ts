import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["images.metmuseum.org"],
  },
  output: "standalone",
};

export default nextConfig;
