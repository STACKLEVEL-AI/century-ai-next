import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { SITE_ROUTES } from "@/lib/routes";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [...new Set(SITE_ROUTES)].map(path => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: path === "/" || path === "/blog/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path.startsWith("/blog/") ? 0.7 : 0.8,
  }));
}
