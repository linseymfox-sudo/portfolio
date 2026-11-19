import type { MetadataRoute } from "next";
import { caseStudies } from "@/data/case-studies";

const SITE_URL = "https://www.linseyfox.com";

// Lists every page so search engines can find them all.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/`, priority: 1 },
    { url: `${SITE_URL}/p/about`, priority: 0.6 },
    ...caseStudies.map((c) => ({ url: `${SITE_URL}/p/${c.slug}`, priority: 0.8 })),
  ];
}
