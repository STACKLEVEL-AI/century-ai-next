import configuration from "@/locales/config.json";
import { SITE_URL } from "./site";

export const localeSettings = configuration.locales;
export type Locale = keyof typeof localeSettings;
export type SiteLocale = Locale;
export const defaultLocale = configuration.defaultLocale as Locale;
export const locales = Object.keys(localeSettings) as Locale[];

/** The URL is the language preference; no cookie or browser storage is used. */
export function localeForPath(pathname: string): Locale {
  const segment = pathname.match(/^\/([^/?#]+)(?=\/|[?#]|$)/)?.[1];
  return locales.includes(segment as Locale) ? segment as Locale : defaultLocale;
}

/** Locale applies to content routes, never external URLs or shared assets. */
export function localizedPath(path: string, locale: Locale): string {
  if (!path.startsWith("/") || path.startsWith("//")) return path;
  const match = path.match(/^([^?#]*)(.*)$/)!;
  let pathname = match[1];
  const segment = pathname.split("/")[1];
  const base = locales.includes(segment as Locale) ? pathname.slice(segment.length + 1) || "/" : pathname;
  // Inspect after removing the locale as assets may already have a prefix.
  if (/\.[^/]+$/.test(base) || /^\/(?:media|brand|fonts|founders|images|og|_next)(?:\/|$)/.test(base)) return path;
  pathname = base;
  if (!pathname.endsWith("/")) pathname += "/";
  return (locale === defaultLocale ? pathname : `/${locale}${pathname}`) + match[2];
}

export function englishPath(pathname: string): string {
  return localizedPath(pathname, defaultLocale);
}

export function languageAlternates(path: string, siteUrl: string = SITE_URL) {
  const origin = siteUrl.replace(/\/+$/, "");
  const result = Object.fromEntries(locales.map(locale => [locale, `${origin}${localizedPath(path, locale)}`]));
  return { ...result, "x-default": `${origin}${localizedPath(path, defaultLocale)}` };
}

export function guideCountLabel(count: number, category: string | undefined, locale: Locale): string {
  const labels = localeSettings[locale].guideCount;
  const form = new Intl.PluralRules(locale).select(count);
  const noun = form === "one" || form === "few" || form === "many" ? labels[form] : labels.other;
  const suffix = category
    ? labels.category.replace("{category}", labels.lowercaseCategory ? category.toLocaleLowerCase(locale) : category)
    : labels.explore;
  return `${count} ${noun}${suffix}`;
}
