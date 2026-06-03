import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  // Allow opening the dev server from a LAN IP (e.g. testing on a phone) so
  // HMR / _next dev resources are not blocked as cross-origin. Add any extra
  // hosts/IPs you use here. Has no effect on the static `output: export` build.
  allowedDevOrigins: ["172.16.15.230"],
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
    ],
  },
};

export default nextConfig;
