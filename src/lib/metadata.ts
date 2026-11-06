import type { Metadata } from "next";
import { languageAlternates, locales, localizedPath, type Locale } from "./i18n";
import { LOCALE } from "./locale";
import { SITE_NAME, SITE_URL } from "./site";

const localeMetadata: Record<Locale, { openGraphLocale: string; imagePath: string; imageAlt: string }> = {
  en: {
    openGraphLocale: "en_GB",
    imagePath: "/og/century-ai-eu.png",
    imageAlt: "Century — Accelerate AI transformation across your business.",
  },
  de: {
    openGraphLocale: "de_DE",
    imagePath: "/og/century-ai-eu-de.png",
    imageAlt: "Century – Beschleunigen Sie die KI-Transformation in Ihrem Unternehmen.",
  },
  pl: {
    openGraphLocale: "pl_PL",
    imagePath: "/og/century-ai-pl.png",
    imageAlt: "Century — Przyspiesz transformację AI w swojej firmie",
  },
};

const polishProductTitles: Record<string, string> = {
  "Century AI Platform": "Century AI Platform — platforma AI dla firm",
  "Century Agents": "Century Agents — agenci AI dla firm",
  "Century Systems": "Century Systems — systemy AI i automatyzacja procesów",
  "Century AI Gateway": "Century AI Gateway — dostęp do modeli AI",
};

export function pageMetadata(title: string, description: string, path: string, locale: Locale = LOCALE): Metadata {
  const canonical = `${SITE_URL}${localizedPath(path, locale)}`;
  const localizedTitle = locale === "pl" ? polishProductTitles[title] ?? title : title;
  const pageTitle = `${localizedTitle} | ${SITE_NAME}`;
  const settings = localeMetadata[locale];
  const image = {
    url: `${SITE_URL}${settings.imagePath}`,
    width: 1200,
    height: 630,
    alt: settings.imageAlt,
  };
  return {
    title: pageTitle,
    description,
    alternates: { canonical, languages: languageAlternates(path) },
    openGraph: {
      title: pageTitle,
      description,
      url: canonical,
      type: "website",
      siteName: SITE_NAME,
      locale: settings.openGraphLocale,
      alternateLocale: locales.filter(other => other !== locale).map(other => localeMetadata[other].openGraphLocale),
      images: [image],
    },
    twitter: { card: "summary_large_image", title: pageTitle, description, images: [image] },
  };
}

export function homeMetadata(title: string, description: string, locale: Locale = LOCALE): Metadata {
  const metadata = pageMetadata(title, description, "/", locale);
  return {
    ...metadata,
    title,
    robots: { index: true, follow: true },
    openGraph: { ...metadata.openGraph, title },
    twitter: { ...metadata.twitter, title },
  };
}
