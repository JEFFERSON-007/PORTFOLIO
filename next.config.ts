/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/PORTFOLIO',
  assetPrefix: '/PORTFOLIO/',
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
  transpilePackages: ['three'],
};

export default nextConfig;
