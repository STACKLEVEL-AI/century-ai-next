import type { Metadata } from "next";
import { languageAlternates, locales, localeSettings, localizedPath, type Locale } from "./i18n";
import { LOCALE } from "./locale";
import { SITE_NAME, SITE_URL } from "./site";

export function pageMetadata(title: string, description: string, path: string, locale: Locale = LOCALE): Metadata {
  const canonical = `${SITE_URL}${localizedPath(path, locale)}`;
  const settings = localeSettings[locale];
  const localizedTitle = (settings.productTitles as Record<string, string>)[title] ?? title;
  const pageTitle = `${localizedTitle} | ${SITE_NAME}`;
  const image = {
    url: `${SITE_URL}${settings.socialImage}`,
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
      alternateLocale: locales.filter(other => other !== locale).map(other => localeSettings[other].openGraphLocale),
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
