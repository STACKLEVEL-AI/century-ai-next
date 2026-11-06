"use client";

import { Check } from "lucide-react";
import { usePathname } from "next/navigation";
import { languages, localizedPath, type Locale } from "@/lib/i18n";
import styles from "./Header.module.css";

/** Native links also work before hydration; the language is stored in the URL. */
export default function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname() || "/";
  return <details className={styles.language} name="desktop-navigation" data-header-disclosure>
    <summary aria-label={languages.find(language => language.code === locale)!.accessibleLabel}>{locale.toUpperCase()}</summary>
    <div className={styles.languagePanel}>
      {languages.map(({ code, label }) => (
        code === locale
          ? <span key={code} lang={code} aria-current="true" data-language-current={code}>{label}<Check size={14} aria-hidden="true" /></span>
          : <a key={code} lang={code} hrefLang={code} data-language-switch={code} href={localizedPath(pathname, code)} onClick={event => {
            event.currentTarget.href = localizedPath(pathname, code) + window.location.search + window.location.hash;
          }}>{label}</a>
      ))}
    </div>
  </details>;
}
