import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { SITE_ROUTES } from "@/lib/routes";
import { locales, languageAlternates, localizedPath } from "@/lib/i18n";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [...new Set(SITE_ROUTES)].flatMap(path => locales.map(locale => ({
    url: `${SITE_URL}${localizedPath(path, locale)}`,
    alternates: { languages: languageAlternates(path, SITE_URL) },
    changeFrequency: path === "/" || path === "/blog/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path.startsWith("/blog/") ? 0.7 : 0.8,
  })));
}
