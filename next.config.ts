import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  // Keeps the old About address working: it moves from /p/about-6fde5b0c to /p/about.
  async redirects() {
    return [{ source: "/p/about-6fde5b0c", destination: "/p/about", permanent: true }];
  },
};

export default nextConfig;
