import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/data";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = siteConfig.url;

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
      {
        userAgent: [
          "Googlebot",
          "Googlebot-Image",
          "Bingbot",
          "Slurp",
          "DuckDuckBot",
          "Baiduspider",
          "YandexBot",
          "Sogou",
          "Exabot",
          "facebot",
          "ia_archiver"
        ],
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "OAI-SearchBot",
          "PerplexityBot",
          "ClaudeBot",
          "Claude-Web",
          "Anthropic-AI",
          "Google-Extended",
          "Applebot-Extended",
          "CCBot",
          "cohere-ai",
          "Meta-ExternalAgent",
          "FacebookBot",
          "Bytespider",
          "Amazonbot",
          "DuckAssistBot"
        ],
        allow: ["/", "/llms.txt", "/llms-full.txt", "/sitemap.xml"],
        disallow: ["/api/", "/admin/"],
      }
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
