import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { SITE_ROUTES } from "@/lib/routes";
import { localizedPath, type SiteLocale } from "@/lib/i18n";
import { languageAlternates } from "@/lib/metadata";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [...new Set(SITE_ROUTES)].flatMap(path => (["en", "pl"] as SiteLocale[]).map(locale => ({
    url: `${SITE_URL}${localizedPath(path, locale)}`,
    changeFrequency: path === "/" || path === "/blog/" ? "weekly" as const : "monthly" as const,
    priority: path === "/" ? 1 : path.startsWith("/blog/") ? 0.7 : 0.8,
    alternates: { languages: languageAlternates(path) },
  })));
}
