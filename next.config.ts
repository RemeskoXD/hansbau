import type { NextConfig } from "next";

const isExport = process.env.NEXT_OUTPUT === "export";

const nextConfig: NextConfig = {
  output: isExport ? "export" : "standalone",
  trailingSlash: true,
  images: {
    unoptimized: isExport,
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hansbau.cz",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/rekonstrukce-bytu-domu-i-komercnich-prostor/",
        destination: "/rekonstrukce-bytu/",
        permanent: true,
      },
      {
        source: "/malirske-a-povrchove-upravy/",
        destination: "/rekonstrukce-koupelny/",
        permanent: true,
      },
      {
        source: "/fasadni-prace/",
        destination: "/zednicke-prace/",
        permanent: true,
      },
      {
        source: "/obkladacske-a-podlaharske-prace/",
        destination: "/zednicke-prace/",
        permanent: true,
      },
      {
        source: "/sadrokartonarske-prace/",
        destination: "/zednicke-prace/",
        permanent: true,
      },
      {
        source: "/ploty-a-exterierove-upravy/",
        destination: "/zednicke-prace/",
        permanent: true,
      },
      {
        source: "/de/:path*",
        destination: "/",
        permanent: true,
      },
    ];
  },
  async headers() {
    if (isExport) return [];
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
