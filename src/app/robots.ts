import type { MetadataRoute } from "next";

// Allow everything and point crawlers at the sitemap.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://www.linseyfox.com/sitemap.xml",
  };
}
