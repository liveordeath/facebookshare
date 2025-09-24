/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  assetPrefix: process.env.NODE_ENV === 'production' ? '/tool_fb' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/tool_fb' : '',
}

module.exports = nextConfig
