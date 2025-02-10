/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "randomuser.me",
      },
    ],
  },

  experimental: {
    serverActions: {
      bodySizeLimit: "5mb",
    },
    runtime: "nodejs",
  },

  eslint: {
    ignoreDuringBuilds: true, // ✅ Skips ESLint during the Vercel build to avoid serialization errors
  },
};

export default nextConfig;
