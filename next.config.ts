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
      // 1. Old WordPress Service Pages (Permanent 301 SEO redirects)
      {
        source: "/rekonstrukce-bytu-domu-i-komercnich-prostor/:path*",
        destination: "/rekonstrukce-bytu/",
        permanent: true,
      },
      {
        source: "/malirske-a-povrchove-upravy/:path*",
        destination: "/zednicke-prace/",
        permanent: true,
      },
      {
        source: "/fasadni-prace/:path*",
        destination: "/zednicke-prace/",
        permanent: true,
      },
      {
        source: "/obkladacske-a-podlaharske-prace/:path*",
        destination: "/zednicke-prace/",
        permanent: true,
      },
      {
        source: "/sadrokartonarske-prace/:path*",
        destination: "/zednicke-prace/",
        permanent: true,
      },
      {
        source: "/ploty-a-exterierove-upravy/:path*",
        destination: "/zednicke-prace/",
        permanent: true,
      },

      // 2. Old German/Language Pages
      {
        source: "/kontakt-de/:path*",
        destination: "/kontakt/",
        permanent: true,
      },
      {
        source: "/de/:path*",
        destination: "/",
        permanent: true,
      },

      // 3. Old WordPress uploads & image URLs preservation
      {
        source: "/wp-content/uploads/:year(\\d{4})/:month(\\d{2})/:file",
        destination: "/images/:file",
        permanent: true,
      },
      {
        source: "/wp-content/uploads/elementor/screenshots/:file",
        destination: "/images/:file",
        permanent: true,
      },

      // 4. Old WordPress system feeds & admin
      {
        source: "/feed/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/wp-admin/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/wp-login.php",
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
