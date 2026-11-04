import AppScreenshot from "@/components/AppScreenshot";

export default function Brain() {
  return <section className="section example-section app-details-section" id="example" aria-labelledby="example-title">
    <div className="shell">
      <div className="section-heading example-heading">
        <p className="eyebrow">Inside Century</p>
        <div className="example-heading-row"><h2 id="example-title">A closer look<br />at the workspace.</h2><p>From files and voice to the details behind an answer. Explore real views from the Century application.</p></div>
      </div>
      <div className="app-capture-grid app-detail-grid">
        <AppScreenshot capture="files" />
        <AppScreenshot capture="response" />
        <AppScreenshot capture="document" />
        <AppScreenshot capture="audio" />
      </div>
    </div>
  </section>;
}
