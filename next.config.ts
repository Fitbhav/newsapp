/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pinimg.com",
        port: "",
        pathname: "/originals/**",
      },
      {
        protocol: "https",
        hostname: "tse2.mm.bing.net",
        port: "",
        pathname: "/th/id/**",
      },
      {
        protocol: "https",
        hostname: "in.images.search.yahoo.com",
        port: "",
        pathname: "/images/view*",
      },
    ],
  },
};

module.exports = nextConfig;
