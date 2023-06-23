/** @type {import('next').NextConfig} */
const basePath = '/member'
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
  },
  basePath,
};

module.exports = nextConfig;
