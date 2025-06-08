/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { 
    unoptimized: true,
    loader: 'custom',
    loaderFile: './imageLoader.js'
  },
  compress: true,
};

module.exports = nextConfig;