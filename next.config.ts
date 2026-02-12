import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export', 
  images: {
    unoptimized: true, 
  },
  basePath: '/century-ai-next',
  assetPrefix: '/century-ai-next/',
}

export default nextConfig