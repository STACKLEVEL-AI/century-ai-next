"use client";

import { Check } from "lucide-react";
import { usePathname } from "next/navigation";
import { locales, localeForPath, localizedPath, type Locale } from "@/lib/i18n";
import styles from "./Header.module.css";

const languageLabels: Record<Locale, { name: string; summary: string }> = {
  en: { name: "English", summary: "Language: English" },
  de: { name: "Deutsch", summary: "Sprache: Deutsch" },
  pl: { name: "Polski", summary: "Język: polski" },
};

/** Native links also work before hydration; the language is stored in the URL. */
export default function LanguageSwitcher({ locale: providedLocale }: { locale?: Locale } = {}) {
  const pathname = usePathname() || localizedPath("/", providedLocale ?? "en");
  const locale = providedLocale ?? localeForPath(pathname);

  return (
    <details className={styles.language} name="desktop-navigation" data-header-disclosure>
      <summary aria-label={languageLabels[locale].summary}>{locale.toUpperCase()}</summary>
      <div className={styles.languagePanel}>
        {locales.map(language => (
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
            {languageLabels[language].name}
            {language === locale && <Check size={14} aria-hidden="true" />}
          </a>
        ))}
      </div>
    </details>
  );
}
