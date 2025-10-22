import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* config options here */

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            icon: true,
          },
        },
      ],
    });
    return config;
  },

  images: {
    qualities: [75, 80, 85, 100],
    deviceSizes: [360, 640, 768, 1024, 1280, 1600],
    imageSizes: [320, 480, 640, 800, 1024, 1280],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.spoonacular.com",
        pathname: "/**",
      },
    ],
  },

  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.ts",
      },
    },
    resolveAlias: {
      "@Images": path.resolve(__dirname, "./src/app/assets/images"),
    },
  },
  experimental: {
    viewTransition: true,
  },
};

export default nextConfig;
