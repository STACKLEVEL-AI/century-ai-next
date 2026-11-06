import { SITE_URL } from "./site";

export const locales = ["en", "de", "pl"] as const;
export type Locale = (typeof locales)[number];
export type SiteLocale = Locale;

/** The URL is the language preference; no cookie or browser storage is used. */
export function localeForPath(pathname: string): Locale {
  const match = pathname.match(/^\/(de|pl)(?=\/|[?#]|$)/);
  return match ? match[1] as Locale : "en";
}

/** Locale applies to content routes, never external URLs or shared assets. */
export function localizedPath(path: string, locale: Locale): string {
  if (!path.startsWith("/") || path.startsWith("//")) return path;
  const match = path.match(/^([^?#]*)(.*)$/)!;
  let pathname = match[1];
  if (/\.[^/]+$/.test(pathname) || /^\/(?:media|brand|fonts|founders|images|og|_next)(?:\/|$)/.test(pathname)) return path;
  pathname = pathname.replace(/^\/(?:de|pl)(?=\/|$)/, "") || "/";
  if (!pathname.endsWith("/")) pathname += "/";
  return (locale === "en" ? pathname : `/${locale}${pathname}`) + match[2];
}

export function englishPath(pathname: string): string {
  return localizedPath(pathname, "en");
}

export function languageAlternates(path: string, siteUrl: string = SITE_URL) {
  const origin = siteUrl.replace(/\/+$/, "");
  return {
    en: `${origin}${localizedPath(path, "en")}`,
    de: `${origin}${localizedPath(path, "de")}`,
    pl: `${origin}${localizedPath(path, "pl")}`,
    "x-default": `${origin}${localizedPath(path, "en")}`,
  };
}

export function guideCountLabel(count: number, category: string | undefined, locale: Locale): string {
  if (locale === "pl") {
    const form = new Intl.PluralRules("pl").select(count);
    const noun = form === "one" ? "poradnik" : form === "few" ? "poradniki" : "poradników";
    return `${count} ${noun}${category ? ` w kategorii „${category}”` : " do odkrycia"}`;
  }
  if (locale === "de") {
    return `${count} ${count === 1 ? "Leitfaden" : "Leitfäden"}${category ? ` in der Kategorie ${category}` : " zum Entdecken"}`;
  }
  return `${count} ${count === 1 ? "guide" : "guides"}${category ? ` in ${category.toLowerCase()}` : " to explore"}`;
}
