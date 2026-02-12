import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export', 
  images: {
    unoptimized: true, 
  },
  basePath: process.env.NODE_ENV === 'production' ? '/century-ai-next' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/century-ai-next/' : '',
}

export default nextConfig

