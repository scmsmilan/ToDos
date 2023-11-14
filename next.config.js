/** @type {import('next').NextConfig} */
const nextConfig = {
  // images: {
  //   domains: ["lh3.googleusercontent.com"],
  // },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.googleusercontent.com",
      },
    ],
  },
};

module.exports = nextConfig;
