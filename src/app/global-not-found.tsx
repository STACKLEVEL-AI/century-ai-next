import type { Metadata } from "next";
import Document from "@/components/Document";

export const metadata: Metadata = {
  title: "Page not found / Seite nicht gefunden | Century",
  robots: { index: false, follow: true },
};

// GitHub Pages serves one 404 document for every unknown path, in either locale.
export default function GlobalNotFound() {
  return <Document locale="en">
    <main className="bilingual-error" id="main-content">
      <section lang="de">
        <p>404 · Century</p>
        <h1>Seite nicht gefunden</h1>
        <p>Diese Seite wurde möglicherweise verschoben. Entdecken Sie die Plattform, unsere Branchenlösungen und das Team hinter Century.</p>
        <a className="btn btn-primary" href="/de/" hrefLang="de">Zur deutschen Startseite</a>
      </section>
      <section lang="en">
        <h2>Page not found</h2>
        <p>This page may have moved. Explore the platform, our industry solutions and the people behind Century.</p>
        <a className="btn btn-outline" href="/" hrefLang="en">Go to the English homepage</a>
      </section>
    </main>
  </Document>;
}
