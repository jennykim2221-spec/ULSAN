import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  allowedDevOrigins: ['127.0.0.1'],
  images: {
    // Foundation uses original JPEGs from /public/assets/images
    // Optimizer remains available; static export path TBD in Polish phase
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [320, 480, 640, 960, 1280, 1600, 1920],
    imageSizes: [280, 340, 360, 400, 420, 440, 480, 520, 570, 640],
  },
  // Ensure Korean filenames with spaces/middle dots are served correctly
  trailingSlash: false,
};

export default nextConfig;
