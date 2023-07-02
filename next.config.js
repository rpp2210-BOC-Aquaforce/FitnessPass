/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    forceSwcTransforms: true,
    serverActions: true,
  },
};

module.exports = nextConfig;
