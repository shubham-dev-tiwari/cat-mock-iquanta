/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Skip ESLint during build
    ignoreDuringBuilds: true,
  },
  images: {
    // Allow external images
    domains: ['media.iquanta.in', 'api.dicebear.com'],
  },
}

module.exports = nextConfig
