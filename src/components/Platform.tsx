import { Activity, ArrowUpRight, Layers3, Network, Waypoints } from "lucide-react";

const features = [
  { id: "assistants", title: "Assistants", text: "Help teams work with approved knowledge and prepare useful answers.", icon: Layers3 },
  { id: "workflows", title: "Workflows", text: "Connect document processing, review steps and business actions.", icon: Waypoints },
  { id: "sources", title: "Sources & systems", text: "Define the documents, data and integrations each use case needs.", icon: Network },
  { id: "oversight", title: "Oversight", text: "Review activity, model usage and costs as your use case develops.", icon: Activity },
];

export default function Platform() {
  return (
    <section className="section platform-section" id="platform" aria-labelledby="platform-title">
      <div className="platform-grain" aria-hidden="true" />
      <div className="shell platform-layout">
        <div className="section-heading platform-heading">
          <p className="eyebrow"><span className="section-number">02 /</span> The Century platform</p>
          <h2 id="platform-title">A shared foundation.<br /><span>For the way you work.</span></h2>
          <p>Bring knowledge, workflows and oversight together.<br className="desktop-break" /> With your sources, your access rules and your people in control.</p>
          <a className="btn btn-light" href="/ai-os/">Explore the AI OS <ArrowUpRight size={17} aria-hidden="true" /></a>
        </div>
        <div className="platform-visual" aria-hidden="true">
          <div className="platform-orbit orbit-outer" />
          <div className="platform-orbit orbit-inner" />
          <div className="platform-axis axis-horizontal" />
          <div className="platform-axis axis-vertical" />
          <div className="platform-core"><span className="brand-mark" /><span>Century</span></div>
          {features.map(({ id, title, icon: Icon }) => (
            <div className={`capability-node node-${id}`} key={id}><Icon size={17} /><span>{title}</span><span className="node-dot" /></div>
          ))}
          <span className="platform-caption">CONNECTED KNOWLEDGE. CONSIDERED ACTION.</span>
        </div>
        <div className="platform-grid">
          {features.map(({ id, title, text, icon: Icon }, index) => (
            <article className="platform-card" key={id}>
              <div className="platform-card-top"><Icon size={22} strokeWidth={1.5} aria-hidden="true" /><span>0{index + 1}</span></div>
              <h3>{title}</h3><p>{text}</p>
            </article>
          ))}
        </div>
        <p className="platform-note">Integration scope depends on your systems, access requirements and the workflow being implemented.</p>
      </div>
    </section>
  );
}
