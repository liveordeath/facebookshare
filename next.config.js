/** @type {import('next').NextConfig} */
const nextConfig = {
  // Bỏ output: 'export' để hỗ trợ API routes trên Vercel
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Bỏ assetPrefix và basePath cho Vercel
  serverExternalPackages: ['fs']
}

module.exports = nextConfig
