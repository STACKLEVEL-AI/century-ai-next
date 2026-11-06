export const locales = ["en", "de", "uk"] as const;
export type Locale = (typeof locales)[number];

export const languages: { code: Locale; label: string; accessibleLabel: string }[] = [
  { code: "en", label: "English", accessibleLabel: "Language: English" },
  { code: "de", label: "Deutsch", accessibleLabel: "Sprache: Deutsch" },
  { code: "uk", label: "Українська", accessibleLabel: "Мова: українська" },
];

const openGraphLocales: Record<Locale, string> = { en: "en_GB", de: "de_DE", uk: "uk_UA" };
export const openGraphLocale = (locale: Locale) => openGraphLocales[locale];
export const alternateOpenGraphLocales = (locale: Locale) => locales.filter(value => value !== locale).map(openGraphLocale);
export const socialImagePath = (locale: Locale) => locale === "uk" ? "/uk/og/century-ai-eu.png" : `/og/century-ai-eu${locale === "de" ? "-de" : ""}.png`;

/** Locale applies to content routes, never external URLs or shared assets. */
export function localizedPath(path: string, locale: Locale): string {
  if (!path.startsWith("/") || path.startsWith("//")) return path;
  const match = path.match(/^([^?#]*)(.*)$/)!;
  let pathname = match[1];
  const base = pathname.replace(/^\/(?:de|uk)(?=\/|$)/, "") || "/";
  if (/\.[^/]+$/.test(base) || /^\/(?:media|brand|fonts|founders|images|og|_next)(?:\/|$)/.test(base)) return path;
  pathname = base;
  if (!pathname.endsWith("/")) pathname += "/";
  return (locale === "en" ? pathname : `/${locale}${pathname}`) + match[2];
}

export function languageAlternates(path: string, siteUrl: string) {
  return {
    en: `${siteUrl}${localizedPath(path, "en")}`,
    de: `${siteUrl}${localizedPath(path, "de")}`,
    uk: `${siteUrl}${localizedPath(path, "uk")}`,
    "x-default": `${siteUrl}${localizedPath(path, "en")}`,
  };
}

export function guideCount(count: number, category: string | null, locale: Locale): string {
  if (locale === "uk") {
    const form = new Intl.PluralRules("uk").select(count);
    const noun = form === "one" ? "посібник" : form === "few" ? "посібники" : "посібників";
    return `${count} ${noun}${category ? ` у категорії «${category}»` : " для ознайомлення"}`;
  }
  if (locale === "de") return `${count} ${count === 1 ? "Leitfaden" : "Leitfäden"}${category ? ` in der Kategorie ${category}` : " zum Entdecken"}`;
  return `${count} ${count === 1 ? "guide" : "guides"}${category ? ` in ${category.toLowerCase()}` : " to explore"}`;
}
