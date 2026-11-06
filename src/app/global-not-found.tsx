import type { Metadata } from "next";
import Document from "@/components/Document";
import { defaultLocale, locales, localeSettings, localizedPath } from "@/lib/i18n";

export const metadata: Metadata = {
  title: `${locales.map(locale => localeSettings[locale].notFound.title).join(" / ")} | Century`,
  robots: { index: false, follow: true },
};

// GitHub Pages serves one 404 document; every language works without JavaScript.
export default function GlobalNotFound() {
  return <Document locale={defaultLocale}>
    <main className="bilingual-error" id="main-content">
      <a className="error-brand" href="/" aria-label="Century home"><img src="/brand/century-logo.svg" width="221" height="58" alt="Century" /></a>
      {locales.map(locale => {
        const copy = localeSettings[locale].notFound;
        const isDefault = locale === defaultLocale;
        return <section key={locale} lang={locale} aria-labelledby={`error-${locale}`}>
          {isDefault && <p className="eyebrow">404</p>}
          {isDefault ? <h1 id={`error-${locale}`}>{copy.title}</h1> : <h2 id={`error-${locale}`}>{copy.title}</h2>}
          <p>{copy.description}</p>
          <a className={isDefault ? "btn btn-primary" : "btn btn-outline"} href={localizedPath("/", locale)} hrefLang={locale} lang={locale}>{copy.homeLabel}</a>
        </section>;
      })}
    </main>
  </Document>;
}
