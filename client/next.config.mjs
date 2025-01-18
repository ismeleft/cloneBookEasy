/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "r-xx.bstatic.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cf.bstatic.com",
        pathname: "/**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination: `${process.env.API_BASE_URL}/api/v1/:path*`,
      },
    ];
  },
};

export default nextConfig;
