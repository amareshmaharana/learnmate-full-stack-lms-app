import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: `learnmate-lms-pt.fly.storage.tigris.dev`,
        port: "",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
