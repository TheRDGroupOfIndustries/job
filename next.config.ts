import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  }, 
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "rxjs": path.resolve(__dirname, "node_modules/rxjs"),
      "rxjs/operators": path.resolve(__dirname, "node_modules/rxjs/operators"),
    };
    return config;
  },
};

export default nextConfig;
