const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  pageExtensions: ["js", "jsx", "ts", "tsx"],
  webpack: (config) => {
    config.resolve.alias["@"] = path.resolve(__dirname, "../src");
    return config;
  },
};

module.exports = nextConfig;
