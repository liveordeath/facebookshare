/** @type {import('next').NextConfig} */
const nextConfig = {
  // Bỏ output: 'export' để hỗ trợ API routes trên Vercel
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Bỏ assetPrefix và basePath cho Vercel
  experimental: {
    serverComponentsExternalPackages: ['fs']
  }
}

module.exports = nextConfig
