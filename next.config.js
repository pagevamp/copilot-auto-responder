/** @type {import('next').NextConfig} */

const withSvgr = require('next-plugin-svgr');
const nextConfig = {
  experimental: {
    serverActions: true,
  },
};

module.exports = withSvgr(nextConfig);
