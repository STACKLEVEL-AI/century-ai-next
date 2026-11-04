import { ArrowUpRight } from "lucide-react";

const steps = [
  {
    title: "Choose one workflow",
    text: "Identify the process owner, inputs, current effort and the outcome worth improving.",
  },
  {
    title: "Build and evaluate",
    text: "Agree the scope, connect the required sources and assess results against a baseline.",
  },
  {
    title: "Decide what comes next",
    text: "Use the evidence to refine the workflow, expand it or stop before a larger rollout.",
  },
];

export default function Narrative() {
  return (
    <section
      className="section process-section"
      id="how-we-start"
      aria-labelledby="process-title"
    >
      <div className="shell">
        <div className="section-heading process-heading">
          <p className="eyebrow">
            <span className="section-number" aria-hidden="true">
              05 /
            </span>
            How we start
          </p>
          <h2 id="process-title">
            Start small.
            <br /> Measure before you scale.
          </h2>
          <p>
            Build the first workflow around a real business need and agreed
            evaluation criteria.
          </p>
        </div>
        <div className="process-intro-grid">
          <article className="process-intro-card process-intro-deployment">
            <p className="panel-label">Deployment</p>
            <h3>AI that fits your environment.</h3>
            <p>
              Discuss on-premises or private infrastructure, permitted sources
              and review responsibilities before introducing AI into a business
              process.
            </p>
            <a className="text-link" href="/security/">
              Explore deployment choices
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </article>
          <article className="process-intro-card process-intro-strategy">
            <p className="panel-label">Strategy</p>
            <h3>A business need. A measurable next step.</h3>
            <p>
              Choose a focused workflow with a clear owner. Agree what a useful
              outcome looks like, then evaluate the results before a wider
              rollout.
            </p>
            <a className="text-link" href="/#use-cases">
              Find your starting point
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </article>
        </div>
        <ol className="process-grid">
          {steps.map(({ title, text }, index) => (
            <li key={title}>
              <span className="process-number" aria-hidden="true">
                0{index + 1}
              </span>
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ol>
        <p className="process-note">
          Scope, timeline and commercial terms are agreed after the initial
          discussion.
        </p>
      </div>
    </section>
  );
}
