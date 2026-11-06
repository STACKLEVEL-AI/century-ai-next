import type { Metadata } from "next";
import Document from "@/components/Document";

export const metadata: Metadata = {
  title: "Page not found / Seite nicht gefunden / Сторінку не знайдено | Century",
  robots: { index: false, follow: true },
};

// GitHub Pages serves one 404 document for every unknown path. All three
// language sections and recovery links work without JavaScript.
export default function GlobalNotFound() {
  return <Document locale="en">
    <main className="bilingual-error" id="main-content">
      <section lang="de">
        <p>404 · Century</p>
        <h1>Seite nicht gefunden</h1>
        <p>Diese Seite wurde möglicherweise verschoben. Entdecken Sie die Plattform, unsere Branchenlösungen und das Team hinter Century.</p>
        <a className="btn btn-primary" href="/de/" lang="de" hrefLang="de">Zur deutschen Startseite</a>
      </section>
      <section lang="en">
        <h2>Page not found</h2>
        <p>This page may have moved. Explore the platform, our industry solutions and the people behind Century.</p>
        <a className="btn btn-outline" href="/" lang="en" hrefLang="en">Go to the English homepage</a>
      </section>
      <section lang="uk">
        <h2>Сторінку не знайдено</h2>
        <p>Можливо, цю сторінку переміщено. Дізнайтеся більше про платформу, рішення для вашої галузі та команду Century.</p>
        <a className="btn btn-outline" href="/uk/" lang="uk" hrefLang="uk">На головну українською</a>
      </section>
    </main>
  </Document>;
}
