import { FileText, MessagesSquare, Search } from "lucide-react";
import TelegramLink from "./TelegramLink";

const scenarios = [
  {
    name: "Company knowledge",
    icon: Search,
    hook: "Find the answer. Check the source.",
    body: "Help employees find answers across approved policies, procedures and internal documents, with references they can check.",
    audience: "For operations, HR and internal service teams.",
    flow: ["Question", "approved sources", "referenced answer"],
    measure: "Time to find an answer; answer usefulness; source coverage.",
  },
  {
    name: "Document workflows",
    icon: FileText,
    hook: "Move documents forward with human review.",
    body: "Extract information, compare it with defined rules and prepare the next step for a reviewer before an action is taken.",
    audience: "For operations, procurement and document-heavy teams.",
    flow: ["Document", "extraction", "review", "next step"],
    measure: "Processing time; correction rate; review effort.",
  },
  {
    name: "Support assistance",
    icon: MessagesSquare,
    hook: "Resolve routine requests. Escalate with context.",
    body: "Help support teams answer recurring questions from approved knowledge and pass exceptions to a person with the relevant context.",
    audience: "For internal service desks and customer support teams.",
    flow: ["Request", "suggested answer", "human handover"],
    measure: "Resolution time; repeat requests; handover quality.",
  },
];

export default function Scenarios() {
  return (
    <section
      className="section"
      id="use-cases"
      aria-labelledby="use-cases-title"
    >
      <div className="shell">
        <div className="section-heading">
          <p className="eyebrow">
            <span className="section-number" aria-hidden="true">
              01
            </span>
            Use cases
          </p>
          <h2 id="use-cases-title">
            Start with the work that
            <br /> slows your team down.
          </h2>
          <p>
            Choose a focused use case with clear inputs, an accountable owner
            and an outcome you can measure.
          </p>
        </div>
        <div className="scenario-grid">
          {scenarios.map(
            ({ name, icon: Icon, hook, body, audience, flow, measure }) => (
              <article className="scenario-card" key={name}>
                <div className="card-category">
                  <Icon size={22} strokeWidth={1.6} aria-hidden="true" />
                  <span>{name}</span>
                </div>
                <h3>{hook}</h3>
                <p>{body}</p>
                <p className="card-audience">{audience}</p>
                <p className="scenario-flow">
                  {flow.map((step, index) => (
                    <span key={step}>
                      {index > 0 && (
                        <span className="flow-arrow" aria-hidden="true">
                          →{" "}
                        </span>
                      )}
                      {step}
                      {index < flow.length - 1 && " "}
                    </span>
                  ))}
                </p>
                <div className="card-measure">
                  <h4>What to measure</h4>
                  <p>{measure}</p>
                </div>
              </article>
            ),
          )}
        </div>
        <div className="section-action">
          <TelegramLink />
        </div>
      </div>
    </section>
  );
}
