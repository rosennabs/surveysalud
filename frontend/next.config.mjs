

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  pageExtensions: ["js", "jsx", "ts", "tsx"],

  // typescript: {
  //   ignoreBuildErrors: false, // Skip type errors during the build process
  // },
  // eslint: {
  //   ignoreDuringBuilds: true, // Skip ESLint during builds
  // },
};

export default nextConfig;
