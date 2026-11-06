import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "./site";
import { LOCALE } from "./locale";
import { alternateOpenGraphLocales, languageAlternates, localizedPath, openGraphLocale, socialImagePath } from "./i18n";

export function pageMetadata(title: string, description: string, path: string): Metadata {
  const canonical = `${SITE_URL}${localizedPath(path, LOCALE)}`;
  const pageTitle = `${title} | ${SITE_NAME}`;
  const image = { url: `${SITE_URL}${socialImagePath(LOCALE)}`, width: 1200, height: 630, alt: "Century — Accelerate AI transformation across your business." };
  return { title: pageTitle, description, alternates: { canonical, languages: languageAlternates(path, SITE_URL) }, openGraph: { title: pageTitle, description, url: canonical, type: "website", siteName: SITE_NAME, locale: openGraphLocale(LOCALE), alternateLocale: alternateOpenGraphLocales(LOCALE), images: [image] }, twitter: { card: "summary_large_image", title: pageTitle, description, images: [image] } };
}
