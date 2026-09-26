/** @type {import('next').NextConfig} */
const nextConfig = {
  // Pin the Turbopack workspace root to this project directory so Next.js
  // never infers a wrong root when parent folders contain lockfiles.
  turbopack: {
    root: import.meta.dirname,
  },
};

export default nextConfig;
