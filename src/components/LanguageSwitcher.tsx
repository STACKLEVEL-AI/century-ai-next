"use client";

import { usePathname } from "next/navigation";
import { Check } from "lucide-react";
import { localeForPath, localizedPath, type SiteLocale } from "@/lib/i18n";
import styles from "./Header.module.css";

export default function LanguageSwitcher() {
  const pathname = usePathname() || "/";
  const locale = localeForPath(pathname);
  return (
    <details className={styles.language} name="desktop-navigation" data-header-disclosure>
      <summary aria-label={locale === "pl" ? "Język: polski" : "Language: English"}>
        {locale.toUpperCase()}
      </summary>
      <div className={styles.languagePanel}>
        {(["en", "pl"] as SiteLocale[]).map(language => (
          <a
            key={language}
            href={localizedPath(pathname, language)}
            hrefLang={language}
            lang={language}
            aria-current={language === locale ? "page" : undefined}
            data-language-switch={language}
            onClick={event => {
              event.currentTarget.href = localizedPath(pathname, language) + window.location.search + window.location.hash;
            }}
          >
            {language === "pl" ? "Polski" : "English"}
            {language === locale && <Check size={14} aria-hidden="true" />}
          </a>
        ))}
      </div>
    </details>
  );
}
