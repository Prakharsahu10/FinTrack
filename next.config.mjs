/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "randomuser.me",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },

  experimental: {
    serverActions: {
      bodySizeLimit: "5mb",
    },
  },

  eslint: {
    ignoreDuringBuilds: true, // ✅ Skips ESLint during the Vercel build to avoid serialization errors
  },
};

export default nextConfig;
