/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  env: {
    NEXT_PUBLIC_API_ENDPOINT: process.env.NEXT_PUBLIC_API_ENDPOINT || 'https://app-002-step3-2-py-oshima12.azurewebsites.net',
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_ENDPOINT || 'https://app-002-step3-2-py-oshima12.azurewebsites.net'}/:path*`,
      },
    ];
  }
}

module.exports = nextConfig
