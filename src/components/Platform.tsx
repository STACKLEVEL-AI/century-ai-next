import { Activity, Layers3, Network, Waypoints } from "lucide-react";

const features = [
  {
    title: "Assistants",
    text: "Help teams work with approved knowledge and prepare useful answers.",
    icon: Layers3,
  },
  {
    title: "Workflows",
    text: "Connect document processing, review steps and business actions.",
    icon: Waypoints,
  },
  {
    title: "Sources and systems",
    text: "Define the documents, data and integrations each use case needs.",
    icon: Network,
  },
  {
    title: "Oversight",
    text: "Review activity, model usage and costs as the use case develops.",
    icon: Activity,
  },
];

export default function Platform() {
  return (
    <section
      className="section platform-section"
      id="platform"
      aria-labelledby="platform-title"
    >
      <div className="shell platform-layout">
        <div className="section-heading">
          <p className="eyebrow">
            <span className="section-number" aria-hidden="true">
              03
            </span>
            Platform
          </p>
          <h2 id="platform-title">
            One platform for knowledge, workflows and oversight.
          </h2>
          <p>
            Bring focused AI use cases together with shared access rules, review
            steps and visibility into usage.
          </p>
          <p className="platform-note">
            Integration scope depends on your systems, access requirements and
            the workflow being implemented.
          </p>
        </div>
        <div className="platform-grid">
          {features.map(({ title, text, icon: Icon }, index) => (
            <article className="platform-card" key={title}>
              <div className="platform-card-top">
                <Icon size={25} strokeWidth={1.5} aria-hidden="true" />
                <span aria-hidden="true">0{index + 1}</span>
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
