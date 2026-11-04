import { Check, FileText } from "lucide-react";
import { SOURCE_DATA } from "@/lib/data";

const sources = Object.entries(SOURCE_DATA);

export default function Brain() {
  return (
    <section
      className="section example-section"
      id="example"
      aria-labelledby="example-title"
    >
      <div className="shell">
        <div className="section-heading example-heading">
          <p className="eyebrow">
            <span className="section-number" aria-hidden="true">
              03 /
            </span>
            AI you can inspect
          </p>
          <div className="example-heading-row">
            <h2 id="example-title">An answer you can inspect.</h2>
            <p>
              See how a source-linked answer can help a team check the information
              before acting on it.
            </p>
          </div>
        </div>
        <div className="example-board">
          <div className="example-toolbar">
            <div className="workspace-identity">
              <span className="brand-mark" aria-hidden="true" />
              <span>Century</span>
              <span className="workspace-context">Knowledge workspace</span>
            </div>
            <span className="example-badge">
              Illustrative example — sample data
            </span>
          </div>
          <div className="example-grid">
            <div className="answer-panel">
              <p className="panel-label">Question</p>
              <h3>What must be checked before approving a new supplier?</h3>
              <div className="answer-copy">
                <div className="answer-author">
                  <span className="answer-avatar" aria-hidden="true">
                    <span className="brand-mark" />
                  </span>
                  <p className="panel-label">Answer with references</p>
                </div>
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
                <p className="answer-guidance">
                  <Check size={15} aria-hidden="true" />
                  Review the sources before acting.
                </p>
              </div>
            </div>
            <div className="sources-panel">
              <div className="sources-heading">
                <p className="panel-label">Sources</p>
                <span className="source-count">{sources.length} documents</span>
              </div>
              <p className="sources-help">
                Open a document to inspect its excerpt.
              </p>
              {sources.map(([id, source], index) => (
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
