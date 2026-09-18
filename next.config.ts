import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.18", "192.168.1.18:3000"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.r2.cloudflarestorage.com", // Sabhi R2 storage subdomains ko allow kar dega
      },
    ],
  },
};

export default nextConfig;