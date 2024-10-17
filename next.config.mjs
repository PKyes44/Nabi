/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gxoibjaejbmathfpztjt.supabase.co",
        port: "",
        pathname: "storage/v1/**",
      },
    ],
  },
};

export default nextConfig;
