import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname),
  },
  async redirects() {
    return [
      { source: "/start", destination: "/year", permanent: false },
      { source: "/english", destination: "/hub?tab=english", permanent: false },
      { source: "/maths", destination: "/hub?tab=maths", permanent: false },
    ];
  },
};

export default nextConfig;
