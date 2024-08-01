/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedForwardedHosts: ['localhost'],
      allowedOrigins: ['http://localhost', 'http://192.168.1.52'],
    },
  },
};

module.exports = nextConfig;
