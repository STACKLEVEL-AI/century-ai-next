import { FileText, Quote } from "lucide-react";
import { SOURCE_DATA } from "@/lib/data";

export default function Brain() {
  return (
    <section
      className="section example-section"
      id="example"
      aria-labelledby="example-title"
    >
      <div className="shell">
        <div className="section-heading">
          <p className="eyebrow">
            <span className="section-number" aria-hidden="true">
              02
            </span>
            Source-linked answers
          </p>
          <h2 id="example-title">An answer you can inspect.</h2>
          <p>
            See how a source-linked answer can help a team check the information
            before acting on it.
          </p>
        </div>
        <div className="example-board">
          <div className="example-toolbar">
            <span className="example-badge">
              Illustrative example — sample data
            </span>
            <Quote size={20} aria-hidden="true" />
          </div>
          <div className="example-grid">
            <div className="answer-panel">
              <p className="panel-label">Question</p>
              <h3>What must be checked before approving a new supplier?</h3>
              <div className="answer-copy">
                <p className="panel-label">Answer</p>
                <p>
                  Confirm that the required documents are complete{" "}
                  <a
                    href="#source-supplier-checklist"
                    className="citation"
                    aria-label="Source 1: Supplier onboarding checklist"
                  >
                    [1]
                  </a>
                  . Route exceptions to the procurement owner before approval{" "}
                  <a
                    href="#source-approval-policy"
                    className="citation"
                    aria-label="Source 2: Procurement approval policy"
                  >
                    [2]
                  </a>
                  .
                </p>
              </div>
            </div>
            <div className="sources-panel">
              <p className="panel-label">Sources</p>
              {Object.entries(SOURCE_DATA).map(([id, source], index) => (
                <details className="source-detail" id={`source-${id}`} key={id}>
                  <summary>
                    <FileText size={18} aria-hidden="true" />
                    <span>
                      [{index + 1}] {source.title}
                    </span>
                  </summary>
                  <div className="source-excerpt">
                    <p className="source-location">{source.location}</p>
                    <p>{source.snippet}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
          <p className="example-note">
            This example shows the interaction pattern. It is not a customer
            result or a live AI response.
          </p>
        </div>
      </div>
    </section>
  );
}
