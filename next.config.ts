import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  async rewrites() {
    return [
      // Rewrite /app/* to the main platform
      {
        source: '/app/:path*',
        destination: 'https://app.bookicorn.com/:path*',
      },
    ]
  },
}

export default nextConfig
