import type { Metadata } from "next";
import SiteDocument from "@/components/site/SiteDocument";

export const metadata: Metadata = {
  title: "404 — Nie znaleziono strony / Page not found | Century",
  robots: { index: false, follow: true },
};

// GitHub Pages serves one 404.html for unknown URLs in either language.
export default function GlobalNotFound() {
  return <SiteDocument locale="pl">
    <main className="error-hero bilingual-error" id="main-content">
      <div className="shell">
        <a href="/pl/" aria-label="Century — strona główna"><img src="/brand/century-logo.svg" width="221" height="58" alt="Century" /></a>
        <section lang="pl" aria-labelledby="error-pl">
          <p className="eyebrow">404</p>
          <h1 id="error-pl">Nie znaleziono strony</h1>
          <p className="inner-hero-description">Strona mogła zmienić adres. Poznaj platformę Century i zespół, który ją tworzy</p>
          <a className="btn btn-primary" href="/pl/" hrefLang="pl">Wróć do strony głównej</a>
        </section>
        <section lang="en" aria-labelledby="error-en">
          <h2 id="error-en">Page not found</h2>
          <p>This page may have moved. Explore Century in English.</p>
          <a className="btn btn-outline" href="/" hrefLang="en">Back to Century</a>
        </section>
      </div>
    </main>
  </SiteDocument>;
}
