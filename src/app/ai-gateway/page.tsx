import { Activity, ArrowUpRight, GitBranch, Network, ShieldCheck, SlidersHorizontal, Wallet } from "lucide-react";
import PageFrame from "@/components/site/PageFrame";
import PageHero from "@/components/site/PageHero";
import { FeatureGrid, RelatedPages, SectionHeading } from "@/components/site/Sections";
import GatewayDemo from "@/components/products/GatewayDemo";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Century AI Gateway", "Explore AI usage, model access and governance through a local interactive demonstration with clearly labelled sample data.", "/ai-gateway");

export default function GatewayPage() {
  return <PageFrame>
    <PageHero eyebrow="Century AI Gateway" title={<>A clearer view.<br />A more deliberate use of AI.</>} description="As AI use grows, bring usage, access and operating responsibilities into the same conversation. Explore the controls that matter for your business." secondary={{ href: "#gateway-example", label: "Explore the example" }} />
    <section className="prod-demo-section" id="gateway-example"><div className="shell"><GatewayDemo /></div></section>
    <section className="section prod-section"><div className="shell"><SectionHeading eyebrow="A common control point" title="Turn scattered usage into an operating picture." description="A gateway implementation starts with the providers, interfaces and policies your environment needs. These are the questions to resolve together." /><FeatureGrid columns={3} items={[
      { title: "Connectivity", description: "Identify which applications and model interfaces belong in scope. Review how each connects and what data it exchanges.", icon: <Network size={24} /> },
      { title: "Usage and budgets", description: "Decide how usage should be attributed and reviewed. Give teams a shared basis for discussing cost and useful outcomes.", icon: <Wallet size={24} /> },
      { title: "Model access", description: "Define which people, teams and workflows may reach each model. Match access to the task and the information involved.", icon: <SlidersHorizontal size={24} /> },
      { title: "Routing decisions", description: "Assess when different models are appropriate. Consider quality, response time, cost and what should happen if a provider is unavailable.", icon: <GitBranch size={24} /> },
      { title: "Data boundaries", description: "Agree what may leave your environment and what controls are required. Review external processing and retention before rollout.", icon: <ShieldCheck size={24} /> },
      { title: "Operational visibility", description: "Specify the activity records, review process and owners needed to investigate exceptions and understand changes in usage.", icon: <Activity size={24} /> },
    ]} /></div></section>
    <section className="section prod-section prod-bg-lavender"><div className="shell prod-split-section"><SectionHeading eyebrow="From visibility to decisions" title={<>Know what is being used.<br />Decide what comes next.</>} description="The useful outcome is a reviewable operating process: a clear owner, an agreed scope and evidence that supports the next decision." /><div className="prod-outcome-list">{[
      { title: "Understand the pattern", text: "See usage in the context of teams and workflows, rather than isolated accounts." },
      { title: "Review the trade-offs", text: "Discuss model suitability, quality and cost using the same definitions." },
      { title: "Keep the rules clear", text: "Make access, data handling and escalation responsibilities explicit." },
    ].map(item => <article key={item.title}><h3>{item.title}</h3><p>{item.text}</p></article>)}</div></div></section>
    <section className="prod-scope-note"><div className="shell"><p>The dashboard is an interactive illustration. Supported integrations, controls and reporting are defined during implementation scoping.</p><a className="text-link" href="/deployment/">Plan the implementation<ArrowUpRight size={18} aria-hidden="true" /></a></div></section>
    <RelatedPages links={[{ href: "/ai-os/", title: "The shared foundation", description: "Connect knowledge, workflows and oversight." }, { href: "/agents/", title: "Assistance with context", description: "Put approved knowledge to work for your team." }, { href: "/systems/", title: "A workspace that fits", description: "Design around a focused business process." }]} />
  </PageFrame>;
}
