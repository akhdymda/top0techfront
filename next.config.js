/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  env: {
    API_ENDPOINT: process.env.API_ENDPOINT,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'https',
        hostname: 'app-002-step3-2-node-oshima12.azurewebsites.net',
      },
    ],
    domains: ['images.unsplash.com', 'app-002-step3-2-node-oshima12.azurewebsites.net'],
  },
}

module.exports = nextConfig
