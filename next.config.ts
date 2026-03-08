import type { NextConfig } from "next";

const bucketUrl = process.env.NEXT_PUBLIC_BUCKET_URL ?? "";
const bucketHost = bucketUrl ? new URL(bucketUrl).hostname : "";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: bucketHost
      ? [{ protocol: "https", hostname: bucketHost }]
      : [],
  },
  async headers() {
    const imgSrc = bucketUrl
      ? `img-src 'self' data: https: blob: ${bucketUrl};`
      : "img-src 'self' data: https: blob:;";
    const connectSrc = bucketUrl
      ? `connect-src 'self' ${bucketUrl};`
      : "connect-src 'self';";

    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Content-Security-Policy",
            value: `default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; ${imgSrc} font-src 'self' https://fonts.gstatic.com; ${connectSrc}`,
          },
        ],
      },
    ];
  },
};

export default nextConfig;
