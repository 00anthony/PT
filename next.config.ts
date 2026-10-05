import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Old single-page anchors that may be bookmarked or linked from Google Ads.
      { source: "/terms", destination: "/privacy-policy", permanent: true },
    ];
  },
};

export default nextConfig;
