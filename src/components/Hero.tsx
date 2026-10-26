import { ArrowDown, Check, Search, Waypoints } from "lucide-react";
import TelegramLink from "./TelegramLink";

const exampleSteps = [
  { title: "Ask", text: "Find answers in approved knowledge", icon: Search },
  { title: "Review", text: "Check sources and proposed actions", icon: Check },
  {
    title: "Act",
    text: "Move work forward with human oversight",
    icon: Waypoints,
  },
];

export default function Hero() {
  return (
    <section className="hero" id="home" aria-labelledby="hero-title">
      <div className="shell hero-layout">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="status-dot" aria-hidden="true" />
            Enterprise AI for European businesses
          </p>
          <h1 id="hero-title">
            Enterprise AI.
            <br />
            <span>
              Under your
              <br className="desktop-break" /> control.
            </span>
          </h1>
          <p className="hero-lead">
            Help your teams find answers, process documents and resolve routine
            requests — with source references, access controls and human review.
          </p>
          <p className="hero-support">
            Start with one workflow. Measure the outcome. Expand from there.
          </p>
          <div className="hero-actions">
            <TelegramLink />
            <a className="btn btn-text" href="/#use-cases">
              Explore use cases <ArrowDown size={17} aria-hidden="true" />
            </a>
          </div>
          <ul className="hero-signals" aria-label="Key capabilities">
            {[
              "Source-linked answers",
              "Human review",
              "Deployment options",
            ].map((signal) => (
              <li key={signal}>
                <Check size={14} aria-hidden="true" />
                {signal}
              </li>
            ))}
          </ul>
        </div>
        <div
          className="workflow-visual"
          aria-label="Illustrative workflow: ask, review and act"
        >
          <div className="visual-heading">
            <span>Example workflow</span>
            <span aria-hidden="true">↗</span>
          </div>
          <div className="workflow-steps">
            {exampleSteps.map(({ title, text, icon: Icon }, index) => (
              <div
                className={`workflow-card workflow-card-${index + 1}`}
                key={title}
              >
                <div className="workflow-icon">
                  <Icon size={23} strokeWidth={1.6} aria-hidden="true" />
                </div>
                <div>
                  <h2>{title}</h2>
                  <p>{text}</p>
                </div>
                <span className="workflow-index" aria-hidden="true">
                  0{index + 1}
                </span>
              </div>
            ))}
          </div>
          <div className="visual-baseline" aria-hidden="true">
            {Array.from({ length: 12 }, (_, i) => (
              <span key={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
