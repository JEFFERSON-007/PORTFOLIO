/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/PORTFOLIO',
  assetPrefix: '/PORTFOLIO/',
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  transpilePackages: ['three'],
};

export default nextConfig;
