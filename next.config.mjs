/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  output: "export", // static export -> generates the `out/` folder for Netlify drag-and-drop
  images: { unoptimized: true },
  trailingSlash: true,
};
export default nextConfig;
