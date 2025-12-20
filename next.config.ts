import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  // ลด concurrent builds เพื่อป้องกัน API rate limiting
  experimental: {
    workerThreads: false,
    cpus: 1,
  },
};

export default nextConfig;
