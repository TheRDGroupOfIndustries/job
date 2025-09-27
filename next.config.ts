import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ], 
    qualities: [75, 90, 100],
  },
};

export default nextConfig;
