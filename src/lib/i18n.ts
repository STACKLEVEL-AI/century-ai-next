export type SiteLocale = "en" | "pl";

/** The URL is the language preference; no cookie or browser storage is used. */
export function localeForPath(pathname: string): SiteLocale {
  return pathname === "/pl" || pathname.startsWith("/pl/") ? "pl" : "en";
}

export function englishPath(pathname: string): string {
  const path = pathname.replace(/^\/pl(?=\/|$)/, "") || "/";
  return path.endsWith("/") ? path : `${path}/`;
}

export function localizedPath(pathname: string, locale: SiteLocale): string {
  const path = englishPath(pathname);
  return locale === "pl" ? `/pl${path}` : path;
}

export function guideCountLabel(count: number, category: string | undefined, locale: SiteLocale): string {
  if (locale === "pl") {
    const form = new Intl.PluralRules("pl").select(count);
    const noun = form === "one" ? "poradnik" : form === "few" ? "poradniki" : "poradników";
    return `${count} ${noun}${category ? ` w kategorii „${category}”` : " do odkrycia"}`;
  }
  return `${count} ${count === 1 ? "guide" : "guides"}${category ? ` in ${category.toLowerCase()}` : " to explore"}`;
}
