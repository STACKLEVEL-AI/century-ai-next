import { Check, Eye, LockKeyhole, Server, UserRoundCheck } from "lucide-react";

const controls = [
  {
    title: "Deployment choices",
    text: "Discuss on-premises or private infrastructure to match the requirements of your environment.",
    icon: Server,
  },
  {
    title: "Access boundaries",
    text: "Define which sources a user or workflow is allowed to use.",
    icon: LockKeyhole,
  },
  {
    title: "Human oversight",
    text: "Set review points for exceptions and actions that require approval.",
    icon: UserRoundCheck,
  },
  {
    title: "Operational visibility",
    text: "Review activity, outputs and usage to support ongoing evaluation.",
    icon: Eye,
  },
];
const faqs = [
  {
    question: "Can Century work with our existing systems?",
    answer:
      "We scope the required sources and integrations around the first workflow. Available interfaces, access rules and implementation effort are reviewed before the project starts.",
  },
  {
    question: "Where will our data be processed?",
    answer:
      "The processing location and external dependencies depend on the agreed deployment. These are defined before implementation rather than assumed from the website's domain.",
  },
  {
    question: "Does the platform automatically make us compliant?",
    answer:
      "No. Compliance depends on your use case, configuration, contracts and operating processes. Technical controls support that work but do not replace it.",
  },
];

export default function Trust() {
  return (
    <section
      className="section security-section"
      id="security"
      aria-labelledby="security-title"
    >
      <div className="shell">
        <div className="section-heading">
          <p className="eyebrow">
            <span className="section-number" aria-hidden="true">
              04
            </span>
            Security
          </p>
          <h2 id="security-title">
            Decide where AI runs
            <br /> and how it is controlled.
          </h2>
          <p>
            Agree the deployment model, permitted sources and review
            responsibilities before introducing AI into a business process.
          </p>
        </div>
        <div className="security-grid">
          {controls.map(({ title, text, icon: Icon }) => (
            <article className="security-card" key={title}>
              <div className="control-icon">
                <Icon size={24} strokeWidth={1.5} aria-hidden="true" />
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
        <p className="security-note">
          <Check size={17} aria-hidden="true" />
          <span>
            Data location, retention, support access and external services are
            agreed for each deployment.
          </span>
        </p>
        <div className="faq-list">
          {faqs.map(({ question, answer }) => (
            <details key={question}>
              <summary>{question}</summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
