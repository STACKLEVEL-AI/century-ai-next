"use client";

import { Check } from "lucide-react";
import { usePathname } from "next/navigation";
import { defaultLocale, localeSettings, localeForPath, localizedPath, type Locale } from "@/lib/i18n";
import styles from "./Header.module.css";

// Menu priority is independent of the shared locale registry order.
const menuLocales: readonly Locale[] = ["en", "de", "fr", "be", "es", "it", "nl", "pl", "cs", "ro", "sr", "uk"];

/** Native links also work before hydration; the language is stored in the URL. */
export default function LanguageSwitcher({ locale: providedLocale }: { locale?: Locale } = {}) {
  const pathname = usePathname() || localizedPath("/", providedLocale ?? defaultLocale);
  const locale = providedLocale ?? localeForPath(pathname);

  return (
    <details className={styles.language} name="desktop-navigation" data-header-disclosure>
      <summary aria-label={localeSettings[locale].accessibleLabel}>{locale.toUpperCase()}</summary>
      <div className={styles.languagePanel}>
        {menuLocales.map(language => (
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
            {localeSettings[language].label}
            {language === locale && <Check size={14} aria-hidden="true" />}
          </a>
        ))}
      </div>
    </details>
  );
}
