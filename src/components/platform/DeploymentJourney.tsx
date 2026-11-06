import styles from "./DeploymentPage.module.css";

const stages = [
  {
    title: "Scope",
    work: "Map the current process with its owner: inputs, volumes, manual effort, decisions and systems. Assess value, data readiness and risk, then choose an appropriate approach",
    output: "A prioritized use case, requirements, success criteria and a plan for validation",
    decision: "Is the task ready and worth pursuing?",
  },
  {
    title: "Validate",
    work: "Evaluate a scoped workflow with approved or synthetic examples. Agree a control set, compare suitable models and measure the result against the current way of working",
    output: "A working test workflow, evaluation results and a clearer view of integration and infrastructure needs",
    decision: "What does the evidence support building next?",
  },
  {
    title: "Deploy",
    work: "Configure the platform in the agreed environment. Connect approved sources and systems, set access and data rules, and test the workflow on permitted real data",
    output: "An accepted platform environment and workflows tested against their own agreed criteria, ready for controlled operational use",
    decision: "Have the environment and workflow passed their acceptance checks?",
  },
  {
    title: "Enable & improve",
    work: "Train your developers through practical work. Transfer requirements, design, testing and operating practices, then use feedback from live work to refine the next specification",
    output: "A team equipped to maintain knowledge, agents and workflows, with operating rules and a prioritized backlog",
    decision: "What should your team improve or build next?",
  },
];

export default function DeploymentJourney() {
  return (
    <ol className={styles.journey} aria-label="Deployment work and outcomes">
      {stages.map((stage, index) => (
        <li className={styles.stage} key={stage.title}>
          <div className={styles.stageHeading}>
            <span className={styles.stageNumber} aria-hidden="true">0{index + 1}</span>
            <h3>{stage.title}</h3>
          </div>
          <div className={styles.stageWork}>
            <span className={styles.detailLabel}>The work</span>
            <p>{stage.work}</p>
          </div>
          <dl className={styles.stageOutcome}>
            <div><dt>What you take forward</dt><dd>{stage.output}</dd></div>
            <div><dt>The next decision</dt><dd>{stage.decision}</dd></div>
          </dl>
        </li>
      ))}
    </ol>
  );
}
