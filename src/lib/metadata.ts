import type { Metadata } from "next";
import { localizedPath, type SiteLocale } from "./i18n";
import { SITE_NAME, SITE_URL } from "./site";

export function languageAlternates(path: string) {
  return {
    en: `${SITE_URL}${localizedPath(path, "en")}`,
    pl: `${SITE_URL}${localizedPath(path, "pl")}`,
    "x-default": `${SITE_URL}${localizedPath(path, "en")}`,
  };
}

export function pageMetadata(title: string, description: string, path: string, locale: SiteLocale = "en"): Metadata {
  const canonical = `${SITE_URL}${localizedPath(path, locale)}`;
  const polishProductTitles: Record<string, string> = {
    "Century AI Platform": "Century AI Platform — platforma AI dla firm",
    "Century Agents": "Century Agents — agenci AI dla firm",
    "Century Systems": "Century Systems — systemy AI i automatyzacja procesów",
    "Century AI Gateway": "Century AI Gateway — dostęp do modeli AI",
  };
  const localizedTitle = locale === "pl" ? polishProductTitles[title] ?? title : title;
  const pageTitle = `${localizedTitle} | ${SITE_NAME}`;
  const image = {
    url: `${SITE_URL}/og/century-ai-${locale === "pl" ? "pl" : "eu"}.png`,
    width: 1200,
    height: 630,
    alt: locale === "pl" ? "Century — Przyspiesz transformację AI w swojej firmie" : "Century — Accelerate AI transformation across your business.",
  };
  return {
    title: pageTitle,
    description,
    alternates: { canonical, languages: languageAlternates(path) },
    openGraph: {
      title: pageTitle, description, url: canonical, type: "website", siteName: SITE_NAME,
      locale: locale === "pl" ? "pl_PL" : "en_GB",
      alternateLocale: locale === "pl" ? ["en_GB"] : ["pl_PL"],
      images: [image],
    },
    twitter: { card: "summary_large_image", title: pageTitle, description, images: [image] },
  };
}

export function homeMetadata(title: string, description: string, locale: SiteLocale = "en"): Metadata {
  const metadata = pageMetadata(title, description, "/", locale);
  return {
    ...metadata,
    title,
    robots: { index: true, follow: true },
    openGraph: { ...metadata.openGraph, title },
    twitter: { ...metadata.twitter, title },
  };
}
