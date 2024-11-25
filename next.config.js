/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets-global.website-files.com',
      },
      {
        protocol: 'https',
        hostname: 'api.producthunt.com',
      },
      {
        protocol: 'https',
        hostname: 'assets.capterra.com',
      },
      {
        protocol: 'https',
        hostname: 'vakily.app',
      },
      {
        protocol: 'https',
        hostname: 'ssl.gstatic.com',
      },
      {
        protocol: 'https',
        hostname: 'plp-home-ui.s3.ap-south-1.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'lawinzo-profile-dev.s3.ap-south-1.amazonaws.com/images',
      },
    ],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

module.exports = nextConfig;
