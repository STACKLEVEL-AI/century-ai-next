export const locales = ["en", "de"] as const;
export type Locale = (typeof locales)[number];

/** Locale applies to content routes, never external URLs or shared assets. */
export function localizedPath(path: string, locale: Locale): string {
  if (!path.startsWith("/") || path.startsWith("//")) return path;
  const match = path.match(/^([^?#]*)(.*)$/)!;
  let pathname = match[1];
  if (/\.[^/]+$/.test(pathname) || /^\/(?:media|brand|fonts|founders|images|og|_next)(?:\/|$)/.test(pathname)) return path;
  pathname = pathname.replace(/^\/de(?=\/|$)/, "") || "/";
  if (!pathname.endsWith("/")) pathname += "/";
  return (locale === "de" ? `/de${pathname}` : pathname) + match[2];
}

export function languageAlternates(path: string, siteUrl: string) {
  return {
    en: `${siteUrl}${localizedPath(path, "en")}`,
    de: `${siteUrl}${localizedPath(path, "de")}`,
    "x-default": `${siteUrl}${localizedPath(path, "en")}`,
  };
}
