import type { Metadata } from "next";
import Document from "@/components/Document";

export const metadata: Metadata = {
  title: "Page not found / Seite nicht gefunden / Nie znaleziono strony | Century",
  robots: { index: false, follow: true },
};

// GitHub Pages serves one 404 document for unknown paths in every language.
export default function GlobalNotFound() {
  return <Document locale="en">
    <main className="bilingual-error" id="main-content">
      <a className="error-brand" href="/" aria-label="Century home"><img src="/brand/century-logo.svg" width="221" height="58" alt="Century" /></a>
      <section lang="en" aria-labelledby="error-en">
        <p className="eyebrow">404</p>
        <h1 id="error-en">Page not found</h1>
        <p>This page may have moved. Explore the platform, our industry solutions and the people behind Century.</p>
        <a className="btn btn-primary" href="/" hrefLang="en" lang="en">Go to the English homepage</a>
      </section>
      <section lang="de" aria-labelledby="error-de">
        <h2 id="error-de">Seite nicht gefunden</h2>
        <p>Diese Seite wurde möglicherweise verschoben. Entdecken Sie die Plattform, unsere Branchenlösungen und das Team hinter Century.</p>
        <a className="btn btn-outline" href="/de/" hrefLang="de" lang="de">Zur deutschen Startseite</a>
      </section>
      <section lang="pl" aria-labelledby="error-pl">
        <h2 id="error-pl">Nie znaleziono strony</h2>
        <p>Strona mogła zmienić adres. Poznaj platformę, rozwiązania dla branż i zespół Century.</p>
        <a className="btn btn-outline" href="/pl/" hrefLang="pl" lang="pl">Wróć do polskiej strony głównej</a>
      </section>
    </main>
  </Document>;
}
