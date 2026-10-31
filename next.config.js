/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  optimizeFonts: false,
  images: {
    domains: ["images.unsplash.com", "avatars.githubusercontent.com"],
  },
};

module.exports = nextConfig;
