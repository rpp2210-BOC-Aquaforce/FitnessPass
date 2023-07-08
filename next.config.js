/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    forceSwcTransforms: true,
    serverActions: true,
  },
  images: {
    domains: ['via.placeholder.com', 'images.unsplash.com', 'javqvsvajexkcxuhgiiw.supabase.co'],
  },
};

module.exports = nextConfig;
