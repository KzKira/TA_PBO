/** @type {import('next').NextConfig} */

// 1. Settingan PWA
const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  swcMinify: true,
  disable: process.env.NODE_ENV === "development", // PWA mati saat dev (biar gak ganggu)
  workboxOptions: {
    disableDevLogs: true,
  },
});

// 2. Config Next.js Bawaan Kamu
const nextConfig = {
  experimental: {
    outputFileTracingRoot: undefined,
  },
  output: 'standalone',
  images: {
    // Domain gambar eksternal kamu
    domains: ['drive.google.com', 'lh3.googleusercontent.com', 'lzrhjvjisxjtggmthkps.supabase.co']
  },
};

// 3. Gabungkan keduanya
module.exports = withPWA(nextConfig);