import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "./site";
import { LOCALE } from "./locale";
import { languageAlternates, localizedPath } from "./i18n";

export function pageMetadata(title: string, description: string, path: string): Metadata {
  const canonical = `${SITE_URL}${localizedPath(path, LOCALE)}`;
  const pageTitle = `${title} | ${SITE_NAME}`;
  const image = { url: `${SITE_URL}/og/century-ai-eu${LOCALE === "de" ? "-de" : ""}.png`, width: 1200, height: 630, alt: "Century — Accelerate AI transformation across your business." };
  return { title: pageTitle, description, alternates: { canonical, languages: languageAlternates(path, SITE_URL) }, openGraph: { title: pageTitle, description, url: canonical, type: "website", siteName: SITE_NAME, locale: LOCALE === "de" ? "de_DE" : "en_GB", alternateLocale: LOCALE === "de" ? "en_GB" : "de_DE", images: [image] }, twitter: { card: "summary_large_image", title: pageTitle, description, images: [image] } };
}
