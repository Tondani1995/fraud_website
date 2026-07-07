import type { NextConfig } from "next";

const scoreApp = "https://mk-fraud-readiness-score.vercel.app";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/score/:path*",
        destination: `${scoreApp}/score/:path*`,
      },
      {
        source: "/api/assessments/:path*",
        destination: `${scoreApp}/score/api/assessments/:path*`,
      },
    ];
  },
};

export default nextConfig;
