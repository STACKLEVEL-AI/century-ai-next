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
        <div className="section-heading">
          <p className="eyebrow">
            <span className="section-number" aria-hidden="true">
              05
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
